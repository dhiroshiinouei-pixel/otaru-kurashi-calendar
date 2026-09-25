// Official Otaru event notices checked on 2026-09-25 (Asia/Tokyo).
// Dates are inclusive. Repeated but non-consecutive sessions are separate records.
const cityFestival = 'https://www.city.otaru.lg.jp/docs/2026060300018/';
const yusenHalloween = 'https://kyu-nippon-yusen-otaru.jp/archives/event/%E3%80%9010%E6%9C%883%E6%97%A510%E6%97%A511%E6%97%A517%E6%97%A518%E6%97%A524%E6%97%A5-%E9%96%8B%E5%82%AC%E3%80%91%E3%83%8F%E3%83%AD%E3%82%A6%E3%82%A3%E3%83%B3%E5%A4%A7%E4%BD%9C%E6%88%A6%EF%BC%88';
const yusenFoil = 'https://kyu-nippon-yusen-otaru.jp/archives/event/%E3%80%9010%E6%9C%8810%E6%97%A5%EF%BC%88%E5%9C%9F%EF%BC%89%E9%96%8B%E5%82%AC%E3%80%91%E9%87%91%E5%94%90%E9%9D%A9%E7%B4%99%E7%AE%94%E6%8A%BC%E3%81%97%E4%BD%93%E9%A8%93%E4%BC%9A';
const yusenGuide = 'https://kyu-nippon-yusen-otaru.jp/archives/event/%E3%80%9010%E6%9C%8810%E6%97%A5%EF%BC%88%E5%9C%9F%EF%BC%89%E9%96%8B%E5%82%AC%E3%80%91%E5%AD%A6%E8%8A%B8%E5%93%A1-%E5%B2%A9%E4%BD%90-%E9%A6%99%E8%8F%9C%E5%AD%90%E6%B0%8F%E3%81%AB%E3%82%88%E3%82%8B';
const yusenKimono = 'https://kyu-nippon-yusen-otaru.jp/archives/event/%E3%80%9010%E6%9C%8824%E6%97%A525%E6%97%A5%EF%BC%88%E5%9C%9F%E3%83%BB%E6%97%A5%EF%BC%89%E9%96%8B%E5%82%AC%E3%80%91%EF%BC%A0%E3%82%A6%E3%82%B9%E3%82%AD%E5%91%89%E6%9C%8D%E5%BA%97%E3%83%BB%E7%9D%80';
const museum = '市立小樽美術館';
const yusen = '旧日本郵船株式会社小樽支店';

function translations(enName, enSummary, hantName, hantSummary, hansName, hansSummary, koName, koSummary, venue) {
  const values = [
    ['en', enName, enSummary],
    ['zh-Hant', hantName, hantSummary],
    ['zh-Hans', hansName, hansSummary],
    ['ko', koName, koSummary],
  ];
  return Object.fromEntries(values.map(([lang, name, summary]) => [lang, {
    name, summary, description: summary, venueName: venue?.[lang],
  }]));
}

function event(item) {
  return {
    category: 'event',
    end: item.start,
    sourceCheckedAt: '2026-09-25',
    updatedAt: '2026-09-25',
    ...item,
  };
}

const museumVenue = { en: 'Otaru City Museum of Art (市立小樽美術館)', 'zh-Hant': '小樽市立美術館', 'zh-Hans': '小樽市立美术馆', ko: '오타루 시립미술관' };
const yusenVenue = { en: 'Former Nippon Yusen Otaru Branch (旧日本郵船株式会社小樽支店)', 'zh-Hant': '舊日本郵船小樽支店', 'zh-Hans': '旧日本邮船小樽支店', ko: '구 일본유센 오타루 지점' };

function festivalExhibit(id, title, start, end, lastEnd, jaTopic, names, topics, excludedDates = []) {
  const [en, hant, hans, ko] = names;
  const [enTopic, hantTopic, hansTopic, koTopic] = topics;
  return event({
    id, title, start, end, category: 'event',
    time: `10:00〜17:00（最終日は${lastEnd}まで）`,
    place: museum, address: '北海道小樽市色内1丁目9-5', mapQuery: '市立小樽美術館 小樽市色内1丁目9-5',
    summary: `第77回小樽市文化祭の${jaTopic}。市立小樽美術館で開催。最終日は${lastEnd}に終了します。`,
    source: '小樽市教育委員会', organizer: '小樽市文化団体協議会', url: cityFestival,
    price: '入場無料', reservation: '来場予約不要', reservationRequired: false,
    excludedDates,
    translations: translations(
      en, `The 77th Otaru City Cultural Festival presents ${enTopic} at the Otaru City Museum of Art. The final day closes at ${lastEnd} JST.`,
      hant, `第77屆小樽市文化祭在小樽市立美術館展出${hantTopic}。最後一天於${lastEnd}結束。`,
      hans, `第77届小樽市文化节在小樽市立美术馆展出${hansTopic}。最后一天于${lastEnd}结束。`,
      ko, `제77회 오타루시 문화제에서 ${koTopic}를 오타루 시립미술관에 전시합니다. 마지막 날은 ${lastEnd}에 종료합니다.`,
      museumVenue,
    ),
  });
}

const exhibits = [
  festivalExhibit('otaru-culture-art-20261001', '第77回小樽市文化祭 美術市展', '2026-10-01', '2026-10-11', '16:00', '市民美術展', ['Otaru Cultural Festival: City Art Exhibition', '小樽市文化祭：市民美術展', '小樽市文化节：市民美术展', '오타루시 문화제: 시민 미술전'], ['artworks by local artists', '市民美術作品', '市民美术作品', '시민 미술 작품'], ['2026-10-05']),
  festivalExhibit('otaru-culture-calligraphy-20261015', '第77回小樽市文化祭 書道市展', '2026-10-15', '2026-10-18', '15:00', '書道展', ['Otaru Cultural Festival: Calligraphy Exhibition', '小樽市文化祭：書法展', '小樽市文化节：书法展', '오타루시 문화제: 서예전'], ['calligraphy', '書法作品', '书法作品', '서예 작품']),
  festivalExhibit('otaru-culture-youth-20261021', '第77回小樽市文化祭 小樽ユース展', '2026-10-21', '2026-10-25', '15:00', 'ユース作品展', ['Otaru Cultural Festival: Youth Exhibition', '小樽市文化祭：青年作品展', '小樽市文化节：青年作品展', '오타루시 문화제: 청소년 작품전'], ['works by young people', '青年創作作品', '青年创作作品', '청소년 작품']),
  festivalExhibit('otaru-culture-bonsai-20261023', '第77回小樽市文化祭 盆栽展', '2026-10-23', '2026-10-25', '16:00', '盆栽展', ['Otaru Cultural Festival: Bonsai Exhibition', '小樽市文化祭：盆栽展', '小樽市文化节：盆景展', '오타루시 문화제: 분재전'], ['bonsai', '盆栽', '盆景', '분재']),
  festivalExhibit('otaru-culture-photo-20261028', '第77回小樽市文化祭 写真市展', '2026-10-28', '2026-11-01', '16:00', '写真展', ['Otaru Cultural Festival: Photography Exhibition', '小樽市文化祭：攝影展', '小樽市文化节：摄影展', '오타루시 문화제: 사진전'], ['photography', '攝影作品', '摄影作品', '사진 작품']),
  festivalExhibit('otaru-culture-flower-20261030', '第77回小樽市文化祭 合同華展', '2026-10-30', '2026-11-01', '16:00', '生け花展', ['Otaru Cultural Festival: Flower Arrangement Exhibition', '小樽市文化祭：聯合花藝展', '小樽市文化节：联合花艺展', '오타루시 문화제: 합동 꽃꽂이전'], ['flower arrangements', '插花作品', '插花作品', '꽃꽂이 작품']),
  festivalExhibit('otaru-culture-shoyu-20261105', '第77回小樽市文化祭 書遊展', '2026-11-05', '2026-11-08', '16:00', '書遊展', ['Otaru Cultural Festival: Shoyu Calligraphy Exhibition', '小樽市文化祭：書遊展', '小樽市文化节：书游展', '오타루시 문화제: 쇼유 서예전'], ['calligraphy', '書法作品', '书法作品', '서예 작품']),
  festivalExhibit('otaru-culture-pressed-flowers-20261105', '第77回小樽市文化祭 押し花アート展', '2026-11-05', '2026-11-08', '16:00', '押し花アート展', ['Otaru Cultural Festival: Pressed-Flower Art', '小樽市文化祭：押花藝術展', '小樽市文化节：押花艺术展', '오타루시 문화제: 압화 아트전'], ['pressed-flower art', '押花藝術', '押花艺术', '압화 예술 작품']),
];

