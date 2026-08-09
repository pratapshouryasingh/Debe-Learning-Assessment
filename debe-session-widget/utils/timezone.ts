/**
 * User selects local date & time.
 * Before sending it to the backend we convert it to UTC.
 *
 * This avoids timezone inconsistencies when
 * parents and teachers are in different regions.
 */

export function localToUTC(date: Date) {
  return date.toISOString();
}

export function utcToLocal(date: string) {
  return new Date(date);
}