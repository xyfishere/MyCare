const STORE_KEY = "myCareApp.v1";
const RECORD_DATA_RESET_VERSION = "test-baseline-2026-06";
const RECORD_DATA_KEYS = [
  "morningEntries",
  "focusSessions",
  "nightEntries",
  "healthRecords",
  "personalNotes",
  "habitEntries",
  "habitReviews",
  "workGoals",
];
const todayKey = () => new Date().toISOString().slice(0, 10);

const defaultNightMusicPlaylists = {
  classical: "https://www.bilibili.com/video/BV1nTbizxE83/?spm_id_from=333.337.search-card.all.click&vd_source=3912bdc9ceab10ea76b3b53828b9018c",
  guitar: "https://www.bilibili.com/video/BV1ixREBSEe7/?spm_id_from=333.1391.0.0",
  rain: "https://www.bilibili.com/video/BV1C79xBLEKK/?spm_id_from=333.1391.0.0",
};

const nightBackgroundTrackUrl = "https://www.bilibili.com/video/BV1bs411X7pd/";
const morningBackgroundTrackUrl = "https://www.bilibili.com/video/BV1GP411d7Hr/?spm_id_from=333.337.search-card.all.click&vd_source=3912bdc9ceab10ea76b3b53828b9018c";

const morningMeditations = {
  focus: {
    label: "专注冥想",
    url: "https://www.bilibili.com/video/BV1kP41137JQ/?spm_id_from=333.337.search-card.all.click",
  },
  emotion: {
    label: "情绪冥想",
    url: "https://www.bilibili.com/video/BV1eNpAe2E9i/?spm_id_from=333.337.search-card.all.click&vd_source=3912bdc9ceab10ea76b3b53828b9018c",
  },
  mindfulness: {
    label: "正念冥想",
    url: "https://www.bilibili.com/video/BV1AG4y167xD/?spm_id_from=333.337.search-card.all.click&vd_source=3912bdc9ceab10ea76b3b53828b9018c",
  },
};

const legacyNightMusicPlaylists = {
  classical: "https://www.youtube.com/results?search_query=classical+sleep+music+playlist",
  guitar: "https://www.youtube.com/results?search_query=acoustic+guitar+sleep+music+playlist",
  rain: "https://www.youtube.com/results?search_query=gentle+rain+sleep+music+playlist",
};

const defaults = {
  settings: {
    calendarUrl: "https://calendar.google.com/calendar/u/0/r/day",
    morningFinalAction: "goals",
    nightMode: "simple",
    nightMusicTheme: "classical",
    nightMusicPlaylists: defaultNightMusicPlaylists,
    personalBlockTheme: "iceland",
    personalBlockTab: "write",
    personalNoteFilter: "all",
    workGoalView: "list",
    workGoalFilter: "current",
    language: "zh",
    recordDataResetVersion: RECORD_DATA_RESET_VERSION,
    lastLocalChangeAt: "",
    lastCloudSyncAt: "",
  },
  morningEntries: [],
  focusSessions: [],
  nightEntries: [],
  healthRecords: [],
  personalNotes: [],
  habitEntries: [],
  habitReviews: [],
  workGoals: [],
};

const backgroundImages = [
  {
    title: "森林溪流",
    source: "Unsplash",
    url: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2400&q=85",
  },
  {
    title: "清晨树林",
    source: "Unsplash",
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=2400&q=85",
  },
  {
    title: "绿林小路",
    source: "Unsplash",
    url: "https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&w=2400&q=85",
  },
  {
    title: "森林湖畔",
    source: "Unsplash",
    url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2400&q=85",
  },
  {
    title: "雾中森林",
    source: "Unsplash",
    url: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=2400&q=85",
  },
  {
    title: "森林光线",
    source: "Unsplash",
    url: "https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?auto=format&fit=crop&w=2400&q=85",
  },
  {
    title: "小猫凝视",
    source: "Unsplash",
    url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=2400&q=85",
  },
  {
    title: "窗边小猫",
    source: "Unsplash",
    url: "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=2400&q=85",
  },
  {
    title: "暖光小猫",
    source: "Unsplash",
    url: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=2400&q=85",
  },
  {
    title: "安静小猫",
    source: "Unsplash",
    url: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=2400&q=85",
  },
  {
    title: "猫咪特写",
    source: "Pexels",
    url: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=2400",
  },
  {
    title: "绿意森林",
    source: "Pexels",
    url: "https://images.pexels.com/photos/1671325/pexels-photo-1671325.jpeg?auto=compress&cs=tinysrgb&w=2400",
  },
  {
    title: "冰岛黑沙滩",
    source: "Unsplash",
    url: "https://images.unsplash.com/photo-1741660419720-df89f2906cfc?auto=format&fit=crop&w=2400&q=85",
  },
  {
    title: "Gullfoss 冰雪瀑布",
    source: "Unsplash",
    url: "https://images.unsplash.com/photo-1651254665060-0fe9e7b1551f?auto=format&fit=crop&w=2400&q=85",
  },
  {
    title: "Landmannalaugar 苔原山谷",
    source: "Unsplash",
    url: "https://images.unsplash.com/photo-1661041524618-220a2a2b8b74?auto=format&fit=crop&w=2400&q=85",
  },
  {
    title: "冰岛瀑布山谷",
    source: "Unsplash",
    url: "https://images.unsplash.com/photo-1660489028389-b16abc97da71?auto=format&fit=crop&w=2400&q=85",
  },
  {
    title: "Skógafoss 雪山瀑布",
    source: "Unsplash",
    url: "https://images.unsplash.com/photo-1651932167017-60502240bb22?auto=format&fit=crop&w=2400&q=85",
  },
  {
    title: "Skógafoss 青绿瀑布",
    source: "Unsplash",
    url: "https://images.unsplash.com/photo-1634055633771-48a7a9d2464a?auto=format&fit=crop&w=2400&q=85",
  },
  {
    title: "冰岛北极光",
    source: "Unsplash",
    url: "https://images.unsplash.com/photo-1517322479358-df90f951f87d?auto=format&fit=crop&w=2400&q=85",
  },
  {
    title: "冰岛极光星空",
    source: "Unsplash",
    url: "https://images.unsplash.com/photo-1559843473-cd9037597389?auto=format&fit=crop&w=2400&q=85",
  },
  {
    title: "Skógafoss 极光",
    source: "Unsplash",
    url: "https://images.unsplash.com/photo-1728875650224-fd3f375f6546?auto=format&fit=crop&w=2400&q=85",
  },
];

let state = loadState();
let audio = {};
let supabaseClient = null;
let currentUser = null;
let cloudRevision = 0;
let cloudSnapshot = null;
let cloudSyncTimer = null;
let cloudSyncInProgress = false;
let applyingCloudState = false;
let focusTimer = {
  mode: "focus",
  running: false,
  paused: false,
  remaining: 30 * 60,
  total: 30 * 60,
  focusMinutes: 30,
  interval: null,
  endAt: null,
  cycle: 1,
};
let focusCategory = "学习";
let selectedFocusSeed = "none";
let selectedFocusMinutes = 30;
let selectedStatsRange = "7";
let morningIndex = 0;
let nightIndex = 0;
let nightInterval = null;
let selectedNoteMood = "平静";
let selectedNoteDelay = { type: "days", days: 7 };
let selectedNoteRecipient = "self";
let noteCalendarMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
let currentBackgroundCredit = "";
let selectedHabitStart = { task: "", category: "工作" };

const habitSeeds = [
  { key: "start", label: "启动", labelEn: "Start", icon: "01" },
  { key: "job", label: "求职", labelEn: "Job", icon: "02" },
  { key: "speaking", label: "口语", labelEn: "Speaking", icon: "03" },
  { key: "tech", label: "技术", labelEn: "Tech", icon: "04" },
  { key: "health", label: "健康", labelEn: "Health", icon: "05" },
];

const personalBlockThemeCredits = {
  iceland: "背景：冰湖雪山 · Unsplash",
  green: "背景：梯田风景 · Unsplash",
  purple: "背景：薰衣草花海 · Unsplash",
  dark: "背景：极光星空 · Unsplash",
};

const copy = {
  zh: {
    brandSubtitle: "private growth room",
    common: {
      home: "返回主页",
      next: "下一步",
      done: "已完成",
      completed: "完成",
      start: "开始",
      pause: "暂停",
      resume: "继续",
      play: "播放",
      stop: "暂停",
      music: "音乐",
      minutes: "分钟",
      daysLater: "天后",
      nowReadable: "现在可以读",
      unreadable: "天后可读",
    },
    nav: {
      work: "目标",
      morning: "晨间",
      focus: "专注",
      night: "睡前",
      stats: "统计",
    },
    paperEntry: {
      script: "To future me",
      title: "写一张小纸条",
    },
    habitEntry: {
      script: "Habit Garden",
      title: "养一颗习惯种子",
    },
    habits: {
      eyebrow: "Habit Garden",
      title: "习惯花园",
      subtitle: "不是突然变好，而是慢慢长出稳定的系统。",
      firstBlock: "今日第一个 25 分钟",
      notStarted: "还没有启动",
      started: "今天已经启动",
      firstBlockCopy: "小小的开始会慢慢塑造稳定的改变。你可以的。",
      customPlaceholder: "这 25 分钟里，最重要的一件事是...",
      startFocus: "开始 25 分钟",
      lowEnergy: "低能量模式",
      keepSystem: "保留系统",
      lowEnergyCopy: "状态差的时候，只做最低版本也算回到系统。",
      seedsTitle: "Habit tree",
      seedsMeta: "你的习惯是种子。慢慢照顾它们。",
      cared: "已照顾",
      rest: "休眠",
    },
    work: {
      eyebrow: "Work Goals",
      title: "工作目标和 Deadline",
      subtitle: "把现在最重要的事情放在这里，完成后打卡并留一句 note。",
      listLabel: "List",
      addNewLabel: "Add New",
      formTitle: "新增目标",
      formMeta: "轻量记录",
      goalLabel: "目标",
      goalPlaceholder: "例如：完成 5 份精投申请",
      categoryLabel: "分类",
      categoryPlaceholder: "求职 / 技术 / 健康",
      deadlineLabel: "Deadline",
      add: "加入目标列表",
      currentTitle: "当前目标",
      finishedTitle: "已完成目标",
      openSummary: "{open} open · {done} done",
      dueToday: "今天到期",
      overdue: "已逾期 {days} 天",
      daysLeft: "还剩 {days} 天",
      completed: "已完成",
      dueOn: "截止 {date}",
      noteLabel: "完成 note",
      addNote: "添加 note",
      editNote: "编辑 note",
      notePlaceholder: "完成后写一句 note，例如：今天完成得比想象中顺。",
      complete: "完成并打卡",
      reopen: "重新打开",
      empty: "暂时没有目标。先加一个最急的小目标就好。",
      currentEmpty: "暂时没有进行中的目标。",
      finishedEmpty: "还没有完成的目标。",
      emptyCta: "添加一个目标",
    },
    today: {
      eyebrow: "今日",
      morning: "晨间",
      focus: "专注",
      night: "睡前",
      recorded: "已记录",
      unrecorded: "未记录",
      rounds: "轮",
      completed: "已完成",
      incomplete: "未完成",
    },
    home: {
      eyebrow: "Choose your room",
      title: "现在想要做些什么呢？",
      subtitle: "不要着急，一步一步来。",
      cards: {
        work: ["工作目标", "清单、deadline 和完成 note"],
        focus: ["专注打卡", "心流专注与认真休息"],
        morning: ["晨间 selfcare", "短句、身体记录、冥想、Goals / Calendar"],
        night: ["睡前 selfcare", "跟着温柔步骤慢慢收尾"],
        stats: ["统计板块", "查看记录、趋势和专注分类"],
      },
    },
    morning: {
      eyebrow: "Morning selfcare",
      title: "Congratulations on starting your new day!",
      subtitle: "我的灵魂再次呼吸，我的双眼再次看见。",
      start: "开始晨间流程",
      restart: "从头开始",
      chooseMeditation: "选择冥想",
      openCalendar: "打开 Calendar",
      openGoals: "打开 Goals",
      goalsOption: "Goals",
      calendarOption: "Calendar",
      finalActionLabel: "冥想后的下一步",
      completeTitle: "晨间流程完成。今天不用完美，只要能回来就好。",
      completeHint: "你已经把今天打开了。",
      step: "第",
      stepUnit: "步",
      skin: "皮肤状态",
      wake: "起床时间",
      hunger: "饥饿值",
      note: "今日一句话",
      notePlaceholder: "例如：今天先完成最小的一步。",
      meditation: "选择一个晨间冥想",
      calendar: "Calendar 链接",
      meditations: {
        focus: "专注冥想",
        emotion: "情绪冥想",
        mindfulness: "正念冥想",
      },
    },
    focus: {
      eyebrow: "Focus sprint",
      title: "心流模式",
      reset: "重置计时器",
      focusMode: "专注",
      breakMode: "休息",
      round: "第 {count} 轮",
      skip: "跳过",
      duration: "专注时长",
      custom: "自定义",
      taskTitle: "本轮任务",
      categoryLabel: "专注分类",
      seedLabel: "Habit seed",
      seedOptional: "可选",
      seeds: {
        none: "不关联",
        health: "Health",
        tech: "Tech",
        "soft-skills": "Soft Skills",
      },
      categories: {
        学习: "学习",
        工作: "工作",
        阅读: "阅读",
        创作: "创作",
        生活: "生活",
        未分类: "未分类",
      },
      taskPlaceholder: "写下一个小到可以开始的任务。",
      todayMinutes: "今日分钟",
      roundsDone: "完成轮数",
      manualLog: "手动记一轮完成",
      emptyCategory: "今天还没有分类专注记录",
      minuteUnit: "分钟",
    },
    night: {
      eyebrow: "Night selfcare",
      title: "“不要温和地走进那个良夜”",
      modeTitle: "睡前模式",
      musicTitle: "睡前音乐",
      musicSubtitle: "选择即播放",
      musicThemes: {
        classical: "古典",
        guitar: "吉他木音",
        rain: "雨声",
      },
      fallback: "今天到这里就很好。",
      duration: "{minutes} 分钟",
      stepLabel: "{mode} · 第 {step} 步 / {total}",
      start: "开始睡前流程",
      complete: "完成睡前",
      completeTitle: "睡前流程完成。现在可以把自己交给睡眠了。",
      completeHint: "如果一会儿还是很清醒，就先离开床，去暗处做安静无聊的事，困了再回来。",
    },
    block: {
      eyebrow: "Personal Block",
      title: "给未来自己的小纸条",
      subtitle: "把一句话轻轻放在这里，等未来的某一天再遇见。",
      themes: {
        iceland: "冰蓝",
        green: "原野",
        purple: "薰衣草",
        dark: "极光",
      },
      composerEyebrow: "A small note",
      composerTitle: "写给未来的我",
      self: "自己",
      friend: "朋友",
      placeholder: "只写一句也可以。",
      moodLabel: "现在的心情",
      moods: {
        平静: "平静",
        开心: "开心",
        疲惫: "疲惫",
        焦虑: "焦虑",
        期待: "期待",
      },
      delayLabel: "几天以后再读",
      randomDelay: "随机 1-30 天",
      custom: "自定义",
      dayUnit: "天",
      save: "保存为小纸条",
      boardEyebrow: "Memory board",
      boardTitle: "我的洞洞板",
      boardSubtitle: "之前写下的小纸条，会安静地贴在这里。",
      randomRead: "随机看一张",
      searchByDate: "按时间搜索",
      all: "全部",
      hintRandom: "这张纸条会在未来 1 到 30 天之间随机回来。",
      hintDays: "这张纸条会在 {days} 天后回来。",
      friendHint: "给朋友留小纸条的功能先留在这里，下一版再打开。",
      emptyText: "先写一句很短的话就可以。",
      saved: "已经收好，会在 {days} 天后回来。",
      noMatch: "还没有符合条件的小纸条。",
      emptyBoard: "这里还很安静。写下一张小纸条，它会慢慢长成你的时间胶囊。",
      readableIn: "{days} 天后可读",
      readableNow: "现在可以读",
    },
    stats: {
      eyebrow: "Patterns",
      title: "从记录里看见自己的节奏",
      export: "导出数据",
      hungerTitle: "近 7 天饥饿值",
      hungerSub: "晨间记录",
      focusTitle: "近 7 天专注分钟",
      focusSub: "番茄钟",
      categoryTitle: "近 7 天分类专注",
      categorySub: "分类统计",
      summaryTitle: "总体状况",
      summaryRange: "本周",
      noCategory: "还没有分类专注记录",
      summary: {
        morning: "晨间记录",
        focus: "专注时长",
        night: "睡前完成",
        health: "健康数据",
      },
      records: "条",
    },
  },
  en: {
    brandSubtitle: "private growth room",
    common: {
      home: "Home",
      next: "Next",
      done: "Done",
      completed: "Complete",
      start: "Start",
      pause: "Pause",
      resume: "Resume",
      play: "Play",
      stop: "Pause",
      music: "music",
      minutes: "min",
      daysLater: "days later",
      nowReadable: "Readable now",
      unreadable: "days left",
    },
    nav: {
      work: "Goals",
      morning: "Morning",
      focus: "Focus",
      night: "Night",
      stats: "Stats",
    },
    paperEntry: {
      script: "To future me",
      title: "Write a small note",
    },
    habitEntry: {
      script: "Habit Garden",
      title: "Grow a habit seed",
    },
    habits: {
      eyebrow: "Habit Garden",
      title: "Habit Garden",
      subtitle: "Build a stable system slowly, not a perfect streak overnight.",
      firstBlock: "First 25-minute block",
      notStarted: "Not started yet",
      started: "Started today",
      firstBlockCopy: "Small starts shape lasting change. You've got this.",
      customPlaceholder: "What's the most important thing to focus on in this 25 minutes?",
      startFocus: "Start 25 minutes",
      lowEnergy: "Low-energy mode",
      keepSystem: "Keep the system",
      lowEnergyCopy: "On low-energy days, the smallest version still counts as returning.",
      lowEnergyButton: "Enter Low-energy mode",
      seedsTitle: "Habit tree",
      seedsMeta: "Your habits are seeds. Nurture them and watch them grow.",
      cared: "Cared for",
      rest: "Rest",
    },
    work: {
      eyebrow: "Work Goals",
      title: "Work Goals and Deadlines",
      subtitle: "Keep the most important work in one calm place. Check it off and leave a note when it is done.",
      listLabel: "List",
      addNewLabel: "Add New",
      formTitle: "New goal",
      formMeta: "Lightweight",
      goalLabel: "Goal",
      goalPlaceholder: "For example: send 5 tailored applications",
      categoryLabel: "Category",
      categoryPlaceholder: "Job search / Tech / Health",
      deadlineLabel: "Deadline",
      add: "Add to goals",
      currentTitle: "Current goals",
      finishedTitle: "Finished goals",
      openSummary: "{open} open · {done} done",
      dueToday: "Due today",
      overdue: "{days} days overdue",
      daysLeft: "{days} days left",
      completed: "Completed",
      dueOn: "Due {date}",
      noteLabel: "Completion note",
      addNote: "Add note",
      editNote: "Edit note",
      notePlaceholder: "Add a note after finishing, e.g. this went better than expected.",
      complete: "Complete and check in",
      reopen: "Reopen",
      empty: "No goals yet. Add one small urgent goal first.",
      currentEmpty: "No current goals.",
      finishedEmpty: "No finished goals yet.",
      emptyCta: "Add New Goal",
    },
    today: {
      eyebrow: "Today",
      morning: "Morning",
      focus: "Focus",
      night: "Night",
      recorded: "Logged",
      unrecorded: "Not yet",
      rounds: "rounds",
      completed: "Done",
      incomplete: "Not yet",
    },
    home: {
      eyebrow: "Choose your room",
      title: "What would you like to do now?",
      subtitle: "No rush. One step at a time.",
      cards: {
        work: ["Work Goals", "Lists, deadlines, and completion notes"],
        focus: ["Focus sprint", "Flow sessions with mindful breaks"],
        morning: ["Morning selfcare", "Quotes, body check-in, meditation, Goals / Calendar"],
        night: ["Night selfcare", "Wind down with gentle bedtime steps"],
        stats: ["Stats", "Review records, trends, and focus categories"],
      },
    },
    morning: {
      eyebrow: "Morning selfcare",
      title: "Congratulations on starting your new day!",
      subtitle: "My soul breathes again, my eyes see again.",
      start: "Start morning flow",
      restart: "Start over",
      chooseMeditation: "Choose meditation",
      openCalendar: "Open Calendar",
      openGoals: "Open Goals",
      goalsOption: "Goals",
      calendarOption: "Calendar",
      finalActionLabel: "After meditation",
      completeTitle: "Morning flow complete. Today does not need to be perfect. Coming back is enough.",
      completeHint: "You have gently opened the day.",
      step: "Step",
      stepUnit: "",
      skin: "Skin status",
      wake: "Wake-up time",
      hunger: "Hunger level",
      note: "One line for today",
      notePlaceholder: "For example: start with the smallest possible step.",
      meditation: "Choose a morning meditation",
      calendar: "Calendar link",
      meditations: {
        focus: "Focus meditation",
        emotion: "Emotion meditation",
        mindfulness: "Mindfulness meditation",
      },
    },
    focus: {
      eyebrow: "Focus sprint",
      title: "Flow Mode",
      reset: "Reset timer",
      focusMode: "Focus",
      breakMode: "Break",
      round: "Round {count}",
      skip: "Skip",
      duration: "Focus length",
      custom: "Custom",
      taskTitle: "Current task",
      categoryLabel: "Focus category",
      seedLabel: "Habit seed",
      seedOptional: "Optional",
      seeds: {
        none: "Not linked",
        health: "Health",
        tech: "Tech",
        "soft-skills": "Soft Skills",
      },
      categories: {
        学习: "Study",
        工作: "Work",
        阅读: "Reading",
        创作: "Creation",
        生活: "Life",
        未分类: "Uncategorized",
      },
      taskPlaceholder: "Write one task small enough to begin.",
      todayMinutes: "Minutes today",
      roundsDone: "Rounds done",
      manualLog: "Log one completed round",
      emptyCategory: "No categorized focus yet today",
      minuteUnit: "min",
    },
    night: {
      eyebrow: "Night selfcare",
      title: "“Do Not Go Gentle into That Good Night”",
      modeTitle: "Night mode",
      musicTitle: "Bedtime music",
      musicSubtitle: "Choose to play",
      musicThemes: {
        classical: "Classical",
        guitar: "Acoustic guitar",
        rain: "Rain",
      },
      fallback: "This is enough for tonight.",
      duration: "{minutes} min",
      stepLabel: "{mode} · Step {step} / {total}",
      start: "Start bedtime flow",
      complete: "Finish bedtime",
      completeTitle: "Bedtime flow complete. You can hand yourself over to sleep now.",
      completeHint: "If you still feel very awake later, leave the bed for a quiet, dim, boring activity, then return when sleepy.",
    },
    block: {
      eyebrow: "Personal Block",
      title: "Notes for My Future Self",
      subtitle: "Leave one small line here, then meet it again on a future day.",
      themes: {
        iceland: "Ice Blue",
        green: "Meadow",
        purple: "Lavender",
        dark: "Aurora",
      },
      composerEyebrow: "A small note",
      composerTitle: "Write to future me",
      self: "Me",
      friend: "Friend",
      placeholder: "One sentence is enough.",
      moodLabel: "Current mood",
      moods: {
        平静: "Calm",
        开心: "Happy",
        疲惫: "Tired",
        焦虑: "Anxious",
        期待: "Hopeful",
      },
      delayLabel: "Read again after",
      randomDelay: "Random 1-30 days",
      custom: "Custom",
      dayUnit: "days",
      save: "Save as a note",
      boardEyebrow: "Memory board",
      boardTitle: "My Pegboard",
      boardSubtitle: "The notes you wrote before will wait quietly here.",
      randomRead: "Random note",
      searchByDate: "Search by date",
      all: "All",
      hintRandom: "This note will return randomly within the next 1 to 30 days.",
      hintDays: "This note will return in {days} days.",
      friendHint: "Notes for friends are saved for the next version.",
      emptyText: "Start with one very short sentence.",
      saved: "Saved. It will return in {days} days.",
      noMatch: "No notes match these filters yet.",
      emptyBoard: "It is quiet here. Write one small note, and it will become a gentle time capsule.",
      readableIn: "Readable in {days} days",
      readableNow: "Readable now",
    },
    stats: {
      eyebrow: "Patterns",
      title: "See Your Rhythm Through Records",
      export: "Export data",
      hungerTitle: "Hunger Level: Last 7 Days",
      hungerSub: "Morning records",
      focusTitle: "Focus Minutes: Last 7 Days",
      focusSub: "Pomodoro",
      categoryTitle: "Focus by Category: Last 7 Days",
      categorySub: "Category stats",
      summaryTitle: "Overall",
      summaryRange: "This week",
      noCategory: "No categorized focus records yet",
      summary: {
        morning: "Morning records",
        focus: "Focus time",
        night: "Night completed",
        health: "Health data",
      },
      records: "records",
    },
  },
};

