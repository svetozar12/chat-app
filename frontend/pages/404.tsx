import React from "react";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { route } from "next/dist/server/router";
function NotFound() {
  const router = useRouter();

  React.useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 3000);
  }, []);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <h1>Ooooops...</h1>
      <h2>Wrong user or bad input</h2>
      <p>
        Go back to the
        <Link href="http://localhost:3000/">
          <a>HomePage</a>
        </Link>
      </p>
      <p>You will be redirected to HomePage soon</p>
    </div>
  );
}

export default NotFound;
