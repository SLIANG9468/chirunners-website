export const LANGUAGE_STORAGE_KEY = 'preferredLanguage'

export const RACE_ROWS = [
  {
    location: 'All Community Events',
    race: 'Half Marathon',
    website: 'http://allcommunityevents.com/',
  },
  {
    location: 'Chicago, IL',
    race: 'LifeTime Chicago Half Marathon',
    website: 'http://www.chicagohalfmarathon.com/',
  },
  {
    location: 'Chicago, IL',
    race: 'Chicago 13.1',
    website: 'https://www.chicago13point1.com/',
  },
  {
    location: 'Chicago, IL',
    race: 'Chicago Marathon',
    website: 'http://www.chicagomarathon.com',
  },
  {
    location: 'Fox Valley, IL',
    race: 'Fox Valley Marathon/Half Marathon',
    website: 'http://www.fv26.com/register',
  },
  {
    location: 'Geneva, IL',
    race: 'Last Chance BQ2 Marathon',
    website: 'http://www.bq2races.com/',
  },
  {
    location: 'Lake Zurich, IL',
    race: 'Alpine Races',
    website: 'https://www.alpinerunners.com/alpineraces',
  },
  {
    location: 'Indianapolis, IN',
    race: 'Indianapolis Monumental Marathon',
    website: 'http://www.monumentalmarathon.com/',
  },
  {
    location: 'Naperville, IL',
    race: 'Healthy Driven Naperville Half Marathon',
    website: 'http://runnaperville.com/',
  },
]

/** Display order for board members page (photos are placeholders until you add `photoUrl`). */
export const BOARD_MEMBERS = [
  { key: 'kenny', photoUrl: null },
  { key: 'mark', photoUrl: null },
  { key: 'sherri', photoUrl: null },
  { key: 'xiaofeng', photoUrl: null },
  { key: 'yuning', photoUrl: null },
  { key: 'bibo', photoUrl: null },
  { key: 'hanlin', photoUrl: null },
  { key: 'wei', photoUrl: null },
  { key: 'danrey', photoUrl: null },
]

