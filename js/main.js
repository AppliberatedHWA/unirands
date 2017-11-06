"use strict";



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


    addUnirand() {
        // Select a random Unicode character
        let codePoint = App.getRandomIntInclusive(this.maxCodePoint);
        let char = String.fromCodePoint(codePoint);

        // Create the new unirand element and assign the random Unicode character
        let unirand = document.createElement("span");
        unirand.innerText = char;
        unirand.dataset.codePoint = codePoint.toString(16).toUpperCase();
        // Random position on screen
        unirand.style.left = App.getRandomIntInclusive(window.innerWidth) + "px";
        unirand.style.top = App.getRandomIntInclusive(window.innerHeight) + "px";
        // Make it focusable
        unirand.tabIndex = 0;
        // Add event listeners
        unirand.addEventListener("dblclick", App.onDblClick);
        unirand.addEventListener("contextmenu", App.onContextMenu);

        // Append the new unirand element to the DOM tree
        this.unirands.appendChild(unirand);
    }

    update() {
        document.title = this.unirands.childElementCount + " unirands";
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
            plane = Number.isInteger(params[0]) ? App.clamp(params[0], 0, 16) : 16;
            this.maxCodePoint = (plane + 1) * (0xFFFF + 1) - 1;
            this.delay = Number.isInteger(params[1]) ? App.clamp(params[1], MIN_DELAY, MAX_DELAY) : DEFAULT_DELAY;
        }

        let maxHex = this.maxCodePoint.toString(16).toUpperCase();
        console.log(`Generating random Unicode characters between 0 and U+${maxHex} (plane ${plane}), with a delay ` +
                    `of ${this.delay} milliseconds.`);
    }

    constructor() {

        // Parse any query params and update settings
        this.parseParams();

        this.unirands = document.getElementById("unirands");
        // Start generating random Unicode characters
        setInterval(() => this.addUnirand(), this.delay);

        // Update the number of random Unicode characters in the document title
        setInterval(() => this.update(), 1000);

        // Disable the document context menu
        document.addEventListener("contextmenu", (event) => event.preventDefault());
    }

    static getRandomIntInclusive(max) {
        return Math.floor(Math.random() * (max + 1));  
    }

    /**
     * Returns a number whose value is limited to the given range.
     * @see {@link https://github.com/tc39/ecmascript_simd/blob/master/src/ecmascript_simd.js#L99}
     */
    static clamp(a, min, max) {
        if (a < min) return min;
        if (a > max) return max;
        return a;
    }
}

window.addEventListener("load", () => new App());