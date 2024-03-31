import { date } from 'quasar';

export function flatOutDate(dateToFlatout: Date): Date {
  return date.adjustDate(dateToFlatout, {
    hours: 0, minutes: 0, seconds: 0, milliseconds: 0,
  });
}
