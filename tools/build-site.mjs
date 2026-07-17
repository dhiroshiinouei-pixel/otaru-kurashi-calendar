import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const origin = 'https://otaru.spady.net';
const today = '2026-07-17';
const defaultMonth = { year: 2026, month: 6 };
const buildDate = '2026-07-17';
const cssVersion = '20260717-i18n';
const ogImage = `${origin}/assets/og-image-20260713.jpg`;

const readJson = (file) => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const rawEvents = readJson('data/events.json');
const rawOngoing = readJson('data/ongoing.json');
const garbageRegions = readJson('data/garbage-regions.json');
const garbagePatterns = readJson('data/garbage-patterns.json');
const population = readJson('data/population.json');

const langOrder = ['ja', 'en', 'zh-Hant', 'zh-Hans', 'ko'];
const langConfig = {
  ja: {
    code: 'ja',
    path: '',
    label: '日本語',
    shortLabel: '日本語',
    ogLocale: 'ja_JP',
    htmlLang: 'ja',
    dir: '',
    dateLocale: 'ja-JP',
    title: '小樽暮らしカレンダー｜イベント・子育て・求人・地域情報',
    description: '小樽で開催されるイベント、親子向け企画、求人、ビジネス、市政・ごみ収集などの地域情報を日付とカテゴリーから探せるカレンダーです。小樽市や主催者の公式情報を整理して掲載します。',
    siteName: '小樽暮らしカレンダー',
  },
  en: {
    code: 'en',
    path: 'en',
    label: 'English',
    shortLabel: 'English',
    ogLocale: 'en_US',
    htmlLang: 'en',
    dir: 'en',
    dateLocale: 'en-US',
    title: 'Otaru Events Calendar | Local Events, Family Activities and Community Information',
    description: 'Find events in Otaru, Hokkaido, including family activities, local festivals, jobs, business seminars and community information. Dates, venues and official links are organized from Japanese public sources.',
    siteName: 'Otaru Events Calendar',
  },
  'zh-Hant': {
    code: 'zh-Hant',
    path: 'zh-hant',
    label: '繁體中文',
    shortLabel: '繁體中文',
    ogLocale: 'zh_TW',
    htmlLang: 'zh-Hant',
    dir: 'zh-hant',
    dateLocale: 'zh-TW',
    title: '小樽活動日曆｜親子活動、在地活動與生活資訊',
    description: '查找北海道小樽的活動、親子企劃、在地生活資訊、求職與商務講座。本站整理小樽市與主辦單位的日文官方資訊，提供日期、會場與官方連結。',
    siteName: '小樽活動日曆',
  },
  'zh-Hans': {
    code: 'zh-Hans',
    path: 'zh-hans',
    label: '简体中文',
    shortLabel: '简体中文',
    ogLocale: 'zh_CN',
    htmlLang: 'zh-Hans',
    dir: 'zh-hans',
    dateLocale: 'zh-CN',
    title: '小樽活动日历｜亲子活动、当地活动与生活信息',
    description: '查找北海道小樽的活动、亲子企划、当地生活信息、求职与商务讲座。本站整理小樽市及主办方的日文官方信息，提供日期、会场和官方链接。',
    siteName: '小樽活动日历',
  },
  ko: {
    code: 'ko',
    path: 'ko',
    label: '한국어',
    shortLabel: '한국어',
    ogLocale: 'ko_KR',
    htmlLang: 'ko',
    dir: 'ko',
    dateLocale: 'ko-KR',
    title: '오타루 행사 캘린더｜지역 행사·가족 체험·생활 정보',
    description: '홋카이도 오타루의 행사, 가족 체험, 지역 생활 정보, 채용 및 비즈니스 세미나를 날짜와 장소별로 확인하세요. 일본어 공식 발표를 바탕으로 정리한 안내입니다.',
    siteName: '오타루 행사 캘린더',
  },
};

