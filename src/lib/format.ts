import type { TicketStatus } from '../data/events';

const WEEKDAYS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
const MONTHS_EN = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

// startLocal 已是演出当地时间，直接按字面解析，避免浏览器/服务器时区干扰。
export function parseLocal(s: string) {
  const [date, time = ''] = s.split('T');
  const [y, m, d] = date.split('-').map(Number);
  const weekday = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  return { y, m, d, time, weekday };
}

export function dateBlock(s: string) {
  const { m, d, weekday } = parseLocal(s);
  return { day: String(d).padStart(2, '0'), month: MONTHS_EN[m - 1], weekday: WEEKDAYS[weekday] };
}

export function monthKey(s: string) {
  const { y, m } = parseLocal(s);
  return `${y}-${String(m).padStart(2, '0')}`;
}

export function monthLabel(key: string) {
  const [y, m] = key.split('-');
  return `${y} · ${Number(m)} 月`;
}

export function fullDate(s: string) {
  const { y, m, d, time, weekday } = parseLocal(s);
  return `${y} 年 ${m} 月 ${d} 日 ${WEEKDAYS[weekday]}${time ? ' ' + time : ''}`;
}

export function shortDate(s: string) {
  const { m, d, time } = parseLocal(s);
  return `${m} 月 ${d} 日${time ? ' ' + time : ''}`;
}

export const statusMeta: Record<TicketStatus, { label: string; icon: string }> = {
  announced: { label: '未开售', icon: 'schedule' },
  presale: { label: '预售中', icon: 'bolt' },
  on_sale: { label: '售票中', icon: 'confirmation_number' },
  sold_out: { label: '已售罄', icon: 'block' },
  postponed: { label: '已延期', icon: 'event_busy' },
  cancelled: { label: '已取消', icon: 'cancel' },
};
