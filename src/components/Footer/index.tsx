import Image from "next/image";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer footer-center bg-primary p-5 text-white">
      <div>
        <Image
          src={"/rombo.png"}
          alt="Monlau logo"
          width={100}
          height={100}
          loading="lazy"
        />

        <p className="font-bold ">
          Monlau Codes <br />
        </p>
        <p>Copyright © {year} - All right reserved</p>
      </div>
      <div>
        <div className="grid grid-flow-col">
          <a href={"https://github.com/mariohervil/monlau-github"}>
            <FaGithub size={50} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
