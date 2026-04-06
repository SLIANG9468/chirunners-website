export const LANGUAGE_STORAGE_KEY = 'preferredLanguage'

/**
 * Local races shown on the race volunteer info table.
 * Optional `raceZh`: Chinese label for the race name column when UI language is 中文.
 */
export const VOLUNTEER_RACE_ROWS = [
  {
    date: '2026-03-22',
    location: 'Chicago',
    race: 'Shamrock Shuffle',
    website: 'https://www.shamrockshuffle.com/register/8krun/',
    volunteerCellLabel: '',
    photoAlbumId: 'shamrock-shuffle-2026',
  },
  {
    date: '2026-04-04',
    location: 'Chicago',
    race: 'Chi Town Half Marathon',
    website: 'https://allcommunityevents.com/chitownhalfmarathon10k',
  },
  {
    date: '2026-04-19',
    location: 'Naperville',
    race: "Naperville Women's Half Marathon & 5K",
    website: 'https://napervillewomenshalf.events/',
    volunteerCellLabel: '',
  },
  {
    date: '2026-05-03',
    location: 'Elk Grove Village',
    race: 'Chicagoland Spring Marathon & Half Marathon',
    website: 'https://allcommunityevents.com/chicagolandspringmarathon',
  },
  {
    date: '2026-05-17',
    location: 'Chicago',
    race: 'LIFETIME Chicago Spring Half Marathon + 5K',
    website: 'https://www.chicagospringhalf.com/',
    volunteerCellLabel: '',
  },
  {
    date: '2026-05-31',
    location: 'Highland Park',
    race: 'North Shore Classic',
    website: 'https://northshoreclassic.com/',
  },
  {
    date: '2026-06-07',
    location: 'Chicago',
    race: 'Chicago 13.1',
    website: 'https://www.chicago13point1.com/',
  },
  {
    date: '2026-06-27',
    location: 'Hoffman Estates',
    race: 'Stars and Stripes Half Marathon, 10K & 5K',
    website: 'https://allcommunityevents.com/starsandstripesrun',
  },
  {
    date: '2026-10-03',
    location: 'Long Grove',
    race: "Long Grove's Run Fest Oktober Fest 5K",
    website: 'https://allcommunityevents.com/oktoberfest5k',
    volunteerCellLabel: '',
  },
  {
    date: '2026-10-03',
    location: 'Long Grove',
    race: 'Prairie State Half Marathon & 10K Run/Walk',
    website: 'https://allcommunityevents.com/prairiestatehalfmarathon',
  },
  {
    date: '2026-10-08',
    location: 'Chicago',
    race: 'Chicago Marathon Expo Day 1',
  },
  {
    date: '2026-10-09',
    location: 'Chicago',
    race: 'Chicago Marathon Expo Day 2',
  },
  {
    date: '2026-10-09',
    location: 'Rosemont',
    race: 'Chicago Marathon Carb-Loading Dinner',
    raceZh: '芝加哥马拉松加碳会',
  },
  {
    date: '2026-10-10',
    location: 'Chicago',
    race: 'Chicago Marathon Expo Day 3',
  },
  {
    date: '2026-10-11',
    location: 'Chicago',
    race: 'Chicago Marathon',
  },
  {
    date: '2026-10-17',
    location: 'Chicago',
    race:
      'Chicago Fall Classic Run FEST: Half Marathon & 10K and the Hot Cider Hustle 5K',
    website: 'https://allcommunityevents.com/chicagofallclassic',
  },
  {
    date: '2026-11-28',
    location: 'Schaumburg',
    race: 'Schaumburg Turkey Trot Half Marathon / 5K',
    website: 'https://allcommunityevents.com/schaumburgturkeytrot',
  },
]

/**
 * Board members: optional crop tuning (Avatar component):
 * `avatarObjectPosition` (e.g. 'center 35%'), `photoScale`, `photoOffsetX`, `photoOffsetY`.
 */
export const BOARD_MEMBERS = [
  { key: 'kenny', photoUrl: null },
  { key: 'mark', photoUrl: null },
  {
    key: 'sherri',
    photoUrl: '/photo/Sherri.png',
    photoScale: 1.15,
    photoOffsetY: 6,
  },
  {
    key: 'xiaofeng',
    photoUrl: '/photo/Xiaofeng.png',
  },
  { key: 'yuning', photoUrl: '/photo/yuning.png' },
  { key: 'bibo', photoUrl: '/photo/bibo.png' },
  { key: 'hanlin', photoUrl: null },
  { key: 'wei', photoUrl: null },
  { key: 'danrey', photoUrl: null },
]

