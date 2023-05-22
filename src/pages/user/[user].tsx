import { type NextPage } from "next";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import Image from "next/image";
import { LoadingPage } from "~/components/Loading";
import NotFoundPage from "~/components/404";
interface UserProfileProps {
  username: string;
}

const UserProfile = (props: UserProfileProps) => {
  const { username } = props;

  const { data, isLoading: userLoading } =
    api.users.getUserInfoByUsername.useQuery(username);

  if (userLoading || !data)
    return (
      <div className="flex grow">
        <LoadingPage />
      </div>
    );

  return (
    <>
      <div className="mt-4 flex flex-col gap-5">
        <div className={"flex flex-row justify-center"}>
          <div className={"overflow-hidden rounded-full"}>
            <img
              src={data?.profileImageUrl}
              alt={"Profile Image"}
              className={"h-40 w-40 rounded-full object-cover object-center"}
            />
          </div>
        </div>
        <div className={"flex flex-row justify-center"}>
          <span className={"text-3xl font-semibold"}>
            {data?.firstName} {data?.lastName}
          </span>
        </div>
        <div className={"flex flex-row justify-center"}>
          <span className={"text-xl font-semibold"}>Descripción...</span>
        </div>
      </div>
    </>
  );
};

const UserSite: NextPage = () => {
  const router = useRouter();
  const { user } = router.query;
  const userList = api.users.getUsernames.useQuery().data;

  const githubUsername = user as string;
  let repos;

  try {
    repos = api.users.getGitHubProjects.useQuery(githubUsername).data;
  } catch (error) {
    return (
      <>
        <div />
      </>
    );
  }

  if (!user || !user[0]) {
    return null;
  }

  if (!userList || !userList?.includes(githubUsername)) {
    return (
      <>
        <NotFoundPage />
      </>
    );
  }
  const goToGitHub = (repo: string) => (event: MouseEvent) =>
    window.open(repo, "_blank");

  //  TODO: Users
  //const projects = api.projects.getByUserId(user.user);
  // const repos = api.users.getGitHubProjects.useQuery(githubUsername).data;
  // TODO: Hay problemas con juntar proyectos del usuario y de github -> Es viable guardar información de los repositorios en GitHub? En otra tabla de Prisma?

  return (
    <>
      <div className="flex flex-row justify-center">
        <UserProfile username={githubUsername} />
      </div>
      <div className="container mx-auto flex flex-wrap justify-center">
        {repos?.map((repo) => {
          return (
            <div
              key={repo.id}
              className="card m-2 flex-1 bg-base-100 shadow-xl lg:card-side"
            >
              <div className="card-body">
                <h2 className="card-title">{repo.name}</h2>
                <p>{repo.description}</p>
                <div className="card-actions justify-end">
                  <button
                    className="btn-primary btn"
                    onClick={() => goToGitHub(repo.html_url)}
                  >
                    Ir al proyecto
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default UserSite;
