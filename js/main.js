"use strict";

const MAX_CODE_POINT = 0x10FFFF;

var makeMovable = function (target) {

    target.onmousedown = function (event) {
        var initialXOffset = target.offsetLeft - event.pageX;
        var initialYOffset = target.offsetTop - event.pageY;

        document.onmousemove = function (event) {
            
            target.style.left = event.pageX + initialXOffset + "px";
            target.style.top = event.pageY + initialYOffset + "px";
            // console.log(target);
        };

        document.onmouseup = function () {
            document.onmousemove = null;
            document.onmouseup = null;
        };

        return false;
    };
};

class App {

    static getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    // static onMouseDown(e) {
    //     document.body.dataset.moveTarget = e.target;
    //     document.addEventListener("mousemove", App.onMouseMove, true);
    //     e.target.dataset.offsetX = e.target.offsetLeft - event.pageX;
    //     e.target.dataset.offsetY = e.target.offsetTop - event.pageY;
    // }

    // static onMouseMove(e) {
    //     let target = document.body.dataset.moveTarget;
    //     console.log(target);
    //     target.style.left = e.pageX + target.dataset.offsetX;
    //     target.style.top = e.pageY + target.dataset.offsetY;
    // }

    // static onMouseUp(e) {
    //     document.removeEventListener("mousemove", App.onMouseMove, true);
    // }

    static onClick(event) {
        // let url = `http://www.fileformat.info/info/unicode/char/${event.target.dataset.codePoint}/index.htm`;
        // window.open(url, "_blank");
    }

    static onDblClick(e) {
        // document.body.removeChild(e.target);
        let url = `http://www.fileformat.info/info/unicode/char/${event.target.dataset.codePoint}/index.htm`;
        window.open(url, "_blank");
    }

    static onContextMenu(event) {
        event.preventDefault();
        // document.body.removeChild(event.target);
        if (event.target == document.activeElement) {
            let url = `http://www.fileformat.info/info/unicode/char/${event.target.dataset.codePoint}/index.htm`;
            window.open(url, "_blank");
        }
    }


    addNewChar() {
        let codePoint = App.getRandomInt(0, MAX_CODE_POINT);
        let char = String.fromCodePoint(codePoint);

        let newCharElement = document.createElement("span");
        newCharElement.innerText = char;
        newCharElement.dataset.codePoint = codePoint.toString(16).toUpperCase();
        newCharElement.style.left = App.getRandomInt(0, window.innerWidth) + "px";
        newCharElement.style.top = App.getRandomInt(0, window.innerHeight) + "px";
        newCharElement.tabIndex = 0;
        // newCharElement.addEventListener("mousedown", App.onMouseDown);
        // newCharElement.addEventListener("mouseup", App.onMouseUp);
        // console.log(newCharElement);

        newCharElement.addEventListener("click", App.onClick);
        newCharElement.addEventListener("dblclick", App.onDblClick);
        // newCharElement.addEventListener("contextmenu", App.onContextMenu);
        // makeMovable(newCharElement);
        document.body.appendChild(newCharElement);
    }

    constructor() {
        setInterval(() => this.addNewChar(), 500);
    }


}

window.addEventListener("load", () => new App());