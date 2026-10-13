// Official employment and business notices reviewed on 2026-10-13 (JST).
// Each non-consecutive session has its own record; dates are inclusive.
const langs = ['en', 'zh-Hant', 'zh-Hans', 'ko'];
const tr = (names, summaries, venues) => Object.fromEntries(langs.map((lang, i) => [lang, {
  name: names[i], summary: summaries[i], description: summaries[i], venueName: venues[i],
}]));
const localized = values => Object.fromEntries(['ja', ...langs].map((lang, i) => [lang, values[i]]));
const free = localized(['無料', 'Free', '免費', '免费', '무료']);
const walkIn = localized(['予約不要', 'No reservation required', '無需預約', '无需预约', '예약 불필요']);
const required = localized(['要事前申込', 'Advance booking required', '須事先報名', '须提前报名', '사전 신청 필수']);
const hwVenue = ['Hello Work Otaru, 2F meeting room (ハローワーク小樽)', 'Hello Work小樽2樓會議室（ハローワーク小樽）', 'Hello Work小樽2楼会议室（ハローワーク小樽）', '헬로워크 오타루 2층 회의실(ハローワーク小樽)'];
const wingVenue = ['Otaru Working Women’s Center, Main Hall; Wing Bay Otaru, Building 1, 4F', '小樽市勤勞女性中心大廳，Wing Bay Otaru 1號館4樓', '小樽市勤劳女性中心大厅，Wing Bay Otaru 1号馆4楼', '오타루시 근로여성센터 대홀, 윙베이 오타루 1번관 4층'];
const econVenue = ['Otaru Economic Center, 3F small meeting room (小樽経済センター)', '小樽經濟中心3樓小會議室', '小樽经济中心3楼小会议室', '오타루 경제센터 3층 소회의실'];
function event(item) { return { end: item.start, sourceCheckedAt: '2026-10-13', updatedAt: '2026-10-13', ...item }; }
const appealUrl = 'https://otaru-jobnavi.jp/%E4%BA%BA%E6%9D%90%E3%81%8C%E9%9B%86%E3%81%BE%E3%82%8Bx%E5%AE%9A%E7%9D%80%E3%81%99%E3%82%8B%EF%BC%81%E9%AD%85%E5%8A%9B%E3%81%82%E3%82%8B%E4%BC%9A%E7%A4%BE%E3%81%AB%E3%81%AA%E3%82%8B%E3%81%9F/';
const consultUrl = 'https://otarucci.jp/%E7%B5%8C%E5%96%B6%E5%8A%9B%E5%BC%B7%E5%8C%96%E3%81%AE%E3%81%9F%E3%82%81%E3%81%AE%E5%80%8B%E5%88%A5%E7%9B%B8%E8%AB%87%E4%BC%9A%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6-3/';
const hwUrl = 'https://jsite.mhlw.go.jp/hokkaido-hellowork/content/contents/002826363.pdf';

