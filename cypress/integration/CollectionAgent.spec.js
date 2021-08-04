describe('Collection Agent', function(){
    beforeEach(function(){
        cy.visit('/auth/login')
        cy.fixture('Authentication')
        .then(testdata => {
            this.testdata = testdata;
        })
        cy.fixture('CollectionAgent')
        .then(userdata =>{
            this.userdata = userdata;
        })
    })

    it('Create CA', function(){
        //Login as admin
        cy.get('input[name=user]').type(this.testdata.admin_username);
        cy.get('input[name=password]').type(this.testdata.admin_password);
        cy.contains('Sign In').click();
        //Go to menu institution
        cy.get('.menu-nav > :nth-child(9) > .menu-link > .menu-text').click();
        cy.get('#dropdown-toggle-top').click();
        cy.get('.dropdown-menu > .navi > :nth-child(1) > .navi-link > .navi-text').click();
        //Fill Form Page Profile
        cy.get('input[name=inst_id]').type(this.userdata.institution_id);
        cy.get('input[name=inst_name]').type(this.userdata.institution_name);
        cy.get('select[name=status]').select('ACTIVE');
        cy.get('select[name=product_name]').select('Bersama Kirim Uang');
        cy.generate_random_number(12).then((phone_number) => {
            cy.get('input[name=phone_number]').type(phone_number);
          });
        cy.generate_random_number(15).then((npwp) => {
            cy.get('input[name=npwp]').type(npwp);
          });
        cy.generate_random_number(13).then((tdp) => {
            cy.get('input[name=tdp]').type(tdp);
          });
        cy.get('select[name=country_code]').select('Indonesia');
        cy.get('input[name=province]').type('Jawa Barat');
        cy.get('input[name=district]').type('Tangerang');
        cy.get('textarea[name=address]').type("Grha Artajasa Jl. Letnan Sutopo B.1/3, Sektor Komersil III B, Lengkong Gudang Tim., Kec. Serpong, Kota Tangerang Selatan, Banten 15321");
        cy.contains('Next').click();
        //Fill Form Page Feature
        cy.get(':nth-child(2) > .form-control').select(this.userdata.feature);
        cy.get(':nth-child(3) > .form-control').select('ACTIVE');
        cy.get('.MuiAutocomplete-popupIndicator > .MuiIconButton-label > .MuiSvgIcon-root').click();
        cy.contains(this.userdata.destination_country).click();
        cy.contains('Next').click();
        //Fill Form Page PIC
        cy.get(':nth-child(1) > .form-control').type('Cypress');
        cy.get(':nth-child(2) > .form-control').type('Automation Test');
        cy.generate_random_number(12).then((pic_phone_number) => {
            cy.get(':nth-child(3) > .form-control').type(pic_phone_number);
          });
        cy.get(':nth-child(4) > .form-control').type('cypress@artajasa.co.id');
        cy.contains('Save').click();        
        //Log Out
        cy.get('.btn > .symbol > .symbol-label').click();
        cy.get('.navi-footer > .btn').click();
    })
})