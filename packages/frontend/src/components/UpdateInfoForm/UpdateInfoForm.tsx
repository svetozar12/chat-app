import React from "react";
import Link from "next/dist/client/link";
import { useSelector, useDispatch } from "react-redux";
import ISave_inputState from "../../redux/reducer/save_inputReducer/state";
import { css } from "@emotion/css";
import Single_avatar from "../Avatar/Single_avatar/Single_avatar";
import { Form, Button, Input, Label_button } from "../styledComponents";
import { AiFillPlusCircle } from "react-icons/ai";

const UpdateInfoForm = ({
  url,
  handleSubmit,
  image,
  setImage,
}: {
  url?: string;
  image?: string;
  handleSubmit: any;
  setImage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const dispatch = useDispatch();
  const state = useSelector((state: { saveInputReducer: ISave_inputState }) => state.saveInputReducer);

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
          `}
        >
          {/* <p>{image}</p> */}
          <Single_avatar inviter="" width="6rem" height="6rem" preview={image} />
          <label
            className={css`
              width: 6rem;
              height: 6rem;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
              position: absolute;
              top: 0;
              transition: 0.2s;
              border-radius: 100%;
              border: none;
              &:hover {
                background: rgba(0, 0, 0, 0.1);
                transition: 0.2s;
              }
            `}
            htmlFor="file"
          >
            <AiFillPlusCircle
              className={css`
                width: 2rem;
                height: 2rem;
                position: absolute;
                bottom: 0;
                right: 0;
                z-index: 10;
                transition: 0.2s;
                &: hover {
                  opacity: 0.9;
                  transition: 0.2s;
                }
              `}
            />
          </label>
        </div>
        <label
          className={css`
            margin: "2rem 1rem 0 0";
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
          `}
          htmlFor="file"
        >
          Add file
        </label>
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

        <div
          className={css`
            margin-top: 2rem;
          `}
        >
          <input
            type="file"
            name="userAvatar"
            placeholder="Select file"
            className="input_file"
            id="file"
            style={{ display: "none" }}
            onChange={(e: any) => setImage(e.target.files[0])}
          />
        </div>
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

export default UpdateInfoForm;
