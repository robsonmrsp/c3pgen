const Config = Object.freeze({
  api: {
    baseURL: "http://localhost:8081",
  },
  staticContentURL: "https://aersoftwares.com/teste/",
});

export const fixPath = (path) =>
  path
    ? `${Config.staticContentURL}${path}`
    : "https://aersoftwares.com/teste/uploads/1673482895584_no-image.jpg";
export default Config;
