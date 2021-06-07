import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { MagicUserMetadata } from 'magic-sdk';

type Props = {
  redirectTo?: string;
  redirectIfFound?: boolean;
};

type Data = {
  user: MagicUserMetadata;
};

type UseUser = {
  user: Data['user'] | undefined;
  error: Error | undefined;
};

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useUser({ redirectTo, redirectIfFound }: Props = {}): UseUser {
  const router = useRouter();
  const { data, error } = useSWR<Data, Error>('/api/user', fetcher);
  const user = data?.user;
  const finished = Boolean(data);
  const hasUser = Boolean(user);

  useEffect(() => {
    if (!redirectTo || !finished) return;
    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !hasUser) ||
      // If redirectIfFound is also set, redirect if the user was found.
      (redirectIfFound && hasUser)
    ) {
      router.push(redirectTo);
    }
  }, [redirectTo, redirectIfFound, finished, hasUser, router]);

  return { user, error };
}
