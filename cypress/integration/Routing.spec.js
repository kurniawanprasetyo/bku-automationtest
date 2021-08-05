describe('Routing', function(){
    beforeEach(function(){
        cy.visit('/auth/login')
        //Login as admin
        cy.get('input[name=user]').type(Cypress.env('username_admin'));
        cy.get('input[name=password]').type(Cypress.env('password_admin'));
        cy.fixture('CollectionAgent')
        .then(userdata =>{
            this.userdata = userdata;
        })
    })

    it('Create Routing', function(){
        cy.contains('Sign In').click();
        //Go to virtual account menu
        cy.contains('Routing and Destination').click();
        cy.get(':nth-child(13) > .menu-submenu > .menu-subnav > :nth-child(1) > .menu-link > .menu-text').click()
        cy.contains('New Routing').click();
        cy.contains('Form').click();
        //Fill form
        cy.get('select[name=ca_id]').first().select(this.userdata.institution_id);
        cy.get('select[name=feature]').select(this.userdata.feature);
        cy.get('select[name=destination_code]').select(this.userdata.destination_code);
        cy.get('select[name=transaction_type]').select('C2C');
        //Still Confusing Handle datepicker
        // cy.get('[name="start_date"]').click();
        cy.get('input[name="start_date"]').invoke('val').then((text) => {
            expect('2021-08-06').to.equal(text);
        });
        cy.get('input[name="end_date"]').clear();
        for(let n = 0; n < 12; n ++){
            cy.get('button.react-datepicker__navigation.react-datepicker__navigation--next').click()
        }
        cy.get('div.react-datepicker__day.react-datepicker__day--006').first().click()
        cy.get('input[name="end_date"]').invoke('val').then((text) => {
            expect('2022-08-06').to.equal(text);
        });
        // cy.get('input[name="end_date"]').clear().click().type('2022-08-05', {force: true}).trigger('change');
        // cy.get('input[name="end_date"]').invoke('val', '2022-08-05').trigger('change').then((text) => {
        //     // expect('2022-08-05').to.equal(text);
        //     console.log(text);
        // });
        // cy.datepicker('28-November-2021');
        // cy.get('select[name=mitra_id]').select(this.userdata.mitra_id);
        // cy.get('select[name=flag_auto_route]').select('INACTIVE');
        // //Klik cancel for temporary
        // cy.contains('Cancel').click();
        // //Log Out
        // cy.get('.btn > .symbol > .symbol-label').click();
        // cy.get('.navi-footer > .btn').click();
        
    })
})