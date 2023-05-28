export function formatDate(dateISO: string): string {
  const date = new Date(dateISO);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
