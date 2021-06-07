import { MagicUserMetadata } from 'magic-sdk';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Ref = any;

export type TodoDoc = {
  ref: Ref;
  ts: number;
  data: {
    title: string;
    completed: boolean;
    owner: Ref;
  };
};

export type Todos = {
  data: TodoDoc[];
};

export type UserDoc = {
  ref?: Ref;
  ts?: number;
  data?: { email: string };
};

export type FaunaToken = {
  ref: Ref;
  ts: number;
  instance: Ref;
  secret: string;
};

export type SessionObj = {
  userInfo: MagicUserMetadata;
  faunaTokenSecret: string;
};
