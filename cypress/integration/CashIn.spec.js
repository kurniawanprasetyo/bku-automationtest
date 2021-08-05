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
        //Go to cash in menu
        cy.contains('Virtual Account').click();
        cy.contains('Cash In').click();
        cy.contains('button', 'Cash In').click();
        //Request Cash In
        cy.get('select[name=va_id]').select(this.userdata.va_id);
        cy.get('input[name=amount]').type("100000000");
        cy.get('textarea[name=remarks]').type("Automation using cypress");
        cy.contains('button', 'Submit').click();
        cy.get('.MuiAlert-message').invoke('text')
        .then((id) => {
            var splitText = id.split(' ')
            console.log(splitText)
            idRequest = splitText[splitText.length-1]
            console.log(idRequest)
        })
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
        cy.contains('div', idRequest)
            .parents('tr').within(() => {
                cy.get(':nth-child(11)').children('.btn-hover-warning')
                .click();
            })
        cy.get('select[name=next_state]').select('checked');
        cy.contains('Submit').click();
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
        cy.contains('div', idRequest) 
            .parents('tr').within(() => {
                cy.get(':nth-child(11)').children('.btn-hover-warning')
                .click();
            })
        cy.get('select[name=next_state]').select('approved');
        cy.contains('Submit').click();
    })
})