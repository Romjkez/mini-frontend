import { ERRORS } from '../constants';

/**
 * Convert errorCode (from backend) to human-understandable text
 * @param errorCode - errorCode from HTTP response
 * @param status - status code
 */
export function errorToText(errorCode: string, status?: number): string {
  const result = ERRORS[errorCode];
  if (result === undefined) {
    return `Неизвестная ошибка (${status})`;
  }
  return result;
}
