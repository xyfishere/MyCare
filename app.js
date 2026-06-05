const STORE_KEY = "myCareApp.v1";
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
    nightMode: "simple",
    nightMusicTheme: "classical",
    nightMusicPlaylists: defaultNightMusicPlaylists,
    personalBlockTheme: "iceland",
    personalBlockTab: "write",
    personalNoteFilter: "all",
    workGoalView: "list",
    language: "zh",
  },
  morningEntries: [],
  focusSessions: [],
  nightEntries: [],
  healthRecords: [],
  personalNotes: [],
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
let selectedFocusMinutes = 30;
let morningIndex = 0;
let nightIndex = 0;
let nightInterval = null;
let selectedNoteMood = "平静";
let selectedNoteDelay = { type: "days", days: 7 };
let selectedNoteRecipient = "self";
let currentBackgroundCredit = "";

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
      comingSoon: "Coming soon",
      prompt: "今天第一个 25 分钟做什么？",
      description: "这里会先放今日启动、低能量版本和 8 周路径。入口已经准备好，下一步就可以开始搭模块。",
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
      openSummary: "{open} open · {done} done",
      dueToday: "今天到期",
      overdue: "已逾期 {days} 天",
      daysLeft: "还剩 {days} 天",
      completed: "已完成",
      dueOn: "截止 {date}",
      noteLabel: "完成 note",
      notePlaceholder: "完成后写一句 note，例如：今天完成得比想象中顺。",
      complete: "完成并打卡",
      reopen: "重新打开",
      empty: "暂时没有目标。先加一个最急的小目标就好。",
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
        morning: ["晨间 selfcare", "短句、身体记录、冥想、Calendar"],
        focus: ["专注打卡", "心流专注与认真休息"],
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
      comingSoon: "Coming soon",
      prompt: "What is your first 25-minute block today?",
      description: "This space will hold today's starter, low-energy version, and the 8-week path. The entry is ready, and the module can grow from here.",
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
      openSummary: "{open} open · {done} done",
      dueToday: "Due today",
      overdue: "{days} days overdue",
      daysLeft: "{days} days left",
      completed: "Completed",
      dueOn: "Due {date}",
      noteLabel: "Completion note",
      notePlaceholder: "Add a note after finishing, e.g. this went better than expected.",
      complete: "Complete and check in",
      reopen: "Reopen",
      empty: "No goals yet. Add one small urgent goal first.",
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
        morning: ["Morning selfcare", "Quotes, body check-in, meditation, Calendar"],
        focus: ["Focus sprint", "Flow sessions with mindful breaks"],
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
    hint: "",
  },
  {
    label: "再读一句",
    prompt: "人不可以逃避苦难，亦不可以放弃希望。",
    hint: "",
  },
  {
    label: "启动提醒",
    prompt: "唯有“美”能让生命拥意义。",
    hint: "",
  },
  {
    label: "短句 4",
    prompt: "我们体内住着一个存在，他无所不知，他知道自己想要什么，它比我们更懂得如何生活得更好。",
    hint: "",
  },
  {
    label: "短句 5",
    prompt: "如果一个人一直足够鉴定，就能实现他的愿望。",
    hint: "",
  },
  {
    label: "短句 6",
    prompt: "我始终沉浸在自己之中，我的注意力永远朝向内心。",
    hint: "",
  },
  {
    label: "短句 7",
    prompt: "寻找自己，在自己内心扎根，试探着走出自己的道路，无论这条路将通向何方。",
    hint: "",
  },
  {
    label: "短句 8",
    prompt: "读书，痛苦，爱着从痛苦中滋生出来的那份喜悦，这是一个永无止境的过程。",
    hint: "",
  },
  {
    label: "短句 9",
    prompt: "我遇见的每一个人，街头的每一丝气味，都让我有了无限去爱的理由。",
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
    prompt: "冥想回来后，打开 Calendar。",
    hint: "把今天最重要的目标放进一个看得见的时间块里。",
    field: "calendar",
    action: "openCalendar",
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

function saveState() {
  localStorage.setItem(STORE_KEY, JSON.stringify(state));
  refreshDashboard();
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
  bindWorkGoals();
  bindStats();
  bindTimerAccuracy();
  renderLanguage();
  showView("home");
  refreshDashboard();
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
          hint: "",
        };
      }
      return {
        label: quote.label || `短句 ${index + 1}`,
        prompt: String(quote.prompt || "").trim(),
        hint: quote.hint || "",
      };
    })
    .filter((quote) => quote.prompt);
}

function resetMorningSteps() {
  morningSteps = [...pickMorningQuotes(), ...morningCheckInSteps];
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
  renderWorkLanguage();
  renderStatsLanguage();
  refreshDashboard();
}

