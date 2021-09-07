import Link from "next/link";

function index() {
  return (
    <div style={{ height: "100vh" }} className="container">
      <Link href="http://localhost:3000/register">
        <h1>Create an account !</h1>
      </Link>
      <Link href="http://localhost:3000/login">
        <h1>Already have a acount ?</h1>
      </Link>
    </div>
  );
}

export default index;
