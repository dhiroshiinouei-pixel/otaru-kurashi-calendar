// Official facility/organizer notices checked on 2026-10-13. Dates are inclusive.
const langs = ['en', 'zh-Hant', 'zh-Hans', 'ko'];
const loc = (...values) => Object.fromEntries(['ja', ...langs].map((lang, i) => [lang, values[i]]));
const free = loc('無料', 'Free', '免費', '免费', '무료');
const noBooking = loc('予約不要', 'No reservation required', '無需預約', '无需预约', '예약 불필요');
const admissionOnly = loc('別途入館料が必要', 'Museum admission required', '須另付入館費', '需另付门票', '별도 입장료 필요');
const yusen = '旧日本郵船株式会社小樽支店';
const yusenVenues = ['Former Nippon Yusen Otaru Branch', '舊日本郵船小樽支店', '旧日本邮船小樽支店', '구 일본유센 오타루 지점'];
const wingVenues = ['Wing Bay Otaru', 'Wing Bay Otaru', 'Wing Bay Otaru', '윙베이 오타루'];
const artVenues = ['Otaru Art Base Ukiyo-e Museum', '小樽藝術村浮世繪美術館', '小樽艺术村浮世绘美术馆', '오타루 예술촌 우키요에 미술관'];
const montVenues = ['Ura-Otaru Montparnasse (裏小樽モンパルナス)', '裏小樽モンパルナス', '裏小樽モンパルナス', '우라오타루 몽파르나스 (裏小樽モンパルナス)'];
function event({ names, summaries, venues, times, ...item }) {
  return {
    category: 'event', end: item.start, sourceCheckedAt: '2026-10-13', updatedAt: '2026-10-13', ...item,
    ...(times ? { timeTranslations: loc(item.time, ...times) } : {}),
    translations: Object.fromEntries(langs.map((lang, i) => [lang, {
      name: names[i], summary: summaries[i], description: summaries[i],
      venueName: venues[i], time: times?.[i] || `${item.time} JST`,
    }])),
  };
}
const yusenBase = { place: yusen, address: '北海道小樽市色内3丁目7-8', mapQuery: '旧日本郵船株式会社小樽支店 小樽市色内3丁目7-8', source: yusen, venues: yusenVenues };
const artUrl = 'https://www.nitorihd.co.jp/otaru-art-base/information/%E3%80%90%E9%96%8B%E5%82%AC%E5%91%8A%E7%9F%A5%E3%80%91%E4%BC%81%E7%94%BB%E5%B1%95%E3%80%8C%E6%B1%9F%E6%88%B8%E3%81%8B%E3%82%89%E4%BA%AC%E3%81%B8-%E4%B8%AD%E5%B1%B1%E9%81%93%E3%81%AE%E6%97%85%E3%80%8D/';
const artBase = { place: '小樽芸術村 浮世絵美術館', address: '北海道小樽市港町5-4', mapQuery: '小樽芸術村 浮世絵美術館', source: '小樽芸術村', url: artUrl, venues: artVenues };
const wingBase = { source: 'ウイングベイ小樽', address: '北海道小樽市築港11', mapQuery: 'ウイングベイ小樽', venues: wingVenues };
const montBase = { place: '裏小樽モンパルナス', address: '北海道小樽市稲穂4丁目3-9', mapQuery: '裏小樽モンパルナス 小樽市稲穂4丁目3-9', source: '小樽観光協会（裏小樽モンパルナスの告知）', venues: montVenues };

