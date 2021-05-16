import { ERRORS } from '../constants';

/**
 * Convert errorCode (from backend) to human-understandable text
 * @param errorCode - errorCode from HTTP response
 */
export function errorToText(errorCode: string): string {
  const result = ERRORS[errorCode];
  if (result === undefined) {
    return 'Неизвестная ошибка';
  }
  return result;
}
