import { useContext } from "react";
import { DogCard } from "./DogCard";
import { DogsContext } from "../Provider/DogProvider";
import { TabsContent } from "../Provider/SectionProvider";

export const Dogs = () => {
  const { dogs, deleteDog, onEmptyHeartClick, onHeartClick, isLoading } =
    useContext(DogsContext);
  const { tab } = useContext(TabsContent);

  const filteredDogs = dogs.filter((dog) =>
    tab === "favorited"
      ? dog.isFavorite
      : tab === "unfavorited"
      ? !dog.isFavorite
      : true
  );

  return (
    <>
      {filteredDogs.map((dog) => (
        <DogCard
          key={dog.id}
          dog={dog}
          onTrashIconClick={() => deleteDog(dog.id)}
          onHeartClick={() => onHeartClick(dog.id, !dog.isFavorite)}
          onEmptyHeartClick={() => onEmptyHeartClick(dog.id, !dog.isFavorite)}
          isLoading={isLoading}
        />
      ))}
    </>
  );
};
