import { Dog } from "./types";

export const baseUrl = "http://localhost:3000";

const getAllDogs = (): Promise<Dog[]> =>
  fetch(`${baseUrl}/dogs`).then(
    (response) => response.json() as Promise<Dog[]>
  );

const postDog = (dog: Omit<Dog, "id">) => {
  return fetch(`${baseUrl}/dogs`, {
    body: JSON.stringify(dog),
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  }).then((response) => response.json());
};

const deleteDogRequest = (id: number) => {
  return fetch(`${baseUrl}/dogs/${id}`, {
    method: "DELETE",
  }).then((response) => response.json() as Promise<{ id: number }>);
};

const patchDog = (id: Dog["id"], dog: Partial<Dog>): Promise<void | Dog> => {
  return fetch(`${baseUrl}/dogs/${id}`, {
    headers: { "Content-type": "application/json" },
    method: "PATCH",
    body: JSON.stringify({ ...dog }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to update favorite status");
    }
    return response.json() as Promise<Dog>;
  });
};

export const Requests = {
  postDog,
  deleteDogRequest,
  patchDog,
  getAllDogs,
};
