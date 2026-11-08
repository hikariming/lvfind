// 真实数据（来源见各 event 的 sourceUrl），由 agent/ 下的 List 定期核对维护。
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
  HK: '中国香港',
  MO: '中国澳门',
  TW: '中国台湾',
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

export const artists: Artist[] = [
  { slug: 'ive', nameOriginal: 'IVE', nameLocal: '아이브', genre: 'kpop' },
  { slug: 'seventeen', nameOriginal: 'SEVENTEEN', nameLocal: '세븐틴', genre: 'kpop' },
  { slug: 'jxj', nameOriginal: 'JxJ (SEVENTEEN)', nameLocal: '정한X조슈아', genre: 'kpop' },
  { slug: 'aespa', nameOriginal: 'aespa', nameLocal: '에스파', genre: 'kpop' },
  { slug: 'stray-kids', nameOriginal: 'Stray Kids', nameLocal: '스트레이 키즈', genre: 'kpop' },
  { slug: 'le-sserafim', nameOriginal: 'LE SSERAFIM', nameLocal: '르세라핌', genre: 'kpop' },
  { slug: 'twice', nameOriginal: 'TWICE', nameLocal: '트와이스', genre: 'kpop' },
  { slug: 'enhypen', nameOriginal: 'ENHYPEN', nameLocal: '엔하이픈', genre: 'kpop' },
  { slug: 'illit', nameOriginal: 'ILLIT', nameLocal: '아일릿', genre: 'kpop' },
  { slug: 'babymonster', nameOriginal: 'BABYMONSTER', nameLocal: '베이비몬스터', genre: 'kpop' },
  { slug: 'yoasobi', nameOriginal: 'YOASOBI', nameLocal: 'ヨアソビ', genre: 'jpop' },
  { slug: 'ado', nameOriginal: 'Ado', nameLocal: 'アド', genre: 'jpop' },
  { slug: 'mrs-green-apple', nameOriginal: 'Mrs. GREEN APPLE', nameLocal: 'ミセス', genre: 'jpop' },
  { slug: 'official-hige-dandism', nameOriginal: 'Official髭男dism', nameLocal: 'ヒゲダン', genre: 'jpop' },
  { slug: 'kenshi-yonezu', nameOriginal: '米津玄師', nameLocal: 'Kenshi Yonezu', genre: 'jpop' },
  { slug: 'king-gnu', nameOriginal: 'King Gnu', nameLocal: 'キングヌー', genre: 'jpop' },
  { slug: 'babymetal', nameOriginal: 'BABYMETAL', nameLocal: 'ベビーメタル', genre: 'jpop' },
  { slug: 'aimer', nameOriginal: 'Aimer', nameLocal: 'エメ', genre: 'jpop' },
];

const JST = { countryCode: 'JP', timezone: 'Asia/Tokyo', tzAbbr: 'JST' } as const;
const KST = { countryCode: 'KR', timezone: 'Asia/Seoul', tzAbbr: 'KST' } as const;
const CST = { countryCode: 'TW', timezone: 'Asia/Taipei', tzAbbr: 'CST' } as const;
const CET = { timezone: 'Europe/Paris', tzAbbr: 'CET' } as const;

