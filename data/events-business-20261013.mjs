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
const appealRegistrationUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSeL2uQ6_xofCuWOoicK0NBBbvzJ2ljiyn9RRteTiDyplKFKCQ/viewform';
// Session topics checked against both pages of the Chamber flyer and the
// organizer's individual notice on 2026-10-26. Existing IDs/URLs are retained.
const appealSessions = [
  {
    start: '2026-10-20', topic: '採用・定着を成功させる「理解」のマネジメント', lecturer: '佐藤大輔',
    names: ['Employer Communications 1: Recruitment and Retention Management', '企業魅力傳播①：招募與留才管理', '企业魅力传播①：招聘与留人管理', '기업 매력 발신 ① 채용·근속을 위한 경영'],
    summaries: ['採用だけでなく、従業員の定着につながる組織運営や経営の見直しを学びます。', 'Explore how management practices can improve both recruitment and employee retention.', '學習如何檢視組織管理與經營方式，同時改善招募與員工留任。', '学习如何审视组织管理和经营方式，同时改善招聘与员工留任。', '채용과 직원의 장기 근속을 함께 개선하는 조직 운영·경영 방법을 배웁니다.'],
  },
  {
    start: '2026-10-29', topic: 'ミスマッチを起こさない求人票の作り方', lecturer: '藤塚優子',
    names: ['Employer Communications 2: Writing Clear Job Advertisements', '企業魅力傳播②：減少人職落差的徵才文案', '企业魅力传播②：减少人岗不符的招聘文案', '기업 매력 발신 ② 채용 불일치를 줄이는 구인 공고 작성'],
    summaries: ['仕事内容や求める人物像、自社の強みを具体的に伝え、採用後のミスマッチを減らす求人票の作り方を学びます。', 'Learn to write job advertisements that explain duties, desired skills and company strengths clearly, reducing mismatches after hiring.', '學習具體說明工作內容、人才條件與企業優勢，減少錄用後的人職落差。', '学习清楚说明工作内容、人才要求和企业优势，减少录用后的人岗不符。', '업무·인재상·기업의 강점을 구체적으로 전달해 입사 후 불일치를 줄이는 구인 공고 작성법을 배웁니다.'],
  },
  {
    start: '2026-11-05', topic: 'スマホ撮影 人をうまく撮る方法', lecturer: '森谷亮介',
    names: ['Employer Communications 3: Smartphone Photography of People', '企業魅力傳播③：手機人物攝影', '企业魅力传播③：手机人物摄影', '기업 매력 발신 ③ 스마트폰 인물 촬영'],
    summaries: ['表情・構図・距離・光を生かした人物撮影を学び、社員や働く姿の写真・動画を採用広報やSNSに役立てます。', 'Learn about expressions, composition, distance and light when photographing people, and use workplace photos and videos in recruitment and social media.', '學習人物表情、構圖、距離與光線的運用，將員工與工作場景的照片、影片用於徵才及社群傳播。', '学习人物表情、构图、距离和光线的运用，将员工与工作场景的照片、视频用于招聘和社交媒体传播。', '표정·구도·거리·빛을 활용한 인물 촬영을 배우고 직원과 일하는 모습의 사진·영상을 채용 홍보와 SNS에 활용합니다.'],
  },
  {
    start: '2026-11-12', topic: '採用サイト×SNSの情報発信', lecturer: '滝澤愛莉',
    names: ['Employer Communications 4: Recruitment Websites and Social Media', '企業魅力傳播④：徵才網站與社群經營', '企业魅力传播④：招聘网站与社交媒体', '기업 매력 발신 ④ 채용 사이트와 SNS 홍보'],
    summaries: ['会社の日常から魅力を見つけ、採用サイトとSNSの役割や組み合わせを考えます。誰に何を伝えるかを整理し、自社に合う採用広報を学びます。', 'Discover stories in everyday company life and learn how recruitment websites and social media can work together for the right audience.', '從企業日常發掘特色，釐清傳播對象與內容，學習搭配徵才網站及社群平台進行合適的招募宣傳。', '从企业日常发现特色，明确传播对象与内容，学习结合招聘网站和社交平台开展适合本企业的招聘宣传。', '기업의 일상에서 강점을 찾고 대상과 메시지를 정리해 채용 사이트와 SNS를 함께 활용하는 홍보 방법을 배웁니다.'],
  },
];
function appealCopy(session, i) {
  const participation = i === 2
    ? ['会場参加のみ。', 'In person only.', '僅限現場參加。', '仅限现场参加。', '현장 참가만 가능합니다.']
    : ['会場またはZoomで参加できます。', 'Attend in person or via Zoom.', '可現場或透過Zoom參加。', '可现场或通过Zoom参加。', '현장 또는 Zoom으로 참가할 수 있습니다.'];
  const summaries = session.summaries.map((text, lang) => `${text} ${[
    `講師は${session.lecturer}氏。無料、各回20人、要事前申込。`,
    `Speaker: ${session.lecturer}. Free; 20 places per session; advance booking required.`,
    `講師：${session.lecturer}。免費，每場20人，須事先報名。`,
    `讲师：${session.lecturer}。免费，每场20人，须提前报名。`,
    `강사: ${session.lecturer}. 무료, 회당 20명, 사전 신청 필수.`,
  ][lang]} ${participation[lang]}`);
  return {
    summaries,
    reservation: localized([
      '事前申込、定員に達し次第受付終了。参加する回と参加方法を選択します。受講には後日のアンケート調査への協力同意が必要です。公式フォーム、電話0134-26-6587、FAX0134-26-6588、メールinfo@otaru-koyou.jpから申込できます。',
      'Book in advance; registration closes when capacity is reached. Select the session and attendance method. Participation requires agreement to a follow-up survey. Apply via the official form, telephone 0134-26-6587, fax 0134-26-6588 or email info@otaru-koyou.jp.',
      '須事先報名，額滿截止。請選擇場次與參加方式，並同意配合後續問卷調查。可透過官方表單、電話0134-26-6587、傳真0134-26-6588或電子郵件info@otaru-koyou.jp報名。',
      '须提前报名，额满截止。请选择场次与参加方式，并同意配合后续问卷调查。可通过官方表单、电话0134-26-6587、传真0134-26-6588或电子邮件info@otaru-koyou.jp报名。',
      '사전 신청이 필요하며 정원이 차면 마감합니다. 회차와 참가 방식을 선택하고 후속 설문 조사에 협조하는 데 동의해야 합니다. 공식 양식, 전화 0134-26-6587, 팩스 0134-26-6588 또는 이메일 info@otaru-koyou.jp로 신청할 수 있습니다.',
    ]),
    descriptions: summaries.map((text, lang) => `${text} ${i === 2 ? '' : [
      'Zoomの参加方法は申込後に主催者から案内されます。',
      'The organizer provides Zoom access details after registration.',
      '主辦單位將於報名後提供Zoom參加方式。',
      '主办方将在报名后提供Zoom参加方式。',
      'Zoom 접속 방법은 신청 후 주최 측에서 안내합니다.',
    ][lang]}`.trim()),
  };
}