const nightModes = {
  simple: {
    label: "精简模式",
    duration: 12,
    steps: [
      "把手机放到外面充电，让夜晚先安静下来。",
      "慢慢洗漱，给皮肤涂上乳液和面霜。",
      "轻轻准备好明早的衣服、水杯、钥匙或包。",
      "写下明天醒来后最先做的一件小事，就一句话。",
      "关灯，陪自己做 5 轮呼气更长的慢呼吸。",
      "放空大脑，不再去想任何事情。晚安！",
    ],
  },
  decompress: {
    label: "解压模式",
    duration: 18,
    steps: [
      "把灯光调暗，把手机放到外面充电，给自己一点安静。",
      "写下现在最占脑子的 1 到 3 件事，让它们先离开脑袋。",
      "在每件事旁边写一句：明天可以做的最小动作。",
      "写一句收尾：这件事已经被记录，今晚不用继续解决。",
      "从脚到脸慢慢放松肌肉：轻轻绷紧 3 秒，再温柔地放掉。",
      "躺下后吸气 4 秒、呼气 6 秒，陪自己重复 8 轮。",
      "如果很久仍清醒，就先离开床，去暗处做一点安静无聊的事，困了再回来。",
    ],
  },
  relaxed: {
    label: "放松模式",
    duration: 30,
    steps: [
      "关掉强光，开启勿扰，选一份适合今晚的睡前音乐。",
      "泡澡、泡脚或冲一个热水澡，让身体慢慢降速。",
      "敷面膜，或者做一轮细致一点的护肤，不需要看短视频。",
      "换上舒服的睡衣，顺手整理床边、水杯和明早要用的东西。",
      "轻轻拉伸肩颈、背部、髋部和小腿，舒服就好，不做到酸痛。",
      "写下今天完成的一件小事，只记一件就够了。",
      "关灯，做 8 轮慢呼吸，让呼气比吸气更长一点。",
    ],
  },
};

const nightModeTranslations = {
  en: {
    simple: {
      label: "Simple mode",
      steps: [
        "Charge your phone outside the room, and let the night become quieter first.",
        "Wash up slowly, then apply lotion and face cream with no rush.",
        "Prepare tomorrow's clothes, water bottle, keys, or bag with one gentle pass.",
        "Write down the first tiny thing you will do after waking up tomorrow. One sentence is enough.",
        "Turn off the lights, then stay with five rounds of longer, softer exhales.",
        "Empty your mind. No more thinking about anything. Good night.",
      ],
      hint: "Place yourself in a comfortable environment, and walk toward yourself.",
    },
    decompress: {
      label: "Decompress mode",
      steps: [
        "Dim the lights, charge your phone outside the room, and give yourself a little quiet.",
        "Write down one to three things taking up the most space in your mind.",
        "Beside each thing, write the smallest action tomorrow could hold.",
        "Add one closing line: this has been recorded; tonight does not need to solve it.",
        "Relax your muscles from feet to face: gently tense for three seconds, then release.",
        "After lying down, inhale for four counts and exhale for six counts for eight rounds.",
        "If you stay awake for a long time, leave the bed and do something quiet and boring in dim light, then return when sleepy.",
      ],
      hint: "Let the pressure leave your mind and land on paper first, then let your body soften.",
    },
    relaxed: {
      label: "Relaxed mode",
      steps: [
        "Turn off bright lights, switch on a warm lamp, and choose tonight's bedtime music.",
        "Take a bath, soak your feet, or have a warm shower so your body can slow down.",
        "Use a face mask or do a slightly more careful skincare round without short videos.",
        "Change into comfortable sleepwear, then set up your bedside, water, and tomorrow's essentials.",
        "Stretch your neck, shoulders, back, hips, and calves gently. Comfort is the goal.",
        "Write down one small thing you completed today. One is enough.",
        "Turn off the lights and take eight slow breaths, making each exhale a little longer than the inhale.",
      ],
      hint: "Tonight can move more slowly, so your body knows the day has truly ended.",
    },
  },
};

const defaultMorningQuotes = [
  {
    label: "先读一句",
    prompt: "爱自己是一生浪漫的开始。",
    promptEn: "Loving yourself is the beginning of a lifelong romance.",
    hint: "",
  },
  {
    label: "再读一句",
    prompt: "人不可以逃避苦难，亦不可以放弃希望。",
    promptEn: "We cannot escape hardship, nor can we give up hope.",
    hint: "",
  },
  {
    label: "启动提醒",
    prompt: "唯有“美”能让生命拥意义。",
    promptEn: "Only beauty can give life meaning.",
    hint: "",
  },
  {
    label: "短句 4",
    prompt: "我们体内住着一个存在，他无所不知，他知道自己想要什么，它比我们更懂得如何生活得更好。",
    promptEn: "There is something within us that knows what it wants and understands how we might live more fully.",
    hint: "",
  },
  {
    label: "短句 5",
    prompt: "如果一个人一直足够坚定，就能实现他的愿望。",
    promptEn: "If a person remains steadfast enough, they can bring their wish to life.",
    hint: "",
  },
  {
    label: "短句 6",
    prompt: "我始终沉浸在自己之中，我的注意力永远朝向内心。",
    promptEn: "I remain immersed in myself, with my attention always turned inward.",
    hint: "",
  },
  {
    label: "短句 7",
    prompt: "寻找自己，在自己内心扎根，试探着走出自己的道路，无论这条路将通向何方。",
    promptEn: "Find yourself, take root within, and gently make your own path wherever it may lead.",
    hint: "",
  },
  {
    label: "短句 8",
    prompt: "读书，痛苦，爱着从痛苦中滋生出来的那份喜悦，这是一个永无止境的过程。",
    promptEn: "To read, to endure, and to love the joy that grows from hardship is an endless process.",
    hint: "",
  },
  {
    label: "短句 9",
    prompt: "我遇见的每一个人，街头的每一丝气味，都让我有了无限去爱的理由。",
    promptEn: "Every person I meet and every scent in the street gives me endless reasons to love.",
    hint: "",
  },
];

const morningCheckInSteps = [
  {
    label: "皮肤状态",
    prompt: "现在的皮肤是什么状态？",
    hint: "选一个最接近的就好，不需要分析原因。",
    field: "skin",
  },
  {
    label: "起床时间",
    prompt: "你今天大概几点起床？",
    hint: "填一个时间。模糊也可以，这只是给未来的你一点线索。",
    field: "wake",
  },
  {
    label: "饥饿值",
    prompt: "现在的饥饿值是多少？",
    hint: "0 是完全不饿，10 是非常饿。",
    field: "hunger",
  },
  {
    label: "今日一句话",
    prompt: "给今天留一句很短的提醒。",
    hint: "可以留空。短一点反而更容易带走。",
    field: "note",
  },
  {
    label: "晨间冥想",
    prompt: "很好。现在去做晨间冥想。",
    hint: "链接在这里。确认无误后点击按钮，记录会一起保存。",
    field: "meditation",
    action: "saveAndMeditate",
  },
  {
    label: "今日目标",
    prompt: "冥想回来后，选择接下来要打开的地方。",
    hint: "去 Goals 整理今天的重点，或者打开 Calendar 安排时间。",
    field: "finalAction",
    action: "finishMorning",
  },
];

let morningQuotePool = [...defaultMorningQuotes];
let morningSteps = [...pickMorningQuotes(), ...morningCheckInSteps];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function loadState() {
  const saved = localStorage.getItem(STORE_KEY);
  if (!saved) return cloneDefaults();
  try {
    const parsed = JSON.parse(saved);
    const loaded = {
      ...cloneDefaults(),
      ...parsed,
      settings: { ...cloneDefaults().settings, ...(parsed.settings || {}) },
    };
    loaded.settings.nightMusicPlaylists = migrateNightMusicPlaylists(parsed.settings?.nightMusicPlaylists);
    if (!loaded.settings.nightMusicPlaylists[loaded.settings.nightMusicTheme]) {
      loaded.settings.nightMusicTheme = defaults.settings.nightMusicTheme;
    }
    if (!Array.isArray(parsed.workGoals)) {
      loaded.workGoals = cloneDefaults().workGoals;
    }
    loaded.workGoals = removeSeededWorkGoals(loaded.workGoals);
    if (parsed.settings?.recordDataResetVersion !== RECORD_DATA_RESET_VERSION) {
      RECORD_DATA_KEYS.forEach((key) => {
        loaded[key] = [];
      });
      loaded.settings.recordDataResetVersion = RECORD_DATA_RESET_VERSION;
      localStorage.setItem(STORE_KEY, JSON.stringify(loaded));
    }
    return loaded;
  } catch {
    return cloneDefaults();
  }
}

function removeSeededWorkGoals(goals = []) {
  const seededGoalIds = new Set([
    "goal-start-system",
    "goal-job-applications",
    "goal-speaking-practice",
    "goal-tech-output",
    "goal-health-rhythm",
  ]);
  return goals.filter((goal) => !seededGoalIds.has(goal.id));
}

function migrateNightMusicPlaylists(savedPlaylists = {}) {
  const merged = { ...defaultNightMusicPlaylists, ...savedPlaylists };
  Object.entries(legacyNightMusicPlaylists).forEach(([theme, oldUrl]) => {
    if (!savedPlaylists[theme] || savedPlaylists[theme] === oldUrl) {
      merged[theme] = defaultNightMusicPlaylists[theme];
    }
  });
  delete merged.bedtime;
  return merged;
}

function cloneDefaults() {
  return JSON.parse(JSON.stringify(defaults));
}

function saveState({ skipCloud = false, preserveTimestamp = false } = {}) {
  if (!preserveTimestamp) {
    state.settings.lastLocalChangeAt = new Date().toISOString();
  }
  localStorage.setItem(STORE_KEY, JSON.stringify(state));
  refreshDashboard();
  if (!skipCloud && !applyingCloudState) queueCloudSync();
}

