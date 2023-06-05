import { useState } from "react";
import { useRouter } from "next/router";
// import type { InferGetStaticPropsType } from "next";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { H2, Paragraph } from "components/Typography";
const languageList = [
  {
    title: "EN",
    value: "en",
  },
  {
    title: "DE",
    value: "de",
  },
];
const Translation = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const [language, setLanguage] = useState(router.locale);
  const { pathname, asPath, query } = router;
  const handleLanguage = (event) => {
    const { value } = event.target;
    setLanguage(value);
    router.push(
      {
        pathname,
        query,
      },
      asPath,
      {
        locale: value,
      }
    );
  };
  return (
    <Box bgcolor="background.paper" p={6}>
      <H2>{t("title")} </H2>
      <Paragraph mb={4}>{t("description")}</Paragraph>

      <FormControl>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          label="Age"
          value={language}
          onChange={handleLanguage}
          id="demo-simple-select"
          labelId="demo-simple-select-label"
        >
          {languageList.map((item) => (
            <MenuItem value={item.value} key={item.value}>
              {item.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
export const getStaticProps = async ({ locale }) => {
  let locales = await serverSideTranslations(locale ?? "en", ["common"]);
  return {
    props: {
      ...locales,
    },
  };
};
export default Translation;
