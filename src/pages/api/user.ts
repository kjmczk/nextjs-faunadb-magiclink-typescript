import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '../../utils/auth-cookies';

export default async function user(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const session = await getSession(req);
  res.status(200).json({ user: session || null });
}
