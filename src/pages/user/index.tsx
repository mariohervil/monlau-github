import {
  SignIn,
  SignInButton,
  SignOutButton,
  SignedIn,
  useUser,
} from "@clerk/nextjs";
import { api } from "~/utils/api";
import { type z } from "zod";
import Link from "next/link";
import { type Project } from "~/pages/projects";
import { type NextComponentType, type NextPage } from "next";

const ProjectUploadWizard: NextComponentType = () => {
  const { user } = useUser();

  return <></>;
};

const UserProfile: NextPage = () => {
  const user = useUser();

  /* En las dobles comillas debe ir la id del usuario que se está viendo */
  return <>{user.isSignedIn && user?.user.id === ""}</>;
};

export default UserProfile;