/** EN/ZH display names for the board page (language toggle picks one line per card). */
export const BOARD_MEMBER_LABELS = {
  kenny: { en: 'Kenny Qin', zh: '风城网事' },
  mark: { en: 'Mark Jiang', zh: '马哥' },
  sherri: { en: 'Sherri Liang-Zhou', zh: '梁向绍' },
  xiaofeng: { en: 'Xiaofeng Li', zh: '李晓枫' },
  yuning: { en: 'Yuning Zu', zh: '祖玉宁' },
  bibo: { en: 'Bibo Gao', zh: '高碧波' },
  hanlin: { en: 'Hanlin Nie', zh: '聂汉林' },
  wei: { en: 'Wei Chen', zh: '陈玮' },
  danrey: { en: 'Danrey Toth', zh: '丹睿' },
}

export const CONTENT = {
  en: {
    brand: 'CHI Running Club/芝加哥驰跑团',
    nav: {
      home: 'Home',
      join: 'JOIN',
      joinUrl: 'https://runsignup.com/MemberOrg/chirunners',
      about: 'About',
      history: 'History',
      boardMembers: 'Board Members',
      marathonWelcome: 'Chicago Marathon',
      checkins: 'Chi Has Been Here',
      raceVolunteer: 'Race & Volunteer',
      menu: 'Menu',
      menuClose: 'Close menu',
    },
    aboutParagraphs: [
      'The CHI Running Club (commonly known as "ChiRunners") is a 501(c)(3) nonprofit organization formed by Chinese American running enthusiasts in the greater Chicago area. As a member of the Road Runners Club of America (RRCA), we are committed to promoting a healthy lifestyle and building a supportive running community.',
    ],
    routesTitle: "CHI Running Club's Regular Routes",
    routesParagraph:
      'Our regular routes cover a wide range of scenic paths throughout Chicago and its suburbs, catering to runners of all levels.',
    heatmapPlaceholder: 'Heatmap (placeholder)',
    volunteerParagraph:
      'Our running friends are passionate about volunteering at local races and actively supporting the running community.',
    volunteerRacesTitle: 'Race & Volunteer Info',
    volunteerRacesSubtitle:
      'The table below lists local races. For selected events, the CHI Running Club will organize volunteer opportunities to support the race community. Click the links in the table to view photos.',
    volunteerTable: {
      date: 'Date',
      location: 'Location',
      race: 'Race name',
      website: 'Official website',
      officialSite: 'Official site',
      volunteerColumn: 'Volunteer',
      volunteerCellLabel: 'GO',
      racePhotoSlideshowAria: (raceName) => `Open photo slideshow for ${raceName}`,
      albumPhotosLoading: 'Loading photos...',
    },
    slideshow: {
      noPhotos: 'No photos found in backend photo folder yet.',
      loadError: 'Could not connect to backend photo API.',
      prev: 'Prev',
      next: 'Next',
      close: 'Close',
      refresh: 'Refresh shared order',
      refreshing: 'Refreshing...',
      counter: (idx, total) => `${idx} / ${total}`,
      failedLoad: (status) => `Failed to load photos (HTTP ${status})`,
      failedRefresh: (status) => `Failed to refresh shared order (HTTP ${status})`,
    },
    footer: (year) => `© ${year} CHI Running Club`,
    homeHeroErrorLoad: 'Failed to load homepage slideshow photos.',
    homeHeroErrorConnect: 'Could not connect to backend for homepage slideshow.',
    checkinsTitle: 'Chi Has Been Here',
    checkinsSubtitle: 'Click a red flag to view city photos.',
    checkinsLoading: 'Loading map locations...',
    checkinsNoData: 'No geocoded locations yet. Run geocode refresh first.',
    checkinsMapError: 'Could not load location data from backend.',
    checkinsPopupLoading: 'Loading photos...',
    checkinsPopupNoPhotos: 'No photos found for this city.',
    checkinsPopupPrev: 'Prev',
    checkinsPopupNext: 'Next',
    checkinsPopupCounter: (idx, total) => `${idx} / ${total}`,
    checkinsPhotoNoRunner: '—',
    checkinsPhotoMetaSep: ' · ',
    checkinsIntroLines: [
      'Our “Chi Has Been Here Map” is live! Wherever your feet take you next:',
      '🏅 Racing on major event courses',
      '🌅 Fresh morning runs that wake up the city',
      '🧳 Travel runs across the map',
      '⛰️ Trail runs in the hills',
      'Whenever you reach a finish line or pass a city landmark:',
      '📍 Pull out our Chi Runners mini flag!',
      '📸 Take a special check-in photo!',
      'Share the photo in our WeChat group (芝加哥驰跑团ChiRunners) with:',
      '🗺️ Location: country + city',
      '👟 Type: race name, fun run, or other running activity',
      '📅 Date: when you checked in',
      "Let's set a goal: by next New Year's Eve countdown, see how many corners of the world our little flags can reach! 🗺️",
      '🔥 Run everywhere, Chi everywhere!',
    ],
    historyTitle: 'History',
    historyMilestones: [
      {
        heading: '2013 · Starting point 🌅',
        body:
          'In Buffalo Grove, Li Shaorun sent an email calling together Huang Haiyan, Lu Lin, Shen Xiang, Tao Ping, and Michael for the first New Year’s Day run. Li Lei joined soon after, downloaded Strava, started the WeChat group, sketched training plans, and helped draft the club’s statement.',
      },
      {
        heading: '2015 · Toward the race course 🏅',
        body:
          'We volunteered at the Chicago Marathon for the first time—and the club stepped onto a bigger stage.',
      },
      {
        heading: '2016 · Photo crew 📸',
        body:
          'The Chicago Marathon photography team formed to capture every struggle and smile through the lens.',
      },
      {
        heading: '2022 · Nonprofit registration 🏛️',
        body:
          'Led by captain Bai Xuefeng, the club formally registered as a nonprofit (501(c)(3)) and entered a more structured chapter of growth.',
      },
      {
        heading: '2024 · Welcoming Chinese runners worldwide 🌍',
        body:
          'The club began hosting large gatherings; each time more than 200 running groups took part, cheering one another on.',
      },
    ],
    boardMembersTitle: 'Board Members',
    marathonWelcome: {
      heroTitle: 'Welcome to the Chicago Marathon',
      heroCourse:
        'The Chicago Marathon course is famously flat and fast, with cheering neighborhoods and a stunning finish in downtown Chicago—one of the Abbott World Marathon Majors.',
      heroClub:
        'CHI Running Club / 芝加哥驰跑团 welcomes you. We hope race weekend feels smooth, joyful, and full of community support.',
      guidesTitle: 'Race weekend guides',
      cards: {
        carbLoading: {
          title: 'Carb-loading dinner',
          description:
            'Meet other runners, share race-week energy, and enjoy a pre-marathon gathering with the club.',
          cta: 'Open guide',
        },
        hotel: {
          title: 'Hotels & lodging',
          description:
            'Ideas for staying near the start, the Loop, transit, and budget-friendly options.',
          cta: 'Open guide',
        },
        transportation: {
          title: 'Getting around',
          description:
            'CTA, Metra, ride-share, and walking tips to help you move confidently on race weekend.',
          cta: 'Open guide',
        },
      },
      closingTitle: 'Stay connected',
      closingBody:
        'Come run with us at a group run, say hello at an event, or cheer each other on along the course. We would love to see you in Chicago beyond race day.',
      closingSocialIntro: 'Follow CHI Running Club on:',
      closingSocialLinks: [
        {
          label: 'WeChat Official Account',
          url: null,
          hint: 'Search “芝加哥驰跑团 ChiRunners” in WeChat to find our official account.',
        },
        {
          label: 'Xiaohongshu',
          url: null,
          hint: 'Open the Xiaohongshu app and search for CHI Running Club / 芝加哥驰跑团.',
        },
        {
          label: 'Instagram',
          url: null,
          hint: 'Search for CHI Running Club / ChiRunners on Instagram, or add your profile link in siteContent (closingSocialLinks).',
        },
      ],
      closingSocialFootnote:
        'Tip: hover a label for details. On mobile, open WeChat or Xiaohongshu and search for ChiRunners / 芝加哥驰跑团. Add Instagram and Xiaohongshu URLs in siteContent when ready.',
      backToHub: '← Back to Chicago Marathon',
      topics: {
        carbLoading: {
          title: 'Carb-loading dinner',
          body:
            'This page is a placeholder. Add venue, timing, RSVP, and photos here. Link back to the volunteer table or your RunSignUp flow when ready.',
        },
        hotel: {
          title: 'Hotels & lodging',
          body:
            'This page is a placeholder. Add neighborhood notes, sample hotels, and booking tips for visiting runners.',
        },
        transportation: {
          title: 'Transportation',
          body:
            'This page is a placeholder. Add CTA/Ventra basics, airport routes, and race-morning timing tips.',
        },
      },
    },
  },
  zh: {
    brand: 'CHI Running Club/芝加哥驰跑团',
    nav: {
      home: '首页',
      join: '加入',
      joinUrl: 'https://runsignup.com/MemberOrg/chirunners',
      about: '关于我们',
      history: '历史',
      boardMembers: '董事会',
      marathonWelcome: '芝加哥马拉松',
      checkins: '全球打卡',
      raceVolunteer: '比赛 & 义工',
      menu: '菜单',
      menuClose: '关闭菜单',
    },
    aboutParagraphs: [
      '驰跑团（CHI Running Club/ChiRunners）是由大芝加哥地区的华人跑步爱好者组成的非盈利组织。我们致力于通过跑步促进健康的生活方式，培养社区意识。',
      '我们每周都会在芝加哥及其周边的多个地点组织群跑活动，欢迎各级别的跑者参与。除了每周群跑，我们还会在全年举办特别活动和社交聚会。',
      '联系我们：info@chirunners.org',
    ],
    routesTitle: '驰跑团常规路线',
    routesParagraph:
      '驰跑团常规路线覆盖芝加哥及周边多个风景路线，适合不同水平跑者参与。',
    heatmapPlaceholder: '热力图（占位）',
    volunteerParagraph: '我们的跑友积极参与本地赛事志愿服务，持续支持跑步社区发展。',
    volunteerRacesTitle: '比赛 & 义工信息',
    volunteerRacesSubtitle:
      '下表列出了本地赛事，驰跑团也将在部分赛事中组织义工参与，支持跑步社区。点击表格中的链接可查看活动照片。',
    volunteerTable: {
      date: '日期',
      location: '地点',
      race: '赛事名称',
      website: '官网链接',
      officialSite: '官网',
      volunteerColumn: '义工招募',
      volunteerCellLabel: '义工',
      racePhotoSlideshowAria: (raceName) => `打开「${raceName}」照片幻灯片`,
      albumPhotosLoading: '正在加载照片...',
    },
    slideshow: {
      noPhotos: '后台照片文件夹中暂未找到图片。',
      loadError: '无法连接后端照片接口。',
      prev: '上一张',
      next: '下一张',
      close: '关闭',
      refresh: '刷新全局顺序',
      refreshing: '刷新中...',
      counter: (idx, total) => `${idx} / ${total}`,
      failedLoad: (status) => `加载照片失败（HTTP ${status}）`,
      failedRefresh: (status) => `刷新全局顺序失败（HTTP ${status}）`,
    },
    footer: (year) => `© ${year} CHI Running Club`,
    homeHeroErrorLoad: '加载首页轮播图失败。',
    homeHeroErrorConnect: '无法连接后端首页轮播接口。',
    checkinsTitle: '全球打卡',
    checkinsSubtitle: '点击红色旗标查看该城市照片。',
    checkinsLoading: '正在加载地图点位...',
    checkinsNoData: '暂无已编码坐标数据，请先执行 geocode refresh。',
    checkinsMapError: '无法从后端加载地图数据。',
    checkinsPopupLoading: '正在加载照片...',
    checkinsPopupNoPhotos: '该城市暂无照片。',
    checkinsPopupPrev: '上一张',
    checkinsPopupNext: '下一张',
    checkinsPopupCounter: (idx, total) => `${idx} / ${total}`,
    checkinsPhotoNoRunner: '—',
    checkinsPhotoMetaSep: ' · ',
    checkinsIntroLines: [
      '驰跑团“全球打卡地图”正式上线啦！无论你的脚步迈向何方：',
      '🏅 挑战各大赛事的激情赛道',
      '🌅 唤醒城市的清爽晨跑',
      '🧳 丈量世界的旅行跑',
      '⛰️ 探索山野的 Trail Run',
      '只要你抵达 比赛终点，或路过 城市地标（Landmark）：',
      '📍 掏出咱们驰跑团的小旗子！',
      '📸 拍下一张专属打卡照！',
      '请把照片“砸”到群里（芝加哥驰跑团ChiRunners），',
      '🗺️ 坐标： 国家名 + 城市名',
      '👟 类型： 比赛名称、欢乐跑，或其他跑步活动',
      '📅 日期： 打卡时间',
      '让我们一起定个小目标：等到明年春晚倒计时，看看咱们驰跑团的小旗子，能不能插遍全世界的每一个角落！🗺️',
      '🔥 跑到哪儿，驰到哪儿！',
    ],
    historyTitle: '历史沿革',
    historyMilestones: [
      {
        heading: '2013 · 起点 🌅',
        body:
          '在芝加哥牛村（Buffalo Grove），因为李绍润发出 E-mail 召集，黄海燕、卢琳、沈翔、陶平、Michael 开启了第一次元旦首跑。李磊随后加入，下载 Strava，组建微信群，制定训练计划，撰写宣言。',
      },
      {
        heading: '2015 · 迈向赛道 🏅',
        body: '首次参与 Chicago Marathon 义工服务，驰跑团开始走向更大的舞台。',
      },
      {
        heading: '2016 · 摄影队 📸',
        body: '芝加哥马拉松摄影队成立，用镜头记录每一次奋斗与欢笑。',
      },
      {
        heading: '2022 · 非营利注册 🏛️',
        body:
          '驰跑团正式在队长白雪峰的带领下，注册为非营利组织（501(c)(3)），进入规范发展阶段。',
      },
      {
        heading: '2024 · 接待全球华人跑者 🌍',
        body:
          '驰跑团开始举办加碳会，每一次超过200跑友参加，大家相互鼓劲加油。',
      },
    ],
    boardMembersTitle: '董事会成员',
    marathonWelcome: {
      heroTitle: '欢迎来到芝加哥马拉松',
      heroCourse:
        '芝加哥马拉松赛道以平坦、快速著称，沿途社区氛围热烈，终点位于芝加哥市中心，也是世界马拉松大满贯赛事之一。',
      heroClub:
        '驰跑团 (CHI Running Club) 欢迎你的到来， 我们在这里为你加油！愿你度过一个顺利、开心、充满力量的马拉松周末。',
      guidesTitle: '赛事周末指南',
      cards: {
        carbLoading: {
          title: '加碳会',
          description: '赛前聚餐、认识跑友、感受社区氛围，为比赛日储备好心情与能量。',
          cta: '查看详情',
        },
        hotel: {
          title: '住宿',
          description: '起点附近、Loop、交通与性价比方向的住宿思路，帮助你更快安顿下来。',
          cta: '查看详情',
        },
        transportation: {
          title: '交通出行',
          description: 'CTA、Metra、网约车与步行等提示，让你在周末移动更安心。',
          cta: '查看详情',
        },
      },
      closingTitle: '欢迎与我们保持联系',
      closingBody:
        '欢迎参加群跑、在活动中打招呼，或在赛道旁互相加油。我们也期待在赛事之外与你相遇在芝加哥。',
      closingSocialIntro: '关注驰跑团：',
      closingSocialLinks: [
        {
          label: '微信公众号',
          url: null,
          hint: '请在微信中搜索「芝加哥驰跑团」或「ChiRunners」关注公众号。',
        },
        {
          label: '小红书',
          url: null,
          hint: '打开小红书 App，搜索「芝加哥驰跑团」或「ChiRunners」关注。',
        },
        {
          label: 'Instagram',
          url: null,
          hint: '在 Instagram 搜索「ChiRunners」或「芝加哥驰跑团」；有主页链接后可在 siteContent.js 的 closingSocialLinks 中填入 url。',
        },
      ],
      closingSocialFootnote:
        '提示：电脑上可将鼠标悬停在标签上查看说明；手机上请在微信、小红书 App 内搜索「芝加哥驰跑团」。有小红书或 Instagram 主页链接时，在 siteContent.js 里把对应 url 填上即可变为可点击按钮。',
      backToHub: '← 返回芝加哥马拉松',
      topics: {
        carbLoading: {
          title: '加碳会',
          body: '此页面为占位内容，可补充时间地点、报名方式和活动照片等；也可与比赛义工表或 RunSignUp 流程互链。',
        },
        hotel: {
          title: '住宿',
          body: '此页面为占位内容，可补充区域说明、酒店参考与预订提示，方便来访跑者安排行程。',
        },
        transportation: {
          title: '交通出行',
          body: '此页面为占位内容，可补充 CTA/Ventra、机场路线与比赛日早晨的时间规划建议。',
        },
      },
    },
  },
}

export function resolveInitialLanguage() {
  const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
  if (saved === 'en' || saved === 'zh') {
    return saved
  }

  const browserLang = (window.navigator.language || '').toLowerCase()
  return browserLang.startsWith('zh') ? 'zh' : 'en'
}
