import React from "react";
import Single_avatar from "./Single_avatar/Single_avatar";
import Group_avatar from "./Group_avatar/Group_avatar";
function Avatar({ inviter, cookieName, members }: { inviter: string; cookieName: string; members: string[] }) {
  return (
    <section data-testid="avatar" title={cookieName}>
      {members.length <= 2 ? (
        <div>
          <Single_avatar inviter={inviter} cookieName={cookieName} />
        </div>
      ) : (
        <div>
          <Group_avatar inviter={inviter} members={members} cookieName={cookieName} />
        </div>
      )}
    </section>
  );
}

export default Avatar;
