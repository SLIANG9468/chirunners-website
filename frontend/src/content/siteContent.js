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
  { key: 'kenny', photoUrl: '/photo/kenny.png'},
  { key: 'mark', photoUrl: '/photo/mark.png' },
  { key: 'sherri', photoUrl: '/photo/Sherri.png'},
  { key: 'xiaofeng', photoUrl: '/photo/Xiaofeng.png'},
  { key: 'yuning', photoUrl: '/photo/yuning.png' },
  { key: 'bibo', photoUrl: '/photo/bibo.png' },
  { key: 'hanlin', photoUrl: '/photo/hanlin.png' },
  { key: 'wei', photoUrl: '/photo/wei.png' },
  { key: 'danrey', photoUrl: '/photo/denrey.png' },
]

/** EN/ZH display names for the board page (language toggle picks one line per card). */
export const BOARD_MEMBER_LABELS = {
  kenny: { en: 'Kenny Qin', zh: '风城网事' },
  mark: { en: 'Mark Jiang', zh: '蒋虹亮' },
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
      checkins: 'CHI Has Been Here',
      chiStore: 'CHI Store',
      raceVolunteer: 'Race & Volunteer',
      menu: 'Menu',
      menuClose: 'Close menu',
    },
    aboutParagraphs: [
      'CHI Running Club (ChiRunners) is a 501(c)(3) nonprofit formed by Chinese American running enthusiasts in the greater Chicago area. As a member of the Road Runners Club of America (RRCA), we promote healthy living through running and build a supportive running community.',
    ],
    homeExplore: {
      sectionTitle: 'Explore',
      checkins: {
        id: 'checkins',
        title: 'CHI Has Been Here',
        description:
          'Click a red flag for check-in photos. The 驰 marker is our Chicago home base.',
        cta: 'Open global check-ins map',
        to: '/chi-has-been-here',
      },
      chiStore: {
        id: 'chi-store',
        title: 'CHI Store',
        description:
          'Running tees, singlets, UV arm sleeves, hats, and more—official CHI Running Club gear.',
        cta: 'Open CHI Store',
        to: '/chi-store',
      },
      raceVolunteer: {
        id: 'race-volunteer',
        title: 'Race & Volunteer Info',
        description:
          'Our running friends are passionate about volunteering at local races and actively supporting the running community.',
        cta: 'View races & volunteer info',
        to: '/race-volunteer-info',
      },
      marathon: {
        id: 'marathon',
        title: 'Chicago Marathon',
        description:
          'CHI Running Club welcomes you to race weekend—guides for carb-loading, lodging, transportation, and more.',
        sublinks: [
          { label: 'Carb-loading dinner', to: '/chicagomarathon/carb-loading-dinner' },
          { label: 'Hotels & lodging', to: '/chicagomarathon/hotel' },
          { label: 'Transportation', to: '/chicagomarathon/transportation' },
        ],
      },
      about: {
        id: 'about',
        title: 'About CHI Running Club',
        description: 'Learn about our history and the volunteers who lead the club.',
        sublinks: [
          { label: 'History', to: '/history' },
          { label: 'Board Members', to: '/board-members' },
        ],
      },
    },
    chiStore: {
      docTitle: 'CHI Store · ChiRunners',
      iframeTitle: 'CHI Running Club store — secure checkout on Zeffy',
    },
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
      volunteerCellLabel: 'Yes',
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
    footerPhotoCreditLine1:
      'With deep thanks to Chi Running Club members and friends for capturing and sharing these wonderful moments.',
    footerPhotoCreditLine2:
      'Some photos on this website are provided by Kenny Qin, Yun Oldshue, Yansong, and others.',
    stayConnected: {
      socialIntro: 'Follow CHI Running Club on:',
      socialLinks: [
        {
          label: 'WeChat Official Account',
          url: null,
          hint: 'Search “芝加哥驰跑团 ChiRunners” in WeChat to find our official account.',
        },
        {
          label: 'RedNote',
          url: null,
          hint: 'Open the RedNote app and search for 驰跑团.',
        },
        {
          label: 'Instagram',
          url: 'https://www.instagram.com/chi_runners/',
          hint: 'Search for Chi_Runners on Instagram.',
        },
        {
          label: 'YouTube',
          url: 'https://www.youtube.com/@chirunners1829',
          hint: 'Subscribe to CHI Running Club on YouTube.',
        },
      ],
    },
    homeHeroErrorLoad: 'Failed to load homepage slideshow photos.',
    homeHeroErrorConnect: 'Could not connect to backend for homepage slideshow.',
    checkinsTitle: 'CHI Has Been Here',
    checkinsSubtitle: 'Click a red flag for check-in photos. The 驰 marker is our Chicago home base.',
    checkinsClubBaseTitle: 'CHI Running Club home base',
    checkinsClubBaseBody: 'Greater Chicago area — where ChiRunners is rooted.',
    checkinsLoading: 'Loading map locations...',
    checkinsNoData:
      'No map pins: the API returned no locations. If your database already has city.lat and city.lng, the static site may be calling the wrong backend—rebuild with VITE_API_BASE_URL set to your live API URL, and set CORS_ORIGINS on the API to this site’s origin.',
    checkinsMapError: 'Could not load location data from backend.',
    checkinsPopupLoading: 'Loading photos...',
    checkinsPopupNoPhotos: 'No photos found for this city.',
    checkinsPopupNoSmugNickname:
      'Visits exist but SMUGMUG_NICKNAME is not set on the API (e.g. in Render environment or backend .env).',
    checkinsPopupNoSmugKeys:
      'Visits exist in the database but no SmugMug photo id is stored yet. Set each visit’s smugmug_image_key to the image id from SmugMug (the i-… segment in the photo URL).',
    checkinsPopupNoImageUrl: 'Visits exist but no image URL could be built.',
    checkinsPopupPrev: 'Prev',
    checkinsPopupNext: 'Next',
    checkinsPopupCounter: (idx, total) => `${idx} / ${total}`,
    checkinsPhotoNoRunner: '—',
    checkinsPhotoMetaSep: ' · ',
    checkinsFaqTitle: 'Q&A',
    checkinsFaq: [
      {
        q: 'Who qualifies?',
        a: 'All CHI Running Club members.',
      },
      {
        q: 'How can I get a Chi Runners mini flag?',
        a: 'Pick one up for free from Xiaofeng Li (North / 芝北主场), Xiaomao Wu (Loop / 卢普), Danrey (Busse Woods / 巴西), or Haiting (Glenview).',
      },
      {
        q: 'How do I add my photo to the map?',
        a: 'Post your photo to the CHI Runners WeChat group (芝加哥驰跑团 ChiRunners) with your name in Chinese and English, location, check-in date, and a short caption. Or email the same details to admin@chirunners.org — we will add your flag and photo to the map.',
      },
    ],
    checkinsIntroLines: [
      'Our “CHI Has Been Here Map” is live! Wherever your feet take you next:',
      '🏅 Racing on major event courses',
      '🌅 Fresh morning runs that wake up the city',
      '🧳 Travel runs across the map',
      '⛰️ Trail runs in the hills',
      'Whenever you reach a finish line or pass a city landmark:',
      '📍 Pull out our Chi Runners mini flag!',
      '📸 Take a special check-in photo!',
      "Let's set a goal: by next New Year's Eve countdown, see how many corners of the world our little flags can reach! 🗺️",
      '🔥 Run everywhere, CHI everywhere!',
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
          title: 'Chicago Marathon transportation',
          description:
            'Hyatt Place O’Hare, airport wayfinding, race-morning shuttle, CTA/Ventra, and Expo routes—mobile friendly.',
          cta: 'Open guide',
        },
      },
      backToHub: '← Back to Chicago Marathon',
      hotelPage: {
        pageTitle: 'Exclusive Hotel Deals for Chicago Marathon Weekend $149',
        pageIntro: '10 min from O’Hare｜30 min race-day shuttle to the start 🚐',
        hotelSectionTitle: '',
        hotelName: 'Hyatt Place Chicago O’Hare Airport',
        hotelAddressLine1: '',
        hotelAddressLine2: '6810 Mannheim Rd, Rosemont, IL 60018',
        hotelPerksTitle: 'Hotel amenities',
        hotelPerksIntro: 'Comfort and confidence for your race weekend—courtesy of the hotel:',
        runnerPerksTitle: 'Exclusive Chicago Marathon runner perks',
        runnerPerksIntro: 'We’ve added a few touches so you can line up feeling your best:',
        runnerPerkBreakfastBoost:
          'Race-weekend Chinese-style breakfast boost—high-carb favorites(race days)',
        runnerPerkDiningArea: 'Private dining area for CHI Running Club guests',
        runnerPerkLounge: 'Runners’ lounge to relax, connect, and recharge',
        hotelRatesTitle: 'CHI Running Club group rates',
        hotelRates: [
          { label: 'King bed', value: '$149 / night' },
          { label: 'Two queen beds', value: '$159 / night' },
        ],
        amenityBreakfast: 'Complimentary breakfast included',
        amenityAirportShuttle: 'Complimentary airport shuttle',
        amenityWifi: 'Complimentary high-speed Wi-Fi',
        amenityGym: 'Complimentary 24-hour fitness center',
        amenityPool: 'Complimentary indoor heated pool',
        amenityMandarin: 'Mandarin-speaking staff at the front desk - easy communication',
        amenityCancellation: 'Free cancellation with full refund up to 72 hours before arrival',
        amenityRaceShuttle: 'Race-morning express shuttle to the marathon start: $40 per person',
        runnerPerkLateCheckout: 'Post-race wind-down: late checkout until 5:00 PM for just $75 + tax',
        flyerViewLabel: 'View flyer (PDF)',
        flyerPdfHref: '/marathon-welcome/chi-runners-hyatt-flyer.pdf',
        ctaBook: 'Book hotel',
        hotelBookUrl: 'https://www.hyatt.com/events/en-US/group-booking/CHIZO/G-MARA',
        wechatGroupTitle: 'Questions? Join our Chicago Marathon WeChat group',
        wechatGroupBody: 'Scan to join—ask anything about booking, Chicago Marathon express, and stay details.',
        wechatGroupQrAlt: 'Chicago Marathon WeChat group QR code',
        wechatGroupQrSrc: '/marathon-welcome/chicago-marathon-wechat-group-qr.png',
      },
      carbLoadingPage: {
        heroTitleLines: ['2026 Chicago Marathon', 'Carb-Loading Dinner'],
        heroSubtitle: 'Hosted by CHI Running Club',
        benefitsSectionTitle: 'Race Ready · Together',
        benefits: [
          'Connect with Chinese runners from around the world—swap stories and make new friends.',
          'Carb-rich dishes to fuel up before race day and support your endurance.',
          'Chicago Marathon veterans share pre-race tips so you line up with more confidence.',
          'Celebrate together before the big day and capture memories in photos.',
        ],
        eventSectionTitle: 'Event details',
        eventInfoRows: [
          {
            icon: 'calendar',
            label: 'Date & time',
            value: 'Friday, October 9, 2026 · 6:00 PM',
          },
          {
            icon: 'mapPin',
            label: 'Venue',
            value: 'Hyatt Place Chicago O’Hare Airport',
          },
          {
            icon: 'mapPin',
            label: 'Address',
            value: '6810 Mannheim Rd, Rosemont, IL 60018',
          },
          { icon: 'banknote', label: 'Dinner price', value: '$30 per person' },
          {
            icon: 'ticket',
            label: 'Registration opens',
            value: 'September 1, 2026',
          },
        ],
        menuSectionTitle: 'Menu',
        menuImageAlt: 'Carb-loading dinner menu',
        hotelPromoMain: 'Hyatt Place O’Hare · CHI Running Club rates from $149/night',
        hotelPromoCta: 'View hotel details & book',
        ctaRegister: 'Register now',
        registerUrl: null,
        registerDisabledHint: 'Registration for the dinner opens September 1, 2026.',
      },
      transportationPage: {
        docTitle: 'Chicago Marathon transportation · ChiRunners',
        pageTitle: 'Chicago Marathon transportation',
        pageIntro:
          'This guide helps runners visiting Chicago for Chicago Marathon weekend get around with confidence. Hyatt Place Chicago O’Hare Airport is a practical base: complimentary airport shuttle, Mandarin-friendly front desk, and an optional race-morning express to Grant Park. Public transit is dependable—below are beginner-friendly CTA steps.',
        ctaHotel: 'Hotel page (rates & perks)',
        jumpNavLabel: 'On this page',
        jumpNav: [
          { href: '#airport-hotel', label: 'Airport ↔ hotel' },
          { href: '#hotel-start', label: 'Hotel ↔ start/finish' },
          { href: '#hotel-expo', label: 'Hotel ↔ Expo' },
          { href: '#cta-guide', label: 'Taking the CTA' },
          { href: '#race-day', label: 'Race morning tips' },
          { href: '#faq', label: 'FAQ' },
          { href: '#further-reading', label: 'More routes' },
        ],
        addresses: {
          startFinish: {
            label: 'Start & finish (Grant Park)',
            lines: ['337 E Randolph St, Chicago, IL 60601'],
          },
          expo: {
            label: 'Expo (McCormick Place, North Building)',
            lines: ['2301 S Dr Martin Luther King Jr Dr, Chicago, IL 60616'],
          },
          hotel: {
            label: 'Hyatt Place Chicago O’Hare Airport',
            lines: ['6810 Mannheim Rd, Rosemont, IL 60018'],
          },
          ctaBlue: {
            label: 'CTA Blue Line (O’Hare station)',
            lines: ['1000 O’Hare Dr, Chicago, IL 60666'],
          },
        },
        images: {
          airportTransit: {
            alt: 'Overhead sign at O’Hare pointing to Airport Transit and rental cars',
            caption:
              'At O’Hare, follow signs for “Airport Transit” toward the rental car center and inter-terminal train.',
          },
          ctaSign: {
            alt: 'O’Hare overhead sign highlighting Trains to City - CTA',
            caption: 'For downtown trains, follow “Trains to City - CTA” to the Blue Line station.',
          },
          walkRental: {
            alt: 'Google Maps walking directions from rental car area to Hyatt Place O’Hare',
            caption:
              'Walking reference: about 0.7 mi (~1.1 km), mostly flat along Mannheim Rd—useful if you return a car nearby.',
          },
          raceMorning: {
            alt: 'Google Maps driving directions from Hyatt Place O’Hare to Chicago Marathon start around 5:30 AM',
            caption:
              'Illustrative drive from the hotel to the downtown start around 5:30 AM Sunday—actual time varies with traffic and closures.',
          },
        },
        sections: {
          airportHotel: {
            title: '1. Airport to the hotel (O’Hare ↔ Hyatt Place O’Hare)',
            lead:
              'Most international visitors arrive at O’Hare (ORD). The hotel is in Rosemont, a short hop from the airport. You can take the free hotel shuttle or, if you end up at the rental car center, walk as we did.',
            signAirportTransitTitle: 'Find “Airport Transit” inside the terminal',
            signAirportTransitBody:
              'Chicago’s airport people mover to terminals and the rental car center is labeled Airport Transit on overhead signs. It connects you toward the Multi-Modal Facility where rental counters are located.',
            signCtaTitle: 'Taking trains downtown instead?',
            signCtaBody:
              'If you plan to ride the Blue Line into the city first, look for “Trains to City - CTA” on overhead signage.',
            shuttleTitle: 'Complimentary hotel shuttle',
            shuttleBody:
              'Hyatt Place O’Hare runs a free shuttle between the airport and the hotel. Confirm pickup zones with the front desk when you land—hotel shuttles typically use the designated hotel shuttle island.',
            shuttleTipTitle: 'Shuttle schedule (reference)',
            shuttleTipBody:
              'About every 40 minutes, 5:00 AM–10:30 PM. Times can change—ask the hotel for the current timetable.',
            walkTitle: 'Walking from the rental car center (optional)',
            walkIntro:
              'There are two practical ways from the airport area to the hotel: the free shuttle, or walking from the rental car center if that fits your plans.',
            walkHighlightTitle: 'We walked it ourselves',
            walkHighlight:
              'We personally walked from the rental car center down to the hotel so you can picture the route.',
            walkStats: 'About 0.7 mi (~1.1 km), roughly 15–20 minutes of walking on mostly flat sidewalks.',
            walkBullets: [
              'Use maps on your phone; stick to well-lit sidewalks along Mannheim Rd.',
              'Great if you dropped off a rental nearby—otherwise the shuttle is usually easier with luggage.',
            ],
          },
          hotelStart: {
            title: '2. Hyatt Place O’Hare ↔ marathon start & finish',
            lead:
              'Race morning is easier with a plan. The hotel offers a paid express for runners heading to Grant Park; public transit is also reliable if you prefer the train.',
            shuttleBadge: 'Race weekend',
            shuttleTitle: 'Race-morning express (club arrangement)',
            shuttleBullets: [
              'Typical hotel departure about 5:30 AM; return pickup about 3:30 PM (adjusted for road closures).',
              'About $40 per person—confirm details, pickup location, and booking with the hotel front desk.',
              'Great for first-timers who want a direct ride without navigating detours sleep-deprived.',
            ],
            shuttleNote: 'Pickup times can shift on race day—double-check at check-in.',
            mapSectionTitle: 'What the drive looks like early Sunday',
            mapSectionBody:
              'At 5:30 AM, the expressways are usually light; the screenshot is a reference only—your arrival time will depend on closures and weather.',
            otherModesTitle: 'Ride-share or taxi',
            otherModesBody:
              'From O’Hare to downtown, taxis or Uber/Lyft often fall around $50 but surge pricing applies—budget 30–60 minutes depending on traffic. From the hotel to Grant Park, expect a similar ballpark on Sunday morning.',
          },
          hotelExpo: {
            title: '3. Hyatt Place O’Hare ↔ Expo (McCormick Place)',
            lead:
              'Packet pickup is at McCormick Place North Building. From the O’Hare area, the CTA is cost-effective; allow extra time Thursday–Saturday when the Expo is busy.',
            tipTitle: 'Tip',
            tipBody:
              'Buy transit passes a day early if you can. The Expo often hosts a CTA booth where you can pick up Ventra products.',
            ctaRouteTitle: 'CTA route (reference)',
            ctaRouteSteps: [
              'Take the Blue Line toward Forest Park.',
              'Transfer at Clark/Lake to the Green Line toward Ashland/63rd (or Cottage Grove, depending on signage).',
              'Exit at Cermak–McCormick Place and follow signs into McCormick Place.',
            ],
            ctaRouteTime: 'Typical ride about 1 hour 20 minutes—add buffer for waits.',
          },
          cta: {
            title: '4. How to ride the CTA (beginner-friendly)',
            lead:
              'Chicago’s trains and buses are branded CTA. Stations are well signed; on marathon weekend you will see plenty of other runners on the Blue Line early Sunday.',
            faresTitle: 'Typical fares (verify at ventra.com)',
            fares: [
              'Blue Line from O’Hare: higher airport fare (about $5 for a single ride).',
              'Other “L” trains: about $3 per ride; buses about $2.25.',
              '1-day pass about $5; 3-day pass about $15—great if you will ride multiple times.',
            ],
            buyTitle: 'How to pay',
            buySteps: [
              'Ticket machines at stations sell paper Ventra tickets.',
              'Ventra app: buy mobile tickets and tap your phone at the turnstile.',
              'Contactless: Apple Pay, Google Pay, or tap-to-pay cards at readers for pay-as-you-go.',
            ],
            toStartTitle: 'Blue Line toward the start (Sunday morning)',
            toStartSteps: [
              'Take the Blue Line toward Forest Park (or Loop direction per signage).',
              'Exit at Jackson—about half a mile (~800 m) walk to Grant Park.',
              'Early Sunday service is roughly every 15 minutes; budget about 45 minutes in transit plus walking.',
            ],
            toStartNote:
              'Many riders that morning are marathoners—follow the crowd and station announcements. Jackson is also served by the Red Line if you are coming from another part of town.',
            otherLinesTitle: 'Other “L” lines near the start',
            otherLines: [
              'Blue and Red Lines: Jackson.',
              'Brown, Orange, Pink, Purple Express: Adams (walk toward Grant Park).',
            ],
            toExpoTitle: 'From O’Hare to the Expo by train',
            toExpoSteps: [
              'Blue Line toward Forest Park → transfer at Clark/Lake to Green Line toward Ashland/63rd.',
              'Exit Cermak–McCormick Place.',
            ],
            toExpoTime: 'Plan about 1 hour 20 minutes including transfers.',
            beginnerTitle: 'First time in Chicago?',
            beginnerBody:
              'Download the Ventra app before you land, screenshot your hotel address, and keep a paper backup of your CTA pass. Stations have maps at every entrance—match line color and direction of travel.',
          },
          raceDay: {
            title: '5. Race morning checklist',
            tips: [
              'Leave buffer time: security, bathrooms, and corrals take longer than you expect.',
              'Carry a light throwaway layer—pre-dawn can be chilly even if the afternoon warms up.',
              'If you ride the shuttle, confirm the meeting spot the night before.',
              'If you ride the CTA, check the latest alerts in the Ventra or CTA app.',
              'Screenshot your bib QR and emergency contacts offline.',
            ],
          },
        },
        faqTitle: '6. Frequently asked questions',
        faq: [
          {
            q: 'Is public transit reliable on marathon weekend?',
            a: 'Yes—CTA runs on race weekend and is the backbone for locals and visitors. Allow extra time for crowded trains near the Loop.',
          },
          {
            q: 'How do I get from Midway Airport to the Expo or start?',
            a: 'Orange Line toward the Loop → transfer to the Green Line toward Ashland/63rd → Cermak–McCormick Place for the Expo. To Grant Park, continue on Orange to the Roosevelt area and walk or transfer per your map app—budget about an hour.',
          },
          {
            q: 'Taxi or Uber from the airports?',
            a: 'Ballpark $40–50+ depending on traffic and surge. Often 30–60 minutes. Good when traveling with family or heavy bags.',
          },
          {
            q: 'Can I walk from the Expo to Chinatown?',
            a: 'About 1.2 miles in daylight—go with a buddy if you walk. Ride-share is simpler; there is no single direct train hop.',
          },
        ],
        furtherReadingTitle: 'Further reading: Chinatown & downtown hops',
        furtherReading: [
          {
            title: 'Downtown to Chinatown',
            body: 'Red Line to Cermak–Chinatown. Ride-share from downtown is commonly about $5–20 and 10–30 minutes depending on time of day.',
          },
          {
            title: 'Expo to Chinatown',
            body: 'Less than 2 km by foot in daylight—pair up for safety. Uber/Lyft is straightforward.',
          },
        ],
        disclaimer:
          'Information is for general guidance from CHI Running Club volunteers and may change. Fares, schedules, shuttle times, and road closures are controlled by CTA, the City of Chicago, the marathon, and the hotel—always confirm the latest details before you travel.',
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
      chiStore: '驰多多',
      raceVolunteer: '比赛 & 义工',
      menu: '菜单',
      menuClose: '关闭菜单',
    },
    aboutParagraphs: [
      '驰跑团（ CHI Running Club / ChiRunners ）是由大芝加哥地区华人跑步爱好者组成的501(c)(3) 非营利组织。作为美国路跑俱乐部协会（RRCA）的成员，我们致力于通过跑步促进健康的生活方式，建立一个互相支持的跑步社区。',
    ],
    homeExplore: {
      sectionTitle: '探索',
      checkins: {
        id: 'checkins',
        title: '全球打卡',
        description: 'CHI Flag · 走遍世界的跑者打卡瞬间',
        cta: '打开全球打卡地图',
        to: '/chi-has-been-here',
      },
      chiStore: {
        id: 'chi-store',
        title: '驰多多',
        description: '跑步短袖、背心、防晒袖套、帽子等驰跑团官方装备，欢迎选购。',
        cta: '进入驰多多',
        to: '/chi-store',
      },
      raceVolunteer: {
        id: 'race-volunteer',
        title: '比赛 & 义工信息',
        description: '我们的跑友积极参与本地赛事志愿服务，持续支持跑步社区发展。',
        cta: '查看比赛与义工信息',
        to: '/race-volunteer-info',
      },
      marathon: {
        id: 'marathon',
        title: '芝加哥马拉松',
        description:
          '驰跑团欢迎你来芝马周末——加碳会、住宿、交通等指南，助你从容参赛。',
        sublinks: [
          { label: '加碳会', to: '/chicagomarathon/carb-loading-dinner' },
          { label: '住宿', to: '/chicagomarathon/hotel' },
          { label: '交通', to: '/chicagomarathon/transportation' },
        ],
      },
      about: {
        id: 'about',
        title: '关于驰跑团',
        description: '了解我们的历史与理事会成员。',
        sublinks: [
          { label: '历史', to: '/history' },
          { label: '董事会', to: '/board-members' },
        ],
      },
    },
    chiStore: {
      docTitle: '驰多多 · 驰跑团',
      iframeTitle: '驰跑团商店 — Zeffy 安全支付',
    },
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
      volunteerCellLabel: 'Yes',
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
    footerPhotoCreditLine1: '特别感谢驰跑团成员及朋友记录和分享美好瞬间。',
    footerPhotoCreditLine2: '网站部分照片有风城网事，章运，燕松等提供。',
    stayConnected: {
      socialIntro: '关注驰跑团：',
      socialLinks: [
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
          url: 'https://www.instagram.com/chi_runners/',
          hint: '在 Instagram 也可搜索「ChiRunners」或「芝加哥驰跑团」。',
        },
        {
          label: 'YouTube',
          url: 'https://www.youtube.com/@chirunners1829',
          hint: '在 YouTube 关注驰跑团频道。',
        },
      ],
    },
    homeHeroErrorLoad: '加载首页轮播图失败。',
    homeHeroErrorConnect: '无法连接后端首页轮播接口。',
    checkinsTitle: '全球打卡',
    checkinsSubtitle: '点击红色旗标查看打卡照片；芝加哥是驰跑团大本营。',
    checkinsClubBaseTitle: '驰跑团大本营',
    checkinsClubBaseBody: '大芝加哥地区 — 驰跑团的家。',
    checkinsLoading: '正在加载地图点位...',
    checkinsNoData:
      '地图上没有打点：接口返回的地点列表为空。若数据库里 city 已有经纬度，多半是静态站构建时未带上正确的 API 地址—请用 VITE_API_BASE_URL 指向线上 API 并重新部署；同时在 API 服务上把 CORS_ORIGINS 设为当前站点来源。',
    checkinsMapError: '无法从后端加载地图数据。',
    checkinsPopupLoading: '正在加载照片...',
    checkinsPopupNoPhotos: '该城市暂无照片。',
    checkinsPopupNoSmugNickname:
      '有打卡记录，但 API 未配置 SMUGMUG_NICKNAME（请在 Render 环境变量或后端 .env 中设置）。',
    checkinsPopupNoSmugKeys:
      '数据库中有打卡记录，但尚未写入 SmugMug 图片 id。请将每条 visit 的 smugmug_image_key 设为照片链接里的 i-… 片段。',
    checkinsPopupNoImageUrl: '有打卡记录，但无法生成图片链接。',
    checkinsPopupPrev: '上一张',
    checkinsPopupNext: '下一张',
    checkinsPopupCounter: (idx, total) => `${idx} / ${total}`,
    checkinsPhotoNoRunner: '—',
    checkinsPhotoMetaSep: ' · ',
    checkinsFaqTitle: '常见问题',
    checkinsFaq: [
      {
        q: '谁可以参与？',
        a: '所有驰跑团成员。',
      },
      {
        q: '怎么可以拿到驰队小旗？',
        a: '到李晓枫（芝北主场/North）、吴小茂（卢普/Loop）、丹睿（巴西/Busse Woods）和海听（Glenview）免费领。',
      },
      {
        q: '怎么把照片放在地图上？',
        a: '可以将照片发到驰跑团微信群（群名：芝加哥驰跑团 ChiRunners）里，注明中英文名字、地点、打卡日期和你想表达的一句话。或者把以上信息发到 admin@chirunners.org，收到信息以后，我们会把小旗子和你的照片放到地图上去。',
      },
    ],
    checkinsIntroLines: [
      '驰跑团“全球打卡地图”正式上线啦！无论你的脚步迈向何方：',
      '🏅 挑战各大赛事的激情赛道',
      '🌅 唤醒城市的清爽晨跑',
      '🧳 丈量世界的旅行跑',
      '⛰️ 探索山野的 Trail Run',
      '只要你抵达 比赛终点，或路过 城市地标（Landmark）：',
      '📍 掏出咱们驰跑团的小旗子！',
      '📸 拍下一张专属打卡照！',
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
          '驰跑团在队长白雪峰的带领下，正式注册为非营利组织（501(c)(3)），进入规范发展阶段。',
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
        '芝加哥马拉松赛道以平坦、快速著称，沿途社区氛围热烈，始终点位于芝加哥市中心，也是世界马拉松大满贯赛事之一。',
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
          description: '机场附近，比赛日直通车到达芝马起点，优惠价 $149',
          cta: '查看详情',
        },
        transportation: {
          title: '芝加哥马拉松交通',
          description:
            '奥黑尔机场怎么找酒店班车与蓝线、凯悦嘉轩到起点/Expo、比赛日直通车与 CTA 入门——手机阅读友好。',
          cta: '查看指南',
        },
      },
      backToHub: '← 返回芝加哥马拉松',
      hotelPage: {
        pageTitle: '芝马酒店超值价 $149(官网$199,  团购直降 $50）',
        pageIntro: '驰跑团专属优惠｜机场10分钟｜比赛日轻松30分钟直达起点 🚐',
        hotelSectionTitle: '芝加哥奥黑尔机场凯悦嘉轩酒店 $149起',
        hotelName: 'Hyatt Place Chicago O’Hare Airport',
        hotelAddressLine1: '机场附近',
        hotelAddressLine2: '6810 Mannheim Rd, Rosemont, IL 60018',
        hotelPerksTitle: '酒店礼遇',
        hotelPerksIntro: '为您的比赛之旅提供舒适保障：',
        runnerPerksTitle: '马拉松跑者专属礼遇',
        runnerPerksIntro: '为帮助您发挥最佳状态，我们特别准备：',
        runnerPerkBreakfastBoost: '中式能量早餐（比赛专供）、高碳水补给（粥、面食等）',
        runnerPerkDiningArea: '专属就餐区域',
        runnerPerkLounge: '跑者休息厅',
        hotelRatesTitle: '驰跑团专属优惠价',
        hotelRates: [
          { label: 'King Bed（大床房）', value: '$149 / 晚' },
          { label: '2 Queen Beds（双大床房）', value: '$159 / 晚' },
        ],
        amenityBreakfast: '含免费早餐',
        amenityAirportShuttle: '机场免费班车（Shuttle）',
        amenityWifi: '免费高速Wi-Fi',
        amenityGym: '免费24小时健身中心',
        amenityPool: '免费室内恒温游泳池',
        amenityMandarin: '前台提供中文（普通话）服务 - 沟通无障碍',
        amenityCancellation: '入住前 72 小时可免费取消，全额退款',
        amenityRaceShuttle: '比赛当天提供前往马拉松起点直通车：$40',
        runnerPerkLateCheckout: '赛后休整：延迟退房至下午5点（仅 $75 + Tax）',
        flyerViewLabel: '查看宣传单（PDF）',
        flyerPdfHref: '/marathon-welcome/chi-runners-hyatt-flyer.pdf',
        ctaBook: '预订酒店',
        hotelBookUrl: 'https://www.hyatt.com/events/en-US/group-booking/CHIZO/G-MARA',
        wechatGroupTitle: '有问题？加入芝马酒店微信群',
        wechatGroupBody: '扫码进群，订房、芝马直通车、入住细节等问题都可以在群里问。',
        wechatGroupQrAlt: '芝马酒店微信群二维码',
        wechatGroupQrSrc: '/marathon-welcome/chicago-marathon-wechat-group-qr.png',
      },
      carbLoadingPage: {
        heroTitleLines: ['芝加哥马拉松加碳会'],
        heroSubtitle: '芝加哥驰跑团主办',
        benefitsSectionTitle: '赛前相聚 · 能量集结',
        benefits: [
          '全球华人跑者相聚，交流分享，结交友谊',
          '高碳水美食加能量，赛前补给，提升耐力',
          '芝加哥马拉松跑友经验传授，赛前指导，增强信心',
          '挑战前欢聚一堂，摄影留念，记录瞬间',
        ],
        eventSectionTitle: '活动信息',
        eventInfoRows: [
          {
            icon: 'calendar',
            label: '时间',
            value: '2026 年 10 月 9 日（周五）晚上 6:00',
          },
          {
            icon: 'mapPin',
            label: '地点',
            value: 'Hyatt Place Chicago O’Hare Airport（机场附近）',
          },
          {
            icon: 'mapPin',
            label: '地址',
            value: '6810 Mannheim Rd, Rosemont, IL 60018',
          },
          { icon: 'banknote', label: '费用', value: '$30 / 人' },
          {
            icon: 'ticket',
            label: '报名开始',
            value: '2026 年 9 月 1 日',
          },
        ],
        menuSectionTitle: '菜单',
        menuImageAlt: '加碳会菜单',
        hotelPromoMain: '芝马酒店超值价 $149起',
        hotelPromoCta: '查看详情与预订',
        ctaRegister: '立即报名（加碳会）',
        registerUrl: null,
        registerDisabledHint: '加碳会报名将于 2026 年 9 月 1 日开放。',
      },
      transportationPage: {
        docTitle: '芝加哥马拉松交通 · 驰跑团',
        pageTitle: '芝加哥马拉松交通',
        pageIntro:
          '写给来参加芝加哥马拉松的跑者：周末怎么移动最省心。Hyatt Place Chicago O’Hare Airport（凯悦嘉轩奥黑尔）是机场旁很省心的住宿选择——含免费机场班车、前台中文服务，并可选购比赛日前往 Grant Park 的直通车。芝加哥的公共交通（CTA）在赛事周末同样可靠，下文用「看图 + 分步」的方式，尽量让第一次来的朋友也不迷路。',
        ctaHotel: '住宿专页（协议价与礼遇）',
        jumpNavLabel: '本页导航',
        jumpNav: [
          { href: '#airport-hotel', label: '机场 ↔ 酒店' },
          { href: '#hotel-start', label: '酒店 ↔ 起终点' },
          { href: '#hotel-expo', label: '酒店 ↔ Expo' },
          { href: '#cta-guide', label: '如何乘坐 CTA' },
          { href: '#race-day', label: '比赛日提示' },
          { href: '#faq', label: '常见问题' },
          { href: '#further-reading', label: '延伸阅读' },
        ],
        addresses: {
          startFinish: {
            label: '比赛起终点（Grant Park）',
            lines: ['337 E Randolph St, Chicago, IL 60601'],
          },
          expo: {
            label: 'Expo（McCormick Place 北馆）',
            lines: ['2301 S Dr Martin Luther King Jr Dr, Chicago, IL 60616'],
          },
          hotel: {
            label: 'Hyatt Place Chicago O’Hare Airport',
            lines: ['6810 Mannheim Rd, Rosemont, IL 60018'],
          },
          ctaBlue: {
            label: 'CTA 蓝线 O’Hare 站',
            lines: ['1000 O’Hare Dr, Chicago, IL 60666'],
          },
        },
        images: {
          airportTransit: {
            alt: '奥黑尔航站楼内指示牌，标有 Airport Transit 与租车方向',
            caption:
              '在航站楼里寻找英文标识 “Airport Transit”（机场内部捷运），可前往租车中心（Rental Car Center）等枢纽。',
          },
          ctaSign: {
            alt: '奥黑尔指示牌标有 Trains to City - CTA',
            caption: '要坐进城的地铁，请认准 “Trains to City - CTA”，前往 CTA 蓝线车站。',
          },
          walkRental: {
            alt: '手机地图显示从租车区步行至凯悦嘉轩奥黑尔酒店',
            caption:
              '步行参考：约 0.7 mi（约 1.1 km），沿 Mannheim Rd 以平地为主；适合还车后顺路回酒店，大件行李更建议班车。',
          },
          raceMorning: {
            alt: '谷歌地图显示比赛日清晨从凯悦嘉轩奥黑尔驱车前往芝马起点',
            caption:
              '比赛日清晨约 5:30 从酒店出发驾车的路线示意（约 19.7 mi / 约 31.7 km，路况好时约 22–30 分钟级）。截图日期仅为示例，请以比赛当日封路与实时导航为准。',
          },
        },
        sections: {
          airportHotel: {
            title: '1. 从机场到酒店（奥黑尔 ↔ Hyatt Place O’Hare）',
            lead:
              '多数朋友从奥黑尔机场（ORD）入境。酒店位于罗斯蒙特（Rosemont），离机场很近。你可以乘坐酒店免费班车；若人在租车中心附近，也可以像我们一样步行回酒店。',
            signAirportTransitTitle: '先认识标识：Airport Transit',
            signAirportTransitBody:
              '奥黑尔航站楼内的机场捷运在指示牌上写作 Airport Transit，用于连接各航站楼与租车中心等区域。跟着标识走，就不容易绕远路。',
            signCtaTitle: '如果打算直接坐地铁进城？',
            signCtaBody:
              '请寻找 “Trains to City - CTA” 标识，前往 CTA 蓝线（Blue Line）车站。下文「如何乘坐 CTA」有更细的购票与换乘说明。',
            shuttleTitle: '酒店免费班车（推荐带行李）',
            shuttleBody:
              'Hyatt Place O’Hare 提供机场与酒店之间的免费接驳。具体上车点可能因航站楼施工而调整，落地后建议先电话或询问酒店前台，在奥黑尔通常前往「Hotel Shuttle」候车区等候。',
            shuttleTipTitle: '班车班次（参考，以酒店当日公布为准）',
            shuttleTipBody: '约每 40 分钟一班；运营时间约 5:00–22:30。',
            walkTitle: '从租车中心步行到酒店（可选）',
            walkIntro:
              '从机场区域到酒店，常见有两种方式：① 免费酒店班车；② 从 Rental Car Center（租车中心）一带步行回酒店。',
            walkHighlightTitle: '实地走过，放心参考',
            walkHighlight:
              '我们专门实地走了一次：从 Rental Car Center 下来，沿人行道步行到酒店，一路以平地为主。',
            walkStats: '约 0.7 mi（约 1.1 km），步行大约 15–20 分钟（视行李与红绿灯而定）。',
            walkBullets: [
              '建议打开手机地图导航，尽量走人行道与照明较好的路段。',
              '若行李多或深夜抵达，优先选酒店班车或网约车，更安全省力。',
            ],
          },
          hotelStart: {
            title: '2. Hyatt Place O’Hare ↔ 比赛起终点（Grant Park）',
            lead:
              '比赛日清晨节奏很紧：建议提前一晚确认交通方式。酒店提供付费直通车直达起点附近；若想体验本地通勤，CTA 蓝线同样可靠。',
            shuttleBadge: '比赛日',
            shuttleTitle: '驰跑团安排的酒店直通车（付费）',
            shuttleBullets: [
              '参考发车：周日早晨约 5:30 从酒店出发；赛后返程约 15:30（下午 3:30），具体将根据封路情况调整。',
              '费用约 $40/人（与住宿专页一致），上车点与购票方式请于入住时向前台确认。',
              '适合第一次来芝加哥、希望「少动脑、直达赛场附近」的跑友。',
            ],
            shuttleNote: '封路会导致绕行或上下车点微调，务必以酒店前台当日通知为准。',
            mapSectionTitle: '比赛日清晨：车程示意（重点参考）',
            mapSectionBody:
              '下图是清晨约 5:30 从酒店驱车前往起点附近的谷歌地图示意。可见该时段高速通常较空，但仍可能因赛事封路而变化；图中日期仅为截图示例。',
            otherModesTitle: '网约车 / 出租车',
            otherModesBody:
              '从奥黑尔区域打车进市中心，出租车或 Uber/Lyft 常见报价约 $50 左右（含浮动与加价），车程约 30 分钟–1 小时视路况而定。比赛日清晨从酒店到 Grant Park 也可参考相近量级，请提前预留时间。',
          },
          hotelExpo: {
            title: '3. Hyatt Place O’Hare ↔ Expo（领物）',
            lead:
              '领物在 McCormick Place 北馆。周四到周六人流大，建议预留排队与安检时间。从奥黑尔一侧出发，坐地铁通常比开车找车位更省心。',
            tipTitle: '小贴士',
            tipBody:
              '尽量提前一两天买好交通卡或电子票；Expo 现场常有 CTA 展位可咨询购票。',
            ctaRouteTitle: '地铁路线（参考）',
            ctaRouteSteps: [
              '乘坐蓝线（Blue Line）Forest Park 方向。',
              '在 Clark/Lake 站换乘绿线（Green Line）Ashland/63rd 或 Cottage Grove 方向（以站内电子屏为准）。',
              '在 Cermak–McCormick Place 站下车，按指示牌进入 McCormick Place。',
            ],
            ctaRouteTime: '全程约 1 小时 20 分钟，建议多留 15–30 分钟缓冲。',
          },
          cta: {
            title: '4. 如何乘坐 CTA（写给第一次来的朋友）',
            lead:
              '芝加哥的地铁与公交系统统称 CTA。周末赛事期间车厢里会遇到很多去跑马的人，跟着大流也不容易坐错方向。',
            faresTitle: '常见票价（请以 Ventra/CTA 官网当日信息为准）',
            fares: [
              '从奥黑尔搭乘蓝线：机场段单程票价较高（约 $5）。',
              '其他地铁线路单程约 $3；公交车单程约 $2.25。',
              'CTA 1 日通票约 $5；3 日通票约 $15——若多次往返市区很划算。',
            ],
            buyTitle: '购票与刷卡方式',
            buySteps: [
              '车站自助机可购买纸质 Ventra 票。',
              '下载 Ventra App 购买电子票，进站时刷手机。',
              '闸机支持 Apple Pay、Google Pay 或非接触式信用卡按次扣费。',
            ],
            toStartTitle: '从奥黑尔（蓝线沿线）到比赛起点',
            toStartSteps: [
              '搭乘蓝线 Forest Park 方向（或按站内标识前往市中心方向）。',
              '在 Jackson 站下车，步行至 Grant Park 约半英里（约 800 m）。',
              '周日清晨蓝线约每 15 分钟一班，车程约 45 分钟，再加步行时间。',
            ],
            toStartNote:
              '那个时间坐车、走路的很多都是去芝马的跑友，不用太担心「只有自己不认识路」。仍建议提前查好出口与街面方向。',
            otherLinesTitle: '从城里其他位置到起点',
            otherLines: [
              '蓝线、红线：Jackson 站下车。',
              '棕线、橙线、粉线、紫线：Adams 站下车，再步行前往 Grant Park。',
            ],
            toExpoTitle: '从奥黑尔机场到 Expo',
            toExpoSteps: [
              '蓝线至 Clark/Lake 换乘绿线，到 Cermak–McCormick Place 下车即到展区附近。',
            ],
            toExpoTime: '约 1 小时 20 分钟（含换乘等待）。',
            beginnerTitle: '第一次用 CTA 的小提示',
            beginnerBody:
              '进站前先看柱子上的线路颜色与终点站方向；不确定就问工作人员或其他跑友。建议提前下载离线地图，并把酒店地址截屏保存。',
          },
          raceDay: {
            title: '5. Race Day 注意事项',
            tips: [
              '比计划再早 20–30 分钟出门：安检、厕所、存包与进入分区都可能排队。',
              '清晨气温偏低，可穿一件便宜外套，起跑前丢掉（赛道边常有慈善捐衣）。',
              '若乘酒店直通车，前一晚确认集合地点与发车时间（封路可能导致调整）。',
              '若乘 CTA，出发前在 Ventra 或 CTA App 看是否有改线通知。',
              '将号码布二维码、紧急联系人等信息保存在手机相册并尽量离线可阅。',
            ],
          },
        },
        faqTitle: '6. 常见问题 FAQ',
        faq: [
          {
            q: '马拉松周末坐地铁靠谱吗？',
            a: '整体靠谱。周日清晨往市区的蓝线会有不少跑友同路。仍建议预留等车与步行时间，并关注临时改线。',
          },
          {
            q: '从 Midway 机场怎么去 Expo 或起点？',
            a: '可乘橙线（Orange Line）进城，在 Roosevelt 等站换乘绿线到 Cermak–McCormick Place（Expo）。到 Grant Park 也可继续换乘或结合步行，整体约 1 小时量级，视换乘等待而定。',
          },
          {
            q: '从机场打车大概多少钱？',
            a: '从奥黑尔或 Midway 进市区，出租车或 Uber/Lyft 常见约 $40–$50 起（浮动大），车程常需 30 分钟–1 小时。',
          },
          {
            q: 'Expo 到中国城怎么走？',
            a: '直线距离不到 2 公里，白天可步行，建议结伴。网约车最直接；公共交通没有「一站直达」的单一方案。',
          },
        ],
        furtherReadingTitle: '延伸阅读：中国城与城里短途',
        furtherReading: [
          {
            title: '从城里到中国城',
            body: '地铁红线到 Cermak–Chinatown 站下车即到核心区。网约车视时段与起点，常见约 $5–$20、10–30 分钟。',
          },
          {
            title: '从 Expo 到中国城',
            body: '白天可步行约 2 公里内，建议结伴；或使用 Uber/Taxi，更省心。',
          },
        ],
        disclaimer:
          '本页由芝加哥驰跑团志愿者整理，仅供出行参考。地铁票价、班次、酒店班车与赛事封路等信息可能随时调整，请以 CTA、酒店、赛事官方及市政府的最新公告为准。',
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
