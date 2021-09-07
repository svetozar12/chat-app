function ImputComponet({ input }: any) {
  return (
    <form style={{ height: "100vh" }} className="container">
      <input type="text" name="username" placeholder="username ..." />
      <button type="submit">{input}</button>
    </form>
  );
}

export default ImputComponet;
