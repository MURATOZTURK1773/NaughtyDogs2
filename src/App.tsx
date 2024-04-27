import { Section } from "./Components/Section";
import { DogsProvider } from "./Provider/DogProvider";
import { TabsProvider } from "./Provider/SectionProvider";

export function App() {
  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <DogsProvider>
        <TabsProvider>
          <Section label="Dogs:" children></Section>
        </TabsProvider>
      </DogsProvider>
    </div>
  );
}
