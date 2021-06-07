import Iron from '@hapi/iron';
import { SessionObj } from '../types';

export function encrypt(sessionObj: SessionObj): Promise<string> {
  return Iron.seal(sessionObj, process.env.TOKEN_SECRET!, Iron.defaults);
}

export function decrypt(sessionToken: string): Promise<SessionObj> | null {
  return sessionToken
    ? Iron.unseal(sessionToken, process.env.TOKEN_SECRET!, Iron.defaults)
    : null;
}
