import { DogsContext } from "../Provider/DogProvider";
import { useContext } from "react";

export const useDogs = () => {
  const context = useContext(DogsContext);
  if (!context)
    throw new Error(
      "please use `useDogs` hook within the context of a Dogcontext"
    );
  return context;
};