export const venues: Venue[] = [
  // 日本
  { id: 'tokyo-dome', name: 'Tokyo Dome', nameLocal: '東京ドーム', type: 'dome', city: 'Tokyo', citySlug: 'tokyo', cityZh: '东京', ...JST, lat: 35.7056, lng: 139.7519, capacity: 55000, address: '東京都文京区後楽 1-3-61', transit: 'JR / 都营三田线「水道桥」站，丸之内线 / 南北线「后乐园」站', website: 'https://www.tokyo-dome.co.jp/' },
  { id: 'saitama-super-arena', name: 'Saitama Super Arena', nameLocal: 'さいたまスーパーアリーナ', type: 'arena', city: 'Saitama', citySlug: 'saitama', cityZh: '埼玉', ...JST, lat: 35.8949, lng: 139.6311, capacity: 37000, address: '埼玉県さいたま市中央区新都心 8', transit: 'JR「埼玉新都心」站步行约 3 分钟' },
  { id: 'k-arena', name: 'K-Arena Yokohama', nameLocal: 'Kアリーナ横浜', type: 'arena', city: 'Yokohama', citySlug: 'yokohama', cityZh: '横滨', ...JST, lat: 35.4672, lng: 139.6283, capacity: 20000, address: '神奈川県横浜市西区みなとみらい 6-2-14', transit: '「横滨」站步行约 13 分钟，港未来线「新高岛」站约 5 分钟' },
  { id: 'kyocera-dome', name: 'Kyocera Dome Osaka', nameLocal: '京セラドーム大阪', type: 'dome', city: 'Osaka', citySlug: 'osaka', cityZh: '大阪', ...JST, lat: 34.6694, lng: 135.4761, capacity: 55000, address: '大阪府大阪市西区千代崎 3-中 2-1', transit: '长堀鹤见绿地线「大阪巨蛋前千代崎」站，JR「大正」站' },
  { id: 'vantelin-dome', name: 'Vantelin Dome Nagoya', nameLocal: 'バンテリンドーム ナゴヤ', type: 'dome', city: 'Nagoya', citySlug: 'nagoya', cityZh: '名古屋', ...JST, lat: 35.1859, lng: 136.9475, capacity: 40500, address: '愛知県名古屋市東区大幸南 1-1-1', transit: '名城线「巨蛋前矢田」站步行约 5 分钟' },
  { id: 'paypay-dome', name: 'Mizuho PayPay Dome Fukuoka', nameLocal: 'みずほPayPayドーム福岡', type: 'dome', city: 'Fukuoka', citySlug: 'fukuoka', cityZh: '福冈', ...JST, lat: 33.5954, lng: 130.3622, capacity: 40000, address: '福岡県福岡市中央区地行浜 2-2-2', transit: '地铁空港线「唐人町」站步行约 15 分钟' },
  { id: 'premist-dome', name: 'Daiwa House PREMIST DOME', nameLocal: '大和ハウス プレミストドーム', type: 'dome', city: 'Sapporo', citySlug: 'sapporo', cityZh: '札幌', ...JST, lat: 42.9957, lng: 141.4095, capacity: 42000, address: '北海道札幌市豊平区羊ケ丘 1', transit: '地铁东丰线「福住」站步行约 10 分钟' },
  { id: 'belluna-dome', name: 'Belluna Dome', nameLocal: 'ベルーナドーム', type: 'dome', city: 'Saitama', citySlug: 'saitama', cityZh: '埼玉·所泽', ...JST, lat: 35.7684, lng: 139.4204, capacity: 35000, address: '埼玉県所沢市上山口 2135', transit: '西武铁道「西武球场前」站' },
  { id: 'ariake-arena', name: 'Ariake Arena', nameLocal: '有明アリーナ', type: 'arena', city: 'Tokyo', citySlug: 'tokyo', cityZh: '东京', ...JST, lat: 35.6392, lng: 139.79, capacity: 15000, address: '東京都江東区有明 1-11-1', transit: '百合鸥线「有明」站 / 「国际展示场」站步行约 8 分钟' },
  { id: 'asue-arena-osaka', name: 'Asue Arena Osaka', nameLocal: 'アシストヒューマンエキスポアリーナ大阪', type: 'arena', city: 'Osaka', citySlug: 'osaka', cityZh: '大阪', ...JST, lat: 34.676, lng: 135.4997, capacity: 8200, address: '大阪市中央区中央体育館（大阪城公园内）', transit: 'JR 环状线「大阪城公园」站 / 地铁「森之宫」站' },
  { id: 'port-messe', name: 'Port Messe Nagoya', nameLocal: 'ポートメッセなごや', type: 'hall', city: 'Nagoya', citySlug: 'nagoya', cityZh: '名古屋', ...JST, lat: 35.0461, lng: 136.8343, capacity: 18000, address: '名古屋市港区金城ふ頭 2-2', transit: '青波线「金城ふ頭」站步行约 5 分钟' },
  // 韩国
  { id: 'kspo-dome', name: 'KSPO DOME', nameLocal: 'KSPO돔', type: 'arena', city: 'Seoul', citySlug: 'seoul', cityZh: '首尔', ...KST, lat: 37.5193, lng: 127.1272, capacity: 15000, address: '서울 송파구 올림픽로 424 (奥林匹克公园内)', transit: '地铁 5 号线「奥林匹克公园」站 3 号出口' },
  { id: 'gocheok', name: 'Gocheok Sky Dome', nameLocal: '고척스카이돔', type: 'dome', city: 'Seoul', citySlug: 'seoul', cityZh: '首尔', ...KST, lat: 37.4982, lng: 126.8671, capacity: 16700, address: '서울 구로구 경인로 430', transit: '地铁 1 号线「九一」站 2 号出口' },
  { id: 'inspire-arena', name: 'INSPIRE Arena', nameLocal: '인스파이어 아레나', type: 'arena', city: 'Incheon', citySlug: 'incheon', cityZh: '仁川', ...KST, lat: 37.4627, lng: 126.3918, capacity: 15000, address: '인천 중구 공항문화로 127', transit: '仁川机场磁悬浮 / 酒店接驳巴士，距仁川机场约 10 分钟' },
  { id: 'bexco', name: 'BEXCO', nameLocal: '벡스코', type: 'hall', city: 'Busan', citySlug: 'busan', cityZh: '釜山', ...KST, lat: 35.1692, lng: 129.136, capacity: 10000, address: '부산 해운대구 APEC로 55', transit: '地铁 2 号线「Centum City」站' },
  // 中国
  { id: 'kai-tak', name: 'Kai Tak Stadium', nameLocal: '啟德主場館', type: 'stadium', city: 'Hong Kong', citySlug: 'hong-kong', cityZh: '香港', countryCode: 'HK', timezone: 'Asia/Hong_Kong', tzAbbr: 'HKT', lat: 22.3237, lng: 114.1981, capacity: 50000, address: '香港九龍城區啟德', transit: '港铁屯马线「启德」站步行约 5 分钟' },
  { id: 'asiaworld-arena', name: 'AsiaWorld-Arena', nameLocal: '亞洲國際博覽館', type: 'arena', city: 'Hong Kong', citySlug: 'hong-kong', cityZh: '香港', countryCode: 'HK', timezone: 'Asia/Hong_Kong', tzAbbr: 'HKT', lat: 22.3217, lng: 113.9425, capacity: 14000, address: '香港大嶼山赤鱲角', transit: '港铁机场快线「博览馆」站' },
  { id: 'galaxy-arena', name: 'Galaxy Arena', nameLocal: '銀河綜藝館', type: 'arena', city: 'Macau', citySlug: 'macau', cityZh: '澳门', countryCode: 'MO', timezone: 'Asia/Macau', tzAbbr: 'CST', lat: 22.1477, lng: 113.553, capacity: 16000, address: '澳門路氹城銀河綜合度假城', transit: '澳门轻轨「莲花口岸」/ 酒店免费接驳巴士' },
  { id: 'venetian-arena', name: 'The Venetian Arena', nameLocal: '威尼斯人綜藝館', type: 'arena', city: 'Macau', citySlug: 'macau', cityZh: '澳门', countryCode: 'MO', timezone: 'Asia/Macau', tzAbbr: 'CST', lat: 22.1485, lng: 113.5592, capacity: 15000, address: '澳門路氹城威尼斯人度假村', transit: '澳门轻轨「路氹东」站 / 酒店接驳巴士' },
  { id: 'taipei-dome', name: 'Taipei Dome', nameLocal: '臺北大巨蛋', type: 'dome', city: 'Taipei', citySlug: 'taipei', cityZh: '台北', ...CST, lat: 25.0437, lng: 121.5598, capacity: 40000, address: '台北市信義區忠孝東路四段 515 號', transit: '捷运板南线「国父纪念馆」站 5 号出口' },
  { id: 'taipei-arena', name: 'Taipei Arena', nameLocal: '臺北小巨蛋', type: 'arena', city: 'Taipei', citySlug: 'taipei', cityZh: '台北', ...CST, lat: 25.0516, lng: 121.5498, capacity: 15000, address: '台北市松山區南京東路四段 2 號', transit: '捷运松山新店线「台北小巨蛋」站' },
  { id: 'ntsu-arena', name: 'NTSU Arena', nameLocal: '國立體育大學綜合體育館（林口體育館）', type: 'arena', city: 'Taoyuan', citySlug: 'taoyuan', cityZh: '桃园·林口', ...CST, lat: 25.049, lng: 121.3758, capacity: 15000, address: '桃園市龜山區文化一路 250 號', transit: '机场捷运「长庚医院」站换乘接驳' },
  { id: 'kaohsiung-stadium', name: 'National Stadium Kaohsiung', nameLocal: '高雄國家體育場', type: 'stadium', city: 'Kaohsiung', citySlug: 'kaohsiung', cityZh: '高雄', ...CST, lat: 22.7027, lng: 120.2943, capacity: 55000, address: '高雄市左營區世運大道 100 號', transit: '高雄捷运红线「世运」站' },
  { id: 'mercedes-sh', name: 'Mercedes-Benz Arena', nameLocal: '梅赛德斯-奔驰文化中心', type: 'arena', city: 'Shanghai', citySlug: 'shanghai', cityZh: '上海', countryCode: 'CN', timezone: 'Asia/Shanghai', tzAbbr: 'CST', lat: 31.189, lng: 121.492, capacity: 18000, address: '上海市浦东新区世博大道 1200 号', transit: '地铁 8 号线「中华艺术宫」站' },
  { id: 'cadillac-bj', name: 'Cadillac Arena', nameLocal: '五棵松体育馆', type: 'arena', city: 'Beijing', citySlug: 'beijing', cityZh: '北京', countryCode: 'CN', timezone: 'Asia/Shanghai', tzAbbr: 'CST', lat: 39.9067, lng: 116.2766, capacity: 18000, address: '北京市海淀区复兴路 69 号', transit: '地铁 1 号线「五棵松」站' },
  { id: 'shenzhen-uni', name: 'Shenzhen Universiade Sports Centre', nameLocal: '深圳大运中心体育场', type: 'stadium', city: 'Shenzhen', citySlug: 'shenzhen', cityZh: '深圳', countryCode: 'CN', timezone: 'Asia/Shanghai', tzAbbr: 'CST', lat: 22.6966, lng: 114.2128, capacity: 60000, address: '深圳市龙岗区龙翔大道 3001 号', transit: '地铁 3 号线「大运」站' },
  // 东南亚
  { id: 'sg-national', name: 'National Stadium', type: 'stadium', city: 'Singapore', citySlug: 'singapore', cityZh: '新加坡', countryCode: 'SG', timezone: 'Asia/Singapore', tzAbbr: 'SGT', lat: 1.304, lng: 103.8746, capacity: 55000, address: '1 Stadium Dr, Singapore 397629', transit: 'MRT 环线「Stadium」站' },
  { id: 'sg-indoor', name: 'Singapore Indoor Stadium', type: 'arena', city: 'Singapore', citySlug: 'singapore', cityZh: '新加坡', countryCode: 'SG', timezone: 'Asia/Singapore', tzAbbr: 'SGT', lat: 1.3009, lng: 103.8742, capacity: 12000, address: '2 Stadium Walk, Singapore 397691', transit: 'MRT 环线「Stadium」站' },
  { id: 'apex-expo', name: 'APEX @ Singapore EXPO', type: 'hall', city: 'Singapore', citySlug: 'singapore', cityZh: '新加坡', countryCode: 'SG', timezone: 'Asia/Singapore', tzAbbr: 'SGT', lat: 1.3354, lng: 103.9584, capacity: 12000, address: '1 Expo Dr, Singapore 486150', transit: 'MRT 东西线 / 滨海市区线「Expo」站' },
  { id: 'impact', name: 'IMPACT Arena', type: 'arena', city: 'Bangkok', citySlug: 'bangkok', cityZh: '曼谷', countryCode: 'TH', timezone: 'Asia/Bangkok', tzAbbr: 'ICT', lat: 13.9126, lng: 100.548, capacity: 12000, address: 'Muang Thong Thani, Nonthaburi', transit: 'MRT 粉线「Impact Muang Thong Thani」站' },
  { id: 'axiata', name: 'Axiata Arena', type: 'arena', city: 'Kuala Lumpur', citySlug: 'kuala-lumpur', cityZh: '吉隆坡', countryCode: 'MY', timezone: 'Asia/Kuala_Lumpur', tzAbbr: 'MYT', lat: 3.0546, lng: 101.6916, capacity: 16000, address: 'Bukit Jalil National Sports Complex', transit: 'LRT「Bukit Jalil」站' },
  { id: 'unifi-arena', name: 'Unifi Arena', type: 'arena', city: 'Kuala Lumpur', citySlug: 'kuala-lumpur', cityZh: '吉隆坡', countryCode: 'MY', timezone: 'Asia/Kuala_Lumpur', tzAbbr: 'MYT', lat: 3.1048, lng: 101.6897, capacity: 10000, address: 'KL Sports City, Bukit Jalil', transit: 'LRT「Bukit Jalil」站' },
  { id: 'moa-arena', name: 'SM Mall of Asia Arena', type: 'arena', city: 'Pasay', citySlug: 'manila', cityZh: '马尼拉·帕赛', countryCode: 'PH', timezone: 'Asia/Manila', tzAbbr: 'PHT', lat: 14.5323, lng: 120.9837, capacity: 16000, address: 'Mall of Asia Complex, Pasay City', transit: '马尼拉市区打车 / 轻轨换乘巴士' },
  { id: 'philippine-arena', name: 'Philippine Arena', type: 'dome', city: 'Bulacan', citySlug: 'bulacan', cityZh: '布拉干', countryCode: 'PH', timezone: 'Asia/Manila', tzAbbr: 'PHT', lat: 14.7951, lng: 120.9548, capacity: 55000, address: 'Ciudad de Victoria, Bocaue, Bulacan', transit: '马尼拉市区包车 / 主办方接驳巴士，约 1–2 小时' },
  { id: 'indonesia-arena', name: 'Indonesia Arena', type: 'arena', city: 'Jakarta', citySlug: 'jakarta', cityZh: '雅加达', countryCode: 'ID', timezone: 'Asia/Jakarta', tzAbbr: 'WIB', lat: -6.2186, lng: 106.802, capacity: 16000, address: 'Gelora Bung Karno Complex, Jakarta', transit: 'MRT「Istora Mandiri」站' },
  // 北美
  { id: 'kia-forum', name: 'Kia Forum', type: 'arena', city: 'Los Angeles', citySlug: 'los-angeles', cityZh: '洛杉矶', countryCode: 'US', timezone: 'America/Los_Angeles', tzAbbr: 'PST', lat: 33.9583, lng: -118.3418, capacity: 17500, address: '3900 W Manchester Blvd, Inglewood, CA', transit: 'Metro K Line「Downtown Inglewood」站' },
  { id: 'msg', name: 'Madison Square Garden', type: 'arena', city: 'New York', citySlug: 'new-york', cityZh: '纽约', countryCode: 'US', timezone: 'America/New_York', tzAbbr: 'EST', lat: 40.7505, lng: -73.9934, capacity: 20000, address: '4 Pennsylvania Plaza, New York, NY', transit: '地铁「34 St–Penn Station」站' },
  // 欧洲
  { id: 'o2', name: 'The O2', type: 'arena', city: 'London', citySlug: 'london', cityZh: '伦敦', countryCode: 'GB', timezone: 'Europe/London', tzAbbr: 'GMT', lat: 51.503, lng: 0.0032, capacity: 20000, address: 'Peninsula Square, London SE10 0DX', transit: '地铁 Jubilee 线「North Greenwich」站' },
  { id: 'ao-arena', name: 'AO Arena', type: 'arena', city: 'Manchester', citySlug: 'manchester', cityZh: '曼彻斯特', countryCode: 'GB', timezone: 'Europe/London', tzAbbr: 'GMT', lat: 53.4881, lng: -2.2439, capacity: 21000, address: 'Victoria Station, Hunts Bank, Manchester', transit: '火车 / 电车「Victoria」站' },
  { id: 'accor-arena', name: 'Accor Arena', type: 'arena', city: 'Paris', citySlug: 'paris', cityZh: '巴黎', countryCode: 'FR', ...CET, lat: 48.8386, lng: 2.3785, capacity: 20000, address: '8 Bd de Bercy, 75012 Paris', transit: '地铁 6 / 14 号线「Bercy」站' },
  { id: 'la-defense-arena', name: 'Paris La Défense Arena', type: 'dome', city: 'Paris', citySlug: 'paris', cityZh: '巴黎', countryCode: 'FR', ...CET, lat: 48.8956, lng: 2.229, capacity: 40000, address: 'Nanterre, 92000 Paris', transit: 'RER A / 地铁 1 号线「La Défense」站' },
  { id: 'ziggo-dome', name: 'Ziggo Dome', type: 'arena', city: 'Amsterdam', citySlug: 'amsterdam', cityZh: '阿姆斯特丹', countryCode: 'NL', timezone: 'Europe/Amsterdam', tzAbbr: 'CET', lat: 52.3134, lng: 4.937, capacity: 17000, address: 'De Passage 100, 1101 AX Amsterdam', transit: '火车 / 地铁「Bijlmer ArenA」站' },
  { id: 'uber-arena', name: 'Uber Arena', type: 'arena', city: 'Berlin', citySlug: 'berlin', cityZh: '柏林', countryCode: 'DE', timezone: 'Europe/Berlin', tzAbbr: 'CET', lat: 52.5056, lng: 13.4434, capacity: 17000, address: 'Uber-Platz 1, 10243 Berlin', transit: 'S-Bahn / U-Bahn「Warschauer Straße」站' },
  { id: 'unipol-dome', name: 'Unipol Dome', type: 'arena', city: 'Milan', citySlug: 'milan', cityZh: '米兰', countryCode: 'IT', timezone: 'Europe/Rome', tzAbbr: 'CET', lat: 45.4272, lng: 9.114, capacity: 12000, address: 'Via Di Vittorio 6, Assago MI', transit: '地铁 M2「Assago Forum」站' },
  { id: 'palau-sant-jordi', name: 'Palau Sant Jordi', type: 'arena', city: 'Barcelona', citySlug: 'barcelona', cityZh: '巴塞罗那', countryCode: 'ES', timezone: 'Europe/Madrid', tzAbbr: 'CET', lat: 41.3636, lng: 2.1522, capacity: 18000, address: 'Passeig Olímpic 5-7, Barcelona', transit: '地铁「Espanya」站换公交 / 步行上山' },
  { id: 'avicii-arena', name: 'Avicii Arena', type: 'arena', city: 'Stockholm', citySlug: 'stockholm', cityZh: '斯德哥尔摩', countryCode: 'SE', timezone: 'Europe/Stockholm', tzAbbr: 'CET', lat: 59.2936, lng: 18.0832, capacity: 16000, address: 'Arenatorget 1, Stockholm', transit: '地铁绿线「Globen」站' },
  { id: 'royal-arena', name: 'Royal Arena', type: 'arena', city: 'Copenhagen', citySlug: 'copenhagen', cityZh: '哥本哈根', countryCode: 'DK', timezone: 'Europe/Copenhagen', tzAbbr: 'CET', lat: 55.6258, lng: 12.5749, capacity: 16000, address: 'Hannemanns Allé 18-20, København S', transit: '地铁 M1「Ørestad」站' },
  // 大洋洲
  { id: 'qudos', name: 'Qudos Bank Arena', type: 'arena', city: 'Sydney', citySlug: 'sydney', cityZh: '悉尼', countryCode: 'AU', timezone: 'Australia/Sydney', tzAbbr: 'AEDT', lat: -33.8443, lng: 151.0656, capacity: 21000, address: '19 Edwin Flack Ave, Sydney Olympic Park', transit: '火车「Olympic Park」站' },
  { id: 'afterpay-arena', name: 'Afterpay Arena', type: 'arena', city: 'Sydney', citySlug: 'sydney', cityZh: '悉尼', countryCode: 'AU', timezone: 'Australia/Sydney', tzAbbr: 'AEDT', lat: -33.8568, lng: 151.2104, capacity: 13000, address: 'Olympic Blvd / 悉尼奥林匹克公园区域（待核对）', transit: '火车「Olympic Park」站' },
  { id: 'rod-laver', name: 'Rod Laver Arena', type: 'arena', city: 'Melbourne', citySlug: 'melbourne', cityZh: '墨尔本', countryCode: 'AU', timezone: 'Australia/Melbourne', tzAbbr: 'AEDT', lat: -37.8216, lng: 144.9785, capacity: 15000, address: 'Olympic Blvd, Melbourne VIC 3001', transit: '电车 70 路「Rod Laver Arena」站' },
  { id: 'spark-arena', name: 'Spark Arena', type: 'arena', city: 'Auckland', citySlug: 'auckland', cityZh: '奥克兰', countryCode: 'NZ', timezone: 'Pacific/Auckland', tzAbbr: 'NZDT', lat: -36.847, lng: 174.777, capacity: 12000, address: 'Mahuhu Cres, Auckland CBD', transit: '火车「Britomart」站步行约 10 分钟' },
];

// tour/source 常量
const T = {
  YOASOBI: { tour: 'YOASOBI ASIA 10-CITY DOME & STADIUM TOUR 2026-2027 “SUPER PLANET”', src: 'https://www.yoasobi-music.jp/live/' },
  AESPA: { tour: '2026-27 aespa LIVE TOUR – SYNK : COMPLæXITY', src: 'https://aespaworldtour.com/' },
  LSF: { tour: "2026 LE SSERAFIM TOUR 'PUREFLOW' IN ASIA", src: 'https://sourcemusic.com/artist/tour/LE%20SSERAFIM/17' },
  BM: { tour: '2026-27 BABYMONSTER WORLD TOUR [CHOOM]', src: 'https://yg-babymonster.com/concert/worldtourchoom/' },
  ENH: { tour: "ENHYPEN WORLD TOUR 'BLOOD SAGA'", src: 'https://www.enhypenbloodsaga.com/tournee' },
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
