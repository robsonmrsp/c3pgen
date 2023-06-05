import { SettingsContext } from "contexts/SettingContext";
import { useContext } from "react";
const useSettings = () => useContext(SettingsContext);
export default useSettings;
