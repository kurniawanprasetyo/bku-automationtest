describe('Virtual Account', function(){
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

    it('Create Virtual Account', function(){
        //Login as admin
        cy.get('input[name=user]').type(this.testdata.admin_username);
        cy.get('input[name=password]').type(this.testdata.admin_password);
        cy.contains('Sign In').click();
        //Go to virtual account menu
        cy.get(':nth-child(10) > .menu-toggle > .menu-text').click();
        cy.get(':nth-child(10) > .menu-submenu > .menu-subnav > :nth-child(1) > .menu-link > .menu-text').click();
        cy.contains('New Virtual Account').click()
        //Fill Form
        cy.get('select[name=inst_id]').select(this.userdata.institution_id);
        cy.get('input[name=va_id]').type(this.userdata.va_id);
        cy.get('input[name=account_name]').type(this.userdata.va_name);
        cy.get('select[name=status]').select('ACTIVE');
        cy.get('select[name=currency_code]').select('IDR');
        cy.get('[class="MuiSvgIcon-root"]').last().click()
        cy.contains(this.userdata.feature).click()
        cy.contains('Submit').click();
        //Log Out
        cy.get('.btn > .symbol > .symbol-label').click();
        cy.get('.navi-footer > .btn').click();
    })
})