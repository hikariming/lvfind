import '@material/web/icon/icon.js';
import '@material/web/iconbutton/icon-button.js';
import '@material/web/button/filled-button.js';
import '@material/web/button/filled-tonal-button.js';
import '@material/web/button/outlined-button.js';
import '@material/web/button/text-button.js';
import '@material/web/chips/chip-set.js';
import '@material/web/chips/filter-chip.js';
import '@material/web/chips/input-chip.js';
import '@material/web/chips/assist-chip.js';
import '@material/web/tabs/tabs.js';
import '@material/web/tabs/primary-tab.js';
import '@material/web/ripple/ripple.js';
import '@material/web/focus/md-focus-ring.js';
import '@material/web/elevation/elevation.js';
import '@material/web/divider/divider.js';
import '@material/web/fab/fab.js';
import { styles as typescaleStyles } from '@material/web/typography/md-typescale-styles.js';

if (typescaleStyles.styleSheet) {
  document.adoptedStyleSheets.push(typescaleStyles.styleSheet);
}

const root = document.documentElement;

function applyTheme(theme: 'light' | 'dark') {
  root.dataset.theme = theme;
  document.querySelectorAll<HTMLElement & { selected: boolean }>('[data-theme-toggle]').forEach((btn) => {
    btn.selected = theme === 'dark';
  });
}

applyTheme((root.dataset.theme as 'light' | 'dark') ?? 'light');

document.addEventListener('click', (e) => {
  const btn = (e.target as HTMLElement).closest('[data-theme-toggle]');
  if (!btn) return;
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('lv-theme', next);
  applyTheme(next);
});
