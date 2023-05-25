/* eslint-disable @next/next/no-img-element */
import { type User } from "@clerk/clerk-sdk-node";
import Link from "next/link";
import { FaCode, FaGithub, FaLinkedin } from "react-icons/fa";
import { api } from "~/utils/api";
interface UserCardProps {
  user: User;
}

//TODO: TARJETA DE USUARIO
const UserCard = ({ user }: UserCardProps) => {
  const pinnedProjects = api.projects.getPinnedProjectsByUserId.useQuery(
    user.id
  ).data;

  return (
    <article className="rounded-xl border bg-white p-4 text-white shadow-xl">
      <div className="flex items-center gap-4">
        <img
          alt="Developer"
          src={user.profileImageUrl}
          className="h-16 w-16 rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg font-medium text-black">
            {user.firstName} {user.lastName}
          </h3>
          <div className="flow-root">
            <ul className="-m-1 flex flex-wrap">
              <li className="p-1 leading-none">
                <a
                  href={`https://www.linkedin.com/${
                    user.externalAccounts[1]?.username
                      ? user.externalAccounts[1]?.username
                      : ""
                  }`}
                  className="text-xs font-medium text-gray-600"
                >
                  <FaLinkedin size={20} />
                </a>
              </li>

              <li className="p-1 leading-none">
                <a
                  href={`https://github.com/${
                    user.externalAccounts[0]?.username
                      ? user.externalAccounts[0]?.username
                      : ""
                  }`}
                  className="text-xs font-medium text-gray-600"
                >
                  <FaGithub size={20} />
                </a>
              </li>

              <li className="p-1 leading-none">
                <Link
                  href={`/user/${user.username ? user.username : ""}`}
                  className="text-xs font-medium text-gray-600"
                >
                  <FaCode size={20} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <ul className="mt-4 space-y-2">
        {pinnedProjects &&
          pinnedProjects.length > 0 &&
          pinnedProjects?.map((project) => (
            <li key={project.id}>
              <a
                href={project.url ? project.url : "#"}
                className="block h-full rounded-lg border border-gray-700 p-4 hover:border-primary hover:text-primary"
              >
                <strong className="font-medium text-gray-600">
                  {project.name}
                </strong>
                <p className="mt-1 text-xs font-medium text-gray-600">
                  {project.description}
                </p>
              </a>
            </li>
          ))}
        {!pinnedProjects ||
          (pinnedProjects.length < 1 && (
            <li>
              <a
                href="#"
                className="block h-full rounded-lg border border-gray-700 p-4 hover:border-primary"
              >
                <strong className="font-medium text-gray-600">
                  No hay proyectos
                </strong>
                <p className="mt-1 text-xs font-medium text-gray-600">
                  No hay proyectos
                </p>
              </a>
            </li>
          ))}
      </ul>
    </article>
  );
};

export default UserCard;
