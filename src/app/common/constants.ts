/**
 * Lifetime of the Toast (ms)
 */
export const TOAST_TIME = 5000;
/**
 * Lifetime of the error Toast (ms)
 */
export const TOAST_ERROR_TIME = 7000;

export const ERRORS: Record<string, string> = {
  USER_DEACTIVATED: 'Пользователь заблокирован',
  INVALID_CREDENTIALS: 'Неверный email или пароль',
  EMAIL_ALREADY_EXISTS: 'Пользователь с таким email уже зарегистрирован',
  USER_NOT_FOUND: 'Пользователь с таким email не найден',
  WRONG_CONTENT: 'Статья должна содержать не менее 3 символов',
  WRONG_VIDEO_CONTENT: 'Разрешены только ссылки с YouTube',
  'Not Found': 'Сущность с таким ID не найдена',
};

export const ROWS_PER_PAGE = 15;
export const ROWS_PER_PAGE_OPTIONS = [15, 30, 50];
export const CURRENT_PAGE_REPORT_TEMPLATE = 'Показаны с {first} по {last} из {totalRecords} записей';
