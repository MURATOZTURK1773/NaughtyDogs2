import { CreateDogForm } from "./Components/CreateDogForm";
import { Section } from "./Components/Section";
import { TabsContent } from "./Provider/SectionProvider";
import { useContext } from "react";
import { Dogs } from "./Components/Dogs";

export function App() {
  const { tab } = useContext(TabsContent);

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <Section label="Dogs:">
        {(tab === "favorited" ||
          tab === "none-selected" ||
          tab === "unfavorited") && <Dogs />}
        {tab === "create dog" && <CreateDogForm />}
      </Section>
    </div>
  );
}
