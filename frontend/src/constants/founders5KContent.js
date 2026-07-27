/** Unlisted landing page for ChiRunners Founders 5K (RunSignup). */
export const FOUNDERS_5K_REGISTER_URL =
  'https://runsignup.com/Race/IL/ElkGroveVillage/ChiRunnersFounders5KYouthRun'

export const FOUNDERS_5K_HERO_DESKTOP = '/founders-5k/hero-desktop.jpg'
export const FOUNDERS_5K_HERO_MOBILE = '/founders-5k/hero-mobile.jpg'

export const FOUNDERS_5K_CONTENT = {
  en: {
    docTitle: 'ChiRunners 5K & Youth Run · ChiRunners',
    title: 'ChiRunners 5K & Youth Mile & Half Mile Run',
    tagline: 'Run Together. Grow Together.',
    dateLine: 'Saturday, August 22, 2026',
    locationLine: 'Busse Woods Grove 31, IL',
    hostLine: 'Hosted by CHI Running Club',
    ctaSignUp: 'REGISTER NOW',
    ctaSignUpAria: 'Register now on RunSignup (opens in a new tab)',
    highlightsTitle: 'Race highlights',
    highlights: [
      {
        title: 'Free registration',
        body: 'Register at no cost for all events.',
      },
      {
        title: 'All finishers receive a medal',
        body: 'Every runner who crosses the finish line earns a finisher medal.',
      },
      {
        title: 'Club picnic after the run',
        body: 'Stick around for a relaxed club picnic after the races.',
      },
      {
        title: 'All levels welcome',
        body: 'Run, walk, or jog—members and families are all invited.',
      },
    ],
  },
  zh: {
    docTitle: 'ChiRunners 5K 暨青少年跑 · 驰跑团',
    title: 'ChiRunners 5K & Youth Mile & Half Mile Run',
    tagline: '一起奔跑，一起成长',
    dateLine: '2026年8月22日（星期六）',
    locationLine: 'Busse Woods Grove 31, IL',
    hostLine: '芝加哥驰跑团主办',
    ctaSignUp: '立即报名',
    ctaSignUpAria: '在 RunSignup 上立即报名（在新标签页打开）',
    highlightsTitle: '赛事亮点',
    highlights: [
      {
        title: '免费注册',
        body: '所有项目均可免费报名。',
      },
      {
        title: '所有完赛者均可获得奖牌',
        body: '每一位冲过终点线的跑者都会获得完赛奖牌。',
      },
      {
        title: '赛后野餐聚会',
        body: '比赛结束后留下来，参加轻松的野餐聚会。',
      },
      {
        title: '各水平均可参与',
        body: '跑、走均可——驰跑团成员、家人和朋友，一起来。',
      },
    ],
  },
}

export function getFounders5KContent(language) {
  return FOUNDERS_5K_CONTENT[language === 'zh' ? 'zh' : 'en']
}
