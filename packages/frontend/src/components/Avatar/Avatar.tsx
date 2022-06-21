import React from "react";
import Single_avatar from "./Single_avatar";
import Group_avatar from "./Group_avatar";
import { useCookie } from "next-cookie";

interface IAvatar {
  inviter: string;
  cookieName: string;
  members: string[];
}

function Avatar({ inviter, members }: IAvatar) {
  const cookie = useCookie();
  return (
    <section data-testid="avatar" title={cookie.get("username")}>
      {members.length <= 2 ? (
        <div>
          <Single_avatar />
        </div>
      ) : (
        <div>
          <Group_avatar members={members} />
        </div>
      )}
    </section>
  );
}

export default Avatar;
