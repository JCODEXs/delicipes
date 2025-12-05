//MEAL MATRIX 
// Generates calendar-based day names from today forward
export function generateCalendarDays(count) {
  const formatter = new Intl.DateTimeFormat("es-CO", {
    weekday: "short",
    day: "numeric",
  });

  const days = [];
  const today = new Date();

  for (let i = 0; i < count; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);

    let formatted = formatter.format(date);
    formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1); // Capitalize

    days.push(formatted);
  }

  return days;
}
