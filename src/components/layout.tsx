import Head from 'next/head';
import Header from './header';

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }: Props) => (
  <>
    <Head>
      <title>Next Fauna Magic</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Header />

    <main className="max-w-prose mx-auto px-4">
      <div className="py-8">{children}</div>
    </main>

    <footer className="border-t text-center py-8">2021 Next Fauna Magic</footer>
  </>
);

export default Layout;
