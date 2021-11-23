const util = require("util");

const fs = require("fs");

const pino = require("pino");

const logger = pino({
  prettyPrint: {
    levelFirst: true,
  },
});

const BaseConfig = require("./config.json");

const DEFAULT_ITEMS = ["dashboard"]; // default Menu Items
const MANDATORY_ITEMS = ["home"];

logger.info("Loading Builder.");

// get the visible components to be shown in menu
const menuItens = process.env.BUILDER_MENU_ITENS;
logger.info(`Received Components: ${menuItens}`);

const menuList = [];
const menuAlias = [];
const federationRemotes = {};

try {
  let items = DEFAULT_ITEMS;

  /*
    It's complex to make sure if there's a valid array, since JSON.parse(menuItens) doesn't work.
    In the future, should be covered some corner cases.
  */
  if (menuItens !== undefined) {
    items = menuItens.substr(1, menuItens.length - 2);
    items = items.split(",");
    logger.info(`Service found: ${items}`);
  }
  if (!items.length || items[0] === "") {
    logger.error("Empty configuration isn't valid. Bailing out!");
    process.exit();
  }

  items.forEach((item) => {
    const cnfg = BaseConfig.filter((config) => config.id === item)[0];
    if (cnfg === undefined) {
      logger.info(`Service ${item} wasn't found.`);
      return;
    }
    menuList.push(cnfg);
    menuAlias.push(item);
    federationRemotes[cnfg.remoteName] = cnfg.address;
  });
} catch (e) {
  logger.error(
    `Invalid parameters was used. Please, verify if BUILDER_MENU_ITENS is an array. ${e.stack}`,
  );
  process.exit();
}

logger.info(`The current configuration is:\n${util.inspect(menuList, false, 5, true)}`);

/*
Creating files to be used by the Cornerstone UI.
*/
menuAlias.push(...MANDATORY_ITEMS);
const defaultText = `/**
 * List of items to be shown in menu side bar.
 */
export const MENU_ITEMS = [${menuAlias.map((i) => `"${i}"`)}];
`;
fs.writeFileSync("./config/visibleItems.js", defaultText);

// create remote config in module Federation
fs.writeFileSync("./config/remotes.json", JSON.stringify(federationRemotes));

// create Index.html

logger.info("GUI NX successfully created.");
