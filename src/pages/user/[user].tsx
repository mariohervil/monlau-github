import { type NextPage } from "next";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import Image from "next/image";
import { LoadingPage } from "~/components/Loading";
import GitHubCard from "~/components/GitHubCard";
import { useState } from "react";
import ProjectCard from "~/components/ProjectCard";
import GroupButtons from "~/components/GroupButtons";
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
      </div>
    </>
  );
};

const UserSite: NextPage = () => {
  const router = useRouter();
  const { user } = router.query;

  const [shownProjects, setShownProjects] = useState("monlau");
  const userList = api.users.getUsernames.useQuery().data;
  const githubUsername = user as string;
  const { data, isLoading: userLoading } =
    api.users.getUserInfoByUsername.useQuery(githubUsername);
  let repos;
  const projectList = api.projects.getByUserId.useQuery(
    data?.id ? data?.id : ""
  ).data;
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
  if (userLoading || !data)
    return (
      <div className="flex grow">
        <LoadingPage />
      </div>
    );

  //  TODO: Users
  //const projects = api.projects.getByUserId(user.user);
  // const repos = api.users.getGitHubProjects.useQuery(githubUsername).data;
  // TODO: Hay problemas con juntar proyectos del usuario y de github -> Es viable guardar información de los repositorios en GitHub? En otra tabla de Prisma?

  return (
    <div className="h-max min-h-screen">
      <div className="flex flex-row justify-center">
        <UserProfile username={githubUsername} />
      </div>
      <div className="flex flex-row justify-center">
        <GroupButtons
          shownProjects={shownProjects}
          setShownProjects={setShownProjects}
        />
      </div>
      <div className="container m-10 mx-auto grid justify-center gap-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {shownProjects === "github"
          ? repos?.map((repo) => {
              return <GitHubCard key={repo.id} repo={repo} />;
            })
          : projectList?.map((project) => {
              return <ProjectCard key={project.id} project={project} />;
            })}
      </div>
    </div>
  );
};

export default UserSite;
