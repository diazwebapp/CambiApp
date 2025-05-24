/**
 * Formats a date string from DD/MM/YYYY format
 */
export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  
  // Handle dates in format DD/MM/YYYY, HH:MM AM/PM
  const parts = dateStr.split(',');
  if (parts.length !== 2) return dateStr;
  
  const datePart = parts[0].trim();
  const timePart = parts[1].trim();
  
  const [day, month, year] = datePart.split('/');
  
  return `${day}/${month}/${year}`;
}

/**
 * Formats a price with decimal places and thousands separator
 */
export function formatPrice(price: number): string {
  return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}