/* Create spell slots */
const spellSlots = {
    1: 4, // Number of level 1 slots
    2: 3,  // Number of level 2 slots
    3: 3,  // Number of level 3 slots
    4: 2,  // Number of level 4 slots
};

/* Toggle spell slot used */
function toggleSlotUsed(level, used) {
    const slots = document.querySelectorAll(`#level-${level} .slot`);
    const targetSlot = used
        ? Array.from(slots).find((slot) => !slot.classList.contains("used"))
        : Array.from(slots).reverse().find((slot) => slot.classList.contains("used"));
    if (targetSlot) {
        targetSlot.classList.toggle("used");
        targetSlot.classList.toggle("glow"); // Add or remove the "glow" class
        const index = Array.from(slots).indexOf(targetSlot);
        const key = `spell-slot-${level}-${index}`;
        localStorage.setItem(key, used);
    }
}
/* Load spell slot state and applies glow CSS*/
function loadSlotState(slot, level, index) {
    const key = `spell-slot-${level}-${index}`;
    const used = localStorage.getItem(key) === "true";
    if (used) {
        slot.classList.add("used");
        slot.classList.add("glow"); // Add the "glow" class when loading state

    }
}
/* Creates the HTML for the spell slots */
for (let level in spellSlots) {
    const container = document.querySelector(`#level-${level} .spell-slots`);
    for (let i = 0; i < spellSlots[level]; i++) {
        const slot = document.createElement("div");
        slot.className = "slot";
        loadSlotState(slot, level, i);
        slot.addEventListener("click", () => {
            const isUsed = slot.classList.contains("used");
            toggleSlotUsed(level, !isUsed);
        });
        container.appendChild(slot);
    }
}

/* Create a list of D&D 5e spells */
const spells = [
    { name: "Acid Splash", level: 0 },
    { name: "Blade Ward", level: 0 },
    { name: "Chill Touch", level: 0 },
    { name: "Dancing Lights", level: 0 },
    { name: "Druidcraft", level: 0 },
    { name: "Eldritch Blast", level: 0 },
    { name: "Fire Bolt", level: 0 },
    { name: "Friends", level: 0 },
    { name: "Guidance", level: 0 },
    { name: "Light", level: 0 },
    { name: "Mage Hand", level: 0 },
    { name: "Mending", level: 0 },
    { name: "Message", level: 0 },
    { name: "Minor Illusion", level: 0 },
    { name: "Poison Spray", level: 0 },
    { name: "Prestidigitation", level: 0 },
    { name: "Ray of Frost", level: 0 },
    { name: "Resistance", level: 0 },
    { name: "Sacred Flame", level: 0 },
    { name: "Shillelagh", level: 0 },
    { name: "Shocking Grasp", level: 0 },
    { name: "Spare the Dying", level: 0 },
    { name: "Thaumaturgy", level: 0 },
    { name: "True Strike", level: 0 },
    { name: "Animal Friendship", level: 1 },
    { name: "Bane", level: 1 },
    { name: "Bless", level: 1 },
    { name: "Burning Hands", level: 1 },
    { name: "Charm Person", level: 1 },
    { name: "Chromatic Orb", level: 1 },
    { name: "Color Spray", level: 1 },
    { name: "Command", level: 1 },
    { name: "Compelled Duel", level: 1 },
    { name: "Comprehend Languages", level: 1 },
    { name: "Cure Wounds", level: 1 },
    { name: "Detect Evil and Good", level:  1 },
    { name: "Detect Magic", level: 1 },
    { name: "Detect Poison and Disease", level: 1 },
    { name: "Disguise Self", level: 1 },
    { name: "Dissonant Whispers", level: 1 },
    { name: "Earth Tremor", level: 1 },
    { name: "Ensnaring Strike", level: 1 },
    { name: "Entangle", level: 1 },
    { name: "Expeditious Retreat", level: 1 },
    { name: "Faerie Fire", level: 1 },
    { name: "False Life", level: 1 },
    { name: "Feather Fall", level: 1 },
    { name: "Find Familiar", level: 1 },
    { name: "Fog Cloud", level: 1 },
    { name: "Goodberry", level: 1 },
    { name: "Grease", level: 1 },
    { name: "Guiding Bolt", level: 1 },
    { name: "Healing Word", level: 1 },
]
/* Create a text input for searching spells with auto-complete */
const input = document.querySelector("#spell-search");
const autoComplete = new autoComplete({
    selector: input,
    minChars: 1,
    source: function(term, suggest){
        term = term.toLowerCase();
        const choices = spells;
        const matches = [];
        for (let i=0; i<choices.length; i++)
            if (~choices[i].name.toLowerCase().indexOf(term)) matches.push(choices[i].name);
        suggest(matches);
    }
});

/* Add a spell to the spellbook */
function addSpell(spell) {
    const spellbook = document.querySelector("#spellbook");
    const spellDiv = document.createElement("div");
    spellDiv.className = "spell";
    spellDiv.innerHTML = spell.name;
    spellbook.appendChild(spellDiv);
}
/* Add a spell when the user clicks the search button */
const searchButton = document.querySelector("#spell-search-button");
searchButton.addEventListener("click", () => {
    const spellName = input.value;
    const spell = spells.find((spell) => spell.name === spellName);
    if (spell) {
        addSpell(spell);
    }
});

/* Add a spell when the user presses Enter */
input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const spellName = input.value;
        const spell = spells.find((spell) => spell.name === spellName);
        if (spell) {
            addSpell(spell);
        }
    }
});

/* Add a spell when the user clicks on an auto-complete result */
input.addEventListener("autoComplete", (event) => {
    const spellName = event.text.value;
    const spell = spells.find((spell) => spell.name === spellName);
    if (spell) {
        addSpell(spell);
    }
});

/* Load spellbook from local storage */
function loadSpellbook() {
    const spellbook = document.querySelector("#spellbook");
    const spellNames = localStorage.getItem("spellbook");
    if (spellNames) {
        const spellNamesArray = spellNames.split(",");
        for (let spellName of spellNamesArray) {
            const spell = spells.find((spell) => spell.name === spellName);
            if (spell) {
                addSpell(spell);
            }
        }
    }
}
loadSpellbook();

/* Save spellbook to local storage */
function saveSpellbook() {
    const spells = document.querySelectorAll("#spellbook .spell");
    const spellNames = Array.from(spells).map((spells)) => spells.innerHTML);
    localStorage.setItem("spellbook", spellNames.join(","));
}
const saveButton = document.querySelector("#save-spellbook");
saveButton.addEventListener("click", saveSpellbook);

