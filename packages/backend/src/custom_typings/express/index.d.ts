declare namespace Express {
  interface Request {
    token: string;
    username: string;
    user: string;
  }
  interface Response {
    paginatedResults: any;
  }
}
