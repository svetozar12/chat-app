export function isMobile() {
  if (typeof window === 'undefined')
    throw new Error('This function is not available in the browser');
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return isMobile;
}
