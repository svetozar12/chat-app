import React from "react";
import { requestUrl } from "../utils/hostUrl_requestUrl";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";
function UserSettings({ cookie }: { cookie: any }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const deleteCookies = () => {
    cookie.remove("name");
    cookie.remove("token");
    cookie.remove("refresh_token");
    router.push("/");
    dispatch({ type: "SIGN_OUT" });
  };

  const deleteUser = async () => {
    try {
      const res = await axios.delete(
        `${requestUrl}/users/${cookie.get("name")}`,
      );
      console.log(res);

      deleteCookies();
      return true;
    } catch (error) {
      console.log(error);

      return false;
    }
  };

  return (
    <div className="user_settings">
      <a href="#">User settings</a>
      <a href="" onClick={deleteCookies}>
        Log out
      </a>
      <a href="" onClick={deleteUser}>
        Delete user
      </a>
    </div>
  );
}

export default UserSettings;
