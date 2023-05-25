/* eslint-disable @next/next/no-img-element */
import { type NextPage } from "next";
import UserCard from "~/components/UserCard";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  //TODO: ORLA DE LOS ALUMNOS

  const { data: userList } = api.users.getUserList.useQuery();
  // const projects = api.projects.getPinnedProjectsByUserId.useQuery().data;
  return (
    <>
      <div
        className={
          "flex h-max min-h-screen flex-col justify-center bg-gray-200 pb-6"
        }
      >
        <div className={"flex flex-row justify-center"}>
          <div
            className={
              "container m-10 mx-auto grid justify-center gap-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
            }
          >
            {userList?.map((user) => {
              return <UserCard user={user} key={user.id} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
