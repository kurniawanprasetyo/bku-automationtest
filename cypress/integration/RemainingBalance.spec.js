describe('Remaining Balance', function(){
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
    it('Add Remaining Balance', function(){
    //Login as admin
    cy.login(this.logindata.admin_username, this.logindata.admin_password);
    //Go to virtual account menu
    cy.get(':nth-child(10) > .menu-toggle > .menu-text').click();
    cy.contains('Remaining Balance').click();
    cy.contains('New Remaining Balance').click();
    //Fill Form
    cy.get('select[name=va_id]').select(this.userdata.va_id);
    cy.contains('Add Threshold').click();
    cy.get(':nth-child(3) > .form-group > .col-lg-6 > .form-control').type('10000000');
    cy.get(':nth-child(3) > .form-group > .col-lg-4 > .form-control').select('Critical');
    cy.get(':nth-child(4) > .form-group > .col-lg-6 > .form-control').type('50000000');
    cy.get(':nth-child(4) > .form-group > .col-lg-4 > .form-control').select('Warning');
    cy.get(':nth-child(7) > .col-lg-12 > .react-multi-email > input').type(this.userdata.email);
    cy.get(':nth-child(8) > .col-lg-12 > .react-multi-email > input').type(this.userdata.email);
    })
})