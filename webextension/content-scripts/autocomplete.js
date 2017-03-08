"use strict";

function addAutoCompleteToInputs(itemList) {
    // getInputs() defined in checker.js
    for (let input of getInputs()) { //  eslint-disable-line no-undef
        let inputElement = $(input);
        inputElement.attr("autocomplete", "on");
        inputElement.autocomplete({
            source: itemList,
            autoFocus: false,
            delay: 100,
            minLength: 1,
            classes: {
                "ui-autocomplete": "simple-form-fill",
            },
        });
        inputElement.data("ui-autocomplete")._resizeMenu = function() {
            this.menu.element.css("cssText", getCSS(inputElement));
            this.menu.element.outerWidth(inputElement.outerWidth());
        };
    }
}

function getCSS(inputElement) {
    let backgroundColor = inputElement.css("background-color");
    let color = inputElement.css("color");

    let borderColor = inputElement.css("border-bottom-color");
    let borderStyle = inputElement.css("border-bottom-style");
    let borderWidth = inputElement.css("border-bottom-width");
    let borderRadius = inputElement.css("border-bottom-left-radius");

    console.log(backgroundColor, color, borderColor, borderStyle, borderWidth, borderRadius);

    // inset is default -> no css set
    if (borderStyle == "inset") {
        return "";
    }

    if (backgroundColor == "transparent") {
        backgroundColor = "#ffffff";
    }

    if (borderColor == backgroundColor || borderColor == "rgb(34, 34, 34)") {
        borderColor = "#c5c5c5";
    }

    if (borderStyle == "none") {
        borderStyle = "solid";
    }

    if (borderWidth == "0px") {
        borderWidth = "1px";
    }

    let css = "" +

        "background-color: "           + backgroundColor + " !important;" +

        "border-left-color: "          + borderColor     + " !important;" +
        "border-top-color: "           + borderColor     + " !important;" +
        "border-bottom-color: "        + borderColor     + " !important;" +
        "border-right-color: "         + borderColor     + " !important;" +

        "border-bottom-left-radius: "  + borderRadius    + " !important;" +
        "border-bottom-right-radius: " + borderRadius    + " !important;" +
        "border-top-left-radius: "     + borderRadius    + " !important;" +
        "border-top-right-radius: "    + borderRadius    + " !important;" +

        "border-bottom-style: "        + borderStyle     + " !important;" +
        "border-left-style: "          + borderStyle     + " !important;" +
        "border-right-style: "         + borderStyle     + " !important;" +
        "border-top-style: "           + borderStyle     + " !important;" +

        "border-bottom-width: "        + borderWidth     + " !important;" +
        "border-left-width: "          + borderWidth     + " !important;" +
        "border-right-width: "         + borderWidth     + " !important;" +
        "border-top-width: "           + borderWidth     + " !important;" +

        "color: "                      + color           + " !important;" +

        "padding-bottom: "             + "0"             + " !important;" +
        "padding-left: "               + "0"             + " !important;" +
        "padding-right: "              + "0"             + " !important;" +
        "padding-top: "                + "0"             + " !important;" +

        "";

    return css;
}

browser.runtime.onMessage.addListener(message => {
    if (message.itemList) {
        console.log("Autocomplete got item list");
        addAutoCompleteToInputs(message.itemList);
    }
});
