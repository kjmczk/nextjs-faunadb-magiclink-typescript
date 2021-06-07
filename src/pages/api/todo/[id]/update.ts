import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '../../../../utils/auth-cookies';
import { updateTodo } from '../../../../utils/fql';

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const {
    query: { id },
  } = req;

  const { title, completed } = req.body;

  const session = await getSession(req);

  if (!session) {
    return res.status(401).send('session not found');
  }

  try {
    await updateTodo(session.faunaTokenSecret, id, title, completed);

    res.status(200).end();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
