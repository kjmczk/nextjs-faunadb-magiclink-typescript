import { query as q } from 'faunadb';
import { authClient, userClient } from './fauna-client';
import { UserDoc, FaunaToken, Todos, TodoDoc } from '../types';

export async function getUserByEmail(
  email: string
): Promise<UserDoc | undefined> {
  return authClient
    .query(q.Get(q.Match(q.Index('user_by_email'), email)))
    .catch(() => undefined);
}

export async function createUser(email: string): Promise<UserDoc> {
  return authClient.query(
    q.Create(q.Collection('User'), {
      data: { email },
    })
  );
}

export async function createFaunaToken(userDoc: UserDoc): Promise<FaunaToken> {
  return authClient.query(q.Create(q.Tokens(), { instance: userDoc.ref }));
}

export async function deleteFaunaToken(secret: string): Promise<void> {
  userClient(secret).query(q.Logout(true));
}

export async function getAllTodos(secret: string): Promise<Todos> {
  return userClient(secret).query(
    q.Map(q.Paginate(q.Match(q.Index('all_todos'))), (ref) => q.Get(ref))
  );
}

export async function createTodo(
  secret: string,
  title: string
): Promise<TodoDoc> {
  const owner = q.CurrentIdentity();
  return userClient(secret).query(
    q.Create(q.Collection('Todo'), {
      data: {
        title,
        completed: false,
        owner,
      },
    })
  );
}

export async function updateTodo(
  secret: string,
  id: string | string[],
  title: string,
  completed: boolean
): Promise<TodoDoc> {
  return userClient(secret).query(
    q.Update(q.Ref(q.Collection('Todo'), id), {
      data: {
        title,
        completed,
      },
    })
  );
}

export async function deleteTodo(
  secret: string,
  id: string | string[]
): Promise<TodoDoc> {
  return userClient(secret).query(q.Delete(q.Ref(q.Collection('Todo'), id)));
}
