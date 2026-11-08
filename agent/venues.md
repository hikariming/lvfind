# 场馆巡检清单（venues）

录入演出时若场馆不在本表，先在 `src/data/events.ts` 的 `venues` 里补条目（slug/type/city/country/timezone/lat/lng 必填），再更新本表。
场馆资料（地址/交通/容量）属长期维护数据，`verified_at` 为最近核对时间。

## 日本

| slug | 名称 | 城市 | 类型 | 官网/备注 |
| --- | --- | --- | --- | --- |
| tokyo-dome | Tokyo Dome 東京ドーム | 东京 | dome | tokyo-dome.co.jp |
| saitama-super-arena | さいたまスーパーアリーナ | 埼玉 | arena | saitama-arena.co.jp |
| belluna-dome | ベルーナドーム（西武巨蛋） | 埼玉·所泽 | dome | seibulions.co.jp |
| ariake-arena | 有明アリーナ | 东京 | arena | tokyo-ariake.jp |
| k-arena | Kアリーナ横浜 | 横滨 | arena | k-arena.com |
| kyocera-dome | 京セラドーム大阪 | 大阪 | dome | kyoceradome-osaka.jp |
| vantelin-dome | バンテリンドーム ナゴヤ | 名古屋 | dome | nagoya-dome.co.jp |
| paypay-dome | みずほPayPayドーム福岡 | 福冈 | dome | softbankhawks.co.jp |
| premist-dome | 大和ハウス プレミストドーム | 札幌 | dome | sapporo-dome.co.jp |
| asue-arena-osaka | Asue Arena 大阪（中央体育馆） | 大阪 | arena | 待补官网 |
| port-messe | ポートメッセなごや | 名古屋 | hall | portmesse.com |
| marine-messe | マリンメッセ福岡 | 福冈 | arena | 待补（新增用） |
| pia-arena-mm | ぴあアリーナMM | 横滨 | arena | 待补（新增用） |

## 韩国

| slug | 名称 | 城市 | 类型 | 备注 |
| --- | --- | --- | --- | --- |
| kspo-dome | KSPO DOME | 首尔 | arena | 奥林匹克公园 |
| gocheok | 高尺天空巨蛋 | 首尔 | dome | 地铁1号线九一 |
| inspire-arena | INSPIRE Arena | 仁川 | arena | 仁川机场旁 |
| jamsil | 蚕室综合运动场（室内/主场） | 首尔 | stadium | 待补 |
| bexco | BEXCO | 釜山 | hall | bexco.co.kr |
| incheon-asiad | 仁川亚运主体育场 | 仁川 | stadium | 待补（新增用） |

## 大中华区

| slug | 名称 | 城市 | 类型 | 备注 |
| --- | --- | --- | --- | --- |
| kai-tak | 启德主场馆 | 香港 | stadium | kaitaksportspark.hk |
| asiaworld-arena | 亚洲国际博览馆 Arena | 香港 | arena | asiaworld-expo.com |
| galaxy-arena | 银河综艺馆 | 澳门 | arena | galaxymacau.com |
| venetian-arena | 威尼斯人综艺馆 | 澳门 | arena | venetianmacao.com |
| taipei-dome | 台北大巨蛋 | 台北 | dome | 地铁板南线国父纪念馆 |
| taipei-arena | 台北小巨蛋 | 台北 | arena | |
| ntsu-arena | 林口体育馆（国立体大） | 桃园·林口 | arena | |
| kaohsiung-stadium | 高雄国家体育场 | 高雄 | stadium | |
| mercedes-sh | 梅赛德斯-奔驰文化中心 | 上海 | arena | |
| cadillac-bj | 五棵松体育馆 | 北京 | arena | |
| shenzhen-uni | 深圳大运中心体育场 | 深圳 | stadium | |

## 东南亚

| slug | 名称 | 城市 | 类型 | 备注 |
| --- | --- | --- | --- | --- |
| sg-national | National Stadium | 新加坡 | stadium | sportshub.com.sg |
| sg-indoor | Singapore Indoor Stadium | 新加坡 | arena | sportshub.com.sg |
| apex-expo | APEX @ Singapore EXPO | 新加坡 | hall | |
| impact | IMPACT Arena | 曼谷 | arena | impact.co.th |
| thunderdome | Thunder Dome | 曼谷 | arena | 待补（新增用） |
| axiata | Axiata Arena | 吉隆坡 | arena | axiataarena.com.my |
| unifi-arena | Unifi Arena | 吉隆坡 | arena | KL Sports City |
| moa-arena | SM Mall of Asia Arena | 马尼拉·帕赛 | arena | mallofasia-arena.com |
| philippine-arena | Philippine Arena | 布拉干 | dome | 距马尼拉约1-2h车程 |
| indonesia-arena | Indonesia Arena | 雅加达 | arena | GBK 园区内 |

## 北美

| slug | 名称 | 城市 | 类型 | 备注 |
| --- | --- | --- | --- | --- |
| kia-forum | Kia Forum | 洛杉矶 | arena | |
| msg | Madison Square Garden | 纽约 | arena | |
| intuit-dome | Intuit Dome | 洛杉矶·英格尔伍德 | arena | 待补（新增用） |
| ubs-arena | UBS Arena | 纽约·Elmont | arena | 待补 |
| barclays | Barclays Center | 纽约·布鲁克林 | arena | 待补 |
| tacoma-dome | Tacoma Dome | 塔科马 | dome | 待补 |
| climate-pledge | Climate Pledge Arena | 西雅图 | arena | 待补 |
| oakland-arena | Oakland Arena | 奥克兰 | arena | 待补 |
| rogers-arena | Rogers Arena | 温哥华 | arena | 待补 |
| scotiabank-arena | Scotiabank Arena | 多伦多 | arena | 待补 |
| hollywood-bowl | Hollywood Bowl | 洛杉矶 | stadium | 待补 |
| td-garden | TD Garden | 波士顿 | arena | 待补 |

## 欧洲

| slug | 名称 | 城市 | 类型 | 备注 |
| --- | --- | --- | --- | --- |
| o2 | The O2 | 伦敦 | arena | theo2.co.uk |
| ao-arena | AO Arena | 曼彻斯特 | arena | |
| accor-arena | Accor Arena | 巴黎 | arena | |
| la-defense-arena | Paris La Défense Arena | 巴黎 | dome | |
| ziggo-dome | Ziggo Dome | 阿姆斯特丹 | arena | |
| uber-arena | Uber Arena | 柏林 | arena | |
| unipol-dome | Unipol Dome | 米兰 | arena | |
| palau-sant-jordi | Palau Sant Jordi | 巴塞罗那 | arena | |
| avicii-arena | Avicii Arena | 斯德哥尔摩 | arena | |
| royal-arena | Royal Arena | 哥本哈根 | arena | |
| sportpaleis | Sportpaleis | 安特卫普 | arena | 待补（新增用） |

## 大洋洲

| slug | 名称 | 城市 | 类型 | 备注 |
| --- | --- | --- | --- | --- |
| qudos | Qudos Bank Arena | 悉尼 | arena | |
| afterpay-arena | Afterpay Arena | 悉尼 | arena | 待核对地址 |
| rod-laver | Rod Laver Arena | 墨尔本 | arena | |
| spark-arena | Spark Arena | 奥克兰 | arena | |
