import path from "path";
import fs from "fs";

export default (express) => {
  const modulesDir = path.join(__dirname, "..", "..", "modules");
  const modulesFolders = fs
    .readdirSync(modulesDir)
    .filter((folder) =>
      fs.statSync(path.join(modulesDir, folder)).isDirectory()
    );

  modulesFolders.forEach((folder) => {
    const routeFile = path.join(modulesDir, folder, `${folder}Router.js`);
    if (fs.existsSync(routeFile)) {
      const importRouter = require(path.resolve(routeFile));
      express.use(`/${folder}`, importRouter.default.init());
    }
  });
};
