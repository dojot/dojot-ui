const util = require('util');

var fs = require("fs");

var BaseConfig = require("./config.json");

const DEFAULT_ITEMS =  ['flows','dashboard']; // default Menu Items 
const MANDATORY_ITEMS = ['home'];

console.log("Loading Builder.");

// get the visible components to be shown in menu
const menuItens = process.env.BUILDER_MENU_ITENS;
console.log("Received Components: ", menuItens);

const menuList = [];
const menuAlias = [];
const federationRemotes = {};

try {
    let items = DEFAULT_ITEMS;

    if (menuItens !== undefined)
    {
        //items = JSON.parse(menuItens);
        items = menuItens.substr(1,menuItens.length-2); 
        items = items.split(',');
        console.log("menuItens",items);

    }
    if (!items.length || items[0] === '') 
    {
        console.error("Empty configuration isn't valid. Bailing out!");
        process.exit();
    }

items.forEach(item => {
    const cnfg = BaseConfig.filter(config => config.id === item)[0];
    if (cnfg === undefined) {
        console.log("Menu Item not found");
        return; 
    }
    menuList.push(cnfg);
    menuAlias.push(item);
    federationRemotes[cnfg.remoteName] = cnfg.address;
});
}
 catch (e) {
    console.error("Invalid parameters was used. Please, verify if BUILDER_MENU_ITENS is an array. "+e.stack);
    process.exit();
}


console.info(
  `The current configuration is:\n${util.inspect(menuList, false, 5, true)}`
);

// create visible Items;
menuAlias.push(...MANDATORY_ITEMS);
const defaultText = `/**
 * List of items to be shown in menu side bar.
 */
export const MENU_ITEMS = [`+menuAlias.map(i => '"'+i+'"')+`];
`;
fs.writeFileSync('./config/visibleItems.js', defaultText);

// create remote config in module Federation
fs.writeFileSync('./config/remotes.json', JSON.stringify(federationRemotes));


// create Index.html


console.info("GUI NX successfully created.")