import faunadb, { Client } from 'faunadb';

export const guestClient = new faunadb.Client({
  secret: process.env.FAUNA_GUEST_SECRET!,
});

export const userClient = (secret: string): Client =>
  new faunadb.Client({
    secret,
  });
