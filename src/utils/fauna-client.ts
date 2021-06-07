import faunadb, { Client } from 'faunadb';

export const authClient = new faunadb.Client({
  secret: process.env.FAUNA_AUTH_SECRET!,
});

export const userClient = (secret: string): Client =>
  new faunadb.Client({
    secret,
  });
