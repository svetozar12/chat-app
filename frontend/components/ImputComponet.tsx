import React from "react";

function ImputComponet({ input, username }: any) {
  const [name, setName] = React.useState("");

  const handleUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (name.toLocaleLowerCase() !== username.toLocaleLowerCase()) {
      console.log("no user or wrong account");
    } else {
      console.log("welcome");
    }
    e.preventDefault();
  };

  return (
    <form style={{ height: "100vh" }} className="container">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        name="username"
        placeholder="username ..."
      />
      <button onClick={handleUser} type="submit">
        {input}
      </button>
    </form>
  );
}

export default ImputComponet;
