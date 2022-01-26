import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { InitialState2 } from "../redux/state";
import { GrClose } from "react-icons/gr";
export const AddUsers_Modal = ({ users }: { users: string[] }) => {
  const dispatch = useDispatch();
  const state = useSelector(
    (state: { setReducer: InitialState2 }) => state.setReducer,
  );

  return (
    <div className="fRequests_modal">
      <section
        style={{ position: "relative", textAlign: "center" }}
        className="modal_heading flex"
      >
        <h1 style={{ padding: "0 25%" }}>Add people</h1>
        <div
          onClick={() => {
            dispatch({
              type: "SET_MODAL_INVITE",
              payload: !state.setModalInvite,
            });
          }}
          style={{ width: "3rem", height: "3rem" }}
          className="circle_border absolute_top_right flex"
        >
          <GrClose style={{ width: "2rem", height: "2rem" }} />
        </div>
      </section>
      <div
        className="flex"
        style={{ overflowY: "scroll", width: "100%", flexDirection: "column" }}
      >
        {users.map((item, index) => {
          const [isChecked, setIsChecked] = React.useState(false);

          return (
            <div
              onClick={() => setIsChecked(!isChecked)}
              className="flex add_users_checkBox"
            >
              <p style={{ fontSize: "1.3rem" }} key={index}>
                {item}
              </p>
              <input type="checkbox" checked={isChecked} value={item} />
            </div>
          );
        })}
      </div>
      <div className="modal_footer flex">
        <button className="button" type="submit">
          submit
        </button>
      </div>
    </div>
  );
};
