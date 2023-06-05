import { createContext, useEffect, useState } from "react";

// ============================================================

// ============================================================

// SET "rtl" OR "ltr" HERE
// THEN GOTO BROWSER CONSOLE AND RUN localStorage.clear() TO CLEAR LOCALSTORAGE
const initialSettings = {
  direction: "ltr",
};
export const SettingsContext = createContext({
  settings: initialSettings,
  updateSettings: (arg) => {},
});

// ============================================================

// ============================================================

const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(initialSettings);
  const updateSettings = (updatedSetting) => {
    setSettings(updatedSetting);
    window.localStorage.setItem(
      "bazaar_settings",
      JSON.stringify(updatedSetting)
    );
  };
  useEffect(() => {
    if (!window) return null;
    const getItem = window.localStorage.getItem("bazaar_settings");
    if (getItem) setSettings(JSON.parse(getItem));
  }, []);
  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
export default SettingsProvider;