const yusenDates = [
  ['2026-10-03', '小樽商科大学「OUC BRASS」'],
  ['2026-10-10', '小樽商科大学「グリー＆カンタール」'],
  ['2026-10-11', '小樽市立潮見台中学校音楽部'],
  ['2026-10-17', '小樽市立銭函中学校吹奏楽部'],
  ['2026-10-18', '小樽潮陵高等学校吹奏楽局'],
  ['2026-10-24', '小樽商科大学「AIRS」'],
].map(([date, performer]) => event({
  id: `otaru-yusen-halloween-${date.replaceAll('-', '')}`,
  title: `旧日本郵船小樽支店 ハロウィン大作戦（${Number(date.slice(8))}日）`,
  category: 'child', start: date,
  time: '音楽会11:00・14:00／キッズフェス12:00〜16:00',
  place: yusen, address: '北海道小樽市色内3丁目7-8', mapQuery: '旧日本郵船株式会社小樽支店 小樽市色内3丁目7-8',
  summary: `${performer}の音楽会を11:00と14:00に開催。12:00〜16:00は親子向けの遊びや謎解きも楽しめます。催しは無料ですが入館料が必要です。`,
  source: yusen, organizer: yusen, url: yusenHalloween,
  price: '催し無料・別途入館料が必要', reservation: '公式ページをご確認ください',
  translations: translations(
    'Halloween Music and Kids Festival at the Former Nippon Yusen Otaru Branch', `Concerts by ${performer} at 11:00 AM and 2:00 PM; hands-on family activities from noon to 4:00 PM. Museum admission is required.`,
    '舊日本郵船小樽支店萬聖節音樂會與親子活動', `${performer}於11:00及14:00演出；12:00–16:00有親子遊戲與解謎。活動免費，但須付館舍入場費。`,
    '旧日本邮船小樽支店万圣节音乐会与亲子活动', `${performer}于11:00和14:00演出；12:00–16:00有亲子游戏与解谜。活动免费，但需支付馆舍门票。`,
    '구 일본유센 오타루 지점 할로윈 음악회·어린이 축제', `${performer}의 공연이 11:00와 14:00에 열리고, 12:00~16:00에는 가족 체험 활동이 있습니다. 행사 참가비는 없지만 입장료가 필요합니다.`,
    yusenVenue,
  ),
}));

