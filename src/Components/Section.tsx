import { ReactNode, useContext } from "react";
import { ActiveTab } from "../types";
import { DogsContext } from "../Provider/DogProvider";

export const Section = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => {
  const { favoritedDogsCount, unfavoritedDogsCount, tab, setTab } =
    useContext(DogsContext);

  const handleToggle = (currentTab: ActiveTab) => {
    setTab(currentTab === tab ? "none-selected" : currentTab);
  };

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
      <div className="content-container">{children}</div>
    </section>
  );
};
