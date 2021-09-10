import Link from "next/link";

function index() {
  return (
    <div style={{ height: "100vh" }} className="container">
      <Link href="http://localhost:3000/register">
        <a style={{ textDecoration: "none", color: "var(--main-blue)" }}>
          <h1>Create an account !</h1>
        </a>
      </Link>
      <Link href="http://localhost:3000/login">
        <a style={{ textDecoration: "none", color: "var(--main-blue)" }}>
          <h1>Already have a acount ?</h1>
        </a>
      </Link>
    </div>
  );
}

export default index;
