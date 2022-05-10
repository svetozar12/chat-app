// import { SignleRoom } from "../../types/ChatRoom.Schema";
// import fetch from "node-fetch";
// import buildUrl from "../../utils/buildUrl";
// import { GraphQLString } from "graphql";

// interface IGetChatRoom {
//     id: string;
// }

// const GetChatRoom = {
//   type: SignleRoom,
//   args: {
//     id: { type: GraphQLString },
//   },
//     async resolve(parent: undefined, args: IGetChatRoom, context: undefined) {
//       const response = await fetch(buildUrl("/chat-room", { name: "user_name", value: args.username }), {
//         method: "GET",
//         headers: { "Content-Type": "application/json" },
//       });
//       const body = await response.json();
//       return body;
//   },
// };
