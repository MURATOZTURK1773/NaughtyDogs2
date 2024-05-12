import { useContext } from "react";
import { DogCard } from "./DogCard";
import { DogsContext } from "../Provider/DogProvider";

export const Dogs = () => {
  const {
    deleteDog,
    onEmptyHeartClick,
    onHeartClick,
    isLoading,
    filteredDogs,
  } = useContext(DogsContext);

  return (
    <>
      {filteredDogs.map((dog) => (
        <DogCard
          key={dog.id}
          dog={dog}
          onTrashIconClick={() => {
            deleteDog(dog.id)
              .then(() => console.log(`Deleted ${dog.name}`))
              .catch((err) => console.error("Error deleting dog", err));
          }}
          onHeartClick={() => onHeartClick(dog.id, !dog.isFavorite)}
          onEmptyHeartClick={() => onEmptyHeartClick(dog.id, !dog.isFavorite)}
          isLoading={isLoading}
        />
      ))}
    </>
  );
};
