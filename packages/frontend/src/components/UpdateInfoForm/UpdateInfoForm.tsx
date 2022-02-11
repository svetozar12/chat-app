import React from "react";
import Link from "next/dist/client/link";
import { useSelector, useDispatch } from "react-redux";
import { InitialState3 } from "redux/state";
import { FaUserCircle } from "react-icons/fa";
import styled from "@emotion/styled";
import axios from "axios";
import { requestUrl } from "utils/hostUrl_requestUrl";

const Input_file_container = styled.div`
  margin-top: 2rem;
`;

const Input_file = styled.label`
  background: var(--main-black);
  color: var(--main-white);
  border: 1px solid var(--input-border-color);
  transition: 0.3s;
  padding: 0.5rem;
  cursor: pointer;
  &:hover {
    background: var(--main-white);
    transition: 0.3s;
    color: var(--main-black);
  }
`;
const User_image = styled.image`
  width: 2rem;
  height: 2rem;
`;
export const UpdateInfoForm = ({
  url,
  handleSubmit,
  setImage,
  cookieName,
}: {
  url: string;
  image: string;
  handleSubmit: (e: any) => Promise<false | undefined>;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  cookieName: string;
}) => {
  const [hasAvatar, setHasAvatar] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState("");
  const dispatch = useDispatch();
  const state = useSelector(
    (state: { saveInputReducer: InitialState3 }) => state.saveInputReducer,
  );

  const getUserImage = async (name: string) => {
    try {
      const res = await axios.get(`${requestUrl}/users/${name}`);
      const userAvatar = res.data.user.userAvatar;
      if (!userAvatar) {
        setHasAvatar(false);
        return true;
      }
      setHasAvatar(true);
      const requestString = `${requestUrl}/${userAvatar}`;
      setImageUrl(requestString);
      return true;
    } catch (error) {
      return false;
    }
  };

  React.useEffect(() => {
    getUserImage(cookieName);
  }, []);
  return (
    <form style={{ width: "100%", minWidth: "342px" }} className="container">
      <h2 style={{ fontSize: "2vw" }}>Update your profile info</h2>
      <label htmlFor="">Email</label>
      <input
        type="email"
        value={state.input_email}
        onChange={(e) =>
          dispatch({
            type: "SAVE_INPUT_EMAIL",
            payload: e.target.value,
          })
        }
      />
      <div className="input_gender">
        <div>
          <label htmlFor="Male">Male</label>
          <input
            onChange={(e) =>
              dispatch({
                type: "SAVE_INPUT_GENDER",
                payload: e.target.value,
              })
            }
            type="radio"
            name="gender"
            id="Male"
            value="Male"
          />
        </div>
        <div>
          <label htmlFor="Female">Female</label>
          <input
            onChange={(e) =>
              dispatch({
                type: "SAVE_INPUT_GENDER",
                payload: e.target.value,
              })
            }
            type="radio"
            name="gender"
            id="Female"
            value="Female"
          />
        </div>
        <div>
          <label htmlFor="Others">Others</label>
          <input
            onChange={(e) =>
              dispatch({
                type: "SAVE_INPUT_GENDER",
                payload: e.target.value,
              })
            }
            type="radio"
            name="gender"
            id="Others"
            value="Others"
          />
        </div>
      </div>
      <Input_file_container>
        {hasAvatar ? (
          <img src={imageUrl} className="click" />
        ) : (
          <FaUserCircle style={{ width: "2rem", height: "2rem" }} />
        )}
        <input
          type="file"
          name="userAvatar"
          placeholder="Select file"
          className="input_file"
          id="file"
          style={{ display: "none" }}
          onChange={(e: any) => setImage(e.target.files[0])}
        />
        <Input_file className="input_file" htmlFor="file">
          Add file
        </Input_file>
      </Input_file_container>
      <button
        style={{ fontSize: "1vw", textAlign: "center" }}
        onClick={handleSubmit}
        type="submit"
      >
        Update
      </button>
      <Link href={`/${url}`}>
        <a className="link" style={{ color: "var(--main-blue)" }}>
          Go back
        </a>
      </Link>
    </form>
  );
};