function init() {
  setRandomBackground();
  loadMorningQuotes();

  $("#calendarUrl").value = state.settings.calendarUrl;
  $("#nightMusicUrl").value = getNightMusicUrl();
  $("#wakeTime").value = new Date().toTimeString().slice(0, 5);

  bindLanguageToggle();
  bindNavigation();
  bindMorning();
  bindFocus();
  bindNight();
  bindPersonalBlock();
  bindHabitGarden();
  bindLowEnergyMode();
  bindWorkGoals();
  bindStats();
  bindTimerAccuracy();
  bindAccount();
  renderLanguage();
  showView("home");
  refreshDashboard();
  initSupabase();
}

function bindAccount() {
  $("#accountEntry")?.addEventListener("click", () => {
    renderAccountUI();
    $("#accountDialog")?.showModal();
  });
  $("#sendMagicLink")?.addEventListener("click", sendMagicLink);
  $("#syncNow")?.addEventListener("click", () => syncToCloud({ announce: true }));
  $("#signOut")?.addEventListener("click", signOut);
  $("#useDeviceData")?.addEventListener("click", () => syncToCloud({ announce: true, force: true }));
  $("#useCloudData")?.addEventListener("click", applyPendingCloudState);
  $("#downloadBackup")?.addEventListener("click", () => downloadStateBackup(state));
  $("#chooseBackup")?.addEventListener("click", () => $("#backupFileInput")?.click());
  $("#backupFileInput")?.addEventListener("change", importStateBackup);
  $("#refreshHistory")?.addEventListener("click", loadCloudHistory);
  $("#accountHistoryList")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-history-id]");
    if (button) restoreCloudHistory(button.dataset.historyId);
  });
}

function getSupabaseConfig() {
  const config = window.MYCARE_SUPABASE_CONFIG || {};
  return {
    url: String(config.url || "").trim(),
    publishableKey: String(config.publishableKey || config.anonKey || "").trim(),
  };
}

function isSupabaseConfigured() {
  const config = getSupabaseConfig();
  return Boolean(config.url && config.publishableKey && window.supabase?.createClient);
}

async function initSupabase() {
  if (!isSupabaseConfigured()) {
    renderAccountUI();
    return;
  }
  const config = getSupabaseConfig();
  supabaseClient = window.supabase.createClient(config.url, config.publishableKey);
  const { data, error } = await supabaseClient.auth.getSession();
  if (error) {
    setAccountMessage(error.message, true);
  }
  currentUser = data?.session?.user || null;
  renderAccountUI();
  if (currentUser) {
    await reconcileCloudState();
    await loadCloudHistory();
  }

  supabaseClient.auth.onAuthStateChange((event, session) => {
    currentUser = session?.user || null;
    renderAccountUI();
    if (currentUser && event !== "INITIAL_SESSION") {
      window.setTimeout(async () => {
        await reconcileCloudState();
        await loadCloudHistory();
      }, 0);
    }
  });
}

async function sendMagicLink() {
  if (!supabaseClient) {
    setAccountMessage(getLanguage() === "zh"
      ? "云同步尚未配置。请先在 supabase-config.js 中填写公开配置。"
      : "Cloud sync is not configured yet. Add the public settings in supabase-config.js.", true);
    return;
  }
  const email = $("#accountEmail")?.value.trim();
  if (!email) {
    setAccountMessage(getLanguage() === "zh" ? "请先填写邮箱。" : "Enter your email first.", true);
    return;
  }
  setAccountMessage(getLanguage() === "zh" ? "正在发送安全登录链接..." : "Sending a secure sign-in link...");
  const redirectTo = window.location.origin === "null"
    ? window.location.href.split(/[?#]/)[0]
    : `${window.location.origin}${window.location.pathname}`;
  const { error } = await supabaseClient.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: redirectTo },
  });
  setAccountMessage(error
    ? error.message
    : (getLanguage() === "zh" ? "登录链接已发送，请查看邮箱。" : "Magic link sent. Check your email."), Boolean(error));
}

async function signOut() {
  if (!supabaseClient) return;
  const { error } = await supabaseClient.auth.signOut();
  if (error) {
    setAccountMessage(error.message, true);
    return;
  }
  currentUser = null;
  cloudRevision = 0;
  cloudSnapshot = null;
  setAccountMessage(getLanguage() === "zh" ? "已退出。数据仍保存在此设备。" : "Signed out. Your data remains on this device.");
  renderAccountUI();
}

function queueCloudSync() {
  if (!supabaseClient || !currentUser || cloudSyncInProgress || cloudSnapshot) return;
  window.clearTimeout(cloudSyncTimer);
  cloudSyncTimer = window.setTimeout(() => syncToCloud(), 1400);
  renderAccountUI("syncing");
}

async function reconcileCloudState() {
  if (!supabaseClient || !currentUser) return;
  setAccountMessage(getLanguage() === "zh" ? "正在检查云端数据..." : "Checking cloud data...");
  const { data, error } = await supabaseClient
    .from("app_states")
    .select("payload, revision, updated_at")
    .eq("user_id", currentUser.id)
    .maybeSingle();
  if (error) {
    setAccountMessage(error.message, true);
    renderAccountUI("error");
    return;
  }
  if (!data) {
    await syncToCloud({ announce: true, force: true });
    return;
  }

  cloudRevision = Number(data.revision || 0);
  const remoteUpdatedAt = data.updated_at || "";
  const lastSync = Date.parse(state.settings.lastCloudSyncAt || "") || 0;
  const localChanged = Date.parse(state.settings.lastLocalChangeAt || "") || 0;
  const remoteChanged = Date.parse(remoteUpdatedAt || "") || 0;
  const localIsNewer = localChanged > lastSync + 1000;
  const remoteIsNewer = remoteChanged > lastSync + 1000;

  if (!lastSync || (localIsNewer && remoteIsNewer)) {
    cloudSnapshot = data;
    setAccountMessage(getLanguage() === "zh"
      ? "本机和云端都有数据，请选择要保留的版本。"
      : "This device and the cloud both have data. Choose which version to keep.");
    renderAccountUI("conflict");
    return;
  }
  if (remoteIsNewer) {
    applyCloudState(data);
    return;
  }
  if (localIsNewer) {
    await syncToCloud({ force: true });
    return;
  }
  setAccountMessage(getLanguage() === "zh" ? "已与云端同步。" : "Synced with the cloud.");
  renderAccountUI("synced");
}

async function syncToCloud({ announce = false, force = false } = {}) {
  if (!supabaseClient || !currentUser || cloudSyncInProgress) return;
  if (cloudSnapshot && !force) {
    renderAccountUI("conflict");
    return;
  }
  cloudSyncInProgress = true;
  window.clearTimeout(cloudSyncTimer);
  if (announce) setAccountMessage(getLanguage() === "zh" ? "正在同步..." : "Syncing...");
  renderAccountUI("syncing");
  const payload = JSON.parse(JSON.stringify(state));
  const { data, error } = await supabaseClient
    .from("app_states")
    .upsert({ user_id: currentUser.id, payload }, { onConflict: "user_id" })
    .select("revision, updated_at")
    .single();
  cloudSyncInProgress = false;
  if (error) {
    setAccountMessage(error.message, true);
    renderAccountUI("error");
    return;
  }
  cloudRevision = Number(data.revision || cloudRevision);
  cloudSnapshot = null;
  state.settings.lastCloudSyncAt = data.updated_at;
  localStorage.setItem(STORE_KEY, JSON.stringify(state));
  setAccountMessage(getLanguage() === "zh" ? "已安全同步到云端。" : "Safely synced to the cloud.");
  renderAccountUI("synced");
  loadCloudHistory();
}

function applyPendingCloudState() {
  if (!cloudSnapshot) return;
  applyCloudState(cloudSnapshot);
}

function applyCloudState(snapshot) {
  applyingCloudState = true;
  const payload = snapshot?.payload || {};
  state = {
    ...cloneDefaults(),
    ...payload,
    settings: { ...cloneDefaults().settings, ...(payload.settings || {}) },
  };
  state.settings.nightMusicPlaylists = migrateNightMusicPlaylists(payload.settings?.nightMusicPlaylists);
  state.settings.lastCloudSyncAt = snapshot.updated_at || new Date().toISOString();
  state.settings.lastLocalChangeAt = state.settings.lastCloudSyncAt;
  cloudRevision = Number(snapshot.revision || cloudRevision);
  cloudSnapshot = null;
  localStorage.setItem(STORE_KEY, JSON.stringify(state));
  applyingCloudState = false;
  renderLanguage();
  refreshDashboard();
  setAccountMessage(getLanguage() === "zh" ? "已使用云端数据。" : "Cloud data loaded.");
  renderAccountUI("synced");
}

function setAccountMessage(message = "", isError = false) {
  const target = $("#accountMessage");
  if (!target) return;
  target.textContent = message;
  target.classList.toggle("is-error", isError);
}

function renderAccountUI(status = "") {
  const zh = getLanguage() === "zh";
  const configured = isSupabaseConfigured();
  const signedIn = Boolean(currentUser);
  const conflict = Boolean(cloudSnapshot);
  $("#accountEntryTitle").textContent = signedIn ? (currentUser.email || (zh ? "我的账户" : "My account")) : (zh ? "登录与同步" : "Sign in & sync");
  $("#accountEntryStatus").textContent = signedIn
    ? (status === "syncing" ? (zh ? "同步中..." : "Syncing...") : (zh ? "云同步已开启" : "Cloud sync on"))
    : (configured ? (zh ? "可选云同步" : "Optional cloud sync") : (zh ? "仅保存在本机" : "Local only"));
  $("#accountEntryDot").classList.toggle("is-online", signedIn && status !== "error");

  $("#accountDialogEyebrow").textContent = zh ? "私密云同步" : "Private cloud sync";
  $("#accountDialogTitle").textContent = signedIn ? (zh ? "你的 My Care 账户" : "Your My Care account") : (zh ? "登录 My Care" : "Sign in to My Care");
  $("#accountDialogCopy").textContent = zh
    ? "使用邮箱安全链接登录，在不同设备之间同步你的记录。"
    : "Sign in with a secure email link to sync your data across devices.";
  $("#accountEmailLabel").textContent = zh ? "邮箱地址" : "Email address";
  $("#sendMagicLink").textContent = zh ? "发送登录链接" : "Send magic link";
  $("#syncNow").textContent = zh ? "立即同步" : "Sync now";
  $("#signOut").textContent = zh ? "退出登录" : "Sign out";
  $("#accountSyncMeta").textContent = zh ? "更改会先保存在本机。" : "Local changes are saved first.";
  $("#accountConflictCopy").textContent = zh
    ? "本机和云端都有数据，请选择要保留的版本。"
    : "This device and the cloud both have data. Choose which version to keep.";
  $("#useDeviceData").textContent = zh ? "使用本机数据" : "Use this device";
  $("#useCloudData").textContent = zh ? "使用云端数据" : "Use cloud data";
  $("#accountPrivacy").textContent = zh
    ? "云同步完全可选。登录前，你的数据只保存在此设备。"
    : "Cloud sync is optional. Your data stays on this device until you sign in.";
  $("#accountBackupTitle").textContent = zh ? "备份文件" : "Backup file";
  $("#accountBackupCopy").textContent = zh
    ? "下载一份可携带的完整数据，或从设备恢复备份。"
    : "Download a portable copy or restore one from your device.";
  $("#downloadBackup").textContent = zh ? "下载备份" : "Download backup";
  $("#chooseBackup").textContent = zh ? "导入备份" : "Import backup";
  $("#accountHistoryTitle").textContent = zh ? "云端历史版本" : "Cloud history";
  $("#refreshHistory").textContent = zh ? "刷新" : "Refresh";
  $("#accountEmailDisplay").textContent = currentUser?.email || "";
  $("#accountSignedOut").classList.toggle("is-hidden", signedIn);
  $("#accountSignedIn").classList.toggle("is-hidden", !signedIn || conflict);
  $("#accountConflict").classList.toggle("is-hidden", !signedIn || !conflict);
}

function downloadStateBackup(payload = state, suffix = "") {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const extra = suffix ? `-${suffix}` : "";
  link.href = url;
  link.download = `my-care-backup-${todayKey()}${extra}.json`;
  link.click();
  URL.revokeObjectURL(url);
  setAccountMessage(getLanguage() === "zh" ? "备份文件已下载。" : "Backup downloaded.");
}

async function importStateBackup(event) {
  const input = event.currentTarget;
  const file = input.files?.[0];
  input.value = "";
  if (!file) return;
  try {
    const imported = JSON.parse(await file.text());
    if (!isValidStateBackup(imported)) throw new Error("invalid backup");
    downloadStateBackup(state, "before-import");
    applyingCloudState = true;
    state = {
      ...cloneDefaults(),
      ...imported,
      settings: { ...cloneDefaults().settings, ...(imported.settings || {}) },
    };
    state.settings.nightMusicPlaylists = migrateNightMusicPlaylists(imported.settings?.nightMusicPlaylists);
    applyingCloudState = false;
    saveState();
    renderLanguage();
    refreshDashboard();
    setAccountMessage(getLanguage() === "zh"
      ? "备份已恢复。恢复前的数据也已自动下载。"
      : "Backup restored. The previous data was downloaded automatically.");
  } catch {
    applyingCloudState = false;
    setAccountMessage(getLanguage() === "zh" ? "无法读取这个备份文件。" : "This backup file could not be read.", true);
  }
}

function isValidStateBackup(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const expectedArrays = ["morningEntries", "focusSessions", "nightEntries", "personalNotes", "habitEntries", "workGoals"];
  return expectedArrays.some((key) => Array.isArray(value[key])) && (!value.settings || typeof value.settings === "object");
}

async function loadCloudHistory() {
  const list = $("#accountHistoryList");
  if (!list) return;
  if (!supabaseClient || !currentUser) {
    list.innerHTML = "";
    return;
  }
  list.innerHTML = `<p class="account-history-empty">${getLanguage() === "zh" ? "正在读取..." : "Loading..."}</p>`;
  const { data, error } = await supabaseClient
    .from("app_state_history")
    .select("id, revision, saved_at")
    .eq("user_id", currentUser.id)
    .order("saved_at", { ascending: false })
    .limit(20);
  if (error) {
    list.innerHTML = `<p class="account-history-empty">${getLanguage() === "zh" ? "请先重新运行最新的 schema.sql。" : "Run the latest schema.sql first."}</p>`;
    return;
  }
  if (!data?.length) {
    list.innerHTML = `<p class="account-history-empty">${getLanguage() === "zh" ? "同步更新后，旧版本会出现在这里。" : "Older versions will appear after sync updates."}</p>`;
    return;
  }
  const locale = getLanguage() === "zh" ? "zh-CN" : "en-US";
  list.innerHTML = data.map((item) => `
    <div class="account-history-item">
      <div>
        <strong>${new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeStyle: "short" }).format(new Date(item.saved_at))}</strong>
        <small>${getLanguage() === "zh" ? "版本" : "Revision"} ${Number(item.revision || 0)}</small>
      </div>
      <button type="button" data-history-id="${item.id}">${getLanguage() === "zh" ? "恢复" : "Restore"}</button>
    </div>
  `).join("");
}

async function restoreCloudHistory(historyId) {
  if (!supabaseClient || !currentUser || !historyId) return;
  const zh = getLanguage() === "zh";
  if (!window.confirm(zh ? "恢复这个版本吗？当前版本会先自动保存到历史记录。" : "Restore this version? The current version will be archived first.")) return;
  const { data, error } = await supabaseClient
    .from("app_state_history")
    .select("payload, revision, saved_at")
    .eq("user_id", currentUser.id)
    .eq("id", historyId)
    .single();
  if (error || !data) {
    setAccountMessage(error?.message || (zh ? "无法读取历史版本。" : "Could not load that version."), true);
    return;
  }
  downloadStateBackup(state, "before-restore");
  applyCloudState({ payload: data.payload, revision: data.revision, updated_at: data.saved_at });
  state.settings.lastLocalChangeAt = new Date().toISOString();
  localStorage.setItem(STORE_KEY, JSON.stringify(state));
  await syncToCloud({ announce: true, force: true });
}

function bindTimerAccuracy() {
  document.addEventListener("visibilitychange", () => {
    if (focusTimer.running) tickFocusTimer();
  });
  window.addEventListener("focus", () => {
    if (focusTimer.running) tickFocusTimer();
  });
}

function setRandomBackground() {
  const selected = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
  document.documentElement.style.setProperty("--active-bg", `url("${selected.url}")`);
  currentBackgroundCredit = `背景：${selected.title} · ${selected.source}`;
  $("#backgroundCredit").textContent = currentBackgroundCredit;
}

async function loadMorningQuotes() {
  try {
    const response = await fetch("morning-quotes.json", { cache: "no-store" });
    if (!response.ok) throw new Error("quotes file unavailable");
    const quotes = await response.json();
    const normalized = normalizeMorningQuotes(quotes);
    if (!normalized.length) throw new Error("quotes file is empty");
    morningQuotePool = normalized;
    resetMorningSteps();
  } catch {
    morningQuotePool = [...defaultMorningQuotes];
    resetMorningSteps();
  }
}

function normalizeMorningQuotes(quotes) {
  if (!Array.isArray(quotes)) return [];
  return quotes
    .map((quote, index) => {
      if (typeof quote === "string") {
        return {
          label: `短句 ${index + 1}`,
          prompt: quote.trim(),
          promptEn: "",
          hint: "",
        };
      }
      return {
        label: quote.label || `短句 ${index + 1}`,
        prompt: String(quote.zh || quote.prompt || "").trim(),
        promptEn: String(quote.en || quote.promptEn || "").trim(),
        hint: quote.hint || "",
      };
    })
    .filter((quote) => quote.prompt && quote.promptEn);
}

