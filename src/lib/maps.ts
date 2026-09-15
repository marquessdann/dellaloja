// Shared helper so every part of the app that turns a real, already-known
// address into a Google Maps link (the location card, the Della IA tool
// response, etc.) builds the exact same URL instead of re-implementing the
// encoding in more than one place.
export function buildGoogleMapsSearchUrl(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}