const copy = {
  ja: {
    topnote: '小樽市・主催者などの公式情報をもとに、暮らしに役立つ予定を整理しています。',
    splashSub: '子育て / 求人 / イベント / ビジネス / 市政',
    navCalendar: 'カレンダー',
    navGarbage: 'ごみ収集',
    navAkindo: 'AKINDO Lab',
    navPrivacy: 'プライバシー',
    navSpady: 'Spady公式 ↗',
    languageLabel: '表示言語',
    heroKicker: 'OTARU KURASHI CALENDAR',
    heroTitle: '小樽で今日、今週、今月に使える情報を。',
    heroText: '小樽市のイベント、子育て、求人、ビジネス、市政・選挙、ごみ収集情報を、日付とカテゴリーから探せる地域情報カレンダーです。',
    intro: '北海道小樽市で開催されるイベント、親子で参加できる企画、求人・就職情報、地域事業者向けの勉強会、市政・選挙、ごみ収集情報を、公式情報へのリンクとあわせて整理しています。旅行者にも地域住民にも、今後実際に利用できる情報が見つかることを目指しています。',
    population: (n, label) => `小樽市の人口 ${n}人（${label}）`,
    source: '出典：小樽市',
    calendarTitle1: 'OTARU',
    calendarTitle2: 'CALENDAR',
    calendarCopy: 'カレンダー上の日付を押すと、その日の予定をまとめて確認できます。',
    prev: '前月',
    next: '次月',
    today: '今日',
    filters: { all: 'すべて', child: '子育て', job: '求人', event: 'イベント', business: 'ビジネス', civic: '市政・選挙' },
    weekdays: ['日', '月', '火', '水', '木', '金', '土'],
    monthlyTitle: '表示月の主な情報',
    monthlyLead: '単発イベント、継続的に使える行政・生活情報をまとめています。',
    count: (n) => n ? `${n}件の情報を表示中` : '該当する情報はありません',
    official: '公式ページ ↗',
    sourceLabel: '情報元',
    checkedLabel: '情報確認日',
    updatedLabel: '最終更新日',
    details: '詳細ページ',
    detailsArrow: '詳細ページへ',
    calendarAdd: 'Googleカレンダーに追加',
    mapOpen: 'Googleマップで開く',
    place: '場所',
    noEventsDay: 'この日に登録されている情報はありません。',
    dayInfo: 'この日の情報',
    items: (n) => `件数：${n}件`,
    mapEmpty: 'この情報は会場が未確定、または複数会場です。公式情報をご確認ください。',
    noEndTime: '終了時間：公式情報に記載なし（登録画面では仮に1時間の枠で表示）',
    garbageEyebrow: 'PUBLIC INFORMATION',
    garbageTitle: 'ごみ収集日の検索',
    garbageText: '地区名と日付を入力すると、2026年版の小樽市ごみ収集カレンダーをもとに収集予定を確認できます。',
    garbageRegion: '地区名',
    garbageRegionPlaceholder: '例：銭函、稲穂、朝里',
    garbageDate: '確認したい日付',
    garbageSearch: 'ごみの日を確認',
    garbageEmpty: '地区と日付を入力してください。',
    garbageOfficial: '公式ページで地区別PDFを確認 ↗',
    garbageNoCollection: '本日の収集予定はありません',
    garbageNoCollectionNote: '祝日・臨時変更などは公式PDFもご確認ください。',
    garbageYearNote: '現在の試作版は2026年の公式収集カレンダーに対応しています。',
    civicTitle: '小樽市議会・選挙アーカイブ',
    civicLead: '市政・選挙を選択したときだけ表示される、公式情報への入口です。',
    akindoEyebrow: 'LOCAL BUSINESS LEARNING',
    akindoTitle: 'AKINDO Lab by Spady',
    akindoText: '小樽発、地域事業者のためのデジタル集客勉強会。Instagram、LINE公式アカウント、Googleビジネスプロフィール、Meta広告、AI活用などを、地域のお店や中小企業が無理なく使える形で学びます。',
    akindoButton: 'AKINDO Labの詳細を見る ↗',
    policyTitle: '掲載方針',
    policyText: '小樽市、北海道、主催者、公共機関などの公式発表を優先して整理しています。本サイトは小樽市や行政機関の公式サイトではなく、Spadyが公開情報を確認して編集している地域情報サイトです。',
    operatorTitle: '運営者情報',
    operatorText: '運営：Spady。北海道小樽市・銭函を拠点に、地域事業者のマーケティング支援と情報発信を行っています。',
    footerNotice: '本サイトは小樽市や行政機関の公式サイトではありません。公開情報を整理した民間運営のカレンダーです。',
    backHome: '一覧へ戻る',
    eventSummaryHeading: 'イベント概要',
    eventFactsHeading: '基本情報',
    officialName: '日本語の正式名称',
    dateTime: '開催日時',
    venue: '会場',
    address: '住所',
    audience: '対象者',
    price: '料金',
    reservation: '予約',
    organizer: '主催者',
    status: '状態',
    related: '関連する情報',
    ended: '終了済み',
    scheduled: '開催予定',
    cancelled: '中止',
    soldOut: '受付終了・満席',
    reservationRequired: '予約・申込が必要',
    reservationNotRequired: '予約不要',
    reservationUnknown: '公式情報をご確認ください',
    priceUnknown: '公式情報をご確認ください',
    free: '無料',
    targetGeneric: '小樽市民・来訪者',
    privacyHeading: 'プライバシーポリシー',
    privacyLead: 'Spadyは、お問い合わせ等を通じて取得する個人情報を、以下の方針にもとづいて取り扱います。',
    notFoundTitle: 'ページが見つかりません',
    notFoundText: 'URLが変更された可能性があります。トップページから目的の情報を探してください。',
  },
  en: {
    topnote: 'Local information organized from official announcements by Otaru City and event organizers.',
    splashSub: 'FAMILY / JOBS / EVENTS / BUSINESS / CIVIC',
    navCalendar: 'Calendar',
    navGarbage: 'Waste pickup',
    navAkindo: 'AKINDO Lab',
    navPrivacy: 'Privacy',
    navSpady: 'Spady ↗',
    languageLabel: 'Language',
    heroKicker: 'OTARU EVENTS CALENDAR',
    heroTitle: 'Find what is happening in Otaru today, this week and this month.',
    heroText: 'A local calendar for Otaru events, family activities, jobs, business seminars, civic information and waste collection.',
    intro: 'This calendar organizes events in Otaru, Hokkaido, family-friendly activities, job and career information, local business seminars, civic information and waste collection schedules. It links to official Japanese sources so residents and visitors can check dates, venues and details.',
    population: (n, label) => `Population of Otaru: ${n} (${label})`,
    source: 'Source: Otaru City',
    calendarTitle1: 'OTARU',
    calendarTitle2: 'CALENDAR',
    calendarCopy: 'Select a date to see events and local information for that day.',
    prev: 'Previous month',
    next: 'Next month',
    today: 'Today',
    filters: { all: 'All', child: 'Family', job: 'Jobs', event: 'Events', business: 'Business', civic: 'Civic / Elections' },
    weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    monthlyTitle: 'Main information for the selected month',
    monthlyLead: 'Includes one-time events and public information that remains useful during the month.',
    count: (n) => n ? `${n} items shown` : 'No matching information found',
    official: 'Official page ↗',
    sourceLabel: 'Source',
    checkedLabel: 'Source checked',
    updatedLabel: 'Last updated',
    details: 'Event details',
    detailsArrow: 'View details',
    calendarAdd: 'Add to Google Calendar',
    mapOpen: 'Open in Google Maps',
    place: 'Venue',
    noEventsDay: 'No information is registered for this date.',
    dayInfo: 'Information for this date',
    items: (n) => `${n} item(s)`,
    mapEmpty: 'The venue is not fixed or the event uses multiple venues. Please check the official information.',
    noEndTime: 'End time is not listed in the official information. Google Calendar opens with a temporary one-hour slot.',
    garbageEyebrow: 'PUBLIC INFORMATION',
    garbageTitle: 'Waste collection lookup',
    garbageText: 'Enter an Otaru district name and a date to check the 2026 municipal waste collection schedule.',
    garbageRegion: 'District name',
    garbageRegionPlaceholder: 'Example: Zenibako, Inaho, Asari',
    garbageDate: 'Date to check',
    garbageSearch: 'Check collection day',
    garbageEmpty: 'Please enter a district and date.',
    garbageOfficial: 'Check the official district PDF ↗',
    garbageNoCollection: 'No scheduled collection for this date',
    garbageNoCollectionNote: 'Please also check the official PDF for holiday or temporary changes.',
    garbageYearNote: 'This trial lookup currently supports the 2026 official collection calendar.',
    civicTitle: 'Otaru City Council and election archive',
    civicLead: 'Official links shown only when Civic / Elections is selected.',
    akindoEyebrow: 'LOCAL BUSINESS LEARNING',
    akindoTitle: 'AKINDO Lab by Spady',
    akindoText: 'AKINDO Lab by Spady is a digital marketing study session for local businesses in Otaru. It covers Instagram, LINE Official Account, Google Business Profile, Meta ads, AI and website booking flows in practical terms.',
    akindoButton: 'View AKINDO Lab details ↗',
    policyTitle: 'Editorial policy',
    policyText: 'This site prioritizes official announcements from Otaru City, Hokkaido, organizers and public institutions. It is not an official Otaru City or government website; Spady organizes publicly available information.',
    operatorTitle: 'Operator',
    operatorText: 'Operated by Spady, based in Zenibako, Otaru, Hokkaido. Spady supports local businesses with marketing and information design.',
    footerNotice: 'This is not an official Otaru City or government website. It is a privately operated calendar that organizes public information.',
    backHome: 'Back to calendar',
    eventSummaryHeading: 'Event summary',
    eventFactsHeading: 'Details',
    officialName: 'Official Japanese name',
    dateTime: 'Date and time',
    venue: 'Venue',
    address: 'Address',
    audience: 'Audience',
    price: 'Price',
    reservation: 'Reservation',
    organizer: 'Organizer',
    status: 'Status',
    related: 'Related information',
    ended: 'Ended',
    scheduled: 'Scheduled',
    cancelled: 'Cancelled',
    soldOut: 'Full / registration closed',
    reservationRequired: 'Reservation or application required',
    reservationNotRequired: 'No reservation required',
    reservationUnknown: 'Please check the official information',
    priceUnknown: 'Please check the official information',
    free: 'Free',
    targetGeneric: 'Otaru residents and visitors',
    privacyHeading: 'Privacy Policy',
    privacyLead: 'Spady handles personal information received through inquiries according to the following policy.',
    notFoundTitle: 'Page not found',
    notFoundText: 'The URL may have changed. Please return to the calendar and look for the information you need.',
  },
  'zh-Hant': {
    topnote: '依據小樽市與主辦單位等官方發布資訊整理。',
    splashSub: '親子 / 求職 / 活動 / 商務 / 市政',
    navCalendar: '日曆',
    navGarbage: '垃圾收集',
    navAkindo: 'AKINDO Lab',
    navPrivacy: '隱私權',
    navSpady: 'Spady官方 ↗',
    languageLabel: '語言',
    heroKicker: '小樽活動日曆',
    heroTitle: '查找小樽今天、本週與本月可參加的活動。',
    heroText: '整理小樽活動、親子企劃、求職、商務、市政選舉與垃圾收集資訊的在地日曆。',
    intro: '本日曆整理北海道小樽市的活動、親子企劃、求職與就業資訊、在地商務講座、市政選舉與垃圾收集資訊，並附上日文官方來源連結，方便居民與旅客確認日期、會場和詳細內容。',
    population: (n, label) => `小樽市人口 ${n}人（${label}）`,
    source: '來源：小樽市',
    calendarTitle1: 'OTARU',
    calendarTitle2: 'CALENDAR',
    calendarCopy: '點選日曆日期即可查看當天的活動與生活資訊。',
    prev: '上個月',
    next: '下個月',
    today: '今天',
    filters: { all: '全部', child: '親子', job: '求職', event: '活動', business: '商務', civic: '市政・選舉' },
    weekdays: ['日', '一', '二', '三', '四', '五', '六'],
    monthlyTitle: '顯示月份的主要資訊',
    monthlyLead: '整理單次活動與當月仍可使用的公共生活資訊。',
    count: (n) => n ? `顯示 ${n} 筆資訊` : '沒有符合條件的資訊',
    official: '官方頁面 ↗',
    sourceLabel: '資訊來源',
    checkedLabel: '確認日期',
    updatedLabel: '最後更新',
    details: '活動詳細',
    detailsArrow: '查看詳細',
    calendarAdd: '加入 Google 日曆',
    mapOpen: '用 Google 地圖開啟',
    place: '會場',
    noEventsDay: '這一天沒有登錄的資訊。',
    dayInfo: '當日資訊',
    items: (n) => `共 ${n} 筆`,
    mapEmpty: '會場尚未確定或有多個會場，請確認官方資訊。',
    noEndTime: '官方資訊未列出結束時間。Google 日曆會暫以一小時顯示。',
    garbageEyebrow: '生活資訊',
    garbageTitle: '垃圾收集日查詢',
    garbageText: '輸入小樽地區名稱與日期，即可依據2026年官方垃圾收集日曆查詢。',
    garbageRegion: '地區名稱',
    garbageRegionPlaceholder: '例：銭函、稲穂、朝里',
    garbageDate: '查詢日期',
    garbageSearch: '查詢收集日',
    garbageEmpty: '請輸入地區與日期。',
    garbageOfficial: '查看官方地區PDF ↗',
    garbageNoCollection: '本日沒有預定收集',
    garbageNoCollectionNote: '節假日或臨時變更請另行確認官方PDF。',
    garbageYearNote: '此試用查詢目前支援2026年官方收集日曆。',
    civicTitle: '小樽市議會・選舉資料',
    civicLead: '只有選擇市政・選舉時才顯示的官方資訊入口。',
    akindoEyebrow: '在地商務學習',
    akindoTitle: 'AKINDO Lab by Spady',
    akindoText: 'AKINDO Lab by Spady 是小樽在地事業者的數位集客學習會，主題包含 Instagram、LINE官方帳號、Google商家檔案、Meta廣告、AI與網站預約導線。',
    akindoButton: '查看 AKINDO Lab 詳細 ↗',
    policyTitle: '刊載方針',
    policyText: '本站優先整理小樽市、北海道、主辦單位與公共機關的官方發布資訊。本站不是小樽市或行政機關官方網站，而是由 Spady 整理公開資訊的民間網站。',
    operatorTitle: '營運者資訊',
    operatorText: '營運：Spady。以北海道小樽市銭函為據點，支援在地事業者的行銷與資訊傳達。',
    footerNotice: '本站不是小樽市或行政機關官方網站，而是整理公開資訊的民間營運日曆。',
    backHome: '返回日曆',
    eventSummaryHeading: '活動概要',
    eventFactsHeading: '基本資訊',
    officialName: '日文正式名稱',
    dateTime: '日期與時間',
    venue: '會場',
    address: '地址',
    audience: '對象',
    price: '費用',
    reservation: '預約',
    organizer: '主辦者',
    status: '狀態',
    related: '相關資訊',
    ended: '已結束',
    scheduled: '預定舉辦',
    cancelled: '中止',
    soldOut: '已額滿／報名結束',
    reservationRequired: '需要預約或報名',
    reservationNotRequired: '不需預約',
    reservationUnknown: '請確認官方資訊',
    priceUnknown: '請確認官方資訊',
    free: '免費',
    targetGeneric: '小樽市民與旅客',
    privacyHeading: '隱私權政策',
    privacyLead: 'Spady 依據以下方針處理透過諮詢等取得的個人資訊。',
    notFoundTitle: '找不到頁面',
    notFoundText: 'URL 可能已變更。請返回日曆查找需要的資訊。',
  },
  'zh-Hans': {
    topnote: '依据小樽市与主办方等官方发布信息整理。',
    splashSub: '亲子 / 求职 / 活动 / 商务 / 市政',
    navCalendar: '日历',
    navGarbage: '垃圾收集',
    navAkindo: 'AKINDO Lab',
    navPrivacy: '隐私政策',
    navSpady: 'Spady官方 ↗',
    languageLabel: '语言',
    heroKicker: '小樽活动日历',
    heroTitle: '查找小樽今天、本周和本月可参加的活动。',
    heroText: '整理小樽活动、亲子企划、求职、商务、市政选举与垃圾收集信息的当地日历。',
    intro: '本日历整理北海道小樽市的活动、亲子企划、求职就业信息、当地商务讲座、市政选举与垃圾收集信息，并附上日文官方来源链接，方便居民和游客确认日期、会场和详情。',
    population: (n, label) => `小樽市人口 ${n}人（${label}）`,
    source: '来源：小樽市',
    calendarTitle1: 'OTARU',
    calendarTitle2: 'CALENDAR',
    calendarCopy: '点击日历日期即可查看当天的活动与生活信息。',
    prev: '上个月',
    next: '下个月',
    today: '今天',
    filters: { all: '全部', child: '亲子', job: '求职', event: '活动', business: '商务', civic: '市政・选举' },
    weekdays: ['日', '一', '二', '三', '四', '五', '六'],
    monthlyTitle: '显示月份的主要信息',
    monthlyLead: '整理单次活动与当月仍可使用的公共生活信息。',
    count: (n) => n ? `显示 ${n} 条信息` : '没有符合条件的信息',
    official: '官方页面 ↗',
    sourceLabel: '信息来源',
    checkedLabel: '确认日期',
    updatedLabel: '最后更新',
    details: '活动详情',
    detailsArrow: '查看详情',
    calendarAdd: '添加到 Google 日历',
    mapOpen: '用 Google 地图打开',
    place: '会场',
    noEventsDay: '这一天没有登记的信息。',
    dayInfo: '当天信息',
    items: (n) => `共 ${n} 条`,
    mapEmpty: '会场尚未确定或有多个会场，请确认官方信息。',
    noEndTime: '官方信息未列出结束时间。Google 日历会暂以一小时显示。',
    garbageEyebrow: '生活信息',
    garbageTitle: '垃圾收集日查询',
    garbageText: '输入小樽地区名称与日期，即可依据2026年官方垃圾收集日历查询。',
    garbageRegion: '地区名称',
    garbageRegionPlaceholder: '例：銭函、稲穂、朝里',
    garbageDate: '查询日期',
    garbageSearch: '查询收集日',
    garbageEmpty: '请输入地区和日期。',
    garbageOfficial: '查看官方地区PDF ↗',
    garbageNoCollection: '本日没有预定收集',
    garbageNoCollectionNote: '节假日或临时变更请另行确认官方PDF。',
    garbageYearNote: '此试用查询目前支持2026年官方收集日历。',
    civicTitle: '小樽市议会・选举资料',
    civicLead: '只有选择市政・选举时才显示的官方信息入口。',
    akindoEyebrow: '当地商务学习',
    akindoTitle: 'AKINDO Lab by Spady',
    akindoText: 'AKINDO Lab by Spady 是面向小樽当地经营者的数字集客学习会，主题包括 Instagram、LINE官方账号、Google商家资料、Meta广告、AI与网站预约动线。',
    akindoButton: '查看 AKINDO Lab 详情 ↗',
    policyTitle: '刊载方针',
    policyText: '本站优先整理小樽市、北海道、主办方和公共机构的官方发布信息。本站不是小樽市或行政机构官方网站，而是由 Spady 整理公开信息的民间网站。',
    operatorTitle: '运营者信息',
    operatorText: '运营：Spady。以北海道小樽市钱函为据点，支持当地经营者的营销与信息发布。',
    footerNotice: '本站不是小樽市或行政机构官方网站，而是整理公开信息的民间运营日历。',
    backHome: '返回日历',
    eventSummaryHeading: '活动概要',
    eventFactsHeading: '基本信息',
    officialName: '日文正式名称',
    dateTime: '日期与时间',
    venue: '会场',
    address: '地址',
    audience: '对象',
    price: '费用',
    reservation: '预约',
    organizer: '主办方',
    status: '状态',
    related: '相关信息',
    ended: '已结束',
    scheduled: '预定举办',
    cancelled: '取消',
    soldOut: '已满／报名结束',
    reservationRequired: '需要预约或报名',
    reservationNotRequired: '无需预约',
    reservationUnknown: '请确认官方信息',
    priceUnknown: '请确认官方信息',
    free: '免费',
    targetGeneric: '小樽市民与游客',
    privacyHeading: '隐私政策',
    privacyLead: 'Spady 根据以下方针处理通过咨询等取得的个人信息。',
    notFoundTitle: '找不到页面',
    notFoundText: 'URL 可能已更改。请返回日历查找需要的信息。',
  },
  ko: {
    topnote: '오타루시와 주최자 등의 공식 발표를 바탕으로 정리한 지역 정보입니다.',
    splashSub: '가족 / 채용 / 행사 / 비즈니스 / 시정',
    navCalendar: '캘린더',
    navGarbage: '쓰레기 수거',
    navAkindo: 'AKINDO Lab',
    navPrivacy: '개인정보',
    navSpady: 'Spady 공식 ↗',
    languageLabel: '언어',
    heroKicker: '오타루 행사 캘린더',
    heroTitle: '오타루에서 오늘, 이번 주, 이번 달에 할 일을 찾아보세요.',
    heroText: '오타루 행사, 가족 체험, 채용, 비즈니스, 시정·선거, 쓰레기 수거 정보를 날짜와 카테고리로 찾는 지역 캘린더입니다.',
    intro: '홋카이도 오타루시의 행사, 가족 체험, 채용·취업 정보, 지역 사업자 세미나, 시정·선거, 쓰레기 수거 정보를 일본어 공식 자료 링크와 함께 정리했습니다. 주민과 여행자가 날짜, 장소, 상세 정보를 쉽게 확인할 수 있도록 구성했습니다.',
    population: (n, label) => `오타루시 인구 ${n}명（${label}）`,
    source: '출처: 오타루시',
    calendarTitle1: 'OTARU',
    calendarTitle2: 'CALENDAR',
    calendarCopy: '날짜를 선택하면 해당일의 행사와 생활 정보를 확인할 수 있습니다.',
    prev: '이전 달',
    next: '다음 달',
    today: '오늘',
    filters: { all: '전체', child: '가족', job: '채용', event: '행사', business: '비즈니스', civic: '시정・선거' },
    weekdays: ['일', '월', '화', '수', '목', '금', '토'],
    monthlyTitle: '선택한 달의 주요 정보',
    monthlyLead: '단발성 행사와 해당 월에 이용할 수 있는 공공·생활 정보를 정리했습니다.',
    count: (n) => n ? `${n}건 표시 중` : '조건에 맞는 정보가 없습니다',
    official: '공식 페이지 ↗',
    sourceLabel: '정보 출처',
    checkedLabel: '확인일',
    updatedLabel: '최종 업데이트',
    details: '행사 상세',
    detailsArrow: '상세 보기',
    calendarAdd: 'Google 캘린더에 추가',
    mapOpen: 'Google 지도에서 열기',
    place: '장소',
    noEventsDay: '이 날짜에 등록된 정보가 없습니다.',
    dayInfo: '이 날짜의 정보',
    items: (n) => `${n}건`,
    mapEmpty: '장소가 확정되지 않았거나 여러 장소에서 열립니다. 공식 정보를 확인해 주세요.',
    noEndTime: '공식 정보에 종료 시간이 없습니다. Google 캘린더는 임시로 1시간 일정으로 열립니다.',
    garbageEyebrow: '생활 정보',
    garbageTitle: '쓰레기 수거일 조회',
    garbageText: '오타루의 지역명과 날짜를 입력하면 2026년 공식 쓰레기 수거 캘린더를 기준으로 확인할 수 있습니다.',
    garbageRegion: '지역명',
    garbageRegionPlaceholder: '예: 銭函, 稲穂, 朝里',
    garbageDate: '확인할 날짜',
    garbageSearch: '수거일 확인',
    garbageEmpty: '지역과 날짜를 입력해 주세요.',
    garbageOfficial: '공식 지역별 PDF 확인 ↗',
    garbageNoCollection: '오늘 예정된 수거가 없습니다',
    garbageNoCollectionNote: '공휴일·임시 변경은 공식 PDF도 확인해 주세요.',
    garbageYearNote: '현재 시험판은 2026년 공식 수거 캘린더를 지원합니다.',
    civicTitle: '오타루시의회・선거 아카이브',
    civicLead: '시정・선거를 선택했을 때만 표시되는 공식 정보 링크입니다.',
    akindoEyebrow: '지역 비즈니스 학습',
    akindoTitle: 'AKINDO Lab by Spady',
    akindoText: 'AKINDO Lab by Spady는 오타루 지역 사업자를 위한 디지털 집객 스터디 모임입니다. Instagram, LINE 공식 계정, Google 비즈니스 프로필, Meta 광고, AI, 웹사이트 예약 동선을 실무적으로 다룹니다.',
    akindoButton: 'AKINDO Lab 상세 보기 ↗',
    policyTitle: '게재 방침',
    policyText: '오타루시, 홋카이도, 주최자, 공공기관의 공식 발표를 우선해 정리합니다. 이 사이트는 오타루시나 행정기관의 공식 사이트가 아니며, Spady가 공개 정보를 정리한 민간 운영 사이트입니다.',
    operatorTitle: '운영자 정보',
    operatorText: '운영: Spady. 홋카이도 오타루시 제니바코를 기반으로 지역 사업자의 마케팅과 정보 발신을 지원합니다.',
    footerNotice: '이 사이트는 오타루시나 행정기관의 공식 사이트가 아닙니다. 공개 정보를 정리한 민간 운영 캘린더입니다.',
    backHome: '캘린더로 돌아가기',
    eventSummaryHeading: '행사 개요',
    eventFactsHeading: '기본 정보',
    officialName: '일본어 공식 명칭',
    dateTime: '일시',
    venue: '장소',
    address: '주소',
    audience: '대상',
    price: '요금',
    reservation: '예약',
    organizer: '주최자',
    status: '상태',
    related: '관련 정보',
    ended: '종료됨',
    scheduled: '개최 예정',
    cancelled: '중지',
    soldOut: '마감・만석',
    reservationRequired: '예약 또는 신청 필요',
    reservationNotRequired: '예약 불필요',
    reservationUnknown: '공식 정보를 확인해 주세요',
    priceUnknown: '공식 정보를 확인해 주세요',
    free: '무료',
    targetGeneric: '오타루 시민 및 방문객',
    privacyHeading: '개인정보 처리방침',
    privacyLead: 'Spady는 문의 등을 통해 취득한 개인정보를 아래 방침에 따라 처리합니다.',
    notFoundTitle: '페이지를 찾을 수 없습니다',
    notFoundText: 'URL이 변경되었을 수 있습니다. 캘린더로 돌아가 필요한 정보를 찾아보세요.',
  },
};

