import React from "react";
import { requestUrl } from "../utils/hostUrl_requestUrl";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { InitialState2 } from "../redux/state";
function UserSettings({ cookie }: { cookie: any }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const state = useSelector(
    (state: { setReducer: InitialState2 }) => state.setReducer,
  );

  const deleteCookies = () => {
    cookie.remove("name");
    cookie.remove("token");
    cookie.remove("refresh_token");
    router.push("/");
    dispatch({ type: "SIGN_OUT" });
  };

  const deleteUser = async () => {
    try {
      await axios.delete(`${requestUrl}/users/${cookie.get("name")}`);

      deleteCookies();
      return true;
    } catch (error) {
      console.log(error);

      return false;
    }
  };

  return (
    <div className="user_settings">
      <Link href="/settings/profile">
        <a
          onClick={() => {
            dispatch({ type: "SET_USER_SETTINGS", payload: false });
          }}
        >
          User settings
        </a>
      </Link>
      <Link href="#">
        <a onClick={deleteCookies}>Log out</a>
      </Link>
      <Link href="#">
        <a onClick={deleteUser}>Delete user</a>
      </Link>
    </div>
  );
}

export default UserSettings;
