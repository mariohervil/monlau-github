import Image from "next/image";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer footer-center bg-primary p-5 text-primary-content">
      <div>
        <Image src={"/rombo.png"} alt="Monlau logo" width={100} height={100} />

        <p className="font-bold">
          Monlau Codes <br />
        </p>
        <p>Copyright © {year} - All right reserved</p>
      </div>
      <div>
        <div className="grid grid-flow-col">
          <a href={"https://github.com/mariohervil/monlau-github"}>
            <Image
              src={"/github-mark-white.svg"}
              alt={"Github logo"}
              width={50}
              height={50}
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
