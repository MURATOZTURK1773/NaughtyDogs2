import { useState, ChangeEvent } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";
import toast from "react-hot-toast";
import { useDogs } from "./useDogs";

export const CreateDogForm = () => {
  const { createDog } = useDogs();
  const [selectedImage, setSelectedImage] = useState(dogPictures.BlueHeeler);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleImageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedImage(e.target.value);
  };

  const reset = () => {
    setName("");
    setDescription("");
    setSelectedImage(selectedImage);
    setIsFormSubmitted(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormSubmitted(true);

    const newDog: Omit<Dog, "id"> = {
      name,
      image: selectedImage,
      description,
      isFavorite: false,
    };
    createDog(newDog)
      .then(() => {
        reset();
        toast.success(`Created ${newDog.name} !!!`);
      })
      .catch((error: Error) => {
        toast.error(`Error creating dog: ${error.message}`);
      });
  };

  return (
    <form action="" id="create-dog-form" onSubmit={handleSubmit}>
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        disabled={isFormSubmitted}
        value={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        name=""
        id=""
        cols={80}
        rows={10}
        value={description}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setDescription(e.target.value)
        }
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select id="picture" value={selectedImage} onChange={handleImageChange}>
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          );
        })}
      </select>
      <input type="submit" value="submit" />
    </form>
  );
};