export default [
  ...appealSessions.map((session, i) => {
    const start = session.start;
    const content = appealCopy(session, i);
    const translations = tr(session.names, content.summaries.slice(1), wingVenue);
    langs.forEach((lang, index) => { translations[lang].description = content.descriptions[index + 1]; });
    return event({
    id: `otaru-employer-appeal-${start.replaceAll('-', '')}`, category: 'business', start,
    title: `魅力発信力向上セミナー 第${i + 1}回｜${session.topic}`,
    time: '14:00〜16:00', startTime: '14:00', endTime: '16:00',
    place: '小樽市勤労女性センター 大ホール（ウイングベイ小樽1番街4階）',
    address: '北海道小樽市築港11-1', mapQuery: '小樽市勤労女性センター ウイングベイ小樽',
    summary: content.summaries[0], description: content.descriptions[0],
    source: '小樽地域雇用創造協議会・小樽商工会議所', organizer: '小樽地域雇用創造協議会', url: appealUrl,
    registrationUrl: appealRegistrationUrl,
    price: free, reservation: content.reservation, reservationRequired: true, reservationStatus: 'required',
    audience: localized(['小樽地域の企業・事業主・従業員、創業希望者、小樽市内で新規事業や事業所拡大を検討する企業', 'Otaru-area business owners and staff, prospective entrepreneurs, and businesses considering new operations or expansion in Otaru', '小樽地區企業經營者與員工、計畫創業者，以及考慮在小樽開展或擴展業務的企業', '小樽地区企业经营者与员工、计划创业者，以及考虑在小樽开展或扩展业务的企业', '오타루 지역 기업의 사업주·직원, 창업 희망자, 오타루 내 신규 사업·사업장 확대를 검토하는 기업']),
    sourceCheckedAt: '2026-10-26', updatedAt: '2026-10-26',
    translations,
    });
  }),
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
