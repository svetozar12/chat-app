// This is a great place to put global configuration and
// behavior that modifies Cypress.
import "./commands";
declare global {
  namespace Cypress {
    interface Chainable {
      authentication(users: string[]): Chainable<Element>;
      delete_users(users: string[]): Chainable<Element>;
      set_tokens(user: string): Chainable<Element>
    }
  }
}
