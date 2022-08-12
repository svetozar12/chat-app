import * as mutation from "./mutations";
import * as queries from "./queries";

const root = { ...mutation, ...queries };

export default root;