export const CONTENT = {
  en: {
    brand: 'CHI Running Club/芝加哥驰跑团',
    nav: {
      home: 'Home',
      history: 'History',
      boardMembers: 'Board Members',
      races: 'Local Race Info',
      marathon: 'Chicago Marathon FAQ',
      checkins: 'Chi Has Been Here',
    },
    aboutParagraphs: [
      'The CHI Running Club is a non-profit organization formed by Chinese American running enthusiasts in the greater Chicago area. We are dedicated to promoting a healthy lifestyle and fostering a sense of community through running.',
      'Each week, we organize group runs in various locations throughout Chicago and its suburbs, catering to runners of all levels. In addition to weekly runs, we also host special events and social gatherings throughout the year.',
      'Contact us: info@chirunners.org',
    ],
    stravaLabel: 'Please visit our Strava club page:',
    routesTitle: "CHI Running Club's Regular Routes",
    routesParagraph:
      'Our regular routes cover a wide range of scenic paths throughout Chicago and its suburbs, catering to runners of all levels.',
    heatmapPlaceholder: 'Heatmap (placeholder)',
    volunteerParagraph:
      'Our running friends are passionate about volunteering at local races and actively supporting the running community.',
    racesTitle: 'Local Race Info',
    racesSubtitle: 'Local Race Info in Chicago Area',
    table: {
      location: 'Location',
      race: 'Race Name',
      website: 'Official Website',
      officialSite: 'Official Site',
      allCommunityEventsButton: 'All Community Events',
      allCommunityEventsLoading: 'Loading photos...',
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
    marathonTitle: 'Chicago Marathon FAQ',
    marathonSubtitle:
      'Registration / Stay / Transportation / Weather & EAS / Expo / Race Day / Spectator Guide / Misc',
    marathonFaq: [
      {
        title: 'Registration',
        body: 'Chicago Marathon entry is not officially transferable, and race packets cannot be picked up by someone else.',
      },
      {
        title: 'Stay',
        body: 'Loop is most convenient for race start/finish; airport areas can be more budget-friendly.',
      },
      {
        title: 'Transportation',
        body: 'Use CTA/Ventra, taxi, or Uber based on your schedule and lodging location.',
      },
      {
        title: 'Weather and EAS',
        body: 'Race day weather can vary. Follow official EAS color alerts and race updates.',
      },
      {
        title: 'Expo and bib pickup',
        body: 'Expo is usually at McCormick Place. Follow official guidance for pickup and check-in.',
      },
      {
        title: 'Race day',
        body: 'Read the Participant Guide carefully and arrive early for security and bag check.',
      },
      {
        title: 'Spectator guide',
        body: 'Use official/non-official tracking and pick planned points to cheer multiple times.',
      },
      {
        title: 'Misc',
        body: 'For photos, check official event photography providers and community photo spots.',
      },
    ],
    sponsorTitle: 'Road Runner Sports',
    sponsorText: 'Road Runner Sports local stores offer discounts to all our members.',
    sponsorSubtext: 'Please visit stores for more info.',
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
    historyTitle: 'History',
    historyParagraphs: [
      'The CHI Running Club traces its roots to informal gatherings that began around 2014, when a small group of runners started meeting regularly in the Chicago area. Early meetups focused on consistency, safety, and making space for every pace on city streets and suburban trails. Word spread gradually as friends invited friends to weekend long runs and weeknight loop workouts. Those first seasons laid the groundwork for clearer weekly routes and simple organizing routines that members could rely on. Today we still honor that original idea: show up, support each other, and keep moving forward together.',
      'As participation grew, the club began hosting a wider mix of social events alongside training runs throughout the year. Members volunteered at local races, shared travel tips for destination events, and built friendships that extended beyond scheduled workouts. The community became a steady place for newcomers arriving in Chicago and for longtime residents looking for training partners. Along the way, leadership rotated naturally as volunteers stepped up to coordinate routes, communications, and club initiatives. Those collaborative habits remain central to how we plan activities and welcome new faces.',
      'Looking ahead, the club continues to prioritize health, inclusion, and reliable group-run experiences across the greater Chicago region. We aim to keep routes approachable for beginners while still supporting experienced runners chasing personal goals. We also seek to strengthen partnerships with local events and organizations that share our values. Members are encouraged to suggest improvements, host meetups, and help keep the community vibrant. The story that began in 2014 is still being written—one mile, one volunteer shift, and one friendly conversation at a time.',
    ],
    boardMembersTitle: 'Board Members',
    boardMemberNames: {
      kenny: '风城网事Kenny',
      mark: 'Mark Jiang',
      sherri: 'Sherri Liang-Zhou',
      xiaofeng: '李晓枫',
      yuning: '祖玉宁',
      bibo: '高碧波',
      hanlin: '聂汉林',
      wei: '陈玮',
      danrey: '丹睿',
    },
  },
  zh: {
    brand: 'CHI Running Club/芝加哥驰跑团',
    nav: {
      home: '首页',
      history: '历史',
      boardMembers: '理事会',
      races: '比赛信息',
      marathon: '芝马FAQ',
      checkins: '全球打卡',
    },
    aboutParagraphs: [
      '驰跑团（CHI Running Club/ChiRunners）是由大芝加哥地区的华人跑步爱好者组成的非盈利组织。我们致力于通过跑步促进健康的生活方式，培养社区意识。',
      '我们每周都会在芝加哥及其周边的多个地点组织群跑活动，欢迎各级别的跑者参与。除了每周群跑，我们还会在全年举办特别活动和社交聚会。',
      '联系我们：info@chirunners.org',
    ],
    stravaLabel: '欢迎访问我们的 Strava 俱乐部页面：',
    routesTitle: '驰跑团常规路线',
    routesParagraph:
      '驰跑团常规路线覆盖芝加哥及周边多个风景路线，适合不同水平跑者参与。',
    heatmapPlaceholder: '热力图（占位）',
    volunteerParagraph: '我们的跑友积极参与本地赛事志愿服务，持续支持跑步社区发展。',
    racesTitle: '比赛信息',
    racesSubtitle: '芝加哥地区及周边赛事信息',
    table: {
      location: '地点',
      race: '比赛',
      website: '官网链接',
      officialSite: '官网',
      allCommunityEventsButton: 'All Community Events',
      allCommunityEventsLoading: '正在加载照片...',
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
    marathonTitle: '芝加哥马拉松 FAQ',
    marathonSubtitle:
      '报名 / 住宿 / 交通 / 天气与EAS / 博览会与领物 / 比赛日 / 亲友观赛 / 杂项',
    marathonFaq: [
      {
        title: '报名',
        body: '芝马名额不能官方转让，参赛包不能代领；请以官方报名信息为准。',
      },
      {
        title: '住宿',
        body: 'Loop 区域离起终点近最方便；机场周边价格相对友好。',
      },
      {
        title: '交通',
        body: '可根据住处选择 CTA、出租车或网约车，建议提前规划路线。',
      },
      {
        title: '天气和EAS',
        body: '比赛日天气变化较大，请关注官方 EAS 颜色警报与邮件通知。',
      },
      {
        title: '博览会与领物',
        body: 'Expo 通常在 McCormick Place，请按官方要求完成领物与签到。',
      },
      {
        title: '比赛日',
        body: '请仔细阅读 Participant Guide，并预留安检、存包、如厕时间。',
      },
      {
        title: '亲友观赛',
        body: '可结合官方/非官方追踪方式，提前规划多个观赛加油点。',
      },
      {
        title: '杂项',
        body: '如需照片，可关注官方摄影合作方及社区摄影点信息。',
      },
    ],
    sponsorTitle: 'Road Runner Sports',
    sponsorText: 'Road Runner Sports 本地门店为会员提供折扣。',
    sponsorSubtext: '更多信息请咨询门店。',
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
    historyTitle: '历史沿革',
    historyParagraphs: [
      '驰跑团的发展历程可追溯至约二零一四年前后，当时一小群跑友开始在芝加哥地区固定聚跑。早期的活动强调安全、规律与配速包容，让大家在城市道路与郊区步道上都能安心训练。随着口碑慢慢传开，朋友们互相介绍，周末长距离与工作日环路约跑逐渐成形。那些最初的季节为后续更清晰的常规路线与简单可行的组织方式打下了基础。今天我们依然秉持当时的初心：准时出现、相互支持、一起向前。',
      '参与人数增长后，社团在全年陆续加入了更多社交与志愿活动。会员们在本地赛事中担任志愿者，分享外出参赛的行前经验，并在约定跑之外建立了更长久的友谊。社群逐渐成为新来芝加哥的朋友、以及希望找到训练伙伴的本地居民的可依靠之处。与此同时，协调路线、沟通与俱乐部事务的志愿者也在自然轮换中接力。这种协作方式至今仍是策划活动与欢迎新面孔的核心。',
      '展望未来，社团将继续重视健康、包容，以及在大芝加哥地区稳定、可预期的群跑体验。我们希望路线与节奏对初学者友好，同时也支持有经验的跑者追求个人目标。我们也期待与秉持相似理念的本地活动与机构加强合作。欢迎会员提出改进建议、发起聚会、并共同让社群保持活力。始于二零一四年的故事仍在续写——一英里一英里、一次志愿服务接一次、一场场跑友间的交流串联起我们的共同记忆。',
    ],
    boardMembersTitle: '理事会成员',
    boardMemberNames: {
      kenny: '风城网事Kenny',
      mark: 'Mark Jiang',
      sherri: 'Sherri Liang-Zhou',
      xiaofeng: '李晓枫',
      yuning: '祖玉宁',
      bibo: '高碧波',
      hanlin: '聂汉林',
      wei: '陈玮',
      danrey: '丹睿',
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
