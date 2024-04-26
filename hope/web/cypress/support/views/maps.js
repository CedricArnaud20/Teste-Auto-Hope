Cypress.Commands.add('BuscarOrfanato',(name)=>{

    const popup = '.leaflet-popup-content'

    cy.visitWithMockGeolocation('/map')

        cy.get('.leaflet-marker-icon').as('mapsList')

        cy.get('@mapsList').each((ele, index, list) => {

            cy.get('@mapsList')
                .eq(index)
                .click({ force: true })
            cy.wait(1000)

            cy.get(popup).as('orfaName')

            cy.get('@orfaName')
                .invoke('text')
                .then((txt) => {
                    cy.log(txt)
                    if (txt === name){
                        cy.get('@mapsList').eq(index).as('foundItem')
                    }                       
                })

        })
        
        cy.get('@foundItem').click({ force: true })
        cy.get('.leaflet-popup-content> a').click({ force: true })


})


Cypress.Commands.add('ValidarUrl',(position)=>{

    
    const googleUrl =`https://www.google.com/maps/dir/?api=1&destination=${position.latitude},${position.longitude}`


        
    cy.contains('a', 'Ver rotas no Google Maps')
    .should('have.attr','href', googleUrl)


})