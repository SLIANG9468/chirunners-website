/**
 * Language-neutral data (photos, videos, emails, wechat handles, external links) for teams
 * on the Chicago Marathon "Participating Running Clubs" page. Display copy (names, contact
 * person, schedules, link text) lives per-language in `marathonWelcome.teamsPage.teams` in
 * `content/siteContent.js`, keyed by `key` below.
 */
export const CHICAGO_MARATHON_TEAMS = [
  {
    key: 'chirunners',
    flag: '🇺🇸',
    photoUrl:
      'https://photos.smugmug.com/Website/Teams/2025/i-FGmxD9N/0/NMvxD6tJWXsksrjbKKvCgCf47Q53vhFVhkgpRvCbb/XL/team01chi-XL.png',
    video: {
      type: 'hls',
      src: 'https://videos.smugmug.com/Website/Videos/2025/i-JPwDgbq/0/LqKxBQ2tmBwGB4x33kpCZfzsp7dxcZN3xrJrrvzkv/SMIL/JPwDgbq.smil/master.m3u8',
    },
    emails: ['sherri@chirunners.org'],
    wechat: 'sherriliangzhou',
  },
  {
    key: 'ninetyOneCamp',
    flag: '🇨🇦',
    photoUrl:
      'https://photos.smugmug.com/Website/Teams/2025/i-WwnKm8S/0/KsnRBNbJs4z5KZN6xcksF4kD9N64z266LnfqdgN9h/XL/team0291-XL.jpg',
    video: {
      type: 'hls',
      src: 'https://videos.smugmug.com/Website/Videos/2025/i-Vzfztxx/0/KgZfmWvmv2rFXgCBs2MM2ctFZP42BJCMFtTHqthN9/SMIL/Vzfztxx.smil/master.m3u8',
    },
    emails: ['toronto91camp@gmail.com'],
    wechat: 'toronto91',
  },
  {
    key: 'tokyoRuntime',
    flag: '🇯🇵',
    photoUrl:
      'https://photos.smugmug.com/Website/Teams/2025/i-kXschSm/0/NZcvDRh3fCmM6qkLJLhMdfxZn6kXt5HkthdGqWPMK/XL/team16Japan-XL.jpg',
    video: {
      type: 'hls',
      src: 'https://videos.smugmug.com/Website/Videos/2025/i-dc32zGw/0/NcBKsL7xnm8vGTmVGhq5VRbxjHW7PG66CZngkw5Xt/SMIL/dc32zGw.smil/master.m3u8',
    },
    emails: ['outouu@gmail.com'],
    wechat: 'outouu',
  },
  {
    key: 'mistyMountain',
    flag: '🇺🇸',
    photoUrl:
      'https://photos.smugmug.com/Website/Teams/2025/i-zC6wPQF/0/MTcbQMscSBvwNdPm3fkwNC3JpXs2mGVRMjxWj5LL5/XL/team13%E5%B2%9A%E5%B1%B1-XL.jpg',
    video: {
      type: 'hls',
      src: 'https://videos.smugmug.com/Website/Videos/2025/i-mXq7xvj/0/NSQHsbptX3KJzKV5QggrHn2tgg4gMDLQ45cCHGB6M/SMIL/mXq7xvj.smil/master.m3u8',
    },
    emails: ['longchang@mmrunners.org'],
    wechat: 'longchang83',
    linkUrl: 'https://www.mmrunners.org/running/weekly-group-runs/',
  },
  {
    key: 'zephyrRun',
    flag: '🇸🇬',
    photoUrl:
      'https://photos.smugmug.com/Website/Teams/2025/i-XCBM5h5/0/NLNvKvL6vn3RZVn4VzTB7RdqsL7CBGNGGGKwMnpQ4/XL/team20%E6%A4%B0%E9%A3%8E-XL.jpg',
    video: {
      type: 'hls',
      src: 'https://videos.smugmug.com/Website/Videos/2025/i-f42S6rf/0/NS9qHJMDHVRgxPK3k7NdP8pb4MtNwMHTwBTbCjP6L/SMIL/f42S6rf.smil/master.m3u8',
    },
    linkUrl: 'https://www.zrc.sg/',
  },
  {
    key: 'dash',
    flag: '🇺🇸',
    photoUrl:
      'https://photos.smugmug.com/Website/Teams/2025/i-PDmCdkD/0/Kt6bxD8FPL88qx5CcZ9QzD6b3RJV6n9bPcnZghdX7/XL/team10dash-XL.jpg',
    video: { type: 'mp4', src: '/chicago-marathon/teams/dash.mp4' },
    emails: ['dashrungroup@gmail.com'],
    wechat: 'lvyangcungu',
  },
  {
    key: 'joyRunners',
    flag: '🇦🇺',
    photoUrl: '/chicago-marathon/teams/joy-runners.jpg',
    video: {
      type: 'hls',
      src: 'https://videos.smugmug.com/Website/Videos/2025/i-SR9MNzs/0/Mwh3jgMZQhFmR38RZjRSzvv72WTPFgf2g962tLNC2/SMIL/SR9MNzs.smil/master.m3u8',
    },
    emails: ['shiliang.zhao@gmail.com', 'lukezhao79@hotmail.com'],
    wechat: 'shiliang_zhao / lujia_zhao99',
  },
  {
    key: 'red',
    flag: '🇺🇸',
    photoUrl:
      'https://photos.smugmug.com/Website/Teams/2025/i-64JffpW/0/MLnj9mSGqVXFG6R8fmXSPkTS6dp4cLFXQWHRCRFd4/XL/team15Red-XL.jpg',
    video: {
      type: 'hls',
      src: 'https://videos.smugmug.com/Website/Videos/2025/i-sDMc7br/0/KvvjWbrDnZrFqg5wJkqktWWD5Hmsw2hB72VDRN8PL/SMIL/sDMc7br.smil/master.m3u8',
    },
    wechat: 'weihu1980',
  },
  {
    key: 'windRunner',
    flag: '🇺🇸',
    photoUrl:
      'https://photos.smugmug.com/Website/Teams/2025/i-tmsCmqb/0/LKL9ZMfnPVJ6BC4KSqMDhwgkkkFgcVtphs4X96p7k/XL/team11%E8%BF%BD%E9%A3%8E-XL.jpg',
    video: {
      type: 'hls',
      src: 'https://videos.smugmug.com/Website/Videos/2025/i-8HJqLxd/0/Mvktt9CtbJVxFC7zgsxqbKtTbGJWffcjVZSm4MFLP/SMIL/8HJqLxd.smil/master.m3u8',
    },
    linkUrl: 'https://www.windrunnergroup.org/',
  },
  {
    key: 'mrc',
    flag: '🇦🇺',
    photoUrl:
      'https://photos.smugmug.com/Website/Teams/2025/i-gwJsPnV/0/MnQWvLptL5mF2GC5mSRKHHsk8dDvD5mhhSHKHTT7s/XL/MRC-XL.jpg',
    video: {
      type: 'hls',
      src: 'https://videos.smugmug.com/Website/Videos/2025/i-b2SHX3g/0/NW6Sw6f4Rp3p76Ttm3kkH8gHnT25Ssx7MBTCBdhtP/SMIL/b2SHX3g.smil/master.m3u8',
    },
    linkUrl: 'https://strava.app.link/eKJ8WiM75Wb',
  },
  {
    key: 'laPower',
    flag: '🇨🇦',
    photoUrl:
      'https://photos.smugmug.com/Website/Teams/2025/i-cbjvf79/0/KR8NLsQ8WCqK53C7NnRmKTb2kB25pFZFdhTkSNM7B/XL/LaPower-XL.jpg',
    video: { type: 'youtube', id: 'yiZEKjEHk40' },
    wechat: 'Today_888999',
  },
  {
    key: 'loveToRun',
    flag: '🇺🇸',
    photoUrl:
      'https://photos.smugmug.com/Website/Teams/2025/i-T4bDNKQ/0/KDghkWDFWHwBsg2VQGFpNHhzn5fsL6SWsWvLRS3qx/XL/05%E7%88%B1%E8%B7%91-XL.jpg',
    video: {
      type: 'hls',
      src: 'https://videos.smugmug.com/Website/Videos/2025/i-tL5Rqz9/0/KXFHwzvNcw8vWvjDdcJGfJ46kZTQHk4wh7xmXnRJC/SMIL/tL5Rqz9.smil/master.m3u8',
    },
    emails: ['info@love-to-run.org'],
  },
  {
    key: 'bergenRunners',
    flag: '🇺🇸',
    photoUrl:
      'https://photos.smugmug.com/Website/Teams/2025/i-8Mxx6Pz/0/NdNt3p93GC6WpNWxrcXNk9mGwwWwFdRWkCdrbZsNw/XL/30%E7%99%BE%E9%AA%8F-XL.jpg',
    video: {
      type: 'hls',
      src: 'https://videos.smugmug.com/Website/Videos/2025/i-M4VmMsq/0/MtNVV4MdxqnCg28ZcGTcCHGPMgXhwpQnx8df3vjmQ/SMIL/M4VmMsq.smil/master.m3u8',
    },
    emails: ['Bergenrunners@gmail.com'],
  },
  {
    key: 'su',
    flag: '🇺🇸',
    photoUrl:
      'https://photos.smugmug.com/Website/Teams/2025/i-m6VGfSN/0/KkVKJPhKFjmmDszDRX2Vh4b3rppdbwzQ9hfgkC2Xr/XL/SU-XL.jpg',
    video: {
      type: 'hls',
      src: 'https://videos.smugmug.com/Website/Videos/2025/i-g7kqRd5/0/KwZK8CgqXZVnJTRDTPntSkXpv5Pw54gPD7j3rmrHj/SMIL/g7kqRd5.smil/master.m3u8',
    },
    linkUrl: 'https://www.xiaohongshu.com/user/profile/6560020d000000000802f058',
  },
  {
    key: 'longRunningClub',
    flag: '🇺🇸',
    photoUrl:
      'https://photos.smugmug.com/Website/Teams/2025/i-CnnFzGv/0/M62rmMnXsKHWMKXqQKLpJQNTqfstv4ZK4RWDbFWnZ/XL/team12%E9%BE%99%E5%B8%AE-XL.jpg',
    video: { type: 'youtube', id: 'PwEBi9L-UUY' },
    linkUrl: 'https://www.facebook.com/share/g/1M4SMcqSg5/',
  },
]
