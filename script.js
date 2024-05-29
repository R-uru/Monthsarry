function updateTimeDifference() {
    const targetDate = new Date('December 29, 2022 12:26:00');
    const now = new Date();
    
    // Calculate the difference in total milliseconds
    let diff = now - targetDate;

    // Extract the difference in total seconds, minutes, hours, days, months, and years
    const seconds = Math.floor(diff / 1000) % 60;
    const minutes = Math.floor(diff / (1000 * 60)) % 60;
    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
    
    // Calculate the difference in days, months, and years using date manipulation
    let days = now.getDate() - targetDate.getDate();
    let months = now.getMonth() - targetDate.getMonth();
    let years = now.getFullYear() - targetDate.getFullYear();

    // Adjust days and months if necessary
    if (days < 0) {
        months -= 1;
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
    }
    if (months < 0) {
        years -= 1;
        months += 12;
    }

    // Calculate weeks from remaining days
    const weeks = Math.floor(days / 7);
    days %= 7;

    function pluralize(value, unit) {
        if (value === 0) {
            return '';
        }
        return value === 1 ? `${value} ${unit}` : `${value} ${unit}s`;
    }

    const formattedDifference = [
        pluralize(years, 'year'),
        pluralize(months, 'month'),
        pluralize(weeks, 'week'),
        pluralize(days, 'day'),
        pluralize(hours, 'hour'),
        pluralize(minutes, 'minute'),
        pluralize(seconds, 'second')
    ].filter(part => part !== '').join(', ');

    document.getElementById('time-difference').innerText = formattedDifference;
}

setInterval(updateTimeDifference, 1000);
updateTimeDifference();  // Initial call to display the time immediately
