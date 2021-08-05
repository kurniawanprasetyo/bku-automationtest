describe('Transaction Config', function(){
    beforeEach(function(){
        cy.fixture('Authentication')
        .then(logindata =>{
            this.logindata = logindata;
        })
        cy.fixture('CollectionAgent')
        .then(userdata =>{
            this.userdata = userdata;
        })
    })
    it('Create Transaction Config', function(){
        //Login as admin
        cy.login(this.logindata.admin_username, this.logindata.admin_password);
        //Go to transaction config menu
        cy.contains('Transaction Config').click();
        cy.contains('New Account Transaction Config').click();
        //Fill Form
        cy.get('select[name=ca_id]').select(this.userdata.institution_id);
        cy.get('input[name=username]').type(this.logindata.username);
        cy.get('input[name=token_time]').type('10');
        cy.get('select[name=token_duration]').select('minutes');
        cy.get('input[name=password]').first().type(this.logindata.password);
        cy.get('input[name=confirm_password]').first().type(this.logindata.password)
        cy.contains('Submit').click();
        //Log Out
        cy.get('.btn > .symbol > .symbol-label').click();
        cy.get('.navi-footer > .btn').click();
    })
})