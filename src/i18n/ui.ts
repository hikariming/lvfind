// 五语言 UI 字典：[zh-CN, zh-TW, en, ja, ko]
export const LANGS = ['zh-CN', 'zh-TW', 'en', 'ja', 'ko'] as const;
export type Lang = (typeof LANGS)[number];
export const LANG_LABEL: Record<Lang, string> = { 'zh-CN': '简体中文', 'zh-TW': '繁體中文', en: 'English', ja: '日本語', ko: '한국어' };

type T = [string, string, string, string, string];
export const ui: Record<string, T> = {
  'nav.artists': ['艺人', '藝人', 'Artists', 'アーティスト', '아티스트'],
  'nav.cities': ['城市', '城市', 'Cities', '都市', '도시'],
  'nav.venues': ['场馆', '場館', 'Venues', '会場', '공연장'],
  'nav.festivals': ['音乐节', '音樂節', 'Festivals', 'フェス', '페스티벌'],
  'nav.insights': ['数据', '數據', 'Data', 'データ', '데이터'],
  'nav.about': ['关于', '關於', 'About', '概要', '소개'],
  'nav.home': ['首页', '首頁', 'Home', 'ホーム', '홈'],
  'nav.theme': ['切换深色模式', '切換深色模式', 'Toggle dark mode', 'ダークモード切替', '다크 모드 전환'],
  'ui.footer': ['演出信息由 lvfind 整理核对，一切以艺人 / 主办方官方公告为准。', '演出資訊由 lvfind 整理核對，一切以藝人 / 主辦方官方公告為準。', 'Curated by lvfind. Always refer to official announcements.', '情報は lvfind が整理・確認。最新情報は公式発表をご確認ください。', 'lvfind가 정리·검토한 정보입니다. 공식 공지를 최종 확인해 주세요.'],
  'ui.all': ['全部', '全部', 'All', 'すべて', '전체'],
  'ui.onlySale': ['只看可购票', '只看可購票', 'On sale only', '販売中のみ', '판매 중만'],
  'ui.events': ['场演出', '場演出', 'shows', '公演', '공연'],
  'ui.verified': ['核对于', '核對於', 'Verified', '確認', '확인'],
  'ui.onsaleAt': ['开售', '開售', 'On sale', '発売', '발매'],
  'ui.general': ['一般', '一般', 'General', '一般', '일반'],
  'ui.backHome': ['回到首页', '回首頁', 'Back to home', 'ホームへ戻る', '홈으로'],
  'ui.notFound': ['没找到这个页面', '找不到這個頁面', 'Page not found', 'ページが見つかりません', '페이지를 찾을 수 없습니다'],
  'ui.notFoundSub': ['链接可能失效了，回首页看看最近的演出吧。', '連結可能失效了，回首頁看看最近的演出吧。', 'The link may be broken — check out upcoming shows.', 'リンク切れかもしれません。最新の公演はホームへ。', '링크가 만료되었을 수 있습니다. 홈에서 공연을 확인하세요.'],
  'genre.kpop': ['K-pop', 'K-pop', 'K-pop', 'K-pop', 'K-pop'],
  'genre.jpop': ['J-pop', 'J-pop', 'J-pop', 'J-pop', 'J-pop'],
  'genre.cpop': ['C-pop', 'C-pop', 'C-pop', 'C-pop', 'C-pop'],
  'status.announced': ['未开售', '未開售', 'Announced', '未発売', '미판매'],
  'status.presale': ['预售', '預售', 'Presale', '先行', '사전 판매'],
  'status.on_sale': ['售票中', '售票中', 'On sale', '発売中', '판매 중'],
  'status.sold_out': ['售罄', '售罄', 'Sold out', '完売', '매진'],
  'status.postponed': ['延期', '延期', 'Postponed', '延期', '연기'],
  'status.cancelled': ['取消', '取消', 'Cancelled', '中止', '취소'],
  'type.dome': ['巨蛋', '巨蛋', 'Dome', 'ドーム', '돔'],
  'type.stadium': ['体育场', '體育場', 'Stadium', 'スタジアム', '스타디움'],
  'type.arena': ['室内馆', '室內館', 'Arena', 'アリーナ', '아레나'],
  'type.hall': ['演出厅', '演出廳', 'Hall', 'ホール', '홀'],
  'filter.region': ['地区', '地區', 'Region', '地域', '지역'],
  'filter.artist': ['艺人', '藝人', 'Artist', 'アーティスト', '아티스트'],
  'filter.city': ['城市', '城市', 'City', '都市', '도시'],
  'filter.clear': ['清除筛选', '清除篩選', 'Clear filters', '絞り込み解除', '필터 초기화'],
  'filter.none': ['没有符合条件的演出', '沒有符合條件的演出', 'No matching shows', '該当する公演がありません', '조건에 맞는 공연이 없습니다'],
  'view.list': ['列表', '列表', 'List', 'リスト', '목록'],
  'view.cards': ['卡片', '卡片', 'Cards', 'カード', '카드'],
  'home.sub': ['打开就能看到整理好的全球 K-pop / J-pop 近期演出，方便规划追星旅行。', '打開就能看到整理好的全球 K-pop / J-pop 近期演出，方便規劃追星旅行。', 'Curated upcoming K-pop / J-pop shows worldwide — built for fan travel planning.', '世界中のK-pop/J-pop公演をまとめてチェック。ライブ旅行の計画に。', '전 세계 K-pop/J-pop 공연 일정을 한눈에 — 공연 여행 계획용.'],
  'artists.sub': ['点开可以看到巡演路线和全部场次。', '點開可以看到巡演路線和全部場次。', 'Tour routes and every show.', 'ツアールートと全公演をチェック。', '투어 루트와 전체 공연 보기.'],
  'cities.sub': ['点开可以看当地场馆和场次。', '點開可以看當地場館和場次。', 'Local venues and shows.', '各都市の会場と公演を確認。', '도시별 공연장과 공연 보기.'],
  'venues.sub': ['点开场馆可以看到交通、容量和即将举行的演出。', '點開場館可以看到交通、容量和即將舉行的演出。', 'Transit, capacity and upcoming shows per venue.', '会場の交通・収容人数・今後の公演を確認。', '공연장별 교통·수용 인원·공연 확인.'],
  'insights.sub': ['演出态势一览——月份分布、城市热度、地区对比，帮你规划下一次行程。', '演出態勢一覽——月份分布、城市熱度、地區對比，幫你規劃下一次行程。', 'Concert trends — monthly spread, hot cities, region comparison.', '公演の傾向を可視化——月別・都市別・地域別で旅行計画をサポート。', '공연 동향 한눈에 — 월별 분포, 도시별 인기, 지역 비교.'],
  'sec.monthly': ['月度分布', '月度分布', 'By month', '月別', '월별'],
  'sec.cityMonth': ['城市 × 月份', '城市 × 月份', 'City × Month', '都市 × 月', '도시 × 월'],
  'sec.country': ['国家 / 地区对比', '國家 / 地區對比', 'By country / region', '国・地域別', '국가/지역별'],
  'sec.calendar': ['日历热力', '日曆熱力', 'Calendar heatmap', 'カレンダー', '캘린더'],
  'sec.venueTop': ['场馆 TOP15', '場館 TOP15', 'Top venues', '会場 TOP15', '공연장 TOP15'],
};

