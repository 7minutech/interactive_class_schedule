const THURSDAY_ABBR = "TR"

export function dayList(dayString) {
    let days = dayString.split("");
    let parsedDays = [];

    for (let i = 0; i < days.length; i++) {
        let current = days[i];
        let next = days[i + 1] || "";
        let abbr = current + next;

        if (abbr === THURSDAY_ABBR) {
            parsedDays.push(abbr);
            i++; 
        } else {
            parsedDays.push(current);
        }
    }

    return parsedDays;
}