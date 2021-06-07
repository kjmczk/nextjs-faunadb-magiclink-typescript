import type { NextApiRequest, NextApiResponse } from 'next';
import { magic } from '../../utils/magic';
import { setSession } from '../../utils/auth-cookies';
import { getUserByEmail, createUser, createFaunaToken } from '../../utils/fql';

export default async function login(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const didToken = magic.utils.parseAuthorizationHeader(
      req.headers.authorization!
    );
    magic.token.validate(didToken);
    const userInfo = await magic.users.getMetadataByToken(didToken!);

    if (!userInfo.email) {
      return res.status(404).send('user email is missing');
    }

    // If the email address does not exist in your database,
    // create a new user document
    const userDoc =
      (await getUserByEmail(userInfo.email)) ??
      (await createUser(userInfo.email));

    const faunaToken = await createFaunaToken(userDoc);

    await setSession(res, { userInfo, faunaTokenSecret: faunaToken.secret });

    res.status(200).end();
  } catch (error) {
    res.status(error.status || 500).end(error.message);
  }
}
