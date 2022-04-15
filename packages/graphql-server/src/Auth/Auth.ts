import fetch from "node-fetch";

const response = async () => {
  const response = await fetch(`${process.env.API_URL as string}/auth/user`, {
    method: "get",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Iml2YW4iLCJwYXNzd29yZCI6Iml2YW4iLCJpYXQiOjE2NTAwNTk2ODAsImV4cCI6MTY1MDA2MzI4MH0.xhgtAnNsiKna_y6yqZR5JacMQASdg_w-0JYI1kJ87Zo",
    },
  });

  return await response.json();
};

export default response;
