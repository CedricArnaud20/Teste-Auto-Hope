import data from '../fixtures/Orfa.json'

describe('Percorre mapa', () => {


    it('Deve poder escolher um orfanto no mapa', () => {

        const orfanato = data.map

        cy.deleteMany({ name: orfanato.name }, { collection: 'orphanages' });

        cy.postOrfa(orfanato)
 
        cy.BuscarOrfanato(orfanato.name)

        
        cy.contains('h1', orfanato.name)
            .should('be.visible')   


        cy.ValidarUrl(orfanato.position)
    });

});