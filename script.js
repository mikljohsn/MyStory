"use strict";

window.addEventListener("load", start);

function start(){
    console.log("start");
}

const scene = {
title: "Historien begynder",
text: /*html*/ `<p>Du vågner i den mørke skov,</p>
<p>og skal finde din vej igennem skoven og overleve.</p>`,
choices: [
    "Du råber om hjælp",
    "Du sniger dig hen til bålet",
    "Du løber hen til bålet"
]
}