// 地区名：与 regions map 同 key
export const regionI18n: Record<string, T> = {
  KR: ['韩国', '韓國', 'South Korea', '韓国', '한국'],
  JP: ['日本', '日本', 'Japan', '日本', '日本'],
  CN: ['中国大陆', '中國大陸', 'Mainland China', '中国大陸', '중국 본토'],
  HK: ['香港', '香港', 'Hong Kong', '香港', '홍콩'],
  MO: ['澳门', '澳門', 'Macau', 'マカオ', '마카오'],
  TW: ['台湾', '台灣', 'Taiwan', '台湾', '대만'],
  SG: ['新加坡', '新加坡', 'Singapore', 'シンガポール', '싱가포르'],
  TH: ['泰国', '泰國', 'Thailand', 'タイ', '태국'],
  MY: ['马来西亚', '馬來西亞', 'Malaysia', 'マレーシア', '말레이시아'],
  PH: ['菲律宾', '菲律賓', 'Philippines', 'フィリピン', '필리핀'],
  ID: ['印度尼西亚', '印尼', 'Indonesia', 'インドネシア', '인도네시아'],
  US: ['美国', '美國', 'USA', 'アメリカ', '미국'],
  CA: ['加拿大', '加拿大', 'Canada', 'カナダ', '캐나다'],
  GB: ['英国', '英國', 'UK', 'イギリス', '영국'],
  FR: ['法国', '法國', 'France', 'フランス', '프랑스'],
  NL: ['荷兰', '荷蘭', 'Netherlands', 'オランダ', '네덜란드'],
  DE: ['德国', '德國', 'Germany', 'ドイツ', '독일'],
  IT: ['意大利', '義大利', 'Italy', 'イタリア', '이탈리아'],
  ES: ['西班牙', '西班牙', 'Spain', 'スペイン', '스페인'],
  SE: ['瑞典', '瑞典', 'Sweden', 'スウェーデン', '스웨덴'],
  DK: ['丹麦', '丹麥', 'Denmark', 'デンマーク', '덴마크'],
  AU: ['澳大利亚', '澳洲', 'Australia', 'オーストラリア', '호주'],
  NZ: ['新西兰', '紐西蘭', 'New Zealand', 'ニュージーランド', '뉴질랜드'],
};

export function t(key: string, lang: Lang = 'zh-CN'): string {
  const row = ui[key] ?? regionI18n[key];
  return row ? row[LANGS.indexOf(lang)] : key;
}
