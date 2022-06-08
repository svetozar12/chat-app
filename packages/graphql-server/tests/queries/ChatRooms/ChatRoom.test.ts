import axios, { AxiosError } from "axios";
import constant from "../../../src/constants";
import buildUrl from "../../../src/utils/buildUrl";
let ChatId;
const testUser = { username: "vanka", password: "vanka", email: "vanka@.com", gender: "Male" };

const getChatId = () => {
  const url = buildUrl("chat-room", [{ name: "user_name", value: "vanka" }]);
  axios
    .get(url)
    .then((response) => {
      ChatId = response.data.contacts[0]._id;
      console.log(ChatId);
    })
    .catch((err) => {
      console.log(err);
    });
};

beforeAll(async () => {
  getChatId();
});

describe("Testing GetChatRoom resolver", () => {
  test("GetChatRooms", async () => {
    try {
      const response = await axios.post(constant.graphql_server_url, {
        query: `
          query {
           GetChatRoom(id:${ChatId.toString()}) {
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
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const err = error as AxiosError<{ ErrorMsg: string }>;
        console.log(err.response?.data);
      }
    }
  });
});
