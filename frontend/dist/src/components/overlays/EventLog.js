export function renderEventLog(el, events) { el.innerHTML = `<div class="event-log"><h3>Event Log</h3>${events.map((event) => `<p>${event}</p>`).join('')}</div>`; }
