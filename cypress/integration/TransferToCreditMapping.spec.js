describe('Transferto Credit Mapping', function(){
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

    it('Add Transferto Credit Mapping', function(){
    //Login
    cy.login(this.logindata.admin_username, this.logindata.admin_password);
    //Go to transferto credit mapping menu
    cy.contains('Routing and Destination').click();
    cy.contains('TransferTo Credit Mapping').click();
    cy.contains('New TransferTo Credit Mapping').click();
    //Fill form
    cy.get('select[name=dest_country]').select('IDN');
    cy.get(':nth-child(2) > :nth-child(2) > .form-control').type('bank_account_number');
    cy.get('input[name=payer_id]').type(this.userdata.payer_id);
    })
})