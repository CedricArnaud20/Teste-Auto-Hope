import data from '../fixtures/Orfa.json'

//import {faker} from '@faker-js/faker'

describe('Cadastrar orfanato', () => {
    
    it('Deve cadastrar um novo orfanato', () => {
       // cy.visit('http://localhost:3000/orphanages/create')

       

       const orfanato = data.PrimeroOrfa


       cy.deleteMany({name: orfanato.name}, {collection: 'orphanages'});

       cy.visitWithMockGeolocation('http://localhost:3000/orphanages/create')

        cy.get('legend')
            .should('be.visible')
            .should('have.text','Cadastro')


        cy.get('.leaflet-container').should('be.visible')

        cy.setMapPosition(orfanato.position)
    
        //cy.get('input[name=name]').type('Infancia feliz')

        // cy.xpath('//label[text()]="Nome"]/..//input')
        // cy.contains('Nome')
        //     .parent()
        //     .find('input').type('Infancia feliz')


        // cy.contains('Sobre ')
        // .parent()
        // .find('textarea').type('Infancia feliz')

        //cy.get('#name').type(orfanato.name+' '+ faker.company.name() )

        cy.get('#name').type(orfanato.name)

        cy.get('#description').type(orfanato.description)


        cy.get('input[type=file]').selectFile('cypress/fixtures/criancas-felizes.jpg', {force: true })

        cy.get('#opening_hours').type(orfanato.opening_hours)


        cy.contains('button', orfanato.open_on_weekends).click()


        cy.get('.save-button').click()


        });




});





Cypress.Commands.add('visitWithMockGeolocation', (url, latitude = -15.7525959, longitude = -47.7535236) => {
    const mockGeolocation = (win, latitude, longitude) => {
      cy.stub(win.navigator.geolocation, 'getCurrentPosition', cb => {
        return cb({ coords: { latitude, longitude } });
      });
    };
    cy.visit(url, {
      onBeforeLoad: win => {
        mockGeolocation(win, latitude, longitude);
      }
    });

  });

Cypress.Commands.add('setMapPosition',(position) =>{
    window.localStorage.setItem('hope-qa:latitude', position.latitude)
    window.localStorage.setItem('hope-qa:longitude', position.longitude)

})


