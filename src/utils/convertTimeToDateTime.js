export function convertReverseDateTimeToTime(dateTimeStr) {
    // Create a new Date object from the date-time string
    const dateObj = new Date(dateTimeStr);

    // Extract the hours and minutes components from the Date object
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();

    // Format the time string in the required format
    const timeStr = `${hours}:${minutes.toString().padStart(2, '0')}`;

    return timeStr;
}


export function convertTime(time) {
    const [hours, minutes, seconds] = time.split(':');
    return `${Number(hours)}:${Number(minutes)}`;
}
