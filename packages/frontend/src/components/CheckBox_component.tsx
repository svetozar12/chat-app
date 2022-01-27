import React from "react";

export const CheckBox_component = ({
  item,
  invited,
  setInvited,
  allChecked,
}: {
  item: string;
  invited: string[];
  setInvited: React.Dispatch<React.SetStateAction<string[]>>;
  allChecked: boolean;
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
    <div
      onClick={() => setIsChecked(!isChecked)}
      className="flex add_users_checkBox"
    >
      <p style={{ fontSize: "1.3rem" }}>{item}</p>
      <input
        type="checkbox"
        checked={(allChecked && false) || isChecked}
        value={item}
      />
    </div>
  );
};
