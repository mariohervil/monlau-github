import { NextPage } from "next";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import z from "zod";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center">
      <svg
        className="mx-4 h-6 w-6 animate-spin text-primary"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-3.647z"
        ></path>
      </svg>
    </div>
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
        <LoadingSpinner />
      </>
    );
  }

  if (!user || !user[0]) {
    return null;
  }

  if (!userList || !userList?.includes(githubUsername)) {
    return (
      <>
        <LoadingSpinner />
      </>
    );
  }
  const goToGitHub = (repo: string) => (event: any) =>
    window.open(repo, "_blank");

  // const repos = api.users.getGitHubProjects.useQuery(githubUsername).data;
  // TODO: Hay problemas con juntar proyectos del usuario y de github -> Es viable guardar información de los repositorios en GitHub? En otra tabla de Prisma?
  // TODO: Rutas dinámicas? Cogiendo user id o user de github? Backend token? Ej: monlau.codes/mariohervil/projects o monlau.codes/{user id de clerk}/projects

  return (
    <>
      <div className="flex flex-row justify-center">
        <h1 className="text-bold text-3xl">{githubUsername.toUpperCase()}</h1>
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
                    onClick={goToGitHub(repo.html_url)}
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
