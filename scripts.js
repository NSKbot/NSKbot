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