function resetMorningSteps() {
  morningSteps = [...pickMorningQuotes(), ...morningCheckInSteps];
  morningIndex = Math.min(morningIndex, morningSteps.length - 1);
  if ($("#morningPrompt")) renderMorningPrompt();
}

function pickMorningQuotes() {
  const pool = [...morningQuotePool];
  const selected = [];
  while (pool.length && selected.length < 2) {
    const index = Math.floor(Math.random() * pool.length);
    selected.push(pool.splice(index, 1)[0]);
  }
  return selected.map((quote, index) => ({
    ...quote,
    label: `今日短句 ${index + 1}`,
  }));
}

function bindNavigation() {
  $$(".nav-tab, .module-card, .immersive-home, .paper-entry").forEach((button) => {
    button.addEventListener("click", () => {
      showView(button.dataset.view);
    });
  });

  $("#calendarUrl").addEventListener("change", (event) => {
    state.settings.calendarUrl = event.target.value || defaults.settings.calendarUrl;
    saveState();
  });
}

function bindLanguageToggle() {
  $("#languageToggle")?.addEventListener("click", () => {
    state.settings.language = getLanguage() === "zh" ? "en" : "zh";
    saveState();
    renderLanguage();
  });
}

function getLanguage() {
  return state.settings.language === "en" ? "en" : "zh";
}

function t() {
  return copy[getLanguage()];
}

function interpolate(template, values) {
  return Object.entries(values).reduce((result, [key, value]) => result.replaceAll(`{${key}}`, value), template);
}

function displayFocusCategory(category) {
  return t().focus.categories[category] || category;
}

function displayMood(mood) {
  return t().block.moods[mood] || mood;
}

function renderLanguage() {
  const lang = getLanguage();
  const text = copy[lang];
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  document.body.dataset.language = lang;

  $(".brand p").textContent = text.brandSubtitle;
  Object.entries(text.nav).forEach(([view, label]) => {
    const button = $(`.nav-tab[data-view="${view}"]`);
    if (!button) return;
    button.querySelector("strong").textContent = label;
    button.setAttribute("aria-label", label);
    button.setAttribute("title", label);
  });

  $(".paper-entry span").textContent = text.paperEntry.script;
  $(".paper-entry strong").textContent = text.paperEntry.title;
  $(".habit-entry span").textContent = text.habitEntry.script;
  $(".habit-entry strong").textContent = text.habitEntry.title;
  $(".today-panel .eyebrow").textContent = text.today.eyebrow;
  renderTodayPanelLabels();

  $("#todayLabel").textContent = new Intl.DateTimeFormat(lang === "zh" ? "zh-CN" : "en-US", {
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(new Date());

  $("#view-home .home-copy .eyebrow").textContent = text.home.eyebrow;
  $("#homeTitle").textContent = text.home.title;
  $("#view-home .home-copy p:not(.eyebrow)").textContent = text.home.subtitle;
  ensureHomeModuleCards();
  Object.entries(text.home.cards).forEach(([view, [title, description]]) => {
    const card = $(`.module-card[data-view="${view}"]`);
    if (!card) return;
    card.querySelector("strong").textContent = title;
    card.querySelector("small").textContent = description;
  });

  $$("#languageToggle [data-lang-label]").forEach((item) => {
    item.textContent = item.dataset.langLabel === "zh" ? "中文" : "EN";
    item.classList.toggle("active", item.dataset.langLabel === lang);
  });
  $("#languageToggle").setAttribute("aria-label", lang === "zh" ? "Switch to English" : "Switch to Chinese");
  renderMorningLanguage();
  renderFocusLanguage();
  renderNightLanguage();
  renderPersonalBlockLanguage();
  renderHabitLanguage();
  renderLowEnergyLanguage();
  renderWorkLanguage();
  renderStatsLanguage();
  renderAccountUI();
  refreshDashboard();
}

function ensureHomeModuleCards() {
  const grid = $(".home-grid");
  if (!grid || $(".module-card[data-view='work']")) return;
  const card = document.createElement("button");
  card.className = "module-card";
  card.dataset.view = "work";
  card.type = "button";
  card.innerHTML = `
    <span aria-hidden="true">◆</span>
    <strong></strong>
    <small></small>
  `;
  card.addEventListener("click", () => showView("work"));
  grid.prepend(card);
}

function renderMorningLanguage() {
  const text = t().morning;
  $("#view-morning .immersive-home").textContent = t().common.home;
  $("#view-morning .immersive-home").setAttribute("aria-label", t().common.home);
  $("#view-morning .section-head .eyebrow").textContent = text.eyebrow;
  $("#morningTitle").textContent = text.title;
  $(".morning-subtitle").textContent = text.subtitle;
  $("#startMorning").textContent = text.start;
  $$("[data-morning-field]").forEach((field) => {
    const key = field.dataset.morningField;
    const label = text[key];
    if (label) field.childNodes[0].textContent = `${label} `;
  });
  $("#morningNote").placeholder = text.notePlaceholder;
  Object.entries(text.meditations).forEach(([key, label]) => {
    const button = $(`.meditation-option[data-meditation="${key}"]`);
    if (button) button.textContent = label;
  });
  $("#morningFinalActionLabel").textContent = text.finalActionLabel;
  $("#morningCalendarLabel").textContent = text.calendar;
  $("[data-morning-final-action='goals']").textContent = text.goalsOption;
  $("[data-morning-final-action='calendar']").textContent = text.calendarOption;
  const skinOptions = getLanguage() === "en"
    ? ["Stable", "Dry", "Redness", "Breakout", "Sensitive"]
    : ["稳定", "干燥", "泛红", "爆痘", "敏感"];
  $$("#skinState option").forEach((option, index) => {
    option.textContent = skinOptions[index] || option.textContent;
  });
  renderMorningPrompt();
  renderMorningFinalAction();
  setAudioButtonState("morning", Boolean(audio.morning?.playing));
}

function renderFocusLanguage() {
  const text = t().focus;
  $("#view-focus .section-head .eyebrow").textContent = text.eyebrow;
  $("#focusTitle").textContent = text.title;
  $("#resetFocus").setAttribute("aria-label", text.reset);
  $("#resetFocus").setAttribute("title", text.reset);
  $("#skipFocus").textContent = text.skip;
  $(".focus-duration-wrap .focus-control-label").textContent = text.duration;
  $(".custom-duration span").textContent = text.custom;
  $(".custom-duration small").textContent = text.minuteUnit;
  $$(".duration-option").forEach((button) => {
    button.textContent = `${button.dataset.duration} ${text.minuteUnit}`;
  });
  $("#view-focus .panel-title h3").textContent = text.taskTitle;
  $("#view-focus .panel > .focus-control-label").textContent = text.categoryLabel;
  $("#focusSeedLabel").innerHTML = `${text.seedLabel} <small>${text.seedOptional}</small>`;
  $$("#focusHabitSeed option").forEach((option) => {
    option.textContent = text.seeds[option.value] || option.textContent;
  });
  $("#focusTask").placeholder = text.taskPlaceholder;
  const metricLabels = $$("#view-focus .focus-metrics span");
  if (metricLabels[0]) metricLabels[0].textContent = text.todayMinutes;
  if (metricLabels[1]) metricLabels[1].textContent = text.roundsDone;
  $("#logFocus").textContent = text.manualLog;
  renderFocusCategories();
  renderTimer();
}

function renderNightLanguage() {
  const text = t().night;
  $("#view-night .section-head .eyebrow").textContent = text.eyebrow;
  $("#nightTitle").textContent = text.title;
  $("#nightSettings .panel-title h3").textContent = text.modeTitle;
  $(".night-music .panel-title h3").textContent = text.musicTitle;
  $(".night-music .panel-title span").textContent = text.musicSubtitle;
  $$(".music-option").forEach((button) => {
    button.textContent = text.musicThemes[button.dataset.musicTheme] || button.textContent;
  });
  $(".night-home-action").textContent = t().common.home;
  $(".night-home-action").setAttribute("aria-label", t().common.home);
  $("#startNight").textContent = text.start;
  renderNightStep();
  setAudioButtonState("night", Boolean(audio.night?.playing) || !$("#nightMusicPlayerWrap")?.classList.contains("is-hidden"));
}

function renderPersonalBlockLanguage() {
  const text = t().block;
  $("#view-block .block-head .eyebrow").textContent = text.eyebrow;
  $("#blockTitle").textContent = text.title;
  $("#view-block .block-head p:not(.eyebrow)").textContent = text.subtitle;
  $$(".block-theme-option").forEach((button) => {
    button.textContent = text.themes[button.dataset.blockTheme] || button.textContent;
  });
  $(".composer-top .eyebrow").textContent = text.composerEyebrow;
  $(".composer-top h3").textContent = text.composerTitle;
  $(".recipient-option[data-recipient='self']").textContent = text.self;
  $(".recipient-option[data-recipient='friend']").textContent = text.friend;
  $("#personalNoteText").placeholder = text.placeholder;
  const groups = $$(".note-control-group > span");
  if (groups[0]) groups[0].textContent = text.moodLabel;
  if (groups[1]) groups[1].textContent = text.delayLabel;
  $$("#noteMoodChoices .note-chip").forEach((button) => {
    button.textContent = displayMood(button.dataset.noteMood);
  });
  $$("#noteDelayChoices .note-chip[data-note-days]").forEach((button) => {
    button.textContent = `${button.dataset.noteDays} ${t().common.daysLater}`;
  });
  $("#noteDelayChoices .note-chip[data-note-random]").textContent = text.randomDelay;
  $(".custom-note-delay span").textContent = text.custom;
  $(".custom-note-delay small").textContent = text.dayUnit;
  $("#savePersonalNote").textContent = text.save;
  $(".board-head .eyebrow").textContent = text.boardEyebrow;
  $(".board-head h3").textContent = text.boardTitle;
  $(".board-head > p").textContent = text.boardSubtitle;
  $("#randomPersonalNote").textContent = text.randomRead;
  $(".note-date-search span").textContent = text.searchByDate;
  renderNoteDateSearch();
  $$(".note-filter").forEach((button) => {
    button.textContent = button.dataset.noteFilter === "all" ? text.all : displayMood(button.dataset.noteFilter);
  });
  updatePersonalNoteHint();
  renderPersonalNotes();
}

function renderHabitLanguage() {
  const text = t().habits;
  $("#view-habits .section-head .eyebrow").textContent = text.eyebrow;
  $("#habitTitle").textContent = text.title;
  $("#view-habits .section-head .muted").textContent = text.subtitle;
  $(".habit-start-card .panel-title h3").textContent = text.firstBlock;
  $(".habit-start-card > p").textContent = text.firstBlockCopy;
  $("#habitCustomTask").placeholder = text.customPlaceholder;
  $("#startHabitFocus").textContent = text.startFocus;
  $(".habit-energy-card .panel-title h3").textContent = text.lowEnergy;
  $(".habit-energy-card .panel-title span").textContent = text.keepSystem;
  $(".habit-energy-card > p").textContent = text.lowEnergyCopy;
  const lowEnergyButton = $(".habit-energy-options button");
  if (lowEnergyButton) {
    lowEnergyButton.textContent = text.lowEnergyButton || "进入低能量模式";
    lowEnergyButton.dataset.energyAction = getLanguage() === "zh" ? "低能量模式" : "Low-energy mode";
  }
  $(".habit-seeds-card .panel-title h3").textContent = text.seedsTitle;
  $(".habit-seeds-card .panel-title span").textContent = text.seedsMeta;
  const seedStatusButton = $(".habit-seed-status-button");
  if (seedStatusButton) {
    seedStatusButton.textContent = getLanguage() === "zh" ? "打开习惯种子状态" : "Open habit seed status";
  }
  renderHabitGarden();
}

function renderLowEnergyLanguage() {
  if (!$("#view-low-energy")) return;
  const zh = getLanguage() === "zh";
  $(".low-energy-back").textContent = zh ? "← 返回 Habit Garden" : "← Back to Habit Garden";
  $("#lowEnergyTitle").textContent = zh ? "低能量模式" : "Low-energy mode";
  $(".low-energy-hero > div > p").textContent = zh
    ? "低能量日的目标不是表现良好，而是温柔地回来。"
    : "On low-energy days, the goal is not to perform well. The goal is to return.";
  $(".low-energy-keep").textContent = zh ? "保留系统" : "Keep the system";
  const rules = $$(".low-energy-rules span");
  if (rules[0]) rules[0].textContent = zh ? "完成 1 个 = 没断线" : "Complete 1 = keep the chain";
  if (rules[1]) rules[1].textContent = zh ? "完成 2 个 = 今天足够了" : "Complete 2 = enough for today";
  $(".low-energy-core .low-energy-label").textContent = zh ? "核心任务" : "Core task";
  $("#lowEnergyCore").lastChild.textContent = zh ? " 工作 25 分钟" : " Work for 25 minutes";
  $(".low-energy-core small").textContent = zh ? "专注 25 分钟已经是一种胜利。" : "One focused 25 minutes is a win.";
  $(".low-energy-optional .low-energy-label").textContent = zh ? "可选恢复" : "Optional recovery";
  const options = $$(".low-energy-option-grid button");
  const labels = zh
    ? ["洗澡", "散步 / 拉伸 10 分钟", "吃点东西"]
    : ["Take a shower", "Walk / stretch 10 minutes", "Eat something"];
  options.forEach((button, index) => {
    button.lastChild.textContent = labels[index] || "";
  });
  $(".low-energy-optional small").textContent = zh ? "选择一件能让自己舒服一点的事情。" : "Choose what helps you feel a little better.";
  $(".low-energy-tree-panel h3").textContent = zh ? "你的习惯是种子。" : "Your habits are seeds.";
  $(".low-energy-tree-panel p:not(.eyebrow)").textContent = zh ? "慢慢照顾它们，看着它们生长。" : "Nurture them and watch them grow.";
  $(".low-energy-seed-button").textContent = zh ? "打开习惯种子状态 →" : "Open Habit seed status →";
  $(".low-energy-footer").textContent = zh ? "不需要补回来。明天重新开始就好。" : "No catching up. Just restart tomorrow.";
}

function renderWorkLanguage() {
  if (!$("#view-work")) return;
  const text = t().work;
  $("#view-work .section-head .eyebrow").textContent = text.eyebrow;
  $("#workTitle").textContent = text.title;
  $("#view-work .section-head .muted").textContent = text.subtitle;
  $(".work-view-option[data-work-view='list']").textContent = text.listLabel;
  $(".work-view-option[data-work-view='add']").textContent = text.addNewLabel;
  $("#workGoalForm .panel-title h3").textContent = text.formTitle;
  $("#workGoalForm .panel-title span").textContent = text.formMeta;
  $("[data-work-label='title']").childNodes[0].textContent = `${text.goalLabel} `;
  $("[data-work-label='category']").childNodes[0].textContent = `${text.categoryLabel} `;
  $("[data-work-label='deadline']").childNodes[0].textContent = `${text.deadlineLabel} `;
  $("#workGoalTitle").placeholder = text.goalPlaceholder;
  $("#workGoalCategory").placeholder = text.categoryPlaceholder;
  $("#workGoalForm button[type='submit']").textContent = text.add;
  $("[data-goal-filter='current']").textContent = text.currentTitle;
  $("[data-goal-filter='finished']").textContent = text.finishedTitle;
  renderWorkGoalView();
  renderWorkGoals();
}

function renderStatsLanguage() {
  const text = t().stats;
  const zh = getLanguage() === "zh";
  $("#view-stats .section-head .eyebrow").textContent = text.eyebrow;
  $("#statsTitle").textContent = zh ? "看见自己的节奏" : "See Your Rhythm";
  $("#statsSubtitle").textContent = zh ? "只看趋势，不评价每一天。" : "Notice the patterns without judging each day.";
  $("#exportData").setAttribute("aria-label", text.export);
  $("#exportData").setAttribute("title", text.export);
  const labels = {
    healthStatsTitle: zh ? "身体状态" : "Health",
    healthStatsSubtitle: zh ? "观察饥饿感与皮肤状态的变化。" : "Notice changes in hunger and skin status.",
    hungerStatsTitle: "Hunger level",
    hungerStatsMeta: zh ? "晨间记录 · 0–10" : "Morning check-in · 0–10",
    skinStatsTitle: zh ? "皮肤状态" : "Skin status",
    skinStatsMeta: zh ? "按日期查看变化" : "Changes over time",
    focusStatsTitle: zh ? "专注投入" : "Focus",
    focusStatsSubtitle: zh ? "查看时间投入，而不是追逐完美表现。" : "See where time went without chasing perfection.",
    focusMinutesStatsTitle: zh ? "每日专注分钟" : "Daily focus minutes",
    focusMinutesStatsMeta: zh ? "每天投入的时间" : "Time invested each day",
    categoryStatsTitle: zh ? "专注类别" : "Focus categories",
    categoryStatsMeta: zh ? "按累计分钟比较" : "Compared by total minutes",
    goalsStatsTitle: zh ? "目标进展" : "Goals",
    goalsStatsSubtitle: zh ? "看清正在推进的事情，也看见已经完成的部分。" : "See what is moving and what has already been completed.",
    goalStatusTitle: zh ? "目标状态" : "Goal status",
    goalStatusMeta: zh ? "当前进展概览" : "A calm progress overview",
    goalCategoryTitle: zh ? "目标类别" : "Goal categories",
    goalCategoryMeta: zh ? "目标数量与已完成数量" : "Total and completed goals",
    goalDeadlineTitle: zh ? "Deadline 时间线" : "Deadline timeline",
    goalDeadlineMeta: zh ? "接下来值得留意的目标" : "What deserves attention next",
    seedStatsTitle: zh ? "习惯种子" : "Habit Seeds",
    seedStatsSubtitle: zh ? "看看最近把注意力温柔地放在了哪里。" : "See where your attention has been gently placed.",
    seedCompareTitle: zh ? "Seed 对比" : "Seed comparison",
    seedCompareMeta: zh ? "专注次数与累计分钟" : "Sessions and total minutes",
    seedTimelineTitle: zh ? "最近照顾时间线" : "Recent care timeline",
    seedTimelineMeta: zh ? "记录出现的位置，而不是连续天数" : "Presence over streaks",
  };
  Object.entries(labels).forEach(([id, label]) => {
    const target = $(`#${id}`);
    if (target) target.textContent = label;
  });
  $$(".stats-range").forEach((button) => {
    const range = button.dataset.statsRange;
    button.textContent = range === "all" ? (zh ? "全部" : "All") : `${range} ${zh ? "天" : "days"}`;
  });
  if ($("#view-stats").classList.contains("active")) drawCharts();
}

function renderTodayPanelLabels() {
  const text = copy[getLanguage()].today;
  const rows = [
    ["morningStatus", text.morning],
    ["focusStatus", text.focus],
    ["nightStatus", text.night],
  ];
  rows.forEach(([id, label]) => {
    const status = $(`#${id}`);
    if (!status?.parentElement) return;
    status.parentElement.firstChild.textContent = `${label} `;
  });
}

function showView(viewName) {
  $$(".nav-tab").forEach((item) => item.classList.toggle("active", item.dataset.view === viewName));
  $$(".paper-entry").forEach((item) => item.classList.toggle("active", item.dataset.view === viewName));
  $$(".view").forEach((view) => view.classList.remove("active"));
  $(`#view-${viewName}`).classList.add("active");
  setImmersiveMode(viewName);
  if (viewName !== "morning") stopMorningBackgroundTrack();
  if (viewName === "block") renderPersonalBlock();
  if (viewName === "habits") renderHabitGarden();
  if (viewName === "work") renderWorkGoals();
  if (viewName !== "block") $("#backgroundCredit").textContent = currentBackgroundCredit;
  if (viewName === "stats") drawCharts();
}

function setImmersiveMode(viewName) {
  document.body.classList.toggle("immersive-mode", viewName === "morning" || viewName === "night");
  document.body.classList.toggle("morning-mode", viewName === "morning");
  document.body.classList.toggle("night-mode", viewName === "night");
  document.body.classList.toggle("block-mode", viewName === "block");
}

function bindMorning() {
  $("#hunger").addEventListener("input", (event) => {
    $("#hungerOut").textContent = `${event.target.value} / 10`;
  });

  $("#startMorning").addEventListener("click", () => {
    playMorningBackgroundTrack();
    morningIndex = Math.min(morningIndex + 1, morningSteps.length - 1);
    renderMorningPrompt();
  });

  $("#nextMorning").addEventListener("click", () => {
    const currentStep = morningSteps[morningIndex];
    if (currentStep?.action === "saveAndMeditate") {
      saveMorningEntry({ openMeditation: false });
      return;
    }
    if (currentStep?.action === "finishMorning") {
      updateMorningLinks();
      saveState();
      renderMorningComplete();
      $("#nextMorning").textContent = t().common.done;
      if (state.settings.morningFinalAction === "calendar") {
        openFlowLink(state.settings.calendarUrl);
      } else {
        state.settings.workGoalFilter = "current";
        saveState();
        showView("work");
      }
      return;
    }
    morningIndex = Math.min(morningIndex + 1, morningSteps.length - 1);
    renderMorningPrompt();
  });

  $("#morningForm").addEventListener("submit", (event) => {
    event.preventDefault();
  });

  $$(".meditation-option").forEach((button) => {
    button.addEventListener("click", () => {
      const meditation = morningMeditations[button.dataset.meditation];
      if (!meditation) return;
      saveMorningEntry({ openMeditation: false });
      openFlowLink(meditation.url);
      morningIndex = Math.min(morningIndex + 1, morningSteps.length - 1);
      renderMorningPrompt();
    });
  });

  $$(".morning-final-option").forEach((button) => {
    button.addEventListener("click", () => {
      state.settings.morningFinalAction = button.dataset.morningFinalAction;
      saveState();
      renderMorningFinalAction();
      renderMorningPrompt();
    });
  });

  $$(".audio-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const kind = button.dataset.audio;
      if (kind === "night") {
        if ($("#nightMusicPlayerWrap").classList.contains("is-hidden")) playNightBackgroundTrack();
        else stopNightBackgroundTrack();
        return;
      }
      if (kind === "morning") {
        if (audio.morning?.playing) stopMorningBackgroundTrack();
        else playMorningBackgroundTrack();
        return;
      }
      if (audio[kind]?.playing) stopAudio(kind);
      else startAudio(kind);
    });
  });
}

