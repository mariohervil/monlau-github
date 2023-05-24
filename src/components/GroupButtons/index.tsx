import { VscGithub, VscCode } from "react-icons/vsc";

interface GroupButtonsProps {
  shownProjects: string;
  setShownProjects: (shownProjects: string) => void;
}

const GroupButtons = ({
  shownProjects,
  setShownProjects,
}: GroupButtonsProps) => {
  return (
    <div className="flex w-full justify-center py-12">
      <div
        id="filters"
        className="flex items-center rounded border-2 border-gray-200 bg-transparent"
      >
        <div
          onClick={() => setShownProjects("monlau")}
          className={
            shownProjects == "monlau"
              ? "flex h-16 w-16 items-center justify-center bg-primary-content text-primary "
              : "flex h-16 w-16 cursor-pointer items-center justify-center text-gray-800 hover:bg-primary-content hover:text-primary focus:bg-primary-content focus:text-primary"
          }
        >
          <VscCode size={30} />
        </div>
        <div
          onClick={() => setShownProjects("github")}
          className={
            shownProjects == "github"
              ? "flex h-16 w-16 items-center justify-center bg-primary-content text-primary "
              : "flex h-16 w-16 cursor-pointer items-center justify-center text-gray-800 hover:bg-primary-content hover:text-primary focus:bg-primary-content focus:text-primary"
          }
        >
          <VscGithub size={30} />
        </div>
      </div>
    </div>
  );
};

export default GroupButtons;
