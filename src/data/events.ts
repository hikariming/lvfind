// 真实数据（来源见各 event 的 sourceUrl），由 agent/ 下的 List 定期核对维护。
// artists / venues 的权威数据在 ./artists.json 与 ./venues.json，改数据改 JSON 即可。
import artistsData from './artists.json' with { type: 'json' };
import venuesData from './venues.json' with { type: 'json' };
// 场馆坐标 / 容量 / 交通为近似值，上线前需逐条核对。

export type Genre = 'kpop' | 'jpop';
export type TicketStatus = 'announced' | 'presale' | 'on_sale' | 'sold_out' | 'postponed' | 'cancelled';
export type VenueType = 'dome' | 'stadium' | 'arena' | 'hall';

export interface Artist {
  slug: string;
  nameOriginal: string;
  nameLocal?: string;
  genre: Genre;
}

export interface Venue {
  id: string;
  name: string;
  nameLocal?: string;
  type: VenueType;
  city: string;
  citySlug: string;
  cityZh: string;
  countryCode: string;
  timezone: string;
  tzAbbr: string;
  lat: number;
  lng: number;
  capacity: number;
  address: string;
  transit: string;
  website?: string;
}

export interface Event {
  id: number;
  artist: string;
  venue: string;
  tourName: string;
  startLocal: string;
  ticketStatus: TicketStatus;
  onSaleLocal?: string;
  ticketUrl?: string;
  sourceUrl: string;
  verifiedAt: string;
}

export const regions: Record<string, string> = {
  KR: '韩国',
  JP: '日本',
  CN: '中国大陆',
  HK: '香港',
  MO: '澳门',
  TW: '台湾',
  SG: '新加坡',
  TH: '泰国',
  MY: '马来西亚',
  PH: '菲律宾',
  ID: '印度尼西亚',
  US: '美国',
  CA: '加拿大',
  GB: '英国',
  FR: '法国',
  NL: '荷兰',
  DE: '德国',
  IT: '意大利',
  ES: '西班牙',
  SE: '瑞典',
  DK: '丹麦',
  AU: '澳大利亚',
  NZ: '新西兰',
};

export const venueTypes: Record<VenueType, string> = {
  dome: '巨蛋',
  stadium: '体育场',
  arena: '室内馆',
  hall: '演出厅',
};

export const artists = artistsData as Artist[];

export const venues = venuesData as Venue[];

