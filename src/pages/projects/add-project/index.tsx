import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { api } from "~/utils/api";

const ProjectForm = () => {
  const { user } = useUser();

  const [project, setProject] = useState({
    name: "",
    description: "",
    url: "",
    priority: 0,
    ownerId: user?.id!,
    pinned: false,
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    api.projects.inserProject.useQuery(project);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    e.preventDefault();
    setProject({
      ...project,
      [name]: value!,
    });
  };

  return (
    <div className={"flex flex-row justify-center"}>
      <div
        className={
          "my-10 flex w-1/2 justify-center rounded-xl border-2 border-primary-focus"
        }
      >
        <div className={"flex w-full flex-col"}>
          <div
            className={
              "flex w-full flex-row justify-start rounded-t-md"
            }
          >
            <h1 className={"text-2xl"}>Nuevo Proyecto</h1>
          </div>

          <form
            onSubmit={handleSubmit}
            className={"flex flex-col gap-3  p-10 pb-16"}
          >
            <label htmlFor="name" className="mb-2 block font-bold">
              Nombre:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mb-4 w-full rounded-lg border border-neutral px-3 py-2"
              placeholder="Introduce tu nombre"
            />

            <label htmlFor="description" className="mb-2 block font-bold">
              Descripción:
            </label>
            <input
              type="text"
              id="description"
              name="description"
              className="mb-4 w-full rounded-lg border border-primary px-3 py-2"
              placeholder="Introduce una descripción"
            />
            <div className="form-control">
              <label className="input-group">
                <span>URL</span>
                <input
                  type="text"
                  placeholder="github.com/username/project"
                  className="input-bordered input w-full"
                  name="url"
                  onChange={handleChange}
                />
              </label>
            </div>

            <label htmlFor="priority" className="mb-2 block font-bold">
              Prioridad:
            </label>
            <input
              type="text"
              id="priority"
              name="priority"
              className="mb-4 w-full rounded-lg border border-primary px-3 py-2"
              placeholder="Introduce una prioridad"
            />

            <label htmlFor="pinned" className="mb-2 block font-bold">
              Fijado:
            </label>
            <input
              type="text"
              id="pinned"
              name="pinned"
              className="mb-4 w-full rounded-lg border border-primary px-3 py-2"
              placeholder="Introduce una indicación de si está fijado o no"
            />

            <div className={'flex flex-row justify-center mt-3'}>
              <button type={"submit"} className={"btn-primary btn w-1/5"}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjectForm;
