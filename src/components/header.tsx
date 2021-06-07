import { useEffect } from 'react';
import Link from 'next/link';
import { mutate } from 'swr';
import { useUser } from '../utils/hooks';

const Header: React.FC = () => {
  const { user, error } = useUser();

  useEffect(() => {
    if (!error && user === null) mutate('/api/user');
  }, [user, error]);

  return (
    <header className="bg-gray-900 text-gray-100">
      <div className="flex justify-between items-center max-w-prose mx-auto px-4 h-12">
        <Link href={user ? '/dashboard' : '/'}>
          <a>Next Fauna Magic</a>
        </Link>

        <ul className="flex items-center space-x-4">
          {user ? (
            <>
              <li>
                <Link href="/profile">
                  <a>Profile</a>
                </Link>
              </li>
              <li>
                <a href="/api/logout">Logout</a>
              </li>
            </>
          ) : (
            <li>
              <Link href="/login">
                <a>Login</a>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
