export type ThemePreference = 'light' | 'dark';

export const COOKIE_DONE_TASKS = 'mdl_done_tasks';
export const COOKIE_THEME = 'mdl_theme';
export const COOKIE_NOTICE = 'mdl_cookie_notice';

// Legacy localStorage keys for seamless migration on first load
export const LEGACY_STORAGE_COMPLETED = 'mdl-ul-completed-v1';
export const LEGACY_STORAGE_THEME = 'mdl-ul-theme-v1';
export const STORAGE_EXAM_ANSWERS = 'mdl-ul-exam-answers-v1';

const ONE_YEAR_SECONDS = 365 * 24 * 60 * 60;
const VALID_TASK_ID_RE = /^[a-zA-Z0-9_-]+$/;

export function parseCookieString(cookieStr: string): Record<string, string> {
  const result: Record<string, string> = {};
  if (!cookieStr) return result;
  for (const part of cookieStr.split(';')) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const eqIndex = trimmed.indexOf('=');
    if (eqIndex === -1) continue;
    const rawKey = trimmed.slice(0, eqIndex).trim();
    const rawVal = trimmed.slice(eqIndex + 1).trim();
    if (!rawKey) continue;
    try {
      result[decodeURIComponent(rawKey)] = decodeURIComponent(rawVal);
    } catch {
      result[rawKey] = rawVal;
    }
  }
  return result;
}

export function serializeTaskIds(ids: string[]): string {
  const unique = Array.from(
    new Set(ids.map((id) => id.trim()).filter((id) => VALID_TASK_ID_RE.test(id)))
  );
  return unique.join(',');
}

export function deserializeTaskIds(raw: string): string[] {
  if (!raw) return [];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const token of raw.split(',')) {
    const id = token.trim();
    if (id && VALID_TASK_ID_RE.test(id) && !seen.has(id)) {
      seen.add(id);
      out.push(id);
    }
  }
  return out;
}

export function buildCookieHeader(
  name: string,
  value: string,
  options?: {
    maxAgeSeconds?: number;
    path?: string;
    sameSite?: 'Lax' | 'Strict' | 'None';
    secure?: boolean;
  }
): string {
  const maxAge = options?.maxAgeSeconds ?? ONE_YEAR_SECONDS;
  const path = options?.path ?? '/';
  const sameSite = options?.sameSite ?? 'Lax';
  const parts = [
    `${encodeURIComponent(name)}=${encodeURIComponent(value)}`,
    `Max-Age=${Math.max(0, Math.round(maxAge))}`,
    `Path=${path}`,
    `SameSite=${sameSite}`,
  ];
  if (options?.secure) {
    parts.push('Secure');
  }
  return parts.join('; ');
}

function isHttps(): boolean {
  return typeof window !== 'undefined' && window.location?.protocol === 'https:';
}

export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const parsed = parseCookieString(document.cookie ?? '');
  return name in parsed ? parsed[name] : null;
}

export function setCookie(name: string, value: string, days = 365): void {
  if (typeof document === 'undefined') return;
  document.cookie = buildCookieHeader(name, value, {
    maxAgeSeconds: Math.max(0, Math.round(days * 86400)),
    path: '/',
    sameSite: 'Lax',
    secure: isHttps(),
  });
}

export function deleteCookie(name: string): void {
  if (typeof document === 'undefined') return;
  document.cookie = buildCookieHeader(name, '', {
    maxAgeSeconds: 0,
    path: '/',
    sameSite: 'Lax',
    secure: isHttps(),
  });
}

/**
 * Loads completed task/topic IDs from cookie at startup.
 * Automatically migrates legacy localStorage data into cookie if no cookie exists yet.
 */
export function loadCompletedTasksFromCookie(): string[] {
  if (typeof document === 'undefined') return [];
  const parsed = parseCookieString(document.cookie ?? '');
  if (COOKIE_DONE_TASKS in parsed) {
    return deserializeTaskIds(parsed[COOKIE_DONE_TASKS]);
  }
  // Fallback migration from legacy localStorage
  try {
    const legacy = localStorage.getItem(LEGACY_STORAGE_COMPLETED);
    if (legacy) {
      const arr = JSON.parse(legacy);
      if (Array.isArray(arr)) {
        const cleaned = deserializeTaskIds(arr.filter((x) => typeof x === 'string').join(','));
        if (cleaned.length > 0) {
          saveCompletedTasksToCookie(cleaned);
        }
        return cleaned;
      }
    }
  } catch {
    // Ignore storage restrictions
  }
  return [];
}

export function saveCompletedTasksToCookie(ids: string[]): void {
  setCookie(COOKIE_DONE_TASKS, serializeTaskIds(ids), 365);
}

export function clearCompletedTasksCookie(): void {
  deleteCookie(COOKIE_DONE_TASKS);
  try {
    localStorage.removeItem(LEGACY_STORAGE_COMPLETED);
  } catch {
    // Ignore storage errors
  }
}

/**
 * Loads theme preference ('light' | 'dark') from cookie at startup.
 * Automatically migrates legacy localStorage preference into cookie if needed.
 */
export function loadThemeFromCookie(): ThemePreference {
  if (typeof document === 'undefined') return 'light';
  const cookieVal = getCookie(COOKIE_THEME);
  if (cookieVal === 'dark' || cookieVal === 'light') {
    return cookieVal;
  }
  try {
    const legacy = localStorage.getItem(LEGACY_STORAGE_THEME);
    if (legacy === 'dark' || legacy === 'light') {
      saveThemeToCookie(legacy);
      return legacy;
    }
  } catch {
    // Ignore storage errors
  }
  return 'light';
}

export function saveThemeToCookie(theme: ThemePreference): void {
  setCookie(COOKIE_THEME, theme, 365);
  try {
    localStorage.setItem(LEGACY_STORAGE_THEME, theme);
  } catch {
    // Ignore storage errors
  }
}

export function clearThemeCookie(): void {
  deleteCookie(COOKIE_THEME);
  try {
    localStorage.removeItem(LEGACY_STORAGE_THEME);
  } catch {
    // Ignore storage errors
  }
}

export function isCookieNoticeAccepted(): boolean {
  return getCookie(COOKIE_NOTICE) === '1';
}

export function acceptCookieNotice(): void {
  setCookie(COOKIE_NOTICE, '1', 365);
}
