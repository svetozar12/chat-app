import React from "react";
import Link from "next/dist/client/link";
import { useSelector, useDispatch } from "react-redux";
import { InitialState3 } from "../../redux/state";
import { css } from "@emotion/css";
import styled from "@emotion/styled";
import Single_avatar from "../Avatar/Single_avatar/Single_avatar";
import { Form, Button, Input } from "../LoginForm/LoginForm";
import { Label_button } from "../RegisterForm/RegisterForm";
import { AiFillPlusCircle } from "react-icons/ai";

const Input_file_container = styled.div`
  margin-top: 2rem;
`;

const Input_file = styled.label`
  margin-top: 1rem;
  border-radius: 5px;
  width: 60%;
  background-color: var(--button-blue);
  color: var(--main-white);
  border: 1px solid var(--input-border-color);
  padding: 1rem;
  cursor: pointer;
  transition: 0.2s;
  font-weight: bold;
  font-size: 1rem;
  text-align: center;
  &:hover {
    opacity: 0.7;
    transition: 0.2s;
  }
`;

export const UpdateInfoForm = ({
  url,
  handleSubmit,
  setImage,
  cookieName,
}: {
  url?: string;
  image?: string;
  handleSubmit: any;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  cookieName: string;
}) => {
  const dispatch = useDispatch();
  const state = useSelector((state: { saveInputReducer: InitialState3 }) => state.saveInputReducer);

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
          padding: 3rem;
          width: 25%;
          height: 70vh;
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
            margin-top: 3rem;
          `}
        >
          Profile
        </h1>
        <div
          className={css`
            position: relative;
            width: 6rem;
            height: 6rem;
            margin-right: 1rem;
          `}
        >
          <Single_avatar cookieName={cookieName} width="6rem" height="6rem" />
          <label
            className={css`
              width: 2rem;
              height: 2rem;
              position: absolute;
              bottom: 0;
              right: 0;
              cursor: pointer;
            `}
            htmlFor="file"
          >
            <AiFillPlusCircle
              className={css`
                width: 2rem;
                height: 2rem;
                transition: 0.2s;
                &:hover {
                  opacity: 0.7;
                  transition: 0.2s;
                }
              `}
            />
          </label>
        </div>
        <Input_file style={{ margin: "2rem 1rem 0 0" }} className="input_file" htmlFor="file">
          Add file
        </Input_file>
      </section>
      <Form
        style={{
          width: "75%",
          margin: "0 1rem",
          height: "70vh",
          minWidth: "342px",
        }}
      >
        <h2 style={{ fontSize: "2vw" }}>Update your profile info</h2>
        <label htmlFor="">Email</label>
        <Input
          type="email"
          value={state.input_email}
          className={css`
            width: 75%;
          `}
          onChange={(e) =>
            dispatch({
              type: "SAVE_INPUT_EMAIL",
              payload: e.target.value,
            })
          }
        />
        <div className="input_gender flex">
          <div>
            {/* Input have to be placed before label or css will not work */}
            <input
              className={css`
                opacity: 0;
                position: fixed;
                width: 0;
              `}
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
            <Label_button htmlFor="Male">Male</Label_button>
          </div>
          <div>
            {/* Input have to be placed before label or css will not work */}
            <input
              className={css`
                opacity: 0;
                position: fixed;
                width: 0;
              `}
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
            <Label_button htmlFor="Female">Female</Label_button>
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
        </Input_file_container>
        <Button style={{ fontSize: "1vw", textAlign: "center" }} onClick={handleSubmit} type="submit">
          Save
        </Button>
        <Link href={`/${url}`}>
          <Button className="link">Go back</Button>
        </Link>
      </Form>
    </main>
  );
};
