import { useEffect } from "react";
import { prefixer } from "stylis";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import useSettings from "hooks/useSettings";

// ========================================================

// ========================================================

const cacheRTL = createCache({
  key: "rtl",
  // prepend: true,
  stylisPlugins: [rtlPlugin, prefixer],
});
const RTL = ({ children }) => {
  const { settings } = useSettings();
  useEffect(() => {
    document.dir = settings.direction;
  }, [settings.direction]);
  if (settings.direction === "rtl") {
    return <CacheProvider value={cacheRTL}>{children}</CacheProvider>;
  }
  return <>{children}</>;
};
export default RTL;
