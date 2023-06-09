import { SignedIn } from "@clerk/nextjs";
import { type ChangeEvent, type FormEvent, useState } from "react";
import { api } from "~/utils/api";
import { toast } from "react-hot-toast";
import { UploadButton } from "@uploadthing/react";
import { type OurFileRouter } from "~/server/uploadthing";

const ProjectForm = () => {
  const [nameInput, setNameInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [priorityInput, setPriorityInput] = useState(0);
  const [pinnedIsChecked, setPinnedIsChecked] = useState(false);
  const [imageURL, setImageURL] = useState<string>();
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPinnedIsChecked(event.target.checked);
  };

  const ctx = api.useContext();

  const { mutate, isLoading: isPosting } =
    api.projects.inserProject.useMutation({
      onSuccess: () => {
        setNameInput("");
        setDescriptionInput("");
        setUrlInput("");
        setPriorityInput(0);
        setPinnedIsChecked(false);
        setImageURL("");
        toast.success("Proyecto añadido correctamente!");
        void ctx.projects.getAll.invalidate();
      },
      onError: (e) => {
        const errorMessage = e.data?.zodError?.fieldErrors.content;
        if (errorMessage && errorMessage[0]) {
          toast.error(errorMessage[0]);
        } else {
          toast.error("Ha fallado el envío! Por favor, inténtalo más tarde.");
        }
      },
    });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !nameInput ||
      !descriptionInput ||
      !urlInput ||
      !priorityInput ||
      !imageURL
    ) {
      toast.error("Por favor, rellena todos los campos.");
      return;
    }
    mutate({
      name: nameInput,
      description: descriptionInput,
      url: urlInput,
      priority: priorityInput,
      pinned: pinnedIsChecked,
      imageUrl: imageURL,
    });
  };

  return (
    <SignedIn>
      <div className={"flex flex-row justify-center bg-gray-200 p-5"}>
        <form
          className={
            "xs:w-full w-full rounded-xl bg-white px-40 py-20 align-middle shadow-xl shadow-gray-300 md:w-full lg:w-full xl:w-3/5"
          }
          onSubmit={(e) => handleSubmit(e)}
        >
          <label htmlFor="name" className="mb-2 block font-bold">
            Nombre:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={nameInput}
            className="mb-4 w-full rounded-xl border px-3 py-2"
            placeholder="Introduce tu nombre"
            onChange={(e) => setNameInput(e.target.value)}
          />
          <label htmlFor="description" className="mb-2 block font-bold">
            Descripción:
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={descriptionInput}
            className="mb-4 w-full rounded-xl border px-3 py-2"
            placeholder="Introduce una descripción"
            onChange={(e) => setDescriptionInput(e.target.value)}
          />
          <label htmlFor="url" className="mb-2 block font-bold">
            URL:
          </label>
          <input
            type="text"
            id="url"
            name="url"
            value={urlInput}
            className="mb-4 w-full rounded-xl border px-3 py-2"
            placeholder="Introduce una URL"
            onChange={(e) => setUrlInput(e.target.value)}
          />
          <label htmlFor="priority" className="mb-2 block font-bold">
            Prioridad:
          </label>
          <input
            type="number"
            id="priority"
            name="priority"
            value={priorityInput}
            className="mb-4 w-full rounded-xl border px-3 py-2"
            placeholder="Introduce una prioridad"
            onChange={(e) => setPriorityInput(e.target.valueAsNumber)}
          />
          <div className={"flex flex-row"}>
            <div className={"flex flex-col gap-4"}>
              <label className="mb-2 block font-bold">Imagen:</label>

              <UploadButton<OurFileRouter>
                endpoint="imageUploader"
                multiple={false}
                onClientUploadComplete={(res) => {
                  // Do something with the response
                  console.log("Files: ", res);
                  const fileUrl = res?.find(
                    (file) => file !== undefined && file !== null
                  )?.fileUrl;
                  setImageURL(fileUrl);
                  toast.success("Imagen subida correctamente!");
                }}
                onUploadError={(error: Error) => {
                  // Do something with the error.
                  console.log(error);
                  toast.error(
                    "Ha fallado el envío! Por favor, inténtalo más tarde."
                  );
                }}
              />
            </div>
          </div>

          <label className="label mb-10 flex cursor-pointer flex-row-reverse justify-end gap-4">
            <span className="label-text font-bold">Fijar?</span>
            <input
              type="checkbox"
              className="checkbox-primary checkbox"
              name="pinned"
              checked={pinnedIsChecked}
              id="pinned"
              onChange={handleCheckboxChange}
            />
          </label>

          <div className={"flex flex-row justify-center"}>
            <button
              type="submit"
              className={"btn-primary btn w-2/6 rounded-xl text-white"}
            >
              Subir
            </button>
          </div>
        </form>
      </div>
    </SignedIn>
  );
};

export default ProjectForm;
