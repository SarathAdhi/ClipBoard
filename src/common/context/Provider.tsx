import React, { createContext, useState } from "react";

type AppContextProps = {
  saveClipBoardId: string;
  setSaveClipBoardId: (value: string) => void;
};
export const AppContext = createContext<AppContextProps>({
  saveClipBoardId: "",
  setSaveClipBoardId: () => {},
});

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [saveClipBoardId, setSaveClipBoardId] = useState("");

  return (
    <AppContext.Provider value={{ saveClipBoardId, setSaveClipBoardId }}>
      {children}
    </AppContext.Provider>
  );
};
