import { query as q } from 'faunadb';
import { guestClient, userClient } from './fauna-client';
import { UserDoc, FaunaToken, Todos, TodoDoc } from '../types';

export async function getOrCreateFaunaUser(email: string): Promise<UserDoc> {
  return guestClient.query(q.Call(Function('GetOrCreateFaunaUser'), email));
}

export async function createFaunaToken(userDoc: UserDoc): Promise<FaunaToken> {
  return guestClient.query(q.Call(Function('CreateFaunaToken'), userDoc));
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
    q.Create(q.Collection('Todos'), {
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
    q.Update(q.Ref(q.Collection('Todos'), id), {
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
  return userClient(secret).query(q.Delete(q.Ref(q.Collection('Todos'), id)));
}