const events = [
  event({
    ...wingBase, id: 'otaru-wakuwaku-market-20261004', title: '小樽わくわくマーケット', start: '2026-10-04', end: '2026-10-16', excludedDates: ['2026-10-10', '2026-10-11', '2026-10-12'],
    time: '10:00〜17:00', startTime: '10:00', endTime: '17:00', place: 'ウイングベイ小樽5番街3階 ヲタル座SHOP（namco向かい）', price: free,
    summary: 'フリーマーケットとハンドメイド品の販売。10月10〜12日は休み。入場無料で、商品状況により早めに終了する場合があります。', url: 'https://wingbay-otaru.co.jp/wingbay-ishikawa-2/',
    names: ['Otaru Wakuwaku Market', '小樽 Wakuwaku 市集', '小樽 Wakuwaku 市集', '오타루 와쿠와쿠 마켓'],
    summaries: ['Flea-market and handmade goods at Otaru-za SHOP, Building 5, 3F, opposite namco. Closed October 10–12. Free admission; may close early depending on stock.', '5號館3樓ヲタル座SHOP（namco對面）的二手與手作市集。10月10–12日休息，免費入場，可能因商品售罄提早結束。', '5号馆3楼ヲタル座SHOP（namco对面）的二手及手作市集。10月10–12日休息，免费入场，可能因商品售罄提前结束。', '5번관 3층 ヲタル座SHOP(namco 맞은편)의 벼룩시장·수공예 판매. 10월 10~12일 휴무이며 입장은 무료입니다. 상품 상황에 따라 일찍 종료할 수 있습니다.'],
  }),
  event({
    ...wingBase, id: 'otaru-fisheries-school-canned-food-20261017', title: '水産高校缶詰販売', start: '2026-10-17', time: '10:00〜・13:00〜（各回なくなり次第終了）', place: 'ウイングベイ小樽5番街2階 喜久屋書店前',
    summary: '水産高校の缶詰を販売する催し。午前10時と午後1時からの2回で、各回売り切れ次第終了します。', url: 'https://wingbay-otaru.co.jp/wingbay-tanaporn-1/',
    names: ['Fisheries High School Canned-Food Sale', '水產高中罐頭販售', '水产高中罐头销售', '수산고등학교 통조림 판매'],
    summaries: ['Canned foods from a fisheries high school, outside Kikuniya Bookstore, Building 5, 2F. Sales start at 10:00 and 13:00; each session ends when sold out.', '在5號館2樓喜久屋書店前販售水產高中罐頭。10:00及13:00各一場，售完即止。', '在5号馆2楼喜久屋书店前销售水产高中罐头。10:00和13:00各一场，售完即止。', '5번관 2층 기쿠야 서점 앞에서 수산고등학교 통조림을 판매합니다. 10:00와 13:00에 시작하며 각 회차 매진 시 종료합니다.'],
    times: ['10:00 and 13:00 JST; until sold out', '10:00、13:00起，售完即止', '10:00、13:00起，售完即止', '10:00·13:00 시작, 소진 시 종료'],
  }),
  ...[
    ['2026-10-17', 'おたるワークステーション・mini', '13:30', '16:30', '小学1・2年生と保護者', '1,000円', ['Otaru Workstation Mini', 'Otaru Workstation Mini 兒童職業體驗', 'Otaru Workstation Mini 儿童职业体验', '오타루 워크스테이션 미니'], ['Career experiences for primary-school grades 1–2 with a guardian. Application period has ended. Fee ¥1,000; 86 places by lottery.', '小學1、2年級與家長一起參加的職業體驗。已截止申請，費用1,000日圓，抽籤86名。', '小学1、2年级与家长一起参加的职业体验。申请已截止，费用1,000日元，抽签86名。', '초등학교 1~2학년과 보호자 대상 직업 체험. 신청이 마감되었습니다. 참가비 1,000엔, 추첨 정원 86명.']],
    ['2026-10-18', '第18回おたるワークステーション', '10:00', '15:00', '小学3〜6年生', '2,000円', ['18th Otaru Workstation', '第18屆 Otaru Workstation 兒童職業體驗', '第18届 Otaru Workstation 儿童职业体验', '제18회 오타루 워크스테이션'], ['Career experiences for primary-school grades 3–6. Application period has ended. Fee ¥2,000; 250 places by lottery.', '小學3至6年級的職業體驗活動。已截止申請，費用2,000日圓，抽籤250名。', '小学3至6年级的职业体验活动。申请已截止，费用2,000日元，抽签250名。', '초등학교 3~6학년 대상 직업 체험. 신청이 마감되었습니다. 참가비 2,000엔, 추첨 정원 250명.']],
  ].map(([date, title, startTime, endTime, audience, fee, names, summaries]) => event({
    ...wingBase, id: `otaru-workstation-${date.replaceAll('-', '')}`, title, category: 'child', start: date, startTime, endTime, time: `${startTime}〜${endTime}`,
    place: 'ウイングベイ小樽5番街1階 ネイチャーチャンバー・済生会ビレッジ', summary: `${audience}向けの子ども職業体験。事前応募制で申込受付は終了しています。参加費${fee}。`,
    url: 'https://wingbay-otaru.co.jp/wingbay-kawamura-5/', reservationRequired: true, reservationStatus: 'closed', reservation: loc('申込受付終了', 'Applications closed', '申請已截止', '申请已截止', '신청 마감'), names, summaries,
  })),
  event({
    ...wingBase, id: 'otaru-kids-terrace-autumn-festival-20261031', title: 'きっずてらす秋祭り', category: 'child', start: '2026-10-31', time: '10:30〜15:00', startTime: '10:30', endTime: '15:00',
    place: 'ウイングベイ小樽5番街1階 きっずてらす Alku・Grow前', summary: '子どもたちのゲームやくじ、綿あめ作り、手作り品販売などを楽しめる秋祭り。チケットは当日受付で1セット300円です。', url: 'https://wingbay-otaru.co.jp/wingbay-kawamura-3/',
    price: loc('チケット1セット300円', '¥300 per ticket set', '每組活動票300日圓', '每组活动票300日元', '티켓 1세트 300엔'),
    names: ['Kids Terrace Autumn Festival', 'Kids Terrace 秋日祭典', 'Kids Terrace 秋日庆典', '키즈테라스 가을 축제'],
    summaries: ['Family games, a lucky draw, cotton-candy making and handmade goods outside Kids Terrace Alku/Grow, Building 5, 1F. Ticket sets cost ¥300 at reception.', '在5號館1樓Kids Terrace Alku/Grow前體驗遊戲、抽獎、製作棉花糖與手作販售。活動票每組300日圓，現場購買。', '在5号馆1楼Kids Terrace Alku/Grow前体验游戏、抽奖、制作棉花糖和手作销售。活动票每组300日元，现场购买。', '5번관 1층 키즈테라스 Alku/Grow 앞에서 게임·뽑기·솜사탕 만들기·수공예 판매를 즐깁니다. 현장 접수처에서 티켓 1세트 300엔.'],
  }),
  event({
    ...artBase, id: 'otaru-art-base-nakasendo-20261024', title: '企画展「江戸から京へ 中山道の旅」', start: '2026-10-24', end: '2026-12-06', excludedDates: ['2026-10-28', '2026-11-04', '2026-11-11', '2026-11-18', '2026-11-25', '2026-12-02'],
    time: '10月9:30〜17:00／11月以降10:00〜17:00（最終入館16:30）', summary: '渓斎英泉と歌川広重の「木曽海道六拾九次之内」を通じて中山道の風景を紹介。水曜休館。一般1,400円、大学生1,000円、高校生800円、中学生600円、小学生400円。',
    names: ['From Edo to Kyoto: Nakasendo in Ukiyo-e Prints', '從江戶到京都：中山道浮世繪之旅', '从江户到京都：中山道浮世绘之旅', '에도에서 교토로: 나카센도 우키요에 여행'],
    summaries: ['Landscape prints of the Nakasendo route by 渓斎英泉 and 歌川広重. Closed Wednesdays. Admission: adults ¥1,400; university ¥1,000; high school ¥800; junior high ¥600; primary school ¥400.', '以渓斎英泉與歌川広重的版畫介紹中山道風景。週三休館。一般1,400日圓、大學生1,000、高中生800、國中生600、小學生400。', '通过渓斎英泉与歌川広重的版画介绍中山道风景。周三闭馆。成人1,400日元、大学生1,000、高中生800、初中生600、小学生400。', '渓斎英泉와 歌川広重의 판화로 나카센도 풍경을 소개합니다. 수요일 휴관. 일반 1,400엔, 대학생 1,000엔, 고등학생 800엔, 중학생 600엔, 초등학생 400엔.'],
    times: ['October 09:30–17:00; November onward 10:00–17:00 JST (last entry 16:30)', '10月09:30–17:00；11月起10:00–17:00，最後入館16:30', '10月09:30–17:00；11月起10:00–17:00，最后入馆16:30', '10월 09:30~17:00, 11월부터 10:00~17:00(입장 마감 16:30)'],
  }),
  ...['2026-11-07', '2026-11-23'].map(start => event({
    ...artBase, id: `otaru-art-base-nakasendo-talk-${start.replaceAll('-', '')}`, title: '「江戸から京へ 中山道の旅」ギャラリートーク', start, time: '14:00〜（約30分）', startTime: '14:00',
    summary: '浮世絵美術館2階企画展示室入口に集合する作品解説。先着10人、予約不要。参加無料ですが美術館の入館券が必要です。', price: admissionOnly, reservation: noBooking, reservationRequired: false,
    names: ['Nakasendo Exhibition Gallery Talk', '中山道浮世繪展作品導覽', '中山道浮世绘展作品导览', '나카센도 전시 갤러리 토크'],
    summaries: ['Meet at the 2F special exhibition entrance for a 30-minute talk. First 10 visitors; no reservation. Museum admission is required.', '在2樓企畫展入口集合，導覽約30分鐘。限前10人，無需預約，須持美術館入館券。', '在2楼企划展入口集合，导览约30分钟。限前10人，无需预约，须持美术馆门票。', '2층 기획전 입구에서 모여 약 30분간 작품 해설을 듣습니다. 선착순 10명, 예약 불필요, 미술관 입장권 필요.'], times: ['14:00 JST (about 30 minutes)', '14:00起，約30分鐘', '14:00起，约30分钟', '14:00 시작, 약 30분'],
  })),
  event({
    id: 'otaru-hikari-marche-20261108', title: '第3回Hikariまるしぇ', start: '2026-11-08', time: '11:00〜16:00', startTime: '11:00', endTime: '16:00', place: '曹洞宗 徳源寺', address: '北海道小樽市塩谷2丁目25-1', mapQuery: '徳源寺 小樽市塩谷2丁目25-1',
    summary: '徳源寺でキッチンカー、菓子・雑貨・陶器の販売や座禅体験などを楽しむ催し。国道5号側の正門から入場し、公共交通機関の利用が案内されています。', source: '小樽観光協会（徳源寺の告知）', url: 'https://otaru.gr.jp/event/otera-de-marche2026hikari',
    names: ['3rd Hikari Marche at Tokugenji Temple', '第3屆 Hikari 寺院市集', '第3届 Hikari 寺院市集', '제3회 히카리 마르셰'], venues: ['Tokugenji Temple (徳源寺)', '德源寺（徳源寺）', '德源寺（徳源寺）', '도쿠겐지 사찰 (徳源寺)'],
    summaries: ['Food trucks, sweets, crafts, ceramics and zazen meditation experiences at Tokugenji Temple. Enter through the main gate facing Route 5; public transport is encouraged.', '德源寺內有餐車、甜點、雜貨、陶器與坐禪體驗。請從國道5號側正門入場，主辦方建議搭乘大眾運輸。', '德源寺内有餐车、甜点、杂货、陶器及坐禅体验。请从国道5号侧正门入场，主办方建议乘坐公共交通。', '사찰에서 푸드트럭·과자·잡화·도자기·좌선 체험을 즐기는 행사입니다. 국도 5호선 쪽 정문으로 입장하며 대중교통 이용을 권장합니다.'],
  }),
  event({
    ...yusenBase, id: 'otaru-yusen-christmas-wreath-20261121', title: 'クリスマスリース作りワークショップ', start: '2026-11-21', time: '14:00〜15:00', startTime: '14:00', endTime: '15:00',
    summary: '旧日本郵船小樽支店2階食堂でクリスマスリースを作る講座。定員10人（同伴者を除く）、材料込み4,400円と別途入館料。申込締切は10月31日12:00です。',
    url: 'https://kyu-nippon-yusen-otaru.jp/archives/event/%E3%80%9011%E6%9C%8821%E6%97%A5%EF%BC%88%E5%9C%9F%EF%BC%89%E9%96%8B%E5%82%AC%E3%80%91%E3%82%AF%E3%83%AA%E3%82%B9%E3%83%9E%E3%82%B9%E3%83%AA%E3%83%BC%E3%82%B9%E4%BD%9C%E3%82%8A%E3%83%AF%E3%83%BC', reservationRequired: true,
    names: ['Christmas Wreath Workshop', '聖誕花圈工作坊', '圣诞花环工作坊', '크리스마스 리스 만들기'],
    summaries: ['Make a Christmas wreath in the 2F dining room. Capacity 10 excluding companions. ¥4,400 including materials, plus museum admission. Book by October 31, noon JST.', '在2樓食堂製作聖誕花圈。限10人（陪同者不計），材料費含在4,400日圓內，另付入館費。10月31日12:00截止預約。', '在2楼食堂制作圣诞花环。限10人（陪同者不计），4,400日元含材料，另付门票。10月31日12:00截止预约。', '2층 식당에서 크리스마스 리스를 만듭니다. 동반자 제외 10명, 재료비 포함 4,400엔에 별도 입장료. 10월 31일 정오까지 예약.'],
  }),
  event({
    ...yusenBase, id: 'otaru-yusen-foil-workshop-20261122', title: '金唐革紙箔押し体験会', start: '2026-11-22', time: '14:00〜15:30', startTime: '14:00', endTime: '15:30',
    summary: '伝統的な装飾壁紙・金唐革紙の版木を使って箔押しを体験。予約不要で、参加費は入館料のみです。', price: admissionOnly, reservation: noBooking, reservationRequired: false,
    url: 'https://kyu-nippon-yusen-otaru.jp/archives/event/%E3%80%9011%E6%9C%8822%E6%97%A5%EF%BC%88%E6%97%A5%EF%BC%89%E9%96%8B%E5%82%AC%E3%80%91%E9%87%91%E5%94%90%E9%9D%A9%E7%B4%99%E7%AE%94%E6%8A%BC%E3%81%97%E4%BD%93%E9%A8%93%E4%BC%9A',
    names: ['Kinkarakawagami Foil-Stamping Workshop', '金唐革紙箔印體驗', '金唐革纸箔印体验', '긴카라카와가미 금박 체험'],
    summaries: ['Try foil stamping with a carved block used for traditional Japanese decorative wallpaper. No reservation; museum admission only.', '用傳統日本裝飾壁紙金唐革紙的雕版體驗箔印。無需預約，只需付入館費。', '用传统日本装饰壁纸金唐革纸的雕版体验金箔压印。无需预约，只需付门票。', '일본 전통 장식 벽지의 목판으로 금박 찍기를 체험합니다. 예약 불필요, 입장료만 필요합니다.'],
  }),
  event({
    ...yusenBase, id: 'otaru-yusen-curator-tour-20261122', title: '岩佐香菜子氏による旧日本郵船小樽支店解説会', start: '2026-11-22', time: '13:00〜13:45', startTime: '13:00', endTime: '13:45',
    summary: '学芸員の岩佐香菜子さんが歴史的建物を解説する催し。定員20人、予約不要、参加費は入館料のみです。', price: admissionOnly, reservation: noBooking, reservationRequired: false,
    url: 'https://kyu-nippon-yusen-otaru.jp/archives/event/%E3%80%9011%E6%9C%8822%E6%97%A5%EF%BC%88%E6%97%A5%EF%BC%89%E9%96%8B%E5%82%AC%E3%80%91%E5%AD%A6%E8%8A%B8%E5%93%A1-%E5%B2%A9%E4%BD%90-%E9%A6%99%E8%8F%9C%E5%AD%90%E6%B0%8F%E3%81%AB%E3%82%88%E3%82%8B',
    names: ['Curator Tour: Former Nippon Yusen Otaru Branch', '舊日本郵船小樽支店學藝員導覽', '旧日本邮船小樽支店学艺员导览', '구 일본유센 오타루 지점 학예사 해설'],
    summaries: ['Curator 岩佐香菜子 explains the historic building. Capacity 20; no reservation. Museum admission only.', '學藝員岩佐香菜子介紹歷史建築。限20人，無需預約，只需付入館費。', '学艺员岩佐香菜子介绍历史建筑。限20人，无需预约，只需付门票。', '학예사 岩佐香菜子가 역사적 건물을 해설합니다. 정원 20명, 예약 불필요, 입장료만 필요합니다.'],
  }),
  event({
    ...yusenBase, id: 'otaru-yusen-special-live-20261129', title: '高橋麻衣子 with 按田佳央理 スペシャルライブ', start: '2026-11-29', time: '14:00〜14:40', startTime: '14:00', endTime: '14:40',
    summary: '旧日本郵船小樽支店1階営業室で開催するライブ。予約不要で、参加費は入館料のみです。', price: admissionOnly, reservation: noBooking, reservationRequired: false,
    url: 'https://kyu-nippon-yusen-otaru.jp/archives/event/%E3%80%9011%E6%9C%8829%E6%97%A5%EF%BC%88%E6%97%A5%EF%BC%89-%E9%96%8B%E5%82%AC%E3%80%91%E9%AB%98%E6%A9%8B%E9%BA%BB%E8%A1%A3%E5%AD%90-with-%E6%8C%89%E7%94%B0%E4%BD%B3%E5%A4%AE%E7%90%86-%E3%82%B9',
    names: ['高橋麻衣子 with 按田佳央理: Special Live', '高橋麻衣子 with 按田佳央理 特別音樂會', '高橋麻衣子 with 按田佳央理 特别音乐会', '高橋麻衣子 with 按田佳央理 스페셜 라이브'],
    summaries: ['A live performance in the historic building’s ground-floor business hall. No reservation; museum admission only.', '在歷史建築1樓營業室舉辦的音樂演出。無需預約，只需付入館費。', '在历史建筑1楼营业室举办的音乐演出。无需预约，只需付门票。', '역사적 건물 1층 영업실에서 열리는 라이브 공연. 예약 불필요, 입장료만 필요합니다.'],
  }),
  event({
    ...yusenBase, id: 'otaru-yusen-shimenawa-20261219', title: 'しめ縄飾りワークショップ', start: '2026-12-19', time: '14:00〜15:00', startTime: '14:00', endTime: '15:00', reservationRequired: true,
    summary: '日本のお正月に飾るしめ縄を2階食堂で制作。定員10人（同伴者を除く）、材料込み4,400円と別途入館料。申込締切は12月18日12:00です。',
    url: 'https://kyu-nippon-yusen-otaru.jp/archives/event/%E3%80%9012%E6%9C%8819%E6%97%A5%EF%BC%88%E5%9C%9F%EF%BC%89%E9%96%8B%E5%82%AC%E3%80%91%E3%81%97%E3%82%81%E7%B8%84%E9%A3%BE%E3%82%8A%E3%83%AF%E3%83%BC%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%83%E3%83%97',
    names: ['Shimenawa New Year Decoration Workshop', '日本新年注連繩裝飾工作坊', '日本新年注连绳装饰工作坊', '일본 새해 시메나와 장식 만들기'],
    summaries: ['Make a traditional Japanese New Year straw-rope decoration in the 2F dining room. Capacity 10 excluding companions. ¥4,400 including materials, plus admission. Book by December 18, noon JST.', '在2樓食堂製作日本新年稻草繩裝飾。限10人（陪同者不計），4,400日圓含材料，另付入館費。12月18日12:00截止預約。', '在2楼食堂制作日本新年稻草绳装饰。限10人（陪同者不计），4,400日元含材料，另付门票。12月18日12:00截止预约。', '2층 식당에서 일본 새해 전통 볏짚 장식을 만듭니다. 동반자 제외 10명, 재료비 포함 4,400엔에 별도 입장료. 12월 18일 정오까지 예약.'],
  }),
  event({
    id: 'otaru-unwind-reflections-on-light-20260901', title: 'Yokoi Haru「光に関する考察」', start: '2026-09-01', end: '2026-11-29', time: '7:00〜24:00', place: 'UNWIND HOTEL & BAR 小樽 1階 UNWIND GALLERY', mapQuery: 'UNWIND HOTEL & BAR 小樽', price: free,
    source: 'UNWIND HOTEL & BAR 小樽（運営会社公式発表）', url: 'https://prtimes.jp/main/html/rd/p/000000528.000007264.html',
    summary: 'Yokoi Haruによるゼンタングル作品をホテル1階ロビーとBar Ignisに展示。宿泊者以外も無料で鑑賞できます。',
    names: ['Yokoi Haru: Reflections on Light', 'Yokoi Haru「關於光的思考」', 'Yokoi Haru「关于光的思考」', 'Yokoi Haru: 빛에 관한 고찰'], venues: ['UNWIND GALLERY, 1F, UNWIND HOTEL & BAR Otaru', 'UNWIND HOTEL & BAR 小樽1樓 UNWIND GALLERY', 'UNWIND HOTEL & BAR 小樽1楼 UNWIND GALLERY', 'UNWIND HOTEL & BAR 오타루 1층 UNWIND GALLERY'],
    summaries: ['Zentangle artworks by Yokoi Haru in the ground-floor lobby and Bar Ignis. Free to view, including for non-hotel guests.', 'Yokoi Haru的禪繞畫在1樓大廳與Bar Ignis展出，非住客也可免費觀賞。', 'Yokoi Haru的禅绕画在1楼大厅及Bar Ignis展出，非住客也可免费参观。', 'Yokoi Haru의 젠탱글 작품을 1층 로비와 Bar Ignis에 전시합니다. 투숙객이 아니어도 무료로 관람할 수 있습니다.'],
  }),
  ...[
    ['2026-10-22', '2026-10-28', 'production', '黒石美奈子展 関連公開制作', '10:00', '17:00', ['Minako Kuroishi: Open Studio', '黒石美奈子展公開創作', '黒石美奈子展公开创作', '구로이시 미나코 전시 공개 제작'], ['Watch the artist’s production process ahead of the exhibition. Confirm admission conditions with the venue.', '展覽前的公開創作，可觀看藝術家的製作過程。入場條件請向會場確認。', '展览前的公开创作，可观看艺术家的制作过程。入场条件请向场馆确认。', '전시 개최 전 작가의 제작 과정을 공개합니다. 입장 조건은 공연장에 확인해 주세요.']],
    ['2026-10-25', '2026-10-25', 'workshop', '黒石美奈子展 銅版画ワークショップ', '13:00', '16:00', ['Minako Kuroishi: Copperplate Print Workshop', '黒石美奈子展銅版畫工作坊', '黒石美奈子展铜版画工作坊', '구로이시 미나코 동판화 워크숍'], ['A copperplate-print workshop linked to the exhibition. Confirm fees and booking requirements with the venue.', '展覽相關銅版畫體驗，費用與預約要求請向會場確認。', '展览相关铜版画体验，费用及预约要求请向场馆确认。', '전시 연계 동판화 워크숍입니다. 참가비와 예약 여부는 행사장에 확인해 주세요.']],
    ['2026-11-01', '2026-11-01', 'talk', '黒石美奈子展 ギャラリートーク', '13:00', '14:00', ['Minako Kuroishi: Gallery Talk', '黒石美奈子展藝術家座談', '黒石美奈子展艺术家座谈', '구로이시 미나코 갤러리 토크'], ['A gallery talk linked to the exhibition. Confirm admission conditions with the venue.', '展覽相關座談，入場條件請向會場確認。', '展览相关座谈，入场条件请向场馆确认。', '전시 연계 갤러리 토크입니다. 입장 조건은 행사장에 확인해 주세요.']],
  ].map(([start, end, suffix, title, startTime, endTime, names, summaries]) => event({
    ...montBase, id: `otaru-minako-kuroishi-${suffix}-${start.replaceAll('-', '')}`, title, start, end, startTime, endTime, time: `${startTime}〜${endTime}`, summary: `${title}。参加条件・料金や予約の要否は会場にご確認ください。`, url: 'https://otaru.gr.jp/fall', names, summaries,
  })),
  event({
    ...montBase, id: 'otaru-kawaguchi-kyogo-20261108', title: '河口恭吾 EXTEND LIVE TOUR 2026 小樽公演', start: '2026-11-08', time: '17:30開場／18:00開演', startTime: '18:00', doorsOpenTime: '17:30',
    summary: '河口恭吾のライブツアー小樽公演。チケット4,000円に加え、別途1ドリンク代が必要です。', url: 'https://otaru.gr.jp/event/kawaguchi-kyogo', registrationUrl: 'https://eplus.jp/sf/detail/0010680001',
    names: ['河口恭吾 EXTEND LIVE TOUR 2026 in Otaru', '河口恭吾 EXTEND LIVE TOUR 2026 小樽公演', '河口恭吾 EXTEND LIVE TOUR 2026 小樽演出', '河口恭吾 EXTEND LIVE TOUR 2026 오타루 공연'],
    summaries: ['An Otaru stop on the singer’s live tour. Ticket ¥4,000, plus a separate drink charge.', '巡演的小樽場，票價4,000日圓，另需支付一杯飲料費。', '巡演的小樽站，票价4,000日元，另需支付一杯饮料费。', '라이브 투어의 오타루 공연입니다. 티켓 4,000엔에 별도 음료 1잔 비용이 필요합니다.'], times: ['Doors 17:30; starts 18:00 JST', '17:30入場／18:00開演', '17:30入场／18:00开演', '17:30 입장／18:00 공연 시작'],
  }),
  event({
    id: 'otaru-boj-gold-mining-scrolls-20261127', title: '砂金を採る風景 — 江戸時代の佐渡金山絵巻より —', start: '2026-11-27', end: '2027-02-23',
    time: '11月9:30〜17:00／12月以降10:00〜17:00（最終入館16:30）', place: '日本銀行旧小樽支店金融資料館 特別展示室', address: '北海道小樽市色内1丁目11-16', mapQuery: '日本銀行旧小樽支店金融資料館', price: free,
    excludedDates: ['2026-12-02', '2026-12-09', '2026-12-16', '2026-12-23', '2026-12-29', '2026-12-30', '2026-12-31', '2027-01-01', '2027-01-02', '2027-01-03', '2027-01-04', '2027-01-05', '2027-01-06', '2027-01-13', '2027-01-20', '2027-01-27', '2027-02-03', '2027-02-10', '2027-02-17'],
    summary: '江戸時代の佐渡金山絵巻や旧小樽支店の砂金買入資料から金の採取を紹介する特別展。水曜日と12月29日〜1月5日は休館。入館無料。', source: '日本銀行旧小樽支店金融資料館', url: 'https://www3.boj.or.jp/otaru-m/data/2026tokubetsu.pdf',
    names: ['Gold Mining in Edo-Period Sado Scrolls', '江戶時代佐渡金山繪卷中的採金風景', '江户时代佐渡金山绘卷中的采金风景', '에도 시대 사도 금광 두루마리 속 사금 채취'], venues: ['Bank of Japan Otaru Museum, Special Exhibition Room', '日本銀行舊小樽支店金融資料館特展室', '日本银行旧小樽支店金融资料馆特展室', '일본은행 구 오타루 지점 금융자료관 특별전시실'],
    summaries: ['Gold mining illustrated in Sado scrolls, alongside gold-purchase records from the former Otaru bank branch. Free admission. Closed Wednesdays and December 29–January 5.', '透過佐渡金山繪卷與舊小樽支店的砂金收購資料介紹採金。免費入館，週三及12月29日至1月5日休館。', '通过佐渡金山绘卷及旧小樽支店的砂金收购资料介绍采金。免费入馆，周三和12月29日至1月5日闭馆。', '사도 금광 두루마리와 구 오타루 지점의 사금 매입 자료를 소개합니다. 무료 입장, 수요일 및 12월 29일~1월 5일 휴관.'],
    times: ['November 09:30–17:00; December onward 10:00–17:00 JST (last entry 16:30)', '11月09:30–17:00；12月起10:00–17:00，最後入館16:30', '11月09:30–17:00；12月起10:00–17:00，最后入馆16:30', '11월 09:30~17:00, 12월부터 10:00~17:00(입장 마감 16:30)'],
  }),
  ...['2026-12-05', '2026-12-12', '2026-12-19', '2027-01-09', '2027-01-16', '2027-01-23'].map(start => event({
    id: `otaru-night-walking-tour-${start.replaceAll('-', '')}`, title: '小樽観光協会 夜のまちなみ散策ガイドツアー', start, time: '16:00受付開始／17:00最終出発（約1時間）',
    place: '小樽国際インフォメーションセンター（受付）', mapQuery: '小樽国際インフォメーションセンター', source: '小樽観光協会', url: 'https://otaru.gr.jp/event/2026-nighttime-city-walking-tour', price: free,
    summary: 'おたる案内人ボランティアガイドと夜の歴史的な街並みを歩く約1時間のツアー。当日受付・先着20人・無料。荒天時は中止です。',
    reservation: loc('当日受付・先着20人', 'On-site registration; first 20 people', '當日現場報名，限前20人', '当天现场报名，限前20人', '당일 현장 접수, 선착순 20명'),
    names: ['Otaru Evening Guided Walk', '小樽夜間街區導覽', '小樽夜间街区导览', '오타루 야간 거리 가이드 투어'], venues: ['Otaru International Information Center (registration)', '小樽國際資訊中心（集合報名）', '小樽国际信息中心（集合报名）', '오타루 국제 인포메이션 센터(접수)'],
    summaries: ['An approximately one-hour walk through Otaru’s historic streets with volunteer guides. Free; register on the day, first 20 people. Cancelled in severe weather.', '由志工導覽小樽歷史街區，約1小時。免費，當日報名，限前20人。惡劣天氣取消。', '由志愿者带领游览小樽历史街区，约1小时。免费，当天报名，限前20人。恶劣天气取消。', '자원봉사 가이드와 역사적인 거리를 약 1시간 걷습니다. 무료, 당일 선착순 20명 접수. 악천후 시 취소됩니다.'],
    times: ['Registration from 16:00; last departure 17:00 JST (about 1 hour)', '16:00開始報名／17:00最後出發，約1小時', '16:00开始报名／17:00最后出发，约1小时', '16:00 접수 시작／17:00 마지막 출발, 약 1시간'],
  })),
];

export default events;
