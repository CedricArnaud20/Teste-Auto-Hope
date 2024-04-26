import Popup from "../pages/components/popups"


class CreatePage {


    constructor(){
        this.Popup = Popup
    }

    go(){
        cy.visitWithMockGeolocation('http://localhost:3000/orphanages/create')

        cy.get('legend')
            .should('be.visible')
            .should('have.text', 'Cadastro')

    }

    form(orfanato) {

        cy.get('#name').type(orfanato.name)

        cy.get('#description').type(orfanato.description)

        cy.get('input[type=file]').selectFile('cypress/fixtures/images/' +orfanato.image, {force: true })

        cy.get('#opening_hours').type(orfanato.opening_hours)

        cy.contains('button', orfanato.open_on_weekends).click()
    }

    submit() {
        cy.get('.save-button').click()
    }
}

export default new CreatePage();



