describe('Fee', function(){
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

    it('Create Fee', function(){
        //Login as admin
        cy.get('input[name=user]').type(this.testdata.admin_username);
        cy.get('input[name=password]').type(this.testdata.admin_password);
        cy.contains('Sign In').click();
        //Go to fee menu
        cy.contains('Fee').click();
        cy.contains('New Fee').click();
        //Fill form
        cy.get('select[name=ca_id]').select(this.userdata.institution_id);
        //Still Confusing handle datpicker
        cy.get('select[name=dest_country]').select(this.userdata.destination_country);
        cy.get('.MuiTableRow-root > :nth-child(1) > .form-control').select('max');
        cy.get('.MuiTableRow-root > :nth-child(2) > .form-control').type('100');
        cy.get('.MuiTableRow-root > :nth-child(3) > .form-control').select('IDR');
        cy.get(':nth-child(4) > .form-control').type('2500');
        //Klik cancel for temporary
        cy.contains('Cancel').click();
        //Log Out
        cy.get('.btn > .symbol > .symbol-label').click();
        cy.get('.navi-footer > .btn').click();
    })
})