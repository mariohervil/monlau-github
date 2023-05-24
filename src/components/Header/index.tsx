import { SignedIn, UserButton } from "@clerk/nextjs";
import { FaPlusSquare } from "react-icons/fa";
import Link from "next/link";
const Header = () => {
  return (
    <header className="sticky top-0 flex items-center justify-between bg-white p-4 shadow">
      <Link href={"/"}>
        <h1 className="text-xl font-bold">Monlau Codes</h1>
      </Link>
      <nav>
        <SignedIn>
          <ul className="flex gap-8">
            <li className="self-center">
              <Link href={"/add-project"}>
                <FaPlusSquare
                  size={22.5}
                  className={"cursor-pointer text-primary"}
                />
              </Link>
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