const eventTemplates = {
  akindo: {
    en: ['AKINDO Lab by Spady', 'AKINDO Lab by Spady is a digital marketing study session for local businesses in Otaru. It covers Instagram, LINE Official Account, Google Business Profile, Meta ads, AI, websites and booking flows. The session is full.'],
    'zh-Hant': ['AKINDO Lab by Spady', 'AKINDO Lab by Spady 是小樽在地事業者的數位集客學習會，主題包含 Instagram、LINE官方帳號、Google商家檔案、Meta廣告、AI、網站與預約導線。本場已額滿。'],
    'zh-Hans': ['AKINDO Lab by Spady', 'AKINDO Lab by Spady 是面向小樽当地经营者的数字集客学习会，主题包括 Instagram、LINE官方账号、Google商家资料、Meta广告、AI、网站与预约动线。本场已满。'],
    ko: ['AKINDO Lab by Spady', 'AKINDO Lab by Spady는 오타루 지역 사업자를 위한 디지털 집객 스터디 모임입니다. Instagram, LINE 공식 계정, Google 비즈니스 프로필, Meta 광고, AI, 웹사이트와 예약 동선을 다룹니다. 현재 만석입니다.'],
  },
  lightup: {
    en: ['Otaru Light-Up Walking Guide Tour', 'A free evening walking tour in Otaru from magic hour to the time gas lamps and historic buildings are lit. No reservation is required.'],
    'zh-Hant': ['小樽夜間點燈散策導覽', '從魔幻時刻到煤氣燈點亮的夜晚，步行欣賞小樽歷史建築燈光的免費導覽。不需預約。'],
    'zh-Hans': ['小樽夜间亮灯散步导览', '从魔幻时刻到煤气灯点亮的夜晚，步行欣赏小樽历史建筑灯光的免费导览。无需预约。'],
    ko: ['오타루 라이트업 산책 가이드 투어', '해질 무렵부터 가스등과 역사적 건물이 빛나는 시간까지 오타루 거리를 걷는 무료 가이드 투어입니다. 예약은 필요 없습니다.'],
  },
  wordExcel: {
    en: ['Word and Excel Course for Job Hunting', 'A free practical Word and Excel course for people seeking jobs or career changes in Otaru. Please check the official page for application details and capacity.'],
    'zh-Hant': ['求職實用 Word・Excel 講座', '面向在小樽求職或轉職者的免費 Word・Excel 實務講座。報名方式與名額請確認官方頁面。'],
    'zh-Hans': ['求职实用 Word・Excel 讲座', '面向在小樽求职或转职者的免费 Word・Excel 实务课程。报名方式与名额请确认官方页面。'],
    ko: ['취업에 도움이 되는 Word・Excel 강좌', '오타루에서 취업이나 이직을 준비하는 사람을 위한 무료 Word・Excel 실무 강좌입니다. 신청 방법과 정원은 공식 페이지를 확인해 주세요.'],
  },
  childCenterBaby: {
    en: ['Ohisama Hiroba baby open play session', 'An open play session for babies up to about 18 months old and their guardians at Otaru City Child and Family Center “Nikoniko”. Includes play, measurement and childcare consultation. Reservation is required.'],
    'zh-Hant': ['嬰兒開放活動「Ohisama Hiroba」', '在小樽市兒童家庭中心「Nikoniko」舉辦，對象為約1歲6個月以下嬰兒與家長。包含自由遊戲、身體測量與育兒諮詢。需要預約。'],
    'zh-Hans': ['婴儿开放活动“Ohisama Hiroba”', '在小樽市儿童家庭中心“Nikoniko”举办，面向约1岁6个月以下婴儿及家长。包含自由游戏、身体测量和育儿咨询。需要预约。'],
    ko: ['아기 개방 프로그램 “오히사마 히로바”', '오타루시 어린이·가정센터 “니코니코”에서 열리는 약 1세 6개월 이하 영유아와 보호자 대상 프로그램입니다. 자유놀이, 신체 측정, 육아 상담 등이 있습니다. 예약이 필요합니다.'],
  },
  childCenterToddler: {
    en: ['Nobinobi Hiroba toddler open play session', 'A play and consultation session for toddlers and guardians at Otaru City Child and Family Center “Nikoniko”. Reservation is required.'],
    'zh-Hant': ['幼兒開放活動「Nobinobi Hiroba」', '在小樽市兒童家庭中心「Nikoniko」舉辦，提供幼兒與家長遊戲、交流與育兒諮詢。需要預約。'],
    'zh-Hans': ['幼儿开放活动“Nobinobi Hiroba”', '在小樽市儿童家庭中心“Nikoniko”举办，提供幼儿与家长游戏、交流和育儿咨询。需要预约。'],
    ko: ['유아 개방 프로그램 “노비노비 히로바”', '오타루시 어린이·가정센터 “니코니코”에서 열리는 유아와 보호자 대상 놀이·상담 프로그램입니다. 예약이 필요합니다.'],
  },
  toyLibrary: {
    en: ['Otaru Toy Library', 'A community space where children up to elementary school age and their guardians can play with toys and meet local families.'],
    'zh-Hant': ['小樽玩具圖書館', '小學生以下兒童與家長可自由玩玩具、進行在地交流的空間。'],
    'zh-Hans': ['小樽玩具图书馆', '小学生以下儿童与家长可以自由玩玩具、进行当地交流的空间。'],
    ko: ['오타루 장난감 라이브러리', '초등학생 이하 어린이와 보호자가 장난감으로 놀며 지역 가족과 교류할 수 있는 공간입니다.'],
  },
  childCafe: {
    en: ['Children’s Café learning and safe space', 'A small safe space and learning place for elementary, junior high and high school students who need support, including children who find it hard to attend school. Advance application is required.'],
    'zh-Hant': ['兒童咖啡・安心學習空間', '為不登校或需要支持的小中高中生提供安心停留與學習的小型場所。需要事先報名。'],
    'zh-Hans': ['儿童咖啡・安心学习空间', '为不登校或需要支持的小中高中生提供安心停留和学习的小型场所。需要提前报名。'],
    ko: ['어린이 카페・안심 학습 공간', '등교가 어렵거나 지원이 필요한 초중고생을 위한 작은 안전한 공간과 배움의 장소입니다. 사전 신청이 필요합니다.'],
  },
  tarupiyo: {
    en: ['Tarupiyo Time story session', 'A picture-book reading and play session for infants and guardians at Otaru City Library. Free participation; no application required.'],
    'zh-Hant': ['Tarupiyo Time 繪本時間', '在小樽市立圖書館舉辦的嬰幼兒與家長繪本朗讀、手遊活動。免費參加，不需報名。'],
    'zh-Hans': ['Tarupiyo Time 绘本时间', '在小樽市立图书馆举办的婴幼儿与家长绘本朗读、手指游戏活动。免费参加，无需报名。'],
    ko: ['타루피요 타임 그림책 시간', '오타루시립도서관에서 열리는 영유아와 보호자 대상 그림책 읽기와 손놀이 프로그램입니다. 무료이며 신청은 필요 없습니다.'],
  },
  election: {
    en: ['Otaru mayoral election and city council by-election', 'Official information related to the Otaru mayoral election and city council by-election. Please check the Otaru City Election Administration Commission page for details.'],
    'zh-Hant': ['小樽市長選舉與市議會議員補缺選舉', '小樽市長選舉與市議會議員補缺選舉的官方相關資訊。詳細內容請確認小樽市選舉管理委員會頁面。'],
    'zh-Hans': ['小樽市长选举与市议会议员补缺选举', '小樽市长选举与市议会议员补缺选举的官方相关信息。详情请确认小樽市选举管理委员会页面。'],
    ko: ['오타루시장 선거 및 시의회 의원 보궐선거', '오타루시장 선거와 시의회 의원 보궐선거 관련 공식 정보입니다. 자세한 내용은 오타루시 선거관리위원회 페이지를 확인해 주세요.'],
  },
};

function ensureDir(dir) {
  fs.mkdirSync(path.join(root, dir), { recursive: true });
}

function writeFile(rel, content) {
  const full = path.join(root, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, 'utf8');
}

