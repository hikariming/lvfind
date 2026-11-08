# 艺人巡检清单（artists）

Agent 按此表逐个查官方公告：`sources` 为首要核对入口（官方站 > Weverse/FC > 经纪公司 SNS > 票务平台）。
`status`：watching = 持续关注；idle = 短期无动态可低频扫描。

## K-pop

| slug | 名称 | 社 | sources | status | 备注（最近动态） |
| --- | --- | --- | --- | --- | --- |
| ive | IVE 아이브 | Starship | https://ive-official.jp/ · https://www.starship-ent.com/ · https://diveintoive.live/ | watching | SHOW WHAT I AM 巡演已基本结束；关注安可/新巡演公告 |
| seventeen | SEVENTEEN 세븐틴 | Pledis (HYBE) | https://weverse.io/seventeen/notices · https://www.pledis.co.kr/ | watching | 团体活动暂歇（入伍期）；关注回归预告 |
| jxj | JxJ (SEVENTEEN 净汉×Joshua) | Pledis | https://weverse.io/seventeen/notices | watching | Journey Into [Dreaming]：11/21 西武→12/11 澳门→1/9 台北→1/30 釜山→2/20 香港 |
| aespa | aespa 에스파 | SM | https://weverse.io/aespa/notices · https://aespaworldtour.com/ | watching | SYNK:COMPLæXITY 欧巡 1/14–2/2；关注亚洲安可 |
| stray-kids | Stray Kids 스트레이 키즈 | JYP | https://straykids.jype.com/ · https://straykidsworldtour.com/ | watching | RUN IT 巡演已官宣，完整日程 TBA——**高频扫描** |
| le-sserafim | LE SSERAFIM 르세라핌 | Source (HYBE) | https://sourcemusic.com/artist/tour/LE%20SSERAFIM/17 · https://weverse.io/lesserafim/notices | watching | PUREFLOW 亚洲段进行中，欧美段 TBA |
| twice | TWICE 트와이스 | JYP | https://twice.jype.com/notices · https://twice.jype.com/ | watching | THIS IS FOR 已收官；关注第 7 次巡演公告 |
| enhypen | ENHYPEN 엔하이픈 | BELIFT (HYBE) | https://www.enhypenbloodsaga.com/ · https://weverse.io/enhypen/notices | watching | BLOOD SAGA 欧巡 2027/2/24–3/9 |
| illit | ILLIT 아일릿 | BELIFT (HYBE) | https://weverse.io/illit/notices | watching | 暂无已公布场次 |
| babymonster | BABYMONSTER 베이비몬스터 | YG | https://yg-babymonster.com/concert/worldtourchoom/ · https://weverse.io/babymonster/notices | watching | CHOOM 巡演进行中；欧美段 TBA |

## J-pop

| slug | 名称 | 社 | sources | status | 备注 |
| --- | --- | --- | --- | --- | --- |
| yoasobi | YOASOBI ヨアソビ | — | https://www.yoasobi-music.jp/live/ · https://www.yoasobi-music.jp/news/ | watching | SUPER PLANET 亚洲 10 城进行中（台北/新加坡 2027 年初） |
| ado | Ado アド | Cloud Nine / Universal | https://www.universal-music.co.jp/ado/ · https://www.universal-music.co.jp/ado/live/ | watching | 歌ってみたツアー 2027：有明/大阪/名古屋 |
| mrs-green-apple | Mrs. GREEN APPLE | — | https://mrsgreenapple.com/ | watching | |
| official-hige-dandism | Official髭男dism | — | https://higedan.com/ | watching | |
| kenshi-yonezu | 米津玄師 | — | https://reissuerecords.net/ | watching | |
| king-gnu | King Gnu | — | https://kinggnu.jp/ | watching | |
| babymetal | BABYMETAL | Amuse | https://www.babymetal.com/ | watching | |
| aimer | Aimer | — | https://www.aimer-web.jp/ | watching | |

## 扫描规则

1. 对每位艺人：查 sources 中的官方页面，提取未来 90 天内的场次（日期/时间/城市/场馆/票务状态/来源 URL）。
2. 发现**新巡演公布、加场、取消、改期、开售日期** → 输出为变更事件，附 source_url。
3. 名单扩列：K-pop / J-pop 其他主流艺人要加就在本表补一行（slug 用英文小写连字符）。
