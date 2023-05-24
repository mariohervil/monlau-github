import { type NextPage } from "next";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import Image from "next/image";
import { LoadingPage } from "~/components/Loading";
interface UserProfileProps {
  username: string;
}

const UserProfile = (props: UserProfileProps) => {
  const { username } = props;

  const { data, isLoading: userLoading } =
    api.users.getUserInfoByUsername.useQuery(username);

  const projectList = api.projects.getByUserId.useQuery(
    data?.id ? data?.id : ""
  ).data;
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
            <Image
              src={data?.profileImageUrl}
              alt={"Profile Image"}
              className={"h-40 w-40 rounded-full object-cover object-center"}
              width={10000}
              height={1000}
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
        {projectList?.map((project) => (
          <div key={project.id} className={"flex flex-row justify-center"}>
            <span className={"text-xl font-semibold"}>{project.name}</span>
            <Image
              src={project.imageUrl ? project.imageUrl : ""}
              alt="Project Image"
              width={100}
              height={100}
            />
          </div>
        ))}
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
        <LoadingPage />
      </>
    );
  }

  //  TODO: Users
  //const projects = api.projects.getByUserId(user.user);
  // const repos = api.users.getGitHubProjects.useQuery(githubUsername).data;
  // TODO: Hay problemas con juntar proyectos del usuario y de github -> Es viable guardar información de los repositorios en GitHub? En otra tabla de Prisma?

  return (
    <div className="h-screen">
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
                  <a
                    target="_blank"
                    href={repo.html_url}
                    className={"btn-primary btn"}
                  >
                    Ir al proyecto
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserSite;
