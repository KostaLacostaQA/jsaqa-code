import user from '../fixtures/user.json';

describe("API user tests", () => {
    it("Should create a new user", () => {
        cy.createUser(user.id[0], user.username, user.firstName, user.lastName, user.email, user.password, user.phone, user.userStatus)
            .then((response) => {
                expect(response.status).to.eql(200);
            });
    });

    it("Should update id", () => {
        cy.createUser(user.id[0], user.username, user.firstName, user.lastName, user.email, user.password, user.phone, user.userStatus);
        cy.updateUser(user.id[1], user.username, user.firstName, user.lastName, user.email, user.password, user.phone, user.userStatus)
            .then((response) => {
                expect(response.body.message).to.eql("177");
            });
    });

    it("Should delete user", () => {
        cy.createUser(user.id[0], user.username, user.firstName, user.lastName, user.email, user.password, user.phone, user.userStatus);
        cy.deleteUser(user.username)
            .then((response) => {
                expect(response.body.lastName).to.not.equal("Dukov");
                expect(response.status).to.eql(200);
            });
    });
});