function setAudioButtonState(kind, isPlaying) {
  const button = document.querySelector(`[data-audio="${kind}"]`);
  if (!button) return;
  const label = kind === "morning" ? t().nav.morning : t().nav.night;
  button.classList.toggle("active", isPlaying);
  button.setAttribute("aria-label", `${isPlaying ? t().common.stop : t().common.play} ${label} ${t().common.music}`);
  button.setAttribute("title", `${isPlaying ? t().common.stop : t().common.play} ${t().common.music}`);
}

function renderMorningPrompt() {
  const step = getLocalizedMorningStep(morningSteps[morningIndex]);
  $("#morningStepLabel").textContent = `${step.label} · ${morningIndex + 1} / ${morningSteps.length}`;
  $("#morningPrompt").textContent = step.prompt;
  $("#morningHint").textContent = step.hint || "";
  $("#morningHint").hidden = !step.hint;
  $("#nextMorning").textContent = getMorningButtonText(step);
  $("#startMorning").hidden = morningIndex !== 0;
  $("#nextMorning").hidden = morningIndex === 0;
  $("#morningForm").classList.toggle("is-hidden", !step.field);
  $$(".morning-field").forEach((field) => {
    field.classList.toggle("active", field.dataset.morningField === step.field);
  });
  animateStep("#view-morning .ritual-stage");
}

function getLocalizedMorningStep(step) {
  if (getLanguage() === "zh") return step;
  if (!step?.field) {
    return {
      ...step,
      label: morningIndex === 0 ? "Read one line" : "Read another line",
      prompt: step.promptEn,
      hint: "",
    };
  }
  const translations = {
    skin: {
      label: "Skin status",
      prompt: "How does your skin feel right now?",
      hint: "Choose the closest option. No need to analyze why.",
    },
    wake: {
      label: "Wake-up time",
      prompt: "About what time did you get up today?",
      hint: "A rough time is fine. This is only a small clue for future you.",
    },
    hunger: {
      label: "Hunger level",
      prompt: "What is your hunger level right now?",
      hint: "0 means not hungry at all. 10 means very hungry.",
    },
    note: {
      label: "One line for today",
      prompt: "Leave one short reminder for today.",
      hint: "You can leave it blank. Short is easier to carry.",
    },
    meditation: {
      label: "Morning meditation",
      prompt: "Good. Now choose a morning meditation.",
      hint: "Choose one link below. Your check-in will be saved with it.",
    },
    finalAction: {
      label: "Today's goal",
      prompt: "After meditation, choose where to continue.",
      hint: "Review your Goals or open Calendar to plan the time.",
    },
  };
  return { ...step, ...(translations[step.field] || {}) };
}

function getMorningButtonText(step) {
  if (step.action === "saveAndMeditate") return t().common.next;
  if (step.action === "finishMorning") {
    return state.settings.morningFinalAction === "calendar"
      ? t().morning.openCalendar
      : t().morning.openGoals;
  }
  return t().common.next;
}

function renderMorningFinalAction() {
  const action = state.settings.morningFinalAction === "calendar" ? "calendar" : "goals";
  $$(".morning-final-option").forEach((button) => {
    const isActive = button.dataset.morningFinalAction === action;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  $(".morning-calendar-setting").classList.toggle("is-hidden", action !== "calendar");
}

function renderMorningComplete() {
  $("#startMorning").hidden = true;
  $("#nextMorning").hidden = true;
  $("#morningForm").classList.add("is-hidden");
  $$(".morning-field").forEach((field) => field.classList.remove("active"));
  $("#morningStepLabel").textContent = t().common.completed;
  $("#morningPrompt").textContent = t().morning.completeTitle;
  $("#morningHint").textContent = t().morning.completeHint;
  $("#morningHint").hidden = false;
  animateStep("#view-morning .ritual-stage");
}

function saveMorningEntry(options = {}) {
  updateMorningLinks();
  const entry = {
    date: todayKey(),
    createdAt: new Date().toISOString(),
    skinState: $("#skinState").value,
    wakeTime: $("#wakeTime").value,
    hunger: Number($("#hunger").value),
    note: $("#morningNote").value.trim(),
  };
  state.morningEntries = state.morningEntries.filter((item) => item.date !== entry.date);
  state.morningEntries.push(entry);
  saveState();
  if (options.openMeditation) openFlowLink(options.openMeditation);
  if (options.stayOnMeditation) return;
  morningIndex = Math.min(morningIndex + 1, morningSteps.length - 1);
  renderMorningPrompt();
}

function updateMorningLinks() {
  state.settings.calendarUrl = $("#calendarUrl").value || defaults.settings.calendarUrl;
}

function bindFocus() {
  $("#toggleFocus").addEventListener("click", toggleFocusTimer);
  $("#skipFocus").addEventListener("click", finishFocusSegment);
  $("#resetFocus").addEventListener("click", resetFocusTimer);
  $("#logFocus").addEventListener("click", () => logFocusSession(selectedFocusMinutes, "manual"));
  $$(".focus-category").forEach((button) => {
    button.addEventListener("click", () => {
      focusCategory = button.dataset.focusCategory;
      renderFocusCategories();
    });
  });
  $$(".duration-option").forEach((button) => {
    button.addEventListener("click", () => setFocusDuration(Number(button.dataset.duration)));
  });
  $("#customFocusMinutes").addEventListener("change", (event) => {
    setFocusDuration(Number(event.target.value));
  });
  $("#focusHabitSeed").addEventListener("change", (event) => {
    selectedFocusSeed = event.target.value || "none";
    renderFocusSeed();
  });
  renderFocusCategories();
  renderFocusSeed();
  renderFocusDurationOptions();
  renderTimer();
}

function toggleFocusTimer() {
  focusTimer.running ? pauseFocusTimer() : startFocusTimer();
}

function startFocusTimer() {
  clearInterval(focusTimer.interval);
  focusTimer.running = true;
  focusTimer.paused = false;
  focusTimer.endAt = Date.now() + focusTimer.remaining * 1000;
  $("#toggleFocus").textContent = t().common.pause;
  focusTimer.interval = setInterval(tickFocusTimer, 500);
  tickFocusTimer();
}

function pauseFocusTimer() {
  syncFocusTimerRemaining();
  focusTimer.running = false;
  focusTimer.paused = true;
  focusTimer.endAt = null;
  clearInterval(focusTimer.interval);
  $("#toggleFocus").textContent = t().common.resume;
  renderTimer();
}

function tickFocusTimer() {
  syncFocusTimerRemaining();
  if (focusTimer.remaining <= 0) {
    finishFocusSegment();
    return;
  }
  renderTimer();
}

function syncFocusTimerRemaining() {
  if (!focusTimer.running || !focusTimer.endAt) return;
  focusTimer.remaining = Math.max(0, Math.ceil((focusTimer.endAt - Date.now()) / 1000));
}

function finishFocusSegment() {
  syncFocusTimerRemaining();
  clearInterval(focusTimer.interval);
  focusTimer.interval = null;
  focusTimer.endAt = null;
  focusTimer.paused = false;
  let autoStartBreak = false;
  if (focusTimer.mode === "focus") {
    const completedMinutes = focusTimer.focusMinutes;
    logFocusSession(completedMinutes, "timer");
    const breakMinutes = completedMinutes <= 30 ? 5 : 10;
    focusTimer.mode = "break";
    focusTimer.remaining = breakMinutes * 60;
    focusTimer.total = breakMinutes * 60;
    autoStartBreak = true;
  } else {
    focusTimer.mode = "focus";
    focusTimer.focusMinutes = selectedFocusMinutes;
    focusTimer.remaining = selectedFocusMinutes * 60;
    focusTimer.total = selectedFocusMinutes * 60;
    focusTimer.cycle += 1;
  }
  focusTimer.running = false;
  $("#toggleFocus").textContent = t().common.start;
  renderTimer();
  if (autoStartBreak) startFocusTimer();
}

function resetFocusTimer() {
  clearInterval(focusTimer.interval);
  focusTimer = {
    mode: "focus",
    running: false,
    paused: false,
    remaining: selectedFocusMinutes * 60,
    total: selectedFocusMinutes * 60,
    focusMinutes: selectedFocusMinutes,
    interval: null,
    endAt: null,
    cycle: 1,
  };
  $("#toggleFocus").textContent = t().common.start;
  renderTimer();
}

function renderTimer() {
  const minutes = String(Math.floor(focusTimer.remaining / 60)).padStart(2, "0");
  const seconds = String(focusTimer.remaining % 60).padStart(2, "0");
  const progress = 1 - focusTimer.remaining / focusTimer.total;
  $("#timerDisplay").textContent = `${minutes}:${seconds}`;
  $("#timerMode").textContent = focusTimer.mode === "focus" ? t().focus.focusMode : t().focus.breakMode;
  $("#cycleLabel").textContent = interpolate(t().focus.round, { count: focusTimer.cycle });
  $("#toggleFocus").textContent = focusTimer.running ? t().common.pause : (focusTimer.paused ? t().common.resume : t().common.start);
  $("#timerRing").style.setProperty("--water-level", `${Math.max(progress * 100, 4)}%`);
  $("#timerRing").style.setProperty("--sand-progress", `${Math.max(progress * 100, 3)}%`);
  $("#timerRing").style.setProperty("--sand-remaining", `${Math.max((1 - progress) * 100, 3)}%`);
  $("#timerRing").classList.toggle("break-mode", focusTimer.mode === "break");
}

function logFocusSession(minutes, source) {
  state.focusSessions.push({
    date: todayKey(),
    createdAt: new Date().toISOString(),
    minutes,
    source,
    category: focusCategory,
    habitSeed: selectedFocusSeed === "none" ? "" : selectedFocusSeed,
    task: $("#focusTask").value.trim(),
  });
  saveState();
}

function renderFocusCategories() {
  $$(".focus-category").forEach((button) => {
    button.textContent = displayFocusCategory(button.dataset.focusCategory);
    button.classList.toggle("active", button.dataset.focusCategory === focusCategory);
  });
}

function renderFocusSeed() {
  const select = $("#focusHabitSeed");
  if (!select) return;
  select.value = selectedFocusSeed;
  select.closest(".focus-seed-control")?.classList.toggle("has-seed", selectedFocusSeed !== "none");
}

function setFocusDuration(minutes) {
  const normalized = Math.max(5, Math.min(120, Number.isFinite(minutes) ? Math.round(minutes) : 30));
  selectedFocusMinutes = normalized;
  $("#customFocusMinutes").value = normalized;
  renderFocusDurationOptions();
  if (!focusTimer.running && !focusTimer.paused && focusTimer.mode === "focus") {
    focusTimer.focusMinutes = selectedFocusMinutes;
    focusTimer.remaining = selectedFocusMinutes * 60;
    focusTimer.total = selectedFocusMinutes * 60;
    renderTimer();
  }
}

function renderFocusDurationOptions() {
  $$(".duration-option").forEach((button) => {
    button.classList.toggle("active", Number(button.dataset.duration) === selectedFocusMinutes);
  });
}

function bindNight() {
  $$(".mode-option").forEach((button) => {
    button.addEventListener("click", () => {
      state.settings.nightMode = button.dataset.nightMode;
      nightIndex = 0;
      clearInterval(nightInterval);
      saveState();
      renderNightStep();
    });
  });

  $("#startNight").addEventListener("click", () => {
    startAudio("night");
    nightIndex = Math.min(nightIndex + 1, getNightMode().steps.length - 1);
    renderNightStep();
    clearInterval(nightInterval);
    const mode = getNightMode();
    const stepMs = Math.round((mode.duration * 60 * 1000) / mode.steps.length);
    nightInterval = setInterval(() => {
      advanceNightStep();
    }, stepMs);
  });

  $("#completeNight").addEventListener("click", advanceNightStep);
  $$(".music-option").forEach((button) => {
    button.addEventListener("click", () => {
      state.settings.nightMusicTheme = button.dataset.musicTheme;
      $("#nightMusicUrl").value = getNightMusicUrl();
      saveState();
      renderNightMusicOptions();
      playNightMusic();
    });
  });
  $("#nightMusicUrl").addEventListener("change", (event) => {
    const theme = state.settings.nightMusicTheme || defaults.settings.nightMusicTheme;
    state.settings.nightMusicPlaylists = {
      ...defaults.settings.nightMusicPlaylists,
      ...(state.settings.nightMusicPlaylists || {}),
      [theme]: event.target.value || defaults.settings.nightMusicPlaylists[theme],
    };
    $("#nightMusicUrl").value = getNightMusicUrl();
    saveState();
  });
  renderNightStep();
  renderNightMusicOptions();
}

function renderNightStep() {
  const mode = getNightMode();
  $$(".mode-option").forEach((button) => {
    button.classList.toggle("active", button.dataset.nightMode === state.settings.nightMode);
    const label = getNightMode(button.dataset.nightMode).label;
    const strong = button.querySelector("strong");
    if (strong) strong.textContent = label;
  });
  $("#nightModeDuration").textContent = interpolate(t().night.duration, { minutes: mode.duration });
  $("#nightStepLabel").textContent = interpolate(t().night.stepLabel, { mode: mode.label, step: nightIndex + 1, total: mode.steps.length });
  $("#nightPrompt").textContent = mode.steps[nightIndex] || t().night.fallback;
  $("#nightHint").textContent = getNightModeHint(state.settings.nightMode);
  $("#nightProgressBar").style.width = `${(nightIndex / Math.max(mode.steps.length - 1, 1)) * 100}%`;
  $("#completeNight").textContent = nightIndex >= mode.steps.length - 1 ? t().night.complete : t().common.next;
  $("#startNight").hidden = nightIndex !== 0;
  $("#completeNight").hidden = nightIndex === 0;
  animateStep("#view-night .night-stage");
}

function getNightMode(modeName = state.settings.nightMode) {
  const base = nightModes[modeName] || nightModes.simple;
  const translated = nightModeTranslations[getLanguage()]?.[modeName];
  return translated ? { ...base, ...translated } : base;
}

function getNightModeHint(modeName) {
  const translated = nightModeTranslations[getLanguage()]?.[modeName]?.hint;
  if (translated) return translated;
  if (modeName === "simple") return "“把自己置于舒适的环境里，并走向自己。”";
  if (modeName === "decompress") return "先把压力从脑子里放到纸上，再让身体慢慢松下来。";
  return "今晚可以慢一点，让身体知道一天真的结束了。";
}

function getNightMusicUrl() {
  const theme = state.settings.nightMusicTheme || defaults.settings.nightMusicTheme;
  const playlists = { ...defaults.settings.nightMusicPlaylists, ...(state.settings.nightMusicPlaylists || {}) };
  return playlists[theme] || defaults.settings.nightMusicPlaylists.classical;
}

function updateNightMusicUrl() {
  const theme = state.settings.nightMusicTheme || defaults.settings.nightMusicTheme;
  state.settings.nightMusicPlaylists = {
    ...defaults.settings.nightMusicPlaylists,
    ...(state.settings.nightMusicPlaylists || {}),
    [theme]: $("#nightMusicUrl").value || defaults.settings.nightMusicPlaylists[theme],
  };
  $("#nightMusicUrl").value = getNightMusicUrl();
}

function renderNightMusicOptions() {
  $$(".music-option").forEach((button) => {
    button.classList.toggle("active", button.dataset.musicTheme === state.settings.nightMusicTheme);
  });
}

function playNightMusic() {
  updateNightMusicUrl();
  const embedUrl = toEmbeddableMusicUrl(getNightMusicUrl());
  $("#nightMusicPlayer").src = embedUrl;
  $("#nightMusicPlayerWrap").classList.remove("is-hidden");
  setAudioButtonState("night", true);
}

function playNightBackgroundTrack() {
  $("#nightMusicPlayer").src = toEmbeddableMusicUrl(nightBackgroundTrackUrl);
  $("#nightMusicPlayerWrap").classList.remove("is-hidden");
  setAudioButtonState("night", true);
}

function stopNightBackgroundTrack() {
  $("#nightMusicPlayer").src = "";
  $("#nightMusicPlayerWrap").classList.add("is-hidden");
  setAudioButtonState("night", false);
}

function playMorningBackgroundTrack() {
  $("#morningMusicPlayerWrap").classList.remove("is-hidden");
  $("#morningMusicPlayer").src = "";
  requestAnimationFrame(() => {
    $("#morningMusicPlayer").src = toEmbeddableMusicUrl(morningBackgroundTrackUrl);
  });
  audio.morning = { playing: true, embedded: true };
  setAudioButtonState("morning", true);
}

function stopMorningBackgroundTrack() {
  if (!$("#morningMusicPlayer")) return;
  $("#morningMusicPlayer").src = "";
  $("#morningMusicPlayerWrap").classList.add("is-hidden");
  audio.morning = null;
  setAudioButtonState("morning", false);
}

function toEmbeddableMusicUrl(url) {
  const bvid = url.match(/BV[a-zA-Z0-9]+/)?.[0];
  if (bvid) {
    return `https://player.bilibili.com/player.html?bvid=${bvid}&page=1&high_quality=1&danmaku=0&autoplay=1`;
  }
  return url;
}

function advanceNightStep() {
  const mode = getNightMode();
  if (nightIndex >= mode.steps.length - 1) {
    completeNight();
    return;
  }
  nightIndex += 1;
  renderNightStep();
}

function completeNight() {
  clearInterval(nightInterval);
  $("#startNight").hidden = true;
  $("#completeNight").hidden = true;
  $("#nightProgressBar").style.width = "100%";
  state.nightEntries = state.nightEntries.filter((item) => item.date !== todayKey());
  state.nightEntries.push({ date: todayKey(), createdAt: new Date().toISOString(), completed: true, mode: state.settings.nightMode });
  saveState();
  stopAudio("night");
  $("#nightStepLabel").textContent = t().common.completed;
  $("#nightPrompt").textContent = t().night.completeTitle;
  $("#nightHint").textContent = t().night.completeHint;
  $("#completeNight").textContent = t().common.done;
  animateStep("#view-night .night-stage");
}

function animateStep(selector) {
  const element = $(selector);
  if (!element) return;
  element.classList.remove("step-transition");
  void element.offsetWidth;
  element.classList.add("step-transition");
}

function bindPersonalBlock() {
  if (!$("#personalBlockShell")) return;
  state.personalNotes = state.personalNotes || [];

  $$(".block-theme-option").forEach((button) => {
    button.addEventListener("click", () => {
      state.settings.personalBlockTheme = button.dataset.blockTheme;
      saveState();
      renderPersonalBlockTheme();
    });
  });

  $$(".block-tab").forEach((button) => {
    button.addEventListener("click", () => {
      state.settings.personalBlockTab = button.dataset.blockTab;
      saveState();
      renderPersonalBlockTab();
    });
  });

  $$(".recipient-option").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.recipient === "friend") {
        $("#personalNoteHint").textContent = t().block.friendHint;
        return;
      }
      selectedNoteRecipient = button.dataset.recipient;
      $$(".recipient-option").forEach((item) => item.classList.toggle("active", item === button));
    });
  });

  $$("#noteMoodChoices .note-chip").forEach((button) => {
    button.addEventListener("click", () => {
      selectedNoteMood = button.dataset.noteMood;
      $$("#noteMoodChoices .note-chip").forEach((item) => item.classList.toggle("active", item === button));
    });
  });

  $$("#noteDelayChoices .note-chip").forEach((button) => {
    button.addEventListener("click", () => {
      selectedNoteDelay = button.dataset.noteRandom
        ? { type: "random", days: null }
        : { type: "days", days: Number(button.dataset.noteDays) };
      renderNoteDelaySelection();
      updatePersonalNoteHint();
    });
  });

  $("#customNoteDays").addEventListener("focus", () => {
    selectedNoteDelay = { type: "custom", days: Number($("#customNoteDays").value) || 14 };
    renderNoteDelaySelection();
    updatePersonalNoteHint();
  });

  $("#customNoteDays").addEventListener("input", () => {
    if (selectedNoteDelay.type !== "custom") return;
    selectedNoteDelay.days = Number($("#customNoteDays").value) || 14;
    updatePersonalNoteHint();
  });

  $("#savePersonalNote").addEventListener("click", savePersonalNote);
  $("#randomPersonalNote").addEventListener("click", showRandomPersonalNote);
  bindNoteDateSearch();

  $$(".note-filter").forEach((button) => {
    button.addEventListener("click", () => {
      state.settings.personalNoteFilter = button.dataset.noteFilter;
      saveState();
      renderPersonalNotes();
    });
  });

  renderPersonalBlock();
}

