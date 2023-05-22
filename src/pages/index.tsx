/* eslint-disable @next/next/no-img-element */
import { type NextPage } from "next";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  //TODO: ORLA DE LOS ALUMNOS

  const { data: userList } = api.users.getUserList.useQuery();

  return (
    <>
      <div className={"flex flex-col justify-center"}>
        <div className={"flex flex-row justify-center"}>
          <div className={"container"}>
            <div className={"flex flex-row justify-center"}>
              {userList?.map((user) => {
                return (
                  <div
                    key={user.id}
                    className="mb-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
                  >
                    <div className="flex h-full max-w-sm flex-col overflow-hidden rounded shadow-lg">
                      <div className="flex-grow px-6 py-4">
                        <p key={user.id} className="text-base text-gray-700">
                          <img src={user.profileImageUrl} alt="" />
                        </p>
                        <div key={user.id} className="mb-2 text-xl font-bold">
                          {user.firstName} {user.lastName}
                        </div>
                      </div>
                      <div className="mt-auto px-6 pb-2 pt-4">
                        <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
                          <a
                            key={user.id}
                            href={`/user/${
                              user.username ? user.username : ""
                            }`}
                          >
                            Ir al perfil
                          </a>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
