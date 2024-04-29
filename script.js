"use strict";

window.addEventListener("load", start);

let currentScene;

// Scene declarations in a reversed order so that each scene is defined before it's referenced

const scene7A = {
    title: "Du ser en hest og beslutter dig for at gå hen til den",
    text: `<p>Heldigvis for dig er du hestehvisker og der er ingen problemer i at komme op på hesten</p>
    <p>Hesten er også godt trænet, så den galopperer velvilligt afsted med dig</p>
    <p>Du er fri</p>`,
    choices: []
};

const scene7B = {
    title: "Du prøver stille at snige dig ud af lejren",
    text: `<p>Du kommer et godt stykke gennem skoven, men lige som du ser en lysning, falder du i en ulvefælde og brækker dit ben.</p>
    <p>Du kan intet gøre.</p>
    <p>YOU DIED</p>`,
    choices: []
};

const scene6A = {
    title: "Du stikker af med det samme",
    text: `<p>Du spurter op af vognen og kommer sikkert ud af den, og begynder at løbe.</p>
    <p>Banditterne fanger dig dog hurtigt, og beslutter sig for at du ikke er besværet værd og slår dig ihjel.</p>
    <p>YOU DIED</p>`,
    choices: []
};

const scene6B = {
    title: "Du venter til banditterne er faldet til ro",
    text: `<p>Da banditterne er faldet i søvn hopper du ud af vognen og kigger dig omkring.</p>`,
    choices: [
        { name: "Du ser en hest og beslutter dig for at gå hen til den", node: scene7A },
        { name: "Du prøver stille at snige dig ud af lejren", node: scene7B }
    ]
};

const scene5A = {
    title: "Du bruger sømmet til at skære dig fri",
    text: `<p>Det tager lidt tid, men sømmet er skarpt nok til at skære rebene over.</p>
    <p>Banditterne hører dig ikke, men du står nu over for det næste valg</p>`,
    choices: [
        { name: "Du stikker af med det samme", node: scene6A },
        { name: "Du venter til banditterne er faldet til ro", node: scene6B }
    ]
};

const scene5B = {
    title: "Du venter til banditterne er faldet til ro",
    text: `<p>Banditterne falder i søvn, og du prøver at stikke af med hænderne bundet</p>
    <p>Da du prøver at hoppe ud af vognen, mister du balancen og lander og brækker nakken.</p>
    <p>YOU DIED</p>`,
    choices: []
};

const scene4C = {
    title: "Du lader dig fange",
    text: `<p>Banditterne binder dig og kaster dig op i deres hestevogn</p>`,
    choices: [
        { name: "Du ser et søm stikke ud af vognen, og vil bruge det til at skære dig selv fri", node: scene5A },
        { name: "Du venter til banditterne er faldet til ro og prøver at stikke af", node: scene5B }
    ]
};

const scene4A = {
    title: "Du stjæler deres hest",
    text: `<p>Du stjæler deres hest og rider væk</p>
    <p>Du er i sikkerhed</p>`,
    choices: []
};

const scene4B = {
    title: "Du stjæler banditternes våben",
    text: `<p>Da du stjæler deres våben, laver du en helvedes larm, og vækker banditterne.</p>
    <p>Da de ser dig med våben i hånden dræber de dig.</p>
    <p>YOU DIED</p>`,
    choices: []
};

const scene3B = {
    title: "Du skynder dig at løbe væk",
    text: `<p>Du skynder dig at løbe væk, men banditterne opdager dig og tager dig til fange<p>`,
    choices: [
        { name: "Du kan ikke gøre noget, og lader dig fange", node: scene4C }
    ]
};

const scene3A = {
    title: "Du venter til banditterne er gået i seng",
    text: `<p>Banditterne falder i søvn og deres ting er ubeskyttede</p>`,
    choices: [
        { name: "Du stjæler deres hest", node: scene4A },
        { name: "Du stjæler banditternes våben", node: scene4B }
    ]
};

const scene2C = {
    title: "Du løber hen til bålet",
    text: `<p>Når du kommer tættere på ser du at det er banditer.</p>
    <p>Men du er i løb og bliver derfor opdaget og taget til fange.</p>`,
    choices: [
        { name: "Du kan ikke gøre noget, og lader dig fange", node: scene4C }
    ]
};

const scene2B = {
    title: "Du sniger dig hen til bålet",
    text: `<p>Når du kommer tættere på ser du at det er banditter</p>
    <p>Du ligger i skjul så de ikke ser dig</p>`,
    choices: [
        { name: "Du venter til banditterne er gået i seng", node: scene3A },
        { name: "Du skynder dig at løbe væk,", node: scene3B }
    ]
};

const scene2A = {
    title: "Du råber om hjælp",
    text: `<p>Du blev opdaget og stukket i rykken</p>
    <p>YOU DIED</p>`,
    choices: []
};

const scene1 = {
    title: "Historien begynder",
    text: `<p>Du vågner i den mørke skov,</p>
<p>og skal finde din vej igennem skoven og overleve.</p>`,
choices: [
    { name: "Du råber om hjælp", node: scene2A },
    { name: "Du sniger dig hen til bålet", node: scene2B },
    { name: "Du løber hen til bålet", node: scene2C }
]
};

function start() {
    console.log("JS kører");

    currentScene = scene1;
    showScene(currentScene);
    registerButtonClicks();
}

function registerButtonClicks() {
    document.querySelector("main").addEventListener("click", userClicked);
}

function userClicked(event) {
    const target = event.target;
    if (target.tagName === "BUTTON") {
        buttonClicked(target);
    }
}

function buttonClicked(button) {
    // Remove the button's parent element
    button.parentElement.remove();

    // Get the index of the button
    const index = Number(button.id.substring(10));

    // Find the choice corresponding to this index
    const choice = currentScene.choices[index];

    // Update the current scene to the chosen one
    currentScene = choice.node;
    showScene(currentScene);
}

function showScene(scene) {
    const html = `
    <div class="scene">
        <h2>${scene.title}</h2>
        <div class="text">
            ${scene.text}
        </div>
        <div class="choices">
            ${scene.choices.map((choice, index) => `
                <button id="btn-choice${index}">${choice.name}</button>
            `).join("")}
        </div>
    </div>
    `;

    document.querySelector("main").insertAdjacentHTML("beforeend", html);
}
