import { app } from "./server";

const port: number = 4001;

app.listen(port, (): void => {
  console.log(`listening on port ${port}`);
});
