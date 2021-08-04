describe('Transaction Config', function(){
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
    it('Create Transaction Config', function(){
        //Login as admin
        cy.get('input[name=user]').type(this.testdata.admin_username);
        cy.get('input[name=password]').type(this.testdata.admin_password);
        cy.contains('Sign In').click();
        //Go to transaction config menu
        cy.contains('Transaction Config').click();
        cy.contains('New Account Transaction Config').click();
        //Fill Form
        cy.get('select[name=ca_id]').select(this.userdata.institution_id);
        cy.get('input[name=username]').type(this.userdata.username);
        cy.get('input[name=token_time]').type('10');
        cy.get('select[name=token_duration]').select('minutes');
        cy.get('input[name=password]').first().type(this.userdata.password);
        cy.get('input[name=confirm_password]').first().type(this.userdata.password)
        cy.contains('Submit').click();
        //Log Out
        cy.get('.btn > .symbol > .symbol-label').click();
        cy.get('.navi-footer > .btn').click();
    })
})