// tour/source 常量
const T = {
  YOASOBI: { tour: 'YOASOBI ASIA 10-CITY DOME & STADIUM TOUR 2026-2027 “SUPER PLANET”', src: 'https://www.yoasobi-music.jp/live/' },
  AESPA: { tour: '2026-27 aespa LIVE TOUR – SYNK : COMPLæXITY', src: 'https://aespaworldtour.com/' },
  LSF: { tour: "2026 LE SSERAFIM TOUR 'PUREFLOW' IN ASIA", src: 'https://sourcemusic.com/artist/tour/LE%20SSERAFIM/17' },
  BM: { tour: '2026-27 BABYMONSTER WORLD TOUR [CHOOM]', src: 'https://yg-babymonster.com/concert/worldtourchoom/' },
  ENH: { tour: "ENHYPEN WORLD TOUR 'BLOOD SAGA'", src: 'https://www.enhypenbloodsaga.com/tournee' },
  BTS: { tour: "BTS WORLD TOUR 'ARIRANG'", src: 'https://weverse.io/bts/notices' },
  BB: { tour: "BIGBANG XX : COSMOS WORLD TOUR", src: 'https://ygfamily.com/' },
  TXT2: { tour: "TXT WORLD TOUR <STEAL THE WIND>", src: 'https://weverse.io/txt/notices' },
  RUN: { tour: "Stray Kids World Tour < RUN IT >", src: 'https://straykidsworldtour.com/' },
  MX: { tour: "MONSTA X WORLD TOUR [THE X : NEXUS]", src: 'https://weverse.io/monstax/notices' },
  WISH: { tour: "NCT WISH TOUR “INTO THE WISH : Face Our WISH”", src: 'https://weverse.io/nctwish/notices' },
  AT: { tour: "&TEAM CONCERT TOUR", src: 'https://weverse.io/andteam/notices' },
  IZNA: { tour: "2026-2027 izna Concert Tour: WHO DAT GIRL? in JAPAN", src: 'https://special-izna-official.jp/whodatgirlinjapan/' },
  QWER: { tour: "QWER ROCKATION : ROCKET LAUNCH!!", src: 'https://weverse.io/qwer/notices' },
  BND: { tour: "BOYNEXTDOOR TOUR “KNOCK ON Vol.2”", src: 'https://weverse.io/boynextdoor/notices' },
  DO: { tour: "DOH KYUNG SOO “DAY OFF”", src: 'https://weverse.io/do/notices' },
  NCT: { tour: "NCT 127 “NEO CITY - THE REDLINE”", src: 'https://weverse.io/nct127/notices' },
  JY: { tour: "JINYOUNG “CODE#”", src: 'https://weverse.io/jinyoung/notices' },
  RK: { tour: "ROY KIM LIVE TOUR [R:O:Y]", src: 'https://weverse.io/roykim/notices' },
  KAT: { tour: "KATSEYE THE WILDWORLD TOUR", src: 'https://weverse.io/katseye/notices' },
  SSK: { tour: "2026 Sung Si Kyung Year-end Concert", src: 'https://world.nol.com/' },
  EH: { tour: "EPIK HIGH Concert", src: 'https://world.nol.com/' },
  CRV: { tour: "2026 CRAVITY CONCERT “SONOROUS”", src: 'https://www.starship-ent.com/' },
  CM: { tour: "CHANGMIN Solo Tour", src: 'https://weverse.io/changmin/notices' },
  EXO: { tour: 'EXO PLANET #6 - EXhOrizon [dot]', src: 'https://weverse.io/exo/notices' },
  CYP: { tour: '2026 조용필 & 위대한탄생 콘서트', src: 'https://ksponco.or.kr/' },
  DD: { tour: 'Dynamicduo 콘서트「가끔씩 오래 보자」', src: 'https://ksponco.or.kr/' },
  TOU: { tour: 'TOUCHED Concert “HIGHLIGHTⅤ”', src: 'https://world.nol.com/' },
  MH: { tour: 'MINHO “MEAN : of feral”', src: 'https://weverse.io/minho/notices' },
  NWH: { tour: 'NAM WOO HYUN “EVER GREEN”', src: 'https://weverse.io/namwoohyun/notices' },
  EVN: { tour: 'EVNNE “ONE TAKE”', src: 'https://weverse.io/evnne/notices' },
  VER: { tour: 'VERIVERY “GIVE ME FIVE, KEEP THAT VIBE”', src: 'https://weverse.io/verivery/notices' },
  FLU: { tour: 'FLARE U “Where U\u0027RE”', src: 'https://www.soompi.com/' },
  AKM: { tour: 'AKMU “AKDONGDEUL”', src: 'https://weverse.io/akmu/notices' },
  YK2: { tour: 'Young K “YOUNGEST”', src: 'https://weverse.io/youngk/notices' },
  NFL: { tour: 'N.Flying “&CON5 : into REM”', src: 'https://weverse.io/nflying/notices' },
  FNC: { tour: '2026 FNC KINGDOM - THE FLOATING BAZAAR -', src: 'https://pia-arena-mm.jp/' },
  RAD: { tour: 'RADWIMPS FC Tour 2026 “ユーリンチー”', src: 'https://radwimps.jp/' },
  SOW: { tour: 'SEKAI NO OWARI FANCLUB LIVE / TOUR', src: 'https://sekainoowari.jp/' },
  AIM: { tour: 'AIMYON TOUR 2027 -cosmic %-', src: 'https://www.aim-official.jp/' },
  PG: { tour: 'みなとみらいロマンスポルノ\u002726 〜⿃〜', src: 'https://pornograffitti.jp/' },
  YMT: { tour: 'TOMOHISA YAMASHITA TOUR 2026 DREAMING', src: 'https://tomohisayamashita.com/' },
  TOM: { tour: 'TOMOO Arena Tour 2026', src: 'https://www.tomoo.jp/' },
  MILK: { tour: 'M!LK ARENA TOUR 2026-2027「シャカリキレボリューション」', src: 'https://sd-milk.com/' },
  SMK: { tour: 'sumika Arena Tour', src: 'https://www.sumika-official.net/' },
  KBK: { tour: 'KOBUKURO LIVE TOUR 2026「霞日和」', src: 'https://kobukuro.com/' },
  HATA: { tour: 'HATA MOTOHIRO 20th Anniversary LIVE', src: 'https://office-augusta.com/' },
  AKG: { tour: 'ASIAN KUNG-FU GENERATION “THE BEST OF AKG”', src: 'https://asiankung-fugeneration.com/' },
  DUS: { tour: 'DUSTCELL LIVE 2026 ー道ー', src: 'https://dustcell.jp/' },
  JJ: { tour: 'Juice=Juice Room Tour 2026「5ROOMS」', src: 'https://www.helloproject.com/' },
  TY: { tour: 'Tani Yuuki Live Tour 26/27', src: 'https://taniyuuki.com/' },
  MGA2: { tour: 'Mrs. GREEN APPLE Ringo Jam Tour “SHADOWS”', src: 'https://mrsgreenapple.com/' },
  SANTA: { tour: '赞多演唱会长沙站', src: 'https://weibo.com/u/7155113315' },
  YK: { tour: 'Yoohei Kawakami TOUR #room665', src: 'https://alexandros.jp/contents/schedule' },
  ALEX_FC: { tour: '[Alexandros] FC TOUR 2027 “大饗宴”', src: 'https://alexandros.jp/contents/schedule' },
  ALEX_DE: { tour: '[Alexandros] DEAR ENEMIES TOUR 2027', src: 'https://alexandros.jp/contents/schedule' },
  ALEX_VP: { tour: '[Alexandros] VIP PARTY TOUR', src: 'https://alexandros.jp/contents/schedule' },
  ZTMY: { tour: 'ずっと真夜中でいいのに。Hall Tour「アピクラ電機」LÚ.NIM.LÀL', src: 'https://zutomayo.net/apicula/' },
  KAZE: { tour: 'Prema World Tour', src: 'https://fujiikaze.com/' },
  ADO: { tour: 'Adoの歌ってみたツアー2027', src: 'https://www.universal-music.co.jp/ado/' },
  JXJ: { tour: 'Jeonghan X Joshua “Journey Into [Dreaming]”', src: 'https://weverse.io/seventeen/notice' },
} as const;

