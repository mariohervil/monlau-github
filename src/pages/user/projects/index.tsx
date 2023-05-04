import { useUser } from "@clerk/nextjs";
import { NextPage } from "next";
import Link from "next/link";
import { api } from "~/utils/api";

const ProjectList = () => {
  const { user } = useUser();

  const githubUsername = user?.externalAccounts[0]?.username;

  if (!githubUsername) {
    return null;
  }

  const repos = api.users.getGitHubProjects.useQuery(githubUsername).data;
  // TODO: Hay problemas con juntar proyectos del usuario y de github -> Es viable guardar información de los repositorios en GitHub? En otra tabla de Prisma?
  // TODO: Rutas dinámicas? Cogiendo user id o user de github? Backend token? Ej: monlau.codes/mariohervil/projects o monlau.codes/{user id de clerk}/projects

  return (
    <>
      <div>
        <div className="flex flex-row justify-center">
          <h1 className="text-bold text-3xl">
            {githubUsername.toUpperCase()} PROJECTS
          </h1>
        </div>
        <div className="container mx-auto">
          <div className="flex flex-row flex-wrap justify-center">
            {repos?.map((repo) => {
              return (
                <div className="mb-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
                  <div className="flex h-full max-w-sm flex-col overflow-hidden rounded shadow-lg">
                    <div className="flex-grow px-6 py-4">
                      <div className="mb-2 text-xl font-bold">{repo.name}</div>
                      <p className="text-base text-gray-700">
                        {repo.description}
                      </p>
                    </div>
                    <div className="mt-auto px-6 pb-2 pt-4">
                      <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
                        <Link href={repo.html_url}>Ir al proyecto</Link>
                      </span>
                    </div>
                  </div>
                </div>
                //#6c47ff
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

const UserProjects: NextPage = () => {
  return (
    <>
     
    </>
  );
};

export default UserProjects;
