export function toNull(value) {
    if (value === "" || value === undefined) {
        return null
    }
    return value
}