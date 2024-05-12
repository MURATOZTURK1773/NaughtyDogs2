// import { ReactNode, createContext, useState, useContext } from "react";
// import { ActiveTab } from "../types";
// import { DogsContext } from "./DogProvider";

// type TabContextType = {
//   tab: ActiveTab;
//   setTab: React.Dispatch<React.SetStateAction<ActiveTab>>;
//   handleTabClick: (tab: ActiveTab) => void;
//   favoritedDogsCount: number;
//   unfavoritedDogsCount: number;
// };

// export const TabsContent = createContext<TabContextType>({} as TabContextType);

// export const TabsProvider = ({ children }: { children: ReactNode }) => {
//   const { favoritedDogsCount, unfavoritedDogsCount } = useContext(DogsContext);
//   const [tab, setTab] = useState<ActiveTab>("none-selected");

//   const handleTabClick = (tab: ActiveTab) => {
//     setTab((currentTab) => (currentTab === tab ? "none-selected" : tab));
//   };

//   return (
//     <TabsContent.Provider
//       value={{
//         tab,
//         setTab,
//         handleTabClick,
//         favoritedDogsCount,
//         unfavoritedDogsCount,
//       }}
//     >
//       {children}
//     </TabsContent.Provider>
//   );
// };

// export const Tab = ({
//   tab,
//   isActive,
//   handleTabClick,
//   favoritedCount,
//   unfavoritedCount,
// }: {
//   tab: ActiveTab;
//   isActive: boolean;
//   handleTabClick: (activeTab: ActiveTab) => void;
//   favoritedCount: number;
//   unfavoritedCount: number;
// }) => {
//   const text = tab
//     .split("")
//     .map((c, i) => (i === 0 ? c.toUpperCase() : c.toLowerCase()))
//     .join("");

//   return (
//     <div
//       className={`selector ${isActive ? "active" : ""}`}
//       onClick={() => handleTabClick(tab)}
//     >
//       {text}
//       {tab === "favorited" && `(${favoritedCount})`}
//       {tab === "unfavorited" && `(${unfavoritedCount})`}
//     </div>
//   );
// };
