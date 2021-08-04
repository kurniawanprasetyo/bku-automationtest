describe('Cash In', function(){
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

    var idRequest =''

    it('Request Cash In', function(){
        //Login as maker
        cy.get('input[name=user]').type(this.testdata.maker_username);
        cy.get('input[name=password]').type(this.testdata.maker_password);
        cy.contains('Sign In').click();
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
        cy.get('input[name=user]').type(this.testdata.checker_username);
        cy.get('input[name=password]').type(this.testdata.checker_password);
        cy.contains('Sign In').click();
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
        cy.get('input[name=user]').type(this.testdata.approval_username);
        cy.get('input[name=password]').type(this.testdata.approval_password);
        cy.contains('Sign In').click();
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