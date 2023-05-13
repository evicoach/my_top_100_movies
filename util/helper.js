const path = require("path");
const fs = require("fs");
function requireFolderFiles(currentDir, filename) {
  const basename = path.basename(filename);
  fs.readdirSync(currentDir)
    .filter((file) => {
      return (
        file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
      );
    })
    .forEach((file) => {
      const handler = path.join(path.resolve(currentDir), file);
      require(handler);
    });
}

module.exports = {
  requireFolderFiles,
};
