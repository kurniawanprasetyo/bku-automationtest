describe('Destination', function(){
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

    it('Add Destination', function(){
    //Login as admin
    cy.login(this.logindata.admin_username, this.logindata.admin_password);
    //Go to destination menu
    cy.contains('Routing and Destination').click();
    cy.get(':nth-child(13) > .menu-submenu > .menu-subnav > :nth-child(2) > .menu-link > .menu-text').click();
    cy.contains('New Destination').click();
    //Fill Form
    cy.generate_random_number(6).then((destination_id) => {
        cy.get('input[name=destination_id]').type(destination_id);
      });
    cy.get('input[name=destination_name]').type(this.userdata.destination_name);
    cy.get('select[name=country_code_destination]').select('IDN');
    cy.get('select[name=feature]').select(this.userdata.feature);
    cy.get(':nth-child(7) > .col-lg-8 > .form-control').type(this.userdata.payer_id);
    })
})