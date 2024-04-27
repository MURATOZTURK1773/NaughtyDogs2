import { useContext } from "react";
import { DogCard } from "./DogCard";
import { DogsContext } from "../Provider/DogProvider";
// Right now these dogs are constant, but in reality we should be getting these from our server
// Todo: Refactor to get rid of props (THERE SHOULD BE NO PROPS DRILLING ON THIS COMPONENT)
export const Dogs = () =>
  // no props allowed
  {
    const { dogs, deleteDog, onEmptyHeartClick, onHeartClick, isLoading } =
      useContext(DogsContext);

    return (
      //  the "<> </>"" are called react fragments, it's like adding all the html inside
      // without adding an actual html element
      <>
        {/* Make all the dog cards show up here */}

        {dogs.map((dog) => (
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
