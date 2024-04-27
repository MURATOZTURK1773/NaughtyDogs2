import { ReactNode, useContext } from "react";
import { TabsContent } from "../Provider/SectionProvider";
import { CreateDogForm } from "./CreateDogForm";
import { DogsContext } from "../Provider/DogProvider";
import { DogCard } from "./DogCard";
import { ActiveTab } from "../types";

export const Section = ({ label }: { label: string; children: ReactNode }) => {
  const { favoritedDogsCount, unfavoritedDogsCount, tab, setTab } =
    useContext(TabsContent);
  const { dogs, onEmptyHeartClick, onHeartClick, deleteDog, isLoading } =
    useContext(DogsContext);

  const handleToggle = (currentTab: ActiveTab) => {
    setTab(currentTab === tab ? "none-selected" : currentTab);
  };

  const filteredDogs = dogs.filter((dog) => {
    if (tab === "favorited") {
      return dog.isFavorite;
    } else if (tab === "unfavorited") {
      return !dog.isFavorite;
    }
    return true;
  });

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          <div
            className={`selector ${tab === "favorited" ? "active" : ""}`}
            onClick={() => {
              if (tab === "favorited") {
                alert("clicked All dogs😎");
              } else {
                alert("clicked favorited");
              }
              handleToggle("favorited");
            }}
          >
            favorited ( {`${favoritedDogsCount}`} )
          </div>

          <div
            className={`selector ${tab === "unfavorited" ? "active" : ""}`}
            onClick={() => {
              alert("clicked unfavorited");
              handleToggle("unfavorited");
            }}
          >
            unfavorited ( {`${unfavoritedDogsCount}`})
          </div>
          <div
            className={`selector ${tab === "create dog" ? "active" : ""}`}
            onClick={() => {
              handleToggle("create dog");
              alert("clicked create dog");
            }}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">
        {tab === "create dog" && <CreateDogForm />}

        {(tab === "favorited" ||
          tab === "unfavorited" ||
          tab === "none-selected") &&
          filteredDogs.map((dog) => (
            <DogCard
              key={dog.id}
              dog={dog}
              onTrashIconClick={() => deleteDog(dog.id)}
              onHeartClick={() => onHeartClick(dog.id, !dog.isFavorite)}
              onEmptyHeartClick={() =>
                onEmptyHeartClick(dog.id, !dog.isFavorite)
              }
              isLoading={isLoading}
            />
          ))}
      </div>
    </section>
  );
};
