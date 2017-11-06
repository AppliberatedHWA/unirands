"use strict";

import Utils from "/js/utils.js";


const MAX_CODE_POINT = 0x10FFFF;
const MAX_PLANE = 16;
// const MAX_CODE_POINT = 128;

const DEFAULT_DELAY = 500;
const MIN_DELAY = 0;
const MAX_DELAY = 60 * 1000;



class App {

    static onDblClick(event) {
        let url = `http://www.fileformat.info/info/unicode/char/${event.target.dataset.codePoint}/index.htm`;
        window.open(url, "_blank");
    }

    static onContextMenu(event) {
        event.preventDefault();
        event.target.blur();
    }


    addNewChar() {
        let codePoint = Utils.getRandomIntInclusive(0, this.maxCodePoint);
        let char = String.fromCodePoint(codePoint);

        let newCharElement = document.createElement("span");
        newCharElement.innerText = char;
        newCharElement.dataset.codePoint = codePoint.toString(16).toUpperCase();
        newCharElement.style.left = Utils.getRandomIntInclusive(0, window.innerWidth) + "px";
        newCharElement.style.top = Utils.getRandomIntInclusive(0, window.innerHeight) + "px";
        newCharElement.tabIndex = 0;
        newCharElement.addEventListener("dblclick", App.onDblClick);
        newCharElement.addEventListener("contextmenu", App.onContextMenu);

        document.body.appendChild(newCharElement);
    }

    static update() {
        document.title = document.body.childElementCount + " unirands";
    }


    parseParams() {
        let plane = MAX_PLANE;

        let query = window.location.search.substring(1);
        if (!query.length) {
            // We have no parameters, so use the default settings
            this.maxCodePoint = MAX_CODE_POINT;
            this.delay = DEFAULT_DELAY;
        } else {
            // We have parameters, so try to parse them and update current settings
            let params = query.split("-").map(Number);
            plane = Number.isInteger(params[0]) ? Utils.clamp(params[0], 0, 16) : 16;
            this.maxCodePoint = (plane + 1) * (0xFFFF + 1) - 1;
            this.delay = Number.isInteger(params[1]) ? Utils.clamp(params[1], MIN_DELAY, MAX_DELAY) : DEFAULT_DELAY;
        }

        let maxHex = this.maxCodePoint.toString(16).toUpperCase();
        console.log(`Generating random Unicode characters between 0 and U+${maxHex} (plane ${plane}), with a delay ` +
                    `of ${this.delay} milliseconds.`);
    }

    constructor() {

        // alert("test");
        // Parse any query params and update settings
        this.parseParams();

        // Start generating random Unicode characters
        setInterval(() => this.addNewChar(), this.delay);

        // Update the number of random Unicode characters in the document title
        setInterval(() => App.update(), 1000);

        // Disable the document context menu
        document.addEventListener("contextmenu", (event) => event.preventDefault());
    }
}

window.addEventListener("load", () => new App());