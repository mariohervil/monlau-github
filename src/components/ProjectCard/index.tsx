import { type Project } from "@prisma/client";
import Image from "next/image";
interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <>
      <a
        className="relative flex items-start justify-between rounded-xl border border-gray-100 p-4 shadow-xl sm:p-6 lg:p-8"
        href={project.url ? project.url : "/"}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="pt-4 text-gray-500">
          <div className={"flex flex-row justify-center"}>
            <Image
              src={project.imageUrl ? project.imageUrl : "/code.png"}
              alt="Project picture"
              width={200}
              height={200}
              className="text-center"

            />
          </div>
          <h3 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl">
            {project.name.toUpperCase()}
          </h3>

          <p className="mt-2 hidden text-sm sm:block">{project.description}</p>
        </div>
      </a>
    </>
  );
};

export default ProjectCard;
