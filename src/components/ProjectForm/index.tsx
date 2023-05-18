import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { api } from "~/utils/api";

const ProjectForm = () => {

    const {user} = useUser();

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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className={"border-2 border-primary"}
          onChange={handleChange}
          name={"name"}
        />
        <input
          type="text"
          className={"border-2 border-primary"}
          onChange={handleChange}
          name={"description"}
        />
        <input
          type="text"
          className={"border-2 border-primary"}
          onChange={handleChange}
          name={"url"}
        />
        <input
          type="text"
          className={"border-2 border-primary"}
          onChange={handleChange}
          name={"priority"}
        />
        <input
          type="text"
          className={"border-2 border-primary"}
          onChange={handleChange}
          name={"pinned"}
        />
        <button type={"submit"}>Submit</button>
      </form>
    </div>
  );
};

export default ProjectForm;
