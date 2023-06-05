const Config = Object.freeze({
  api: {
    baseURL: 'http://127.0.0.1:7777',
  },
  staticContentURL: 'https://aersoftwares.com/teste/',
});

export const fixPath = (path) => path ? `${Config.staticContentURL}${path}` : 'https://aersoftwares.com/teste/uploads/1673482895584_no-image.jpg';
export default Config;
