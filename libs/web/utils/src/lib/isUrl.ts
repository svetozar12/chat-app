export function isValidUrl(value: string) {
  if (typeof window === 'undefined') return false;
  const inputElement = document.createElement('input');
  inputElement.type = 'url';
  inputElement.value = value;

  if (!inputElement.checkValidity()) {
    return false;
  } else {
    return true;
  }
}
