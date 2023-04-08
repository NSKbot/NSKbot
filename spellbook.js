// Create spell slots //
const spellSlots = {
    1: 4, // Number of level 1 slots
    2: 3,  // Number of level 2 slots
    3: 3,  // Number of level 3 slots
    4: 2,  // Number of level 4 slots
};

// Toggle spell slot used //
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
// Load spell slot state and applies glow CSS //
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
// Your provided spells data
const spells = [
// Cantrips (Level 0)
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
    { name: "Produce Flame", level: 0 },
    { name: "Ray of Frost", level: 0 },
    { name: "Resistance", level: 0 },
    { name: "Sacred Flame", level: 0 },
    { name: "Shillelagh", level: 0 },
    { name: "Shocking Grasp", level: 0 },
    { name: "Spare the Dying", level: 0 },
    { name: "Thaumaturgy", level: 0 },
    { name: "Thorn Whip", level: 0 },
    { name: "True Strike", level: 0 },
    { name: "Vicious Mockery", level: 0 },
// Level 1 Spells
    { name: "Alarm", level: 1 },
    { name: "Animal Friendship", level: 1 },
    { name: "Armor of Agathys", level: 1 },
    { name: "Arms of Hadar", level: 1 },
    { name: "Bane", level: 1 },
    { name: "Bless", level: 1 },
    { name: "Burning Hands", level: 1 },
    { name: "Charm Person", level: 1 },
    { name: "Chromatic Orb", level: 1 },
    { name: "Color Spray", level: 1 },
    { name: "Command", level: 1 },
    { name: "Compelled Duel", level: 1 },
    { name: "Comprehend Languages", level: 1 },
    { name: "Create or Destroy Water", level: 1 },
    { name: "Cure Wounds", level: 1 },
    { name: "Detect Evil and Good", level: 1 },
    { name: "Detect Magic", level: 1 },
    { name: "Detect Poison and Disease", level: 1 },
    { name: "Disguise Self", level: 1 },
    { name: "Dissonant Whispers", level: 1 },
    { name: "Divine Favor", level: 1 },
    { name: "Entangle", level: 1 },
    { name: "Expeditious Retreat", level: 1 },
    { name: "Faerie Fire", level: 1 },
    { name: "False Life", level: 1 },
    { name: "Feather Fall", level: 1 },
    { name: "Find Familiar", level: 1 },
    { name: "Floating Disk", level: 1 },
    { name: "Fog Cloud", level: 1 },
    { name: "Goodberry", level: 1 },
    { name: "Grease", level: 1 },
    { name: "Guiding Bolt", level: 1 },
    { name: "Hail of Thorns", level: 1 },
    { name: "Healing Word", level: 1 },
    { name: "Hellish Rebuke", level: 1 },
    { name: "Heroism", level: 1 },
    { name: "Hex", level: 1 },
    { name: "Hunter's Mark", level: 1 },
    { name: "Identify", level: 1 },
    { name: "Illusory Script", level: 1 },
    { name: "Inflict Wounds", level: 1 },
    { name: "Jump", level: 1 },
    { name: "Longstrider", level: 1 },
    { name: "Mage Armor", level: 1 },
    { name: "Magic Missile", level: 1 },
    { name: "Protection from Evil and Good", level: 1 },
    { name: "Purify Food and Drink", level: 1 },
    { name: "Ray of Sickness", level: 1 },
    { name: "Sanctuary", level: 1 },
    { name: "Searing Smite", level: 1 },
    { name: "Shield", level: 1 },
    { name: "Shield of Faith", level: 1 },
    { name: "Silent Image", level: 1 },
    { name: "Sleep", level: 1 },
    { name: "Speak with Animals", level: 1 },
    { name: "Tasha's Hideous Laughter", level: 1 },
    { name: "Tenser's Floating Disk", level: 1 },
    { name: "Thunderwave", level: 1 },
    { name: "Unseen Servant", level: 1 },
    { name: "Witch Bolt", level: 1 },
    { name: "Wrathful Smite", level: 1 },
];
// Populate the datalist with the spell names
const spellDatalist = document.getElementById("spell-datalist");
spells.forEach((spell) => {
    const option = document.createElement("option");
    option.value = spell.name;
    spellDatalist.appendChild(option);
});
// Prepare spell function
function prepareSpell(spellName) {
    const spell = spells.find((s) => s.name.toLowerCase() === spellName.toLowerCase());
    if (spell) {
        // Prepare the spell (add it to character's prepared spells, for example)
        // You can implement this according to your character data structure
        console.log(`Spell '${spell.name}' (Level ${spell.level}) is prepared.`);
    } else {
        console.log(`Spell '${spellName}' not found.`);
    }
}

// Event listener for prepare spell button
document.getElementById("prepare-button").addEventListener("click", () => {
    const spellInput = document.getElementById("spell-input");
    const spellName = spellInput.value.trim();
    if (spellName) {
        prepareSpell(spellName);
        spellInput.value = ""; // Clear the input box
    } else {
        console.log("Please enter a valid spell name.");
    }
});

// Once a spell is prepared add it to a bulleted list
function prepareSpell(spellName) {
    const spell = spells.find((s) => s.name.toLowerCase() === spellName.toLowerCase());
    if (spell) {
        // Prepare the spell (add it to character's prepared spells, for example)
        // You can implement this according to your character data structure
        console.log(`Spell '${spell.name}' (Level ${spell.level}) is prepared.`);
        const spellList = document.getElementById("spell-list");
        const listItem = document.createElement("li");
        listItem.appendChild(document.createTextNode(spell.name));
        spellList.appendChild(listItem);
    } else {
        console.log(`Spell '${spellName}' not found.`);
    }
}