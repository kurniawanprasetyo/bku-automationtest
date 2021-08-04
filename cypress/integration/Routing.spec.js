describe('Routing', function(){
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

    it('Create Routing', function(){
        //Login as admin
        cy.get('input[name=user]').type(this.testdata.admin_username);
        cy.get('input[name=password]').type(this.testdata.admin_password);
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
        //cy.get('[name="start_date"]').click();
        //cy.datepicker('28-November-2021');
        cy.get('select[name=mitra_id]').select(this.userdata.mitra_id);
        cy.get('select[name=flag_auto_route]').select('INACTIVE');
        //Klik cancel for temporary
        cy.contains('Cancel').click();
        //Log Out
        cy.get('.btn > .symbol > .symbol-label').click();
        cy.get('.navi-footer > .btn').click();
        
    })
})