import React from "react";

function User_list({ _id, members }: { _id: string; members: string[] }) {
  return <div>{members}</div>;
}

export default User_list;
