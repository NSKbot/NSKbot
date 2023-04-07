const spellSlots = {
    1: 4,
    2: 3,
    3: 3,
    4: 2,
};

function toggleSlotUsed(level, used) {
    const slots = getSlots(level);
    const targetSlot = findTargetSlot(slots, used);

    if (targetSlot) {
        toggleSlotClasses(targetSlot);
        updateLocalStorage(targetSlot, level, used);
    }
}

function getSlots(level) {
    return document.querySelectorAll(`#level-${level} .slot`);
}

function findTargetSlot(slots, used) {
    const slotsArray = Array.from(slots);

    return used
        ? slotsArray.find((slot) => !slot.classList.contains("used"))
        : slotsArray.reverse().find((slot) => slot.classList.contains("used"));
}

function toggleSlotClasses(slot) {
    slot.classList.toggle("used");
    slot.classList.toggle("glow");
}

function updateLocalStorage(slot, level, used) {
    const index = Array.from(getSlots(level)).indexOf(slot);
    const key = `spell-slot-${level}-${index}`;
    localStorage.setItem(key, used);
}

function loadSlotState(slot, level, index) {
    const key = `spell-slot-${level}-${index}`;
    const used = localStorage.getItem(key) === "true";
    if (used) {
        slot.classList.add("used", "glow");
    }
}

function createSlot(level, index) {
    const slot = document.createElement("div");
    slot.className = "slot";
    loadSlotState(slot, level, index);
    slot.addEventListener("click", () => {
        const isUsed = slot.classList.contains("used");
        toggleSlotUsed(level, !isUsed);
    });
    return slot;
}

function populateSpellSlots() {
    for (let level in spellSlots) {
        const container = document.querySelector(`#level-${level} .spell-slots`);
        for (let i = 0; i < spellSlots[level]; i++) {
            const slot = createSlot(level, i);
            container.appendChild(slot);
        }
    }
}

populateSpellSlots();