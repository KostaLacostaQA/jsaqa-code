describe('template spec', () => {

beforeEach(() => {
  cy.visit('/')
})

  it('Successful entry', () => {
    cy.get('.text-light').should('be.visible');
    cy.contains('Log in').click();
    cy.login('bropet@mail.ru', '123');
    cy.get('.pt-2').should('be.visible');
  })

  it('No email', () => {
    cy.get('.text-light').should('be.visible');
    cy.contains('Log in').click();
    cy.login(null, '123');

    cy.validity('#mail');
  })

  it('No password', () => {
    cy.get('.text-light').should('be.visible');
    cy.contains('Log in').click();
    cy.login('bropet@mail.ru', null);
    
    cy.validity('#pass');
  })
})

describe('Works with books', () => {

  const book = {
    title: "Гарри Поттер и Кубок огня",
    description:
      "Гарри Поттер, Рон и Гермиона возвращаются на четвёртый курс школы чародейства и волшебства Хогвартс.",
    author: "Дж.К. Роулинг",
  };

  const bookSecond = {
    title: "Анна Каренина",
    description:
      "«А́нна Каре́нина» — роман Льва Толстого о трагической любви замужней дамы Анны Карениной и блестящего офицера Алексея Вронского на фоне счастливой семейной жизни...",
    author: "Лев толстой",
  };

  beforeEach(() => {
    cy.visit('/')
    cy.contains('Log in').click();
    cy.login('bropet@mail.ru', '123');
  })
  
  it('Successfully adding a book that is not a favorite', () => {
    cy.AddNew(book);
    cy.contains(book.title).should("be.visible");
    });
  
    it('Adding a book to favorites', () => {
      cy.AddNew(bookSecond);
      cy.get('div:contains("Анна Каренина") + div button:contains("Add to favorite")').click();
      cy.get('h4').click();
      cy.contains(bookSecond.title).should("be.visible");
    });
  
    it('Failed to add a new book', () => {
      cy.AddNew(null);
      cy.get("#title")
      .then((elements) => elements[0].checkValidity())
      .should("be.false");
      cy.get("#title")
      .then((elements) => elements[0].validationMessage)
      .should("contain", "Заполните это поле.");
    })
  })