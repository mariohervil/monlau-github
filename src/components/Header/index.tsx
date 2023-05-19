import { SignedIn, UserButton } from "@clerk/nextjs";
import { FaPlusSquare } from "react-icons/fa";
import { useRouter } from "next/router";
const Header = () => {
  const router = useRouter();
  return (
    <header className="sticky top-0 flex items-center justify-between bg-white p-4 shadow">
      <h1 className="text-xl font-bold">My App</h1>
      <nav>
        <SignedIn>
          <ul className="flex gap-8">
            <li className="self-center">
              <FaPlusSquare
                size={22.5}
                className={"cursor-pointer text-primary"}
                onClick={async () => await router.push("/projects/add-project")}
              />
            </li>
            <li>
              <UserButton />
            </li>
          </ul>
        </SignedIn>
      </nav>
    </header>
  );
};

export default Header;
