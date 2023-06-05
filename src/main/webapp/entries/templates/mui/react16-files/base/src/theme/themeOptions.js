import { components } from "./components";
import { blue, marron, paste, primary, themeColors } from "./themeColors";
import { typography } from "./typography";
const THEMES = {
  GIFT: "GIFT",
  HEALTH: "HEALTH",
  DEFAULT: "DEFAULT",
  GROCERY: "GROCERY",
  FURNITURE: "FURNITURE",
};
const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
};

/*
WE CREATED MULTIPLE THEME OPTIONS FOR DIFFERENT SHOP VARIATION.

YOU CAN JUST KEEP [THEMES.DEFAULT] AND REMOVE OTHER THEME OPTIONS.
*/
const themesOptions = {
  [THEMES.DEFAULT]: {
    typography,
    breakpoints,
    components: {
      ...components,
    },
    palette: {
      primary: {
        ...primary,
        light: primary[100],
      },
      ...themeColors,
    },
  },
  [THEMES.GROCERY]: {
    typography,
    breakpoints,
    components: {
      ...components,
    },
    palette: {
      primary: {
        ...primary,
        light: primary[100],
      },
      ...themeColors,
    },
  },
  [THEMES.FURNITURE]: {
    typography,
    breakpoints,
    components: {
      ...components,
    },
    palette: {
      primary: {
        ...paste,
        light: paste[100],
      },
      ...themeColors,
    },
  },
  [THEMES.HEALTH]: {
    typography,
    breakpoints,
    components: {
      ...components,
    },
    palette: {
      primary: {
        ...blue,
        light: blue[100],
      },
      ...themeColors,
    },
  },
  [THEMES.GIFT]: {
    typography,
    breakpoints,
    components: {
      ...components,
    },
    palette: {
      primary: {
        ...marron,
        light: marron[100],
      },
      ...themeColors,
    },
  },
};
const themeOptions = (publicRuntimeConfig, pathname) => {
  let themeOptions;

  /*
    YOU CAN ALSO REMOVE updateTheme function
    AND FOLLOWING ENTIRE switch case BLOCK.
  */
  const updateTheme = (themeName) => {
    publicRuntimeConfig.theme = themeName;
    themeOptions = themesOptions[publicRuntimeConfig.theme];
  };
  switch (pathname) {
    case "/":
      updateTheme(THEMES.DEFAULT);
      break;
    case "/grocery1":
      updateTheme(THEMES.DEFAULT);
      break;
    case "/grocery2":
      updateTheme(THEMES.DEFAULT);
      break;
    case "/grocery3":
      updateTheme(THEMES.DEFAULT);
      break;
    case "/gadget-shop":
      updateTheme(THEMES.DEFAULT);
      break;
    case "/fashion-shop-1":
      updateTheme(THEMES.DEFAULT);
      break;
    case "/market-1":
      updateTheme(THEMES.DEFAULT);
      break;
    case "/furniture-shop":
      updateTheme(THEMES.FURNITURE);
      break;
    case "/healthbeauty-shop":
      updateTheme(THEMES.HEALTH);
      break;
    case "/gift-shop":
      updateTheme(THEMES.GIFT);
      break;
    default:
      themeOptions = themesOptions[publicRuntimeConfig.theme];
      break;
  }
  /*
        IF YOU REMOVE THE switch case, YOU NEED TO ASSIGN VALUE TO themeOptions
        E.G. themeOptions = themesOptions[THEMES.DEFAULT];
    */
  // themeOptions = themesOptions[THEMES.DEFAULT];

  return themeOptions;
};
export default themeOptions;
