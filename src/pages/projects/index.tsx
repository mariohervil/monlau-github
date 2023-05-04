import { type NextComponentType, type NextPage } from "next";
import Head from "next/head";
import { SignIn, SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";
import { type z } from "zod";
import Link from "next/link";

export interface Project {
  id: z.ZodString;
  name: z.ZodString;
  description: z.ZodString;
  url: z.ZodString;
  ownerId: z.ZodString;
}

export const UploadProjectWizard = () => {
  const { user } = useUser();
  if (!user) {
    return null;
  }
  return <div></div>;
};

export const ProjectsList: NextComponentType = () => {
  // const projectList = api.projects.getAll.useQuery().data;
  const projectList = api.users.getAllProjects.useQuery().data;

  console.log(projectList);
  return (
    <>
      {projectList?.map((project) => (
        <div key={project.id}>
          <Link href={project.url !== null ? project.url : ""}>
            <span>{project.name}</span>
          </Link>
        </div>
      ))}
    </>
  );
};

const ProjectsPage: NextPage = () => {
  const user = useUser();

  return (
    <>
      <Head>
        <title>Monlau GitHub</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center ">
        <div>
          {!user.isSignedIn && <SignInButton />}
          {!!user.isSignedIn && (
            <>
              <SignOutButton />
              <ProjectsList />
            </>
          )}
        </div>
        <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
      </main>
    </>
  );
};

export default ProjectsPage;
