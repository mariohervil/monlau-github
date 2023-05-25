import { type NextPage } from "next";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import Image from "next/image";
import { LoadingPage } from "~/components/Loading";
import GitHubCard from "~/components/GitHubCard";
import { useState } from "react";
import ProjectCard from "~/components/ProjectCard";
import GroupButtons from "~/components/GroupButtons";
import NotFoundPage from "~/components/404";
import { useUser } from "@clerk/nextjs";
import { HiPencilAlt } from "react-icons/hi";
import toast from "react-hot-toast";
import { FaCheck, FaTimes } from "react-icons/fa";
interface UserProfileProps {
  username: string;
}

const UserProfile = (props: UserProfileProps) => {
  const [description, setDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const { username } = props;
  const { user, isLoaded } = useUser();
  const { data, isLoading: userLoading } =
    api.users.getUserInfoByUsername.useQuery(username);
  const ctx = api.useContext();

  const { mutate } = api.users.insertDescription.useMutation({
    onSuccess: () => {
      toast.success("Descripción actualizada!");
      setIsEditing(false);
      void ctx.users.getDescription.invalidate();
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;

      if (!description || description === "") {
        toast.error("Por favor, introduce la descripción!");
        return;
      } else if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0]);
      } else if (description.length > 255) {
        toast.error("La descripción no puede tener más de 255 caracteres!");
      } else {
        toast.error("Ha fallado el envío! Por favor, inténtalo más tarde.");
      }
    },
  });

  const receivedDescription =
    api.users.getDescription.useQuery(username ? username : "").data?.text ||
    "";

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
          {user?.id === data?.id ? (
            <div
              className={
                "flex flex-row justify-center gap-6 self-center align-middle"
              }
            >
              {isEditing ? (
                <>
                  <input
                    type="text"
                    className={`w-full rounded-xl p-2 focus:outline-none ${
                      isEditing ? "bg-primary-content" : "bg-transparent"
                    }`}
                    readOnly={!isEditing}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />

                  <FaCheck
                    size={20}
                    className={"cursor-pointer text-green-600"}
                    onClick={() => {
                      mutate({
                        text: description,
                        user: user.username ? user.username : "",
                      });
                    }}
                  />

                  <FaTimes
                    size={20}
                    className={"cursor-pointer text-error"}
                    onClick={() => setIsEditing(!isEditing)}
                  />
                </>
              ) : (
                <>
                  <span className={"text-xl"}>
                    {receivedDescription || "Descripción..."}
                  </span>
                  <HiPencilAlt
                    size={20}
                    className={"cursor-pointer"}
                    onClick={() => setIsEditing(!isEditing)}
                  />
                </>
              )}
            </div>
          ) : (
            <span className={"text-xl font-semibold"}>
              {receivedDescription || "Descripción..."}
            </span>
          )}
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
  const repos = api.users.getGitHubProjects.useQuery(githubUsername).data;
  const projectList = api.projects.getByUserId.useQuery(
    data?.id ? data?.id : ""
  ).data;

  if (!user || !user[0]) {
    return <LoadingPage />;
  } else if (!userList?.includes(githubUsername) && userList) {
    return <NotFoundPage />;
  } else if (userLoading || !data) return <LoadingPage />;

  return (
    <div className="h-max min-h-screen bg-gray-200 pb-6">
      <div className="flex flex-row justify-center">
        <UserProfile username={githubUsername} />
      </div>
      <div className="flex flex-row justify-center">
        <GroupButtons
          shownProjects={shownProjects}
          setShownProjects={setShownProjects}
        />
      </div>
      <div className="container m-10 mx-auto grid justify-center gap-5 bg-gray-200 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
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
