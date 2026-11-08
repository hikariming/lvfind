# 音乐节 / 拼盘 / 颁奖礼巡检清单（festivals）

这类活动通常由多位艺人出演，适合作为独立条目录入（`tour_name` = 活动名，艺人字段可用拼盘名或逐个艺人拆条）。
重点：对出境旅行者，这些是"赶得上就值得去"的高密度演出。

| 活动 | 惯常时间 | 城市 | 类型 | 官网 | 备注 |
| --- | --- | --- | --- | --- | --- |
| Summer Sonic | 8 月中 | 东京 + 大阪 | 音乐节 | summersonic.com | J-pop + 国际艺人，K-pop 常客 |
| Fuji Rock Festival | 7 月末 | 新潟·苗场 | 音乐节 | fujirockfestival.com | 山地户外，需住宿规划 |
| ROCK IN JAPAN | 8 月 | 茨城·常陆那珂 | 音乐节 | rijfes.jp | 全 J-pop 阵容 |
| COUNTDOWN JAPAN | 12/28–31 | 千叶·幕张 | 跨年音乐节 | countdownjapan.jp | 跨年旅行强相关 |
| Waterbomb | 6–8 月 | 首尔/东京/大阪/曼谷/香港等 | 音乐节 | waterbombfestival.com | K-pop 主打，巡回多城 |
| Weverse Con Festival | 6 月 | 仁川 Inspire | 拼盘 | weverse.io | HYBE 全家桶 |
| KCON | 多站（5月日本/8月LA等） | 东京/LA/香港等 | 拼盘+展会 | kconofficial.com | |
| MAMA Awards | 11–12 月 | 亚洲轮换 | 颁奖礼 | mamaawards.com | 近年香港/日本轮换 |
| Golden Disc Awards | 1 月 | 亚洲轮换 | 颁奖礼 | goldendisc.co.kr | |
| Asia Artist Awards | 12 月 | 亚洲轮换 | 颁奖礼 | asiaartistawards.com | |
| SBS Gayo Daejeon | 12 月 | 韩国（近年仁川/地方轮换） | 年末歌谣祭 | sbs.co.kr | 票极难 |
| KBS Song Festival | 12 月 | 首尔 | 年末歌谣祭 | kbs.co.kr | |
| MBC Music Festival | 12/31 | 首尔 | 年末歌谣祭 | mbc.co.kr | |
| Seoul Music Awards | 1 月 | 首尔 | 颁奖礼 | seoulmusicawards.com | |
| Music Bank Global Festival | 12 月 | 轮换（近年福冈/东京） | 拼盘 | kbs.co.kr | |
| Big Mountain Music Festival | 12 月 | 泰国·考艾 | 音乐节 | bigmountainmusicfestival.com | |
| Clockenflap | 11–12 月 | 香港·中环海滨 | 音乐节 | clockenflap.com | 国际+港台+日韩 |
| STRAYCITY | TBA | 拉美多站 | 拼盘（Stray Kids 主导） | — | 2026/9 起，关注官宣 |

## 扫描规则

1. 每次巡检时：查官网当年/下一年日程与阵容页，若有名单页则提取参演 K-pop / J-pop 艺人。
2. 录入方式：每个活动一条 event，`venue` 对应场馆（户外场地也建 venue 条目，type=stadium 或 hall）；`artist` 用拼盘名建伪艺人条目（如 slug=`summer-sonic`）或按阵容逐个艺人录入多条。
3. 颁奖礼以"地点已公布 + 阵容/售票状态"为录入门槛，没有举办地的传闻不录。
