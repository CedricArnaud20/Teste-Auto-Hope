// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import './views/maps.js'
import './views/create.js'
import './views/components.js'
import './views/home.js'

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

Cypress.Commands.add('setMapPosition', (position) => {
    window.localStorage.setItem('hope-qa:latitude', position.latitude)
    window.localStorage.setItem('hope-qa:longitude', position.longitude)

})


Cypress.Commands.add('postOrfa', (orfanato) => {


    cy.fixture('images/' + orfanato.image)
        .then((image) => Cypress.Blob.binaryStringToBlob(image, 'image/png'))
        .then((blob) => {

            const formData = new FormData();

            formData.append('name', orfanato.name);
            formData.append('description', orfanato.description);
            formData.append('latitude', orfanato.position.latitude);
            formData.append('longitude', orfanato.position.longitude);
            formData.append('opening_hours', orfanato.opening_hours);
            formData.append('open_on_weekends', orfanato.open_on_weekends);
            formData.append('images', blob, orfanato.image);



            cy.request({
                url: 'http://localhost:3333/orphanages',
                method: 'POST',
                headers: {
                    'content-type': 'multipart/form-data'
                },
                body: formData
            }).then(response => {
                expect(response.status).to.eq(201)
            })

        })


})

