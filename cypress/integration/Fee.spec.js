describe('Fee', function(){
    beforeEach(function(){
        cy.fixture('Authentication')
        .then(logindata => {
            this.logindata = logindata;
        })
        cy.fixture('CollectionAgent')
        .then(userdata =>{
            this.userdata = userdata;
        })
    })

    it('Create Fee', function(){
        //Login as maker
        cy.login(this.logindata.maker_username, this.logindata.maker_password);
        //Go to fee menu
        cy.get(':nth-child(13) > .menu-link > .menu-text').click();
        cy.contains('New Fee').click();
        //Fill form
        cy.get('select[name=ca_id]').select(this.userdata.institution_id);
        cy.get('input[name="start_period"]').invoke('val').then((text) => {
            expect(this.userdata.begin_date).to.equal(text);
        });
        cy.get('select[name=dest_country]').select(this.userdata.destination_country);
        cy.get('.MuiTableRow-root > :nth-child(1) > .form-control').select('max');
        cy.get('.MuiTableRow-root > :nth-child(2) > .form-control').type('100');
        cy.get('.MuiTableRow-root > :nth-child(3) > .form-control').select('IDR');
        cy.get(':nth-child(4) > .form-control').type('2500');
        //Klik cancel for temporary
        cy.contains('Submit').click();
        //Log Out
        cy.get('.btn > .symbol > .symbol-label').click();
        cy.get('.navi-footer > .btn').click();
        //Login as checker
        cy.login(this.logindata.checker_username, this.logindata.checker_password);
        //Go to Menu Approval Fee
        cy.contains('Approval').click();
        cy.contains('Approval Fee').click();
        cy.get(':nth-child(1) > :nth-child(5) > .btn-hover-warning').click();
        cy.get('select[name=next_state]').select('Checked');
        cy.contains('Submit').click();
        //Log Out
        cy.get('.btn > .symbol > .symbol-label').click();
        cy.get('.navi-footer > .btn').click();
        //Login as Approval
        cy.login(this.logindata.approval_username, this.logindata.approval_password);
        //Go to Menu Approval Fee
        cy.contains('Approval').click();
        cy.contains('Approval Fee').click();
        cy.get(':nth-child(1) > :nth-child(5) > .btn-hover-warning').click();
        cy.get('select[name=next_state]').select('Approved');
        cy.contains('Submit').click();
    })
})