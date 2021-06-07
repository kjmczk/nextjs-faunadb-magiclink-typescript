import type { NextApiRequest, NextApiResponse } from 'next';
import { Todos } from '../../../types';
import { getSession } from '../../../utils/auth-cookies';
import { getAllTodos } from '../../../utils/fql';

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const session = await getSession(req);

  if (!session) {
    return res.status(401).send('session not found');
  }

  try {
    const todos: Todos = await getAllTodos(session.faunaTokenSecret);

    res.status(200).json(todos.data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
