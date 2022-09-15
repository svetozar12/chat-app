interface Message {
  Message: string;
}

enum Gender {
  Male = 'male',
  Female = 'female',
  Others = 'others',
}

enum Status {
  ACCEPTED = 'accepted',
  RECIEVED = 'recieved',
  DECLINED = 'declined',
}

interface Auth {
  userId: string;
  AccessToken: string;
}

export type { Message, Gender, Status, Auth };
