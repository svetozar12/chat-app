import { GraphQLYogaError } from "@graphql-yoga/node";

interface Message {
  Message: string;
}

enum Gender {
  Male = "male",
  Female = "female",
  Others = "others",
}

enum Status {
  ACCEPTED = "accepted",
  RECIEVED = "recieved",
  DECLINED = "declined",
}

interface Auth {
  userId: string;
  AccessToken: string;
}

type Response<T> = Promise<T | GraphQLYogaError>;

export type { Message, Gender, Status, Auth, Response };
