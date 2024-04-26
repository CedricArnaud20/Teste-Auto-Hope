

Cypress.Commands.add('goToCreate', () => {

    cy.visitWithMockGeolocation('/orphanages/create')

    cy.get('legend')
        .should('be.visible')
        .should('have.text', 'Cadastro')


})


Cypress.Commands.add('CadastrarOrfanato', (orfanato) => {
    // Definir posição no mapa atrevés do costum commands  
    cy.setMapPosition(orfanato.position)

    // if (orfanato.name) {
    //     cy.get('#name').type(orfanato.name)   
    // }
    
    orfanato.name ? 
        cy.get('#name').type(orfanato.name) : 
            cy.log('Empty field')

    orfanato.description ? 
        cy.get('#description').type(orfanato.description) : 
            cy.log('Empty field')

    orfanato.image ?
        cy.get('input[type=file]').selectFile('cypress/fixtures/images/' + orfanato.image, { force: true }):
        cy.log('Empty field')
    orfanato.opening_hours ? 
        cy.get('#opening_hours').type(orfanato.opening_hours) : 
            cy.log('Empty field')

    


    // cy.get('#description').type(orfanato.description)

    // cy.get('input[type=file]').selectFile('cypress/fixtures/images/' + orfanato.image, { force: true })

    // cy.get('#opening_hours').type(orfanato.opening_hours)

    cy.contains('button', orfanato.open_on_weekends ? "Sim" : "Não").click()

    cy.get('.save-button').click()
    
})


