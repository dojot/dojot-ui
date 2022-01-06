const util = require("util");

const fs = require("fs");

const pino = require("pino");

const logger = pino({
  prettyPrint: {
    levelFirst: true,
  },
});

const BaseConfig = require("../config/internalModules.json");

const DEFAULT_ITEMS = ["dashboard"]; // default Menu Item
const MANDATORY_ITEMS = ["home"];

logger.info("Loading Builder.");

// get the visible components to be shown in menu
const menuItens = process.env.BUILDER_MENU_ITENS;
logger.info(`Received Components: ${menuItens}`);

const menuList = [];
const menuAlias = [];
const federationRemotes = {};

// handling case BUILDER_MENU_ITENS=
if (menuItens === null) {
  logger.error("Empty configuration isn't valid. Bailing out!");
  process.exit();
}

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

  // for case BUILDER_MENU_ITENS=[] or some invalid cases.
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
menuAlias.push(...MANDATORY_ITEMS);

/*
  Creating files to be used by the Cornerstone UI.
*/
const defaultText = `/**
 * List of items to be shown in menu side bar.
 */
export const MENU_ITEMS = [${menuAlias.map((i) => `"${i}"`)}];
`;
fs.writeFileSync("./config/visibleItems.js", defaultText);

/*
  Creating list of remote libraries to be used by Module Federation
*/
fs.writeFileSync("./config/remotes.json", JSON.stringify(federationRemotes));

logger.info("GUI NX successfully created.");