function esc(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function attr(value = '') {
  return esc(value);
}

function jsonScript(data) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

function numberWithCommas(value) {
  return Number(value).toLocaleString('en-US');
}

function basePath(lang) {
  const cfg = langConfig[lang];
  return cfg.path ? `/${cfg.path}/` : '/';
}

function pageUrl(lang, kind = 'index', slug = '') {
  const base = `${origin}${basePath(lang)}`;
  if (kind === 'index') return base;
  if (kind === 'privacy') return `${base}privacy/`;
  if (kind === 'event') return `${base}events/${slug}/`;
  if (kind === '404') return `${base}404.html`;
  return base;
}

function outputPath(lang, kind = 'index', slug = '') {
  const cfg = langConfig[lang];
  const prefix = cfg.path ? `${cfg.path}/` : '';
  if (kind === 'index') return `${prefix}index.html`;
  if (kind === 'privacy') return `${prefix}privacy/index.html`;
  if (kind === 'event') return `${prefix}events/${slug}/index.html`;
  if (kind === '404') return `${prefix}404.html`;
  return `${prefix}index.html`;
}

function slugForEvent(event) {
  return event.slug || event.id.replace(/_/g, '-').toLowerCase();
}

function eventKey(event) {
  const title = event.title;
  const id = event.id;
  if (id.includes('akindo')) return 'akindo';
  if (title.includes('ライトアップ散策')) return 'lightup';
  if (title.includes('Word・Excel')) return 'wordExcel';
  if (title.includes('おひさま')) return 'childCenterBaby';
  if (title.includes('のびのび')) return 'childCenterToddler';
  if (title.includes('おもちゃライブラリー')) return 'toyLibrary';
  if (title.includes('子どもカフェ')) return 'childCafe';
  if (title.includes('たるぴよ')) return 'tarupiyo';
  if (title.includes('市長選挙') || title.includes('立候補届出')) return 'election';
  return null;
}

function sessionSuffix(title, lang) {
  const match = title.match(/第(\d+)回/);
  if (!match) return '';
  if (lang === 'ja') return `第${match[1]}回`;
  if (lang === 'en') return `, Session ${match[1]}`;
  if (lang === 'ko') return ` ${match[1]}회차`;
  return ` 第${match[1]}回`;
}

function genericTitle(event, lang) {
  if (lang === 'ja') return event.title;
  const category = copy[lang].filters[event.category] || copy[lang].filters.event;
  if (lang === 'en') return `${event.title} — ${category} in Otaru`;
  if (lang === 'zh-Hant') return `${event.title}｜小樽${category}資訊`;
  if (lang === 'zh-Hans') return `${event.title}｜小樽${category}信息`;
  return `${event.title}｜오타루 ${category} 정보`;
}

function genericSummary(event, lang) {
  if (lang === 'ja') return event.summary;
  const category = copy[lang].filters[event.category] || copy[lang].filters.event;
  if (lang === 'en') {
    return `${event.title} is ${category.toLowerCase()} information for Otaru, Hokkaido. Dates, venue and official details are based on the linked Japanese source.`;
  }
  if (lang === 'zh-Hant') {
    return `${event.title} 是北海道小樽的${category}資訊。日期、會場與詳細內容依據連結中的日文官方資訊整理。`;
  }
  if (lang === 'zh-Hans') {
    return `${event.title} 是北海道小樽的${category}信息。日期、会场和详情依据链接中的日文官方信息整理。`;
  }
  return `${event.title}는 홋카이도 오타루의 ${category} 정보입니다. 날짜, 장소, 상세 내용은 연결된 일본어 공식 정보를 바탕으로 정리했습니다.`;
}

function translateEvent(event, lang) {
  if (lang === 'ja') {
    return {
      name: event.title,
      summary: event.summary,
      description: event.summary,
      venueName: event.place,
      address: addressFor(event),
      audience: audienceFor(event, lang),
      price: priceFor(event, lang),
      reservation: reservationFor(event, lang),
      statusLabel: statusLabelFor(event, lang),
    };
  }
  const key = eventKey(event);
  const template = key ? eventTemplates[key]?.[lang] : null;
  const translatedName = template ? `${template[0]}${key === 'wordExcel' ? sessionSuffix(event.title, lang) : ''}` : genericTitle(event, lang);
  const translatedSummary = template ? template[1] : genericSummary(event, lang);
  return {
    name: translatedName,
    summary: translatedSummary,
    description: translatedSummary,
    venueName: venueFor(event, lang),
    address: addressFor(event),
    audience: audienceFor(event, lang),
    price: priceFor(event, lang),
    reservation: reservationFor(event, lang),
    statusLabel: statusLabelFor(event, lang),
  };
}

function venueFor(event, lang) {
  if (lang === 'ja') return event.place;
  if (event.id.includes('akindo')) {
    if (lang === 'en') return 'Wing Bay Otaru, Building No. 1, 4th Floor';
    if (lang === 'zh-Hant') return 'Wing Bay Otaru 1號館4樓';
    if (lang === 'zh-Hans') return 'Wing Bay Otaru 1号馆4楼';
    return '윙베이 오타루 1번관 4층';
  }
  if (event.place.includes('ウイングベイ小樽')) {
    if (lang === 'en') return `${event.place} / Wing Bay Otaru`;
    if (lang === 'zh-Hant') return `${event.place} / Wing Bay Otaru`;
    if (lang === 'zh-Hans') return `${event.place} / Wing Bay Otaru`;
    return `${event.place} / 윙베이 오타루`;
  }
  return event.place;
}

function addressFor(event) {
  const query = event.mapQuery || event.place || '';
  const idx = query.indexOf('北海道');
  return idx >= 0 ? query.slice(idx) : query;
}

function audienceFor(event, lang) {
  const t = copy[lang];
  if (event.category === 'child') {
    if (lang === 'ja') return '子ども・親子・保護者';
    if (lang === 'en') return 'Children, families and guardians';
    if (lang === 'zh-Hant') return '兒童、親子與家長';
    if (lang === 'zh-Hans') return '儿童、亲子与家长';
    return '어린이, 가족, 보호자';
  }
  if (event.category === 'job') {
    if (lang === 'ja') return '求職者・転職希望者';
    if (lang === 'en') return 'Job seekers and people considering career changes';
    if (lang === 'zh-Hant') return '求職者與轉職者';
    if (lang === 'zh-Hans') return '求职者与转职者';
    return '구직자 및 이직 희망자';
  }
  if (event.category === 'business') {
    if (lang === 'ja') return '事業者・経営者・創業予定者';
    if (lang === 'en') return 'Local business owners, managers and entrepreneurs';
    if (lang === 'zh-Hant') return '在地事業者、經營者與創業者';
    if (lang === 'zh-Hans') return '当地经营者、管理者与创业者';
    return '지역 사업자, 경영자, 창업 예정자';
  }
  if (event.category === 'civic') {
    if (lang === 'ja') return '小樽市民・有権者';
    if (lang === 'en') return 'Otaru residents and voters';
    if (lang === 'zh-Hant') return '小樽市民與選民';
    if (lang === 'zh-Hans') return '小樽市民与选民';
    return '오타루 시민 및 유권자';
  }
  return t.targetGeneric;
}

function priceFor(event, lang) {
  const summary = `${event.summary} ${event.time}`;
  if (summary.includes('無料') || summary.includes('参加無料')) return copy[lang].free;
  return copy[lang].priceUnknown;
}

function reservationState(event) {
  const text = `${event.title} ${event.summary} ${event.time}`;
  if (text.includes('満席') || text.includes('受付終了')) return 'soldOut';
  if (text.includes('申込不要') || text.includes('予約不要')) return 'notRequired';
  if (text.includes('要予約') || text.includes('事前申込') || text.includes('申込締切') || text.includes('先着')) return 'required';
  return 'unknown';
}

function reservationFor(event, lang) {
  const state = reservationState(event);
  if (state === 'soldOut') return copy[lang].soldOut;
  if (state === 'required') return copy[lang].reservationRequired;
  if (state === 'notRequired') return copy[lang].reservationNotRequired;
  return copy[lang].reservationUnknown;
}

function statusFor(event) {
  const text = `${event.title} ${event.summary}`;
  if (text.includes('中止')) return 'EventCancelled';
  if (event.end < today) return 'EventCompleted';
  return 'EventScheduled';
}

function statusLabelFor(event, lang) {
  const status = statusFor(event);
  if (status === 'EventCancelled') return copy[lang].cancelled;
  if (status === 'EventCompleted') return copy[lang].ended;
  if (reservationState(event) === 'soldOut') return copy[lang].soldOut;
  return copy[lang].scheduled;
}

function normalizeEvent(raw) {
  const slug = slugForEvent(raw);
  const translations = Object.fromEntries(langOrder.map((lang) => [lang, translateEvent(raw, lang)]));
  return {
    id: raw.id,
    slug,
    name: raw.title,
    summary: raw.summary,
    description: raw.summary,
    startDate: raw.start,
    endDate: raw.end || raw.start,
    timezone: 'Asia/Tokyo',
    startTime: raw.startTime || '',
    endTime: raw.endTime || '',
    time: raw.time || '',
    venueName: raw.place || '',
    address: addressFor(raw),
    latitude: null,
    longitude: null,
    mapQuery: raw.mapQuery || raw.place || '',
    category: raw.category,
    audience: audienceFor(raw, 'ja'),
    price: priceFor(raw, 'ja'),
    reservationRequired: reservationState(raw) === 'required' ? true : reservationState(raw) === 'notRequired' ? false : null,
    organizerName: raw.source || '',
    officialSourceName: raw.source || '',
    officialSourceUrl: raw.url || '',
    sourceCheckedAt: raw.sourceCheckedAt || '2026-07-13',
    updatedAt: raw.updatedAt || buildDate,
    eventStatus: statusFor(raw),
    translations,
  };
}

const events = rawEvents.map(normalizeEvent);

function translateOngoing(item, lang) {
  if (lang === 'ja') return item;
  const label = copy[lang].filters[item.category] || copy[lang].filters.event;
  const title = genericTitle({ title: item.title, category: item.category }, lang);
  const summary = lang === 'en'
    ? `${item.title} is continuing ${label.toLowerCase()} information for Otaru. Please check the official page for the latest details.`
    : lang === 'zh-Hant'
      ? `${item.title} 是小樽持續更新的${label}資訊。最新內容請確認官方頁面。`
      : lang === 'zh-Hans'
        ? `${item.title} 是小樽持续更新的${label}信息。最新内容请确认官方页面。`
        : `${item.title}는 오타루의 지속 업데이트 ${label} 정보입니다. 최신 내용은 공식 페이지를 확인해 주세요.`;
  return { ...item, title, summary };
}

function fmtDate(dateString, lang, includeWeekday = true) {
  const date = new Date(`${dateString}T12:00:00+09:00`);
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const w = copy[lang].weekdays[date.getDay()];
  if (lang === 'ja') return includeWeekday ? `${y}年${m}月${d}日（${w}）` : `${y}年${m}月${d}日`;
  if (lang === 'en') {
    return new Intl.DateTimeFormat('en-US', { weekday: includeWeekday ? 'long' : undefined, year: 'numeric', month: 'long', day: 'numeric' }).format(date);
  }
  if (lang === 'ko') return includeWeekday ? `${y}년 ${m}월 ${d}일 ${w}요일` : `${y}년 ${m}월 ${d}일`;
  return includeWeekday ? `${y}年${m}月${d}日（星期${w}）` : `${y}年${m}月${d}日`;
}

function formatTimeRange(event, lang) {
  const start = event.startTime;
  const end = event.endTime;
  if (!start) return event.time || '';
  if (lang === 'en') {
    const [sh, sm] = start.split(':').map(Number);
    const [eh, em] = (end || '').split(':').map(Number);
    const startDate = new Date(`${event.startDate}T${start}:00+09:00`);
    const endDate = end ? new Date(`${event.endDate}T${end}:00+09:00`) : null;
    const tf = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'Asia/Tokyo' });
    return endDate ? `${tf.format(startDate)}–${tf.format(endDate)} JST` : `${tf.format(startDate)} JST`;
  }
  const sep = lang === 'ko' ? '~' : '–';
  return end ? `${start}${sep}${end}` : start;
}

function formatEventDateTime(event, lang) {
  const date = fmtDate(event.startDate, lang, true);
  const time = formatTimeRange(event, lang);
  return time ? `${date} ${time}` : date;
}

function eventText(event, lang) {
  return event.translations[lang];
}

function languageLinks(lang, kind = 'index', slug = '') {
  return `<nav class="language-switcher" aria-label="${attr(copy[lang].languageLabel)}">
${langOrder.map((code) => {
  const active = code === lang;
  return `<a href="${attr(pageUrl(code, kind, slug))}" hreflang="${attr(code)}" lang="${attr(langConfig[code].htmlLang)}" data-lang-link="${attr(code)}" class="${active ? 'active' : ''}" aria-current="${active ? 'page' : 'false'}">${esc(langConfig[code].label)}</a>`;
}).join('<span aria-hidden="true">｜</span>')}
</nav>`;
}

function alternateLinks(lang, kind = 'index', slug = '') {
  return `${langOrder.map((code) => `<link rel="alternate" hreflang="${attr(code)}" href="${attr(pageUrl(code, kind, slug))}">`).join('\n')}
<link rel="alternate" hreflang="x-default" href="${attr(pageUrl('ja', kind, slug))}">`;
}

function ogAlternateMeta(lang) {
  return langOrder.filter((code) => code !== lang).map((code) => `<meta property="og:locale:alternate" content="${attr(langConfig[code].ogLocale)}">`).join('\n');
}

function head({ lang, title, description, canonical, kind = 'index', slug = '', type = 'website', jsonLd = [] }) {
  const cfg = langConfig[lang];
  return `<!doctype html>
<html lang="${attr(cfg.htmlLang)}">
<head>
<meta charset="utf-8">
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WPRLRR5S');</script>
<!-- End Google Tag Manager -->
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${attr(description)}">
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
<meta name="theme-color" content="#1d4560">
<meta name="application-name" content="${attr(cfg.siteName)}">
<meta name="apple-mobile-web-app-title" content="${attr(cfg.siteName)}">
<meta name="format-detection" content="telephone=no">
<link rel="canonical" href="${attr(canonical)}">
${alternateLinks(lang, kind, slug)}
<link rel="icon" href="/assets/favicon-otaru-20260713.png" type="image/png">
<link rel="stylesheet" href="/assets/site.css?v=${cssVersion}">
<meta property="og:type" content="${attr(type)}">
<meta property="og:locale" content="${attr(cfg.ogLocale)}">
${ogAlternateMeta(lang)}
<meta property="og:site_name" content="${attr(cfg.siteName)}">
<meta property="og:title" content="${attr(title)}">
<meta property="og:description" content="${attr(description)}">
<meta property="og:url" content="${attr(canonical)}">
<meta property="og:image" content="${attr(ogImage)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${attr(title)}">
<meta name="twitter:description" content="${attr(description)}">
<meta name="twitter:image" content="${attr(ogImage)}">
${jsonLd.length ? `<script type="application/ld+json">${jsonScript({ '@context': 'https://schema.org', '@graph': jsonLd })}</script>` : ''}
<noscript><style>.splash,.flying-logo{display:none!important}body.loading{overflow:auto!important}</style></noscript>
</head>`;
}

function commonJsonLd(lang, canonical, name, description, breadcrumbs = []) {
  const cfg = langConfig[lang];
  const graph = [
    {
      '@type': 'WebSite',
      '@id': `${origin}/#website`,
      url: pageUrl(lang),
      name: cfg.siteName,
      alternateName: 'OTARU KURASHI CALENDAR',
      inLanguage: cfg.htmlLang,
      publisher: { '@id': 'https://spady.net/#organization' },
    },
    {
      '@type': 'Organization',
      '@id': 'https://spady.net/#organization',
      name: 'Spady',
      url: 'https://spady.net/',
      logo: { '@type': 'ImageObject', url: 'https://spady.net/logo.png?v=20260708-0021' },
    },
  ];
  if (breadcrumbs.length) {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        item: item.url,
      })),
    });
  }
  return graph;
}

function collectionJsonLd(lang) {
  const cfg = langConfig[lang];
  const itemEvents = events
    .filter((event) => event.endDate >= today)
    .slice(0, 30)
    .map((event, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: pageUrl(lang, 'event', event.slug),
      name: eventText(event, lang).name,
    }));
  return [
    ...commonJsonLd(lang, pageUrl(lang), cfg.siteName, cfg.description),
    {
      '@type': 'CollectionPage',
      '@id': `${pageUrl(lang)}#webpage`,
      url: pageUrl(lang),
      name: cfg.title,
      description: cfg.description,
      image: ogImage,
      inLanguage: cfg.htmlLang,
      isPartOf: { '@id': `${origin}/#website` },
      about: { '@type': 'City', name: lang === 'en' ? 'Otaru, Hokkaido, Japan' : '小樽市' },
    },
    {
      '@type': 'ItemList',
      '@id': `${pageUrl(lang)}#events`,
      itemListElement: itemEvents,
    },
  ];
}

