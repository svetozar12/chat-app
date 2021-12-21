import React from "react";
import axios from "axios";

function AddGroupChat() {
  const [user, setUser] = React.useState<string>("");
  const [usersData, setUsersData] = React.useState<string[]>([]);

  const addToGroup = (user: string, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsersData((prev) => [...prev, user]);
    setUser("");
  };
  const handleSumbit = async () => {
    try {
      await axios.post("http://localhost:4002/group-chat", {
        usersData,
      });
      return true;
    } catch (error) {
      return false;
    }
  };
  return (
    <div>
      <form onSubmit={(e) => addToGroup(user, e)}>
        <input
          onChange={(e) => setUser(e.target.value)}
          value={user}
          style={{ width: "70%" }}
          type="search"
        />
        <button onClick={handleSumbit} type="button">
          Create room
        </button>
      </form>
      <div className="group_chat_users">
        {usersData.map((element, index) => {
          return (
            <p style={{ color: "black" }} key={index}>
              {element}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default AddGroupChat;
