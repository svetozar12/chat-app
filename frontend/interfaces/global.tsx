export interface IAlert {
  goodAlert?: string;
  badAlert?: string;
}

export interface IHomeProps {
  cookie: string;
  chatRoom: string | any;
}

export interface IChatProps {
  name?: string;
  message?: string;
  time?: string | number;
}
