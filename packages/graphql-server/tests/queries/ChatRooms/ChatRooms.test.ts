import axios, { AxiosError } from "axios";
import { generic } from "../../../src/constants/index";

describe("Testing GetChatRooms resolver", () => {
  test("GetChatRooms", async () => {
    const response = await axios.post(generic.graphql_server_url, {
      query: `
          query {
            GetChatRooms(username:"vanka") {
              message
              contacts {
                _id
                members
              }
            }
        }`,
    });

    const data = response.data.data.GetChatRooms;

    expect(data).toHaveProperty("message");
    expect(data.contacts[0]).toHaveProperty("_id");
    expect(data.contacts[0]).toHaveProperty("members");
    for (const element of data.contacts[0].members) {
      expect(element).not.toBe("");
    }
    expect(data.members).not.toBe([]);
  });
});
