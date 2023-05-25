import type Repository from "~/interfaces/Repository";
import { FaStar } from "react-icons/fa";
interface CardProps {
  repo: Repository;
}

const GitHubCard = ({ repo }: CardProps) => {
  return (
    <>
      <a
        className="relative flex items-start justify-between rounded-xl border border-gray-100 p-4 shadow-xl sm:p-6 lg:p-8 bg-white"
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="pt-4 text-gray-500">
          <h4 className="text-sm font-medium text-gray-900">{repo.language}</h4>

          <h3 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl">
            {repo.name.toUpperCase()}
          </h3>

          <p className="mt-2 hidden text-sm sm:block">{repo.description}</p>
        </div>

        <span className="flex flex-row gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-medium">
          <FaStar className="self-center align-middle text-yellow-200" />
          <p className="self-center align-middle text-white">{repo.stargazers_count}</p>
        </span>
      </a>
    </>
  );
};

export default GitHubCard;
