import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession, removeSession } from '../../utils/auth-cookies';
import { deleteFaunaToken } from '../../utils/fql';
import { magic } from '../../utils/magic';

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const session = await getSession(req);

    if (session) {
      await magic.users.logoutByIssuer(session.userInfo.issuer || '');
      await deleteFaunaToken(session.faunaTokenSecret);
      removeSession(res);
    }
  } catch (error) {
    res.status(error.status || 500).end(error.message);
  }

  res.writeHead(302, { Location: '/' });
  res.end();
}