export default [
  ...['2026-10-20', '2026-10-29', '2026-11-05', '2026-11-12'].map((start, i) => event({
    id: `otaru-employer-appeal-${start.replaceAll('-', '')}`, category: 'business', start,
    title: `魅力発信力向上セミナー 第${i + 1}回`,
    time: '14:00〜16:00', startTime: '14:00', endTime: '16:00',
    place: '小樽市勤労女性センター 大ホール（ウイングベイ小樽1番街4階）',
    address: '北海道小樽市築港11-1', mapQuery: '小樽市勤労女性センター ウイングベイ小樽',
    summary: `採用・定着につながる企業の魅力発信を学ぶ無料講座。各回20人、希望する回を選んで事前申込。${i === 2 ? '第3回は会場参加のみです。' : 'この回はオンライン参加も可能です。'}`,
    source: '小樽地域雇用創造協議会・小樽商工会議所', organizer: '小樽地域雇用創造協議会', url: appealUrl,
    price: free, reservation: required, reservationRequired: true,
    audience: localized(['小樽地域の企業・事業主・従業員、新規事業や事業所拡大を検討する企業', 'Otaru-area businesses and prospective local employers', '小樽地區企業及有意在當地發展業務的業者', '小樽地区企业及有意在当地发展业务的经营者', '오타루 지역 기업과 지역 내 사업 확대를 검토하는 사업자']),
    translations: tr(
      [`Employer Communications Seminar — Session ${i + 1}`, `企業魅力傳播講座 第${i + 1}場`, `企业魅力传播讲座 第${i + 1}场`, `기업 매력 발신 세미나 제${i + 1}회`],
      [`Free recruitment and retention seminar; booking required, 20 places. ${i === 2 ? 'In person only.' : 'Online participation available.'}`, `免費學習企業招募與留才的資訊傳播方法，限20人，須報名。${i === 2 ? '本場僅限現場參加。' : '本場亦可線上參加。'}`, `免费学习企业招聘与留人的信息传播方法，限20人，须报名。${i === 2 ? '本场仅限现场参加。' : '本场也可线上参加。'}`, `채용·근속을 위한 기업 홍보 강좌. 무료, 20명, 사전 신청. ${i === 2 ? '현장 참가만 가능합니다.' : '온라인 참가도 가능합니다.'}`], wingVenue),
  })),
  ...['2026-11-05', '2026-11-12', '2026-11-19', '2026-11-26'].map(start => event({
    id: `otaru-management-consultation-${start.replaceAll('-', '')}`, category: 'business', start,
    title: '経営力強化のための個別相談会',
    time: '10:00 / 11:00 / 13:30 / 14:30 / 15:30',
    timeTranslations: localized(['相談開始枠 10:00 / 11:00 / 13:30 / 14:30 / 15:30（各約45分）', 'Appointment starts: 10:00 AM / 11:00 AM / 1:30 PM / 2:30 PM / 3:30 PM JST (about 45 minutes each)', '諮詢開始時段：10:00 / 11:00 / 13:30 / 14:30 / 15:30（各約45分鐘，日本時間）', '咨询开始时段：10:00 / 11:00 / 13:30 / 14:30 / 15:30（各约45分钟，日本时间）', '상담 시작 시간: 10:00 / 11:00 / 13:30 / 14:30 / 15:30 (각 약 45분, 일본 시간)']),
    place: '小樽経済センター3階 小会議室', address: '北海道小樽市稲穂2丁目22-1', mapQuery: '小樽経済センター',
    summary: '補助金活用の無料個別相談。中小・小規模事業者が対象で会員以外も参加可能。各日5事業者、1者45分程度。申込順・完全予約制です。',
    source: '小樽商工会議所', organizer: '小樽商工会議所', url: consultUrl,
    price: free, reservation: required, reservationRequired: true,
    translations: tr(
      ['Business Support Consultation', '經營支援個別諮詢', '经营支持个别咨询', '경영 지원 개별 상담'],
      ['Free small-business subsidy advice. Five 45-minute appointments per day; booking required.', '中小企業免費補助金諮詢，每天5組，每組約45分鐘，須預約。', '中小企业免费补助金咨询，每天5组，每组约45分钟，须预约。', '중소기업 무료 보조금 상담. 하루 5개 사업자, 각 약 45분, 예약 필수.'], econVenue),
  })),
  ...[
    ['2026-10-13', '三ツ山病院・グループホームくれよん'],
    ['2026-10-14', '野口病院・みらいサポート'],
    ['2026-10-15', 'ニチイケアセンター小樽'],
    ['2026-10-16', '島田脳神経外科・こだま交通'],
    ['2026-10-19', '新倉屋・小規模多機能ホームみんなの家'],
  ].map(([start, employers]) => event({
    id: `hellowork-otaru-employer-session-${start.replaceAll('-', '')}`, category: 'job', start,
    title: `ハローワーク小樽 会社説明会（${employers}）`,
    time: '9:30〜11:30', startTime: '09:30', endTime: '11:30',
    place: 'ハローワーク小樽2階 会議室', address: '北海道小樽市色内1丁目10-15', mapQuery: 'ハローワーク小樽 北海道小樽市色内1丁目10-15',
    summary: `${employers}の担当者に仕事内容を直接質問できます。予約不要、普段着・子ども同伴で参加できます。求人内容は変更される場合があります。`,
    source: '北海道労働局 ハローワーク小樽', organizer: 'ハローワーク小樽', url: hwUrl,
    reservation: walkIn, reservationRequired: false,
    translations: tr(
      [`Hello Work Otaru Employer Session (${employers})`, `Hello Work小樽企業說明會（${employers}）`, `Hello Work小樽企业说明会（${employers}）`, `헬로워크 오타루 기업 설명회 (${employers})`],
      ['Ask employers about their jobs. No booking; children welcome. Vacancies may change.', '可直接詢問工作內容，無須預約，歡迎攜子參加。職缺可能變更。', '可直接询问工作内容，无需预约，欢迎带孩子参加。职位可能变更。', '채용 담당자에게 업무를 직접 질문할 수 있습니다. 예약 없이 자녀 동반 가능. 채용 내용은 변경될 수 있습니다.'], hwVenue),
  })),
  event({
    id: 'hellowork-toyoko-inn-20261020', category: 'job', start: '2026-10-20',
    title: '東横イン小樽駅前 会社説明会', time: '9:30〜11:30頃', startTime: '09:30',
    timeTranslations: localized(['9:30〜11:30頃', '9:30 AM–approximately 11:30 AM JST', '9:30至約11:30（日本時間）', '9:30至约11:30（日本时间）', '9:30~11:30경 (일본 시간)']),
    place: 'ハローワーク小樽2階 会議室', address: '北海道小樽市色内1丁目10-15', mapQuery: 'ハローワーク小樽',
    summary: '2027年3月開業予定のホテルで働くスタッフ向け説明会。求人説明後に希望者の個別相談を実施。無料・予約不要、面接会ではありません。',
    source: '北海道労働局 ハローワーク小樽', organizer: 'ハローワーク小樽・東横イン小樽駅前', url: 'https://jsite.mhlw.go.jp/hokkaido-hellowork/list/otaru/kyushokusha/toyokoinn.html',
    price: free, reservation: walkIn, reservationRequired: false,
    translations: tr(['Toyoko Inn Otaru Station Employer Session', '東橫INN小樽站前企業說明會', '东横INN小樽站前企业说明会', '토요코인 오타루역 앞 채용 설명회'], ['Learn about hotel jobs and ask questions individually. Free, no booking; this is not a job interview.', '介紹飯店職缺並提供個別諮詢。免費、無須預約；並非面試會。', '介绍酒店职位并提供个别咨询。免费、无需预约；并非面试会。', '호텔 채용 안내 및 개별 상담. 무료, 예약 불필요. 채용 면접은 아닙니다.'], hwVenue),
  }),
  event({
    id: 'hellowork-saiseikai-20261021', category: 'job', start: '2026-10-21',
    title: '北海道済生会 小樽病院・みどりの里・はまなす 合同会社説明会', time: '9:30〜11:30', startTime: '09:30', endTime: '11:30',
    place: 'ハローワーク小樽2階 会議室', address: '北海道小樽市色内1丁目10-15', mapQuery: 'ハローワーク小樽',
    summary: '済生会の3施設の仕事内容などを個別に相談できる説明会。無料・予約不要で子ども同伴も歓迎。面接会ではありません。',
    source: '北海道労働局 ハローワーク小樽', organizer: 'ハローワーク小樽・北海道済生会', url: 'https://jsite.mhlw.go.jp/hokkaido-hellowork/list/otaru/jigyounushi/setsumeikai_080126_00001.html',
    price: free, reservation: walkIn, reservationRequired: false,
    translations: tr(['Hokkaido Saiseikai Joint Employer Session', '北海道濟生會聯合企業說明會', '北海道济生会联合企业说明会', '홋카이도 사이세이카이 합동 채용 설명회'], ['Ask about jobs at Otaru Hospital, Midori-no-Sato and Hamanasu. Free, no booking; children welcome. Not an interview.', '可詢問小樽病院、みどりの里及はまなす的職缺。免費、無須預約，可攜子參加；並非面試。', '可咨询小樽病院、みどりの里及はまなす的职位。免费、无需预约，可带孩子参加；并非面试。', '오타루병원·미도리노사토·하마나스의 채용 상담. 무료, 예약 없이 자녀 동반 가능. 면접은 아닙니다.'], hwVenue),
  }),
  event({
    id: 'otaru-new-employee-training-20261022', category: 'business', start: '2026-10-22',
    title: '令和8年度 新入社員研修', time: '10:00〜16:00', startTime: '10:00', endTime: '16:00',
    place: '小樽市保健所 講堂（ウイングベイ小樽1番街4階）', address: '北海道小樽市築港11-1', mapQuery: '小樽市保健所 ウイングベイ小樽',
    summary: '市内事業所に入社後おおむね3年以内の方が、セルフケアやコミュニケーションなどを学ぶ無料研修。公式の申込期限は10月8日で終了しています。',
    source: '小樽市雇用促進協会・小樽市', organizer: '小樽市雇用促進協会', url: 'https://www.city.otaru.lg.jp/docs/2026081000034/',
    price: free, reservationRequired: true, reservationStatus: 'closed',
    reservation: localized(['申込期限終了（10月8日）。追加受入の可否は主催者へ確認。', 'Registration deadline passed (October 8). Ask the organizer about late admission.', '報名期限已於10月8日結束；補報請洽主辦單位。', '报名截止日为10月8日，已过期；补报请咨询主办方。', '신청 마감일(10월 8일)이 지났습니다. 추가 접수는 주최 측에 문의하세요.']),
    translations: tr(['New Employee Training', '新進員工研修', '新员工培训', '신입사원 연수'], ['Free self-care and communication training for staff within roughly three years of joining an Otaru workplace. Registration closed October 8.', '面向入職小樽企業約3年內員工的免費自我照顧與溝通研修。10月8日報名截止。', '面向入职小樽企业约3年内员工的免费自我照顾与沟通培训。10月8日报名截止。', '오타루 사업장 입사 약 3년 이내 직원을 위한 무료 자기 관리·소통 연수. 신청은 10월 8일 마감.'], ['Otaru Public Health Center auditorium; Wing Bay Otaru, Building 1, 4F', '小樽市保健所講堂，Wing Bay Otaru 1號館4樓', '小樽市保健所讲堂，Wing Bay Otaru 1号馆4楼', '오타루시 보건소 강당, 윙베이 오타루 1번관 4층']),
  }),
];
