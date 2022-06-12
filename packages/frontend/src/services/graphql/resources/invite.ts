import { api } from "../api_helper";

const rootUrl = "";

interface IInvite {
  user_id: string;
  token: string;
  status?: "accepted" | "declined" | "recieved";
}

const invite = {
  getAllByReciever: async ({ user_id, token, status }: IInvite) => {
    try {
      const condition = status ? `status:"${status}"` : "";
      const res = await api(rootUrl, {
        data: {
          query: `
        query {
          getInvitesByReciever(user_id: "${user_id}",token:"${token}",${condition}) {
            _id
            inviter
            reciever
            status
          }
         }`,
        },
      });
      return res.data.data;
    } catch (error) {
      return false;
    }
  },

  getAllByInviter: async ({ user_id, token, status }: IInvite) => {
    try {
      const condition = status ? `status:"${status}"` : "";
      const res = await api(rootUrl, {
        data: {
          query: `
        query {
          getInvitesByInviter(user_id: "${user_id}",token:"${token}",${condition}) {
            _id
            inviter
            reciever
            status
          }
         }`,
        },
      });
      return res.data;
    } catch (error) {
      return false;
    }
  },

  create: async (user_id: string, reciever: string, token: string) => {
    try {
      const res = await api(rootUrl, {
        data: {
          query: `
        mutation {
          createInvite(user_id: "${user_id}",reciever:"${reciever}",token:"${token}") {
            _id
            inviter
            reciever
            status
          }
         }`,
        },
      });
      return res.data;
    } catch (error) {
      return false;
    }
  },

  createGroupChat: async (usersData: string[]) => {
    try {
      const res = await api(rootUrl, {
        data: {
          query: `
        mutation {
          createInviteGroupChat(usersData:${usersData}) {
            data
            Message
          }
         }`,
        },
      });
      return res.data;
    } catch (error) {
      return false;
    }
  },

  update: async (user_id: string, status: string, token: string) => {
    try {
      const res = await api(rootUrl, {
        data: {
          query: `
        mutation {
          updateInvite(user_id: "${user_id}",status:"${status}",token:"${token}") {
            _id
            inviter
            reciever
            status
          }
         }`,
        },
      });
      return res.data;
    } catch (error) {
      return false;
    }
  },
};

export default invite;
