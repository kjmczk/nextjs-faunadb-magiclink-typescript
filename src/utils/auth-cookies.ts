import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize, parse } from 'cookie';
import { encrypt, decrypt } from './iron';
import { SessionObj } from '../types';

const TOKEN_NAME = 'session';
const MAX_AGE = 60 * 60 * 8; // 8 hours

export async function setSession(
  res: NextApiResponse,
  sessionObj: SessionObj
): Promise<void> {
  const encrypted = await encrypt(sessionObj);
  const cookie = serialize(TOKEN_NAME, encrypted, {
    httpOnly: true,
    maxAge: MAX_AGE,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
  res.setHeader('Set-Cookie', cookie);
}

export function removeSession(res: NextApiResponse): void {
  const cookie = serialize(TOKEN_NAME, '', {
    maxAge: -1,
    path: '/',
  });
  res.setHeader('Set-Cookie', cookie);
}

function parseCookies(req: NextApiRequest) {
  // For API Routes we don't need to parse the cookies.
  if (req.cookies) return req.cookies;

  // For pages we do need to parse the cookies.
  const cookie = req.headers?.cookie;
  return parse(cookie || '');
}

export async function getSession(
  req: NextApiRequest
): Promise<SessionObj | null> {
  const cookies = parseCookies(req);
  return decrypt(cookies?.[TOKEN_NAME]);
}
