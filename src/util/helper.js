/**
 * Converts a date to an ISO 8601 formatted string with a time part of '00:00:00.000'
 * @param {Date | string} date - date to format. Can be a Date object or a string that can be parsed into a Date.
 * @returns {string} The ISO 8601 formatted date string. eg: 1996-07-22T00:00:00.000+00:00
 */
export function formatDateToISOString(date) {
  date = new Date(date);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const timePart = '00:00:00.000';
  const formattedDate = `${year}-${month}-${day}T${timePart}+00:00`;
  return formattedDate;
}
