import { ReactNode, createContext, useEffect, useState } from "react";
import { Dog } from "../types";
import { Requests } from "../api";

type DogsContextType = {
  dogs: Dog[];
  deleteDog: (id: number) => void;
  onHeartClick: (id: number, isFavorite: boolean) => void;
  onEmptyHeartClick: (id: number, isFavorite: boolean) => void;
  handleHeartClick: (id: number, isFavorite: boolean) => Promise<void>;
  createDog: (dog: Omit<Dog, "id">) => Promise<void>;
  isLoading: boolean;
  favoritedDogsCount: number;
  unfavoritedDogsCount: number;
};

export const DogsContext = createContext<DogsContextType>(
  {} as DogsContextType
);

export const DogsProvider = ({ children }: { children: ReactNode }) => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const refetchData = () => {
    setIsLoading(true);
    return Requests.getAllDogs()
      .then((dogs) => {
        setDogs(dogs);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    refetchData().catch((error) => console.error(error));
  }, []);

  const handleHeartClick = async (id: number, isFavorite: boolean) => {
    try {
      setIsLoading(true);
      const updatedDogs = dogs.map((prevDog) => {
        if (prevDog.id === id) {
          return { ...prevDog, isFavorite: !prevDog.isFavorite };
        }
        return prevDog;
      });
      setDogs(updatedDogs);

      await Requests.patchFavoriteForDog({
        id: id,
        isFavorite: isFavorite,
      });
      setIsLoading(false);
    } catch (error) {
      console.error("Error updating dog:", error);
      setIsLoading(false);
      refetchData().catch((error) => console.error(error));
    }
  };

  const deleteDog = (id: number) => {
    setDogs((prevdog) => prevdog.filter((dog) => dog.id !== id));
  };

  const onEmptyHeartClick = (id: number, isFavorite: boolean) => {
    handleHeartClick(id, isFavorite).catch((error) => {
      console.error("Error occurred during heart click:", error);
    });
  };

  const onHeartClick = (id: number, isFavorite: boolean) => {
    handleHeartClick(id, isFavorite).catch((error) => {
      console.error("Error occurred during heart click:", error);
    });
  };

  const createDog = (dog: Omit<Dog, "id">) => {
    return Requests.postDog(dog).then(refetchData);
  };

  const favoritedDogsCount = dogs.filter((dog) => dog.isFavorite).length;
  const unfavoritedDogsCount = dogs.filter((dog) => !dog.isFavorite).length;

  return (
    <DogsContext.Provider
      value={{
        dogs,
        deleteDog,
        onEmptyHeartClick,
        onHeartClick,
        isLoading,
        handleHeartClick,
        createDog,
        favoritedDogsCount,
        unfavoritedDogsCount,
      }}
    >
      {children}
    </DogsContext.Provider>
  );
};
