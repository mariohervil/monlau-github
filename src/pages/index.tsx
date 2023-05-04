/* eslint-disable @next/next/no-img-element */
import { type NextPage } from "next";
import Head from "next/head";
import {
  SignIn,
  SignInButton,
  SignOutButton,
  useUser,
  SignedIn,
  UserButton,
  SignedOut,
} from "@clerk/nextjs";
import { api } from "~/utils/api";

const UserSide = () => {
  const { user } = useUser();
  // console.log(user?.externalAccounts[0]?.username);

  if (!user) {
    return null;
  }

  return (
    <div className="w-full border">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-center">
          <UserButton />
        </div>
        <span className="text-center">{user.fullName}</span>
        <span className="text-center">{user.emailAddresses?.toString()}</span>
      </div>
    </div>
  );
};

const UserList = () => {
  const userList = api.users.getUserList.useQuery().data;

  return (
    <>
      <h2>User List</h2>
      {userList?.map((user) => {
        return <div key={user?.id}> {user?.firstName!}</div>;
      })}
    </>
  );
};

const Home: NextPage = () => {
  const user = useUser();
  return (
    <>
      <Head>
        <title>Monlau GitHub</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="absolute top-0 z-10 w-full bg-white">
          {user.isSignedIn && (
            <SignedIn>
              <UserSide />
            </SignedIn>
          )}
          <UserList />
          <SignedOut>
            <div> No estás logeado </div>
          </SignedOut>
        </div>
        <div>
          {!user.isSignedIn && <SignInButton />}

          {!!user.isSignedIn && <SignOutButton />}
        </div>
        <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
      </main>
    </>
  );
};

export default Home;
