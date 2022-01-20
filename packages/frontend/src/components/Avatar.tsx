import React from "react";
import Single_avatar from "./Avatar_sub_components/Single_avatar";
import Group_avatar from "./Avatar_sub_components/Group_avatar";
function Avatar({
  inviter,
  cookieName,
  members,
}: {
  inviter: string;
  cookieName: string;
  members: string[];
}) {
  return (
    <>
      {members.length <= 2 ? (
        <Single_avatar inviter={inviter} cookieName={cookieName} />
      ) : (
        <Group_avatar inviter={inviter} cookieName={cookieName} />
      )}
    </>
  );
}

export default Avatar;