function eventJsonLd(event, lang) {
  const text = eventText(event, lang);
  const start = event.startTime ? `${event.startDate}T${event.startTime}:00+09:00` : `${event.startDate}T00:00:00+09:00`;
  const end = event.endTime ? `${event.endDate}T${event.endTime}:00+09:00` : `${event.endDate}T23:59:59+09:00`;
  return [
    ...commonJsonLd(lang, pageUrl(lang, 'event', event.slug), text.name, text.summary, [
      { name: langConfig[lang].siteName, url: pageUrl(lang) },
      { name: text.name, url: pageUrl(lang, 'event', event.slug) },
    ]),
    {
      '@type': 'Event',
      '@id': `${pageUrl(lang, 'event', event.slug)}#event`,
      name: text.name,
      description: text.summary,
      startDate: start,
      endDate: end,
      eventStatus: `https://schema.org/${event.eventStatus}`,
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      location: {
        '@type': 'Place',
        name: text.venueName,
        address: text.address,
      },
      organizer: {
        '@type': 'Organization',
        name: event.organizerName,
        url: event.officialSourceUrl,
      },
      url: pageUrl(lang, 'event', event.slug),
      image: [ogImage],
      offers: {
        '@type': 'Offer',
        price: text.price === copy[lang].free ? '0' : '',
        priceCurrency: 'JPY',
        availability: reservationState(event) === 'soldOut' ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock',
        url: event.officialSourceUrl,
      },
      inLanguage: langConfig[lang].htmlLang,
    },
  ];
}

function monthEvents(year, month, filter = 'all') {
  const ms = new Date(year, month, 1);
  const me = new Date(year, month + 1, 0, 23, 59, 59);
  return events.filter((event) => {
    if (filter !== 'all' && event.category !== filter) return false;
    const s = new Date(`${event.startDate}T00:00:00+09:00`);
    const e = new Date(`${event.endDate}T23:59:59+09:00`);
    return e >= ms && s <= me;
  });
}

function eventsForDate(date, monthEventList) {
  const iso = localISODate(date);
  return monthEventList.filter((event) => event.startDate <= iso && event.endDate >= iso);
}

function localISODate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function renderStaticCalendar(lang) {
  const y = defaultMonth.year;
  const m = defaultMonth.month;
  const monthList = monthEvents(y, m);
  const first = new Date(y, m, 1);
  const startDay = first.getDay();
  const days = new Date(y, m + 1, 0).getDate();
  const prevDays = new Date(y, m, 0).getDate();
  const cells = Math.ceil((startDay + days) / 7) * 7;
  let html = '';
  for (let i = 0; i < cells; i += 1) {
    let d;
    let cellDate;
    let muted = false;
    if (i < startDay) {
      d = prevDays - startDay + i + 1;
      cellDate = new Date(y, m - 1, d);
      muted = true;
    } else if (i >= startDay + days) {
      d = i - (startDay + days) + 1;
      cellDate = new Date(y, m + 1, d);
      muted = true;
    } else {
      d = i - startDay + 1;
      cellDate = new Date(y, m, d);
    }
    const iso = localISODate(cellDate);
    const evs = eventsForDate(cellDate, monthList).slice(0, 3);
    const isToday = iso === today;
    html += `<div class="day${muted ? ' muted' : ''}${isToday ? ' today' : ''}" data-date="${iso}">
      <div class="day-head"><div class="date-stamp"><span class="date-num">${d}</span><span class="date-full">${fmtShortDate(cellDate, lang)}</span></div>${isToday ? `<span class="today-badge">${esc(copy[lang].today)}</span>` : ''}</div>
      ${evs.map((event) => `<button class="event-pill ${event.category}" type="button" data-event-id="${attr(event.id)}">${esc(eventText(event, lang).name)}</button>`).join('')}
      ${eventsForDate(cellDate, monthList).length > 3 ? `<div class="day-count">+${eventsForDate(cellDate, monthList).length - 3}</div>` : ''}
    </div>`;
  }
  return html;
}

function fmtShortDate(date, lang) {
  const w = copy[lang].weekdays[date.getDay()];
  if (lang === 'ja') return `${date.getMonth() + 1}月${date.getDate()}日`;
  if (lang === 'en') return `${date.getMonth() + 1}/${date.getDate()} ${w}`;
  if (lang === 'ko') return `${date.getMonth() + 1}/${date.getDate()} ${w}`;
  return `${date.getMonth() + 1}/${date.getDate()}（${w}）`;
}

function renderEventCards(eventList, lang) {
  return eventList.sort((a, b) => a.startDate.localeCompare(b.startDate)).map((event) => {
    const text = eventText(event, lang);
    const date = new Date(`${event.startDate}T12:00:00+09:00`);
    return `<article class="event-card category-${attr(event.category)}">
      <div class="date-box"><div><strong>${date.getDate()}</strong><small>${esc(fmtDate(event.startDate, lang, true))}</small></div></div>
      <div>
        <div class="meta"><span class="tag">${esc(copy[lang].filters[event.category])}</span><span class="tag">${esc(text.statusLabel)}</span></div>
        <h3><a href="${attr(pageUrl(lang, 'event', event.slug))}">${esc(text.name)}</a></h3>
        ${lang !== 'ja' ? `<p class="official-name">${esc(copy[lang].officialName)}：${esc(event.name)}</p>` : ''}
        <p><strong>${esc(copy[lang].dateTime)}：</strong>${esc(formatEventDateTime(event, lang))}</p>
        <p><strong>${esc(copy[lang].place)}：</strong>${esc(text.venueName)}</p>
        <p>${esc(text.summary)}</p>
      </div>
      <div class="event-links">
        <a href="${attr(pageUrl(lang, 'event', event.slug))}">${esc(copy[lang].detailsArrow)}</a>
        <a href="${attr(googleCalendarUrl(event, lang))}" target="_blank" rel="noopener">${esc(copy[lang].calendarAdd)}</a>
        <a href="${attr(event.officialSourceUrl)}" target="_blank" rel="noopener">${esc(copy[lang].official)}</a>
      </div>
    </article>`;
  }).join('\n');
}

function renderOngoingCards(lang) {
  return rawOngoing.map((item) => translateOngoing(item, lang)).map((item) => `<div class="info-card category-${attr(item.category)}">
    <div class="meta"><span class="tag">${esc(copy[lang].filters[item.category])}</span><span class="tag">${esc(item.label)}</span></div>
    <h3>${esc(item.title)}</h3>
    <p>${esc(item.summary)}</p>
    ${item.url ? `<a href="${attr(item.url)}" target="_blank" rel="noopener">${esc(copy[lang].official)}</a>` : ''}
  </div>`).join('\n');
}

