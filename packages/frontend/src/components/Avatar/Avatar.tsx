import React from "react";
import Single_avatar from "./Single_avatar";
import Group_avatar from "./Group_avatar";
import { useCookie } from "next-cookie";
import { HStack } from "@chakra-ui/react";

interface IAvatar {
  inviter: string;
  cookieName: string;
  members: string[];
}

function Avatar({ members }: IAvatar) {
  const cookie = useCookie();
  return (
    <HStack w="4rem" h="4rem" data-testid="avatar" title={cookie.get("username")}>
      {members.length <= 2 ? (
        <div>
          <Single_avatar />
        </div>
      ) : (
        <div>
          <Group_avatar members={members} />
        </div>
      )}
    </HStack>
  );
}

export default Avatar;
