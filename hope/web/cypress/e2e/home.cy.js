
describe('', () => {
    
    it('Acessar página principal', () => {
        cy.visit('http://localhost:3000')

        cy.get('h1')
    });
});