function googleCalendarUrl(event, lang) {
  let dates;
  let note = '';
  if (event.startTime) {
    const start = toGoogleDateTime(event.startDate, event.startTime);
    if (event.endTime) {
      dates = `${start}/${toGoogleDateTime(event.endDate, event.endTime)}`;
    } else {
      dates = `${start}/${addMinutesToGoogleDateTime(event.startDate, event.startTime, 60)}`;
      note = `\n${copy[lang].noEndTime}`;
    }
  } else {
    dates = `${toGoogleDate(event.startDate)}/${toGoogleDate(event.endDate, 1)}`;
  }
  const text = eventText(event, lang);
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: text.name,
    dates,
    details: `${text.summary}${note}\n\n${copy[lang].sourceLabel}: ${event.officialSourceName}\n${event.officialSourceUrl}`,
    location: text.venueName || '',
    ctz: 'Asia/Tokyo',
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function toGoogleDate(dateString, addDays = 0) {
  const date = new Date(`${dateString}T12:00:00+09:00`);
  date.setDate(date.getDate() + addDays);
  return `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
}

function toGoogleDateTime(dateString, timeString) {
  const [hour, minute] = timeString.split(':').map(Number);
  return `${toGoogleDate(dateString)}T${String(hour).padStart(2, '0')}${String(minute).padStart(2, '0')}00`;
}

function addMinutesToGoogleDateTime(dateString, timeString, minutesToAdd) {
  const date = new Date(`${dateString}T12:00:00+09:00`);
  const [hour, minute] = timeString.split(':').map(Number);
  date.setHours(hour, minute + minutesToAdd, 0, 0);
  return `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}T${String(date.getHours()).padStart(2, '0')}${String(date.getMinutes()).padStart(2, '0')}00`;
}

function populationLabel(lang) {
  if (lang === 'ja') return population.asOfLabelJa;
  if (lang === 'en') return 'as of the end of June 2026';
  if (lang === 'ko') return '2026년 6월 말 현재';
  return '截至2026年6月底';
}

function renderHeader(lang, kind = 'index', slug = '') {
  const t = copy[lang];
  const logoSlot = kind === 'index'
    ? '<span class="brand-logo-slot" id="brandLogoSlot"><noscript><img class="brand-logo" src="/assets/spady-logo-header.jpg" alt="Spady"></noscript></span>'
    : '<span class="brand-logo-slot"><img class="brand-logo" src="/assets/spady-logo-header.jpg" alt="Spady"></span>';
  return `<div class="topnote">${esc(t.topnote)}</div>
<header>
  <div class="wrap header-inner">
    <a class="brand" href="${attr(pageUrl(lang))}" aria-label="${attr(langConfig[lang].siteName)}">
      ${logoSlot}
      <span class="brand-text">${esc(langConfig[lang].siteName)}</span>
    </a>
    <nav class="header-nav" aria-label="main">
      <a href="${attr(pageUrl(lang))}#calendar">${esc(t.navCalendar)}</a>
      <a href="${attr(pageUrl(lang))}#garbage">${esc(t.navGarbage)}</a>
      <a href="${attr(pageUrl(lang))}#akindo">${esc(t.navAkindo)}</a>
      <a href="${attr(pageUrl(lang, 'privacy'))}">${esc(t.navPrivacy)}</a>
      <a class="accent" href="https://spady.net/" target="_blank" rel="noopener">${esc(t.navSpady)}</a>
    </nav>
  </div>
  <div class="wrap">${languageLinks(lang, kind, slug)}</div>
</header>`;
}

function renderIndexPage(lang) {
  const cfg = langConfig[lang];
  const t = copy[lang];
  const canonical = pageUrl(lang);
  const currentMonthEvents = monthEvents(defaultMonth.year, defaultMonth.month);
  const data = {
    lang,
    today,
    defaultYear: defaultMonth.year,
    defaultMonth: defaultMonth.month,
    events: events.map((event) => ({
      ...event,
      title: eventText(event, lang).name,
      summary: eventText(event, lang).summary,
      place: eventText(event, lang).venueName,
      address: eventText(event, lang).address,
      statusLabel: eventText(event, lang).statusLabel,
      detailUrl: pageUrl(lang, 'event', event.slug),
      calendarUrl: googleCalendarUrl(event, lang),
      url: event.officialSourceUrl,
      source: event.officialSourceName,
      start: event.startDate,
      end: event.endDate,
    })),
    ongoing: rawOngoing.map((item) => translateOngoing(item, lang)),
    garbageRegions,
    garbagePatterns,
    categoryLabels: t.filters,
    weekdayLabels: t.weekdays,
    langUrls: Object.fromEntries(langOrder.map((code) => [code, pageUrl(code)])),
    text: {
      ...t,
      countZero: t.count(0),
    },
  };
  return `${head({ lang, title: cfg.title, description: cfg.description, canonical, kind: 'index', jsonLd: collectionJsonLd(lang) })}
<body class="loading">
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WPRLRR5S" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
<img class="flying-logo" id="flyingLogo" src="/assets/spady-logo-header.jpg" alt="Spady">
<div class="splash" id="splash" aria-hidden="true">
  <div class="splash-stars"><span style="left:12%;top:22%;animation-duration:5s"></span><span style="left:78%;top:28%;animation-duration:6.5s"></span><span style="left:38%;top:74%;animation-duration:4.8s"></span></div>
  <div class="splash-inner">
    <div class="splash-title">${esc(cfg.siteName)}</div>
    <div class="splash-sub">${esc(t.splashSub)}</div>
    <div class="splash-line"><span></span></div>
  </div>
</div>
${renderHeader(lang)}
<main>
  <section class="hero">
    <div class="wrap hero-shell">
      <div class="hero-card">
        <span class="hero-kicker">${esc(t.heroKicker)}</span>
        <h1>${esc(t.heroTitle)}</h1>
        <p>${esc(t.heroText)}</p>
      </div>
    </div>
  </section>
  <div class="wrap">
    <div class="seo-intro">
      <p>${esc(t.intro)}</p>
      <p class="population-note">${esc(t.population(numberWithCommas(population.population), populationLabel(lang)))} <a href="${attr(population.sourceUrl)}" target="_blank" rel="noopener">${esc(t.source)}</a></p>
    </div>
  </div>
  <section class="calendar-stage section" id="calendar">
    <div class="wrap">
      <div class="calendar-wrap">
        <div class="cal-head">
          <div>
            <h2 class="cal-title schedule-en"><span>${esc(t.calendarTitle1)}</span><span>${esc(t.calendarTitle2)}</span></h2>
            <p class="cal-copy">${esc(t.calendarCopy)}</p>
          </div>
          <div class="sparkles" aria-hidden="true"><span></span><span></span><span></span></div>
        </div>
        <div class="calendar-toolbar controls">
          <div class="month-controls toolbar-month">
            <button class="toolbar-arrow mini-btn" onclick="changeMonth(-1)" aria-label="${attr(t.prev)}">‹</button>
            <div class="month-title" id="monthTitle">${esc(monthTitle(defaultMonth.year, defaultMonth.month, lang))}</div>
            <button class="toolbar-arrow mini-btn" onclick="changeMonth(1)" aria-label="${attr(t.next)}">›</button>
            <button class="mini-btn" onclick="goToday()">${esc(t.today)}</button>
          </div>
        </div>
        <div class="calendar-filter-row filter-wrap">
          ${['all', 'child', 'job', 'event', 'business', 'civic'].map((key) => `<button class="filter ${key === 'all' ? 'active' : ''}" data-filter="${key}">${key !== 'all' ? `<span class="dot ${key}"></span>` : ''}${esc(t.filters[key])}</button>`).join('')}
        </div>
        <div class="calendar-grid-shell">
          <div class="calendar-board">
            <div class="weekdays">${t.weekdays.map((w) => `<div>${esc(w)}</div>`).join('')}</div>
            <div class="calendar-grid" id="calendarGrid">${renderStaticCalendar(lang)}</div>
          </div>
        </div>
      </div>
      <div class="lower-area">
        <section class="panel category-panel" id="monthlyPanel" data-category="all">
          <h2>${esc(t.monthlyTitle)}</h2>
          <p class="lead">${esc(t.monthlyLead)}</p>
          <p id="listNote" class="note">${esc(t.count(currentMonthEvents.length))}</p>
          <div class="event-list" id="eventList">${renderEventCards(currentMonthEvents, lang)}</div>
          <div class="event-list ongoing-list" id="ongoingList">${renderOngoingCards(lang)}</div>
        </section>
      </div>
    </div>
  </section>
  <section class="section garbage-section" id="garbage">
    <div class="wrap">
      <div class="garbage-shell">
        <div class="garbage-copy">
          <span class="eyebrow">${esc(t.garbageEyebrow)}</span>
          <h2>${esc(t.garbageTitle)}</h2>
          <p>${esc(t.garbageText)}</p>
        </div>
        <div class="garbage-form">
          <label><span>${esc(t.garbageRegion)}</span><input id="garbageRegion" list="garbageRegionList" placeholder="${attr(t.garbageRegionPlaceholder)}"></label>
          <datalist id="garbageRegionList"></datalist>
          <label><span>${esc(t.garbageDate)}</span><input id="garbageDate" type="date"></label>
          <button class="garbage-search-btn" id="garbageSearchBtn">${esc(t.garbageSearch)}</button>
        </div>
        <div class="garbage-result" id="garbageResult"><div class="garbage-empty">${esc(t.garbageEmpty)}</div></div>
        <div class="garbage-note"><p>${esc(t.footerNotice)}</p><a href="https://www.city.otaru.lg.jp/docs/2025102700045/" target="_blank" rel="noopener">${esc(t.garbageOfficial)}</a></div>
      </div>
    </div>
  </section>
  <section class="section civic-section" id="civicArchive" hidden>
    <div class="wrap">
      <section class="panel category-panel" data-category="civic">
        <h2>${esc(t.civicTitle)}</h2>
        <p class="lead">${esc(t.civicLead)}</p>
        <div class="archive-grid">
          <a class="archive-card council" href="https://www.city.otaru.lg.jp/docs/2020112500241/" target="_blank" rel="noopener"><span class="archive-icon">議</span><strong>小樽市議会</strong><small>本会議・委員会の日程</small></a>
          <a class="archive-card council" href="https://www.city.otaru.lg.jp/docs/2020113000634/" target="_blank" rel="noopener"><span class="archive-icon">録</span><strong>会議録</strong><small>過去の公式記録</small></a>
          <a class="archive-card video" href="https://www.youtube.com/channel/UCTY8gt4N4cMq7PTGWZwgtNQ" target="_blank" rel="noopener"><span class="archive-icon">▶</span><strong>議会映像</strong><small>YouTube中継・録画</small></a>
          <a class="archive-card election" href="https://www.city.otaru.lg.jp/docs/2022071500041/" target="_blank" rel="noopener"><span class="archive-icon">票</span><strong>地方選挙</strong><small>候補者・選挙日程</small></a>
          <a class="archive-card election" href="https://www.city.otaru.lg.jp/docs/2021010400039/" target="_blank" rel="noopener"><span class="archive-icon">歴</span><strong>選挙結果</strong><small>過去の開票結果</small></a>
        </div>
      </section>
    </div>
  </section>
  <section class="section" id="akindo">
    <div class="wrap">
      <div class="akindo">
        <div class="akindo-photo"><img src="https://spady.net/seminar.jpg?v=20260708-0021" alt="AKINDO Lab by Spady"></div>
        <div class="akindo-copy">
          <span class="eyebrow">${esc(t.akindoEyebrow)}</span>
          <h2>${esc(t.akindoTitle)}</h2>
          <p>${esc(t.akindoText)}</p>
          <a class="btn" href="https://spady.net/akindo/" target="_blank" rel="noopener">${esc(t.akindoButton)}</a>
        </div>
      </div>
    </div>
  </section>
  <section class="section">
    <div class="wrap about-grid">
      <article class="about"><h3>${esc(t.policyTitle)}</h3><p>${esc(t.policyText)}</p></article>
      <article class="about"><h3>${esc(t.operatorTitle)}</h3><p>${esc(t.operatorText)}</p><div class="operator"><img src="/assets/spady-logo-header.jpg" alt="Spady"><span>Spady</span></div></article>
    </div>
  </section>
</main>
${renderFooter(lang)}
${renderModal(lang)}
<script>window.OTARU_PAGE_DATA=${jsonScript(data)};</script>
<script>${clientScript()}</script>
</body>
</html>`;
}

function monthTitle(year, month, lang) {
  if (lang === 'ja') return `${year}年${month + 1}月`;
  if (lang === 'en') return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long' }).format(new Date(year, month, 1));
  if (lang === 'ko') return `${year}년 ${month + 1}월`;
  return `${year}年${month + 1}月`;
}

function renderFooter(lang) {
  return `<footer>
  <div class="wrap footer-inner">
    <span>${esc(copy[lang].footerNotice)}</span>
    <span><a href="https://spady.net/akindo/" target="_blank" rel="noopener">AKINDO Lab</a> ｜ <a href="https://spady.net/" target="_blank" rel="noopener">Spady</a> ｜ <a href="${attr(pageUrl(lang, 'privacy'))}">${esc(copy[lang].navPrivacy)}</a></span>
  </div>
</footer>`;
}

function renderModal(lang) {
  const t = copy[lang];
  return `<div class="modal" id="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
  <div class="modal-box">
    <div class="modal-top">
      <div>
        <h2 id="modalTitle"></h2>
        <div class="meta" id="modalMeta"></div>
      </div>
      <button class="close" onclick="closeModal()" aria-label="Close">×</button>
    </div>
    <div id="modalBody"></div>
    <div class="source" id="modalSource"></div>
    <div class="modal-actions">
      <a class="btn" id="modalDetailLink">${esc(t.details)}</a>
      <a class="btn" id="modalLink" target="_blank" rel="noopener">${esc(t.official)}</a>
      <a class="btn calendar-btn" id="modalCalendarLink" target="_blank" rel="noopener">${esc(t.calendarAdd)}</a>
      <a class="btn map-external-btn" id="mapExternalLink" target="_blank" rel="noopener">${esc(t.mapOpen)}</a>
    </div>
    <div class="map-wrap" id="mapWrap"></div>
  </div>
</div>`;
}

function renderEventPage(event, lang) {
  const cfg = langConfig[lang];
  const t = copy[lang];
  const text = eventText(event, lang);
  const title = lang === 'ja' ? `${text.name}｜小樽暮らしカレンダー` : `${text.name} | ${cfg.siteName}`;
  const description = text.summary;
  const canonical = pageUrl(lang, 'event', event.slug);
  const related = events.filter((item) => item.id !== event.id && item.category === event.category).slice(0, 3);
  return `${head({ lang, title, description, canonical, kind: 'event', slug: event.slug, type: 'article', jsonLd: eventJsonLd(event, lang) })}
<body>
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WPRLRR5S" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
${renderHeader(lang, 'event', event.slug)}
<main class="detail-main">
  <article class="event-detail wrap">
    <nav class="breadcrumbs" aria-label="breadcrumb"><a href="${attr(pageUrl(lang))}">${esc(cfg.siteName)}</a><span>›</span><span>${esc(text.name)}</span></nav>
    <p class="eyebrow">${esc(t.filters[event.category])}</p>
    <h1>${esc(text.name)}</h1>
    ${lang !== 'ja' ? `<p class="official-name">${esc(t.officialName)}：${esc(event.name)}</p>` : ''}
    <p class="detail-summary">${esc(text.summary)}</p>
    <div class="status-line"><span class="tag">${esc(text.statusLabel)}</span><span class="tag">${esc(t.sourceLabel)}：${esc(event.officialSourceName)}</span></div>
    <section class="detail-section">
      <h2>${esc(t.eventFactsHeading)}</h2>
      <dl class="fact-list">
        <div><dt>${esc(t.dateTime)}</dt><dd>${esc(formatEventDateTime(event, lang))}</dd></div>
        <div><dt>${esc(t.venue)}</dt><dd>${esc(text.venueName)}</dd></div>
        <div><dt>${esc(t.address)}</dt><dd>${esc(text.address)}</dd></div>
        <div><dt>${esc(t.audience)}</dt><dd>${esc(text.audience)}</dd></div>
        <div><dt>${esc(t.price)}</dt><dd>${esc(text.price)}</dd></div>
        <div><dt>${esc(t.reservation)}</dt><dd>${esc(text.reservation)}</dd></div>
        <div><dt>${esc(t.organizer)}</dt><dd>${esc(event.organizerName)}</dd></div>
        <div><dt>${esc(t.checkedLabel)}</dt><dd>${esc(event.sourceCheckedAt)}</dd></div>
        <div><dt>${esc(t.updatedLabel)}</dt><dd>${esc(event.updatedAt)}</dd></div>
      </dl>
    </section>
    <section class="detail-section">
      <h2>${esc(t.eventSummaryHeading)}</h2>
      <p>${esc(text.description)}</p>
      <p class="source">${esc(t.sourceLabel)}：<a href="${attr(event.officialSourceUrl)}" target="_blank" rel="noopener">${esc(event.officialSourceName)}</a></p>
    </section>
    <div class="modal-actions detail-actions">
      <a class="btn" href="${attr(event.officialSourceUrl)}" target="_blank" rel="noopener">${esc(t.official)}</a>
      <a class="btn calendar-btn" href="${attr(googleCalendarUrl(event, lang))}" target="_blank" rel="noopener">${esc(t.calendarAdd)}</a>
      <a class="btn map-external-btn" href="https://www.google.com/maps/search/?api=1&query=${attr(encodeURIComponent(event.mapQuery || text.venueName))}" target="_blank" rel="noopener">${esc(t.mapOpen)}</a>
      <a class="btn ghost-btn" href="${attr(pageUrl(lang))}#calendar">${esc(t.backHome)}</a>
    </div>
    <section class="detail-section">
      <h2>${esc(t.related)}</h2>
      <div class="event-list">${renderEventCards(related, lang)}</div>
    </section>
  </article>
</main>
${renderFooter(lang)}
</body>
</html>`;
}

function renderPrivacyPage(lang) {
  const cfg = langConfig[lang];
  const t = copy[lang];
  const canonical = pageUrl(lang, 'privacy');
  const title = lang === 'ja' ? 'プライバシーポリシー｜Spady' : `${t.privacyHeading} | Spady`;
  const description = t.privacyLead;
  const sections = privacySections(lang);
  return `${head({ lang, title, description, canonical, kind: 'privacy', jsonLd: commonJsonLd(lang, canonical, title, description, [
    { name: cfg.siteName, url: pageUrl(lang) },
    { name: t.privacyHeading, url: canonical },
  ]) })}
<body>
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WPRLRR5S" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
${renderHeader(lang, 'privacy')}
<main>
  <div class="wrap">
    <article class="policy">
      <h1>${esc(t.privacyHeading)}</h1>
      <p class="lead">${esc(t.privacyLead)}</p>
      ${sections.map((section, i) => `<h2>${i + 1}. ${esc(section.title)}</h2><p>${esc(section.body)}</p>`).join('\n')}
      <p class="date">制定日：2026年7月</p>
      <div class="back"><a href="${attr(pageUrl(lang))}">${esc(t.backHome)}</a><a href="https://spady.net/" target="_blank" rel="noopener">Spady</a></div>
    </article>
  </div>
</main>
${renderFooter(lang)}
</body>
</html>`;
}

function privacySections(lang) {
  if (lang === 'ja') {
    return [
      ['取得する情報', 'お問い合わせフォームおよびLINEを通じて、お名前、事業・会社名、メールアドレス、ご相談内容などの情報を取得します。'],
      ['利用目的', '取得した情報は、お問い合わせへの回答、ご相談・お打ち合わせの調整、およびご依頼いただいた業務の遂行のためにのみ利用します。'],
      ['第三者への提供', '法令にもとづく場合を除き、ご本人の同意なく個人情報を第三者に提供することはありません。'],
      ['アクセス解析・広告ツール', '当サイトでは、サイト改善および広告配信の効果測定のため、Google アナリティクス等を利用する場合があります。'],
      ['安全管理', '取得した個人情報は、漏えい・滅失・毀損の防止のため、適切に管理します。'],
      ['開示・訂正・削除', 'ご本人から個人情報の開示・訂正・削除のお申し出があった場合、本人確認のうえ、すみやかに対応します。'],
      ['お問い合わせ', '個人情報の取扱いに関するお問い合わせは、Spady公式サイトのお問い合わせ窓口からご連絡ください。'],
    ].map(([title, body]) => ({ title, body }));
  }
  if (lang === 'en') {
    return [
      ['Information we collect', 'We may collect your name, organization, email address and inquiry details when you contact us through forms or messaging services.'],
      ['Purpose of use', 'We use this information only to respond to inquiries, coordinate consultations and provide requested services.'],
      ['Third-party disclosure', 'We do not provide personal information to third parties without consent except when required by law.'],
      ['Analytics and advertising tools', 'We may use tools such as Google Analytics to improve the site and measure advertising effectiveness. These tools may use cookies.'],
      ['Security management', 'We manage collected personal information appropriately to prevent leakage, loss or damage.'],
      ['Disclosure, correction and deletion', 'When requested by the individual, we will respond promptly after confirming identity.'],
      ['Contact', 'For privacy inquiries, please contact Spady through the official Spady website.'],
    ].map(([title, body]) => ({ title, body }));
  }
  if (lang === 'ko') {
    return [
      ['수집하는 정보', '문의 양식이나 메시지를 통해 이름, 회사명, 이메일 주소, 상담 내용을 수집할 수 있습니다.'],
      ['이용 목적', '문의 답변, 상담 일정 조정, 요청받은 업무 수행을 위해서만 이용합니다.'],
      ['제3자 제공', '법령에 따른 경우를 제외하고 본인 동의 없이 개인정보를 제3자에게 제공하지 않습니다.'],
      ['분석 및 광고 도구', '사이트 개선과 광고 효과 측정을 위해 Google Analytics 등의 도구를 사용할 수 있습니다.'],
      ['안전 관리', '개인정보의 유출, 분실, 훼손을 방지하기 위해 적절히 관리합니다.'],
      ['열람・정정・삭제', '본인의 요청이 있을 경우 신원을 확인한 뒤 신속히 대응합니다.'],
      ['문의', '개인정보 처리와 관련한 문의는 Spady 공식 사이트를 통해 연락해 주세요.'],
    ].map(([title, body]) => ({ title, body }));
  }
  const hant = lang === 'zh-Hant';
  return [
    [hant ? '取得的資訊' : '取得的信息', hant ? '透過諮詢表單或訊息服務聯絡時，可能取得姓名、公司名稱、電子郵件與諮詢內容。' : '通过咨询表单或消息服务联系时，可能取得姓名、公司名称、电子邮件和咨询内容。'],
    [hant ? '使用目的' : '使用目的', hant ? '僅用於回覆諮詢、安排洽談以及執行受委託的業務。' : '仅用于回复咨询、安排沟通以及执行受委托的业务。'],
    [hant ? '提供給第三方' : '向第三方提供', hant ? '除法律要求外，未經本人同意不會向第三方提供個人資訊。' : '除法律要求外，未经本人同意不会向第三方提供个人信息。'],
    [hant ? '分析與廣告工具' : '分析与广告工具', hant ? '為改善網站與衡量廣告效果，可能使用 Google Analytics 等工具。' : '为改善网站和衡量广告效果，可能使用 Google Analytics 等工具。'],
    [hant ? '安全管理' : '安全管理', hant ? '會採取適當措施管理個人資訊，防止洩漏、遺失或毀損。' : '会采取适当措施管理个人信息，防止泄露、遗失或损坏。'],
    [hant ? '開示、訂正與刪除' : '披露、更正与删除', hant ? '本人提出請求時，經確認身份後會儘速處理。' : '本人提出请求时，经确认身份后会尽快处理。'],
    [hant ? '聯絡方式' : '联系方式', hant ? '有關個人資訊處理的問題，請透過 Spady 官方網站聯絡。' : '有关个人信息处理的问题，请通过 Spady 官方网站联系。'],
  ].map(([title, body]) => ({ title, body }));
}

function render404(lang) {
  const t = copy[lang];
  const cfg = langConfig[lang];
  const canonical = pageUrl(lang, '404');
  return `${head({ lang, title: `${t.notFoundTitle} | ${cfg.siteName}`, description: t.notFoundText, canonical, kind: '404', jsonLd: commonJsonLd(lang, canonical, t.notFoundTitle, t.notFoundText) })}
<body>
${renderHeader(lang, '404')}
<main><div class="wrap"><article class="policy"><h1>${esc(t.notFoundTitle)}</h1><p class="lead">${esc(t.notFoundText)}</p><div class="back"><a href="${attr(pageUrl(lang))}">${esc(t.backHome)}</a></div></article></div></main>
${renderFooter(lang)}
</body></html>`;
}

function clientScript() {
  return `
(function(){
const data = window.OTARU_PAGE_DATA;
const events = data.events;
const ongoing = data.ongoing;
const garbageRegions = data.garbageRegions;
const garbagePatterns = data.garbagePatterns;
const categoryLabels = data.categoryLabels;
const weekdayLabels = data.weekdayLabels;
const T = data.text;
let year = data.defaultYear;
let month = data.defaultMonth;
let activeFilter = 'all';
let currentEventId = '';
const params = new URLSearchParams(location.search);
if (/^\\\\d{4}-\\\\d{2}$/.test(params.get('month') || '')) {
  const [y,m] = params.get('month').split('-').map(Number);
  year = y; month = m - 1;
}
try { localStorage.setItem('otaru-calendar-lang', data.lang); } catch(e) {}

function escHtml(value){
  return String(value || '').replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
}
function parseDate(s){ const [y,m,d]=s.split('-').map(Number); return new Date(y,m-1,d); }
function localISODate(date){ return date.getFullYear()+'-'+String(date.getMonth()+1).padStart(2,'0')+'-'+String(date.getDate()).padStart(2,'0'); }
function labelDate(date){
  const y=date.getFullYear(), m=date.getMonth()+1, d=date.getDate(), w=weekdayLabels[date.getDay()];
  if(data.lang==='ja') return m+'/'+d+'('+w+')';
  if(data.lang==='en') return (m+'/'+d+' '+w);
  if(data.lang==='ko') return m+'/'+d+' '+w;
  return m+'/'+d+'（'+w+'）';
}
function fullDate(date){
  const y=date.getFullYear(), m=date.getMonth()+1, d=date.getDate(), w=weekdayLabels[date.getDay()];
  if(data.lang==='ja') return y+'年'+m+'月'+d+'日（'+w+'）';
  if(data.lang==='en') return new Intl.DateTimeFormat('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'}).format(date);
  if(data.lang==='ko') return y+'년 '+m+'월 '+d+'일 '+w+'요일';
  return y+'年'+m+'月'+d+'日（星期'+w+'）';
}
function monthTitle(){
  const date = new Date(year, month, 1);
  if(data.lang==='ja') return year+'年'+(month+1)+'月';
  if(data.lang==='en') return new Intl.DateTimeFormat('en-US',{year:'numeric',month:'long'}).format(date);
  if(data.lang==='ko') return year+'년 '+(month+1)+'월';
  return year+'年'+(month+1)+'月';
}
function dateInRange(date,start,end){ return date >= parseDate(start) && date <= parseDate(end); }
function monthEvents(){
  return events.filter(e => {
    if(activeFilter !== 'all' && e.category !== activeFilter) return false;
    const s = parseDate(e.start), en = parseDate(e.end);
    const ms = new Date(year, month, 1), me = new Date(year, month+1, 0, 23,59,59);
    return en >= ms && s <= me;
  });
}
function eventsForDate(date){ return monthEvents().filter(e => dateInRange(date,e.start,e.end)); }
function timeRange(e){ return e.startTime ? (e.endTime ? e.startTime+'–'+e.endTime : e.startTime) : (e.time || ''); }
function renderCalendar(){
  const title = document.getElementById('monthTitle');
  if(title) title.textContent = monthTitle();
  const grid = document.getElementById('calendarGrid');
  if(!grid) return;
  grid.innerHTML = '';
  const first = new Date(year, month, 1);
  const startDay = first.getDay();
  const days = new Date(year, month+1, 0).getDate();
  const prevDays = new Date(year, month, 0).getDate();
  const cells = Math.ceil((startDay + days) / 7) * 7;
  for(let i=0;i<cells;i++){
    let d, cellDate, muted=false;
    if(i<startDay){ d=prevDays-startDay+i+1; cellDate=new Date(year,month-1,d); muted=true; }
    else if(i>=startDay+days){ d=i-(startDay+days)+1; cellDate=new Date(year,month+1,d); muted=true; }
    else { d=i-startDay+1; cellDate=new Date(year,month,d); }
    const iso = localISODate(cellDate);
    const now = new Date();
    const isToday = iso === localISODate(now);
    const evs = eventsForDate(cellDate);
    const cell = document.createElement('div');
    cell.className = 'day' + (muted ? ' muted' : '') + (isToday ? ' today' : '');
    cell.dataset.date = iso;
    cell.innerHTML = '<div class="day-head"><div class="date-stamp"><span class="date-num">'+d+'</span><span class="date-full">'+labelDate(cellDate)+'</span></div>'+(isToday ? '<span class="today-badge">'+escHtml(T.today)+'</span>' : '')+'</div>' +
      evs.slice(0,3).map(e => '<button class="event-pill '+e.category+'" type="button" data-event-id="'+escHtml(e.id)+'">'+escHtml(e.title)+'</button>').join('') +
      (evs.length>3 ? '<div class="day-count">+'+(evs.length-3)+'</div>' : '');
    cell.addEventListener('click', (ev) => {
      if(ev.target && ev.target.dataset && ev.target.dataset.eventId) return;
      openDayModal(cellDate, evs);
    });
    cell.querySelectorAll('[data-event-id]').forEach(btn => btn.addEventListener('click', (ev) => { ev.stopPropagation(); openEventModalById(btn.dataset.eventId); }));
    grid.appendChild(cell);
  }
  renderList();
  updateLanguageLinks();
}
function renderList(){
  const list = document.getElementById('eventList');
  if(!list) return;
  const evs = monthEvents().sort((a,b)=>a.start.localeCompare(b.start));
  document.getElementById('listNote').textContent = evs.length ? (data.lang==='en' ? evs.length+' items shown' : data.lang==='ko' ? evs.length+'건 표시 중' : data.lang==='ja' ? evs.length+'件の情報を表示中' : '顯示 '+evs.length+' 筆資訊') : T.countZero;
  list.innerHTML = evs.map(e => {
    const d = parseDate(e.start);
    const officialName = data.lang !== 'ja' ? '<p class="official-name">'+escHtml(T.officialName)+'：'+escHtml(e.name)+'</p>' : '';
    return '<article class="event-card category-'+e.category+'"><div class="date-box"><div><strong>'+d.getDate()+'</strong><small>'+fullDate(d)+'</small></div></div><div><div class="meta"><span class="tag">'+escHtml(categoryLabels[e.category])+'</span><span class="tag">'+escHtml(e.statusLabel)+'</span></div><h3><a href="'+e.detailUrl+'">'+escHtml(e.title)+'</a></h3>'+officialName+'<p><strong>'+escHtml(T.dateTime)+'：</strong>'+escHtml(fullDate(d)+' '+timeRange(e))+'</p><p><strong>'+escHtml(T.place)+'：</strong>'+escHtml(e.place)+'</p><p>'+escHtml(e.summary)+'</p></div><div class="event-links"><a href="'+e.detailUrl+'">'+escHtml(T.detailsArrow)+'</a><a href="'+e.calendarUrl+'" target="_blank" rel="noopener">'+escHtml(T.calendarAdd)+'</a><a href="'+e.url+'" target="_blank" rel="noopener">'+escHtml(T.official)+'</a></div></article>';
  }).join('');
}
function renderOngoing(){
  const box = document.getElementById('ongoingList');
  if(!box) return;
  box.innerHTML = ongoing.filter(x => activeFilter === 'all' || x.category === activeFilter).map(x => '<div class="info-card category-'+x.category+'"><div class="meta"><span class="tag">'+escHtml(categoryLabels[x.category])+'</span><span class="tag">'+escHtml(x.label)+'</span></div><h3>'+escHtml(x.title)+'</h3><p>'+escHtml(x.summary)+'</p>'+(x.url ? '<a href="'+x.url+'" target="_blank" rel="noopener">'+escHtml(T.official)+'</a>' : '')+'</div>').join('');
}
function openEventModalById(id){ const event = events.find(x => x.id === id); if(event) openEventModal(event); }
function openEventModal(e){
  currentEventId = e.id;
  const d = parseDate(e.start);
  document.getElementById('modalTitle').textContent = e.title;
  document.getElementById('modalMeta').innerHTML = '<span class="tag">'+escHtml(categoryLabels[e.category])+'</span><span class="tag">'+escHtml(fullDate(d))+'</span><span class="tag">'+escHtml(timeRange(e))+'</span>';
  document.getElementById('modalBody').innerHTML = '<p><strong>'+escHtml(T.place)+'：</strong>'+escHtml(e.place)+'</p><p>'+escHtml(e.summary)+'</p>';
  document.getElementById('modalSource').textContent = T.sourceLabel+'：'+e.source;
  document.getElementById('modalDetailLink').href = e.detailUrl;
  document.getElementById('modalLink').href = e.url;
  document.getElementById('modalLink').style.display = 'inline-flex';
  document.getElementById('modalCalendarLink').href = e.calendarUrl;
  document.getElementById('modalCalendarLink').style.display = 'inline-flex';
  renderMap(e.mapQuery, e.place);
  document.getElementById('modal').classList.add('show');
  updateLanguageLinks();
}
function openDayModal(date, dayEvents){
  document.getElementById('modalTitle').textContent = fullDate(date);
  document.getElementById('modalMeta').innerHTML = '<span class="tag">'+escHtml(T.dayInfo)+'</span><span class="tag">'+escHtml(fullDate(date))+'</span>';
  currentEventId = '';
  if(!dayEvents.length){
    document.getElementById('modalBody').innerHTML = '<p>'+escHtml(T.noEventsDay)+'</p>';
    document.getElementById('modalSource').textContent = '';
    document.getElementById('modalLink').style.display = 'none';
    document.getElementById('modalDetailLink').style.display = 'none';
    document.getElementById('modalCalendarLink').style.display = 'none';
    document.getElementById('mapExternalLink').style.display = 'none';
    renderMap('', '');
  } else {
    document.getElementById('modalDetailLink').style.display = 'none';
    document.getElementById('modalBody').innerHTML = '<div class="day-events-list">'+dayEvents.map(e => '<div class="day-event-item"><div class="meta"><span class="tag">'+escHtml(categoryLabels[e.category])+'</span><span class="tag">'+escHtml(timeRange(e))+'</span></div><h3><a href="'+e.detailUrl+'">'+escHtml(e.title)+'</a></h3><p><strong>'+escHtml(T.place)+'：</strong>'+escHtml(e.place)+'</p><p>'+escHtml(e.summary)+'</p><p><a href="'+e.url+'" target="_blank" rel="noopener">'+escHtml(T.official)+'</a></p></div>').join('')+'</div>';
    document.getElementById('modalSource').textContent = T.items ? T.items(dayEvents.length) : dayEvents.length;
    document.getElementById('modalLink').style.display = 'none';
    document.getElementById('modalCalendarLink').style.display = 'none';
    document.getElementById('mapExternalLink').style.display = 'none';
    renderMap('', '');
  }
  document.getElementById('modal').classList.add('show');
  updateLanguageLinks();
}
function renderMap(query,title){
  const map = document.getElementById('mapWrap');
  const external = document.getElementById('mapExternalLink');
  if(query){
    const encoded = encodeURIComponent(query);
    map.innerHTML = '<iframe loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q='+encoded+'&output=embed" title="'+escHtml(title)+'"></iframe>';
    external.href = 'https://www.google.com/maps/search/?api=1&query='+encoded;
    external.style.display = 'inline-flex';
  } else {
    map.innerHTML = '<div class="map-empty">'+escHtml(T.mapEmpty)+'</div>';
    external.style.display = 'none';
  }
}
window.closeModal = function(){ document.getElementById('modal').classList.remove('show'); currentEventId=''; updateLanguageLinks(); };
window.changeMonth = function(delta){ month += delta; if(month<0){month=11;year--;} if(month>11){month=0;year++;} renderCalendar(); };
window.goToday = function(){ const now = new Date(); year=now.getFullYear(); month=now.getMonth(); renderCalendar(); };
function syncCategoryPresentation(){
  const civicArchive = document.getElementById('civicArchive');
  if(civicArchive) civicArchive.hidden = activeFilter !== 'civic';
  const monthlyPanel = document.getElementById('monthlyPanel');
  if(monthlyPanel) monthlyPanel.dataset.category = activeFilter;
}
document.querySelectorAll('.filter[data-filter]').forEach(btn => btn.addEventListener('click', () => {
  document.querySelectorAll('.filter[data-filter]').forEach(x => x.classList.remove('active'));
  btn.classList.add('active');
  activeFilter = btn.dataset.filter;
  renderCalendar();
  renderOngoing();
  syncCategoryPresentation();
}));
function dateDiffDays(a,b){ return Math.round((new Date(a+'T12:00:00') - new Date(b+'T12:00:00'))/86400000); }
function garbageFor(group,dateString){
  const pattern = garbagePatterns[group]; if(!pattern) return [];
  const date = new Date(dateString+'T12:00:00');
  const day = String(date.getDay());
  const results = [...(pattern.weekly[day] || [])];
  pattern.biweekly.forEach(([anchor,type]) => { const diff=dateDiffDays(dateString,anchor); if(diff>=0 && diff%14===0) results.push(type); });
  return [...new Set(results)];
}
function normalizeGarbageText(text){ return String(text||'').trim().replace(/[０-９]/g,s=>String.fromCharCode(s.charCodeAt(0)-0xFEE0)).replace(/\\s+/g,'').replace(/[ヶケ]/g,'ヶ'); }
function findGarbageRegion(input){
  const normalized = normalizeGarbageText(input); if(!normalized) return null;
  const exact = garbageRegions.find(r => normalizeGarbageText(r.label) === normalized); if(exact) return exact;
  const partial = garbageRegions.filter(r => normalizeGarbageText(r.label).includes(normalized) || normalized.includes(normalizeGarbageText(r.label)));
  return partial.length === 1 ? partial[0] : null;
}
function garbageTypeClass(type){ if(type.includes('可燃')) return 'burnable'; if(type.includes('不燃')) return 'nonburnable'; if(type.includes('プラ')) return 'plastic'; if(type.includes('紙')) return 'paper'; return 'cans'; }
function garbageTypeLabel(type){
  if(data.lang==='ja') return type;
  const map = {
    '可燃ごみ': {en:'Burnable waste','zh-Hant':'可燃垃圾','zh-Hans':'可燃垃圾',ko:'타는 쓰레기'},
    '不燃ごみ': {en:'Non-burnable waste','zh-Hant':'不可燃垃圾','zh-Hans':'不可燃垃圾',ko:'타지 않는 쓰레기'},
    'プラ類': {en:'Plastic packaging','zh-Hant':'塑膠類','zh-Hans':'塑料类',ko:'플라스틱류'},
    '紙類': {en:'Paper','zh-Hant':'紙類','zh-Hans':'纸类',ko:'종이류'},
    'かん等': {en:'Cans and bottles','zh-Hant':'罐等','zh-Hans':'罐等',ko:'캔 등'}
  };
  return (map[type] && map[type][data.lang]) || type;
}
function renderGarbageResult(){
  const input = document.getElementById('garbageRegion').value;
  const dateString = document.getElementById('garbageDate').value;
  const result = document.getElementById('garbageResult');
  const region = findGarbageRegion(input);
  if(!input || !dateString){ result.innerHTML = '<div class="garbage-error">'+escHtml(T.garbageEmpty)+'</div>'; return; }
  if(!region){
    const candidates = garbageRegions.filter(r => normalizeGarbageText(r.label).includes(normalizeGarbageText(input))).slice(0,6);
    result.innerHTML = '<div class="garbage-error">'+escHtml(T.garbageEmpty)+(candidates.length ? '<div class="garbage-suggestions">'+candidates.map(c => '<button type="button" data-region="'+escHtml(c.label)+'">'+escHtml(c.label)+'</button>').join('')+'</div>' : '')+'</div>';
    result.querySelectorAll('[data-region]').forEach(btn => btn.addEventListener('click', () => { document.getElementById('garbageRegion').value=btn.dataset.region; renderGarbageResult(); }));
    return;
  }
  const date = new Date(dateString+'T12:00:00');
  if(date.getFullYear() !== 2026){ result.innerHTML = '<div class="garbage-error">'+escHtml(T.garbageYearNote)+' <a href="https://www.city.otaru.lg.jp/docs/2025102700045/" target="_blank" rel="noopener">'+escHtml(T.official)+'</a></div>'; return; }
  const types = garbageFor(region.group, dateString);
  result.innerHTML = '<div class="garbage-result-head"><div><small>'+escHtml(region.label)+'・No.'+region.group+'</small><strong>'+escHtml(fullDate(date))+'</strong></div><a href="https://www.city.otaru.lg.jp/docs/2025102700045/" target="_blank" rel="noopener">'+escHtml(T.garbageOfficial)+'</a></div>' +
    (types.length ? '<div class="garbage-types">'+types.map(type => '<div class="garbage-type '+garbageTypeClass(type)+'"><span>'+escHtml(garbageTypeLabel(type))+'</span><b>'+escHtml(type)+'</b></div>').join('')+'</div>' : '<div class="garbage-none"><span>'+escHtml(T.garbageNoCollection)+'</span><small>'+escHtml(T.garbageNoCollectionNote)+'</small></div>');
}
function setupGarbageLookup(){
  const list = document.getElementById('garbageRegionList');
  if(!list) return;
  list.innerHTML = garbageRegions.map(r => '<option value="'+escHtml(r.label)+'">No.'+r.group+'</option>').join('');
  const dateInput = document.getElementById('garbageDate');
  dateInput.value = localISODate(new Date());
  document.getElementById('garbageSearchBtn').addEventListener('click', renderGarbageResult);
  document.getElementById('garbageRegion').addEventListener('change', renderGarbageResult);
  dateInput.addEventListener('change', renderGarbageResult);
}
function updateLanguageLinks(){
  document.querySelectorAll('[data-lang-link]').forEach(a => {
    const code = a.dataset.langLink;
    const base = data.langUrls[code] || a.href;
    const p = new URLSearchParams();
    p.set('month', year+'-'+String(month+1).padStart(2,'0'));
    if(currentEventId) p.set('event', currentEventId);
    a.href = base + '?' + p.toString();
  });
}
const flyingLogo = document.getElementById('flyingLogo');
const brandSlot = document.getElementById('brandLogoSlot');
const brandTap = document.querySelector('.brand');
let logoAngle = 0, scrollBoost = 0, logoLoopStarted = false, lastScrollY = window.scrollY, lastFrameTime = performance.now();
function flashLogo(){ if(!flyingLogo) return; flyingLogo.classList.remove('logo-glow'); void flyingLogo.offsetWidth; flyingLogo.classList.add('logo-glow'); }
function startLogoRotation(){ if(logoLoopStarted || !flyingLogo) return; logoLoopStarted=true; function frame(now){ const dt=Math.min(40, now-lastFrameTime); lastFrameTime=now; logoAngle += dt*0.0022 + scrollBoost; scrollBoost *= .88; flyingLogo.style.transform='rotate('+logoAngle+'deg)'; requestAnimationFrame(frame); } requestAnimationFrame(frame); }
window.addEventListener('scroll', () => { const y=window.scrollY; const delta=y-lastScrollY; lastScrollY=y; scrollBoost += delta*.055; }, {passive:true});
if(brandTap) brandTap.addEventListener('click', flashLogo);
async function runOpening(){
  document.body.classList.remove('loading');
  const splash = document.getElementById('splash');
  if(!flyingLogo || !brandSlot || !splash){ startLogoRotation(); return; }
  await new Promise(resolve => setTimeout(resolve, 180));
  flashLogo();
  await new Promise(resolve => setTimeout(resolve, 520));
  const target = brandSlot.getBoundingClientRect();
  const start = flyingLogo.getBoundingClientRect();
  const dx = target.left - start.left;
  const dy = target.top - start.top;
  const scale = target.width / start.width;
  const logoAnim = flyingLogo.animate([{transform:'translate(0,0) scale(1) rotate(0deg)',filter:'brightness(1)',offset:0},{transform:'translate(0,0) scale(1.08) rotate(55deg)',filter:'brightness(1.75) drop-shadow(0 0 28px rgba(255,244,185,.95))',offset:.2},{transform:'translate('+dx+'px,'+dy+'px) scale('+scale+') rotate(720deg)',filter:'brightness(1)',offset:1}],{duration:1500,easing:'cubic-bezier(.22,.78,.22,1)',fill:'forwards'});
  splash.animate([{opacity:1,offset:0},{opacity:1,offset:.46},{opacity:0,offset:1}],{duration:1500,easing:'ease',fill:'forwards'});
  try { await logoAnim.finished; } catch(e) {}
  logoAnim.cancel();
  brandSlot.appendChild(flyingLogo);
  flyingLogo.className = 'brand-logo';
  flyingLogo.style.position='static'; flyingLogo.style.left='auto'; flyingLogo.style.top='auto'; flyingLogo.style.width='42px'; flyingLogo.style.height='42px'; flyingLogo.style.display='block'; flyingLogo.style.opacity='1'; flyingLogo.style.visibility='visible'; flyingLogo.style.transform='rotate(0deg)';
  splash.classList.add('hide');
  startLogoRotation();
}
window.addEventListener('load', runOpening);
renderCalendar();
renderOngoing();
syncCategoryPresentation();
setupGarbageLookup();
updateLanguageLinks();
const requestedEvent = params.get('event');
if(requestedEvent) setTimeout(() => openEventModalById(requestedEvent), 300);
})();`;
}

function renderSitemap() {
  const alternates = (kind, slug = '') => langOrder.map((lang) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${pageUrl(lang, kind, slug)}"/>`).join('\n') + `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${pageUrl('ja', kind, slug)}"/>`;
  const urlEntry = (loc, lastmod, priority, kind, slug = '') => `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
${alternates(kind, slug)}
    <changefreq>${kind === 'event' ? 'weekly' : kind === 'privacy' ? 'yearly' : 'daily'}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  const entries = [];
  for (const lang of langOrder) entries.push(urlEntry(pageUrl(lang), buildDate, '1.0', 'index'));
  for (const lang of langOrder) entries.push(urlEntry(pageUrl(lang, 'privacy'), buildDate, '0.3', 'privacy'));
  for (const event of events) {
    for (const lang of langOrder) entries.push(urlEntry(pageUrl(lang, 'event', event.slug), event.updatedAt, event.eventStatus === 'EventCompleted' ? '0.4' : '0.8', 'event', event.slug));
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`;
}

