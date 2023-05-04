import { useUser } from "@clerk/nextjs";
import { type NextPage } from "next";

const UserProfile: NextPage = () => {
  const user = useUser();

  /* En las dobles comillas debe ir la id del usuario que se está viendo */
  return <>{user.isSignedIn && user?.user.id === ""}</>;
};

export default UserProfile;
