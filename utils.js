function discordIdToTimestamp(id) {
    return ((id / 4194304) + 1420070400000);
}

function validateDiscordId(id) {
    // at least 18 digits, digits only
    return /^\d{17,19}$/.test(id);
}

module.exports = {
    discordIdToTimestamp,
    validateDiscordId
}