function renderPersonalBlock() {
  renderPersonalBlockTheme();
  renderPersonalBlockTab();
  renderNoteDelaySelection();
  updatePersonalNoteHint();
  renderPersonalNotes();
  renderNoteDateSearch();
}

function bindNoteDateSearch() {
  $("#noteDateTrigger")?.addEventListener("click", () => {
    const calendar = $("#noteCalendar");
    if (!calendar) return;
    const selected = $("#noteSearchDate")?.value;
    if (calendar.hidden && selected) {
      const date = new Date(`${selected}T00:00:00`);
      noteCalendarMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    }
    calendar.hidden = !calendar.hidden;
    $("#noteDateTrigger").setAttribute("aria-expanded", String(!calendar.hidden));
    renderNoteDateSearch();
  });
  $("#noteCalendarPrev")?.addEventListener("click", () => {
    noteCalendarMonth = new Date(noteCalendarMonth.getFullYear(), noteCalendarMonth.getMonth() - 1, 1);
    renderNoteDateSearch();
  });
  $("#noteCalendarNext")?.addEventListener("click", () => {
    noteCalendarMonth = new Date(noteCalendarMonth.getFullYear(), noteCalendarMonth.getMonth() + 1, 1);
    renderNoteDateSearch();
  });
  $("#noteCalendarToday")?.addEventListener("click", () => selectNoteSearchDate(todayKey()));
  $("#noteCalendarClear")?.addEventListener("click", () => selectNoteSearchDate(""));
  $("#noteCalendarDays")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-note-calendar-date]");
    if (button) selectNoteSearchDate(button.dataset.noteCalendarDate);
  });
  document.addEventListener("click", (event) => {
    const search = $(".note-date-search");
    if (!search?.contains(event.target)) closeNoteCalendar();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNoteCalendar();
  });
}

function closeNoteCalendar() {
  const calendar = $("#noteCalendar");
  if (!calendar || calendar.hidden) return;
  calendar.hidden = true;
  $("#noteDateTrigger")?.setAttribute("aria-expanded", "false");
}

function selectNoteSearchDate(value) {
  $("#noteSearchDate").value = value;
  if (value) {
    const date = new Date(`${value}T00:00:00`);
    noteCalendarMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  }
  closeNoteCalendar();
  renderNoteDateSearch();
  renderPersonalNotes();
}

function renderNoteDateSearch() {
  const trigger = $("#noteDateTriggerText");
  const title = $("#noteCalendarTitle");
  const weekdays = $("#noteCalendarWeekdays");
  const daysTarget = $("#noteCalendarDays");
  if (!trigger || !title || !weekdays || !daysTarget) return;
  const zh = getLanguage() === "zh";
  const locale = zh ? "zh-CN" : "en-US";
  const selected = $("#noteSearchDate")?.value || "";
  trigger.textContent = selected
    ? new Intl.DateTimeFormat(locale, { year: "numeric", month: "short", day: "numeric" }).format(new Date(`${selected}T00:00:00`))
    : (zh ? "选择日期" : "Choose a date");
  $("#noteDateTrigger")?.classList.toggle("has-date", Boolean(selected));
  title.textContent = new Intl.DateTimeFormat(locale, { year: "numeric", month: "long" }).format(noteCalendarMonth);
  $("#noteCalendarPrev")?.setAttribute("aria-label", zh ? "上个月" : "Previous month");
  $("#noteCalendarNext")?.setAttribute("aria-label", zh ? "下个月" : "Next month");
  $("#noteCalendarToday").textContent = zh ? "今天" : "Today";
  $("#noteCalendarClear").textContent = zh ? "清除筛选" : "Clear";
  weekdays.innerHTML = (zh ? ["一", "二", "三", "四", "五", "六", "日"] : ["M", "T", "W", "T", "F", "S", "S"])
    .map((day) => `<span>${day}</span>`).join("");

  const year = noteCalendarMonth.getFullYear();
  const month = noteCalendarMonth.getMonth();
  const firstOffset = (new Date(year, month, 1).getDay() + 6) % 7;
  const lastDay = new Date(year, month + 1, 0).getDate();
  const previousLastDay = new Date(year, month, 0).getDate();
  const cells = [];
  for (let index = 0; index < 42; index += 1) {
    const dayNumber = index - firstOffset + 1;
    let cellDate;
    let muted = false;
    if (dayNumber < 1) {
      cellDate = new Date(year, month - 1, previousLastDay + dayNumber);
      muted = true;
    } else if (dayNumber > lastDay) {
      cellDate = new Date(year, month + 1, dayNumber - lastDay);
      muted = true;
    } else {
      cellDate = new Date(year, month, dayNumber);
    }
    const key = toLocalDateKey(cellDate);
    const hasNote = (state.personalNotes || []).some((note) => note.date === key || note.openAt?.slice(0, 10) === key);
    cells.push(`<button type="button" data-note-calendar-date="${key}" class="${muted ? "is-muted" : ""} ${key === selected ? "is-selected" : ""} ${key === todayKey() ? "is-today" : ""} ${hasNote ? "has-note" : ""}" aria-label="${key}">${cellDate.getDate()}</button>`);
  }
  daysTarget.innerHTML = cells.join("");
}

function toLocalDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function renderPersonalBlockTheme() {
  const theme = state.settings.personalBlockTheme || defaults.settings.personalBlockTheme;
  const shell = $("#personalBlockShell");
  if (!shell) return;
  shell.className = `block-shell block-theme-${theme}`;
  document.body.dataset.blockTheme = theme;
  if (document.body.classList.contains("block-mode")) {
    $("#backgroundCredit").textContent = personalBlockThemeCredits[theme] || currentBackgroundCredit;
  }
  $$(".block-theme-option").forEach((button) => {
    button.classList.toggle("active", button.dataset.blockTheme === theme);
  });
}

function renderPersonalBlockTab() {
  $("#blockWritePanel")?.classList.add("active");
  $("#blockReadPanel")?.classList.add("active");
}

function renderNoteDelaySelection() {
  $$("#noteDelayChoices .note-chip").forEach((button) => {
    const isRandom = selectedNoteDelay.type === "random" && button.dataset.noteRandom;
    const isFixed = selectedNoteDelay.type === "days" && Number(button.dataset.noteDays) === selectedNoteDelay.days;
    button.classList.toggle("active", Boolean(isRandom || isFixed));
  });
  $(".custom-note-delay").classList.toggle("active", selectedNoteDelay.type === "custom");
}

function updatePersonalNoteHint() {
  const hint = $("#personalNoteHint");
  if (!hint) return;
  if (selectedNoteDelay.type === "random") {
    hint.textContent = t().block.hintRandom;
    return;
  }
  const days = getPersonalNoteDelayDays({ preview: true });
  hint.textContent = interpolate(t().block.hintDays, { days });
}

function getPersonalNoteDelayDays(options = {}) {
  if (selectedNoteDelay.type === "random" && !options.preview) {
    return Math.floor(Math.random() * 30) + 1;
  }
  if (selectedNoteDelay.type === "custom") {
    const value = Number($("#customNoteDays").value);
    return Math.max(1, Math.min(365, Number.isFinite(value) ? Math.round(value) : 14));
  }
  if (selectedNoteDelay.type === "random") return 1;
  return selectedNoteDelay.days || 7;
}

function savePersonalNote() {
  const textarea = $("#personalNoteText");
  const text = textarea.value.trim();
  if (!text) {
    $("#personalNoteHint").textContent = t().block.emptyText;
    textarea.focus();
    return;
  }

  const delayDays = getPersonalNoteDelayDays();
  const openAt = new Date();
  openAt.setDate(openAt.getDate() + delayDays);
  const createdAt = new Date().toISOString();
  const note = {
    id: `note-${Date.now()}-${Math.round(Math.random() * 1000)}`,
    text,
    mood: selectedNoteMood,
    recipient: selectedNoteRecipient,
    createdAt,
    date: createdAt.slice(0, 10),
    openAt: openAt.toISOString(),
    delayDays,
    theme: state.settings.personalBlockTheme || defaults.settings.personalBlockTheme,
  };

  state.personalNotes = [note, ...(state.personalNotes || [])];
  saveState();
  textarea.value = "";
  $("#personalNoteHint").textContent = interpolate(t().block.saved, { days: delayDays });
  renderPersonalNotes(note.id);
}

function showRandomPersonalNote() {
  const notes = getFilteredPersonalNotes();
  if (!notes.length) {
    $("#personalNotesBoard").innerHTML = `<div class="empty-note">${t().block.noMatch}</div>`;
    renderMoodStats();
    return;
  }
  const selected = notes[Math.floor(Math.random() * notes.length)];
  renderPersonalNotes(selected.id);
}

function getFilteredPersonalNotes() {
  const filter = state.settings.personalNoteFilter || "all";
  const date = $("#noteSearchDate")?.value;
  return (state.personalNotes || []).filter((note) => {
    const moodMatched = filter === "all" || note.mood === filter;
    const dateMatched = !date || note.date === date || note.openAt.slice(0, 10) === date;
    return moodMatched && dateMatched;
  });
}

function renderPersonalNotes(highlightId = "") {
  if (!$("#personalNotesBoard")) return;
  const filter = state.settings.personalNoteFilter || "all";
  $$(".note-filter").forEach((button) => {
    button.classList.toggle("active", button.dataset.noteFilter === filter);
  });

  const notes = getFilteredPersonalNotes();
  $("#personalNotesBoard").innerHTML = notes.length
    ? notes.map((note, index) => renderPersonalNoteCard(note, highlightId, index)).join("")
    : `<div class="empty-note">${t().block.emptyBoard}</div>`;
  renderMoodStats();
}

