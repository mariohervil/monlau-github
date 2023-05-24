import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex h-screen w-screen items-center ">
      <div className="container flex flex-col items-center justify-center px-5 text-gray-700 md:flex-row">
        <div className="max-w-md">
          <div className="font-dark text-5xl font-bold">404</div>
          <p className="text-2xl font-light leading-normal md:text-3xl">
            Lo sentimos, no pudimos encontrar esta página.
          </p>
          <p className="mb-8">
            Pero no te preocupes, puedes encontrar muchos otros proyectos en la
            página principal.
          </p>

          <Link href="/">
            <button className="focus:shadow-outline-primary inline rounded-xl border border-transparent bg-primary px-4 py-2 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-primary-focus focus:outline-none active:bg-blue-600">
              Volver a la página principal
            </button>
          </Link>
        </div>
        <div className="max-w-lg"></div>
      </div>
    </div>
  );
};

export default NotFoundPage;
