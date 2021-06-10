# NextJS FaunaDB MagicLink TypeScript

This is a project that integrates [Magic](https://magic.link/) passwordless authentication into an app built with [Next.js](https://nextjs.org/), [FaunaDB](https://fauna.com/), [TailwindCSS](https://tailwindcss.com/), and [TypeScript](https://www.typescriptlang.org/).

## Running locally

1. Clone this project:

```sh
git clone https://github.com/kjmczk/nextjs-faunadb-magiclink-typescript.git
```

2. Change into the directory:

```sh
cd nextjs-faunadb-magiclink-typescript
```

3. Install the dependencies:

```sh
yarn install
```

4. Login to the [Magic Dashboard](https://dashboard.magic.link/) and get the keys of your app:

![Magic Keys](https://github.com/kjmczk/nextjs-faunadb-magiclink-typescript/blob/images/magic-keys.png)

5. Login to the [Fauna Dashboard](https://dashboard.fauna.com/) and create a new database:

![New Database](https://github.com/kjmczk/nextjs-faunadb-magiclink-typescript/blob/images/fauna-new-database.png)

6. Go to the Fauna Shell and run the FQL functions in the `fauna` directory in the order of **Collections**, **Indexes**, **Functions**, **Roles**, **Keys**:

![Fauna Shell](https://github.com/kjmczk/nextjs-faunadb-magiclink-typescript/blob/images/fauna-shell.png)

After creating the key, copy its `secret`.

7. Copy the `.env.local.example` file to `.env.local`:

```sh
cp .env.local.example .env.local
```

Then set each variable in `.env.local`:

- `NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY` should look like `pk_live_91...`
- `MAGIC_SECRET_KEY` should look like `sk_live_B8...`
- `FAUNA_GUEST_SECRET` should look like `fnAELQh0NC...`
- `ENCRYPTION_SECRET` should be a string with at least 32 characters

8. Run the server:

```sh
yarn dev
```