function renderPersonalNoteCard(note, highlightId, index) {
  const daysLeft = Math.ceil((new Date(note.openAt).getTime() - Date.now()) / 86400000);
  const timeLabel = daysLeft > 0 ? interpolate(t().block.readableIn, { days: daysLeft }) : t().block.readableNow;
  const rotate = (index % 5) - 2;
  return `
    <article class="personal-note-card ${note.id === highlightId ? "highlight" : ""}" style="--note-rotate:${rotate}deg">
      <div class="note-card-meta">
        <span class="mood-dot" data-mood="${escapeHtml(note.mood)}"></span>
        <b>${escapeHtml(displayMood(note.mood))}</b>
        <small>${timeLabel}</small>
      </div>
      <p>${escapeHtml(note.text)}</p>
      <time>${formatShortDate(note.date)}</time>
    </article>
  `;
}

function renderMoodStats() {
  const target = $("#noteMoodStats");
  if (!target) return;
  const moods = ["平静", "开心", "疲惫", "焦虑", "期待"];
  const notes = state.personalNotes || [];
  target.innerHTML = moods.map((mood) => {
    const count = notes.filter((note) => note.mood === mood).length;
    return `<span><i class="mood-dot" data-mood="${mood}"></i>${displayMood(mood)} ${count}</span>`;
  }).join("");
}

function formatShortDate(dateText) {
  if (!dateText) return "";
  const date = new Date(`${dateText}T00:00:00`);
  return new Intl.DateTimeFormat(getLanguage() === "zh" ? "zh-CN" : "en-US", { month: "short", day: "numeric" }).format(date);
}

function bindHabitGarden() {
  if (!$("#view-habits")) return;
  $("#habitCustomTask").addEventListener("input", (event) => {
    selectedHabitStart = { task: event.target.value.trim(), category: "工作" };
  });

  $("#startHabitFocus").addEventListener("click", () => {
    const customTask = $("#habitCustomTask").value.trim();
    const task = customTask || selectedHabitStart.task || (getLanguage() === "zh" ? "第一个 25 分钟" : "First 25-minute block");
    recordHabitEntry("start", task);
    $("#focusTask").value = task;
    focusCategory = selectedHabitStart.category || "工作";
    setFocusDuration(25);
    renderFocusCategories();
    showView("focus");
  });

  $$(".habit-energy-options button").forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.add("is-selected");
      setTimeout(() => {
        button.classList.remove("is-selected");
        showView("low-energy");
      }, 140);
    });
  });

  $(".habit-seed-status-button")?.addEventListener("click", () => {
    openHabitSeedStats();
  });

}

function bindLowEnergyMode() {
  if (!$("#view-low-energy")) return;
  $(".low-energy-back")?.addEventListener("click", () => showView("habits"));
  $("#lowEnergyCore")?.addEventListener("click", () => {
    recordHabitEntry("lowEnergy", "Work for 25 minutes");
    $("#focusTask").value = getLanguage() === "zh" ? "低能量模式：工作 25 分钟" : "Low-energy mode: work for 25 minutes";
    focusCategory = "工作";
    setFocusDuration(25);
    renderFocusCategories();
    showView("focus");
  });
  $$(".low-energy-option-grid button").forEach((button) => {
    button.addEventListener("click", () => {
      recordHabitEntry("lowEnergy", button.dataset.lowEnergyTask);
      button.classList.toggle("completed");
    });
  });
  $(".low-energy-seed-button")?.addEventListener("click", () => {
    openHabitSeedStats();
  });
}

function openHabitSeedStats() {
  showView("stats");
  requestAnimationFrame(() => {
    const section = $(".stats-seed-section");
    if (!section) return;
    section.classList.add("is-highlighted");
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => section.classList.remove("is-highlighted"), 1200);
  });
}

function recordHabitEntry(type, detail) {
  state.habitEntries = state.habitEntries || [];
  state.habitEntries.push({
    date: todayKey(),
    createdAt: new Date().toISOString(),
    type,
    detail,
  });
  saveState();
}

function renderHabitGarden() {
  if (!$("#view-habits")) return;
  const entries = state.habitEntries || [];
  const todayEntries = entries.filter((entry) => entry.date === todayKey());
  $("#habitTodayStatus").textContent = todayEntries.some((entry) => entry.type === "start")
    ? t().habits.started
    : t().habits.notStarted;
  renderHabitSeeds();
}

function renderHabitSeeds() {
  const weekDates = new Set(lastSevenDays());
  const entries = (state.habitEntries || []).filter((entry) => weekDates.has(entry.date));
  $("#habitSeedList").innerHTML = getHabitSeeds().map((seed) => {
    const count = entries.filter((entry) => getHabitSeedKey(entry) === seed.key).length;
    const label = getLanguage() === "zh" ? seed.label : seed.labelEn;
    return `
      <article class="habit-seed">
        <span>${seed.icon}</span>
        <div class="work-goal-content">
          <b>${escapeHtml(label)}</b>
          <small>${count} ${escapeHtml(t().habits.cared)}</small>
        </div>
      </article>
    `;
  }).join("");
}

function getHabitSeeds() {
  return [
    { key: "health", label: "Health", labelEn: "Health", icon: "01" },
    { key: "tech", label: "Tech", labelEn: "Tech", icon: "02" },
    { key: "softSkills", label: "Soft Skills", labelEn: "Soft Skills", icon: "03" },
  ];
}

function getHabitSeedKey(entry) {
  if (entry.type === "lowEnergy") return "health";
  if (entry.detail?.includes("JD") || entry.detail?.includes("简历")) return "job";
  if (entry.detail?.includes("口语") || entry.detail?.includes("面试")) return "speaking";
  if (entry.detail?.includes("技术") || entry.detail?.includes("笔记")) return "tech";
  return "start";
}

function getHabitSeedKey(entry) {
  const detail = String(entry.detail || "").toLowerCase();
  if (entry.type === "lowEnergy") return "health";
  if (detail.includes("health") || detail.includes("sleep") || detail.includes("walk") || detail.includes("stretch")) return "health";
  if (detail.includes("tech") || detail.includes("技术") || detail.includes("note") || detail.includes("笔记")) return "tech";
  if (detail.includes("soft") || detail.includes("skill") || detail.includes("speaking") || detail.includes("interview") || detail.includes("resume") || detail.includes("jd") || detail.includes("口语") || detail.includes("面试") || detail.includes("简历")) return "softSkills";
  return "health";
}

function bindWorkGoals() {
  if (!$("#workGoalForm")) return;
  $$(".work-view-option").forEach((button) => {
    button.addEventListener("click", () => {
      state.settings.workGoalView = button.dataset.workView;
      saveState();
      renderWorkGoalView();
    });
  });

  $$(".work-goal-filter").forEach((button) => {
    button.addEventListener("click", () => {
      state.settings.workGoalFilter = button.dataset.goalFilter;
      saveState();
      renderWorkGoals();
    });
  });

  $("#workGoalForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const title = $("#workGoalTitle").value.trim();
    const deadline = $("#workGoalDeadline").value;
    if (!title || !deadline) return;
    state.workGoals = state.workGoals || [];
    state.workGoals.unshift({
      id: `goal-${Date.now()}-${Math.round(Math.random() * 1000)}`,
      title,
      deadline,
      category: $("#workGoalCategory").value.trim(),
      status: "open",
      note: "",
      createdAt: new Date().toISOString(),
      completedAt: "",
    });
    $("#workGoalTitle").value = "";
    $("#workGoalCategory").value = "";
    $("#workGoalDeadline").value = "";
    state.settings.workGoalView = "list";
    state.settings.workGoalFilter = "current";
    saveState();
    renderWorkGoalView();
    renderWorkGoals();
  });

  $("#workGoalList").addEventListener("click", (event) => {
    const button = event.target.closest("[data-work-action]");
    if (!button) return;
    if (button.dataset.workAction === "showAdd") {
      state.settings.workGoalView = "add";
      saveState();
      renderWorkGoalView();
      $("#workGoalTitle").focus();
      return;
    }
    const card = button.closest("[data-goal-id]");
    const goal = getWorkGoal(card?.dataset.goalId);
    if (!goal) return;
    if (button.dataset.workAction === "complete") {
      goal.status = "done";
      goal.completedAt = new Date().toISOString();
      goal.note = card.querySelector(".work-goal-note").value.trim();
    }
    if (button.dataset.workAction === "reopen") {
      goal.status = "open";
      goal.completedAt = "";
    }
    saveState();
    renderWorkGoals();
  });

  $("#workGoalList").addEventListener("change", (event) => {
    if (!event.target.classList.contains("work-goal-note")) return;
    const card = event.target.closest("[data-goal-id]");
    const goal = getWorkGoal(card?.dataset.goalId);
    if (!goal) return;
    goal.note = event.target.value.trim();
    saveState();
  });
}

function renderWorkGoalView() {
  if (!$("#view-work")) return;
  const view = state.settings.workGoalView === "add" ? "add" : "list";
  $$(".work-view-option").forEach((button) => {
    button.classList.toggle("active", button.dataset.workView === view);
  });
  $("#workListView").classList.toggle("active", view === "list");
  $("#workAddView").classList.toggle("active", view === "add");
}

function getWorkGoal(goalId) {
  return (state.workGoals || []).find((goal) => goal.id === goalId);
}

function renderWorkGoals() {
  if (!$("#workGoalList")) return;
  state.workGoals = state.workGoals || [];
  const filter = state.settings.workGoalFilter === "finished" ? "finished" : "current";
  const goals = [...state.workGoals].sort((a, b) => {
    if (a.status !== b.status) return a.status === "open" ? -1 : 1;
    return String(a.deadline || "").localeCompare(String(b.deadline || ""));
  });
  const open = goals.filter((goal) => goal.status !== "done").length;
  const done = goals.length - open;
  const visibleGoals = goals.filter((goal) => filter === "finished"
    ? goal.status === "done"
    : goal.status !== "done");
  $$(".work-goal-filter").forEach((button) => {
    const isActive = button.dataset.goalFilter === filter;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
  $("#workGoalSummary").textContent = interpolate(t().work.openSummary, { open, done });
  $("#workGoalList").innerHTML = visibleGoals.length
    ? visibleGoals.map(renderWorkGoalCard).join("")
    : filter === "finished"
      ? `<div class="empty-note work-empty-state"><p>${t().work.finishedEmpty}</p></div>`
      : `<div class="empty-note work-empty-state"><p>${goals.length ? t().work.currentEmpty : t().work.empty}</p><button class="primary" data-work-action="showAdd" type="button">${t().work.emptyCta}</button></div>`;
}

function renderWorkGoalCard(goal) {
  const isDone = goal.status === "done";
  const deadline = getWorkDeadlineDetails(goal);
  return `
    <article class="work-goal-card ${isDone ? "done" : ""}" data-goal-id="${escapeHtml(goal.id)}">
      <div class="work-goal-main">
        <div class="work-goal-content">
          <p class="eyebrow">${escapeHtml(goal.category || t().work.currentTitle)}</p>
          <h3>${escapeHtml(goal.title)}</h3>
          <details class="work-note-wrap" ${goal.note ? "open" : ""}>
            <summary>${escapeHtml(goal.note ? t().work.editNote : t().work.addNote)}</summary>
            <label>
              <span>${escapeHtml(t().work.noteLabel)}</span>
              <textarea class="work-goal-note" rows="3" placeholder="${escapeHtml(t().work.notePlaceholder)}">${escapeHtml(goal.note || "")}</textarea>
            </label>
          </details>
          <div class="work-goal-actions">
            ${isDone
              ? `<span class="work-completed">${escapeHtml(t().work.completed)} · ${escapeHtml(formatShortDate(goal.completedAt?.slice(0, 10)))}</span><button class="secondary" data-work-action="reopen" type="button">${escapeHtml(t().work.reopen)}</button>`
              : `<button class="primary" data-work-action="complete" type="button">${escapeHtml(t().work.complete)}</button>`}
          </div>
        </div>
        <span class="work-deadline ${deadline.className}">
          <b>${escapeHtml(deadline.status)}</b>
          <small>${escapeHtml(deadline.date)}</small>
        </span>
      </div>
    </article>
  `;
}

function getWorkDeadlineDetails(goal) {
  const dueDate = formatLongDate(goal.deadline);
  const dueLabel = interpolate(t().work.dueOn, { date: dueDate });
  if (goal.status === "done") {
    return {
      status: t().work.completed,
      date: dueLabel,
      className: "done",
    };
  }
  const today = new Date(`${todayKey()}T00:00:00`);
  const deadline = new Date(`${goal.deadline}T00:00:00`);
  const days = Math.round((deadline - today) / 86400000);
  const className = getWorkDeadlineClass(goal);
  if (days < 0) return { status: interpolate(t().work.overdue, { days: Math.abs(days) }), date: dueLabel, className };
  if (days === 0) return { status: t().work.dueToday, date: dueLabel, className };
  return { status: interpolate(t().work.daysLeft, { days }), date: dueLabel, className };
}

function getWorkDeadlineClass(goal) {
  if (goal.status === "done") return "done";
  const today = new Date(`${todayKey()}T00:00:00`);
  const deadline = new Date(`${goal.deadline}T00:00:00`);
  const days = Math.round((deadline - today) / 86400000);
  if (days < 0) return "overdue";
  if (days <= 7) return "soon";
  return "";
}

function formatLongDate(dateText) {
  if (!dateText) return "";
  const date = new Date(`${dateText}T00:00:00`);
  return new Intl.DateTimeFormat(getLanguage() === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: getLanguage() === "zh" ? "long" : "short",
    day: "numeric",
  }).format(date);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function bindStats() {
  $("#healthImport")?.addEventListener("change", handleImport);
  $("#exportData").addEventListener("click", exportData);
  $$(".stats-range").forEach((button) => {
    button.addEventListener("click", () => {
      selectedStatsRange = button.dataset.statsRange || "7";
      $$(".stats-range").forEach((item) => item.classList.toggle("active", item === button));
      drawCharts();
    });
  });
}

function handleImport(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const text = String(reader.result);
    const records = file.name.endsWith(".xml") ? parseHealthXml(text) : parseCsvOrJson(text, file.name);
    state.healthRecords.push(...records);
    saveState();
    $("#importResult").textContent = `已导入 ${records.length} 条健康记录`;
  };
  reader.readAsText(file);
}

function parseHealthXml(text) {
  const doc = new DOMParser().parseFromString(text, "text/xml");
  const records = Array.from(doc.querySelectorAll("Record")).slice(0, 6000);
  return records.map((record) => ({
    date: (record.getAttribute("startDate") || "").slice(0, 10),
    type: record.getAttribute("type") || "unknown",
    value: Number(record.getAttribute("value")) || 0,
    unit: record.getAttribute("unit") || "",
  })).filter((item) => item.date);
}

function parseCsvOrJson(text, name) {
  if (name.endsWith(".json")) {
    const parsed = JSON.parse(text);
    return Array.isArray(parsed) ? parsed : [];
  }
  return text.split(/\r?\n/).slice(1).map((line) => {
    const [date, type, value, unit = ""] = line.split(",");
    return { date, type, value: Number(value), unit };
  }).filter((item) => item.date && item.type);
}

function startAudio(kind) {
  stopAudio(kind);
  const AudioEngine = window.AudioContext || window.webkitAudioContext;
  if (!AudioEngine) return;
  const context = new AudioEngine();
  const gain = context.createGain();
  gain.gain.value = kind === "morning" ? 0.045 : 0.032;
  gain.connect(context.destination);

  const tones = kind === "morning" ? [261.63, 329.63, 392] : [196, 246.94, 293.66];
  const oscillators = tones.map((frequency, index) => {
    const oscillator = context.createOscillator();
    oscillator.type = index === 0 ? "sine" : "triangle";
    oscillator.frequency.value = frequency;
    oscillator.detune.value = index * 4;
    oscillator.connect(gain);
    oscillator.start();
    return oscillator;
  });

  audio[kind] = { context, oscillators, playing: true };
  setAudioButtonState(kind, true);
}

function stopAudio(kind) {
  if (!audio[kind]) return;
  audio[kind].oscillators.forEach((oscillator) => oscillator.stop());
  audio[kind].context.close();
  audio[kind] = null;
  setAudioButtonState(kind, false);
}

function openFlowLink(url) {
  if (!url) return;
  window.open(url, "_blank", "noopener,noreferrer");
}

function refreshDashboard() {
  const today = todayKey();
  const text = copy[getLanguage()].today;
  const morning = state.morningEntries.find((item) => item.date === today);
  const focusToday = state.focusSessions.filter((item) => item.date === today);
  const night = state.nightEntries.find((item) => item.date === today);

  renderTodayPanelLabels();
  $("#morningStatus").textContent = morning ? text.recorded : text.unrecorded;
  $("#focusStatus").textContent = `${focusToday.length} ${text.rounds}`;
  $("#nightStatus").textContent = night ? text.completed : text.incomplete;
  $("#todayFocusMinutes").textContent = focusToday.reduce((sum, item) => sum + item.minutes, 0);
  $("#todayFocusRounds").textContent = focusToday.length;
  renderFocusCategorySummary(focusToday);
  if ($("#view-stats").classList.contains("active")) drawCharts();
}

function renderFocusCategorySummary(focusToday) {
  const target = $("#focusCategorySummary");
  if (!target) return;
  const totals = focusToday.reduce((acc, item) => {
    const category = item.category || "未分类";
    acc[category] = (acc[category] || 0) + item.minutes;
    return acc;
  }, {});
  const entries = Object.entries(totals).sort((a, b) => b[1] - a[1]);
  target.innerHTML = entries.length
    ? entries.map(([category, minutes]) => `<span><b>${displayFocusCategory(category)}</b>${minutes} ${t().focus.minuteUnit}</span>`).join("")
    : `<span>${t().focus.emptyCategory}</span>`;
}

function recentDays(count) {
  return Array.from({ length: count }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (count - 1 - index));
    return date.toISOString().slice(0, 10);
  });
}

