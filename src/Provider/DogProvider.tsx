import { ReactNode, createContext, useEffect, useState } from "react";
import { Dog } from "../types";
import { Requests } from "../api";
import { ActiveTab } from "../types";

type DogsContextType = {
  dogs: Dog[];
  deleteDog: (id: number) => Promise<void>;
  onHeartClick: (id: number, isFavorite: boolean) => void;
  onEmptyHeartClick: (id: number, isFavorite: boolean) => void;
  handleHeartClick: (id: number, isFavorite: boolean) => Promise<void>;
  createDog: (dog: Omit<Dog, "id">) => Promise<void>;
  isLoading: boolean;
  favoritedDogsCount: number;
  unfavoritedDogsCount: number;
  tab: ActiveTab;
  setTab: React.Dispatch<React.SetStateAction<ActiveTab>>;
  filteredDogs: Dog[];
};

export const DogsContext = createContext<DogsContextType>(
  {} as DogsContextType
);

export const DogsProvider = ({ children }: { children: ReactNode }) => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [tab, setTab] = useState<ActiveTab>("none-selected");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filteredDogs, setFilteredDogs] = useState<Dog[]>([]);

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
      const updatedDogs = dogs.map((prevDog) => {
        if (prevDog.id === id) {
          return { ...prevDog, isFavorite: !prevDog.isFavorite };
        }
        return prevDog;
      });
      setDogs(updatedDogs);

      await Requests.patchDog(id, {
        isFavorite: isFavorite,
      });
    } catch (error) {
      console.error("Error updating dog:", error);
      refetchData().catch((error) => console.error(error));
    }
  };

  const deleteDog = (id: number) => {
    setDogs((prevdog) => prevdog.filter((dog) => dog.id !== id));
    return Requests.deleteDogRequest(id)
      .then(() => {
        console.log(`dog is deleted`);
      })
      .catch((error) => {
        console.error("Error deleting dog with id ${id}:", error);
      });
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

  useEffect(() => {
    const newFilteredDogs = dogs.filter((dog) =>
      tab === "favorited"
        ? dog.isFavorite
        : tab === "unfavorited"
        ? !dog.isFavorite
        : true
    );
    setFilteredDogs(newFilteredDogs);
  }, [dogs, tab]);

  return (
    <DogsContext.Provider
      value={{
        tab,
        setTab,
        dogs,
        filteredDogs,
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

export const Tab = ({
  tab,
  isActive,
  handleTabClick,
  favoritedCount,
  unfavoritedCount,
}: {
  tab: ActiveTab;
  isActive: boolean;
  handleTabClick: (activeTab: ActiveTab) => void;
  favoritedCount: number;
  unfavoritedCount: number;
}) => {
  const text = tab
    .split("")
    .map((c, i) => (i === 0 ? c.toUpperCase() : c.toLowerCase()))
    .join("");

  return (
    <div
      className={`selector ${isActive ? "active" : ""}`}
      onClick={() => handleTabClick(tab)}
    >
      {text}
      {tab === "favorited" && `(${favoritedCount})`}
      {tab === "unfavorited" && `(${unfavoritedCount})`}
    </div>
  );
};
