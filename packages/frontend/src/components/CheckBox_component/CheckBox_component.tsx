import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/css";
const Add_users_checkBox = styled.div`
  width: 95%;
  border-top: 1px solid rgba(0, 0, 0, 0.3);
  justify-content: space-between;
  cursor: pointer;
`;

const Suggested_user = styled.p`
  font-size: 1.3rem;
`;
export const CheckBox_component = ({
  item,
  invited,
  setInvited,
}: {
  item: string;
  invited: string[];
  setInvited: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [isChecked, setIsChecked] = React.useState(false);
  React.useEffect(() => {
    if (isChecked) {
      setInvited([...invited, item]);
      return;
    }
    const newArr = invited.filter((element) => element != item);
    setInvited(newArr);
  }, [isChecked]);

  return (
    <Add_users_checkBox
      title="checkbox"
      onClick={() => setIsChecked(!isChecked)}
      className="flex"
    >
      <Suggested_user>{item}</Suggested_user>
      <input
        className={css`
          width: 1.25rem;
          height: 1.25rem;
          margin: 0 1rem;
        `}
        type="checkbox"
        onChange={() => setIsChecked(!isChecked)}
        checked={isChecked}
        value={item}
      />
    </Add_users_checkBox>
  );
};