function lastSevenDays() {
  return recentDays(7);
}

function getStatsDays() {
  if (selectedStatsRange !== "all") return recentDays(Number(selectedStatsRange) || 7);
  const dates = [
    ...state.morningEntries.map((item) => item.date),
    ...state.focusSessions.map((item) => item.date),
    ...(state.workGoals || []).flatMap((item) => [item.createdAt?.slice(0, 10), item.completedAt?.slice(0, 10)]),
  ].filter(Boolean).sort();
  if (!dates.length) return recentDays(7);
  const first = new Date(`${dates[0]}T00:00:00`);
  const today = new Date(`${todayKey()}T00:00:00`);
  const count = Math.max(1, Math.round((today - first) / 86400000) + 1);
  return recentDays(count);
}

function drawCharts() {
  const days = getStatsDays();
  const focusSessions = state.focusSessions.filter((item) => days.includes(item.date));
  drawLineChart($("#hungerChart"), days, days.map((day) => state.morningEntries.find((item) => item.date === day)?.hunger ?? null), 10);
  drawFocusBarChart($("#focusChart"), days, days.map((day) => focusSessions.filter((item) => item.date === day).reduce((sum, item) => sum + item.minutes, 0)));
  drawCategoryChart($("#categoryChart"), days);
  renderSkinTimeline(days);
  renderStatsSummaries(days, focusSessions);
  renderGoalStats(days);
  renderSeedStats(days, focusSessions);
}

function drawCategoryChart(canvas, days) {
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  ctx.clearRect(0, 0, width, height);
  const totals = state.focusSessions
    .filter((item) => days.includes(item.date))
    .reduce((acc, item) => {
      const category = item.category || "未分类";
      acc[category] = (acc[category] || 0) + item.minutes;
      return acc;
    }, {});
  const entries = Object.entries(totals).sort((a, b) => b[1] - a[1]).slice(0, 6);
  if (!entries.length) {
    drawCanvasEmpty(ctx, width, height, getLanguage() === "zh" ? "还没有分类专注记录" : "No categorized focus yet");
    return;
  }
  const max = Math.max(...entries.map(([, minutes]) => minutes), 1);
  const colors = ["#8994b3", "#91b6bd", "#b2a3bf", "#c6ad87", "#a6b5c3", "#c2a6aa"];
  ctx.font = "16px Noto Sans SC";
  entries.forEach(([category, minutes], index) => {
    const y = 30 + index * 38;
    const barWidth = Math.max(8, ((width - 235) * minutes) / max);
    ctx.fillStyle = "#315b3e";
    ctx.textAlign = "left";
    ctx.fillText(displayFocusCategory(category), 26, y + 16);
    ctx.fillStyle = colors[index % colors.length];
    roundRect(ctx, 126, y + 2, barWidth, 13, 7);
    ctx.fill();
    ctx.fillStyle = "rgba(98, 117, 106, 0.75)";
    ctx.textAlign = "right";
    ctx.fillText(`${minutes} ${t().focus.minuteUnit}`, width - 22, y + 16);
  });
}

function roundRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function drawLineChart(canvas, labels, values, maxValue) {
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = "rgba(73, 111, 82, 0.1)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 4; i += 1) {
    const y = 34 + i * 56;
    ctx.beginPath();
    ctx.moveTo(30, y);
    ctx.lineTo(width - 24, y);
    ctx.stroke();
  }

  const points = values.map((value, index) => {
    const x = 38 + index * ((width - 76) / Math.max(values.length - 1, 1));
    const normalized = value === null ? null : Math.min(value / maxValue, 1);
    const y = normalized === null ? null : height - 46 - normalized * (height - 82);
    return { x, y, value };
  });

  ctx.strokeStyle = "#7fabb8";
  ctx.lineWidth = 3;
  ctx.beginPath();
  let started = false;
  points.forEach((point) => {
    if (point.y === null) {
      started = false;
      return;
    }
    if (!started) {
      ctx.moveTo(point.x, point.y);
      started = true;
    }
    else ctx.lineTo(point.x, point.y);
  });
  ctx.stroke();

  points.forEach((point, index) => {
    ctx.fillStyle = point.y === null ? "#dce7e9" : "#8eb7c2";
    ctx.beginPath();
    ctx.arc(point.x, point.y ?? height - 46, values.length > 30 ? 2 : 5, 0, Math.PI * 2);
    ctx.fill();
    if (shouldDrawAxisLabel(index, labels.length)) {
      ctx.fillStyle = "rgba(98, 117, 106, 0.68)";
      ctx.font = "14px Segoe UI";
      ctx.textAlign = "center";
      ctx.fillText(formatChartDate(labels[index]), point.x, height - 13);
    }
  });
}

function drawFocusBarChart(canvas, labels, values) {
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  ctx.clearRect(0, 0, width, height);
  const max = Math.max(...values, 1);
  if (!values.some(Boolean)) {
    drawCanvasEmpty(ctx, width, height, getLanguage() === "zh" ? "还没有专注记录" : "No focus sessions yet");
    return;
  }
  const space = (width - 62) / Math.max(values.length, 1);
  const barWidth = Math.max(2, Math.min(24, space * 0.56));
  values.forEach((value, index) => {
    const x = 32 + index * space + (space - barWidth) / 2;
    const barHeight = Math.max(value ? 5 : 0, (value / max) * (height - 72));
    ctx.fillStyle = "rgba(145, 151, 187, 0.72)";
    roundRect(ctx, x, height - 42 - barHeight, barWidth, barHeight, Math.min(6, barWidth / 2));
    ctx.fill();
    if (shouldDrawAxisLabel(index, labels.length)) {
      ctx.fillStyle = "rgba(98, 117, 106, 0.68)";
      ctx.font = "14px Segoe UI";
      ctx.textAlign = "center";
      ctx.fillText(formatChartDate(labels[index]), x + barWidth / 2, height - 14);
    }
  });
}

function shouldDrawAxisLabel(index, count) {
  const step = count <= 7 ? 1 : count <= 30 ? 5 : Math.max(1, Math.ceil(count / 6));
  return index === 0 || index === count - 1 || index % step === 0;
}

function formatChartDate(dateText) {
  return dateText?.slice(5).replace("-", "/") || "";
}

function drawCanvasEmpty(ctx, width, height, message) {
  ctx.fillStyle = "rgba(98, 117, 106, 0.62)";
  ctx.font = "16px Noto Sans SC";
  ctx.textAlign = "center";
  ctx.fillText(message, width / 2, height / 2);
}

function renderSkinTimeline(days) {
  const target = $("#skinTimeline");
  const zh = getLanguage() === "zh";
  const records = state.morningEntries.filter((item) => days.includes(item.date) && item.skinState).slice(-7).reverse();
  if (!records.length) {
    target.innerHTML = `<div class="stats-empty">${zh ? "还没有皮肤状态记录" : "No skin records yet"}</div>`;
    return;
  }
  const colors = ["#8eb7c2", "#c8b28b", "#a8c0b6", "#c9a6aa", "#aaa1c2"];
  target.innerHTML = records.map((item, index) => `
    <div class="skin-timeline-row">
      <time>${escapeHtml(formatShortDate(item.date))}</time>
      <span class="skin-dot" style="--skin-color:${colors[index % colors.length]}"></span>
      <strong>${escapeHtml(item.skinState)}</strong>
    </div>
  `).join("");
}

function renderStatsSummaries(days, focusSessions) {
  const zh = getLanguage() === "zh";
  const morning = state.morningEntries.filter((item) => days.includes(item.date));
  const hungerValues = morning.map((item) => Number(item.hunger)).filter(Number.isFinite);
  const averageHunger = hungerValues.length ? (hungerValues.reduce((sum, value) => sum + value, 0) / hungerValues.length).toFixed(1) : "—";
  const skinRecords = morning.filter((item) => item.skinState).length;
  const focusMinutes = focusSessions.reduce((sum, item) => sum + Number(item.minutes || 0), 0);
  const seedSessions = focusSessions.filter((item) => item.habitSeed);
  $("#healthStatsSummary").innerHTML = summaryPills([
    [averageHunger, zh ? "平均饥饿值" : "Avg hunger"],
    [skinRecords, zh ? "皮肤记录" : "Skin records"],
  ]);
  $("#focusStatsSummary").innerHTML = summaryPills([
    [`${focusMinutes} ${t().focus.minuteUnit}`, zh ? "总专注" : "Total focus"],
    [focusSessions.length, zh ? "完成轮数" : "Sessions"],
  ]);
  $("#seedStatsSummary").innerHTML = summaryPills([
    [seedSessions.length, zh ? "照顾次数" : "Care sessions"],
    [`${seedSessions.reduce((sum, item) => sum + Number(item.minutes || 0), 0)} ${t().focus.minuteUnit}`, zh ? "投入时间" : "Time invested"],
  ]);
}

function summaryPills(items) {
  return items.map(([value, label]) => `<span><b>${escapeHtml(value)}</b>${escapeHtml(label)}</span>`).join("");
}

function renderGoalStats(days) {
  const zh = getLanguage() === "zh";
  const goals = state.workGoals || [];
  const today = new Date(`${todayKey()}T00:00:00`);
  const completedInRange = goals.filter((goal) => goal.status === "done" && days.includes(goal.completedAt?.slice(0, 10)));
  const openGoals = goals.filter((goal) => goal.status !== "done");
  const relevantGoals = selectedStatsRange === "all"
    ? goals
    : [...openGoals, ...completedInRange.filter((goal) => !openGoals.includes(goal))];
  const getDaysUntilDue = (goal) => Math.round((new Date(`${goal.deadline}T00:00:00`) - today) / 86400000);
  const overdue = openGoals.filter((goal) => goal.deadline && getDaysUntilDue(goal) < 0);
  const dueSoon = openGoals.filter((goal) => goal.deadline && getDaysUntilDue(goal) >= 0 && getDaysUntilDue(goal) <= 7);
  const inProgress = openGoals.filter((goal) => !overdue.includes(goal) && !dueSoon.includes(goal));
  const leadDays = completedInRange
    .filter((goal) => goal.deadline && goal.completedAt)
    .map((goal) => Math.round((new Date(`${goal.deadline}T00:00:00`) - new Date(goal.completedAt)) / 86400000));
  const averageLead = leadDays.length ? Math.round(leadDays.reduce((sum, value) => sum + value, 0) / leadDays.length) : null;

  $("#goalsStatsSummary").innerHTML = summaryPills([
    [openGoals.length, zh ? "进行中" : "Open"],
    [completedInRange.length, zh ? "已完成" : "Completed"],
    [dueSoon.length, zh ? "临近 Deadline" : "Due soon"],
    [averageLead === null ? "—" : `${Math.abs(averageLead)} ${zh ? "天" : "days"}`, averageLead === null
      ? (zh ? "提前完成" : "Finished early")
      : averageLead >= 0
        ? (zh ? "平均提前" : "Avg early")
        : (zh ? "平均延后" : "Avg late")],
  ]);

  const statuses = [
    { label: zh ? "已完成" : "Completed", count: completedInRange.length, color: "#9eb39f" },
    { label: zh ? "进行中" : "In progress", count: inProgress.length, color: "#94aabd" },
    { label: zh ? "临近 Deadline" : "Due soon", count: dueSoon.length, color: "#c7ad82" },
    { label: zh ? "已逾期" : "Overdue", count: overdue.length, color: "#c4a3a8" },
  ];
  const maxStatus = Math.max(...statuses.map((item) => item.count), 1);
  $("#goalStatusChart").innerHTML = statuses.some((item) => item.count)
    ? statuses.map((item) => `
      <div class="goal-status-row">
        <strong>${item.label}</strong>
        <div class="goal-status-track"><span style="--goal-width:${(item.count / maxStatus) * 100}%;--goal-color:${item.color}"></span></div>
        <small>${item.count}</small>
      </div>
    `).join("")
    : `<div class="stats-empty">${zh ? "还没有目标记录" : "No goals yet"}</div>`;

  const categoryTotals = relevantGoals.reduce((acc, goal) => {
    const category = goal.category?.trim() || (zh ? "未分类" : "Uncategorized");
    acc[category] = acc[category] || { total: 0, completed: 0 };
    acc[category].total += 1;
    if (goal.status === "done") acc[category].completed += 1;
    return acc;
  }, {});
  const categories = Object.entries(categoryTotals).sort((a, b) => b[1].total - a[1].total).slice(0, 6);
  const maxCategory = Math.max(...categories.map(([, value]) => value.total), 1);
  $("#goalCategoryChart").innerHTML = categories.length
    ? categories.map(([label, value]) => `
      <div class="goal-category-row">
        <strong>${escapeHtml(label)}</strong>
        <div class="goal-category-track">
          <span style="--goal-width:${(value.total / maxCategory) * 100}%;--goal-complete-width:${(value.completed / Math.max(value.total, 1)) * 100}%"></span>
        </div>
        <small>${value.total} ${zh ? "个" : "goals"} · ${value.completed} ${zh ? "完成" : "done"}</small>
      </div>
    `).join("")
    : `<div class="stats-empty">${zh ? "还没有目标类别记录" : "No goal categories yet"}</div>`;

  renderGoalDeadlineTimeline(openGoals, getDaysUntilDue);
}

function renderGoalDeadlineTimeline(openGoals, getDaysUntilDue) {
  const zh = getLanguage() === "zh";
  const futureGoals = openGoals
    .filter((goal) => goal.deadline && getDaysUntilDue(goal) >= 0)
    .sort((a, b) => String(a.deadline).localeCompare(String(b.deadline)));
  const rangeDays = selectedStatsRange === "all"
    ? Math.max(30, ...futureGoals.map((goal) => getDaysUntilDue(goal)))
    : Number(selectedStatsRange) || 7;
  const visibleGoals = futureGoals.filter((goal) => getDaysUntilDue(goal) <= rangeDays);
  if (!visibleGoals.length) {
    $("#goalDeadlineTimeline").innerHTML = `<div class="stats-empty">${zh ? "这个时间范围内没有临近的 Deadline" : "No upcoming deadlines in this range"}</div>`;
    return;
  }
  const points = visibleGoals.map((goal) => {
    const days = getDaysUntilDue(goal);
    const position = rangeDays ? (days / rangeDays) * 100 : 0;
    const color = days <= 3 ? "#c4a3a8" : days <= 7 ? "#c7ad82" : "#94aabd";
    return `<i class="goal-deadline-point" style="--goal-position:${position}%;--goal-color:${color}" title="${escapeHtml(goal.title)} · ${escapeHtml(formatShortDate(goal.deadline))}"></i>`;
  }).join("");
  const list = visibleGoals.slice(0, 6).map((goal) => {
    const days = getDaysUntilDue(goal);
    const dueText = days === 0 ? (zh ? "今天到期" : "Due today") : `${days} ${zh ? "天后" : "days left"}`;
    return `<div class="goal-deadline-item"><b>${escapeHtml(goal.title)}</b><span>${escapeHtml(dueText)} · ${escapeHtml(formatShortDate(goal.deadline))}</span></div>`;
  }).join("");
  $("#goalDeadlineTimeline").innerHTML = `
    <div class="goal-deadline-axis">${points}</div>
    <div class="goal-deadline-labels"><span>${zh ? "今天" : "Today"}</span><span>${rangeDays} ${zh ? "天" : "days"}</span></div>
    <div class="goal-deadline-list">${list}</div>
  `;
}

function renderSeedStats(days, focusSessions) {
  const zh = getLanguage() === "zh";
  const seeds = [
    { key: "health", label: "Health", color: "#9eb39f" },
    { key: "tech", label: "Tech", color: "#8faebe" },
    { key: "soft-skills", label: "Soft Skills", color: "#ad9fbe" },
  ];
  const totals = seeds.map((seed) => {
    const sessions = focusSessions.filter((item) => item.habitSeed === seed.key);
    return {
      ...seed,
      count: sessions.length,
      minutes: sessions.reduce((sum, item) => sum + Number(item.minutes || 0), 0),
      dates: sessions.map((item) => item.date),
    };
  });
  const maxMinutes = Math.max(...totals.map((item) => item.minutes), 1);
  $("#seedComparison").innerHTML = totals.map((item) => `
    <div class="seed-stat-row">
      <strong>${item.label}</strong>
      <div class="seed-stat-track"><span style="--seed-width:${(item.minutes / maxMinutes) * 100}%;--seed-color:${item.color}"></span></div>
      <small>${item.count} ${zh ? "次" : "sessions"} · ${item.minutes} ${t().focus.minuteUnit}</small>
    </div>
  `).join("");
  const dayIndex = new Map(days.map((day, index) => [day, index]));
  $("#seedTimeline").innerHTML = totals.map((item) => {
    const dots = [...new Set(item.dates)].map((date) => {
      const index = dayIndex.get(date) ?? 0;
      const position = days.length <= 1 ? 50 : (index / (days.length - 1)) * 100;
      return `<i class="seed-timeline-dot" style="--seed-position:${position}%;--seed-color:${item.color}" title="${escapeHtml(formatShortDate(date))}"></i>`;
    }).join("");
    return `<div class="seed-timeline-row"><strong>${item.label}</strong><div class="seed-timeline-track">${dots}</div></div>`;
  }).join("");
}

function exportData() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `my-care-${todayKey()}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

init();
