import React from "react";
import Single_avatar from "./Avatar_sub_components/Single_avatar";
function Avatar({
  inviter,
  cookieName,
}: {
  inviter: string;
  cookieName: string;
}) {
  return (
    <>
      <Single_avatar inviter={inviter} cookieName={cookieName} />
    </>
  );
}

export default Avatar;