function renderRobots() {
  return `User-agent: *
Allow: /
Allow: /assets/
Disallow: /data/
Disallow: /tools/

Sitemap: ${origin}/sitemap.xml
`;
}

function renderRedirects() {
  return `/index.html / 301
/privacy.html /privacy/ 301
/en.html /en/ 301
/zh-hant.html /zh-hant/ 301
/zh-hans.html /zh-hans/ 301
/ko.html /ko/ 301
/data/* /404.html 404
/tools/* /404.html 404
`;
}

function build() {
  for (const lang of langOrder) {
    writeFile(outputPath(lang, 'index'), renderIndexPage(lang));
    writeFile(outputPath(lang, 'privacy'), renderPrivacyPage(lang));
    writeFile(outputPath(lang, '404'), render404(lang));
    for (const event of events) {
      writeFile(outputPath(lang, 'event', event.slug), renderEventPage(event, lang));
    }
  }
  // Keep /privacy.html as a compatibility copy for existing links.
  writeFile('privacy.html', renderPrivacyPage('ja'));
  writeFile('404.html', render404('ja'));
  writeFile('sitemap.xml', renderSitemap());
  writeFile('robots.txt', renderRobots());
  writeFile('_redirects', renderRedirects());
  writeFile('llms.txt', `# Otaru Events Calendar

${origin}/ is a privately operated multilingual calendar by Spady for public information about Otaru, Hokkaido, Japan.

Important pages:
- Japanese: ${pageUrl('ja')}
- English: ${pageUrl('en')}
- Traditional Chinese: ${pageUrl('zh-Hant')}
- Simplified Chinese: ${pageUrl('zh-Hans')}
- Korean: ${pageUrl('ko')}
- Sitemap: ${origin}/sitemap.xml

The site summarizes official public information and links to the original source for each event. It is not an official Otaru City or government website.
`);
}

build();
