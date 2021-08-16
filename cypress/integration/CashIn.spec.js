describe('Cash In', function(){
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

    var idRequest =''

    it('Request Cash In', function(){
        //Login as maker
        cy.login(this.logindata.maker_username, this.logindata.maker_password);
        cy.get('#kt_header_menu_wrapper > .font-weight-bold').then(($header) => {
            expect($header).to.have.text('Bersama Kirim Uang')
        })
        //Go to cash in menu
        cy.contains('Virtual Account').click();
        cy.get(':nth-child(3) > .menu-submenu > .menu-subnav > .menu-item ').should(($submenu) => {
            expect($submenu).to.have.length(5)
            expect($submenu.first()).to.contain('Cash In')
            expect($submenu.last()).to.contain('Monitoring Balance')
        })
        cy.contains('Cash In').click();
        cy.get('.card-label').then(($listrouting) => {
            expect($listrouting).to.have.text('Cash In List')
        })
        cy.contains('button', 'Cash In')
            .should('be.visible')
            .click();
        //Request Cash In
        cy.get('.modal-title').then(($form) => {
            expect($form).to.have.text('Cash In')
        })
        cy.get('select[name=va_id]').select('30089100936000201');
        cy.get('input[name=amount]').type('100000000');
        cy.get('textarea[name=remarks]').type('Automation using cypress');
        cy.contains('Cancel')
            .should('be.visible');
        cy.contains('Submit')
            .should('be.visible')
            .click();
        cy.get('.MuiPaper-root')
            .should('have.css', 'background-color')
            .and('eq', 'rgb(76, 175, 80)')        
        cy.get('.MuiAlert-message').then(($message) => {
            expect($message).to.contain('Successfully Create Approval CASH-IN')
        })
        cy.get('.MuiAlert-message').invoke('text')
        .then((id) => {
            var splitText = id.split(' ')
            console.log(splitText)
            idRequest = splitText[splitText.length-1]
            console.log(idRequest)
        })
        console.log(idRequest)
        //Log Out
        cy.get('.btn > .symbol > .symbol-label').click();
        cy.get('.navi-footer > .btn').click();
    })
    it('Checked Cash in', function(){
        //Login as checker
        cy.login(this.logindata.checker_username, this.logindata.checker_password);
        //Go to menu approval virtual account
        cy.contains('Approval').click();
        cy.contains('Approval Virtual Account').click();
        //Checked
        cy.get('.card-label').then(($listrouting) => {
            expect($listrouting).to.have.text('Approval Virtual Account List')
        })
        cy.contains('div', idRequest)
            .parents('tr').within(() => {
                cy.get(':nth-child(11)').children('.btn-hover-warning')
                .click();
            })
        cy.get('.modal-title').then(($form) => {
            expect($form).to.have.text('Update Approval CASH IN')
        })
        cy.get('select[name=next_state]').select('checked');
        cy.contains('Cancel')
            .should('be.visible');
        cy.contains('Submit')
            .should('be.visible')
            .click();
        cy.get('.MuiPaper-root')
            .should('have.css', 'background-color')
            .and('eq', 'rgb(76, 175, 80)')        
        cy.get('.MuiAlert-message').then(($message) => {
            expect($message).to.contain('Successfully Update Approval CASH-IN '+idRequest)
        })
        //Log Out
        cy.get('.btn > .symbol > .symbol-label').click();
        cy.get('.navi-footer > .btn').click();
    })
    it('Approved Cash in', function(){
        //Login as approval
        cy.login(this.logindata.approval_username, this.logindata.approval_password);
        //Go to approval virtual account menu
        cy.contains('Approval').click();
        cy.contains('Approval Virtual Account').click();
        //Approved
        cy.get('.card-label').then(($listrouting) => {
            expect($listrouting).to.have.text('Approval Virtual Account List')
        })
        cy.contains('div', idRequest) 
            .parents('tr').within(() => {
                cy.get(':nth-child(11)').children('.btn-hover-warning')
                .click();
            })
        cy.get('.modal-title').then(($form) => {
            expect($form).to.have.text('Update Approval CASH IN')
        })
        cy.get('select[name=next_state]').select('approved');
        cy.contains('Cancel')
            .should('be.visible');
        cy.contains('Submit')
            .should('be.visible')
            .click();
        cy.get('.MuiPaper-root')
            .should('have.css', 'background-color')
            .and('eq', 'rgb(76, 175, 80)')        
        cy.get('.MuiAlert-message').then(($message) => {
            expect($message).to.contain('Successfully Update Approval CASH-IN '+idRequest)
        })
    })
})