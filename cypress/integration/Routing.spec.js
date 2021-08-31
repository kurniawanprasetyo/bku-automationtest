describe('Routing', function(){
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

    it('Create Routing', function(){
        //Login
        cy.login(this.logindata.admin_username, this.logindata.admin_password);
        //Go to virtual account menu
        cy.get('#kt_header_menu_wrapper > .font-weight-bold').then(($header) => {
            expect($header).to.have.text('Bersama Kirim Uang')
        })
        cy.contains('Routing and Destination').click();
        cy.get(':nth-child(13) > .menu-submenu > .menu-subnav > .menu-item ').should(($submenu) => {
            expect($submenu).to.have.length(4)
            expect($submenu.first()).to.contain('Routing')
            expect($submenu.last()).to.contain('987 Config')
        })
        cy.get(':nth-child(13) > .menu-submenu > .menu-subnav > :nth-child(1) > .menu-link > .menu-text').click();
        cy.get('.card-label').then(($listrouting) => {
            expect($listrouting).to.have.text('Routing List')
        })
        cy.contains('New Routing')
            .should('be.visible')
            .click();
        cy.contains('Form')
            .should('be.visible')
            .click();
        //Fill form
        cy.get('.modal-title').then(($form) => {
            expect($form).to.have.text('New Routing')
        })
        // cy.get('input[name=is_auto_route]').click();
        cy.get('select[name=ca_id]').first().select(this.userdata.institution_id);
        cy.get('input[name="start_date"]').invoke('val').then((text) => {
            expect(this.userdata.begin_date).to.equal(text);
        });
        cy.get('input[name="end_date"]').clear();
        for(let n = 0; n < 13; n ++){
            cy.get('button.react-datepicker__navigation.react-datepicker__navigation--next').click();
        }
        var splitdate = this.userdata.end_date.split('-');
        var date = splitdate[splitdate.length-1];
        cy.get('div.react-datepicker__day.react-datepicker__day--0'+date+'').first().click();
        cy.get('input[name="end_date"]').invoke('val').then((text) => {
            expect(this.userdata.end_date).to.equal(text);
        });
        cy.get('select[name=destination_code]').select(this.userdata.destination_code);
        cy.get('select[name=transaction_type]').select('C2C');
        cy.get('select[name=feature]').select(this.userdata.feature);
        cy.get('select[name=mitra_id]').select(this.userdata.mitra_id);
        cy.contains('Cancel')
            .should('be.visible');
        cy.contains('Submit')
            .should('be.visible')
            .click();
        cy.get('.MuiPaper-root')
            .should('have.css', 'background-color')
            .and('eq', 'rgb(76, 175, 80)')        
        cy.get('.MuiAlert-message').then(($message) => {
            expect($message).to.have.text('Successfully Create Data Routing')
        })
        //Log Out
        // cy.get('.btn > .symbol > .symbol-label').click();
        // cy.get('.navi-footer > .btn').click();
        // cy.get('.font-size-h1')
        // .should('be.visible')
        // .then(($font) => {
        //     expect($font).to.have.text('Login Account')
        // })
    })
})
