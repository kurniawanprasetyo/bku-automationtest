describe('My First cypress test', () =>{

    var idRequest =''

    it('Request Cash In', () =>{
        cy.visit('https://web-staging.bersamaku.id/auth/login')
        //Login as maker
        cy.get('input[name=user]').type("seomaker")
        cy.get('input[name=password]').type("Seo@20Maker21")
        cy.contains('Sign In').click()
        //Go to cash in menu
        cy.contains('Virtual Account').click()
        cy.contains('Cash In').click()
        cy.contains('button', 'Cash In').click()
        //Request Cash In
        cy.get('select[name=va_id]').select('callback01')
        cy.get('input[name=amount]').type("1000000")
        cy.get('textarea[name=remarks]').type("Automation using cypress")
        cy.contains('button', 'Submit').click()
        cy.get('.MuiAlert-message').invoke('text')
        .then((id) => {
            var splitText = id.split(' ')
            console.log(splitText)
            idRequest = splitText[splitText.length-1]
            console.log(idRequest)
        })
        cy.get('.btn > .symbol > .symbol-label').click()
        cy.get('.navi-footer > .btn').click()
        //Login as checker
    })
    it('Checked Cash in', () =>{
        cy.get('input[name=user]').type("seochecker")
        cy.get('input[name=password]').type("Checker@Seo20!21")
        cy.contains('Sign In').click()
        //Go to menu approval virtual account
        cy.contains('Approval').click()
        cy.contains('Approval Virtual Account').click()
        //Checked
        cy.contains('div', idRequest) 
            .parents('tr').within(() => {
                cy.get(':nth-child(11)').children('.btn-hover-warning')
                .click()
            })
        cy.get('select[name=next_state]').select('checked')
        cy.get('.modal-footer > .btn-primary').click()
        cy.get('.btn > .symbol > .symbol-label').click()
        cy.get('.navi-footer > .btn').click()
       // Login as approval
    })
    it('Approved Cash in', () =>{
        cy.get('input[name=user]').type("seoapproval")
        cy.get('input[name=password]').type("@Approval!Seo20@21")
        cy.contains('Sign In').click()
        //Go to approval virtual account menu
        cy.contains('Approval').click()
        cy.contains('Approval Virtual Account').click()
        //Approved
        cy.contains('div', idRequest) 
            .parents('tr').within(() => {
                cy.get(':nth-child(11)').children('.btn-hover-warning')
                .click()
            })
        cy.get('select[name=next_state]').select('approved')
        cy.get('.modal-footer > .btn-primary').click()
    })
})