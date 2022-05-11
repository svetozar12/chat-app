import axios from "axios";
import { generic } from "../../src/constants/index";

describe("Testing GetChatRooms resolver", () => {
  test("GetChatRooms", async () => {
    const response = await axios.post(generic.graphql_server_url, {
      query: `
          query {
           GetChatRoom(id:"627c01be003af7522ca475cb") {
            _id
            members
          }
        }`,
    });

    const data = response.data.data.GetChatRoom;

    expect(data).toHaveProperty("_id");
    expect(data).toHaveProperty("members");
    for (const element of data.members) {
      expect(element).not.toBe("");
    }
    expect(data.members).not.toBe([]);
  });
});