type Row = [artist: string, venue: string, tourKey: keyof typeof T, start: string, status: TicketStatus, onSale: string | null];

const V = '2026-11-08';

const rows: Row[] = [
  // LE SSERAFIM PUREFLOW 亚洲段（台北已售罄）
  ['le-sserafim', 'galaxy-arena', 'LSF', '2026-11-07', 'on_sale', null],
  ['le-sserafim', 'galaxy-arena', 'LSF', '2026-11-08', 'on_sale', null],
  ['le-sserafim', 'ntsu-arena', 'LSF', '2026-11-14', 'sold_out', null],
  ['le-sserafim', 'ntsu-arena', 'LSF', '2026-11-15', 'sold_out', null],
  ['le-sserafim', 'apex-expo', 'LSF', '2026-11-28T17:00', 'on_sale', null],
  ['le-sserafim', 'moa-arena', 'LSF', '2026-12-05', 'on_sale', null],
  // BABYMONSTER CHOOM
  ['babymonster', 'impact', 'BM', '2026-11-07T18:00', 'on_sale', null],
  ['babymonster', 'impact', 'BM', '2026-11-08T18:00', 'on_sale', null],
  ['babymonster', 'unifi-arena', 'BM', '2026-11-14T17:00', 'on_sale', null],
  ['babymonster', 'taipei-arena', 'BM', '2026-11-21T19:30', 'sold_out', null],
  ['babymonster', 'taipei-arena', 'BM', '2026-11-22T18:00', 'sold_out', null],
  ['babymonster', 'sg-indoor', 'BM', '2026-11-28T18:00', 'on_sale', null],
  ['babymonster', 'sg-indoor', 'BM', '2026-11-29T18:00', 'on_sale', null],
  ['babymonster', 'spark-arena', 'BM', '2026-12-08', 'on_sale', null],
  ['babymonster', 'rod-laver', 'BM', '2026-12-11', 'on_sale', null],
  ['babymonster', 'afterpay-arena', 'BM', '2026-12-13', 'on_sale', null],
  ['babymonster', 'asiaworld-arena', 'BM', '2027-01-08T20:00', 'on_sale', null],
  ['babymonster', 'asiaworld-arena', 'BM', '2027-01-09T18:00', 'on_sale', null],
  ['babymonster', 'asiaworld-arena', 'BM', '2027-01-10T18:00', 'on_sale', null],
  // YOASOBI SUPER PLANET（日本国内与台北已售罄，新加坡待核对）
  ['yoasobi', 'vantelin-dome', 'YOASOBI', '2026-11-07T18:00', 'on_sale', null],
  ['yoasobi', 'vantelin-dome', 'YOASOBI', '2026-11-08T17:00', 'on_sale', null],
  ['yoasobi', 'premist-dome', 'YOASOBI', '2026-11-14T18:00', 'on_sale', null],
  ['yoasobi', 'premist-dome', 'YOASOBI', '2026-11-15T17:00', 'on_sale', null],
  ['yoasobi', 'paypay-dome', 'YOASOBI', '2026-11-28T18:00', 'on_sale', null],
  ['yoasobi', 'paypay-dome', 'YOASOBI', '2026-11-29T17:00', 'on_sale', null],
  ['yoasobi', 'tokyo-dome', 'YOASOBI', '2026-12-05T18:00', 'on_sale', null],
  ['yoasobi', 'tokyo-dome', 'YOASOBI', '2026-12-06T17:00', 'on_sale', null],
  ['yoasobi', 'taipei-dome', 'YOASOBI', '2027-01-09T18:00', 'sold_out', null],
  ['yoasobi', 'taipei-dome', 'YOASOBI', '2027-01-10T18:00', 'sold_out', null],
  ['yoasobi', 'sg-national', 'YOASOBI', '2027-02-20T19:00', 'on_sale', null],
  // JxJ Journey Into [Dreaming]
  ['jxj', 'belluna-dome', 'JXJ', '2026-11-21', 'on_sale', null],
  ['jxj', 'belluna-dome', 'JXJ', '2026-11-22', 'on_sale', null],
  ['jxj', 'galaxy-arena', 'JXJ', '2026-12-11', 'announced', null],
  ['jxj', 'galaxy-arena', 'JXJ', '2026-12-12', 'announced', null],
  ['jxj', 'taipei-arena', 'JXJ', '2027-01-09', 'announced', null],
  ['jxj', 'taipei-arena', 'JXJ', '2027-01-10', 'announced', null],
  ['jxj', 'bexco', 'JXJ', '2027-01-30', 'announced', null],
  ['jxj', 'bexco', 'JXJ', '2027-01-31', 'announced', null],
  ['jxj', 'asiaworld-arena', 'JXJ', '2027-02-20', 'announced', null],
  ['jxj', 'asiaworld-arena', 'JXJ', '2027-02-21', 'announced', null],
  // aespa SYNK:COMPLæXITY 欧巡
  ['aespa', 'ao-arena', 'AESPA', '2027-01-14', 'on_sale', null],
  ['aespa', 'o2', 'AESPA', '2027-01-16', 'on_sale', null],
  ['aespa', 'ziggo-dome', 'AESPA', '2027-01-19', 'on_sale', null],
  ['aespa', 'avicii-arena', 'AESPA', '2027-01-22', 'on_sale', null],
  ['aespa', 'royal-arena', 'AESPA', '2027-01-24', 'on_sale', null],
  ['aespa', 'uber-arena', 'AESPA', '2027-01-26', 'on_sale', null],
  ['aespa', 'unipol-dome', 'AESPA', '2027-01-29', 'on_sale', null],
  ['aespa', 'palau-sant-jordi', 'AESPA', '2027-01-31', 'on_sale', null],
  ['aespa', 'accor-arena', 'AESPA', '2027-02-02', 'on_sale', null],
  // ENHYPEN BLOOD SAGA 欧巡
  ['enhypen', 'unipol-dome', 'ENH', '2027-02-24', 'on_sale', null],
  ['enhypen', 'la-defense-arena', 'ENH', '2027-02-27', 'on_sale', null],
  ['enhypen', 'ziggo-dome', 'ENH', '2027-03-02', 'on_sale', null],
  ['enhypen', 'uber-arena', 'ENH', '2027-03-05', 'on_sale', null],
  ['enhypen', 'o2', 'ENH', '2027-03-09', 'on_sale', null],
  // 场馆日程补充批次：大场歌手（EXO/赵容弼/RADWIMPS/MGA/あいみょん/山下智久 等）
  ['exo', 'kspo-dome', 'EXO', '2026-11-06T19:00', 'on_sale', null],
  ['exo', 'kspo-dome', 'EXO', '2026-11-07T18:00', 'on_sale', null],
  ['exo', 'kspo-dome', 'EXO', '2026-11-08T17:00', 'on_sale', null],
  ['cho-yong-pil', 'kspo-dome', 'CYP', '2026-11-27', 'on_sale', null],
  ['dynamicduo', 'olympic-hall', 'DD', '2026-11-27', 'on_sale', null],
  ['cho-yong-pil', 'kspo-dome', 'CYP', '2026-11-28', 'on_sale', null],
  ['dynamicduo', 'olympic-hall', 'DD', '2026-11-28', 'on_sale', null],
  ['cho-yong-pil', 'kspo-dome', 'CYP', '2026-11-29', 'on_sale', null],
  ['dynamicduo', 'olympic-hall', 'DD', '2026-11-29', 'on_sale', null],
  ['touched', 'korea-u-tiger', 'TOU', '2027-01-23', 'on_sale', null],
  ['touched', 'korea-u-tiger', 'TOU', '2027-01-24', 'on_sale', null],
  ['minho', 'ntu-sports', 'MH', '2027-01-02', 'on_sale', null],
  ['nam-woo-hyun', 'chunma-arts', 'NWH', '2027-01-09', 'on_sale', null],
  ['nam-woo-hyun', 'chunma-arts', 'NWH', '2027-01-10', 'on_sale', null],
  ['evnne', 'taipei-tbd', 'EVN', '2027-01-09', 'announced', null],
  ['evnne', 'opera-house-toronto', 'EVN', '2027-01-15', 'on_sale', null],
  ['verivery', 'taipei-tbd', 'VER', '2027-01-10', 'announced', null],
  ['flare-u', 'ntpc-exhibition', 'FLU', '2027-01-09', 'announced', null],
  ['flare-u', 'londoner-arena', 'FLU', '2027-01-16', 'announced', null],
  ['akmu', 'taipei-music-center', 'AKM', '2027-01-16', 'on_sale', null],
  ['young-k', 'awe-hall3', 'YK2', '2027-01-15', 'on_sale', null],
  ['nflying', 'gbk-basketball', 'NFL', '2027-01-10', 'on_sale', null],
  ['radwimps', 'pia-arena-mm', 'RAD', '2026-11-10', 'on_sale', null],
  ['radwimps', 'pia-arena-mm', 'RAD', '2026-11-11', 'on_sale', null],
  ['tomoo', 'pia-arena-mm', 'TOM', '2026-11-18', 'on_sale', null],
  ['tomoo', 'pia-arena-mm', 'TOM', '2026-11-19', 'on_sale', null],
  ['milk', 'pia-arena-mm', 'MILK', '2026-11-21', 'on_sale', null],
  ['milk', 'pia-arena-mm', 'MILK', '2026-11-22', 'on_sale', null],
  ['dustcell', 'pia-arena-mm', 'DUS', '2026-11-23', 'on_sale', null],
  ['juice-juice', 'pia-arena-mm', 'JJ', '2026-11-25', 'on_sale', null],
  ['yamashita-tomohisa', 'pia-arena-mm', 'YMT', '2026-11-28', 'on_sale', null],
  ['yamashita-tomohisa', 'pia-arena-mm', 'YMT', '2026-11-29', 'on_sale', null],
  ['fnc-kingdom', 'pia-arena-mm', 'FNC', '2026-12-12', 'announced', null],
  ['fnc-kingdom', 'pia-arena-mm', 'FNC', '2026-12-13', 'announced', null],
  ['mrs-green-apple', 'pia-arena-mm', 'MGA2', '2026-12-19', 'presale', null],
  ['mrs-green-apple', 'pia-arena-mm', 'MGA2', '2026-12-20', 'presale', null],
  ['sekai-no-owari', 'pia-arena-mm', 'SOW', '2026-12-22', 'presale', null],
  ['sekai-no-owari', 'pia-arena-mm', 'SOW', '2026-12-23', 'presale', null],
  ['porno-graffitti', 'pia-arena-mm', 'PG', '2026-12-26T18:00', 'on_sale', null],
  ['porno-graffitti', 'pia-arena-mm', 'PG', '2026-12-27T17:00', 'on_sale', null],
  ['porno-graffitti', 'pia-arena-mm', 'PG', '2026-12-30T17:00', 'on_sale', null],
  ['porno-graffitti', 'pia-arena-mm', 'PG', '2026-12-31T22:30', 'on_sale', null],
  ['aimyon', 'pia-arena-mm', 'AIM', '2027-02-06', 'on_sale', null],
  ['aimyon', 'pia-arena-mm', 'AIM', '2027-02-07', 'on_sale', null],
  ['tani-yuuki', 'pia-arena-mm', 'TY', '2027-03-22', 'on_sale', null],
  ['akg', 'pia-arena-mm', 'AKG', '2027-04-17', 'on_sale', null],
  ['akg', 'pia-arena-mm', 'AKG', '2027-04-18', 'on_sale', null],
  ['sekai-no-owari', 'pia-arena-mm', 'SOW', '2027-05-15', 'on_sale', null],
  ['sekai-no-owari', 'pia-arena-mm', 'SOW', '2027-05-16', 'on_sale', null],
  // 场馆日程查缺补漏批次（2026-11-08 收录：BTS/BIGBANG/TXT/SKZ/MX/NCTWISH/&TEAM/izna 等）
  ['bts', 'rajamangala', 'BTS', '2026-12-03', 'on_sale', null],
  ['bts', 'rajamangala', 'BTS', '2026-12-05', 'on_sale', null],
  ['bts', 'rajamangala', 'BTS', '2026-12-06', 'on_sale', null],
  ['bts', 'bukit-jalil', 'BTS', '2026-12-12', 'on_sale', null],
  ['bts', 'bukit-jalil', 'BTS', '2026-12-13', 'on_sale', null],
  ['bts', 'sg-national', 'BTS', '2026-12-17', 'on_sale', null],
  ['bts', 'sg-national', 'BTS', '2026-12-19', 'on_sale', null],
  ['bigbang', 'vantelin-dome', 'BB', '2026-12-05', 'on_sale', null],
  ['bigbang', 'vantelin-dome', 'BB', '2026-12-06', 'on_sale', null],
  ['bigbang', 'tokyo-dome', 'BB', '2026-12-13', 'on_sale', null],
  ['bigbang', 'tokyo-dome', 'BB', '2026-12-14', 'on_sale', null],
  ['bigbang', 'tokyo-dome', 'BB', '2026-12-15', 'on_sale', null],
  ['bigbang', 'bukit-jalil', 'BB', '2027-01-09', 'on_sale', null],
  ['bigbang', 'jakarta-intl', 'BB', '2027-01-16', 'on_sale', null],
  ['txt', 'galaxy-arena', 'TXT2', '2026-11-20', 'on_sale', null],
  ['txt', 'galaxy-arena', 'TXT2', '2026-11-21', 'on_sale', null],
  ['txt', 'galaxy-arena', 'TXT2', '2026-11-22', 'on_sale', null],
  ['txt', 'tokyo-dome', 'TXT2', '2027-01-07', 'on_sale', null],
  ['txt', 'tokyo-dome', 'TXT2', '2027-01-08', 'on_sale', null],
  ['stray-kids', 'kai-tak', 'RUN', '2026-12-05', 'on_sale', null],
  ['stray-kids', 'taipei-dome', 'RUN', '2026-12-12', 'on_sale', null],
  ['monsta-x', 'pia-arena-mm', 'MX', '2026-12-08', 'on_sale', null],
  ['monsta-x', 'pia-arena-mm', 'MX', '2026-12-09', 'on_sale', null],
  ['nct-wish', 'gocheok', 'WISH', '2027-01-15', 'sold_out', null],
  ['nct-wish', 'gocheok', 'WISH', '2027-01-16', 'sold_out', null],
  ['nct-wish', 'kaohsiung-arena', 'WISH', '2027-01-23', 'announced', null],
  ['nct-wish', 'glion-arena', 'WISH', '2027-03-05', 'announced', null],
  ['nct-wish', 'glion-arena', 'WISH', '2027-03-06', 'announced', null],
  ['nct-wish', 'glion-arena', 'WISH', '2027-03-07', 'announced', null],
  ['nct-wish', 'kitakyushu-messe', 'WISH', '2027-03-13', 'announced', null],
  ['nct-wish', 'kitakyushu-messe', 'WISH', '2027-03-14', 'announced', null],
  ['nct-wish', 'port-messe', 'WISH', '2027-03-21', 'announced', null],
  ['nct-wish', 'port-messe', 'WISH', '2027-03-22', 'announced', null],
  ['andteam', 'marine-messe', 'AT', '2027-03-20', 'announced', null],
  ['andteam', 'marine-messe', 'AT', '2027-03-21', 'announced', null],
  ['andteam', 'marine-messe', 'AT', '2027-03-22', 'announced', null],
  ['andteam', 'sekisui-heim', 'AT', '2027-03-26', 'announced', null],
  ['andteam', 'sekisui-heim', 'AT', '2027-03-27', 'announced', null],
  ['izna', 'zepp-fukuoka', 'IZNA', '2027-03-12T19:00', 'on_sale', null],
  ['izna', 'zepp-haneda', 'IZNA', '2027-03-14T18:00', 'on_sale', null],
  ['izna', 'zepp-nagoya', 'IZNA', '2027-03-27T18:00', 'on_sale', null],
  ['izna', 'zepp-namba', 'IZNA', '2027-03-28T18:00', 'on_sale', null],
  ['changmin', 'kanamoto-hall', 'CM', '2027-03-25', 'announced', null],
  ['changmin', 'kanamoto-hall', 'CM', '2027-03-26', 'announced', null],
  ['changmin', 'obihiro-civic', 'CM', '2027-03-28', 'announced', null],
  ['qwer', 'awe-hall10', 'QWER', '2027-01-02', 'on_sale', null],
  ['qwer', 'mediacorp-theatre', 'QWER', '2027-01-08', 'on_sale', null],
  ['qwer', 'mediacorp-theatre', 'QWER', '2027-01-09', 'on_sale', null],
  ['do-kyung-soo', 'sg-indoor', 'DO', '2027-01-09', 'on_sale', null],
  ['do-kyung-soo', 'awe-hall10', 'DO', '2027-01-16', 'on_sale', null],
  ['boynextdoor', 'ntsu-arena', 'BND', '2027-01-09', 'on_sale', null],
  ['boynextdoor', 'ntsu-arena', 'BND', '2027-01-10', 'on_sale', null],
  ['boynextdoor', 'asiaworld-arena', 'BND', '2027-01-16', 'on_sale', null],
  ['nct-127', 'taipei-arena', 'NCT', '2027-01-02', 'on_sale', null],
  ['nct-127', 'unifi-arena', 'NCT', '2027-01-09', 'on_sale', null],
  ['jinyoung', 'impact', 'JY', '2027-01-09', 'on_sale', null],
  ['jinyoung', 'impact', 'JY', '2027-01-10', 'on_sale', null],
  ['roy-kim', 'kspo-dome', 'RK', '2026-11-21', 'on_sale', null],
  ['roy-kim', 'kspo-dome', 'RK', '2026-11-22', 'on_sale', null],
  ['roy-kim', 'macpherson', 'RK', '2027-01-09', 'on_sale', null],
  ['katseye', 'kspo-dome', 'KAT', '2027-02-04', 'on_sale', null],
  ['sung-si-kyung', 'kspo-dome', 'SSK', '2026-12-31', 'on_sale', null],
  ['sung-si-kyung', 'kspo-dome', 'SSK', '2027-01-01', 'on_sale', null],
  ['sung-si-kyung', 'kspo-dome', 'SSK', '2027-01-02', 'on_sale', null],
  ['sung-si-kyung', 'kspo-dome', 'SSK', '2027-01-03', 'on_sale', null],
  ['epik-high', 'kspo-dome', 'EH', '2027-01-22', 'on_sale', null],
  ['epik-high', 'kspo-dome', 'EH', '2027-01-23', 'on_sale', null],
  ['epik-high', 'kspo-dome', 'EH', '2027-01-24', 'on_sale', null],
  ['cravity', 'olympic-hall', 'CRV', '2026-11-14', 'on_sale', null],
  ['cravity', 'olympic-hall', 'CRV', '2026-11-15', 'on_sale', null],
  ['enhypen', 'tokyo-dome', 'ENH', '2026-12-01', 'on_sale', null],
  ['enhypen', 'tokyo-dome', 'ENH', '2026-12-02', 'on_sale', null],
  // 赞多长沙（湖南省营业性演出准予许可 430000522026000571；入境停留 3/10-15）
  ['santa', 'changsha-tbd', 'SANTA', '2027-03-13', 'announced', null],
  // 川上洋平（[Alexandros] 主唱）solo TOUR #room665（プレオーダー受付中→presale）
  ['yoohei-kawakami', 'zepp-nagoya', 'YK', '2026-12-03', 'presale', null],
  ['yoohei-kawakami', 'zepp-nagoya', 'YK', '2026-12-04', 'presale', null],
  ['yoohei-kawakami', 'zepp-osaka-bayside', 'YK', '2026-12-10', 'presale', null],
  ['yoohei-kawakami', 'zepp-osaka-bayside', 'YK', '2026-12-11', 'presale', null],
  ['yoohei-kawakami', 'kt-zepp-yokohama', 'YK', '2026-12-24', 'presale', null],
  ['yoohei-kawakami', 'kt-zepp-yokohama', 'YK', '2026-12-25', 'presale', null],
  // [Alexandros] 2027 三档巡演（11/1 官宣；FC 巡演先行中→presale，其余 announced）
  ['alexandros', 'gorilla-hall', 'ALEX_FC', '2027-04-22', 'presale', null],
  ['alexandros', 'gorilla-hall', 'ALEX_FC', '2027-04-23', 'presale', null],
  ['alexandros', 'sapporo-factory', 'ALEX_FC', '2027-04-30', 'presale', null],
  ['alexandros', 'diamond-hall', 'ALEX_FC', '2027-05-06', 'presale', null],
  ['alexandros', 'diamond-hall', 'ALEX_FC', '2027-05-07', 'presale', null],
  ['alexandros', 'unitedlab', 'ALEX_FC', '2027-05-12', 'presale', null],
  ['alexandros', 'zepp-shinjuku', 'ALEX_FC', '2027-05-17', 'presale', null],
  ['alexandros', 'zepp-shinjuku', 'ALEX_FC', '2027-05-18', 'presale', null],
  ['alexandros', 'zepp-fukuoka', 'ALEX_DE', '2027-06-22', 'announced', null],
  ['alexandros', 'zepp-fukuoka', 'ALEX_DE', '2027-06-23', 'announced', null],
  ['alexandros', 'zepp-nagoya', 'ALEX_DE', '2027-06-30', 'announced', null],
  ['alexandros', 'zepp-nagoya', 'ALEX_DE', '2027-07-01', 'announced', null],
  ['alexandros', 'zepp-sapporo', 'ALEX_DE', '2027-07-09', 'announced', null],
  ['alexandros', 'zepp-osaka-bayside', 'ALEX_DE', '2027-07-14', 'announced', null],
  ['alexandros', 'zepp-osaka-bayside', 'ALEX_DE', '2027-07-15', 'announced', null],
  ['alexandros', 'zepp-haneda', 'ALEX_DE', '2027-07-21', 'announced', null],
  ['alexandros', 'zepp-haneda', 'ALEX_DE', '2027-07-22', 'announced', null],
  ['alexandros', 'ariake-arena', 'ALEX_VP', '2027-09-04', 'announced', null],
  ['alexandros', 'ariake-arena', 'ALEX_VP', '2027-09-05', 'announced', null],
  ['alexandros', 'osaka-jo-hall', 'ALEX_VP', '2027-09-12', 'announced', null],
  // ZUTOMAYO「アピクラ電機」LÚ.NIM.LÀL 全国厅巡演（开演时间未公布→只显示日期；PREMIUM 先行中→presale）
  ['zutomayo', 'hbg-hall', 'ZTMY', '2027-01-15', 'presale', null],
  ['zutomayo', 'ichikawa-bunka', 'ZTMY', '2027-01-18', 'presale', null],
  ['zutomayo', 'ichikawa-bunka', 'ZTMY', '2027-01-19', 'presale', null],
  ['zutomayo', 'jcom-hachioji', 'ZTMY', '2027-01-21', 'presale', null],
  ['zutomayo', 'sgc-hall', 'ZTMY', '2027-01-26', 'presale', null],
  ['zutomayo', 'sgc-hall', 'ZTMY', '2027-01-27', 'presale', null],
  ['zutomayo', 'rose-theatre', 'ZTMY', '2027-02-06', 'presale', null],
  ['zutomayo', 'kobe-kokusai', 'ZTMY', '2027-02-15', 'presale', null],
  ['zutomayo', 'kobe-kokusai', 'ZTMY', '2027-02-16', 'presale', null],
  ['zutomayo', 'iichiko-gran', 'ZTMY', '2027-02-21', 'presale', null],
  ['zutomayo', 'kumamoto-jo', 'ZTMY', '2027-02-23', 'presale', null],
  ['zutomayo', 'iwaki-alios', 'ZTMY', '2027-02-27', 'presale', null],
  ['zutomayo', 'tokyo-garden', 'ZTMY', '2027-03-04', 'presale', null],
  ['zutomayo', 'tokyo-garden', 'ZTMY', '2027-03-05', 'presale', null],
  ['zutomayo', 'matsuyama-shimin', 'ZTMY', '2027-03-13', 'presale', null],
  ['zutomayo', 'fukuoka-sunpalace', 'ZTMY', '2027-03-15', 'presale', null],
  ['zutomayo', 'kddi-ishin', 'ZTMY', '2027-03-16', 'presale', null],
  ['zutomayo', 'aichi-geijutsu', 'ZTMY', '2027-03-24', 'presale', null],
  ['zutomayo', 'aichi-geijutsu', 'ZTMY', '2027-03-25', 'presale', null],
  ['zutomayo', 'kanazawa-kagekiza', 'ZTMY', '2027-03-30', 'presale', null],
  ['zutomayo', 'kanazawa-kagekiza', 'ZTMY', '2027-03-31', 'presale', null],
  ['zutomayo', 'nara-100', 'ZTMY', '2027-04-08', 'presale', null],
  ['zutomayo', 'harenowa', 'ZTMY', '2027-04-10', 'presale', null],
  ['zutomayo', 'harenowa', 'ZTMY', '2027-04-11', 'presale', null],
  ['zutomayo', 'hitaru', 'ZTMY', '2027-04-20', 'presale', null],
  ['zutomayo', 'hitaru', 'ZTMY', '2027-04-21', 'presale', null],
  ['zutomayo', 'festival-hall', 'ZTMY', '2027-04-27', 'presale', null],
  ['zutomayo', 'festival-hall', 'ZTMY', '2027-04-28', 'presale', null],
  ['zutomayo', 'tachikawa-stage', 'ZTMY', '2027-05-01', 'presale', null],
  ['zutomayo', 'tachikawa-stage', 'ZTMY', '2027-05-02', 'presale', null],
  ['zutomayo', 'sendai-sunplaza', 'ZTMY', '2027-05-11', 'presale', null],
  ['zutomayo', 'sendai-sunplaza', 'ZTMY', '2027-05-12', 'presale', null],
  ['zutomayo', 'culttz-kawasaki', 'ZTMY', '2027-05-17', 'presale', null],
  ['zutomayo', 'culttz-kawasaki', 'ZTMY', '2027-05-18', 'presale', null],
  ['zutomayo', 'wakayama-kenmin', 'ZTMY', '2027-05-22', 'presale', null],
  ['zutomayo', 'wakayama-kenmin', 'ZTMY', '2027-05-23', 'presale', null],
  // 藤井 風 Prema World Tour（高雄 10/31 已结束；香港场取消；欧美 2027 夏待定）
  ['fujii-kaze', 'paypay-dome', 'KAZE', '2026-11-14', 'announced', null],
  ['fujii-kaze', 'paypay-dome', 'KAZE', '2026-11-15', 'announced', null],
  ['fujii-kaze', 'kyocera-dome', 'KAZE', '2026-12-10', 'announced', null],
  ['fujii-kaze', 'kyocera-dome', 'KAZE', '2026-12-12', 'announced', null],
  ['fujii-kaze', 'kyocera-dome', 'KAZE', '2026-12-13', 'announced', null],
  ['fujii-kaze', 'tokyo-dome', 'KAZE', '2026-12-19', 'announced', null],
  ['fujii-kaze', 'tokyo-dome', 'KAZE', '2026-12-20', 'announced', null],
  ['fujii-kaze', 'supachalasai', 'KAZE', '2026-12-26', 'announced', null],
  ['fujii-kaze', 'gocheok', 'KAZE', '2027-01-09', 'announced', null],
  // Ado 歌ってみたツアー2027（FC 先行已结束，一般発売日未公布）
  ['ado', 'ariake-arena', 'ADO', '2027-01-10T17:00', 'announced', null],
  ['ado', 'ariake-arena', 'ADO', '2027-01-11T16:00', 'announced', null],
  ['ado', 'asue-arena-osaka', 'ADO', '2027-01-30T17:00', 'announced', null],
  ['ado', 'asue-arena-osaka', 'ADO', '2027-01-31T16:00', 'announced', null],
  ['ado', 'port-messe', 'ADO', '2027-02-27T17:00', 'announced', null],
  ['ado', 'port-messe', 'ADO', '2027-02-28T16:00', 'announced', null],
];

export const events: Event[] = rows.map(([artist, venue, tourKey, startLocal, ticketStatus, onSale], i) => ({
  id: i + 1,
  artist,
  venue,
  tourName: T[tourKey].tour,
  startLocal,
  ticketStatus,
  ...(onSale ? { onSaleLocal: onSale } : {}),
  sourceUrl: T[tourKey].src,
  verifiedAt: V,
}));

export const artistBySlug = Object.fromEntries(artists.map((a) => [a.slug, a]));
export const venueById = Object.fromEntries(venues.map((v) => [v.id, v]));

export const sortedEvents = [...events].sort((a, b) => a.startLocal.localeCompare(b.startLocal));

export const eventsByVenue = (venueId: string) => sortedEvents.filter((e) => e.venue === venueId);

export const mapVenues = venues
  .map((v) => ({
    id: v.id,
    name: v.name,
    nameLocal: v.nameLocal ?? '',
    cityZh: v.cityZh,
    citySlug: v.citySlug,
    region: regions[v.countryCode],
    lng: v.lng,
    lat: v.lat,
  }));

export type MapVenue = (typeof mapVenues)[number];
