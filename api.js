import { Client } from "@gadget-client/doc-inspector";
export const api = new Client({
  environment: "Development",
  // for client side data access, we don't pass anything and the client will default to using the browser session authentication mode
  // for server side data access, pass an API key by uncommenting the line below
  authenticationMode: { anonymous: true },
});