export default [
  ...exhibits,
  event({
    id: 'otaru-culture-dance-ballet-20261103', title: '第77回小樽市文化祭 Dance&Ballet', start: '2026-11-03',
    time: '14:30開場／15:00〜17:00予定', startTime: '15:00', endTime: '17:00', doorsOpenTime: '14:30',
    place: '小樽市民会館', address: '北海道小樽市花園5丁目3-1', mapQuery: '小樽市民会館 小樽市花園5丁目3-1',
    summary: '第77回小樽市文化祭のダンス・バレエ公演。直江博子創作バレエ研究所と小林久枝バレエスタジオが出演します。',
    source: '小樽市教育委員会', organizer: '小樽市文化団体協議会', url: cityFestival, price: '入場無料',
    translations: translations('Otaru Cultural Festival: Dance & Ballet', 'A dance and ballet performance by two local studios at Otaru Civic Hall.', '小樽市文化祭：舞蹈與芭蕾', '兩所當地舞蹈團體在小樽市民會館演出。', '小樽市文化节：舞蹈与芭蕾', '两个当地舞蹈团体在小樽市民会馆演出。', '오타루시 문화제: 댄스·발레', '오타루 시민회관에서 지역 발레 스튜디오 두 곳이 공연합니다.'),
  }),
  event({
    id: 'otaru-culture-japanese-performance-20261103', title: '第77回小樽市文化祭 和の響き', start: '2026-11-03',
    time: '10:30開場／11:00〜13:30予定', startTime: '11:00', endTime: '13:30', doorsOpenTime: '10:30',
    place: '小樽市民センター（マリンホール）', address: '北海道小樽市色内2丁目13-5', mapQuery: '小樽市民センター マリンホール',
    summary: '第77回小樽市文化祭の民謡・詩吟・越後踊りの舞台です。',
    source: '小樽市教育委員会', organizer: '小樽市文化団体協議会', url: cityFestival, price: '入場無料',
    translations: translations('Otaru Cultural Festival: Japanese Music and Dance', 'A stage programme of Japanese folk songs, poetry chanting and Echigo dance at Marine Hall.', '小樽市文化祭：和之響', '在海洋廳演出日本民謠、吟詩與越後舞。', '小樽市文化节：和之响', '在海洋厅演出日本民谣、吟诗与越后舞。', '오타루시 문화제: 일본 전통 공연', '마린홀에서 일본 민요·시긴·에치고 춤을 선보입니다.'),
  }),
  event({
    id: 'zenibako-kids-lab-20261003', title: 'ぜにばこキッズラボ 親子ものづくり体験', category: 'child', start: '2026-10-03',
    time: '10:00〜15:00', startTime: '10:00', endTime: '15:00', place: '株式会社新宮商行 銭函工場内 特設会場', mapQuery: '新宮商行 銭函工場 小樽',
    summary: '銭函の企業による9つのものづくり体験ブース、スタンプラリー、科学実験など。対象は小学生と保護者。一部体験は要予約です。',
    source: '小樽市', organizer: '小樽市銭函工業協同組合50周年記念事業実行委員会', url: 'https://www.city.otaru.lg.jp/docs/2026091100021/',
    audience: '小学生と保護者', reservation: '高所作業車体験は要予約。その他の企画も公式ページをご確認ください。',
    translations: translations('Zenibako Kids Lab: Family Maker Activities', 'Elementary-school children and parents can try hands-on making, science activities and a stamp rally. Some activities require reservations.', '銭函兒童實驗室：親子製作體驗', '小學生與家長可參加手作、科學實驗與集章活動。部分體驗需預約。', '钱函儿童实验室：亲子制作体验', '小学生与家长可参加动手制作、科学实验和集章活动。部分体验需预约。', '제니바코 키즈 랩: 가족 만들기 체험', '초등학생과 보호자가 제작 체험·과학 실험·스탬프 랠리에 참여할 수 있습니다. 일부 체험은 예약이 필요합니다.'),
  }),
  event({
    id: 'otaru-kids-play-all-20261017', title: '遊びだョ！全員集合！！', category: 'child', start: '2026-10-17',
    time: '10:00〜12:00', startTime: '10:00', endTime: '12:00', place: '小樽市教育委員会 附属屋内運動場', address: '北海道小樽市緑3丁目4-1', mapQuery: '小樽市教育委員会 附属屋内運動場',
    summary: '園児が気軽に体を動かせる無料のスポーツイベント。定員30人。申込締切は10月7日で、多数の場合は抽選です。',
    source: '小樽市教育委員会', organizer: '小樽市教育委員会 生涯スポーツ課', url: 'https://www.city.otaru.lg.jp/docs/2022042500025/',
    audience: '幼稚園・保育園の園児', price: '無料', reservation: '要申込。10月7日締切、定員30人。', reservationRequired: true,
    translations: translations('Let’s Play Together! Preschool Sports Day', 'A free sports event for preschool children. Advance registration closes October 7; capacity is 30.', '大家一起玩！幼兒運動活動', '幼兒可免費參加的運動活動。須於10月7日前報名，名額30人。', '大家一起玩！幼儿运动活动', '幼儿可免费参加的运动活动。须在10月7日前报名，限30人。', '다 함께 놀아요! 유아 스포츠 행사', '미취학 아동을 위한 무료 스포츠 행사입니다. 10월 7일까지 신청해야 하며 정원은 30명입니다.'),
  }),
  event({
    id: 'otaru-aquarium-halloween-concert-20261003', title: 'おたる水族館 ハロウィンコンサート', start: '2026-10-03',
    time: '17:00開場／17:10〜18:10', startTime: '17:10', endTime: '18:10', doorsOpenTime: '17:00',
    place: 'おたる水族館 イルカスタジアム', mapQuery: 'おたる水族館 イルカスタジアム',
    summary: 'フルート・バイオリン・ピアノの生演奏とイルカのパフォーマンス。小学生以上500円、別途水族館入館料が必要。予約不要です。',
    source: 'おたる水族館', organizer: 'おたる水族館', url: 'https://otaru-aq.jp/choineta/news/news-35568',
    price: '小学生以上500円・別途水族館入館料', reservation: '予約不要', reservationRequired: false,
    translations: translations('Halloween Concert at Otaru Aquarium', 'Live flute, violin and piano music with occasional dolphin performances. JPY 500 for ages elementary school and up, plus aquarium admission; no reservation needed.', '小樽水族館萬聖節音樂會', '欣賞長笛、小提琴、鋼琴與海豚表演。小學生以上500日圓，另需水族館門票；無需預約。', '小樽水族馆万圣节音乐会', '欣赏长笛、小提琴、钢琴与海豚表演。小学生及以上500日元，另需水族馆门票；无需预约。', '오타루 수족관 할로윈 콘서트', '플루트·바이올린·피아노 연주와 돌고래 공연을 볼 수 있습니다. 초등학생 이상 500엔, 수족관 입장료 별도이며 예약은 필요 없습니다.'),
  }),
  event({
    id: 'kengai-networks-otaru-20261002', title: 'KENGAI NETWORKS in OTARU Vol. 2', start: '2026-10-02', end: '2026-10-04',
    time: '10/2 16:30開場・17:00開始／10/3 11:00〜19:00／10/4 11:00〜18:00',
    place: '裏小樽モンパルナス', address: '北海道小樽市稲穂4丁目3-9', mapQuery: '裏小樽モンパルナス 小樽市稲穂4丁目3-9',
    summary: '北海道・石川・京都から表現者が集まり、ライブ、作品展示、マーケットやお菓子の販売などを行う3日間。日ごとに時間が異なります。',
    source: '小樽観光協会', organizer: 'KENGAI NETWORKS', url: 'https://otaru.gr.jp/event/kengai-networks-in-otaru-vol-2',
    translations: translations('KENGAI NETWORKS in OTARU Vol. 2', 'A three-day mix of live music, art, markets and food featuring creators from Hokkaido, Ishikawa and Kyoto. Opening hours vary by day.', 'KENGAI NETWORKS in OTARU 第2屆', '來自北海道、石川及京都的創作者帶來音樂、藝術、市集與點心。三天的活動時間各不相同。', 'KENGAI NETWORKS in OTARU 第2届', '来自北海道、石川和京都的创作者带来音乐、艺术、市集和点心。三天的活动时间各不相同。', 'KENGAI NETWORKS in OTARU Vol. 2', '홋카이도·이시카와·교토의 창작자가 모이는 음악·미술·마켓·먹거리 행사입니다. 날짜별 시간이 다릅니다.'),
  }),
  event({
    id: 'otaru-bar-hopping-20261003', title: '第20回 小樽はしご酒大会', start: '2026-10-03',
    time: '18:00開始', startTime: '18:00', place: 'サンモール一番街（受付・集合）', mapQuery: '小樽 サンモール一番街',
    summary: 'ラリーカードに記された小樽・花園周辺の4店舗を巡り、各店のドリンクとおつまみを楽しむ催し。前売4,000円、当日4,500円です。',
    source: '小樽観光協会', organizer: '小樽はしご酒大会実行委員会', url: 'https://otaru.gr.jp/fall',
    price: '前売4,000円・当日4,500円', reservation: '参加券を購入。販売状況は主催者にご確認ください。',
    translations: translations('20th Otaru Bar-Hopping Rally', 'Visit four assigned bars around Hanazono in Otaru for drinks and snacks. Tickets cost JPY 4,000 in advance or JPY 4,500 on the day.', '第20屆小樽酒吧巡遊活動', '持活動卡走訪花園一帶指定的4間店，享用飲品及小食。預售4,000日圓，當日4,500日圓。', '第20届小樽酒吧巡游活动', '持活动卡走访花园一带指定的4家店，享用饮品和小吃。预售4,000日元，当日4,500日元。', '제20회 오타루 술집 투어', '오타루 하나조노 주변 지정된 가게 네 곳을 돌며 음료와 안주를 즐깁니다. 예매 4,000엔, 당일 4,500엔입니다.'),
  }),
  event({
    id: 'otaru-suitengu-night-20261003', title: '第2回 小樽 水天宮 夜間特別参拝', start: '2026-10-03', end: '2026-10-04',
    time: '開催時間は公式情報でご確認ください', place: '小樽 水天宮', mapQuery: '小樽 水天宮',
    summary: '水天宮の境内を照らす夜間特別参拝。キッチンカー、ステージ、フォトコンテストなどを予定。入場無料です。開催時間は公式告知でご確認ください。',
    source: '小樽観光協会', organizer: 'OTARUMINA', url: 'https://otaru.gr.jp/fall', price: '入場無料',
    translations: translations('Otaru Suitengu Shrine Special Evening Visit', 'Illuminated evening visits to Suitengu Shrine with food trucks and stage activities. Admission is free; check the official notice for times.', '小樽水天宮夜間特別參拜', '在燈光下參拜水天宮，現場預定有餐車及表演。免費入場，時間請查看官方公告。', '小樽水天宫夜间特别参拜', '在灯光下参拜水天宫，现场预计有餐车和表演。免费入场，时间请查看官方公告。', '오타루 스이텐구 신사 야간 특별 참배', '조명으로 꾸민 신사에서 야간 참배와 푸드트럭·무대 행사를 즐길 수 있습니다. 무료이며 시간은 공식 공지를 확인하세요.'),
  }),
  ...yusenDates,
  event({
    id: 'otaru-yusen-foil-workshop-20261010', title: '金唐革紙 箔押し体験会', start: '2026-10-10',
    time: '14:00〜16:00', startTime: '14:00', endTime: '16:00',
    place: yusen, address: '北海道小樽市色内3丁目7-8', mapQuery: '旧日本郵船株式会社小樽支店',
    summary: '歴史的な装飾壁紙・金唐革紙の版木を使った箔押し体験。予約不要で、参加費は入館料のみです。',
    source: yusen, organizer: yusen, url: yusenFoil, price: '入館料のみ', reservation: '予約不要', reservationRequired: false,
    translations: translations('Gold-Embossed Decorative Paper Workshop', 'Try foil embossing with a woodblock used for traditional Japanese decorative wallpaper. No reservation; museum admission only.', '金唐革紙燙箔體驗', '使用傳統日本裝飾壁紙的木版體驗燙箔。無需預約，只需支付入館費。', '金唐革纸烫箔体验', '使用传统日本装饰壁纸的木版体验烫箔。无需预约，只需支付门票。', '금당혁지 금박 압인 체험', '전통 장식 벽지의 목판으로 금박 압인을 체험합니다. 예약은 필요 없으며 입장료만 냅니다.', yusenVenue),
  }),
  event({
    id: 'otaru-yusen-curator-guide-20261010', title: '旧日本郵船小樽支店 学芸員解説会', start: '2026-10-10',
    time: '13:00〜13:45', startTime: '13:00', endTime: '13:45',
    place: yusen, address: '北海道小樽市色内3丁目7-8', mapQuery: '旧日本郵船株式会社小樽支店',
    summary: '学芸員の岩佐香菜子さんが建物の歴史と見どころを案内。定員20人、予約不要で、参加費は入館料のみです。',
    source: yusen, organizer: yusen, url: yusenGuide, price: '入館料のみ', reservation: '予約不要・定員20人', reservationRequired: false,
    translations: translations('Curator’s Tour of the Former Nippon Yusen Otaru Branch', 'Curator Kanako Iwasa explains the history and highlights of the building. Capacity 20; no reservation; museum admission only.', '舊日本郵船小樽支店策展人導覽', '學藝員岩佐香菜子介紹建築歷史與特色。限20人，無需預約，只需支付入館費。', '旧日本邮船小樽支店策展人导览', '学艺员岩佐香菜子介绍建筑历史和特色。限20人，无需预约，只需支付门票。', '구 일본유센 오타루 지점 학예사 해설회', '학예사 이와사 가나코가 건물의 역사와 볼거리를 소개합니다. 정원 20명, 예약 불필요, 입장료만 냅니다.', yusenVenue),
  }),
  event({
    id: 'otaru-yusen-kimono-autumn-20261024', title: '着物で過ごす明治の洋館 秋編', start: '2026-10-24', end: '2026-10-25',
    time: 'カフェ10:30〜16:00／着物体験の時間は公式ページでご確認ください',
    place: yusen, address: '北海道小樽市色内3丁目7-8', mapQuery: '旧日本郵船株式会社小樽支店',
    summary: 'ウスキ呉服店の着物レンタル・着付体験と2日間のカフェ。着物体験は4,000円で予約優先、空きがあれば当日受付も可能。25日14時にはSPレコードコンサートもあります。',
    source: yusen, organizer: 'ウスキ呉服店／旧日本郵船株式会社小樽支店', url: yusenKimono,
    price: '着物レンタル・着付体験4,000円（カフェ等は別料金）', reservation: '着物体験は予約優先・空きがあれば当日受付可',
    translations: translations('Autumn Kimono Experience in a Meiji-Era Building', 'Kimono rental and dressing (JPY 4,000, reservations prioritized) and a café from 10:30 AM to 4:00 PM on both days. A free SP record concert starts at 2:00 PM on October 25.', '明治洋館秋季和服體驗', '兩天均有和服租借與穿著體驗（4,000日圓、預約優先），咖啡廳10:30–16:00開放。25日14:00另有SP唱片音樂會。', '明治洋馆秋季和服体验', '两天均有和服租借与穿着体验（4,000日元、预约优先），咖啡厅10:30–16:00开放。25日14:00另有SP唱片音乐会。', '메이지 시대 건물에서 기모노 체험', '기모노 대여·착용 체험은 4,000엔이며 예약 우선입니다. 카페는 양일 10:30~16:00, SP 음반 콘서트는 25일 14:00에 열립니다.', yusenVenue),
  }),
  event({
    id: 'otaru-takoyaki-fes-20261024', title: 'たこ焼きフェス2026 ～小樽襲来編～', start: '2026-10-24', end: '2026-10-25',
    time: '10/24 11:30〜19:00予定／10/25 11:30〜18:00予定',
    place: '小樽サンモール一番街', address: '北海道小樽市稲穂1丁目4付近', mapQuery: '小樽サンモール一番街',
    summary: '小樽サンモール一番街で開かれるたこ焼きの祭典。入場無料。両日の終了予定時刻が異なります。',
    source: '小樽観光協会', organizer: 'たこ焼きフェス実行委員会', url: 'https://otaru.gr.jp/fall', price: '入場無料',
    translations: translations('Takoyaki Festival 2026 in Otaru', 'A two-day takoyaki festival at Sun Mall Ichibangai. Admission is free. Planned hours are 11:30 AM–7:00 PM on October 24 and 11:30 AM–6:00 PM on October 25.', '小樽章魚燒節2026', '在Sun Mall一番街舉行的兩日章魚燒活動，免費入場。10月24日預定11:30–19:00，25日11:30–18:00。', '小樽章鱼烧节2026', '在Sun Mall一番街举办的两日章鱼烧活动，免费入场。10月24日预计11:30–19:00，25日11:30–18:00。', '오타루 타코야키 페스티벌 2026', '선몰 이치반가이에서 이틀간 열리는 타코야키 축제입니다. 입장 무료이며 24일은 11:30~19:00, 25일은 11:30~18:00 예정입니다.'),
  }),
  event({
    id: 'otaru-matsumae-kagura-20261024', title: '松前神楽北海道連合保存会合同公演 in 小樽', start: '2026-10-24',
    time: '12:00開場／13:00〜16:00頃', startTime: '13:00', endTime: '16:00', doorsOpenTime: '12:00',
    place: '小樽市民センター（マリンホール）', address: '北海道小樽市色内2丁目13-5', mapQuery: '小樽市民センター マリンホール',
    summary: '国指定重要無形民俗文化財「松前神楽」の保存会が合同で行う公演。入場料1,000円です。',
    source: '松前神楽小樽保存会／小樽観光協会', organizer: '松前神楽北海道連合保存会', url: 'https://otaru.gr.jp/event/matsumae-kagura-2026', price: '1,000円',
    translations: translations('Matsumae Kagura Joint Performance in Otaru', 'Preservation groups perform Matsumae Kagura, a nationally designated intangible folk cultural property. Admission is JPY 1,000.', '松前神樂聯合公演（小樽）', '保存團體聯合演出日本國家指定重要無形民俗文化財「松前神樂」。門票1,000日圓。', '松前神乐联合演出（小樽）', '保护团体联合演出日本国家指定重要非物质民俗文化财“松前神乐”。门票1,000日元。', '마쓰마에 가구라 합동 공연', '국가 지정 중요무형민속문화재인 마쓰마에 가구라의 보존회 합동 공연입니다. 입장료는 1,000엔입니다.'),
  }),
  event({
    id: 'otaru-port-symposium-20261013', title: 'ザ・シンポジウムみなと in 小樽', start: '2026-10-13',
    time: '14:00〜17:00', startTime: '14:00', endTime: '17:00', place: '小樽市民センター（マリンホール）', address: '北海道小樽市色内2丁目13-5', mapQuery: '小樽市民センター マリンホール',
    summary: '港の文化財や空間を生かしたにぎわいづくりを考えるシンポジウム。小樽港をテーマに講演とパネル討論を行います。',
    source: '小樽市', organizer: 'ザ・シンポジウムみなと実行委員会', url: 'https://www.city.otaru.lg.jp/docs/2026091100014/', price: '無料',
    translations: translations('The Port Symposium in Otaru', 'Talks and a panel discussion on using port heritage and spaces to enliven Otaru Port.', '小樽港口研討會', '以小樽港為主題，討論如何活用港口文化資產與空間。', '小樽港口研讨会', '以小樽港为主题，讨论如何利用港口文化遗产与空间。', '오타루 항만 심포지엄', '오타루항의 문화유산과 공간을 활용해 항구 지역에 활기를 더하는 방법을 논의합니다.'),
  }),
  event({
    id: 'otaru-ai-job-seminar-20261027', title: '就職・転職に役立つAIの使い方セミナー', category: 'job', start: '2026-10-27', end: '2026-10-30',
    time: '各日10:00〜12:30（全4回）', startTime: '10:00', endTime: '12:30',
    place: '小樽市勤労女性センター 講習室（ウイングベイ小樽1番街4階）', mapQuery: '小樽市勤労女性センター ウイングベイ小樽',
    summary: 'AIの基本から履歴書・面接、文書作成、職場での活用まで学ぶ4日間の無料講座。小樽市内で就職・転職を目指す方が対象。10月22日申込締切です。',
    source: '小樽地域雇用創造協議会', organizer: '小樽地域雇用創造協議会', url: 'https://otaru-jobnavi.jp/%E5%B0%B1%E8%81%B7%E3%83%BB%E8%BB%A2%E8%81%B7%E3%81%AB%E5%BD%B9%E7%AB%8B%E3%81%A4ai%E3%81%AE%E4%BD%BF%E3%81%84%E6%96%B9%E3%82%BB%E3%83%9F%E3%83%8A%E3%83%BC%E9%96%8B%E5%82%AC%E3%81%AE%E3%81%94%E6%A1%88/',
    audience: '小樽市内で2027年3月末までに就職・転職を目指し、原則全4回に出席できる方', price: '無料', reservation: '要申込。締切2026年10月22日。', reservationRequired: true,
    translations: translations('Using AI for Job Search and Career Change', 'Four free morning sessions on AI basics, résumés, interviews and workplace tasks. For people seeking work in Otaru; apply by October 22.', '求職與轉職AI應用講座', '四場免費上午課程，涵蓋AI基礎、履歷、面試與工作應用。對象為在小樽求職者，10月22日報名截止。', '求职与转职AI应用讲座', '四场免费上午课程，涵盖AI基础、简历、面试和工作应用。面向在小樽求职的人，10月22日报名截止。', '취업·이직에 도움 되는 AI 활용 강좌', 'AI 기초부터 이력서·면접·업무 활용까지 배우는 무료 오전 강좌 4회입니다. 오타루 구직자를 대상으로 하며 10월 22일 신청 마감입니다.'),
  }),
  event({
    id: 'otaru-haccp-seminar-20261028', title: '小樽市 HACCPセミナー', category: 'business', start: '2026-10-28',
    time: '午前10:00〜12:00／午後13:30〜15:30（同内容）',
    place: '小樽市保健所 講堂（ウイングベイ小樽1番街4階）', address: '北海道小樽市築港11-1', mapQuery: '小樽市保健所 ウイングベイ小樽1番街4階',
    summary: '飲食店・販売業などの食品事業者向けに、HACCPに沿った衛生管理と計画作成を学ぶ無料講座。午前と午後は同内容。10月16日申込締切です。',
    source: '小樽市保健所', organizer: '小樽市保健所', url: 'https://www.city.otaru.lg.jp/docs/2020100300327/', price: '無料', reservation: '要事前申込。締切2026年10月16日。', reservationRequired: true,
    translations: translations('Otaru City HACCP Food Safety Seminar', 'Free food-safety training for restaurants and other food businesses. Identical morning and afternoon sessions; apply by October 16.', '小樽市HACCP食品安全講座', '餐飲與食品業者的免費衛生管理課程。上午與下午內容相同，10月16日報名截止。', '小樽市HACCP食品安全讲座', '面向餐饮与食品业者的免费卫生管理课程。上午和下午内容相同，10月16日报名截止。', '오타루시 HACCP 식품위생 세미나', '음식점과 식품 사업자를 위한 무료 위생관리 강좌입니다. 오전과 오후 내용이 같으며 10월 16일 신청 마감입니다.'),
  }),
  event({
    id: 'otaru-sports-day-20261012', title: '小樽市民スポーツ・レクリエーションの日', start: '2026-10-12',
    time: '施設により異なります（総合体育館9:00〜21:00）', place: '小樽市総合体育館ほか市内体育施設', address: '北海道小樽市花園5丁目2-2', mapQuery: '小樽市総合体育館',
    summary: 'スポーツの日に総合体育館、体育施設、高島小学校温水プールなどを無料開放。施設ごとに時間・種目が異なり、屋外施設は雨天等で中止となります。',
    source: '小樽市教育委員会', organizer: '小樽市教育委員会 生涯スポーツ課', url: 'https://www.city.otaru.lg.jp/docs/2020101600204/', price: '無料',
    translations: translations('Otaru Sports and Recreation Day', 'City gyms, sports grounds and a school pool are free to use on Sports Day. Hours vary by facility; outdoor activities may be cancelled in poor weather.', '小樽市民運動與休閒日', '運動日免費開放市內體育館、運動場及溫水泳池。各設施時間不同，戶外活動可能因天候取消。', '小樽市民运动与休闲日', '运动日免费开放市内体育馆、运动场和温水泳池。各设施时间不同，户外活动可能因天气取消。', '오타루 시민 스포츠·레크리에이션의 날', '스포츠의 날에 시내 체육관·운동장·수영장을 무료로 개방합니다. 시설별 시간이 다르고 야외 활동은 날씨에 따라 취소될 수 있습니다.'),
  }),
  event({
    id: 'otaru-blue-canal-20261101', title: '青の運河 2026–2027', start: '2026-11-01', end: '2027-01-31',
    time: '日没〜22:30頃', place: '小樽運河 浅草橋〜中央橋', mapQuery: '小樽運河 浅草橋',
    summary: '小樽運河の浅草橋から中央橋を青いイルミネーションで彩る冬の恒例企画。点灯は日没から22:30頃まで。',
    source: '小樽観光協会', organizer: '小樽観光協会', url: 'https://otaru.gr.jp/fall', price: '観覧無料',
    translations: translations('Blue Canal Illuminations 2026–2027', 'Blue winter lights illuminate Otaru Canal between Asakusabashi and Chuo Bridge from sunset until about 10:30 PM.', '藍色運河燈飾2026–2027', '小樽運河淺草橋至中央橋一帶點亮藍色燈飾，約從日落至22:30。', '蓝色运河灯饰2026–2027', '小樽运河浅草桥至中央桥一带点亮蓝色灯饰，约从日落至22:30。', '푸른 운하 일루미네이션 2026–2027', '오타루 운하 아사쿠사바시에서 주오바시까지 푸른 조명을 밝힙니다. 일몰부터 약 22:30까지입니다.'),
  }),
  event({
    id: 'otaru-moonlit-container-alley-20260919', title: '月夜のコンテナ横丁', start: '2026-09-19', end: '2026-09-27',
    time: '各日15:00〜売り切れ次第終了（店舗により営業日が異なります）',
    place: 'おたるポートスクエア コンテナビレッジ', address: '北海道小樽市港町4-2', mapQuery: 'おたるポートスクエア 小樽市港町4-2',
    summary: '各店舗の営業日に合わせ、卵や卵黄を使った限定「月見メニュー」を提供。店舗ごとに営業日・提供状況が異なり、売り切れ次第終了です。',
    source: '小樽観光協会／おたるポートスクエア', organizer: 'おたるポートスクエア', url: 'https://otaru.gr.jp/tourist/tukiyonokontenayokotilyou9-19-27',
    translations: translations('Moonlit Container Alley at Otaru Port Square', 'Container Village vendors offer limited moon-viewing dishes from 3:00 PM on their operating days until sold out. Vendor schedules vary.', '小樽港廣場月夜貨櫃小巷', '貨櫃村店家依各自營業日從15:00供應限量賞月餐點，售完為止。各店營業日不同。', '小樽港广场月夜集装箱小巷', '集装箱村商家按各自营业日从15:00供应限量赏月餐点，售完为止。各店营业日不同。', '오타루 포트 스퀘어 달밤 컨테이너 골목', '컨테이너 빌리지 매장이 각 영업일 15:00부터 한정 달맞이 메뉴를 판매합니다. 매장별 영업일이 다르며 품절 시 종료됩니다.'),
  }),
  event({
    id: 'otaru-piano-trio-europe-20260926', title: 'ピアノトリオコンサート ～東欧との邂逅～', start: '2026-09-26',
    time: '14:00〜15:30', startTime: '14:00', endTime: '15:30',
    place: '森ヒロコ・スタシス記念 小樽バザールヴィタ美術館', address: '北海道小樽市緑1丁目16-33', mapQuery: '小樽バザールヴィタ美術館',
    summary: '間野桂子個展の最終日に、ピアノ・ヴァイオリン・チェロによる東欧ゆかりの音楽を演奏。参加費2,500円、要予約です。',
    source: '小樽バザールヴィタ美術館／小樽観光協会', organizer: '小樽バザールヴィタ美術館',
    url: 'https://bazaarvitashop.jimdofree.com/%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88-%E3%83%A9%E3%82%A4%E3%83%96%E3%83%A9%E3%83%AA%E3%83%BC%E6%83%85%E5%A0%B1/%E3%81%9D%E3%81%AE%E4%BB%96%E3%81%AE%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88-%E6%9C%97%E8%AA%AD%E4%BC%9A%E3%81%AA%E3%81%A9/',
    price: '2,500円', reservation: '要予約。空席は美術館にご確認ください。', reservationRequired: true,
    translations: translations('Piano Trio Concert: Encounter with Eastern Europe', 'Piano, violin and cello music on the final day of Keiko Mano’s exhibition. JPY 2,500; reservation required.', '鋼琴三重奏：與東歐相遇', '間野桂子個展最後一天的鋼琴、小提琴與大提琴演奏。費用2,500日圓，須預約。', '钢琴三重奏：与东欧相遇', '间野桂子个展最后一天的钢琴、小提琴与大提琴演奏。费用2,500日元，需预约。', '피아노 트리오 콘서트: 동유럽과의 만남', '마노 게이코 개인전 마지막 날 피아노·바이올린·첼로 연주가 열립니다. 2,500엔이며 예약이 필요합니다.'),
  }),
  event({
    id: 'otaru-yusen-memory-photo-20260901', title: '記憶の中の小樽 写真展示会「地図」', start: '2026-09-01', end: '2026-09-30',
    time: '9:30〜17:00（火曜休館）', place: yusen, address: '北海道小樽市色内3丁目7-8', mapQuery: '旧日本郵船株式会社小樽支店',
    summary: '明治・大正・昭和初期の小樽の写真を「地図」をテーマに展示。観覧には入館料が必要で、火曜は休館です。',
    source: yusen, organizer: yusen, url: 'https://kyu-nippon-yusen-otaru.jp/archives/event', price: '入館料が必要',
    excludedDates: ['2026-09-08', '2026-09-15', '2026-09-29'],
    translations: translations('Otaru in Memory: Historic Photos and Maps', 'Historic photos of Otaru from the Meiji, Taisho and early Showa eras, shown around the theme of maps. Museum admission required; closed Tuesdays.', '記憶中的小樽：歷史照片與地圖', '以「地圖」為主題展出明治、大正及昭和初期的小樽照片。須付入館費，週二休館。', '记忆中的小樽：历史照片与地图', '以“地图”为主题展出明治、大正和昭和初期的小樽照片。需付门票，周二闭馆。', '기억 속 오타루: 옛 사진과 지도', '메이지·다이쇼·쇼와 초기 오타루 사진을 지도라는 주제로 전시합니다. 입장료가 필요하며 화요일은 휴관입니다.', yusenVenue),
  }),
  event({
    id: 'otaru-sakana-hosomi-live-20261012', title: '細海魚 ソロライブ「小樽の路地で聴く細海魚」', start: '2026-10-12',
    time: '18:00開場／18:30開演', startTime: '18:30', doorsOpenTime: '18:00',
    place: '裏小樽モンパルナス', address: '北海道小樽市稲穂4丁目3-9', mapQuery: '裏小樽モンパルナス 小樽市稲穂4丁目3-9',
    summary: 'キーボード奏者・プロデューサー細海魚のソロ公演。前売4,000円、当日4,500円で別途ドリンク代が必要です。',
    source: '小樽観光協会／裏小樽モンパルナス', organizer: '裏小樽モンパルナス', url: 'https://otaru.gr.jp/event/utanoarika',
    price: '前売4,000円・当日4,500円（別途ドリンク代）', reservation: '主催者案内のメールで予約',
    translations: translations('Sakana Hosomi Solo Live in Otaru', 'A solo live show by keyboardist and producer Sakana Hosomi. JPY 4,000 in advance or JPY 4,500 on the day, plus a drink charge.', '細海魚小樽個人演出', '鍵盤樂手兼製作人細海魚的個人演出。預售4,000日圓、當日4,500日圓，另需飲品費。', '细海鱼小樽个人演出', '键盘乐手兼制作人细海鱼的个人演出。预售4,000日元、当日4,500日元，另需饮品费。', '호소미 사카나 오타루 솔로 라이브', '키보디스트·프로듀서 호소미 사카나의 솔로 공연입니다. 예매 4,000엔, 당일 4,500엔에 음료비가 별도입니다.'),
  }),
  event({
    id: 'otaru-nakagawa-rikuo-live-20261020', title: 'うたのありか2026 中川敬×リクオ 小樽編', start: '2026-10-20',
    time: '18:30開場／19:00開演', startTime: '19:00', doorsOpenTime: '18:30',
    place: '裏小樽モンパルナス', address: '北海道小樽市稲穂4丁目3-9', mapQuery: '裏小樽モンパルナス 小樽市稲穂4丁目3-9',
    summary: '中川敬とリクオによる2人のライブ。一般前売5,000円、当日5,500円、別途ドリンク代。学生割引もあります。',
    source: '小樽観光協会／裏小樽モンパルナス', organizer: '裏小樽モンパルナス', url: 'https://otaru.gr.jp/fall',
    price: '一般前売5,000円・当日5,500円（別途ドリンク代）',
    translations: translations('Takashi Nakagawa × Rikuo Live in Otaru', 'A two-artist live concert by Takashi Nakagawa and Rikuo. General tickets are JPY 5,000 in advance or JPY 5,500 on the day, plus a drink charge.', '中川敬×Rikuo小樽演唱會', '中川敬與Rikuo的雙人演唱會。一般預售5,000日圓、當日5,500日圓，另需飲品費。', '中川敬×Rikuo小樽演唱会', '中川敬与Rikuo的双人演唱会。普通预售5,000日元、当日5,500日元，另需饮品费。', '나카가와 다카시×리쿠오 오타루 라이브', '나카가와 다카시와 리쿠오의 공연입니다. 일반 예매 5,000엔, 당일 5,500엔이며 음료비는 별도입니다.'),
  }),
  event({
    id: 'otaru-japan-heritage-walk-20261018', title: 'おたる案内人と巡る日本遺産ミニツアー', start: '2026-10-18',
    time: '12:30受付／13:00〜15:00', startTime: '13:00', endTime: '15:00',
    place: '市立小樽文学館（集合）', address: '北海道小樽市色内1丁目9-5', mapQuery: '市立小樽文学館',
    summary: '炭鉄港・北前船などの日本遺産をガイドと歩くツアー。旧日本郵船小樽支店への入館料込みで2,500円。先着30人、10月15日17時申込締切です。',
    source: '北海道空知総合振興局／小樽観光協会', organizer: '北海道空知総合振興局', url: 'https://otaru.gr.jp/event/kiamaebunetour',
    price: '2,500円（旧日本郵船小樽支店入館料込み）', reservation: '要申込。先着30人、10月15日17:00締切。', reservationRequired: true,
    translations: translations('Guided Otaru Japan Heritage Walk', 'A two-hour guided walk covering Otaru’s industrial and maritime heritage. JPY 2,500 including museum admission; register by 5:00 PM October 15.', '小樽日本遺產導覽步行', '由導覽員帶領步行認識小樽的工業與海運遺產。費用2,500日圓含入館費，10月15日17:00報名截止。', '小樽日本遗产导览步行', '由导览员带领步行了解小樽的工业和海运遗产。费用2,500日元含门票，10月15日17:00报名截止。', '오타루 일본유산 가이드 도보 투어', '가이드와 함께 오타루의 산업·해운 유산을 걷는 2시간 투어입니다. 박물관 입장료 포함 2,500엔이며 10월 15일 17:00 신청 마감입니다.'),
  }),
  event({
    id: 'otaru-culture-tea-20261024', title: '第77回小樽市文化祭 お茶会（裏千家）', start: '2026-10-24', end: '2026-10-25',
    time: '両日15:00まで（なくなり次第終了）', place: '市立小樽美術館 1階ミーティングルーム', address: '北海道小樽市色内1丁目9-5', mapQuery: '市立小樽美術館',
    summary: '第77回小樽市文化祭の裏千家のお茶会。両日とも15時までで、なくなり次第終了します。',
    source: '小樽市教育委員会', organizer: '小樽市文化団体協議会', url: cityFestival, price: '入場無料',
    translations: translations('Otaru Cultural Festival: Urasenke Tea Gathering', 'A Japanese tea gathering at the Otaru City Museum of Art. Ends by 3:00 PM each day or earlier if supplies run out.', '小樽市文化祭：裏千家茶會', '在小樽市立美術館舉行的日本茶會，兩天均於15:00前結束，供應完畢會提前結束。', '小樽市文化节：里千家茶会', '在小樽市立美术馆举行的日本茶会，两天均于15:00前结束，供应完毕可能提前结束。', '오타루시 문화제: 우라센케 다회', '오타루 시립미술관에서 열리는 다회입니다. 양일 모두 15:00까지이며 준비 수량 소진 시 일찍 끝납니다.', museumVenue),
  }),
  ...[
    ['haiku', '俳句大会', '12:30', 'Haiku Poetry Gathering', '俳句大會', '俳句大会', '하이쿠 대회'],
    ['tanka', '短歌大会', '12:30', 'Tanka Poetry Gathering', '短歌大會', '短歌大会', '단카 대회'],
    ['senryu', '川柳大会', '13:00', 'Senryu Poetry Gathering', '川柳大會', '川柳大会', '센류 대회'],
  ].map(([key, title, startTime, enName, hantName, hansName, koName]) => event({
    id: `otaru-culture-${key}-20261025`, title: `第77回小樽市文化祭 ${title}`, start: '2026-10-25',
    time: `${startTime}開始`, startTime,
    place: '生涯学習プラザ「レピオ」', address: '北海道小樽市富岡1丁目5-1 稲穂小学校1階', mapQuery: '生涯学習プラザ レピオ 小樽',
    summary: `第77回小樽市文化祭の${title}。作品は公募され、入賞作品は後日、市立小樽美術館に展示される予定です。`,
    source: '小樽市教育委員会', organizer: '小樽市文化団体協議会', url: cityFestival, price: '入場無料',
    translations: translations(enName, `A ${key} poetry gathering in the 77th Otaru City Cultural Festival. Selected works are scheduled for later display at the city art museum.`, hantName, `第77屆小樽市文化祭的${hantName}，入選作品預定稍後在市立美術館展出。`, hansName, `第77届小樽市文化节的${hansName}，入选作品预计稍后在市立美术馆展出。`, koName, `제77회 오타루시 문화제의 ${koName}입니다. 수상 작품은 이후 시립미술관에 전시될 예정입니다.`),
  })),
  event({
    id: 'otaru-ukiyoe-ghost-gallery-talk-20261011', title: '企画展「怪異と異形」ギャラリートーク', start: '2026-10-11',
    time: '14:00開始（約30分）', startTime: '14:00', endTime: '14:30',
    place: '小樽芸術村 浮世絵美術館 2階企画展示室', mapQuery: '小樽芸術村 浮世絵美術館',
    summary: '開催中の浮世絵企画展「怪異と異形」を学芸員が解説。先着10人、予約不要。参加費は無料ですが当日の入館券が必要です。',
    source: '小樽芸術村／小樽観光協会', organizer: '小樽芸術村', url: 'https://otaru.gr.jp/fall',
    price: '参加無料・別途入館券が必要', reservation: '予約不要・当日先着10人', reservationRequired: false,
    translations: translations('Ghosts and Strange Forms: Gallery Talk', 'A curator explains the ukiyo-e exhibition at Otaru Art Base. About 30 minutes; first 10 arrivals, no reservation. A museum ticket is required.', '「怪異與異形」展覽導覽', '策展人解說小樽藝術村的浮世繪展。約30分鐘，當日先到先得限10人，免預約但須購買入館券。', '“怪异与异形”展览导览', '策展人讲解小樽艺术村的浮世绘展。约30分钟，当日先到先得限10人，无需预约但须购买门票。', '「괴이와 이형」 전시 갤러리 토크', '학예사가 오타루 예술촌의 우키요에 전시를 해설합니다. 약 30분, 당일 선착순 10명이며 예약은 필요 없지만 입장권이 필요합니다.'),
  }),
  event({
    id: 'otaru-iron-horse-carriage-20261001', title: '鉄道歴史体感プログラム「明治風の客車に乗ろう」（10月運行）', start: '2026-10-01', end: '2026-10-12',
    time: '11:30・13:30・15:30（各回約30分）※10/7の11:30便は運休',
    place: '小樽市総合博物館 本館・屋外展示場', address: '北海道小樽市手宮1丁目3-6', mapQuery: '小樽市総合博物館 本館',
    summary: '蒸気機関車アイアンホース号がけん引する明治風の客車に乗車。各回先着120人、予約不要。10月5・6日は全便運休、7日は11:30便のみ運休。故障時は臨時運休の可能性があります。',
    source: '小樽市総合博物館', organizer: '小樽市総合博物館', url: 'https://www.city.otaru.lg.jp/docs/2020111400030/',
    price: '乗車は入館料のみ', reservation: '予約不要・各回先着120人', reservationRequired: false,
    audience: 'どなたでも（小学3年生以下は保護者同伴）', excludedDates: ['2026-10-05', '2026-10-06'],
    translations: translations('Ride a Meiji-Style Railway Carriage: October Services', 'Ride a carriage pulled by the steam locomotive Iron Horse. Three daily departures, except no service October 5–6 and no 11:30 AM departure October 7. First come, first served; museum admission required.', '明治風格列車體驗：10月運行', '搭乘蒸汽機車「Iron Horse」牽引的客車。每日三班；10月5、6日停駛，7日11:30班次停駛。先到先得，需付博物館入館費。', '明治风格列车体验：10月运行', '乘坐蒸汽机车“Iron Horse”牵引的客车。每日三班；10月5、6日停运，7日11:30班次停运。先到先得，需支付博物馆门票。', '메이지풍 객차 탑승 체험: 10월 운행', '증기기관차 아이언 호스가 끄는 객차를 탈 수 있습니다. 매일 3회 운행하지만 10월 5~6일 전편과 7일 11:30편은 운휴합니다. 선착순이며 박물관 입장료가 필요합니다.'),
  }),
  event({
    id: 'otaru-minako-kuroishi-exhibition-20261029', title: '黒石美奈子展「いつもとなりに」', start: '2026-10-29', end: '2026-11-03',
    time: '開場時間は公式情報でご確認ください',
    place: '裏小樽モンパルナス', address: '北海道小樽市稲穂4丁目3-9', mapQuery: '裏小樽モンパルナス 小樽市稲穂4丁目3-9',
    summary: '銅版画作家・黒石美奈子さんの個展。11月1日13:00〜14:00にはギャラリートークも予定されています。開場時間と入場条件は主催者にご確認ください。',
    source: '小樽観光協会／裏小樽モンパルナス', organizer: '裏小樽モンパルナス', url: 'https://otaru.gr.jp/fall',
    translations: translations('Minako Kuroishi Exhibition: Always Beside You', 'An exhibition of copperplate prints by artist Minako Kuroishi. A gallery talk is scheduled for November 1, 1:00–2:00 PM. Confirm opening hours with the venue.', '黑石美奈子版畫展「總在身旁」', '黑石美奈子的銅版畫個展。11月1日13:00–14:00預定舉辦展覽導覽，開放時間請向場館確認。', '黑石美奈子版画展“总在身旁”', '黑石美奈子的铜版画个展。11月1日13:00–14:00预计举办展览导览，开放时间请向场馆确认。', '구로이시 미나코 동판화 전시회 「언제나 곁에」', '구로이시 미나코의 동판화 개인전입니다. 11월 1일 13:00~14:00 갤러리 토크가 예정되어 있습니다. 개장 시간은 장소에 확인하세요.'),
  }),
];