function renderMorningLanguage() {
  const text = t().morning;
  $("#view-morning .immersive-home").textContent = t().common.home;
  $("#view-morning .immersive-home").setAttribute("aria-label", t().common.home);
  $("#view-morning .section-head .eyebrow").textContent = text.eyebrow;
  $("#morningTitle").textContent = text.title;
  $(".morning-subtitle").textContent = text.subtitle;
  $("#startMorning").textContent = morningIndex === 0 ? text.start : text.restart;
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
  const skinOptions = getLanguage() === "en"
    ? ["Stable", "Dry", "Redness", "Breakout", "Sensitive"]
    : ["稳定", "干燥", "泛红", "爆痘", "敏感"];
  $$("#skinState option").forEach((option, index) => {
    option.textContent = skinOptions[index] || option.textContent;
  });
  renderMorningPrompt();
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
  $$("#view-focus .panel > .focus-control-label").forEach((item) => {
    item.textContent = text.categoryLabel;
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
  $("#view-habits .habit-placeholder .eyebrow").textContent = text.comingSoon;
  $("#view-habits .habit-placeholder h3").textContent = text.prompt;
  $("#view-habits .habit-placeholder p:not(.eyebrow)").textContent = text.description;
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
  $("#view-work .work-list-panel .panel-title h3").textContent = text.currentTitle;
  renderWorkGoalView();
  renderWorkGoals();
}

function renderStatsLanguage() {
  const text = t().stats;
  $("#view-stats .section-head .eyebrow").textContent = text.eyebrow;
  $("#statsTitle").textContent = text.title;
  $("#exportData").setAttribute("aria-label", text.export);
  $("#exportData").setAttribute("title", text.export);
  const panels = $$("#view-stats .stats-grid .panel");
  const content = [
    [text.hungerTitle, text.hungerSub],
    [text.focusTitle, text.focusSub],
    [text.categoryTitle, text.categorySub],
    [text.summaryTitle, text.summaryRange],
  ];
  panels.forEach((panel, index) => {
    const title = panel.querySelector(".panel-title h3");
    const subtitle = panel.querySelector(".panel-title span");
    if (title) title.textContent = content[index]?.[0] || title.textContent;
    if (subtitle) subtitle.textContent = content[index]?.[1] || subtitle.textContent;
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
    resetMorningSteps();
    morningIndex = 0;
    $("#startMorning").textContent = t().morning.restart;
    $("#nextMorning").textContent = t().common.next;
    renderMorningPrompt();
  });

  $("#nextMorning").addEventListener("click", () => {
    const currentStep = morningSteps[morningIndex];
    if (currentStep?.action === "saveAndMeditate") {
      saveMorningEntry({ openMeditation: false, stayOnMeditation: true });
      return;
    }
    if (currentStep?.action === "openCalendar") {
      updateMorningLinks();
      saveState();
      openFlowLink(state.settings.calendarUrl);
      renderMorningComplete();
      $("#nextMorning").textContent = t().common.done;
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
    calendar: {
      label: "Today's goal",
      prompt: "After meditation, open Calendar.",
      hint: "Put the most important goal into a visible time block.",
    },
  };
  return { ...step, ...(translations[step.field] || {}) };
}

function getMorningButtonText(step) {
  if (step.action === "saveAndMeditate") return t().morning.chooseMeditation;
  if (step.action === "openCalendar") return t().morning.openCalendar;
  return t().common.next;
}

function renderMorningComplete() {
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
  renderFocusCategories();
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
    nightIndex = 0;
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
  $("#noteSearchDate").addEventListener("change", renderPersonalNotes);

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

function bindWorkGoals() {
  if (!$("#workGoalForm")) return;
  $$(".work-view-option").forEach((button) => {
    button.addEventListener("click", () => {
      state.settings.workGoalView = button.dataset.workView;
      saveState();
      renderWorkGoalView();
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
  const goals = [...state.workGoals].sort((a, b) => {
    if (a.status !== b.status) return a.status === "open" ? -1 : 1;
    return String(a.deadline || "").localeCompare(String(b.deadline || ""));
  });
  const open = goals.filter((goal) => goal.status !== "done").length;
  const done = goals.length - open;
  $("#workGoalSummary").textContent = interpolate(t().work.openSummary, { open, done });
  $("#workGoalList").innerHTML = goals.length
    ? goals.map(renderWorkGoalCard).join("")
    : `<div class="empty-note work-empty-state"><p>${t().work.empty}</p><button class="primary" data-work-action="showAdd" type="button">${t().work.emptyCta}</button></div>`;
}

function renderWorkGoalCard(goal) {
  const isDone = goal.status === "done";
  const deadline = getWorkDeadlineDetails(goal);
  return `
    <article class="work-goal-card ${isDone ? "done" : ""}" data-goal-id="${escapeHtml(goal.id)}">
      <div class="work-goal-main">
        <div>
          <p class="eyebrow">${escapeHtml(goal.category || t().work.currentTitle)}</p>
          <h3>${escapeHtml(goal.title)}</h3>
        </div>
        <span class="work-deadline ${deadline.className}">
          <b>${escapeHtml(deadline.status)}</b>
          <small>${escapeHtml(deadline.date)}</small>
        </span>
      </div>
      <label class="work-note-wrap">
        <span>${escapeHtml(t().work.noteLabel)}</span>
        <textarea class="work-goal-note" rows="3" placeholder="${escapeHtml(t().work.notePlaceholder)}">${escapeHtml(goal.note || "")}</textarea>
      </label>
      <div class="work-goal-actions">
        ${isDone
          ? `<span class="work-completed">${escapeHtml(t().work.completed)} · ${escapeHtml(formatShortDate(goal.completedAt?.slice(0, 10)))}</span><button class="secondary" data-work-action="reopen" type="button">${escapeHtml(t().work.reopen)}</button>`
          : `<button class="primary" data-work-action="complete" type="button">${escapeHtml(t().work.complete)}</button>`}
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

function lastSevenDays() {
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    return date.toISOString().slice(0, 10);
  });
}

function drawCharts() {
  const days = lastSevenDays();
  drawLineChart($("#hungerChart"), days, days.map((day) => state.morningEntries.find((item) => item.date === day)?.hunger ?? null), 10);
  drawLineChart($("#focusChart"), days, days.map((day) => state.focusSessions.filter((item) => item.date === day).reduce((sum, item) => sum + item.minutes, 0)), 120);
  drawCategoryChart($("#categoryChart"), days);
  renderSummary(days);
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
    ctx.fillStyle = "#62756a";
    ctx.font = "22px Noto Sans SC";
    ctx.textAlign = "center";
    ctx.fillText(t().stats.noCategory, width / 2, height / 2);
    return;
  }
  const max = Math.max(...entries.map(([, minutes]) => minutes), 1);
  const colors = ["#496f52", "#7fb38c", "#9fc8bd", "#d9c77a", "#b9dbc8", "#365f49"];
  ctx.font = "18px Noto Sans SC";
  entries.forEach(([category, minutes], index) => {
    const y = 34 + index * 36;
    const barWidth = Math.max(8, ((width - 190) * minutes) / max);
    ctx.fillStyle = "#183228";
    ctx.textAlign = "left";
    ctx.fillText(displayFocusCategory(category), 34, y + 18);
    ctx.fillStyle = colors[index % colors.length];
    roundRect(ctx, 118, y, barWidth, 18, 9);
    ctx.fill();
    ctx.fillStyle = "#62756a";
    ctx.textAlign = "right";
    ctx.fillText(`${minutes} ${t().focus.minuteUnit}`, width - 28, y + 18);
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
  ctx.strokeStyle = "rgba(73, 111, 82, 0.16)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 4; i += 1) {
    const y = 34 + i * 52;
    ctx.beginPath();
    ctx.moveTo(44, y);
    ctx.lineTo(width - 24, y);
    ctx.stroke();
  }

  const points = values.map((value, index) => {
    const x = 54 + index * ((width - 92) / 6);
    const normalized = value === null ? null : Math.min(value / maxValue, 1);
    const y = normalized === null ? null : height - 48 - normalized * (height - 84);
    return { x, y, value };
  });

  ctx.strokeStyle = "#496f52";
  ctx.lineWidth = 4;
  ctx.beginPath();
  let started = false;
  points.forEach((point) => {
    if (point.y === null) return;
    if (!started) {
      ctx.moveTo(point.x, point.y);
      started = true;
    }
    else ctx.lineTo(point.x, point.y);
  });
  ctx.stroke();

  points.forEach((point, index) => {
    ctx.fillStyle = point.y === null ? "#cfddd4" : "#7fb38c";
    ctx.beginPath();
    ctx.arc(point.x, point.y ?? height - 48, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#6b7280";
    ctx.font = "18px Segoe UI";
    ctx.textAlign = "center";
    ctx.fillText(labels[index].slice(5), point.x, height - 14);
  });
}

function renderSummary(days) {
  const morningCount = state.morningEntries.filter((item) => days.includes(item.date)).length;
  const focusMinutes = state.focusSessions.filter((item) => days.includes(item.date)).reduce((sum, item) => sum + item.minutes, 0);
  const nightCount = state.nightEntries.filter((item) => days.includes(item.date)).length;
  const healthCount = state.healthRecords.length;
  const text = t().stats;
  $("#summaryList").innerHTML = [
    [text.summary.morning, `${morningCount}/7`],
    [text.summary.focus, `${focusMinutes} ${t().focus.minuteUnit}`],
    [text.summary.night, `${nightCount}/7`],
    [text.summary.health, `${healthCount} ${text.records}`],
  ].map(([label, value]) => `<div><b>${value}</b><span>${label}</span></div>`).join("");
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
