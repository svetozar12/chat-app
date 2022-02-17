import React from "react";
import Link from "next/dist/client/link";
import { useSelector, useDispatch } from "react-redux";
import { InitialState3 } from "../../redux/state";
import { css } from "@emotion/css";
import styled from "@emotion/styled";
import Single_avatar from "../Avatar/Single_avatar/Single_avatar";
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

const Button = styled.button`
  width: 20%;
  background: yellow;
`;

export const UpdateInfoForm = ({
  url,
  handleSubmit,
  setImage,
  cookieName,
}: {
  url?: string;
  image?: string;
  handleSubmit: (e: any) => Promise<false | undefined>;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  cookieName: string;
}) => {
  const dispatch = useDispatch();
  const state = useSelector(
    (state: { saveInputReducer: InitialState3 }) => state.saveInputReducer,
  );

  return (
    <main
      title="user_settings"
      className={css`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        hieght: 100%;
      `}
    >
      <section
        className={css`
          width: 25%;
          height: 50vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          border-right: 1px solid rgba(0, 0, 0, 0.2);
        `}
      >
        <h1
          className={css`
            font-size: 2vw;
            margin-right: 1rem;
          `}
        >
          Profile
        </h1>
        <Single_avatar cookieName={cookieName} width="6rem" height="6rem" />
      </section>
      <form style={{ width: "75%", height: "50vh", minWidth: "342px" }}>
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
        <Button
          style={{ fontSize: "1vw", textAlign: "center" }}
          onClick={handleSubmit}
          type="submit"
        >
          Save
        </Button>
        <Button
          style={{ fontSize: "1vw", textAlign: "center" }}
          onClick={handleSubmit}
          type="submit"
        >
          Cancel
        </Button>
      </form>
      <Link href={`/${url}`}>
        <a className="link" style={{ color: "var(--main-blue)" }}>
          Go back
        </a>
      </Link>
    </main>
  );
};
