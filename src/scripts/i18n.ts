// 客户端语言切换：data-i18n="key" 的元素会被替换为目标语言文案；原文为 zh-CN 兜底。
import { LANGS, LANG_LABEL, ui, regionI18n, type Lang } from '../i18n/ui';

const all = { ...ui, ...regionI18n } as Record<string, readonly string[]>;

const detect = (): Lang => {
  const saved = localStorage.getItem('lv-lang');
  if (saved && (LANGS as readonly string[]).includes(saved)) return saved as Lang;
  const n = (navigator.language || 'en').toLowerCase();
  if (n.startsWith('zh-tw') || n.startsWith('zh-hk') || n.startsWith('zh-hant')) return 'zh-TW';
  if (n.startsWith('zh')) return 'zh-CN';
  if (n.startsWith('ja')) return 'ja';
  if (n.startsWith('ko')) return 'ko';
  return 'en';
};

let lang = detect();

export function apply() {
  const i = LANGS.indexOf(lang);
  document.documentElement.lang = lang;
  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const row = all[el.dataset.i18n!];
    if (row) el.textContent = row[i];
  });
  document.querySelectorAll<HTMLElement>('[data-i18n-title]').forEach((el) => {
    const row = all[el.dataset.i18nTitle!];
    if (row) el.title = row[i];
  });
}

export function setLang(l: Lang) {
  lang = l;
  localStorage.setItem('lv-lang', l);
  apply();
}

const sel = document.querySelector<HTMLSelectElement>('[data-lang-select]');
if (sel) {
  sel.innerHTML = LANGS.map((l) => `<option value="${l}">${LANG_LABEL[l]}</option>`).join('');
  sel.value = lang;
  sel.addEventListener('change', () => setLang(sel.value as Lang));
}

apply();
