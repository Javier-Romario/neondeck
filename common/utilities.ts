const hasOwn = {}.hasOwnProperty;

export function noop() {
  return null;
}

export function pluralize(text: string, count: number) {
  return count > 1 || count === 0 ? `${text}s` : text;
}

export function getOrdinalNumber(n: number) {
  return n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
}

export function classNames(...args: any[]): string {
  return args
    .flat(Infinity)
    .filter(Boolean)
    .join(' ')
    .trim();
}

export function deepEqual(x: any, y: any): boolean {
  return x && y && typeof x === 'object' && typeof y === 'object'
    ? Object.keys(x).length === Object.keys(y).length &&
        Object.keys(x).reduce((isEqual, key) => isEqual && deepEqual(x[key], y[key]), true)
    : x === y;
}

export function onHandleAppearanceModeChange(className?: string) {
  const body = document.body;
  body.classList.forEach((existingClass) => {
    if (existingClass.startsWith('tint-')) {
      body.classList.remove(existingClass);
    }
  });
  if (className) {
    body.classList.add(className);
  }
}

export function isEmpty(text: string | undefined | null): boolean {
  return text === undefined || text === null || text.length === 0;
}

export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}
