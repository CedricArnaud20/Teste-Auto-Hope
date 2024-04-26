
import CreatePage from '../support/create/index.js'

import data from '../fixtures/Orfa.json'

//import {faker} from '@faker-js/faker'

describe('Cadastrar orfanato', () => {

  it('Deve cadastrar um novo orfanato', () => {

    const orfanato = data.PrimeroOrfa

    // deletar dados no banco a cada novo cadastro através de custom commands
    cy.deleteMany({ name: orfanato.name }, { collection: 'orphanages' });

    // acessar página usando a função que permitir acesar as páginas

    cy.goToCreate()

    // Preencher formulário
    cy.CadastrarOrfanato(orfanato)

    // Assertion
    CreatePage.Popup.haveText('Orfanato cadastrado com sucesso.')

  });


  it('Não deve cadastrar orfanato com nome duplicado', () => {


    const orfanato = data.SegundoOrfa


    cy.deleteMany({ name: orfanato.name }, { collection: 'orphanages' });

    // primeiro cadastro

    cy.postOrfa(orfanato)

    // Segundo cadastro

    // acessar página usando a função que permitir acesar as páginas

    cy.goToCreate()

    // Preencher formulário
    cy.CadastrarOrfanato(orfanato)

    // Assertion

    cy.popupHaveText('Já existe um cadastro com o nome: Casa dos Anjos')

  });


  context('Validar Campo obrigaóros', () => {

    
  it('Não deve cadastrar se o  nome não foi informado', () => {

    let orfanato = data.map

    delete orfanato.name
  
    

    cy.goToCreate()

    // Preencher formulário
    cy.CadastrarOrfanato(orfanato)


    cy.ValidarCampo('Nome', 'Campo obrigatório')


  });
  
  it('Não deve cadastrar se a descrição não foi informado', () => {

    let orfanato = data.map

    delete orfanato.description

    cy.goToCreate()

    // Preencher formulário
    cy.CadastrarOrfanato(orfanato)

    cy.ValidarCampo('Sobre', 'Campo obrigatório')

  });

  
  it('Não deve cadastrar se a imagem não foi adicionada', () => {

    let orfanato = data.map

    delete orfanato.image
    
    cy.goToCreate()

    // Preencher formulário
    cy.CadastrarOrfanato(orfanato)

    cy.ValidarCampo('Fotos', 'Envie pelo menos uma foto')

  });

  
  it('Não deve cadastrar se o horário  não foi informado', () => {

    let orfanato = data.map

    delete orfanato.opening_hours
    

    cy.goToCreate()

    // Preencher formulário
    cy.CadastrarOrfanato(orfanato)
    cy.ValidarCampo('Horário de funcinamento', 'Campo obrigatório')

  });

  
  it('Não deve cadastrar se os campos obrigatórios não foram informados', () => {

    let orfanato = data.map

    delete orfanato.name
    delete orfanato.description
    delete orfanato.image
    delete orfanato.opening_hours
    

    cy.goToCreate()

    // Preencher formulário
    cy.CadastrarOrfanato(orfanato)


    cy.ValidarCampo('Nome', 'Campo obrigatório')
    cy.ValidarCampo('Sobre', 'Campo obrigatório')
    cy.ValidarCampo('Fotos', 'Envie pelo menos uma foto')
    cy.ValidarCampo('Horário de funcinamento', 'Campo obrigatório')
  
    // Assertion
    //cy.popupHaveText('Já existe um cadastro com o nome: Casa dos Anjos')
  });



    
  });



});











