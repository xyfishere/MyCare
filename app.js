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

const defaultFocusCategories = [
  { id: "learning", labelZh: "学习", labelEn: "Learning", color: "#91a9bd", active: true, builtIn: true },
  { id: "work", labelZh: "工作", labelEn: "Work", color: "#8eae98", active: true, builtIn: true },
  { id: "reading", labelZh: "阅读", labelEn: "Reading", color: "#b4a2bd", active: true, builtIn: true },
  { id: "creative", labelZh: "创作", labelEn: "Creative", color: "#c3aa86", active: true, builtIn: true },
  { id: "life", labelZh: "生活", labelEn: "Life", color: "#a7b8b0", active: true, builtIn: true },
];

const defaultHabitSeeds = [
  { id: "health", labelZh: "Health", labelEn: "Health", color: "#9eb39f", active: true, builtIn: true },
  { id: "tech", labelZh: "Tech", labelEn: "Tech", color: "#8faebe", active: true, builtIn: true },
  { id: "soft-skills", labelZh: "Soft Skills", labelEn: "Soft Skills", color: "#ad9fbe", active: true, builtIn: true },
];

const defaultSharedStatsTypes = ["skin", "sleep", "focus", "goals"];
const shareableStatsTypes = [...defaultSharedStatsTypes, "health"];
const shareableStatsRanges = ["day", "week", "month"];

const personalizationColorPalette = [
  "#9eb39f", "#7fa98d", "#b4c49b", "#8faebe",
  "#a8bec6", "#9ba7c2", "#ad9fbe", "#c0a8c0",
  "#c7aab2", "#d1b49a", "#c8bd8e", "#a8b7ad",
];
let activeColorPicker = null;

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
    goalScope: "personal",
    workGoalView: "list",
    workGoalFilter: "current",
    statsScope: "personal",
    language: "zh",
    focusCategories: defaultFocusCategories,
    habitSeedTypes: defaultHabitSeeds,
    sharedStatsTypes: [...defaultSharedStatsTypes],
    sharedStatsRange: "week",
    selfCareQuotes: [],
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
let familyState = {
  loading: false,
  families: [],
  activeFamilyId: "",
  members: [],
  invitations: [],
  receivedInvitations: [],
  categories: [],
  goals: [],
  sharedStats: [],
  secretNotes: [],
  message: "",
  error: "",
  goalMessage: "",
  secretNoteMessage: "",
  secretNoteError: "",
  categoryMessage: "",
  categoryError: "",
};
let sharedStatsMessage = "";
let familyGoalCategoryMode = "preset";
let selectedFamilySecretTheme = "sage";
const familySecretThemeOptions = [
  { id: "sage", zh: "\u68ee\u6797", en: "Sage", color: "#9caf9a" },
  { id: "ice", zh: "\u51b0\u84dd", en: "Ice", color: "#8fb2c5" },
  { id: "lavender", zh: "\u85b0\u8863\u8349", en: "Lavender", color: "#b6a5c8" },
  { id: "warm", zh: "\u6696\u5149", en: "Warm", color: "#d4b89a" },
];
let sharedStatsError = false;
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
let focusCategory = "learning";
let selectedFocusSeed = "none";
let selectedFocusMinutes = 30;
let selectedStatsRange = "7";
let morningIndex = 0;
let nightIndex = 0;
let nightInterval = null;
let wakeTimeDraft = "08:00";
let selectedNoteMood = "平静";
let selectedNoteDelay = { type: "days", days: 7 };
let selectedNoteRecipient = "self";
let noteCalendarMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
let workDeadlineMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
let familyDeadlineMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
let pendingDeleteGoalId = "";
let pendingFamilyDeleteGoalId = "";
let pendingFamilyRemoveMemberId = "";
let currentBackgroundCredit = "";
let selectedHabitStart = { task: "", category: "工作" };

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
      selfCare: "自我照顾",
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
      firstBlockCopy: "小小的开始会慢慢塑造稳定的改变，你可以的!",
      customPlaceholder: "这 25 分钟里，最重要的一件事是...",
      startFocus: "开始 25 分钟",
      lowEnergy: "低能量模式",
      keepSystem: "保留系统",
      lowEnergyCopy: "状态不好也没关系哦！深呼吸，放轻松！",
      seedsTitle: "Habit tree",
      seedsMeta: "你的习惯是种子。慢慢照顾它们。",
      cared: "已照顾",
      rest: "休眠",
    },
    work: {
      eyebrow: "Work Goals",
      title: "工作目标和期限",
      subtitle: "把现在最重要的事情放在这里，完成后打卡并留一句 note。",
      personalGoalLabel: "个人目标",
      familyGoalLabel: "家庭目标",
      listLabel: "清单",
      addNewLabel: "新增",
      formTitle: "新增目标",
      formMeta: "轻量记录",
      goalLabel: "目标",
      goalPlaceholder: "例如：完成 5 份精投申请",
      categoryLabel: "分类",
      categoryPlaceholder: "求职 / 技术 / 健康",
      deadlineLabel: "Deadline",
      chooseDeadline: "选择日期",
      calendarToday: "今天",
      calendarClear: "清除",
      previousMonth: "上个月",
      nextMonth: "下个月",
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
      resetHint: "准备好重新开始时，可以清空当前旅程。",
      resetEyebrow: "New journey",
      resetTitle: "你确定要开始新的 journey 吗？",
      resetCopy: "这意味着你所有的 task 即将被清空。",
      resetCancel: "取消",
      resetConfirm: "确认清空",
      delete: "删除 goal",
      deleteEyebrow: "Remove goal",
      deleteTitle: "确定要删除这个 goal 吗？",
      deleteCopy: "删除后，这个 goal 和它的 note 将无法恢复。",
      deleteCancel: "取消",
      deleteConfirm: "删除 goal",
      familyEyebrow: "Family Room",
      familyTitle: "家庭共享",
      familyCopy: "为共享目标准备一个安静的家庭空间。个人记录仍然默认私密。",
      familySignedOut: "登录后可以创建或加入家庭。",
      familyNoFamily: "\u8fd8\u6ca1\u6709\u5bb6\u5ead\u7a7a\u95f4\u3002\u53ef\u4ee5\u5148\u521b\u5efa\u4e00\u4e2a\uff0c\u6216\u63a5\u53d7\u4f60\u6536\u5230\u7684\u5bb6\u5ead\u9080\u8bf7\u3002",
      familyLoading: "正在读取家庭空间...",
      familyReady: "家庭空间已准备好。",
      familyError: "家庭空间暂时无法加载。",
      familyRefresh: "刷新",
      familyNameLabel: "家庭名称",
      familyNamePlaceholder: "例如：小白猫的家",
      familyCreate: "创建家庭",
      familyReceivedLabel: "\u6536\u5230\u7684\u9080\u8bf7",
      familyReceivedCopy: "\u5982\u679c\u6709\u4eba\u7528\u4f60\u7684\u90ae\u7bb1\u9080\u8bf7\u4f60\uff0c\u4f1a\u663e\u793a\u5728\u8fd9\u91cc\u3002",
      familyReceivedEmpty: "\u6682\u65f6\u6ca1\u6709\u5f85\u63a5\u53d7\u7684\u9080\u8bf7\u3002",
      familyReceivedFrom: "\u9080\u8bf7\u4f60\u52a0\u5165 {family}",
      familyReceivedFallback: "\u5bb6\u5ead\u7a7a\u95f4",
      familyReceivedAccept: "\u63a5\u53d7",
      familyReceivedAccepted: "\u5df2\u63a5\u53d7\u9080\u8bf7\u3002",
      familyCurrent: "当前家庭",
      familyMembers: "{count} 位成员",
      familyLeave: "离开",
      familyInviteLabel: "通过邮箱邀请",
      familyInvitePlaceholder: "family@example.com",
      familyInvite: "创建邀请",
      familyInviteCreated: "\u9080\u8bf7\u5df2\u521b\u5efa\u3002\u5bf9\u65b9\u767b\u5f55\u540e\u4f1a\u5728 app \u91cc\u770b\u5230\u8fd9\u4e2a\u9080\u8bf7\u3002",
      familyInviteEmpty: "还没有待处理邀请。",
      familyInvitePending: "\u7b49\u5f85\u5bf9\u65b9\u63a5\u53d7",
      familyOwner: "Owner",
      familyMember: "Member",
      familyGoalsEyebrow: "Shared Goals",
      familyGoalsTitle: "家庭目标",
      familyGoalSummary: "{open} open · {done} completed",
      familyGoalTitleLabel: "目标",
      familyGoalTitlePlaceholder: "例如：一起散步 20 分钟",
      familyGoalCategoryLabel: "家庭分类",
      familyGoalCategoryPlaceholder: "家务 / 健康 / 一起完成",
      familyGoalUrgencyLabel: "紧急程度",
      familyGoalDeadlineLabel: "\u622a\u6b62\u65e5\u671f",
      familyGoalAdd: "添加家庭目标",
      familyGoalEmpty: "还没有家庭目标。先添加一个轻量共享目标就好。",
      familyGoalAdded: "家庭目标已添加。",
      familyGoalCompleted: "家庭目标已完成。",
      familyGoalDeleted: "家庭目标已删除。",
      familyGoalDeleteConfirm: "再点一次确认删除",
      familyMemberRemoved: "家庭成员已移除。",
      familyRemoveMember: "移除",
      familyRemoveMemberConfirm: "确认移除",
      familyCompletionNote: "完成 note",
      familyCompletionPlaceholder: "可以简单写一句完成情况。",
      familySecretEyebrow: "\u79d8\u5bc6\u7eb8\u6761",
      familySecretTitle: "\u5bb6\u5ead\u79d8\u5bc6\u7eb8\u6761",
      familySecretCopy: "\u7ed9\u5bb6\u5ead\u7a7a\u95f4\u7559\u4e00\u53e5\u8bdd\u3002\u9875\u9762\u4e0a\u4e0d\u4f1a\u663e\u793a\u662f\u8c01\u5199\u7684\u3002",
      familySecretInputLabel: "\u5c0f\u7eb8\u6761",
      familySecretPlaceholder: "\u5199\u4e00\u53e5\u8f7b\u8f7b\u7684\u8bdd...",
      familySecretAdd: "\u533f\u540d\u7559\u4e0b",
      familySecretEmpty: "\u8fd8\u6ca1\u6709\u79d8\u5bc6\u7eb8\u6761\u3002\u53ef\u4ee5\u5148\u7559\u4e00\u53e5\u5f88\u5c0f\u7684\u5173\u5fc3\u3002",
      familySecretAdded: "\u79d8\u5bc6\u7eb8\u6761\u5df2\u7559\u4e0b\u3002",
      familySecretDeleted: "\u8fd9\u5f20\u7eb8\u6761\u5df2\u6536\u8d77\u3002",
      familySecretAnonymous: "\u533f\u540d\u5bb6\u5ead\u6210\u5458",
      familySecretSchemaMissing: "\u8fd8\u6ca1\u6709\u521b\u5efa family_secret_notes \u8868\u3002\u8bf7\u5148\u5728 Supabase SQL Editor \u8fd0\u884c supabase/create-family-secret-notes.sql\u3002",
      familyUrgency: {
        low: "低",
        normal: "普通",
        high: "紧急",
      },
    },
    personalization: {
      title: "个性化设置",
      copy: "让分类更贴近你的生活，同时保持页面轻盈。",
      focusTab: "专注分类",
      seedTab: "习惯种子",
      quotesTab: "自我照顾语录",
      calendarTab: "日历",
      custom: "＋ 自定义",
      customizeQuotes: "＋ 自定义语录",
      customizeCalendar: "自定义日历",
      add: "添加",
      addQuote: "添加语录",
      focusPlaceholder: "新的分类",
      seedPlaceholder: "新的 Habit Seed",
      quoteLabel: "语录",
      quotePlaceholder: "写一句想在晨间读到的话",
      active: "启用",
      note: "停用后不会出现在选择器中，过去的数据仍会保留。",
      quoteNote: "每天会从启用的语录中随机选择两句。至少保留两句启用。",
      calendarEyebrow: "你的个人日历",
      calendarTitle: "选择晨间流程接下来打开的页面",
      calendarCopy: "填写你平时安排一天所使用的页面，例如 Google Calendar、Notion Calendar 或其他日历服务。",
      calendarLabel: "日历页面链接",
      calendarPlaceholder: "https://calendar.google.com/...",
      calendarNote: "修改会自动保存。晨间流程结束时会打开这个页面。",
      settings: "个性化设置",
      none: "不关联",
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
      eyebrow: "选择你的空间",
      title: "现在想要做些什么呢？",
      subtitle: "不要着急，一步一步来。",
      cards: {
        work: ["工作目标", "清单、期限和完成记录"],
        focus: ["专注打卡", "心流专注与认真休息"],
        selfCare: ["Self-care", "选择晨间开启新一天，或在睡前温柔收尾。"],
        stats: ["统计板块", "查看记录、趋势和专注分类"],
      },
      selfCareActions: {
        morning: "晨间",
        night: "睡前",
      },
      whatsNew: {
        link: "see what's new",
        eyebrow: "本周更新",
        title: "what's new this week",
        intro: "这次更新让家庭共享、自定义和统计都更完整，但仍然保持轻量。",
        items: [
          ["家庭目标更清楚了", "可以创建共享目标，选择家庭分类和紧急程度，也能看到已完成目标。"],
          ["自定义入口更集中", "专注分类、Habit Seed、自我照顾语录、日历和家庭分类都可以在设置里调整。"],
          ["统计页面更有用", "健康、专注、目标、Habit Seed 和家庭目标数据现在可以一起看趋势。"],
        ],
        action: "轻轻试试看",
      },
    },
    morning: {
      eyebrow: "Morning selfcare",
      title: "恭喜你开启了新的一天！",
      subtitle: "我的灵魂再次呼吸，我的双眼再次看见。",
      start: "开始晨间流程",
      restart: "从头开始",
      chooseMeditation: "选择冥想",
      openCalendar: "打开你的个人日历",
      openGoals: "打开目标",
      goalsOption: "目标",
      calendarOption: "你的个人日历",
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
      timePicker: {
        eyebrow: "晨间记录",
        title: "起床时间",
        hour: "时",
        minute: "分",
        now: "现在",
        confirm: "确认",
        close: "关闭时间选择",
      },
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
      personalStatsLabel: "个人统计",
      familyStatsLabel: "家庭统计",
      familyStatsEyebrow: "Family Stats",
      familyStatsTitle: "家庭统计",
      familyStatsSubtitle: "家庭目标、共享习惯和授权后的健康数据会放在这里。",
      familyStatsEmpty: "家庭统计会在家庭目标稳定后接入。",
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
      selfCare: "Self-care",
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
      personalGoalLabel: "Personal Goal",
      familyGoalLabel: "Family Goal",
      listLabel: "List",
      addNewLabel: "Add New",
      formTitle: "New goal",
      formMeta: "Lightweight",
      goalLabel: "Goal",
      goalPlaceholder: "For example: send 5 tailored applications",
      categoryLabel: "Category",
      categoryPlaceholder: "Job search / Tech / Health",
      deadlineLabel: "Deadline",
      chooseDeadline: "Choose a date",
      calendarToday: "Today",
      calendarClear: "Clear",
      previousMonth: "Previous month",
      nextMonth: "Next month",
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
      resetHint: "When you are ready to begin again, you can clear this journey.",
      resetEyebrow: "New journey",
      resetTitle: "Are you sure you want to begin a new journey?",
      resetCopy: "This will clear all of your tasks.",
      resetCancel: "Cancel",
      resetConfirm: "Clear all tasks",
      delete: "Delete goal",
      deleteEyebrow: "Remove goal",
      deleteTitle: "Delete this goal?",
      deleteCopy: "This goal and its note cannot be restored after deletion.",
      deleteCancel: "Cancel",
      deleteConfirm: "Delete goal",
      familyEyebrow: "Family Room",
      familyTitle: "Family sharing",
      familyCopy: "Prepare a calm shared space for family goals. Personal records stay private by default.",
      familySignedOut: "Sign in to create or join a family.",
      familyNoFamily: "No family space yet. Create one, or accept a family invitation sent to your email.",
      familyLoading: "Loading family space...",
      familyReady: "Family space is ready.",
      familyError: "Family space could not load.",
      familyRefresh: "Refresh",
      familyNameLabel: "Family name",
      familyNamePlaceholder: "For example: Little White Cat Home",
      familyCreate: "Create family",
      familyReceivedLabel: "Received invitations",
      familyReceivedCopy: "If someone invites your email, the invitation will appear here.",
      familyReceivedEmpty: "No invitations waiting right now.",
      familyReceivedFrom: "Invitation to join {family}",
      familyReceivedFallback: "Family room",
      familyReceivedAccept: "Accept",
      familyReceivedAccepted: "Invitation accepted.",
      familyCurrent: "Current family",
      familyMembers: "{count} members",
      familyLeave: "Leave",
      familyInviteLabel: "Invite by email",
      familyInvitePlaceholder: "family@example.com",
      familyInvite: "Create invitation",
      familyInviteCreated: "Invitation created. They will see it in the app after signing in.",
      familyInviteEmpty: "No pending invitations yet.",
      familyInvitePending: "Waiting for them to accept",
      familyOwner: "Owner",
      familyMember: "Member",
      familyGoalsEyebrow: "Shared Goals",
      familyGoalsTitle: "Family goals",
      familyGoalSummary: "{open} open · {done} completed",
      familyGoalTitleLabel: "Goal",
      familyGoalTitlePlaceholder: "For example: take a 20-minute walk together",
      familyGoalCategoryLabel: "Family category",
      familyGoalCategoryPlaceholder: "Home / Health / Together",
      familyGoalUrgencyLabel: "Urgency",
      familyGoalDeadlineLabel: "Deadline",
      familyGoalAdd: "Add family goal",
      familyGoalEmpty: "No family goals yet. Add one light shared goal first.",
      familyGoalAdded: "Family goal added.",
      familyGoalCompleted: "Family goal completed.",
      familyGoalDeleted: "Family goal deleted.",
      familyGoalDeleteConfirm: "Confirm delete",
      familyMemberRemoved: "Family member removed.",
      familyRemoveMember: "Remove",
      familyRemoveMemberConfirm: "Confirm remove",
      familyCompletionNote: "Completion note",
      familyCompletionPlaceholder: "Add a short note about how it went.",
      familySecretEyebrow: "Secret Notes",
      familySecretTitle: "Anonymous little notes",
      familySecretCopy: "Leave a small note for the family room. Names stay hidden on the page.",
      familySecretInputLabel: "Secret note",
      familySecretPlaceholder: "Write one soft sentence...",
      familySecretAdd: "Post anonymously",
      familySecretEmpty: "No secret notes yet. Leave one small kind note first.",
      familySecretAdded: "Secret note posted.",
      familySecretDeleted: "This note was tucked away.",
      familySecretAnonymous: "Anonymous family member",
      familySecretSchemaMissing: "The family_secret_notes table is missing. Run supabase/create-family-secret-notes.sql in Supabase SQL Editor first.",
      familyUrgency: {
        low: "Low",
        normal: "Normal",
        high: "High",
      },
    },
    personalization: {
      title: "Personalization",
      copy: "Shape the categories around your life while keeping the interface light.",
      focusTab: "Focus Categories",
      seedTab: "Habit Seeds",
      quotesTab: "Self-care Quotes",
      calendarTab: "Calendar",
      familyCategoryTab: "Family Categories",
      custom: "+ Customize",
      familySettings: "Family category settings",
      customizeQuotes: "+ Customize quotes",
      customizeCalendar: "Customize calendar",
      add: "Add",
      addFamilyCategory: "Add family category",
      addQuote: "Add quote",
      focusPlaceholder: "New category",
      seedPlaceholder: "New Habit Seed",
      familyCategoryPlaceholder: "New family category",
      familyCategorySignedOut: "Sign in first, then you can customize family goal categories.",
      familyCategoryNoFamily: "Join or create a family before customizing family categories.",
      familyCategoryReady: "These categories only apply to the current family room.",
      familyCategoryAdded: "Family category added.",
      familyCategorySaved: "Family category saved.",
      quoteLabel: "Quote",
      quotePlaceholder: "Write something you would like to read in the morning",
      active: "Active",
      note: "Inactive items disappear from selectors, while past records stay intact.",
      quoteNote: "Two active quotes are selected at random each morning. Keep at least two active.",
      calendarEyebrow: "Your personal calendar",
      calendarTitle: "Choose where your morning flow continues",
      calendarCopy: "Add the page you use to plan your day, such as Google Calendar, Notion Calendar, or another calendar service.",
      calendarLabel: "Calendar page URL",
      calendarPlaceholder: "https://calendar.google.com/...",
      calendarNote: "Changes save automatically. This page opens when your morning flow is complete.",
      settings: "Personalization settings",
      none: "None",
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
        selfCare: ["Self-care", "Start gently in the morning or wind down softly at night."],
        stats: ["Stats", "Review records, trends, and focus categories"],
      },
      selfCareActions: {
        morning: "Morning",
        night: "Night",
      },
      whatsNew: {
        link: "see what's new",
        eyebrow: "This week",
        title: "what's new this week",
        intro: "A lighter update for shared goals, personalization, and clearer progress.",
        items: [
          ["Family goals feel more complete", "Create shared goals, choose family categories, set urgency, and see completed items."],
          ["Personalization is easier to find", "Adjust focus categories, habit seeds, self-care quotes, calendars, and family categories in one calm place."],
          ["Stats are more useful now", "Review health, focus, goals, habit seeds, and family goal patterns with cleaner charts."],
        ],
        action: "Try it gently",
      },
    },
    morning: {
      eyebrow: "Morning selfcare",
      title: "Congratulations on starting your new day!",
      subtitle: "My soul breathes again, my eyes see again.",
      start: "Start morning flow",
      restart: "Start over",
      chooseMeditation: "Choose meditation",
      openCalendar: "Open your personal calendar",
      openGoals: "Open Goals",
      goalsOption: "Goals",
      calendarOption: "Your personal calendar",
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
      timePicker: {
        eyebrow: "Morning check-in",
        title: "Wake-up time",
        hour: "Hour",
        minute: "Minute",
        now: "Now",
        confirm: "Confirm",
        close: "Close time picker",
      },
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
      personalStatsLabel: "Personal Stats",
      familyStatsLabel: "Family Stats",
      familyStatsEyebrow: "Family Stats",
      familyStatsTitle: "Family Stats",
      familyStatsSubtitle: "Family goals, shared habits, and approved health data will live here.",
      familyStatsEmpty: "Family stats will connect after family goals are stable.",
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
    promptEn: "To love oneself is the beginning of a lifelong romance.",
    hint: "",
  },
  {
    label: "再读一句",
    prompt: "如果一个人一直足够坚定，就能实现他的愿望。",
    promptEn: "If a person remains steadfast enough, they can make their dreams come true.",
    hint: "",
  },
  {
    label: "启动提醒",
    prompt: "我始终沉浸在自己之中，我的注意力永远朝向内心。",
    promptEn: "My attention has always been drawn inward, where I continue to discover myself.",
    hint: "",
  },
  {
    label: "短句 4",
    prompt: "读书，痛苦，爱着从痛苦中滋生出来的那份喜悦，这是一个永无止境的过程。",
    promptEn: "Reading, suffering, and loving the joy that grows from suffering—this is a journey without end.",
    hint: "",
  },
  {
    label: "短句 5",
    prompt: "我遇见的每一个人，街头的每一丝气味，都让我有了无限去爱的理由。",
    promptEn: "Every person I meet and every scent that drifts through the streets gives me another reason to love this world.",
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

let canonicalMorningQuotes = [...defaultMorningQuotes];
let morningQuotePool = [...defaultMorningQuotes];
let morningSteps = [...pickMorningQuotes(), ...morningCheckInSteps];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function loadState() {
  const parsed = window.MyCare.storage.readJson(STORE_KEY);
  if (!parsed) return cloneDefaults();
  try {
    const loaded = window.MyCare.storage.mergeState(defaults, parsed);
    loaded.settings.nightMusicPlaylists = migrateNightMusicPlaylists(parsed.settings?.nightMusicPlaylists);
    normalizePersonalizationSettings(loaded.settings);
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
      persistState(loaded);
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

function normalizePersonalizationSettings(settings) {
  settings.focusCategories = normalizeDefinitionList(settings.focusCategories, defaultFocusCategories);
  settings.habitSeedTypes = normalizeDefinitionList(settings.habitSeedTypes, defaultHabitSeeds);
  settings.sharedStatsTypes = normalizeSharedStatsTypes(settings.sharedStatsTypes);
  settings.sharedStatsRange = normalizeSharedStatsRange(settings.sharedStatsRange);
  settings.selfCareQuotes = normalizeQuoteDefinitions(settings.selfCareQuotes);
}

function normalizeSharedStatsTypes(saved) {
  if (!Array.isArray(saved)) return [...defaultSharedStatsTypes];
  const selected = saved.filter((type) => shareableStatsTypes.includes(type));
  return [...new Set(selected)];
}

function normalizeSharedStatsRange(saved) {
  return shareableStatsRanges.includes(saved) ? saved : "week";
}

function normalizeDefinitionList(saved, fallback) {
  const source = Array.isArray(saved) && saved.length ? saved : fallback;
  const seen = new Set();
  return source.map((item, index) => {
    const fallbackItem = fallback.find((entry) => entry.id === item?.id) || fallback[index];
    const rawId = String(item?.id || fallbackItem?.id || `custom-${Date.now()}-${index}`);
    const id = seen.has(rawId) ? `${rawId}-${index}` : rawId;
    seen.add(id);
    return {
      id,
      labelZh: String(item?.labelZh || item?.label || fallbackItem?.labelZh || "自定义").trim(),
      labelEn: String(item?.labelEn || item?.label || fallbackItem?.labelEn || "Custom").trim(),
      color: /^#[0-9a-f]{6}$/i.test(item?.color || "") ? item.color : (fallbackItem?.color || "#9eb39f"),
      active: item?.active !== false,
      builtIn: Boolean(item?.builtIn ?? fallbackItem?.builtIn),
    };
  });
}

function normalizeQuoteDefinitions(saved) {
  if (!Array.isArray(saved)) return [];
  return saved.map((item, index) => {
    const text = String(item?.text || item?.zh || item?.prompt || item?.en || item?.promptEn || "").trim();
    return {
      id: String(item?.id || `quote-${index + 1}`),
      text,
      zh: String(item?.zh || "").trim(),
      en: String(item?.en || "").trim(),
      active: item?.active !== false,
      builtIn: item?.builtIn !== false,
    };
  }).filter((item) => item.text);
}

function cloneDefaults() {
  return window.MyCare.storage.clone(defaults);
}

function persistState(payload = state) {
  window.MyCare.storage.writeJson(STORE_KEY, payload);
}

function saveState({ skipCloud = false, preserveTimestamp = false } = {}) {
  if (!preserveTimestamp) {
    state.settings.lastLocalChangeAt = new Date().toISOString();
  }
  persistState();
  refreshDashboard();
  if (!skipCloud && !applyingCloudState) queueCloudSync();
}

function disableSavedInputHistory(root = document) {
  root.querySelectorAll("form, input, textarea, select").forEach((field) => {
    field.setAttribute("autocomplete", "off");
  });
}

function bindInputHistoryProtection() {
  disableSavedInputHistory();
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (!(node instanceof Element)) return;
        if (node.matches("form, input, textarea, select")) {
          node.setAttribute("autocomplete", "off");
        }
        disableSavedInputHistory(node);
      });
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

function init() {
  setRandomBackground();
  loadMorningQuotes();

  $("#calendarUrl").value = state.settings.calendarUrl;
  $("#nightMusicUrl").value = getNightMusicUrl();
  $("#wakeTime").value = new Date().toTimeString().slice(0, 5);

  bindInputHistoryProtection();
  bindLanguageToggle();
  bindNavigation();
  bindMorning();
  bindFocus();
  bindNight();
  bindPersonalBlock();
  bindHabitGarden();
  bindLowEnergyMode();
  bindWorkGoals();
  bindFamilyRoom();
  bindStats();
  bindTimerAccuracy();
  bindAccount();
  bindPersonalization();
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

function bindPersonalization() {
  $("#globalSettingsToggle")?.addEventListener("click", () => openPersonalization("focus"));
  $("#familySettingsToggle")?.addEventListener("click", () => openPersonalization("family-category"));
  $("#morningQuoteCustomize")?.addEventListener("click", () => openPersonalization("quotes"));
  $("#personalizationLanguageToggle")?.addEventListener("click", toggleLanguage);
  $$("[data-settings-section]").forEach((button) => {
    button.addEventListener("click", () => openPersonalization(button.dataset.settingsSection));
  });
  $$(".personalization-tab").forEach((button) => {
    button.addEventListener("click", () => selectPersonalizationTab(button.dataset.personalizationTab));
  });
  $("#addFocusCategory")?.addEventListener("click", () => addPersonalizationItem("focus"));
  $("#addHabitSeed")?.addEventListener("click", () => addPersonalizationItem("seed"));
  $("#addFamilyCategory")?.addEventListener("click", addFamilyCategory);
  $("#addSelfCareQuote")?.addEventListener("click", addSelfCareQuote);
  $("#personalizationDialog")?.addEventListener("input", handlePersonalizationEdit);
  $("#personalizationDialog")?.addEventListener("change", handlePersonalizationEdit);
  $("#personalizationDialog")?.addEventListener("click", handleColorPicker);
  $("#familyCategorySettingsState")?.addEventListener("click", (event) => {
    if (!event.target.closest("#familyCategorySignIn")) return;
    $("#personalizationDialog")?.close();
    $("#accountDialog")?.showModal();
  });
  $("#personalizationDialog")?.addEventListener("close", closeColorPalettes);
  $(".personalization-card")?.addEventListener("scroll", closeColorPalettes, { passive: true });
  window.addEventListener("resize", closeColorPalettes);
}

function openPersonalization(section = "focus") {
  selectPersonalizationTab(section);
  renderPersonalizationSettings();
  $("#personalizationDialog")?.showModal();
  if (section === "family-category") refreshFamilyCategorySettings();
}

function selectPersonalizationTab(section) {
  closeColorPalettes();
  const selected = ["focus", "seed", "quotes", "calendar", "family-category"].includes(section) ? section : "focus";
  $$(".personalization-tab").forEach((button) => {
    const active = button.dataset.personalizationTab === selected;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
  $$(".personalization-section").forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.personalizationSection === selected);
  });
  updatePersonalizationNote(selected);
}

function renderPersonalizationLanguage() {
  const text = t().personalization;
  $("#globalSettingsToggle")?.setAttribute("aria-label", text.settings);
  $("#globalSettingsToggle")?.setAttribute("title", text.settings);
  $("#familySettingsToggle")?.setAttribute("aria-label", personalizationText("familySettings", "家庭分类设置", "Family category settings"));
  $("#familySettingsToggle")?.setAttribute("title", personalizationText("familySettings", "家庭分类设置", "Family category settings"));
  $(".personalization-close")?.setAttribute("aria-label", getLanguage() === "zh" ? "关闭" : "Close");
  $(".personalization-tabs")?.setAttribute("aria-label", text.settings);
  $("#personalizationTitle").textContent = text.title;
  $("#personalizationCopy").textContent = text.copy;
  $(".personalization-tab[data-personalization-tab='focus']").textContent = text.focusTab;
  $(".personalization-tab[data-personalization-tab='seed']").textContent = text.seedTab;
  $(".personalization-tab[data-personalization-tab='quotes']").textContent = text.quotesTab;
  $(".personalization-tab[data-personalization-tab='calendar']").textContent = text.calendarTab;
  $(".personalization-tab[data-personalization-tab='family-category']").textContent = personalizationText("familyCategoryTab", "家庭分类", "Family Categories");
  $("#morningQuoteCustomize").textContent = text.customizeQuotes;
  $("#morningCalendarCustomize b").textContent = text.customizeCalendar;
  $("#newFocusCategoryName").placeholder = text.focusPlaceholder;
  $("#newHabitSeedName").placeholder = text.seedPlaceholder;
  $("#newFamilyCategoryName").placeholder = personalizationText("familyCategoryPlaceholder", "新的家庭分类", "New family category");
  $("#newQuoteLabel").textContent = text.quoteLabel;
  $("#newSelfCareQuote").placeholder = text.quotePlaceholder;
  $("#addFocusCategory").textContent = text.add;
  $("#addHabitSeed").textContent = text.add;
  $("#addFamilyCategory").textContent = personalizationText("addFamilyCategory", "添加家庭分类", "Add family category");
  $("#addSelfCareQuote").textContent = text.addQuote;
  $("#calendarSettingsEyebrow").textContent = text.calendarEyebrow;
  $("#calendarSettingsTitle").textContent = text.calendarTitle;
  $("#calendarSettingsCopy").textContent = text.calendarCopy;
  $("#morningCalendarLabel").textContent = text.calendarLabel;
  $("#calendarUrl").placeholder = text.calendarPlaceholder;
  $$("[data-settings-section]").forEach((button) => {
    if (button.id !== "morningCalendarCustomize") button.textContent = text.custom;
  });
  renderPersonalizationSettings();
  renderGoalCategorySuggestions();
}

function renderPersonalizationSettings() {
  renderDefinitionSettings($("#focusCategorySettingsList"), getFocusCategories(), "focus");
  renderDefinitionSettings($("#habitSeedSettingsList"), getHabitSeedTypes(), "seed");
  renderFamilyCategorySettings();
  renderColorPalettes();
  renderSelfCareQuoteSettings();
  const selectedSection = $(".personalization-section.active")?.dataset.personalizationSection;
  updatePersonalizationNote(selectedSection);
}

function updatePersonalizationNote(section) {
  const target = $("#personalizationNote");
  if (!target) return;
  if (section === "quotes") {
    target.textContent = t().personalization.quoteNote;
    return;
  }
  if (section === "calendar") {
    target.textContent = t().personalization.calendarNote;
    return;
  }
  if (section === "family-category") {
    target.textContent = personalizationText(
      "familyCategoryReady",
      "这些分类只会用于当前家庭的共享目标。",
      "These categories only apply to the current family room.",
    );
    return;
  }
  target.textContent = t().personalization.note;
}

function renderDefinitionSettings(container, items, type) {
  if (!container) return;
  container.innerHTML = items.map((item) => `
    <div class="personalization-item" data-definition-type="${type}" data-definition-id="${escapeHtml(item.id)}">
      <div class="definition-color-picker" data-color-picker>
        <input class="personalization-color" type="hidden" value="${escapeHtml(item.color)}" />
        <button class="definition-color-trigger" type="button" aria-label="选择颜色" aria-expanded="false" style="--selected-color:${escapeHtml(item.color)}"></button>
      </div>
      <input class="personalization-name" type="text" maxlength="24" value="${escapeHtml(getDefinitionLabel(item))}" aria-label="Name" />
      <label class="personalization-switch">
        <input class="personalization-active" type="checkbox" ${item.active ? "checked" : ""} />
        <span aria-hidden="true"></span>
        <small>${escapeHtml(t().personalization.active)}</small>
      </label>
    </div>
  `).join("");
}

function renderColorPalettes() {
  $$("[data-color-picker]").forEach((picker) => {
    const input = picker.querySelector("input");
    const trigger = picker.querySelector(".definition-color-trigger");
    if (!input || !trigger) return;
    trigger.style.setProperty("--selected-color", input.value);
  });
}

function closeColorPalettes() {
  const palette = $("#definitionColorPalette");
  if (palette) palette.hidden = true;
  activeColorPicker?.querySelector(".definition-color-trigger")?.setAttribute("aria-expanded", "false");
  activeColorPicker = null;
}

function positionColorPalette(trigger, palette) {
  const rect = trigger.getBoundingClientRect();
  const width = 190;
  const height = 150;
  const gap = 10;
  const viewportPadding = 12;
  const left = Math.min(
    Math.max(viewportPadding, rect.left - 10),
    window.innerWidth - width - viewportPadding,
  );
  const roomBelow = window.innerHeight - rect.bottom;
  const top = roomBelow >= height + gap
    ? rect.bottom + gap
    : Math.max(viewportPadding, rect.top - height - gap);
  palette.style.left = `${left}px`;
  palette.style.top = `${top}px`;
}

function handleColorPicker(event) {
  const trigger = event.target.closest(".definition-color-trigger");
  if (trigger) {
    const picker = trigger.closest("[data-color-picker]");
    const palette = $("#definitionColorPalette");
    if (!palette) return;
    const willOpen = palette.hidden || activeColorPicker !== picker;
    closeColorPalettes();
    if (!willOpen) return;
    activeColorPicker = picker;
    const input = picker.querySelector("input");
    palette.innerHTML = personalizationColorPalette.map((color) => {
      const selected = color.toLowerCase() === input.value.toLowerCase();
      return `
        <button class="definition-color-swatch ${selected ? "is-selected" : ""}"
          type="button"
          role="option"
          aria-selected="${selected}"
          aria-label="${color}"
          data-definition-color="${color}"
          style="--swatch-color:${color}"></button>
      `;
    }).join("");
    palette.hidden = false;
    trigger.setAttribute("aria-expanded", "true");
    positionColorPalette(trigger, palette);
    return;
  }

  const swatch = event.target.closest("[data-definition-color]");
  if (!swatch) {
    closeColorPalettes();
    return;
  }
  const picker = activeColorPicker;
  const input = picker?.querySelector("input");
  const color = swatch.dataset.definitionColor;
  if (!input || !color) return;
  input.value = color;
  const colorTrigger = picker.querySelector(".definition-color-trigger");
  colorTrigger?.style.setProperty("--selected-color", color);
  colorTrigger?.setAttribute("aria-expanded", "false");
  $("#definitionColorPalette").hidden = true;
  $("#definitionColorPalette").querySelectorAll(".definition-color-swatch").forEach((item) => {
    const selected = item.dataset.definitionColor === color;
    item.classList.toggle("is-selected", selected);
    item.setAttribute("aria-selected", String(selected));
  });
  activeColorPicker = null;

  const row = picker.closest("[data-definition-id]");
  if (!row) return;
  if (row.dataset.definitionType === "family-category") {
    const category = familyState.categories.find((entry) => entry.id === row.dataset.definitionId);
    if (!category) return;
    category.color = color;
    renderFamilyGoalControls();
    window.MyCare.family.updateFamilyGoalCategory(supabaseClient, category.id, { color })
      .then((updated) => {
        familyState.categories = familyState.categories.map((item) => item.id === updated.id ? updated : item);
        familyState.categoryMessage = personalizationText("familyCategorySaved", "家庭分类已保存。", "Family category saved.");
        renderPersonalizationSettings();
        renderFamilyGoalControls();
      })
      .catch((error) => {
        familyState.categoryError = error?.message || "Family category could not be saved.";
        renderPersonalizationSettings();
      });
    return;
  }
  const list = row.dataset.definitionType === "focus" ? getFocusCategories() : getHabitSeedTypes();
  const item = list.find((entry) => entry.id === row.dataset.definitionId);
  if (!item) return;
  item.color = color;
  saveState();
  renderFocusCategories();
  renderFocusSeed();
  renderHabitGarden();
  if ($("#view-stats").classList.contains("active")) drawCharts();
}

function renderSelfCareQuoteSettings() {
  const container = $("#selfCareQuoteSettingsList");
  if (!container) return;
  container.innerHTML = state.settings.selfCareQuotes.map((quote, index) => `
    <article class="quote-setting-item" data-quote-id="${escapeHtml(quote.id)}">
      <div class="quote-setting-head">
        <span>${String(index + 1).padStart(2, "0")}</span>
        <label class="personalization-switch">
          <input class="quote-active" type="checkbox" ${quote.active ? "checked" : ""} />
          <span aria-hidden="true"></span>
          <small>${escapeHtml(t().personalization.active)}</small>
        </label>
      </div>
      <label>
        <small>${escapeHtml(t().personalization.quoteLabel)}</small>
        <textarea class="quote-text" rows="3" maxlength="220">${escapeHtml(getQuoteText(quote))}</textarea>
      </label>
    </article>
  `).join("");
}

function addSelfCareQuote() {
  const input = $("#newSelfCareQuote");
  const text = input.value.trim();
  if (!text) {
    input.focus();
    return;
  }
  state.settings.selfCareQuotes.push({
    id: `quote-${Date.now()}-${Math.round(Math.random() * 1000)}`,
    text,
    active: true,
    builtIn: false,
  });
  input.value = "";
  saveState();
  refreshSelfCareQuotes();
}

function addPersonalizationItem(type) {
  const isFocus = type === "focus";
  const input = $(isFocus ? "#newFocusCategoryName" : "#newHabitSeedName");
  const colorInput = $(isFocus ? "#newFocusCategoryColor" : "#newHabitSeedColor");
  const name = input.value.trim();
  if (!name) {
    input.focus();
    return;
  }
  const list = isFocus ? getFocusCategories() : getHabitSeedTypes();
  const id = createDefinitionId(name, list);
  list.push({
    id,
    labelZh: name,
    labelEn: name,
    color: colorInput.value,
    active: true,
    builtIn: false,
  });
  input.value = "";
  saveState();
  renderPersonalizationSettings();
  renderFocusCategories();
  renderFocusSeed();
  renderHabitGarden();
}

async function refreshFamilyCategorySettings() {
  if (!supabaseClient || !currentUser) {
    renderPersonalizationSettings();
    return;
  }
  if (!getActiveFamily()) {
    await loadFamilyRoom({ keepMessage: true });
    renderPersonalizationSettings();
  } else {
    const family = getActiveFamily();
    familyState.categories = await loadFamilyGoalCategoriesSafely(family.id);
    renderPersonalizationSettings();
    renderFamilyGoalControls();
  }
}

async function addFamilyCategory() {
  const family = getActiveFamily();
  if (!supabaseClient || !currentUser || !family) {
    renderFamilyCategorySettings();
    return;
  }
  const input = $("#newFamilyCategoryName");
  const colorInput = $("#newFamilyCategoryColor");
  const name = input?.value.trim();
  if (!name) {
    input?.focus();
    return;
  }
  try {
    familyState.categoryError = "";
    const created = await window.MyCare.family.createFamilyGoalCategory(supabaseClient, currentUser, {
      familyId: family.id,
      name,
      color: colorInput?.value || "#8baa97",
    });
    familyState.categories = [
      ...familyState.categories.filter((category) => category.id !== created.id),
      created,
    ].sort((a, b) => String(a.name).localeCompare(String(b.name)));
    input.value = "";
    familyState.categoryMessage = personalizationText("familyCategoryAdded", "家庭分类已添加。", "Family category added.");
    renderPersonalizationSettings();
    renderFamilyGoalControls();
  } catch (error) {
    familyState.categoryError = error?.message || "Family category could not be saved.";
    renderPersonalizationSettings();
  }
}

function createDefinitionId(name, list) {
  const base = name.toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-")
    .replace(/^-+|-+$/g, "") || "custom";
  let id = base;
  let suffix = 2;
  while (list.some((item) => item.id === id)) {
    id = `${base}-${suffix}`;
    suffix += 1;
  }
  return id;
}

async function handleFamilyCategoryEdit(event, row) {
  const category = familyState.categories.find((entry) => entry.id === row.dataset.definitionId);
  if (!category) return;
  const updates = {};
  if (event.target.classList.contains("personalization-name")) {
    const name = event.target.value.trim();
    if (!name) return;
    category.name = name;
    if (event.type !== "change") return;
    updates.name = name;
  }
  if (event.target.classList.contains("personalization-color")) {
    category.color = event.target.value;
    updates.color = event.target.value;
  }
  if (event.target.classList.contains("personalization-active")) {
    category.active = event.target.checked;
    updates.active = event.target.checked;
  }
  if (!Object.keys(updates).length) return;
  renderFamilyGoalControls();
  try {
    familyState.categoryError = "";
    const updated = await window.MyCare.family.updateFamilyGoalCategory(supabaseClient, category.id, updates);
    familyState.categories = familyState.categories.map((item) => item.id === updated.id ? updated : item);
    familyState.categoryMessage = personalizationText("familyCategorySaved", "家庭分类已保存。", "Family category saved.");
    renderPersonalizationSettings();
    renderFamilyGoalControls();
  } catch (error) {
    familyState.categoryError = error?.message || "Family category could not be saved.";
    renderPersonalizationSettings();
  }
}

async function handlePersonalizationEdit(event) {
  const quoteRow = event.target.closest("[data-quote-id]");
  if (quoteRow) {
    if (event.type !== "change") return;
    const quote = state.settings.selfCareQuotes.find((item) => item.id === quoteRow.dataset.quoteId);
    if (!quote) return;
    if (event.target.classList.contains("quote-active")) {
      const activeCount = state.settings.selfCareQuotes.filter((item) => item.active).length;
      if (!event.target.checked && activeCount <= 2) {
        event.target.checked = true;
        return;
      }
      quote.active = event.target.checked;
    }
    if (event.target.classList.contains("quote-text")) {
      const value = event.target.value.trim();
      if (!value) return;
      if (quote.builtIn) {
        if (getLanguage() === "zh") quote.zh = value;
        else quote.en = value;
      } else {
        quote.text = value;
      }
    }
    saveState();
    refreshSelfCareQuotes();
    return;
  }
  const row = event.target.closest("[data-definition-id]");
  if (!row) return;
  if (row.dataset.definitionType === "family-category") {
    await handleFamilyCategoryEdit(event, row);
    return;
  }
  const list = row.dataset.definitionType === "focus" ? getFocusCategories() : getHabitSeedTypes();
  const item = list.find((entry) => entry.id === row.dataset.definitionId);
  if (!item) return;
  if (event.target.classList.contains("personalization-name")) {
    const name = event.target.value.trim();
    if (!name) return;
    if (getLanguage() === "zh") item.labelZh = name;
    else item.labelEn = name;
  }
  if (event.target.classList.contains("personalization-color")) item.color = event.target.value;
  if (event.target.classList.contains("personalization-active")) {
    if (row.dataset.definitionType === "focus" && !event.target.checked && list.filter((entry) => entry.active).length <= 1) {
      event.target.checked = true;
      return;
    }
    item.active = event.target.checked;
  }
  saveState();
  renderFocusCategories();
  renderFocusSeed();
  renderHabitGarden();
  if ($("#view-stats").classList.contains("active")) drawCharts();
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
    await loadFamilyRoom();
  }

  supabaseClient.auth.onAuthStateChange((event, session) => {
    currentUser = session?.user || null;
    renderAccountUI();
    if (currentUser && event !== "INITIAL_SESSION") {
      window.setTimeout(async () => {
        await reconcileCloudState();
        await loadCloudHistory();
        await loadFamilyRoom();
      }, 0);
    } else if (!currentUser) {
      resetFamilyState();
      renderFamilyRoom();
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
  resetFamilyState();
  setAccountMessage(getLanguage() === "zh" ? "已退出。数据仍保存在此设备。" : "Signed out. Your data remains on this device.");
  renderAccountUI();
  renderFamilyRoom();
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
    await syncToCloud();
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
  const { data: currentCloud, error: readError } = await supabaseClient
    .from("app_states")
    .select("payload, revision, updated_at")
    .eq("user_id", currentUser.id)
    .maybeSingle();

  if (readError) {
    cloudSyncInProgress = false;
    setAccountMessage(readError.message, true);
    renderAccountUI("error");
    return;
  }

  const currentRevision = Number(currentCloud?.revision || 0);
  if (currentCloud && !force && currentRevision !== cloudRevision) {
    cloudSyncInProgress = false;
    showCloudConflict(currentCloud);
    return;
  }

  let data;
  let error;
  if (!currentCloud) {
    ({ data, error } = await supabaseClient
      .from("app_states")
      .insert({ user_id: currentUser.id, payload })
      .select("revision, updated_at")
      .single());
  } else if (force) {
    ({ data, error } = await supabaseClient
      .from("app_states")
      .update({ payload })
      .eq("user_id", currentUser.id)
      .select("revision, updated_at")
      .single());
  } else {
    ({ data, error } = await supabaseClient
      .from("app_states")
      .update({ payload })
      .eq("user_id", currentUser.id)
      .eq("revision", cloudRevision)
      .select("revision, updated_at")
      .maybeSingle());
    if (!error && !data) {
      const { data: latestCloud, error: latestError } = await supabaseClient
        .from("app_states")
        .select("payload, revision, updated_at")
        .eq("user_id", currentUser.id)
        .single();
      cloudSyncInProgress = false;
      if (latestError) {
        setAccountMessage(latestError.message, true);
        renderAccountUI("error");
      } else {
        showCloudConflict(latestCloud);
      }
      return;
    }
  }
  cloudSyncInProgress = false;
  if (error) {
    setAccountMessage(error.message, true);
    renderAccountUI("error");
    return;
  }
  cloudRevision = Number(data.revision || cloudRevision);
  cloudSnapshot = null;
  state.settings.lastCloudSyncAt = data.updated_at;
  persistState();
  setAccountMessage(getLanguage() === "zh" ? "已安全同步到云端。" : "Safely synced to the cloud.");
  renderAccountUI("synced");
  loadCloudHistory();
}

function showCloudConflict(snapshot) {
  cloudSnapshot = snapshot;
  cloudRevision = Number(snapshot?.revision || cloudRevision);
  setAccountMessage(getLanguage() === "zh"
    ? "云端已有较新的数据。为避免覆盖，请选择要保留的版本。"
    : "The cloud has newer data. Choose which version to keep to avoid overwriting it.");
  renderAccountUI("conflict");
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
  normalizePersonalizationSettings(state.settings);
  syncBuiltInSelfCareQuotes(canonicalMorningQuotes);
  morningQuotePool = getActiveSelfCareQuotes();
  resetMorningSteps();
  state.settings.lastCloudSyncAt = snapshot.updated_at || new Date().toISOString();
  state.settings.lastLocalChangeAt = state.settings.lastCloudSyncAt;
  cloudRevision = Number(snapshot.revision || cloudRevision);
  cloudSnapshot = null;
  persistState();
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
    normalizePersonalizationSettings(state.settings);
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
  persistState();
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
    canonicalMorningQuotes = normalized;
    syncBuiltInSelfCareQuotes(normalized);
    morningQuotePool = getActiveSelfCareQuotes();
    resetMorningSteps();
  } catch {
    canonicalMorningQuotes = [...defaultMorningQuotes];
    syncBuiltInSelfCareQuotes(defaultMorningQuotes);
    morningQuotePool = getActiveSelfCareQuotes();
    resetMorningSteps();
  }
}

function syncBuiltInSelfCareQuotes(quotes) {
  const currentBuiltIns = new Map(
    state.settings.selfCareQuotes
      .filter((quote) => quote.builtIn)
      .map((quote) => [quote.id, quote]),
  );
  const customQuotes = state.settings.selfCareQuotes.filter((quote) => !quote.builtIn);
  const builtInQuotes = quotes.map((quote, index) => {
    const id = `quote-${index + 1}`;
    const saved = currentBuiltIns.get(id);
    const savedText = String(saved?.text || "").trim();
    const savedZh = String(saved?.zh || "").trim();
    const savedEn = String(saved?.en || "").trim();
    const hasCustomSingleText = savedText
      && savedText !== quote.prompt
      && savedText !== quote.promptEn;
    const keepSingleZh = hasCustomSingleText && shouldKeepSavedQuote(savedText, quote.prompt, quote.promptEn, "zh");
    const keepSingleEn = hasCustomSingleText && shouldKeepSavedQuote(savedText, quote.promptEn, quote.prompt, "en");
    return {
      id,
      text: "",
      zh: shouldKeepSavedQuote(savedZh, quote.prompt, quote.promptEn, "zh")
        ? savedZh
        : (keepSingleZh ? savedText : quote.prompt),
      en: shouldKeepSavedQuote(savedEn, quote.promptEn, quote.prompt, "en")
        ? savedEn
        : (keepSingleEn ? savedText : quote.promptEn),
      active: saved?.active !== false,
      builtIn: true,
    };
  });
  state.settings.selfCareQuotes = [...builtInQuotes, ...customQuotes];
  persistState();
}

function shouldKeepSavedQuote(value, canonical, alternate, language = "") {
  return window.MyCare.language.shouldKeepSavedQuote(value, canonical, alternate, language);
}

function looksLikeMojibake(value = "") {
  return window.MyCare.language.looksLikeMojibake(value);
}

function isQuoteLanguageCompatible(value = "", language = "") {
  return window.MyCare.language.isQuoteLanguageCompatible(value, language);
}

function getActiveSelfCareQuotes() {
  return state.settings.selfCareQuotes
    .filter((quote) => quote.active)
    .map((quote, index) => ({
      label: `短句 ${index + 1}`,
      prompt: quote.builtIn ? (quote.zh || quote.en) : quote.text,
      promptEn: quote.builtIn ? (quote.en || quote.zh) : quote.text,
      hint: "",
    }));
}

function getQuoteText(quote) {
  if (!quote.builtIn) return quote.text;
  return getLanguage() === "zh"
    ? (quote.zh || quote.en || quote.text)
    : (quote.en || quote.zh || quote.text);
}

function refreshSelfCareQuotes() {
  morningQuotePool = getActiveSelfCareQuotes();
  resetMorningSteps();
  renderSelfCareQuoteSettings();
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
    label: getLanguage() === "zh" ? `今日短句 ${index + 1}` : `Quote ${index + 1}`,
  }));
}

function bindNavigation() {
  $$(".nav-tab, .module-card[data-view], .self-care-action, .immersive-home, .paper-entry").forEach((button) => {
    button.addEventListener("click", () => {
      showView(button.dataset.view);
    });
  });
  $("#whatsNewTrigger")?.addEventListener("click", () => $("#whatsNewDialog")?.showModal());
  $("#selfCareNavToggle")?.addEventListener("click", () => {
    const dropdown = $("#selfCareNav");
    const isOpen = !dropdown.classList.contains("open");
    dropdown.classList.toggle("open", isOpen);
    $("#selfCareNavToggle").setAttribute("aria-expanded", String(isOpen));
  });

  $("#calendarUrl").addEventListener("change", (event) => {
    state.settings.calendarUrl = event.target.value || defaults.settings.calendarUrl;
    saveState();
  });
}

function bindLanguageToggle() {
  $("#languageToggle")?.addEventListener("click", toggleLanguage);
}

function toggleLanguage() {
  state.settings.language = getLanguage() === "zh" ? "en" : "zh";
  saveState();
  renderLanguage();
}

function getLanguage() {
  return state.settings.language === "en" ? "en" : "zh";
}

function t() {
  return copy[getLanguage()];
}

function personalizationText(key, zhFallback, enFallback = zhFallback) {
  return t().personalization?.[key] || (getLanguage() === "zh" ? zhFallback : enFallback);
}

function interpolate(template, values) {
  return Object.entries(values).reduce((result, [key, value]) => result.replaceAll(`{${key}}`, value), template);
}

function displayFocusCategory(category) {
  const id = normalizeFocusCategoryId(category);
  const definition = getFocusCategories().find((item) => item.id === id);
  return definition ? getDefinitionLabel(definition) : (t().focus.categories[category] || category);
}

function getDefinitionLabel(definition) {
  return getLanguage() === "zh"
    ? (definition.labelZh || definition.name || definition.labelEn || "")
    : (definition.labelEn || definition.name || definition.labelZh || "");
}

function getFocusCategories({ includeInactive = true } = {}) {
  normalizePersonalizationSettings(state.settings);
  return includeInactive
    ? state.settings.focusCategories
    : state.settings.focusCategories.filter((item) => item.active);
}

function getHabitSeedTypes({ includeInactive = true } = {}) {
  normalizePersonalizationSettings(state.settings);
  return includeInactive
    ? state.settings.habitSeedTypes
    : state.settings.habitSeedTypes.filter((item) => item.active);
}

function normalizeFocusCategoryId(value) {
  const legacy = {
    "学习": "learning",
    "工作": "work",
    "阅读": "reading",
    "创作": "creative",
    "生活": "life",
    Learning: "learning",
    Work: "work",
    Reading: "reading",
    Creative: "creative",
    Life: "life",
  };
  return legacy[value] || value || "learning";
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
  $("#selfCareNavToggle strong").textContent = text.nav.selfCare;
  $("#selfCareNavToggle").setAttribute("aria-label", text.nav.selfCare);

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
  renderWhatsNewLanguage(text.home.whatsNew);
  ensureHomeModuleCards();
  Object.entries(text.home.cards).forEach(([view, [title, description]]) => {
    const card = view === "selfCare"
      ? $(`.module-card[data-home-card="${view}"]`)
      : $(`.module-card[data-view="${view}"]`);
    if (!card) return;
    card.querySelector(":scope > strong").textContent = title;
    card.querySelector("small").textContent = description;
  });
  Object.entries(text.home.selfCareActions).forEach(([view, label]) => {
    const action = $(`.self-care-action[data-view="${view}"] b`);
    if (action) action.textContent = label;
  });

  $$("#languageToggle [data-lang-label]").forEach((item) => {
    item.textContent = item.dataset.langLabel === "zh" ? "中文" : "EN";
    item.classList.toggle("active", item.dataset.langLabel === lang);
  });
  $("#languageToggle").setAttribute("aria-label", lang === "zh" ? "Switch to English" : "Switch to Chinese");
  $$("#personalizationLanguageToggle [data-lang-label]").forEach((item) => {
    item.textContent = item.dataset.langLabel === "zh" ? "中文" : "EN";
    item.classList.toggle("active", item.dataset.langLabel === lang);
  });
  $("#personalizationLanguageToggle")?.setAttribute("aria-label", lang === "zh" ? "Switch to English" : "Switch to Chinese");
  renderMorningLanguage();
  renderFocusLanguage();
  renderNightLanguage();
  renderPersonalBlockLanguage();
  renderHabitLanguage();
  renderLowEnergyLanguage();
  renderWorkLanguage();
  renderStatsLanguage();
  renderAccountUI();
  renderPersonalizationLanguage();
  refreshDashboard();
}

function renderWhatsNewLanguage(content) {
  if (!content) return;
  $("#whatsNewTrigger").textContent = content.link;
  $("#whatsNewEyebrow").textContent = content.eyebrow;
  $("#whatsNewTitle").textContent = content.title;
  $("#whatsNewIntro").textContent = content.intro;
  $("#whatsNewDone").textContent = content.action;
  const targets = [
    ["#whatsNewItemOneTitle", "#whatsNewItemOneCopy"],
    ["#whatsNewItemTwoTitle", "#whatsNewItemTwoCopy"],
    ["#whatsNewItemThreeTitle", "#whatsNewItemThreeCopy"],
  ];
  targets.forEach(([titleSelector, copySelector], index) => {
    const item = content.items[index];
    if (!item) return;
    $(titleSelector).textContent = item[0];
    $(copySelector).textContent = item[1];
  });
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
  $("#wakeTimePickerEyebrow").textContent = text.timePicker.eyebrow;
  $("#wakeTimePickerTitle").textContent = text.timePicker.title;
  $("#wakeHourLabel").textContent = text.timePicker.hour;
  $("#wakeMinuteLabel").textContent = text.timePicker.minute;
  $("#wakeTimeNow").textContent = text.timePicker.now;
  $("#wakeTimeConfirm").textContent = text.timePicker.confirm;
  $("#wakeTimeClose").setAttribute("aria-label", text.timePicker.close);
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
  $(".focus-control-heading .focus-control-label").textContent = text.categoryLabel;
  $("#focusSeedLabel").innerHTML = `${text.seedLabel} <small>${text.seedOptional}</small>`;
  $("#focusTask").placeholder = text.taskPlaceholder;
  const metricLabels = $$("#view-focus .focus-metrics span");
  if (metricLabels[0]) metricLabels[0].textContent = text.todayMinutes;
  if (metricLabels[1]) metricLabels[1].textContent = text.roundsDone;
  $("#logFocus").textContent = text.manualLog;
  renderFocusCategories();
  renderFocusSeed();
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
    ? "如果今天没有太多力气，也没关系。慢一点，轻一点，慢慢找回自己的节奏。"
    : "On low-energy days, the goal is not to perform well. The goal is to return.";
  $(".low-energy-keep").textContent = zh ? "保留系统" : "Keep the system";
  const rules = $$(".low-energy-rules span");
  if (rules[0]) rules[0].textContent = zh ? "感受值得被认真对待" : "Your feelings deserve to be heard.";
  if (rules[1]) rules[1].textContent = zh ? "情绪值得被温柔回应" : "Your emotions deserve compassion.";
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
  $(".goal-scope-option[data-goal-scope='personal']").textContent = text.personalGoalLabel;
  $(".goal-scope-option[data-goal-scope='family']").textContent = text.familyGoalLabel;
  $(".work-view-option[data-work-view='list']").textContent = text.listLabel;
  $(".work-view-option[data-work-view='add']").textContent = text.addNewLabel;
  $("#workGoalForm .panel-title h3").textContent = text.formTitle;
  $("#workGoalForm .panel-title span").textContent = text.formMeta;
  $("[data-work-label='title']").childNodes[0].textContent = `${text.goalLabel} `;
  $("#workGoalCategoryLabel").textContent = text.categoryLabel;
  $("#workGoalDeadlineLabel").textContent = text.deadlineLabel;
  $("#workGoalTitle").placeholder = text.goalPlaceholder;
  $("#workGoalCategory").placeholder = text.categoryPlaceholder;
  renderGoalCategorySuggestions();
  $("#workGoalForm button[type='submit']").textContent = text.add;
  $("[data-goal-filter='current']").textContent = text.currentTitle;
  $("[data-goal-filter='finished']").textContent = text.finishedTitle;
  $("#workResetHint").textContent = text.resetHint;
  $("#workResetEyebrow").textContent = text.resetEyebrow;
  $("#workResetTitle").textContent = text.resetTitle;
  $("#workResetCopy").textContent = text.resetCopy;
  $("#workResetCancel").textContent = text.resetCancel;
  $("#workResetConfirm").textContent = text.resetConfirm;
  $("#workDeleteEyebrow").textContent = text.deleteEyebrow;
  $("#workDeleteTitle").textContent = text.deleteTitle;
  $("#workDeleteCopy").textContent = text.deleteCopy;
  $("#workDeleteCancel").textContent = text.deleteCancel;
  $("#workDeleteConfirm").textContent = text.deleteConfirm;
  renderFamilyRoomLanguage();
  renderGoalScope();
  renderWorkDeadlinePicker();
  renderWorkGoalView();
  renderWorkGoals();
}

function renderStatsLanguage() {
  const text = t().stats;
  const zh = getLanguage() === "zh";
  $("#view-stats .section-head .eyebrow").textContent = text.eyebrow;
  $("#statsTitle").textContent = zh ? "看见自己的节奏" : "See Your Rhythm";
  $("#statsSubtitle").textContent = zh ? "只看趋势，不评价每一天。" : "Notice the patterns without judging each day.";
  $(".stats-scope-option[data-stats-scope='personal']").textContent = text.personalStatsLabel;
  $(".stats-scope-option[data-stats-scope='family']").textContent = text.familyStatsLabel;
  $("#familyStatsEyebrow").textContent = text.familyStatsEyebrow;
  $("#familyStatsTitle").textContent = text.familyStatsTitle;
  $("#familyStatsSubtitle").textContent = text.familyStatsSubtitle;
  $("#familyStatsEmpty").textContent = text.familyStatsEmpty;
  $("#exportData").setAttribute("aria-label", text.export);
  $("#exportData").setAttribute("title", text.export);
  const labels = {
    healthStatsTitle: zh ? "身体状态" : "Health",
    healthStatsSubtitle: zh ? "观察饥饿感与皮肤状态的变化。" : "Notice changes in hunger and skin status.",
    hungerStatsTitle: "Hunger level",
    hungerStatsMeta: zh ? "晨间记录 · 0–10" : "Morning check-in · 0–10",
    skinStatsTitle: zh ? "皮肤状态" : "Skin status",
    skinStatsMeta: zh ? "按日期查看变化" : "Changes over time",
    healthImportTitle: zh ? "导入的健康数据" : "Imported health data",
    healthImportMeta: zh ? "本地 CSV / JSON / XML 预览" : "Local CSV / JSON / XML preview",
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
  Object.assign(labels, {
    familyGoalStatusTitle: zh ? "家庭目标状态" : "Family goal status",
    familyGoalStatusMeta: zh ? "共享目标的进行与完成情况" : "Open and completed shared goals",
    familyGoalCategoryTitle: zh ? "家庭分类" : "Family categories",
    familyGoalCategoryMeta: zh ? "按家庭分类查看共享目标" : "Shared goals by category",
    familyGoalUrgencyTitle: zh ? "紧急程度" : "Urgency",
    familyGoalUrgencyMeta: zh ? "低、普通、紧急的分布" : "Low, normal, and high urgency",
    familyMemberOverviewTitle: zh ? "\u5173\u5fc3\u4fe1\u53f7" : "Care signals",
    familyMemberOverviewMeta: zh ? "\u7528\u6210\u5458\u6388\u6743\u7684\u6458\u8981\u770b\u89c1\u72b6\u6001\u53d8\u5316" : "State changes from opt-in summaries",
  });
  Object.assign(labels, {
    personalShareEyebrow: zh ? "\u6e29\u67d4\u5206\u4eab" : "Share softly",
    personalShareTitle: zh ? "\u5206\u4eab\u4e00\u4efd\u8f7b\u91cf\u603b\u7ed3" : "Share a gentle summary",
    personalShareSubtitle: zh
      ? "\u53ea\u5206\u4eab\u4e00\u4efd\u5c0f\u5c0f\u7684\u7edf\u8ba1\u6458\u8981\uff0c\u79c1\u5bc6\u7b14\u8bb0\u4e0d\u4f1a\u88ab\u5206\u4eab\u3002"
      : "Only a small summary is shared. Private notes stay private.",
    familySharedStatsTitle: zh ? "\u5bb6\u5ead\u6210\u5458\u5206\u4eab" : "Shared personal summaries",
    familySharedStatsMeta: zh ? "\u53ea\u663e\u793a\u6388\u6743\u540e\u7684\u6458\u8981" : "Opt-in snapshots from family members",
  });
  Object.entries(labels).forEach(([id, label]) => {
    const target = $(`#${id}`);
    if (target) target.textContent = label;
  });
  $("#previewSharedStats").textContent = zh ? "\u9884\u89c8" : "Preview";
  $("#saveSharedStats").textContent = zh ? "\u5206\u4eab\u7ed9\u5bb6\u5ead" : "Share with family";
  $("#healthImportButton").textContent = zh ? "导入 CSV / JSON / XML" : "Import CSV / JSON / XML";
  $("#clearHealthImport").textContent = zh ? "清空导入数据" : "Clear imported data";
  renderHealthImportFlow();
  $$(".stats-range").forEach((button) => {
    const range = button.dataset.statsRange;
    button.textContent = range === "all" ? (zh ? "全部" : "All") : `${range} ${zh ? "天" : "days"}`;
  });
  setStatsRange(selectedStatsRange);
  renderStatsScope();
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

function renderGoalScope() {
  const scope = state.settings.goalScope === "family" ? "family" : "personal";
  $$(".goal-scope-option").forEach((button) => {
    const isActive = button.dataset.goalScope === scope;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
  $$("[data-goal-scope-panel]").forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.goalScopePanel === scope);
  });
  if (scope === "family") {
    renderFamilyRoom();
    if ($("#view-work")?.classList.contains("active")) loadFamilyRoom();
  }
}

function renderStatsScope() {
  const scope = state.settings.statsScope === "family" ? "family" : "personal";
  $$(".stats-scope-option").forEach((button) => {
    const isActive = button.dataset.statsScope === scope;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
  $$("[data-stats-scope-panel]").forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.statsScopePanel === scope);
  });
  if (scope === "family") refreshFamilyStatsData();
}

async function refreshStatsFamilyContext() {
  if (!supabaseClient || !currentUser || familyState.loading || familyState.families.length) {
    renderPersonalSharedStats();
    return;
  }
  await loadFamilyRoom({ keepMessage: true });
  renderPersonalSharedStats();
  renderFamilyStats(getStatsDays());
}

async function refreshFamilyStatsData() {
  if (!supabaseClient || !currentUser) {
    renderFamilyStats(getStatsDays());
    return;
  }
  await loadFamilyRoom({ keepMessage: true });
  renderFamilyStats(getStatsDays());
}

function showView(viewName) {
  $$(".nav-tab").forEach((item) => item.classList.toggle("active", item.dataset.view === viewName));
  const isSelfCareView = viewName === "morning" || viewName === "night";
  $("#selfCareNav")?.classList.toggle("active", isSelfCareView);
  if (isSelfCareView) {
    $("#selfCareNav")?.classList.add("open");
    $("#selfCareNavToggle")?.setAttribute("aria-expanded", "true");
  }
  $$(".paper-entry").forEach((item) => item.classList.toggle("active", item.dataset.view === viewName));
  $$(".view").forEach((view) => view.classList.remove("active"));
  $(`#view-${viewName}`).classList.add("active");
  setImmersiveMode(viewName);
  if (viewName !== "morning") stopMorningBackgroundTrack();
  if (viewName === "block") renderPersonalBlock();
  if (viewName === "habits") renderHabitGarden();
  if (viewName === "work") {
    renderGoalScope();
    renderWorkGoals();
  }
  if (viewName !== "block") $("#backgroundCredit").textContent = currentBackgroundCredit;
  if (viewName === "stats") {
    renderStatsScope();
    drawCharts();
    refreshStatsFamilyContext();
  }
}

function setImmersiveMode(viewName) {
  document.body.classList.toggle("immersive-mode", viewName === "morning" || viewName === "night");
  document.body.classList.toggle("morning-mode", viewName === "morning");
  document.body.classList.toggle("night-mode", viewName === "night");
  document.body.classList.toggle("block-mode", viewName === "block");
}

function bindMorning() {
  bindWakeTimePicker();

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

function bindWakeTimePicker() {
  const input = $("#wakeTime");
  const trigger = $("#wakeTimeTrigger");
  const popover = $("#wakeTimePopover");
  if (!input || !trigger || !popover) return;

  buildWakeTimeOptions();
  wakeTimeDraft = normalizeWakeTime(input.value);
  input.value = wakeTimeDraft;
  renderWakeTimePicker();

  trigger.addEventListener("click", () => {
    if (popover.hidden) openWakeTimePicker();
    else closeWakeTimePicker();
  });
  $("#wakeTimeClose").addEventListener("click", closeWakeTimePicker);
  $("#wakeTimeConfirm").addEventListener("click", () => {
    input.value = wakeTimeDraft;
    renderWakeTimePicker();
    closeWakeTimePicker();
  });
  $("#wakeTimeNow").addEventListener("click", () => {
    wakeTimeDraft = normalizeWakeTime(new Date().toTimeString().slice(0, 5));
    renderWakeTimePicker();
    scrollWakeTimeSelectionIntoView();
  });

  popover.addEventListener("click", (event) => {
    const option = event.target.closest(".wake-time-option");
    if (!option) return;
    const [hour, minute] = wakeTimeDraft.split(":");
    wakeTimeDraft = option.dataset.timePart === "hour"
      ? `${option.dataset.value}:${minute}`
      : `${hour}:${option.dataset.value}`;
    renderWakeTimePicker();
  });

  document.addEventListener("click", (event) => {
    if (!popover.hidden && !event.target.closest(".wake-time-picker")) closeWakeTimePicker();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !popover.hidden) {
      closeWakeTimePicker();
      trigger.focus();
    }
  });
}

function buildWakeTimeOptions() {
  const createOptions = (container, count, part) => {
    container.innerHTML = Array.from({ length: count }, (_, value) => {
      const padded = String(value).padStart(2, "0");
      return `<button class="wake-time-option" type="button" role="option" data-time-part="${part}" data-value="${padded}" aria-selected="false">${padded}</button>`;
    }).join("");
  };
  createOptions($("#wakeHourOptions"), 24, "hour");
  createOptions($("#wakeMinuteOptions"), 60, "minute");
}

function normalizeWakeTime(value) {
  const match = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(value || "");
  return match ? `${match[1]}:${match[2]}` : "08:00";
}

function openWakeTimePicker() {
  wakeTimeDraft = normalizeWakeTime($("#wakeTime").value);
  $("#wakeTimePopover").hidden = false;
  $("#wakeTimeTrigger").setAttribute("aria-expanded", "true");
  renderWakeTimePicker();
  requestAnimationFrame(scrollWakeTimeSelectionIntoView);
}

function closeWakeTimePicker() {
  $("#wakeTimePopover").hidden = true;
  $("#wakeTimeTrigger").setAttribute("aria-expanded", "false");
}

function renderWakeTimePicker() {
  const [hour, minute] = normalizeWakeTime(wakeTimeDraft).split(":");
  $("#wakeTimeDisplay").textContent = `${hour}:${minute}`;
  $$(".wake-time-option").forEach((option) => {
    const selected = option.dataset.value === (option.dataset.timePart === "hour" ? hour : minute);
    option.classList.toggle("is-selected", selected);
    option.setAttribute("aria-selected", String(selected));
  });
}

function scrollWakeTimeSelectionIntoView() {
  $$(".wake-time-option.is-selected").forEach((option) => {
    option.scrollIntoView({ block: "center" });
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
  $("#morningQuoteCustomize").hidden = Boolean(step.field);
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
  if (!step?.field) {
    const zh = getLanguage() === "zh";
    return {
      ...step,
      label: zh
        ? (morningIndex === 0 ? "先读一句" : "再读一句")
        : (morningIndex === 0 ? "Read one line" : "Read another line"),
      prompt: zh ? (step.prompt || step.promptEn) : (step.promptEn || step.prompt),
      hint: "",
    };
  }
  if (getLanguage() === "zh") return step;
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
}

function renderMorningComplete() {
  $("#morningQuoteCustomize").hidden = true;
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
  $("#focusCategories").addEventListener("click", (event) => {
    const button = event.target.closest(".focus-category");
    if (!button) return;
    focusCategory = button.dataset.focusCategory;
    renderFocusCategories();
  });
  $$(".duration-option").forEach((button) => {
    button.addEventListener("click", () => setFocusDuration(Number(button.dataset.duration)));
  });
  $("#customFocusMinutes").addEventListener("change", (event) => {
    setFocusDuration(Number(event.target.value));
  });
  $("#focusHabitSeed").addEventListener("change", (event) => {
    if (event.target.value === "__manage__") {
      openPersonalization("seed");
      renderFocusSeed();
      return;
    }
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
  const categories = getFocusCategories({ includeInactive: false });
  if (!categories.some((item) => item.id === focusCategory)) {
    focusCategory = categories[0]?.id || "learning";
  }
  $("#focusCategories").innerHTML = categories.map((category) => `
    <button class="focus-category ${category.id === focusCategory ? "active" : ""}"
      data-focus-category="${escapeHtml(category.id)}"
      style="--category-color:${escapeHtml(category.color)}"
      type="button">${escapeHtml(getDefinitionLabel(category))}</button>
  `).join("");
  renderGoalCategorySuggestions();
}

function renderGoalCategorySuggestions() {
  const list = $("#workGoalCategoryOptions");
  if (!list) return;
  list.innerHTML = getFocusCategories({ includeInactive: false })
    .map((category) => `<option value="${escapeHtml(getDefinitionLabel(category))}"></option>`)
    .join("");
}

function renderFocusSeed() {
  const select = $("#focusHabitSeed");
  if (!select) return;
  const seeds = getHabitSeedTypes({ includeInactive: false });
  if (selectedFocusSeed !== "none" && !seeds.some((item) => item.id === selectedFocusSeed)) {
    selectedFocusSeed = "none";
  }
  select.innerHTML = `
    <option value="none">${escapeHtml(t().personalization.none)}</option>
    ${seeds.map((seed) => `<option value="${escapeHtml(seed.id)}">${escapeHtml(getDefinitionLabel(seed))}</option>`).join("")}
    <option value="__manage__">${escapeHtml(t().personalization.custom)}</option>
  `;
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
    recordHabitEntry("start", task, "");
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
    recordHabitEntry("lowEnergy", "Work for 25 minutes", getActiveHealthSeedId());
    $("#focusTask").value = getLanguage() === "zh" ? "低能量模式：工作 25 分钟" : "Low-energy mode: work for 25 minutes";
    focusCategory = "工作";
    setFocusDuration(25);
    renderFocusCategories();
    showView("focus");
  });
  $$(".low-energy-option-grid button").forEach((button) => {
    button.addEventListener("click", () => {
      recordHabitEntry("lowEnergy", button.dataset.lowEnergyTask, getActiveHealthSeedId());
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

function recordHabitEntry(type, detail, habitSeed = "") {
  state.habitEntries = state.habitEntries || [];
  state.habitEntries.push({
    date: todayKey(),
    createdAt: new Date().toISOString(),
    type,
    detail,
    habitSeed,
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
  const focusEntries = (state.focusSessions || []).filter((entry) => weekDates.has(entry.date) && entry.habitSeed);
  $("#habitSeedList").innerHTML = getHabitSeeds().map((seed, index) => {
    const count = entries.filter((entry) => resolveHabitEntrySeed(entry) === seed.key).length
      + focusEntries.filter((entry) => entry.habitSeed === seed.key).length;
    return `
      <article class="habit-seed" style="--seed-accent:${escapeHtml(seed.color)}">
        <span>${String(index + 1).padStart(2, "0")}</span>
        <div class="work-goal-content">
          <b>${escapeHtml(seed.label)}</b>
          <small>${count} ${escapeHtml(t().habits.cared)}</small>
        </div>
      </article>
    `;
  }).join("");
}

function getHabitSeeds() {
  return getHabitSeedTypes({ includeInactive: false }).map((seed) => ({
    key: seed.id,
    label: getDefinitionLabel(seed),
    color: seed.color,
  }));
}

function getActiveHealthSeedId() {
  return getHabitSeedTypes({ includeInactive: false }).some((seed) => seed.id === "health")
    ? "health"
    : "";
}

function resolveHabitEntrySeed(entry) {
  if (Object.prototype.hasOwnProperty.call(entry, "habitSeed")) {
    return entry.habitSeed || "";
  }
  return getLegacyHabitSeedKey(entry);
}

function getLegacyHabitSeedKey(entry) {
  const detail = String(entry.detail || "").toLowerCase();
  if (entry.type === "lowEnergy") return "health";
  if (detail.includes("health") || detail.includes("sleep") || detail.includes("walk") || detail.includes("stretch")) return "health";
  if (detail.includes("tech") || detail.includes("技术") || detail.includes("note") || detail.includes("笔记")) return "tech";
  if (detail.includes("soft") || detail.includes("skill") || detail.includes("speaking") || detail.includes("interview") || detail.includes("resume") || detail.includes("jd") || detail.includes("口语") || detail.includes("面试") || detail.includes("简历")) return "soft-skills";
  return "health";
}

function resetFamilyState() {
  pendingFamilyDeleteGoalId = "";
  pendingFamilyRemoveMemberId = "";
  familyState = {
    loading: false,
    families: [],
    activeFamilyId: "",
    members: [],
    invitations: [],
    receivedInvitations: [],
    categories: [],
    goals: [],
    sharedStats: [],
    secretNotes: [],
    message: "",
    error: "",
    goalMessage: "",
    secretNoteMessage: "",
    secretNoteError: "",
    categoryMessage: "",
    categoryError: "",
  };
}

function getActiveFamily() {
  return familyState.families.find((family) => family.id === familyState.activeFamilyId) || familyState.families[0] || null;
}

function getCurrentFamilyMember() {
  return familyState.members.find((member) => member.userId && member.userId === currentUser?.id) || null;
}

function isCurrentFamilyOwner() {
  return getCurrentFamilyMember()?.role === "owner" || getActiveFamily()?.role === "owner";
}

function canRemoveFamilyMember(member = {}) {
  return Boolean(
    isCurrentFamilyOwner()
    && member.userId
    && member.userId !== currentUser?.id
    && member.role !== "owner",
  );
}

function bindFamilyRoom() {
  if (!$("#familyRoomPanel")) return;
  $("#refreshFamilyRoom")?.addEventListener("click", () => loadFamilyRoom({ announce: true }));
  $("#createFamilyForm")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!supabaseClient || !currentUser) {
      familyState.error = t().work.familySignedOut;
      renderFamilyRoom();
      return;
    }
    const name = $("#familyNameInput").value.trim();
    if (!name) {
      $("#familyNameInput").focus();
      return;
    }
    await runFamilyAction(async () => {
      const result = await window.MyCare.family.createFamily(supabaseClient, currentUser, name);
      familyState.activeFamilyId = result.family.id;
      $("#familyNameInput").value = "";
      familyState.message = t().work.familyReady;
      await loadFamilyRoom({ keepMessage: true });
    });
  });
  $("#receivedInvitationList")?.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-family-invitation-action='accept']");
    if (!button || !supabaseClient || !currentUser) return;
    const invitationId = button.closest("[data-family-invitation-id]")?.dataset.familyInvitationId;
    if (!invitationId) return;
    await runFamilyAction(async () => {
      const result = await window.MyCare.family.acceptInvitationById(supabaseClient, currentUser, invitationId);
      familyState.activeFamilyId = result.membership.familyId;
      familyState.receivedInvitations = familyState.receivedInvitations.filter((invite) => invite.id !== invitationId);
      familyState.message = t().work.familyReceivedAccepted;
      await loadFamilyRoom({ keepMessage: true });
    });
  });
  $("#familyInviteForm")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const family = getActiveFamily();
    if (!family) return;
    const email = $("#familyInviteEmail").value.trim();
    if (!email) {
      $("#familyInviteEmail").focus();
      return;
    }
    await runFamilyAction(async () => {
      const invitation = await window.MyCare.family.createInvitation(supabaseClient, currentUser, {
        familyId: family.id,
        email,
      });
      $("#familyInviteEmail").value = "";
      familyState.message = t().work.familyInviteCreated;
      await loadFamilyRoom({ keepMessage: true });
    });
  });
  $("#leaveFamilyButton")?.addEventListener("click", async () => {
    const family = getActiveFamily();
    if (!family) return;
    await runFamilyAction(async () => {
      await window.MyCare.family.leaveFamily(supabaseClient, currentUser, family.id);
      familyState.activeFamilyId = "";
      familyState.message = "";
      await loadFamilyRoom();
    });
  });
  $("#familyMemberList")?.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-family-member-action='remove']");
    if (!button) return;
    const family = getActiveFamily();
    const memberUserId = button.closest("[data-family-member-id]")?.dataset.familyMemberId;
    const member = familyState.members.find((item) => item.userId === memberUserId);
    if (!family || !member || !canRemoveFamilyMember(member)) return;
    if (pendingFamilyRemoveMemberId !== member.userId) {
      pendingFamilyRemoveMemberId = member.userId;
      renderFamilyRoom();
      return;
    }
    await runFamilyAction(async () => {
      await window.MyCare.family.removeFamilyMember(supabaseClient, family.id, member.userId);
      pendingFamilyRemoveMemberId = "";
      familyState.members = familyState.members.filter((item) => item.userId !== member.userId);
      familyState.message = t().work.familyMemberRemoved;
      renderFamilyRoom();
      await loadFamilyRoom({ keepMessage: true });
    });
  });
  $("#familyGoalCategoryPicker")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-family-goal-category]");
    if (!button) return;
    const value = button.dataset.familyGoalCategory;
    if (value === "__custom") {
      familyGoalCategoryMode = "custom";
      $("#familyGoalCategoryInput").value = "";
      renderFamilyGoalCategoryPicker();
      requestAnimationFrame(() => $("#familyGoalCategoryCustomInput")?.focus());
      return;
    } else {
      familyGoalCategoryMode = "preset";
      $("#familyGoalCategoryInput").value = value;
      $("#familyGoalCategoryCustomInput").value = "";
    }
    renderFamilyGoalCategoryPicker();
  });
  $("#familyGoalCategoryCustomInput")?.addEventListener("input", (event) => {
    familyGoalCategoryMode = "custom";
    $("#familyGoalCategoryInput").value = event.target.value.trim();
    renderFamilyGoalCategoryPicker();
  });
  $("#familyGoalUrgencyPicker")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-family-goal-urgency]");
    if (!button) return;
    $("#familyGoalUrgencyInput").value = button.dataset.familyGoalUrgency || "normal";
    renderFamilyGoalUrgencyPicker();
  });
  bindFamilyDeadlinePicker();
  $("#familyGoalForm")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const family = getActiveFamily();
    if (!family || !supabaseClient || !currentUser) return;
    const title = $("#familyGoalTitleInput").value.trim();
    const deadline = $("#familyGoalDeadlineInput").value;
    if (!title) {
      $("#familyGoalTitleInput").focus();
      return;
    }
    if (!deadline) {
      $("#familyGoalDeadlineTrigger")?.focus();
      $("#familyGoalDeadlineTrigger")?.click();
      return;
    }
    await runFamilyAction(async () => {
      const categoryLabel = getFamilyGoalCategoryValue();
      const created = await window.MyCare.family.createFamilyGoal(supabaseClient, currentUser, {
        familyId: family.id,
        title,
        deadline,
        urgency: String($("#familyGoalUrgencyInput").value || "normal").trim().toLowerCase(),
        categoryLabel,
      });
      familyState.goals = window.MyCare.goals.sortGoals([
        created,
        ...familyState.goals.filter((goal) => goal.id !== created.id),
      ]);
      $("#familyGoalTitleInput").value = "";
      $("#familyGoalCategoryInput").value = "";
      $("#familyGoalCategoryCustomInput").value = "";
      familyGoalCategoryMode = "preset";
      $("#familyGoalUrgencyInput").value = "normal";
      selectFamilyDeadline("");
      familyState.goalMessage = t().work.familyGoalAdded;
      renderFamilyRoom();
      await loadFamilyRoom({ keepMessage: true });
      if (!familyState.goals.some((goal) => goal.id === created.id)) {
        familyState.goals = window.MyCare.goals.sortGoals([created, ...familyState.goals]);
        familyState.goalMessage = t().work.familyGoalAdded;
        renderFamilyRoom();
      }
    });
  });
  $("#familyGoalList")?.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-family-goal-action]");
    if (!button) return;
    const card = button.closest("[data-family-goal-id]");
    const goal = familyState.goals.find((item) => item.id === card?.dataset.familyGoalId);
    if (!goal) return;
    const action = button.dataset.familyGoalAction;
    if (!["complete", "reopen", "delete"].includes(action)) return;
    if (action === "delete" && pendingFamilyDeleteGoalId !== goal.id) {
      pendingFamilyDeleteGoalId = goal.id;
      renderFamilyRoom();
      return;
    }
    if (action !== "delete" && pendingFamilyDeleteGoalId) {
      pendingFamilyDeleteGoalId = "";
      renderFamilyRoom();
    }
    await runFamilyAction(async () => {
      if (action === "complete") {
        const note = card.querySelector(".family-goal-note")?.value.trim() || "";
        const updated = await window.MyCare.family.completeFamilyGoal(supabaseClient, currentUser, goal.id, note);
        familyState.goals = window.MyCare.goals.sortGoals(familyState.goals.map((item) => item.id === goal.id ? updated : item));
        familyState.goalMessage = t().work.familyGoalCompleted;
        renderFamilyRoom();
        await loadFamilyRoom({ keepMessage: true });
        if (!familyState.goals.some((item) => item.id === goal.id && item.status === "done")) {
          familyState.goals = window.MyCare.goals.sortGoals(familyState.goals.map((item) => item.id === goal.id ? updated : item));
          familyState.goalMessage = t().work.familyGoalCompleted;
          renderFamilyRoom();
        }
        return;
      }
      if (action === "reopen") {
        const updated = await window.MyCare.family.reopenFamilyGoal(supabaseClient, goal.id);
        familyState.goals = window.MyCare.goals.sortGoals(familyState.goals.map((item) => item.id === goal.id ? updated : item));
        familyState.goalMessage = "";
        renderFamilyRoom();
        await loadFamilyRoom({ keepMessage: true });
        if (!familyState.goals.some((item) => item.id === goal.id && item.status === "open")) {
          familyState.goals = window.MyCare.goals.sortGoals(familyState.goals.map((item) => item.id === goal.id ? updated : item));
          renderFamilyRoom();
        }
        return;
      }
      if (action === "delete") {
        await window.MyCare.family.deleteFamilyGoal(supabaseClient, goal.id);
        pendingFamilyDeleteGoalId = "";
        familyState.goals = familyState.goals.filter((item) => item.id !== goal.id);
        familyState.goalMessage = t().work.familyGoalDeleted;
        renderFamilyRoom();
        await loadFamilyRoom({ keepMessage: true });
        if (familyState.goals.some((item) => item.id === goal.id)) {
          familyState.goals = familyState.goals.filter((item) => item.id !== goal.id);
          familyState.goalMessage = t().work.familyGoalDeleted;
          renderFamilyRoom();
        }
        return;
      }
    });
  });
  $("#familySecretForm")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const family = getActiveFamily();
    if (!family || !supabaseClient || !currentUser) return;
    const input = $("#familySecretInput");
    const body = input?.value.trim() || "";
    if (!body) {
      input?.focus();
      return;
    }
    await runFamilyAction(async () => {
      try {
        const note = await window.MyCare.family.createFamilySecretNote(supabaseClient, currentUser, {
          familyId: family.id,
          body,
          mood: selectedFamilySecretTheme,
        });
        familyState.secretNotes = [note, ...familyState.secretNotes.filter((item) => item.id !== note.id)];
        familyState.secretNoteMessage = t().work.familySecretAdded;
        familyState.secretNoteError = "";
        input.value = "";
        renderFamilyRoom();
        await loadFamilyRoom({ keepMessage: true });
      } catch (error) {
        const message = String(error?.message || "");
        familyState.secretNoteError = message.includes("family_secret_notes") ? t().work.familySecretSchemaMissing : message;
        familyState.loading = false;
        renderFamilyRoom();
      }
    });
  });
  $("#familySecretThemePicker")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-family-secret-theme]");
    if (!button) return;
    selectedFamilySecretTheme = getFamilySecretTheme(button.dataset.familySecretTheme).id;
    renderFamilySecretThemePicker();
  });
  $("#familySecretList")?.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-family-secret-action='hide']");
    if (!button || !supabaseClient || !currentUser) return;
    const noteId = button.closest("[data-family-secret-note-id]")?.dataset.familySecretNoteId;
    if (!noteId) return;
    await runFamilyAction(async () => {
      try {
        await window.MyCare.family.hideFamilySecretNote(supabaseClient, currentUser, noteId);
        familyState.secretNotes = familyState.secretNotes.filter((item) => item.id !== noteId);
        familyState.secretNoteMessage = t().work.familySecretDeleted;
        familyState.secretNoteError = "";
        renderFamilyRoom();
        await loadFamilyRoom({ keepMessage: true });
      } catch (error) {
        familyState.secretNoteError = error?.message || t().work.familyError;
        familyState.loading = false;
        renderFamilyRoom();
      }
    });
  });
}

async function runFamilyAction(action) {
  familyState.loading = true;
  familyState.error = "";
  renderFamilyRoom();
  try {
    await action();
  } catch (error) {
    console.error("Family action failed", error);
    familyState.error = error?.message || t().work.familyError;
    familyState.loading = false;
    renderFamilyRoom();
  }
}

async function loadFamilyRoom(options = {}) {
  if (!$("#familyRoomPanel")) return;
  if (!supabaseClient || !currentUser) {
    resetFamilyState();
    renderFamilyRoom();
    return;
  }
  familyState.loading = true;
  familyState.error = "";
  if (!options.keepMessage) familyState.message = options.announce ? t().work.familyLoading : familyState.message;
  renderFamilyRoom();
  try {
    const families = await window.MyCare.family.listFamilies(supabaseClient);
    familyState.families = families;
    familyState.receivedInvitations = await loadReceivedInvitationsSafely();
    if (!families.some((family) => family.id === familyState.activeFamilyId)) {
      familyState.activeFamilyId = families[0]?.id || "";
    }
    const active = getActiveFamily();
    familyState.members = active ? await window.MyCare.family.getFamilyMembers(supabaseClient, active.id) : [];
    familyState.invitations = active ? await window.MyCare.family.listInvitations(supabaseClient, active.id) : [];
    familyState.categories = active ? await loadFamilyGoalCategoriesSafely(active.id) : [];
    familyState.goals = active ? await window.MyCare.family.listFamilyGoals(supabaseClient, active.id) : [];
    familyState.sharedStats = active ? await loadFamilySharedStatsSafely(active.id) : [];
    familyState.secretNotes = active ? await loadFamilySecretNotesSafely(active.id) : [];
    familyState.loading = false;
    if (!familyState.message && families.length) familyState.message = t().work.familyReady;
    renderFamilyRoom();
  } catch (error) {
    familyState.loading = false;
    familyState.error = error?.message || t().work.familyError;
    renderFamilyRoom();
  }
}

async function loadFamilyGoalCategoriesSafely(familyId) {
  try {
    return await window.MyCare.family.listFamilyGoalCategories(supabaseClient, familyId);
  } catch {
    return [];
  }
}

async function loadReceivedInvitationsSafely() {
  try {
    return await window.MyCare.family.listReceivedInvitations(supabaseClient, currentUser);
  } catch (error) {
    console.warn("Received family invitations could not load", error);
    return [];
  }
}

async function loadFamilySharedStatsSafely(familyId) {
  try {
    return await window.MyCare.sharing.listSharedStats(supabaseClient, familyId);
  } catch (error) {
    console.warn("Shared stats could not load", error);
    return [];
  }
}

async function loadFamilySecretNotesSafely(familyId) {
  try {
    familyState.secretNoteError = "";
    return await window.MyCare.family.listFamilySecretNotes(supabaseClient, familyId);
  } catch (error) {
    console.warn("Family secret notes could not load", error);
    const message = String(error?.message || "");
    familyState.secretNoteError = message.includes("family_secret_notes") ? t().work.familySecretSchemaMissing : message;
    return [];
  }
}

async function resolveFamilyGoalCategory(familyId, label) {
  const name = String(label || "").trim();
  if (!name) return null;
  const existing = familyState.categories.find((category) => category.name.toLowerCase() === name.toLowerCase());
  if (existing) return existing;
  const created = await window.MyCare.family.createFamilyGoalCategory(supabaseClient, currentUser, {
    familyId,
    name,
    color: "#9eb39f",
  });
  familyState.categories = [...familyState.categories, created];
  return created;
}

function renderFamilyRoomLanguage() {
  if (!$("#familyRoomPanel")) return;
  const text = t().work;
  $("#familyRoomEyebrow").textContent = text.familyEyebrow;
  $("#familyRoomTitle").textContent = text.familyTitle;
  $("#familyRoomCopy").textContent = text.familyCopy;
  $("#refreshFamilyRoom").textContent = text.familyRefresh;
  $("#familyNameLabel").textContent = text.familyNameLabel;
  $("#familyNameInput").placeholder = text.familyNamePlaceholder;
  $("#createFamilyButton").textContent = text.familyCreate;
  $("#familyReceivedLabel").textContent = text.familyReceivedLabel;
  $("#familyReceivedCopy").textContent = text.familyReceivedCopy;
  $("#familyActiveEyebrow").textContent = text.familyCurrent;
  $("#leaveFamilyButton").textContent = text.familyLeave;
  $("#familyInviteLabel").textContent = text.familyInviteLabel;
  $("#familyInviteEmail").placeholder = text.familyInvitePlaceholder;
  $("#familyInviteButton").textContent = text.familyInvite;
  $("#familyGoalsEyebrow").textContent = text.familyGoalsEyebrow;
  $("#familyGoalsTitle").textContent = text.familyGoalsTitle;
  $("#familyGoalTitleLabel").textContent = text.familyGoalTitleLabel;
  $("#familyGoalTitleInput").placeholder = text.familyGoalTitlePlaceholder;
  $("#familyGoalCategoryLabel").textContent = text.familyGoalCategoryLabel;
  $("#familyGoalCategoryCustomInput").placeholder = text.familyGoalCategoryPlaceholder;
  $("#familyGoalUrgencyLabel").textContent = text.familyGoalUrgencyLabel;
  $("#familyGoalDeadlineLabel").textContent = text.familyGoalDeadlineLabel;
  renderFamilyDeadlinePicker();
  $("#familyGoalSubmit").textContent = text.familyGoalAdd;
  $("#familySecretEyebrow").textContent = text.familySecretEyebrow;
  $("#familySecretTitle").textContent = text.familySecretTitle;
  $("#familySecretCopy").textContent = text.familySecretCopy;
  $("#familySecretInputLabel").textContent = text.familySecretInputLabel;
  $("#familySecretInput").placeholder = text.familySecretPlaceholder;
  $("#familySecretSubmit").textContent = text.familySecretAdd;
  renderFamilySecretThemePicker();
  renderFamilyRoom();
}

function renderFamilyRoom() {
  if (!$("#familyRoomPanel")) return;
  const text = t().work;
  const signedIn = Boolean(supabaseClient && currentUser);
  const active = getActiveFamily();
  const message = familyState.loading
    ? text.familyLoading
    : familyState.error || familyState.message || (signedIn ? text.familyNoFamily : text.familySignedOut);
  $("#familyRoomMessage").textContent = message;
  $("#familyRoomMessage").classList.toggle("is-error", Boolean(familyState.error));
  $("#createFamilyForm").classList.toggle("is-disabled", !signedIn || familyState.loading);
  $("#createFamilyButton").disabled = !signedIn || familyState.loading;
  $("#refreshFamilyRoom").disabled = !signedIn || familyState.loading;
  renderReceivedInvitations();
  $("#familyActiveCard").hidden = !active;
  if (!active) return;

  $("#familyActiveName").textContent = active.name;
  $("#familyActiveMeta").textContent = interpolate(text.familyMembers, { count: familyState.members.length });
  $("#leaveFamilyButton").disabled = familyState.loading;
  $("#familyInviteButton").disabled = familyState.loading;
  $("#familyMemberList").innerHTML = familyState.members.length
    ? familyState.members.map(renderFamilyMemberPill).join("")
    : `<p class="family-empty">${escapeHtml(text.familyNoFamily)}</p>`;
  const pending = familyState.invitations.filter((invite) => invite.status === "pending");
  $("#familyInvitationList").innerHTML = pending.length
    ? pending.slice(0, 4).map((invite) => `
      <div class="family-invite-pill">
        <span>${escapeHtml(invite.email)}</span>
        <small>${escapeHtml(text.familyInvitePending)}</small>
      </div>
    `).join("")
    : `<p class="family-empty">${escapeHtml(text.familyInviteEmpty)}</p>`;
  renderFamilyGoalControls();
  renderFamilyGoals();
  renderFamilySecretNotes();
}

function renderReceivedInvitations() {
  const target = $("#receivedInvitationList");
  if (!target) return;
  const text = t().work;
  const signedIn = Boolean(supabaseClient && currentUser);
  const invites = signedIn ? (familyState.receivedInvitations || []).filter((invite) => invite.status === "pending") : [];
  target.innerHTML = invites.length
    ? invites.slice(0, 4).map((invite) => {
      const familyName = invite.familyName || text.familyReceivedFallback;
      return `
        <article class="family-received-invite" data-family-invitation-id="${escapeHtml(invite.id)}">
          <div>
            <strong>${escapeHtml(interpolate(text.familyReceivedFrom, { family: familyName }))}</strong>
            <small>${escapeHtml(invite.email || currentUser?.email || "")}</small>
          </div>
          <button class="secondary family-received-accept" data-family-invitation-action="accept" type="button" ${familyState.loading ? "disabled" : ""}>
            ${escapeHtml(text.familyReceivedAccept)}
          </button>
        </article>
      `;
    }).join("")
    : `<p class="family-empty">${escapeHtml(signedIn ? text.familyReceivedEmpty : text.familySignedOut)}</p>`;
}

function getFamilyMemberDisplayName(member = {}) {
  return member.email || (member.userId ? `${member.userId.slice(0, 8)}...` : "?");
}

function renderFamilyMemberPill(member = {}) {
  const text = t().work;
  const removable = canRemoveFamilyMember(member);
  const confirming = pendingFamilyRemoveMemberId === member.userId;
  return `
    <div class="family-member-pill ${removable ? "can-manage" : ""}" data-family-member-id="${escapeHtml(member.userId || "")}">
      <span>${escapeHtml(getFamilyMemberDisplayName(member))}</span>
      <div class="family-member-meta">
        <small>${escapeHtml(member.role === "owner" ? text.familyOwner : text.familyMember)}</small>
        ${removable ? `
          <button class="family-member-remove ${confirming ? "is-confirming" : ""}" data-family-member-action="remove" type="button" ${familyState.loading ? "disabled" : ""}>
            ${escapeHtml(confirming ? text.familyRemoveMemberConfirm : text.familyRemoveMember)}
          </button>
        ` : ""}
      </div>
    </div>
  `;
}

function getFamilyGoalCategoryValue() {
  return ($("#familyGoalCategoryCustomInput")?.value || $("#familyGoalCategoryInput")?.value || "").trim();
}

function getActiveFamilyGoalCategories() {
  return familyState.categories
    .filter((category) => category.active !== false)
    .slice(0, 5);
}

function renderFamilyGoalCategoryPicker() {
  const picker = $("#familyGoalCategoryPicker");
  if (!picker) return;
  let selected = ($("#familyGoalCategoryInput")?.value || "").trim();
  const customValue = ($("#familyGoalCategoryCustomInput")?.value || "").trim();
  const categories = getActiveFamilyGoalCategories();
  const customActive = familyGoalCategoryMode === "custom" || !categories.length;
  if (!selected && categories.length && !customActive) {
    selected = categories[0].name;
    $("#familyGoalCategoryInput").value = selected;
  }
  const resolvedCustomLabel = getLanguage() === "zh" ? "自定义" : "Custom";
  const customLabel = getLanguage() === "zh" ? "自定义" : "Custom";
  picker.innerHTML = categories.map((category) => {
    const active = !customActive && selected === category.name;
    const color = category.color || "#8baa97";
    return `
      <button class="family-category-choice ${active ? "active" : ""}" data-family-goal-category="${escapeHtml(category.name)}" type="button" aria-pressed="${active ? "true" : "false"}" style="--family-choice-color:${escapeHtml(color)}">
        <i></i>
        <span>${escapeHtml(category.name)}</span>
      </button>
    `;
  }).join("") + `
    <button class="family-category-choice custom ${customActive ? "active" : ""}" data-family-goal-category="__custom" type="button" aria-pressed="${customActive ? "true" : "false"}">
      <i></i>
      <span>${escapeHtml(resolvedCustomLabel)}</span>
    </button>
  `;
  $("#familyGoalCategoryCustomInput")?.classList.toggle("is-active", customActive);
}

function renderFamilyGoalUrgencyPicker() {
  const picker = $("#familyGoalUrgencyPicker");
  if (!picker) return;
  const text = t().work;
  const selected = ($("#familyGoalUrgencyInput")?.value || "normal").trim().toLowerCase();
  picker.innerHTML = ["low", "normal", "high"].map((key) => `
    <button class="family-urgency-choice ${selected === key ? "active" : ""}" data-family-goal-urgency="${key}" data-urgency="${key}" type="button" aria-pressed="${selected === key ? "true" : "false"}">
      <span>${escapeHtml(text.familyUrgency[key] || key)}</span>
    </button>
  `).join("");
}

function bindFamilyDeadlinePicker() {
  $("#familyGoalDeadlineTrigger")?.addEventListener("click", () => {
    const calendar = $("#familyDeadlineCalendar");
    if (!calendar) return;
    const selected = $("#familyGoalDeadlineInput")?.value;
    if (calendar.hidden) {
      const reference = selected ? new Date(`${selected}T00:00:00`) : new Date();
      familyDeadlineMonth = new Date(reference.getFullYear(), reference.getMonth(), 1);
    }
    calendar.hidden = !calendar.hidden;
    $("#familyGoalForm")?.classList.toggle("calendar-open", !calendar.hidden);
    $("#familyGoalDeadlineTrigger")?.setAttribute("aria-expanded", String(!calendar.hidden));
    renderFamilyDeadlinePicker();
  });
  $("#familyDeadlinePrev")?.addEventListener("click", () => {
    familyDeadlineMonth = new Date(familyDeadlineMonth.getFullYear(), familyDeadlineMonth.getMonth() - 1, 1);
    renderFamilyDeadlinePicker();
  });
  $("#familyDeadlineNext")?.addEventListener("click", () => {
    familyDeadlineMonth = new Date(familyDeadlineMonth.getFullYear(), familyDeadlineMonth.getMonth() + 1, 1);
    renderFamilyDeadlinePicker();
  });
  $("#familyDeadlineToday")?.addEventListener("click", () => selectFamilyDeadline(todayKey()));
  $("#familyDeadlineClear")?.addEventListener("click", () => selectFamilyDeadline(""));
  $("#familyDeadlineDays")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-family-deadline-date]");
    if (button) selectFamilyDeadline(button.dataset.familyDeadlineDate);
  });
  document.addEventListener("click", (event) => {
    const field = $(".family-deadline-field");
    if (!field?.contains(event.target)) closeFamilyDeadlinePicker();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeFamilyDeadlinePicker();
  });
  renderFamilyDeadlinePicker();
}

function closeFamilyDeadlinePicker() {
  const calendar = $("#familyDeadlineCalendar");
  if (!calendar || calendar.hidden) return;
  calendar.hidden = true;
  $("#familyGoalForm")?.classList.remove("calendar-open");
  $("#familyGoalDeadlineTrigger")?.setAttribute("aria-expanded", "false");
}

function selectFamilyDeadline(value) {
  const input = $("#familyGoalDeadlineInput");
  if (!input) return;
  input.value = value;
  if (value) {
    const date = new Date(`${value}T00:00:00`);
    familyDeadlineMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  }
  closeFamilyDeadlinePicker();
  renderFamilyDeadlinePicker();
}

function renderFamilyDeadlinePicker() {
  const title = $("#familyDeadlineCalendarTitle");
  const weekdays = $("#familyDeadlineWeekdays");
  const daysTarget = $("#familyDeadlineDays");
  if (!title || !weekdays || !daysTarget) return;
  const text = t().work;
  const zh = getLanguage() === "zh";
  const locale = zh ? "zh-CN" : "en-US";
  const selected = $("#familyGoalDeadlineInput")?.value || "";
  renderFamilyGoalDeadlineDisplay();
  title.textContent = new Intl.DateTimeFormat(locale, { year: "numeric", month: "long" }).format(familyDeadlineMonth);
  $("#familyDeadlinePrev")?.setAttribute("aria-label", text.previousMonth);
  $("#familyDeadlineNext")?.setAttribute("aria-label", text.nextMonth);
  $("#familyDeadlineToday").textContent = text.calendarToday;
  $("#familyDeadlineClear").textContent = text.calendarClear;
  weekdays.innerHTML = (zh ? ["\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d", "\u65e5"] : ["M", "T", "W", "T", "F", "S", "S"])
    .map((day) => `<span>${day}</span>`).join("");

  const year = familyDeadlineMonth.getFullYear();
  const month = familyDeadlineMonth.getMonth();
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
    const className = [
      muted ? "is-muted" : "",
      key === selected ? "is-selected" : "",
      key === todayKey() ? "is-today" : "",
    ].filter(Boolean).join(" ");
    cells.push(`<button type="button" data-family-deadline-date="${key}" class="${className}" aria-label="${key}">${cellDate.getDate()}</button>`);
  }
  daysTarget.innerHTML = cells.join("");
}

function renderFamilyGoalDeadlineDisplay() {
  const input = $("#familyGoalDeadlineInput");
  const display = $("#familyGoalDeadlineDisplay");
  if (!input || !display) return;
  const value = input.value || "";
  const text = t().work;
  const label = value ? formatLongDate(value) : text.chooseDeadline;
  display.textContent = label;
  input.setAttribute("aria-label", `${text.familyGoalDeadlineLabel}: ${label}`);
  $("#familyGoalDeadlineTrigger")?.classList.toggle("has-date", Boolean(value));
}

function renderFamilyGoalControls() {
  const text = t().work;
  const open = familyState.goals.filter((goal) => goal.status !== "done").length;
  const done = familyState.goals.length - open;
  $("#familyGoalSummary").textContent = interpolate(text.familyGoalSummary, { open, done });
  renderFamilyGoalCategoryPicker();
  renderFamilyGoalUrgencyPicker();
  renderFamilyGoalDeadlineDisplay();
  $("#familyGoalForm").classList.toggle("is-disabled", familyState.loading);
  $("#familyGoalSubmit").disabled = familyState.loading;
}

function renderFamilyGoals() {
  const target = $("#familyGoalList");
  if (!target) return;
  const goals = window.MyCare.goals.sortGoals(familyState.goals);
  const error = familyState.error ? `<p class="family-goal-message is-error">${escapeHtml(familyState.error)}</p>` : "";
  const message = familyState.goalMessage ? `<p class="family-goal-message">${escapeHtml(familyState.goalMessage)}</p>` : "";
  target.innerHTML = error + message + (goals.length
    ? goals.map(renderFamilyGoalCard).join("")
    : `<div class="empty-note family-goal-empty">${escapeHtml(t().work.familyGoalEmpty)}</div>`);
}

function getFamilySecretTheme(themeId) {
  return familySecretThemeOptions.find((theme) => theme.id === themeId) || familySecretThemeOptions[0];
}

function renderFamilySecretThemePicker() {
  const picker = $("#familySecretThemePicker");
  if (!picker) return;
  picker.innerHTML = familySecretThemeOptions.map((theme) => {
    const active = theme.id === selectedFamilySecretTheme;
    const label = getLanguage() === "zh" ? theme.zh : theme.en;
    return `
      <button class="family-secret-theme-choice ${active ? "active" : ""}" type="button" data-family-secret-theme="${escapeHtml(theme.id)}" style="--secret-theme: ${escapeHtml(theme.color)};" aria-pressed="${active}">
        <span aria-hidden="true"></span>
        ${escapeHtml(label)}
      </button>
    `;
  }).join("");
}

function renderFamilySecretNotes() {
  const list = $("#familySecretList");
  const message = $("#familySecretMessage");
  const form = $("#familySecretForm");
  const submit = $("#familySecretSubmit");
  if (!list || !message || !form || !submit) return;
  const text = t().work;
  const active = getActiveFamily();
  const canWrite = Boolean(active && supabaseClient && currentUser && !familyState.loading);
  form.classList.toggle("is-disabled", !canWrite);
  submit.disabled = !canWrite;
  renderFamilySecretThemePicker();
  message.classList.toggle("is-error", Boolean(familyState.secretNoteError));
  message.textContent = familyState.secretNoteError || familyState.secretNoteMessage || "";
  const notes = (familyState.secretNotes || []).filter((note) => note.visible !== false);
  list.innerHTML = notes.length
    ? notes.map(renderFamilySecretNoteCard).join("")
    : `<div class="empty-note family-secret-empty">${escapeHtml(text.familySecretEmpty)}</div>`;
}

function renderFamilySecretNoteCard(note) {
  const text = t().work;
  const ownNote = Boolean(currentUser?.id && note.createdBy === currentUser.id);
  const theme = getFamilySecretTheme(note.mood);
  return `
    <article class="family-secret-note" data-family-secret-note-id="${escapeHtml(note.id)}" data-secret-theme="${escapeHtml(theme.id)}" style="--secret-theme: ${escapeHtml(theme.color)};">
      <div class="family-secret-note-pin" aria-hidden="true"></div>
      <p>${escapeHtml(note.body)}</p>
      <footer>
        <span>${escapeHtml(text.familySecretAnonymous)}</span>
        <time>${escapeHtml(formatSecretNoteTime(note.createdAt))}</time>
        ${ownNote ? `<button class="family-secret-hide" data-family-secret-action="hide" type="button">${escapeHtml(getLanguage() === "zh" ? "\u6536\u8d77" : "Hide")}</button>` : ""}
      </footer>
    </article>
  `;
}

function formatSecretNoteTime(value) {
  const date = value ? new Date(value) : null;
  if (!date || Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString(getLanguage() === "zh" ? "zh-CN" : "en-CA", {
    month: "short",
    day: "numeric",
  });
}

function renderFamilyGoalCard(goal) {
  const text = t().work;
  const isDone = goal.status === "done";
  const deadline = getWorkDeadlineDetails({
    ...goal,
    note: goal.completionNote || goal.note || "",
  });
  const urgencyLabel = text.familyUrgency[goal.urgency] || goal.urgency || text.familyUrgency.normal;
  const category = goal.category || text.familyGoalCategoryLabel;
  const deleteConfirming = pendingFamilyDeleteGoalId === goal.id;
  return `
    <article class="work-goal-card family-goal-card ${isDone ? "done" : ""}" data-family-goal-id="${escapeHtml(goal.id)}" data-urgency="${escapeHtml(goal.urgency || "normal")}">
      <div class="work-goal-main">
        <div class="work-goal-content">
          <p class="eyebrow">${escapeHtml(category)} · ${escapeHtml(urgencyLabel)}</p>
          <h3>${escapeHtml(goal.title)}</h3>
          ${isDone ? `<span class="family-status-pill completed">${escapeHtml(text.completed)}</span>` : ""}
          <details class="work-note-wrap" ${goal.completionNote ? "open" : ""}>
            <summary>${escapeHtml(goal.completionNote ? text.editNote : text.addNote)}</summary>
            <label>
              <span>${escapeHtml(text.familyCompletionNote)}</span>
              <textarea class="family-goal-note" rows="3" placeholder="${escapeHtml(text.familyCompletionPlaceholder)}">${escapeHtml(goal.completionNote || "")}</textarea>
            </label>
          </details>
          <div class="work-goal-actions">
            ${isDone
              ? `<span class="work-completed">${escapeHtml(text.completed)} · ${escapeHtml(formatShortDate(goal.completedAt?.slice(0, 10)))}</span><button class="secondary" data-family-goal-action="reopen" type="button">${escapeHtml(text.reopen)}</button>`
              : `<button class="primary" data-family-goal-action="complete" type="button">${escapeHtml(text.complete)}</button>`}
            <button class="work-delete-button ${deleteConfirming ? "is-confirming" : ""}" data-family-goal-action="delete" type="button" aria-label="${escapeHtml(deleteConfirming ? text.familyGoalDeleteConfirm : text.delete)}">
              <span aria-hidden="true"></span>
              ${escapeHtml(deleteConfirming ? text.familyGoalDeleteConfirm : text.delete)}
            </button>
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

function bindWorkGoals() {
  if (!$("#workGoalForm")) return;
  bindWorkDeadlinePicker();
  $$(".goal-scope-option").forEach((button) => {
    button.addEventListener("click", () => {
      state.settings.goalScope = button.dataset.goalScope === "family" ? "family" : "personal";
      if (state.settings.goalScope === "family") closeWorkDeadlinePicker();
      saveState();
      renderGoalScope();
    });
  });
  $("#workResetButton")?.addEventListener("click", () => {
    $("#workResetDialog")?.showModal();
  });
  $("#workResetConfirm")?.addEventListener("click", () => {
    state.workGoals = [];
    state.settings.workGoalFilter = "current";
    saveState();
    renderWorkGoals();
    $("#workResetDialog")?.close("confirm");
  });
  $("#workDeleteDialog")?.addEventListener("close", () => {
    pendingDeleteGoalId = "";
  });
  $("#workDeleteConfirm")?.addEventListener("click", () => {
    if (!pendingDeleteGoalId) return;
    state.workGoals = (state.workGoals || []).filter((goal) => goal.id !== pendingDeleteGoalId);
    saveState();
    renderWorkGoals();
    $("#workDeleteDialog")?.close("confirm");
  });
  $$(".work-view-option").forEach((button) => {
    button.addEventListener("click", () => {
      state.settings.workGoalView = button.dataset.workView;
      if (state.settings.workGoalView !== "add") closeWorkDeadlinePicker();
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
    if (!title) {
      $("#workGoalTitle").focus();
      return;
    }
    if (!deadline) {
      $("#workGoalDeadlineTrigger").classList.add("needs-attention");
      $("#workGoalDeadlineTrigger").click();
      return;
    }
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
    selectWorkDeadline("");
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
    if (button.dataset.workAction === "delete") {
      pendingDeleteGoalId = goal.id;
      $("#workDeleteDialog")?.showModal();
      return;
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

function bindWorkDeadlinePicker() {
  $("#workGoalDeadlineTrigger")?.addEventListener("click", () => {
    const calendar = $("#workDeadlineCalendar");
    if (!calendar) return;
    const selected = $("#workGoalDeadline")?.value;
    if (calendar.hidden) {
      const reference = selected ? new Date(`${selected}T00:00:00`) : new Date();
      workDeadlineMonth = new Date(reference.getFullYear(), reference.getMonth(), 1);
    }
    calendar.hidden = !calendar.hidden;
    $("#workGoalForm")?.classList.toggle("calendar-open", !calendar.hidden);
    $("#workGoalDeadlineTrigger").setAttribute("aria-expanded", String(!calendar.hidden));
    renderWorkDeadlinePicker();
  });
  $("#workDeadlinePrev")?.addEventListener("click", () => {
    workDeadlineMonth = new Date(workDeadlineMonth.getFullYear(), workDeadlineMonth.getMonth() - 1, 1);
    renderWorkDeadlinePicker();
  });
  $("#workDeadlineNext")?.addEventListener("click", () => {
    workDeadlineMonth = new Date(workDeadlineMonth.getFullYear(), workDeadlineMonth.getMonth() + 1, 1);
    renderWorkDeadlinePicker();
  });
  $("#workDeadlineToday")?.addEventListener("click", () => selectWorkDeadline(todayKey()));
  $("#workDeadlineClear")?.addEventListener("click", () => selectWorkDeadline(""));
  $("#workDeadlineDays")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-work-deadline-date]");
    if (button) selectWorkDeadline(button.dataset.workDeadlineDate);
  });
  document.addEventListener("click", (event) => {
    const field = $(".work-deadline-field");
    if (!field?.contains(event.target)) closeWorkDeadlinePicker();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeWorkDeadlinePicker();
  });
  renderWorkDeadlinePicker();
}

function closeWorkDeadlinePicker() {
  const calendar = $("#workDeadlineCalendar");
  if (!calendar || calendar.hidden) return;
  calendar.hidden = true;
  $("#workGoalForm")?.classList.remove("calendar-open");
  $("#workGoalDeadlineTrigger")?.setAttribute("aria-expanded", "false");
}

function selectWorkDeadline(value) {
  const input = $("#workGoalDeadline");
  if (!input) return;
  input.value = value;
  $("#workGoalDeadlineTrigger")?.classList.remove("needs-attention");
  if (value) {
    const date = new Date(`${value}T00:00:00`);
    workDeadlineMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  }
  closeWorkDeadlinePicker();
  renderWorkDeadlinePicker();
}

function renderWorkDeadlinePicker() {
  const trigger = $("#workGoalDeadlineText");
  const title = $("#workDeadlineCalendarTitle");
  const weekdays = $("#workDeadlineWeekdays");
  const daysTarget = $("#workDeadlineDays");
  if (!trigger || !title || !weekdays || !daysTarget) return;
  const text = t().work;
  const zh = getLanguage() === "zh";
  const locale = zh ? "zh-CN" : "en-US";
  const selected = $("#workGoalDeadline")?.value || "";
  trigger.textContent = selected
    ? new Intl.DateTimeFormat(locale, { year: "numeric", month: "short", day: "numeric" }).format(new Date(`${selected}T00:00:00`))
    : text.chooseDeadline;
  $("#workGoalDeadlineTrigger")?.classList.toggle("has-date", Boolean(selected));
  title.textContent = new Intl.DateTimeFormat(locale, { year: "numeric", month: "long" }).format(workDeadlineMonth);
  $("#workDeadlinePrev")?.setAttribute("aria-label", text.previousMonth);
  $("#workDeadlineNext")?.setAttribute("aria-label", text.nextMonth);
  $("#workDeadlineToday").textContent = text.calendarToday;
  $("#workDeadlineClear").textContent = text.calendarClear;
  weekdays.innerHTML = (zh ? ["一", "二", "三", "四", "五", "六", "日"] : ["M", "T", "W", "T", "F", "S", "S"])
    .map((day) => `<span>${day}</span>`).join("");

  const year = workDeadlineMonth.getFullYear();
  const month = workDeadlineMonth.getMonth();
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
    const className = [
      muted ? "is-muted" : "",
      key === selected ? "is-selected" : "",
      key === todayKey() ? "is-today" : "",
    ].filter(Boolean).join(" ");
    cells.push(`<button type="button" data-work-deadline-date="${key}" class="${className}" aria-label="${key}">${cellDate.getDate()}</button>`);
  }
  daysTarget.innerHTML = cells.join("");
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
  const goals = window.MyCare.goals.sortGoals(state.workGoals);
  const open = goals.filter((goal) => goal.status !== "done").length;
  const done = goals.length - open;
  const visibleGoals = window.MyCare.goals.getVisibleGoals(goals, filter);
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
            <button class="work-delete-button" data-work-action="delete" type="button" aria-label="${escapeHtml(t().work.delete)}">
              <span aria-hidden="true"></span>
              ${escapeHtml(t().work.delete)}
            </button>
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
  const deadline = window.MyCare.goals.getDeadlineState(goal, todayKey());
  if (goal.status === "done") {
    return {
      status: t().work.completed,
      date: dueLabel,
      className: "done",
    };
  }
  const days = deadline.days;
  const className = deadline.className;
  if (days < 0) return { status: interpolate(t().work.overdue, { days: Math.abs(days) }), date: dueLabel, className };
  if (days === 0) return { status: t().work.dueToday, date: dueLabel, className };
  return { status: interpolate(t().work.daysLeft, { days }), date: dueLabel, className };
}

function getWorkDeadlineClass(goal) {
  return window.MyCare.goals.getDeadlineClass(goal, todayKey());
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
  $("#clearHealthImport")?.addEventListener("click", clearImportedHealthData);
  $("#exportData").addEventListener("click", exportData);
  $("#previewSharedStats")?.addEventListener("click", () => {
    sharedStatsError = false;
    sharedStatsMessage = getSharingText().previewed;
    renderPersonalSharedStats();
  });
  $("#personalShareTypes")?.addEventListener("click", handleSharedStatsTypeToggle);
  $("#personalShareRange")?.addEventListener("click", handleSharedStatsRangeToggle);
  $("#personalSharePreview")?.addEventListener("click", handleSharedStatsPreviewAction);
  $("#saveSharedStats")?.addEventListener("click", sharePersonalStatsWithFamily);
  $$(".stats-scope-option").forEach((button) => {
    button.addEventListener("click", () => {
      state.settings.statsScope = button.dataset.statsScope === "family" ? "family" : "personal";
      saveState();
      renderStatsScope();
      drawCharts();
    });
  });
  $$(".stats-range").forEach((button) => {
    button.addEventListener("click", () => {
      setStatsRange(button.dataset.statsRange || "7");
      drawCharts();
    });
  });
}

async function handleImport(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const target = $("#importResult");
  const zh = getLanguage() === "zh";
  try {
    target.classList.remove("is-error");
    target.textContent = zh ? "正在读取健康数据..." : "Reading health data...";
    const text = await file.text();
    const records = window.MyCare.healthImport.parseHealthFileText(text, file.name);
    const before = new Set((state.healthRecords || []).map((record) => record.id));
    const merged = new Map((state.healthRecords || []).map((record) => [record.id, record]));
    records.forEach((record) => merged.set(record.id, record));
    state.healthRecords = Array.from(merged.values()).sort((a, b) => `${a.date}${a.recordedAt}`.localeCompare(`${b.date}${b.recordedAt}`));
    setStatsRange("all");
    saveState();
    const added = records.filter((record) => !before.has(record.id)).length;
    const skipped = records.length - added;
    target.textContent = zh
      ? `已导入 ${added} 条健康记录${skipped ? `，跳过 ${skipped} 条重复记录` : ""}。`
      : `Imported ${added} health records${skipped ? ` and skipped ${skipped} duplicates` : ""}.`;
    drawCharts();
  } catch (error) {
    console.error("Health import failed", error);
    target.classList.add("is-error");
    target.textContent = `${zh ? "暂时无法导入：" : "Could not import: "}${error?.message || ""}`;
  } finally {
    event.target.value = "";
  }
}

function clearImportedHealthData() {
  const count = (state.healthRecords || []).length;
  if (!count) return;
  const zh = getLanguage() === "zh";
  const confirmed = window.confirm(zh
    ? "确定要清空所有导入的健康数据吗？这不会影响晨间记录、专注记录或家庭数据。"
    : "Clear all imported health data? This will not affect morning records, focus records, or family data.");
  if (!confirmed) return;
  state.healthRecords = [];
  saveState();
  const target = $("#importResult");
  if (target) {
    target.classList.remove("is-error");
    target.textContent = zh ? "已清空导入的健康数据。" : "Imported health data cleared.";
  }
  drawCharts();
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
    const category = normalizeFocusCategoryId(item.category || "uncategorized");
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

function setStatsRange(range = "7") {
  selectedStatsRange = ["7", "30", "all"].includes(String(range)) ? String(range) : "7";
  $$(".stats-range").forEach((item) => {
    item.classList.toggle("active", item.dataset.statsRange === selectedStatsRange);
  });
}

function getStatsDays() {
  if (selectedStatsRange !== "all") return recentDays(Number(selectedStatsRange) || 7);
  const dates = [
    ...state.morningEntries.map((item) => item.date),
    ...state.focusSessions.map((item) => item.date),
    ...(state.healthRecords || []).map((item) => item.date),
    ...(state.workGoals || []).flatMap((item) => [item.createdAt?.slice(0, 10), item.completedAt?.slice(0, 10)]),
    ...(familyState.goals || []).flatMap((item) => [item.createdAt?.slice(0, 10), item.completedAt?.slice(0, 10)]),
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
  renderImportedHealthStats(days);
  renderStatsSummaries(days, focusSessions);
  renderPersonalSharedStats();
  renderGoalStats(days);
  renderFamilyStats(days);
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
      const category = normalizeFocusCategoryId(item.category || "uncategorized");
      acc[category] = (acc[category] || 0) + item.minutes;
      return acc;
    }, {});
  const entries = Object.entries(totals).sort((a, b) => b[1] - a[1]).slice(0, 6);
  if (!entries.length) {
    drawCanvasEmpty(ctx, width, height, getLanguage() === "zh" ? "还没有分类专注记录" : "No categorized focus yet");
    return;
  }
  const max = Math.max(...entries.map(([, minutes]) => minutes), 1);
  ctx.font = "16px Noto Sans SC";
  entries.forEach(([category, minutes], index) => {
    const y = 30 + index * 38;
    const barWidth = Math.max(8, ((width - 235) * minutes) / max);
    ctx.fillStyle = "#315b3e";
    ctx.textAlign = "left";
    ctx.fillText(displayFocusCategory(category), 26, y + 16);
    const definition = getFocusCategories().find((item) => item.id === category);
    ctx.fillStyle = definition?.color || ["#8994b3", "#91b6bd", "#b2a3bf", "#c6ad87", "#a6b5c3", "#c2a6aa"][index % 6];
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

function formatSkinStateLabel(value) {
  return window.MyCare.language.formatSkinStateLabel(value, getLanguage());
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
      <strong>${escapeHtml(formatSkinStateLabel(item.skinState))}</strong>
    </div>
  `).join("");
}

function renderHealthImportFlow() {
  const target = $("#healthImportFlow");
  if (!target) return;
  const zh = getLanguage() === "zh";
  const steps = zh
    ? [
      ["01", "在 iPhone 健康 App 导出", "头像 > 导出所有健康数据，会得到一个 zip 文件。"],
      ["02", "先解压，再上传 export.xml", "请打开 zip 里的 apple_health_export/export.xml，不要直接上传 zip。"],
      ["03", "上传后查看轻量趋势", "数据只保存在本地，可以随时清空。"],
    ]
    : [
      ["01", "Export from iPhone Health", "Profile > Export All Health Data gives you a zip file."],
      ["02", "Unzip, then upload export.xml", "Use apple_health_export/export.xml inside the zip, not the zip itself."],
      ["03", "Review gentle trends", "Records stay local and can be cleared anytime."],
    ];
  target.innerHTML = `
    <div class="health-import-flow-head">
      <span>${escapeHtml(zh ? "Apple Watch 导入流程" : "Apple Watch import flow")}</span>
      <small>${escapeHtml(zh ? "CSV / JSON 也可以直接上传" : "CSV / JSON can be uploaded directly")}</small>
    </div>
    <div class="health-import-flow-steps">
      ${steps.map(([number, title, detail]) => `
        <article>
          <em>${escapeHtml(number)}</em>
          <strong>${escapeHtml(title)}</strong>
          <p>${escapeHtml(detail)}</p>
        </article>
      `).join("")}
    </div>
  `;
}

function getImportedHealthRecords(days = getStatsDays()) {
  if (!window.MyCare?.healthImport) return [];
  return window.MyCare.healthImport.filterRecords(state.healthRecords || [], {
    periodStart: days[0],
    periodEnd: days[days.length - 1],
  });
}

function formatHealthDuration(minutes) {
  if (!Number.isFinite(minutes)) return "—";
  const total = Math.max(0, Math.round(minutes));
  const hours = Math.floor(total / 60);
  const mins = total % 60;
  if (!hours) return `${mins}m`;
  return mins ? `${hours}h ${mins}m` : `${hours}h`;
}

const AVERAGE_DAILY_HEALTH_METRICS = new Set(["heart_rate", "resting_heart_rate", "heart_rate_variability"]);

function getDailyHealthMetric(records, metric) {
  const grouped = records
    .filter((record) => record.metric === metric)
    .reduce((acc, record) => {
      if (!acc[record.date]) acc[record.date] = [];
      acc[record.date].push(Number(record.value));
      return acc;
    }, {});
  return Object.entries(grouped)
    .map(([date, values]) => ({
      date,
      value: AVERAGE_DAILY_HEALTH_METRICS.has(metric)
        ? values.reduce((sum, value) => sum + value, 0) / values.length
        : values.reduce((sum, value) => sum + value, 0),
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

function renderHealthMetricLine(records, metric, label, formatter = (value) => Math.round(value).toLocaleString(), tone = "sleep") {
  const points = getDailyHealthMetric(records, metric).slice(-7);
  const zh = getLanguage() === "zh";
  if (!points.length) return "";
  const values = points.map((point) => Number(point.value)).filter(Number.isFinite);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = Math.max(max - min, 1);
  const padded = points.length === 1 ? [points[0], points[0]] : points;
  const pointPositions = padded.map((point, index) => {
    const x = padded.length === 1 ? 50 : 6 + (index / (padded.length - 1)) * 88;
    const normalized = (Number(point.value) - min) / range;
    const y = 42 - normalized * 30;
    const kind = Number(point.value) === max ? "high" : Number(point.value) === min ? "low" : "normal";
    return { ...point, x, y, kind };
  });
  const linePoints = pointPositions.map((point) => `${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(" ");
  const areaPoints = `6,45 ${linePoints} 94,45`;
  const latest = points.at(-1);
  const first = points[0];
  const highPoint = pointPositions.find((point) => Number(point.value) === max);
  const lowPoint = pointPositions.find((point) => Number(point.value) === min && point.date !== highPoint?.date);
  const extremeTags = [
    highPoint ? { ...highPoint, label: zh ? "最高" : "High", kind: "high" } : null,
    lowPoint ? { ...lowPoint, label: zh ? "最低" : "Low", kind: "low" } : null,
  ].filter(Boolean);
  return `
    <div class="health-import-series health-import-line-card" data-health-metric="${escapeHtml(tone)}">
      <div class="health-import-series-top">
        <div>
          <span>${escapeHtml(label)}</span>
          <small>${escapeHtml(zh ? "最近趋势" : "Recent trend")}</small>
        </div>
        <strong>${escapeHtml(formatter(latest.value))}</strong>
      </div>
      <div class="health-import-line-wrap">
        <svg class="health-import-line" viewBox="0 0 100 52" aria-hidden="true" focusable="false">
          <path class="health-import-line-grid" d="M6 12 H94 M6 27 H94 M6 42 H94" />
          <polygon points="${areaPoints}" />
          <polyline points="${linePoints}" />
          ${pointPositions.map((point) => `
            <circle class="health-line-point is-${point.kind}" cx="${point.x.toFixed(1)}" cy="${point.y.toFixed(1)}" r="${point.kind === "normal" ? "2.4" : "3.4"}">
              <title>${escapeHtml(formatChartDate(point.date))}: ${escapeHtml(formatter(point.value))}</title>
            </circle>
          `).join("")}
        </svg>
        ${extremeTags.map((point) => `
          <span class="health-extreme-tag is-${point.kind}" style="--tag-left: ${Math.max(20, Math.min(80, point.x)).toFixed(1)}%; --tag-top: ${Math.max(12, Math.min(82, (point.y / 52) * 100)).toFixed(1)}%;">
            <b>${escapeHtml(point.label)}</b>
            <em>${escapeHtml(formatChartDate(point.date))}</em>
            <strong>${escapeHtml(formatter(point.value))}</strong>
          </span>
        `).join("")}
      </div>
      <div class="health-import-line-labels">
        <span>${escapeHtml(formatChartDate(first.date))}</span>
        <strong>${escapeHtml(zh ? "最高 / 最低" : "High / low")}</strong>
        <span>${escapeHtml(formatChartDate(latest.date))}</span>
      </div>
    </div>
  `;
}

function renderHealthReport(summary, records) {
  if (!window.MyCare?.healthReport) return "";
  const zh = getLanguage() === "zh";
  const report = window.MyCare.healthReport.buildHealthReport(records, summary, {
    language: zh ? "zh" : "en",
  });
  return `
    <section class="health-report-card" aria-label="${escapeHtml(zh ? "身体趋势小结" : "Body trend note")}">
      <div class="health-report-head">
        <div>
          <span>${escapeHtml(zh ? "身体小结" : "Body note")}</span>
          <strong>${escapeHtml(report.headline)}</strong>
        </div>
        <em>${escapeHtml(report.coverage)}</em>
      </div>
      ${report.signals.length ? `
        <div class="health-report-signals">
          ${report.signals.map((signal) => `
            <article data-health-signal="${escapeHtml(signal.tone)}">
              <span>${escapeHtml(signal.label)}</span>
              <strong>${escapeHtml(signal.value)}</strong>
              <p>${escapeHtml(signal.detail)}</p>
            </article>
          `).join("")}
        </div>
      ` : ""}
      <p class="health-report-note">${escapeHtml(report.note)}</p>
    </section>
  `;
}

function renderImportedHealthStats(days = getStatsDays()) {
  const target = $("#healthImportSummary");
  if (!target || !window.MyCare?.healthImport) return;
  const zh = getLanguage() === "zh";
  const records = getImportedHealthRecords(days);
  const clearButton = $("#clearHealthImport");
  if (clearButton) clearButton.hidden = !(state.healthRecords || []).length;
  if (!records.length) {
    target.innerHTML = `
      <div class="health-import-empty">
        <strong>${escapeHtml(zh ? "还没有导入健康数据" : "No imported health data yet")}</strong>
        <span>${escapeHtml(zh ? "支持 date, metric, value, unit 格式的 CSV / JSON。" : "Use CSV / JSON with date, metric, value, and unit fields.")}</span>
      </div>
    `;
    return;
  }
  const summary = window.MyCare.healthImport.buildHealthSummary(records, {
    periodStart: days[0],
    periodEnd: days[days.length - 1],
  });
  target.innerHTML = `
    <div class="health-import-count">
      <strong>${escapeHtml(summary.recordCount)}</strong>
      <span>${escapeHtml(zh ? "条导入记录" : "imported records")}</span>
    </div>
    ${renderHealthReport(summary, records)}
    <div class="health-import-trend-grid">
      ${renderHealthMetricLine(records, "sleep_minutes", zh ? "睡眠" : "Sleep", formatHealthDuration, "sleep")}
      ${renderHealthMetricLine(records, "steps", zh ? "步数" : "Steps", (value) => Math.round(value).toLocaleString(), "steps")}
      ${renderHealthMetricLine(records, "active_minutes", zh ? "活动分钟" : "Active minutes", formatHealthDuration, "active")}
      ${renderHealthMetricLine(records, "heart_rate", zh ? "心率" : "Heart rate", (value) => `${Math.round(value)} bpm`, "heart")}
      ${renderHealthMetricLine(records, "active_energy", zh ? "活动能量" : "Active energy", (value) => `${Math.round(value).toLocaleString()} kcal`, "energy")}
    </div>
  `;
}

function toFamilyCategoryDefinition(category) {
  return {
    ...category,
    labelZh: category.name,
    labelEn: category.name,
    color: category.color || "#8baa97",
    active: category.active !== false,
  };
}

function renderFamilyCategorySettings() {
  const stateTarget = $("#familyCategorySettingsState");
  const listTarget = $("#familyCategorySettingsList");
  const addRow = $("#familyCategoryAddRow");
  if (!stateTarget || !listTarget || !addRow) return;
  const signedIn = Boolean(supabaseClient && currentUser);
  const family = getActiveFamily();
  const canEdit = signedIn && Boolean(family);
  addRow.hidden = !canEdit;
  listTarget.hidden = !canEdit;
  if (!signedIn) {
    stateTarget.classList.remove("is-error");
    const message = personalizationText(
      "familyCategorySignedOut",
      "请先登录，之后就可以为家庭目标设置分类。",
      "Sign in first, then you can customize family goal categories.",
    );
    const label = getLanguage() === "zh" ? "登录" : "Sign in";
    stateTarget.innerHTML = `<span>${escapeHtml(message)}</span><button class="family-category-login-button" id="familyCategorySignIn" type="button">${escapeHtml(label)}</button>`;
    listTarget.innerHTML = "";
    return;
  }
  if (!family) {
    stateTarget.classList.remove("is-error");
    stateTarget.textContent = personalizationText(
      "familyCategoryNoFamily",
      "你还没有加入家庭。先创建或加入一个家庭，再来自定义家庭分类。",
      "Join or create a family before customizing family categories.",
    );
    listTarget.innerHTML = "";
    return;
  }
  stateTarget.textContent = familyState.categoryError
    || familyState.categoryMessage
    || personalizationText(
      "familyCategoryReady",
      "这些分类只会用于当前家庭的共享目标。",
      "These categories only apply to the current family room.",
    );
  stateTarget.classList.toggle("is-error", Boolean(familyState.categoryError));
  renderDefinitionSettings(
    listTarget,
    familyState.categories.map(toFamilyCategoryDefinition),
    "family-category",
  );
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
  const goalStats = window.MyCare.goals.buildGoalStats(goals, {
    days,
    range: selectedStatsRange,
    todayDateText: todayKey(),
    uncategorizedLabel: zh ? "未分类" : "Uncategorized",
  });
  const {
    averageLead,
    categoryTotals,
    completedInRange,
    dueSoon,
    futureGoals,
    inProgress,
    openGoals,
    overdue,
  } = goalStats;

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

  renderGoalDeadlineTimeline(futureGoals);
}

function renderGoalDeadlineTimeline(futureGoals) {
  const zh = getLanguage() === "zh";
  const rangeDays = selectedStatsRange === "all"
    ? Math.max(30, ...futureGoals.map((item) => item.days))
    : Number(selectedStatsRange) || 7;
  const visibleGoals = futureGoals.filter((item) => item.days <= rangeDays);
  if (!visibleGoals.length) {
    $("#goalDeadlineTimeline").innerHTML = `<div class="stats-empty">${zh ? "这个时间范围内没有临近的 Deadline" : "No upcoming deadlines in this range"}</div>`;
    return;
  }
  const points = visibleGoals.map(({ goal, days }) => {
    const position = rangeDays ? (days / rangeDays) * 100 : 0;
    const color = days <= 3 ? "#c4a3a8" : days <= 7 ? "#c7ad82" : "#94aabd";
    return `<i class="goal-deadline-point" style="--goal-position:${position}%;--goal-color:${color}" title="${escapeHtml(goal.title)} · ${escapeHtml(formatShortDate(goal.deadline))}"></i>`;
  }).join("");
  const list = visibleGoals.slice(0, 6).map(({ goal, days }) => {
    const dueText = days === 0 ? (zh ? "今天到期" : "Due today") : `${days} ${zh ? "天后" : "days left"}`;
    return `<div class="goal-deadline-item"><b>${escapeHtml(goal.title)}</b><span>${escapeHtml(dueText)} · ${escapeHtml(formatShortDate(goal.deadline))}</span></div>`;
  }).join("");
  $("#goalDeadlineTimeline").innerHTML = `
    <div class="goal-deadline-axis">${points}</div>
    <div class="goal-deadline-labels"><span>${zh ? "今天" : "Today"}</span><span>${rangeDays} ${zh ? "天" : "days"}</span></div>
    <div class="goal-deadline-list">${list}</div>
  `;
}

function getSharingText() {
  const zh = getLanguage() === "zh";
  return {
    period: zh ? "\u672c\u65f6\u95f4\u6bb5" : "This period",
    signedOut: zh ? "\u5148\u767b\u5f55\uff0c\u518d\u5206\u4eab\u7edf\u8ba1\u3002" : "Sign in first to share stats.",
    noFamily: zh ? "\u5148\u521b\u5efa\u6216\u52a0\u5165\u4e00\u4e2a\u5bb6\u5ead\uff0c\u518d\u5206\u4eab\u3002" : "Create or join a family before sharing.",
    ready: zh ? "\u4ee5\u4e0b\u662f\u5c06\u8981\u5206\u4eab\u7684\u8f7b\u91cf\u6458\u8981\u3002" : "Here is the light summary that can be shared.",
    previewed: zh ? "\u9884\u89c8\u5df2\u66f4\u65b0\u3002\u4e0b\u65b9\u53ea\u662f\u6458\u8981\uff0c\u4e0d\u4f1a\u5206\u4eab\u79c1\u5bc6\u7b14\u8bb0\u3002" : "Preview updated. This is only a summary, without private notes.",
    previewSignedOut: zh ? "\u8fd9\u662f\u672c\u5730\u9884\u89c8\u3002\u767b\u5f55\u540e\u624d\u80fd\u5206\u4eab\u7ed9\u5bb6\u5ead\u3002" : "This is a local preview. Sign in to share it with family.",
    previewNoFamily: zh ? "\u8fd9\u662f\u672c\u5730\u9884\u89c8\u3002\u52a0\u5165\u5bb6\u5ead\u540e\u624d\u80fd\u4fdd\u5b58\u5206\u4eab\u3002" : "This is a local preview. Join a family to save it as shared.",
    saved: zh ? "\u5df2\u5206\u4eab\u7ed9\u5bb6\u5ead\u3002" : "Shared with family.",
    savedAvailable: zh ? "\u5df2\u5206\u4eab\u6709\u6570\u636e\u7684\u6458\u8981\uff0c\u7a7a\u7684\u65f6\u95f4\u6bb5\u5df2\u81ea\u52a8\u8df3\u8fc7\u3002" : "Shared the summaries with data. Empty periods were skipped.",
    stopped: zh ? "\u5df2\u505c\u6b62\u5206\u4eab\u8fd9\u4efd\u6458\u8981\u3002" : "Stopped sharing this summary.",
    failed: zh ? "\u6682\u65f6\u65e0\u6cd5\u5206\u4eab\u3002" : "Could not share right now.",
    stopFailed: zh ? "\u6682\u65f6\u65e0\u6cd5\u505c\u6b62\u5206\u4eab\u3002" : "Could not stop sharing right now.",
    selectOne: zh ? "\u8bf7\u81f3\u5c11\u9009\u62e9\u4e00\u4e2a\u60f3\u5206\u4eab\u7684\u6458\u8981\u3002" : "Choose at least one summary to share.",
    noShareableData: zh ? "\u8fd9\u4e2a\u65f6\u95f4\u6bb5\u8fd8\u6ca1\u6709\u53ef\u5206\u4eab\u7684\u6570\u636e\u3002\u6362\u4e00\u4e2a\u65f6\u95f4\u8303\u56f4\u8bd5\u8bd5\u3002" : "There is no shareable data in this range. Try another time range.",
    missingTable: zh
      ? "\u8fd8\u6ca1\u6709\u521b\u5efa family_shared_stats \u8868\u3002\u8bf7\u5148\u5728 Supabase SQL Editor \u8fd0\u884c supabase/create-family-shared-stats.sql\u3002"
      : "The family_shared_stats table is missing. Run supabase/create-family-shared-stats.sql in Supabase SQL Editor first.",
    loading: zh ? "\u6b63\u5728\u5206\u4eab..." : "Sharing...",
    skin: zh ? "\u76ae\u80a4" : "Skin",
    sleep: zh ? "\u8d77\u5e8a" : "Wake",
    focus: zh ? "\u4e13\u6ce8" : "Focus",
    goals: zh ? "\u76ee\u6807" : "Goals",
    health: zh ? "\u5065\u5eb7\u6570\u636e" : "Health data",
    records: zh ? "\u6761\u8bb0\u5f55" : "records",
    days: zh ? "\u5929" : "days",
    minutes: zh ? "\u5206\u949f" : "min",
    sessions: zh ? "\u8f6e" : "sessions",
    completed: zh ? "\u5df2\u5b8c\u6210" : "completed",
    open: zh ? "\u8fdb\u884c\u4e2d" : "open",
    noShared: zh ? "\u8fd8\u6ca1\u6709\u5bb6\u5ead\u6210\u5458\u5206\u4eab\u7edf\u8ba1\u6458\u8981\u3002" : "No shared personal summaries yet.",
    hidden: zh ? "\u79c1\u5bc6\u7b14\u8bb0\u4e0d\u4f1a\u88ab\u5206\u4eab" : "Private notes are not shared",
    shareTypesTitle: zh ? "\u9009\u62e9\u5206\u4eab\u5185\u5bb9" : "Choose what to share",
    shareTypesHint: zh ? "\u53ea\u4fdd\u5b58\u4f60\u9009\u4e2d\u7684\u6458\u8981" : "Only selected summaries will be saved",
    shareRangeTitle: zh ? "\u9009\u62e9\u5206\u4eab\u8303\u56f4" : "Choose a time range",
    shareRangeHint: zh ? "\u53ea\u5206\u4eab\u8fd9\u4e2a\u8303\u56f4\u7684\u8f7b\u91cf\u6458\u8981" : "Only this range will be summarized",
    dayRange: zh ? "\u4eca\u5929" : "Today",
    weekRange: zh ? "\u672c\u5468" : "This week",
    monthRange: zh ? "\u672c\u6708" : "This month",
    shared: zh ? "\u5df2\u5206\u4eab" : "Shared",
    notShared: zh ? "\u672a\u5206\u4eab" : "Not shared",
    stopSharing: zh ? "\u505c\u6b62\u5206\u4eab" : "Stop sharing",
    sharedBy: zh ? "\u6765\u81ea" : "From",
    summaries: zh ? "\u4efd\u6458\u8981" : "summaries",
    careSteady: zh ? "\u770b\u8d77\u6765\u6bd4\u8f83\u7a33\u5b9a" : "Looks steady",
    careCheckIn: zh ? "\u53ef\u4ee5\u6e29\u67d4\u5173\u5fc3\u4e00\u4e0b" : "Worth a gentle check-in",
    careLimited: zh ? "\u4fe1\u53f7\u8fd8\u5f88\u5c11" : "Not much shared yet",
    skinSignal: zh ? "\u76ae\u80a4\u72b6\u6001" : "Skin state",
    wakeSignal: zh ? "\u5e73\u5747\u8d77\u5e8a" : "Avg wake",
    focusSignal: zh ? "\u4e13\u6ce8\u53d8\u5316" : "Focus change",
    goalsSignal: zh ? "\u76ee\u6807\u72b6\u6001" : "Goal state",
    healthSignal: zh ? "\u5065\u5eb7\u8d8b\u52bf" : "Health trend",
    noSignal: zh ? "\u8fd8\u6ca1\u6709\u53ef\u5224\u65ad\u7684\u72b6\u6001\u53d8\u5316" : "No clear state change yet",
    laterThanBefore: zh ? "\u6bd4\u4e0a\u6b21\u665a" : "later than last share",
    earlierThanBefore: zh ? "\u6bd4\u4e0a\u6b21\u65e9" : "earlier than last share",
    lessThanBefore: zh ? "\u6bd4\u4e0a\u6b21\u5c11" : "less than last share",
    moreThanBefore: zh ? "\u6bd4\u4e0a\u6b21\u591a" : "more than last share",
    openGoalsWaiting: zh ? "\u8fd8\u6709\u76ee\u6807\u5728\u7b49\u5f85" : "open goals waiting",
    latest: zh ? "\u6700\u65b0" : "Latest",
    top: zh ? "\u4e3b\u8981" : "Top",
    noData: zh ? "\u6682\u65e0\u6570\u636e" : "No data",
    noDataInRange: zh ? "\u8fd9\u4e2a\u65f6\u95f4\u6bb5\u6ca1\u6709\u6570\u636e" : "No data in this range",
  };
}

function getSharedStatsPeriod(days = getStatsDays()) {
  const list = days.length ? days : recentDays(7);
  return {
    periodStart: list[0],
    periodEnd: list[list.length - 1],
  };
}

function getSharedStatsDaysForRange(range = getSelectedSharedStatsRange()) {
  if (range === "day") return recentDays(1);
  if (range === "month") return recentDays(30);
  return recentDays(7);
}

function getSharedStatsTypeOptions() {
  const text = getSharingText();
  return [
    { key: "skin", label: text.skin },
    { key: "sleep", label: text.sleep },
    { key: "focus", label: text.focus },
    { key: "goals", label: text.goals },
    { key: "health", label: text.health },
  ];
}

function getSharedStatsRangeOptions() {
  const text = getSharingText();
  return [
    { key: "day", label: text.dayRange },
    { key: "week", label: text.weekRange },
    { key: "month", label: text.monthRange },
  ];
}

function getSelectedSharedStatsTypes() {
  state.settings.sharedStatsTypes = normalizeSharedStatsTypes(state.settings.sharedStatsTypes);
  return state.settings.sharedStatsTypes;
}

function getSelectedSharedStatsRange() {
  state.settings.sharedStatsRange = normalizeSharedStatsRange(state.settings.sharedStatsRange);
  return state.settings.sharedStatsRange;
}

function getSelectedSharedStatsRangeLabel() {
  const selected = getSelectedSharedStatsRange();
  return getSharedStatsRangeOptions().find((item) => item.key === selected)?.label || getSharingText().weekRange;
}

function handleSharedStatsTypeToggle(event) {
  const button = event.target.closest("[data-shared-stats-type]");
  if (!button) return;
  const type = button.dataset.sharedStatsType;
  if (!shareableStatsTypes.includes(type)) return;
  const selected = new Set(getSelectedSharedStatsTypes());
  if (selected.has(type)) {
    selected.delete(type);
  } else {
    selected.add(type);
  }
  state.settings.sharedStatsTypes = shareableStatsTypes.filter((item) => selected.has(item));
  sharedStatsError = false;
  sharedStatsMessage = getSharingText().previewed;
  saveState();
  renderPersonalSharedStats();
}

function handleSharedStatsRangeToggle(event) {
  const button = event.target.closest("[data-shared-stats-range]");
  if (!button) return;
  const range = button.dataset.sharedStatsRange;
  if (!shareableStatsRanges.includes(range)) return;
  state.settings.sharedStatsRange = range;
  sharedStatsError = false;
  sharedStatsMessage = getSharingText().previewed;
  saveState();
  renderPersonalSharedStats();
}

function renderSharedStatsTypeControls() {
  const target = $("#personalShareTypes");
  if (!target) return;
  const text = getSharingText();
  const selected = new Set(getSelectedSharedStatsTypes());
  target.innerHTML = `
    <div>
      <span>${escapeHtml(text.shareTypesTitle)}</span>
      <small>${escapeHtml(text.shareTypesHint)}</small>
    </div>
    <div class="shared-stats-type-options">
      ${getSharedStatsTypeOptions().map((item) => `
        <button class="shared-stats-type${selected.has(item.key) ? " active" : ""}" type="button" data-shared-stats-type="${escapeHtml(item.key)}" aria-pressed="${selected.has(item.key) ? "true" : "false"}">
          <i aria-hidden="true"></i>
          ${escapeHtml(item.label)}
        </button>
      `).join("")}
    </div>
  `;
}

function renderSharedStatsRangeControls() {
  const target = $("#personalShareRange");
  if (!target) return;
  const text = getSharingText();
  const selected = getSelectedSharedStatsRange();
  target.innerHTML = `
    <div>
      <span>${escapeHtml(text.shareRangeTitle)}</span>
      <small>${escapeHtml(text.shareRangeHint)}</small>
    </div>
    <div class="shared-stats-type-options">
      ${getSharedStatsRangeOptions().map((item) => `
        <button class="shared-stats-type${selected === item.key ? " active" : ""}" type="button" data-shared-stats-range="${escapeHtml(item.key)}" aria-pressed="${selected === item.key ? "true" : "false"}">
          <i aria-hidden="true"></i>
          ${escapeHtml(item.label)}
        </button>
      `).join("")}
    </div>
  `;
}

function getSharedStatsSnapshots(days = getStatsDays(), summaryTypes = getSelectedSharedStatsTypes()) {
  const family = getActiveFamily();
  const period = getSharedStatsPeriod(days);
  return window.MyCare.sharing.buildPersonalStatsSnapshots(state, {
    familyId: family?.id || "",
    periodStart: period.periodStart,
    periodEnd: period.periodEnd,
    summaryTypes,
  });
}

function hasSharedStatsData(snapshot) {
  return window.MyCare.sharing.hasSummaryData(snapshot);
}

function formatSharedStatsValue(snapshot) {
  const text = getSharingText();
  const payload = snapshot.payload || {};
  if (snapshot.summaryType === "skin") {
    const topStatus = payload.topStatus ? formatSkinStateLabel(payload.topStatus) : "-";
    return `${payload.totalDays || 0} ${text.days} · ${topStatus}`;
  }
  if (snapshot.summaryType === "sleep") {
    return payload.averageWakeTime
      ? `${payload.averageWakeTime} · ${payload.recordCount || 0} ${text.records}`
      : `0 ${text.records}`;
  }
  if (snapshot.summaryType === "focus") {
    const category = payload.topCategory ? displayFocusCategory(payload.topCategory) : "-";
    return `${payload.minutes || 0} ${text.minutes} · ${category}`;
  }
  if (snapshot.summaryType === "goals") {
    return `${payload.completed || 0} ${text.completed} · ${payload.open || 0} ${text.open}`;
  }
  if (snapshot.summaryType === "health") {
    const sleep = Number.isFinite(payload.averageSleepMinutes) ? formatHealthDuration(payload.averageSleepMinutes) : "-";
    const steps = Number(payload.stepsTotal || 0).toLocaleString();
    return `${sleep} · ${steps} ${getLanguage() === "zh" ? "步" : "steps"}`;
  }
  return "-";
}

function getSharedStatsTitle(type) {
  const text = getSharingText();
  return {
    skin: text.skin,
    sleep: text.sleep,
    focus: text.focus,
    goals: text.goals,
    health: text.health,
  }[type] || type;
}

function findSharedStatForSnapshot(snapshot) {
  if (!currentUser) return null;
  return (familyState.sharedStats || []).find((item) => item.visible !== false
    && item.ownerId === currentUser.id
    && item.familyId === snapshot.familyId
    && item.periodStart === snapshot.periodStart
    && item.periodEnd === snapshot.periodEnd
    && item.summaryType === snapshot.summaryType) || null;
}

function renderPersonalSharedStats(days = getSharedStatsDaysForRange()) {
  const preview = $("#personalSharePreview");
  const summary = $("#personalShareSummary");
  const message = $("#sharedStatsMessage");
  const saveButton = $("#saveSharedStats");
  const previewButton = $("#previewSharedStats");
  if (!preview || !summary || !message || !saveButton || !previewButton) return;
  const text = getSharingText();
  const family = getActiveFamily();
  const signedIn = Boolean(supabaseClient && currentUser);
  const period = getSharedStatsPeriod(days);
  const selectedTypes = getSelectedSharedStatsTypes();
  const hasSelectedTypes = selectedTypes.length > 0;

  summary.innerHTML = summaryPills([
    [getSelectedSharedStatsRangeLabel(), text.period],
    [selectedTypes.length, text.shareTypesTitle],
  ]);
  message.classList.toggle("is-error", sharedStatsError);
  message.textContent = sharedStatsMessage || (!hasSelectedTypes ? text.selectOne : !signedIn ? text.previewSignedOut : !family ? text.previewNoFamily : text.ready);
  saveButton.disabled = !signedIn || !family || !hasSelectedTypes;
  previewButton.disabled = false;
  renderSharedStatsTypeControls();
  renderSharedStatsRangeControls();

  const snapshots = getSharedStatsSnapshots(days, selectedTypes);
  preview.innerHTML = snapshots.length
    ? snapshots.map((snapshot) => `
    ${renderSharedStatsPreviewCard(snapshot, period)}
  `).join("")
    : `<div class="shared-stats-state">${escapeHtml(text.selectOne)}</div>`;
}

function renderSharedStatsPreviewCard(snapshot, period) {
  const text = getSharingText();
  const shared = findSharedStatForSnapshot(snapshot);
  const hasData = hasSharedStatsData(snapshot);
  return `
    <article class="shared-stat-preview-card${shared ? " is-shared" : ""}${hasData ? "" : " is-empty"}" data-shared-type="${escapeHtml(snapshot.summaryType)}">
      <div class="shared-stat-preview-top">
        <span>${escapeHtml(getSharedStatsTitle(snapshot.summaryType))}</span>
        <em>${escapeHtml(shared ? text.shared : hasData ? text.notShared : text.noDataInRange)}</em>
      </div>
      <strong>${escapeHtml(hasData ? formatSharedStatsValue(snapshot) : text.noDataInRange)}</strong>
      <small>${escapeHtml(period.periodStart)} - ${escapeHtml(period.periodEnd)}</small>
      ${shared ? `<button class="shared-stat-stop" type="button" data-shared-stat-action="stop" data-shared-stat-id="${escapeHtml(shared.id)}">${escapeHtml(text.stopSharing)}</button>` : ""}
    </article>
  `;
}

async function handleSharedStatsPreviewAction(event) {
  const button = event.target.closest("[data-shared-stat-action='stop']");
  if (!button) return;
  const statId = button.dataset.sharedStatId;
  const text = getSharingText();
  if (!statId || !supabaseClient || !currentUser) return;
  button.disabled = true;
  try {
    await window.MyCare.sharing.setSharedStatVisibility(supabaseClient, currentUser, statId, false);
    familyState.sharedStats = (familyState.sharedStats || []).map((item) => (
      item.id === statId ? { ...item, visible: false } : item
    ));
    sharedStatsError = false;
    sharedStatsMessage = text.stopped;
    renderPersonalSharedStats();
    renderFamilyStats(getStatsDays());
  } catch (error) {
    console.error("Stopping shared stat failed", error);
    sharedStatsError = true;
    sharedStatsMessage = `${text.stopFailed} ${error?.message || ""}`.trim();
    renderPersonalSharedStats();
  }
}

async function sharePersonalStatsWithFamily() {
  const family = getActiveFamily();
  const text = getSharingText();
  if (!supabaseClient || !currentUser) {
    sharedStatsMessage = text.signedOut;
    renderPersonalSharedStats();
    return;
  }
  if (!family) {
    sharedStatsMessage = text.noFamily;
    renderPersonalSharedStats();
    return;
  }
  const selectedTypes = getSelectedSharedStatsTypes();
  if (!selectedTypes.length) {
    sharedStatsError = true;
    sharedStatsMessage = text.selectOne;
    renderPersonalSharedStats();
    return;
  }
  try {
    sharedStatsError = false;
    sharedStatsMessage = text.loading;
    renderPersonalSharedStats();
    const snapshots = getSharedStatsSnapshots(getSharedStatsDaysForRange(), selectedTypes);
    const shareableSnapshots = snapshots.filter(hasSharedStatsData);
    if (!shareableSnapshots.length) {
      sharedStatsError = true;
      sharedStatsMessage = text.noShareableData;
      renderPersonalSharedStats();
      return;
    }
    const saved = await window.MyCare.sharing.saveSharedStats(supabaseClient, currentUser, shareableSnapshots);
    familyState.sharedStats = mergeSharedStats(familyState.sharedStats, saved);
    sharedStatsError = false;
    sharedStatsMessage = shareableSnapshots.length < snapshots.length ? text.savedAvailable : text.saved;
    renderPersonalSharedStats();
    renderFamilyStats(getStatsDays());
  } catch (error) {
    console.error("Sharing stats failed", error);
    sharedStatsError = true;
    const message = String(error?.message || "");
    sharedStatsMessage = message.includes("family_shared_stats")
      ? text.missingTable
      : `${text.failed} ${message}`.trim();
    renderPersonalSharedStats();
  }
}

function mergeSharedStats(current = [], updates = []) {
  const byId = new Map(current.map((item) => [item.id, item]));
  updates.forEach((item) => byId.set(item.id, item));
  return [...byId.values()].sort((a, b) => String(b.periodEnd || "").localeCompare(String(a.periodEnd || "")));
}

function getSharedStatsOwnerLabel(ownerId) {
  const member = familyState.members.find((item) => item.userId === ownerId);
  if (member?.email) return member.email;
  if (currentUser?.id === ownerId) return currentUser.email || "Me";
  return String(ownerId || "").slice(0, 8) || "Family member";
}

function sortSharedStatsNewest(items = []) {
  return [...items].sort((a, b) => String(b.periodEnd || "").localeCompare(String(a.periodEnd || ""))
    || String(b.updatedAt || b.createdAt || "").localeCompare(String(a.updatedAt || a.createdAt || "")));
}

function sortSharedStatsOldest(items = []) {
  return [...items].sort((a, b) => String(a.periodEnd || "").localeCompare(String(b.periodEnd || ""))
    || String(a.updatedAt || a.createdAt || "").localeCompare(String(b.updatedAt || b.createdAt || "")));
}

function getSharedStatsVisualModels(items = []) {
  const byType = new Map();
  sortSharedStatsNewest(items).forEach((item) => {
    if (!byType.has(item.summaryType)) byType.set(item.summaryType, []);
    byType.get(item.summaryType).push(item);
  });
  return shareableStatsTypes
    .filter((type) => byType.has(type))
    .map((type) => {
      const newest = byType.get(type);
      return {
        type,
        latest: newest[0],
        previous: newest[1] || null,
        series: sortSharedStatsOldest(newest).slice(-6),
      };
    });
}

function getSkinStatusColor(status) {
  const value = String(status || "").trim().toLowerCase();
  if (["stable", "\u7a33\u5b9a", "绋冲畾"].includes(value)) return "#82a98f";
  if (["dry", "\u5e72\u71e5", "骞茬嚗"].includes(value)) return "#c2a96f";
  if (["acne", "\u75d8\u75d8", "breakout", "\u7206\u75d8"].includes(value)) return "#c58e91";
  if (["sensitive", "\u654f\u611f", "irritated"].includes(value)) return "#a99ac6";
  if (["oily", "\u51fa\u6cb9"].includes(value)) return "#7faeb2";
  return "#9eb79d";
}

function renderMiniSparkline(values = [], options = {}) {
  const nums = values.map(Number).filter(Number.isFinite);
  if (!nums.length) return `<div class="family-shared-mini-empty">${escapeHtml(getSharingText().noData)}</div>`;
  const padded = nums.length === 1 ? [nums[0], nums[0]] : nums;
  const min = Math.min(...padded);
  const max = Math.max(...padded);
  const range = Math.max(max - min, 1);
  const points = padded.map((value, index) => {
    const x = padded.length === 1 ? 50 : (index / (padded.length - 1)) * 100;
    const normalized = (value - min) / range;
    const y = options.invert ? 32 - normalized * 26 : 6 + normalized * 26;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  const last = points.split(" ").at(-1) || "100,19";
  const [lastX, lastY] = last.split(",");
  return `
    <svg class="family-shared-sparkline" viewBox="0 0 100 38" aria-hidden="true" focusable="false">
      <path d="M0 33 H100" />
      <polyline points="${points}" />
      <circle cx="${lastX}" cy="${lastY}" r="2.8" />
    </svg>
  `;
}

function renderSkinSharedChart(item) {
  const text = getSharingText();
  const payload = item.payload || {};
  const counts = payload.counts && typeof payload.counts === "object" ? payload.counts : {};
  const entries = Object.entries(counts).filter(([, value]) => Number(value) > 0);
  const fallbackStatus = payload.topStatus || "";
  const chartEntries = entries.length ? entries : (fallbackStatus ? [[fallbackStatus, payload.totalDays || 1]] : []);
  const total = chartEntries.reduce((sum, [, value]) => sum + Number(value || 0), 0) || 1;
  return `
    <div class="family-shared-stack" aria-label="${escapeHtml(text.skin)}">
      ${chartEntries.map(([status, value]) => `
        <i style="--share-segment-color:${getSkinStatusColor(status)};--share-segment-size:${Math.max(7, (Number(value || 0) / total) * 100)}%"></i>
      `).join("")}
    </div>
    <div class="family-shared-legend">
      ${chartEntries.slice(0, 4).map(([status, value]) => `
        <span><i style="--share-segment-color:${getSkinStatusColor(status)}"></i>${escapeHtml(formatSkinStateLabel(status))} ${Number(value || 0)}</span>
      `).join("") || `<span>${escapeHtml(text.noData)}</span>`}
    </div>
    <p>${escapeHtml(text.top)}: ${escapeHtml(fallbackStatus ? formatSkinStateLabel(fallbackStatus) : "-")} · ${Number(payload.totalDays || 0)} ${escapeHtml(text.days)}</p>
  `;
}

function renderWakeSharedChart(model) {
  const text = getSharingText();
  const payload = model.latest.payload || {};
  const values = model.series.map((item) => minutesFromClockText(item.payload?.averageWakeTime)).filter(Number.isFinite);
  const latestMinutes = minutesFromClockText(payload.averageWakeTime);
  const marker = Number.isFinite(latestMinutes) ? Math.min(100, Math.max(0, ((latestMinutes - 300) / 480) * 100)) : 50;
  return `
    ${renderMiniSparkline(values, { invert: false })}
    <div class="family-shared-time-scale">
      <span>5</span>
      <i style="--wake-marker:${marker}%"></i>
      <span>13</span>
    </div>
    <p>${escapeHtml(text.latest)}: ${escapeHtml(payload.averageWakeTime || "-")} · ${Number(payload.recordCount || 0)} ${escapeHtml(text.records)}</p>
  `;
}

function renderFocusSharedChart(model) {
  const text = getSharingText();
  const payload = model.latest.payload || {};
  const values = model.series.map((item) => Number(item.payload?.minutes || 0));
  const max = Math.max(...values, Number(payload.minutes || 0), 1);
  return `
    <div class="family-shared-bars">
      ${values.length ? values.map((value) => `
        <i style="--share-bar-height:${Math.max(8, (value / max) * 100)}%"></i>
      `).join("") : `<span>${escapeHtml(text.noData)}</span>`}
    </div>
    <p>${Number(payload.minutes || 0)} ${escapeHtml(text.minutes)} · ${Number(payload.sessions || 0)} ${escapeHtml(text.sessions)}</p>
    <small>${escapeHtml(payload.topCategory ? displayFocusCategory(payload.topCategory) : "-")}</small>
  `;
}

function renderGoalsSharedChart(item) {
  const text = getSharingText();
  const payload = item.payload || {};
  const completed = Number(payload.completed || 0);
  const open = Number(payload.open || 0);
  const total = Math.max(completed + open, 1);
  const completedPct = Math.round((completed / total) * 100);
  return `
    <div class="family-shared-donut" style="--goal-done:${completedPct}%">
      <strong>${completedPct}%</strong>
    </div>
    <p>${completed} ${escapeHtml(text.completed)} · ${open} ${escapeHtml(text.open)}</p>
  `;
}

function renderImportedHealthSharedChart(model) {
  const text = getSharingText();
  const payload = model.latest.payload || {};
  const zh = getLanguage() === "zh";
  const sleepValues = model.series
    .map((item) => Number(item.payload?.averageSleepMinutes))
    .filter(Number.isFinite);
  const stepsValues = model.series
    .map((item) => Number(item.payload?.stepsTotal || 0))
    .filter(Number.isFinite);
  const sleep = Number.isFinite(payload.averageSleepMinutes) ? formatHealthDuration(payload.averageSleepMinutes) : "-";
  const steps = Number(payload.stepsTotal || 0).toLocaleString();
  const active = formatHealthDuration(Number(payload.activeMinutesTotal || 0));
  const energy = Number(payload.activeEnergyTotal || 0) ? `${Math.round(Number(payload.activeEnergyTotal || 0)).toLocaleString()} kcal` : "-";
  const heart = Number(payload.heartRateAverage || 0) ? `${Math.round(Number(payload.heartRateAverage || 0))} bpm` : "-";
  const recovery = Number(payload.recoveryRecords || 0);
  return `
    ${sleepValues.length ? renderMiniSparkline(sleepValues, { invert: false }) : renderMiniSparkline(stepsValues, { invert: false })}
    <div class="family-shared-health-grid">
      <span><b>${escapeHtml(sleep)}</b><small>${escapeHtml(zh ? "平均睡眠" : "Avg sleep")}</small></span>
      <span><b>${escapeHtml(steps)}</b><small>${escapeHtml(zh ? "步数" : "Steps")}</small></span>
      <span><b>${escapeHtml(active)}</b><small>${escapeHtml(zh ? "活动" : "Active")}</small></span>
      <span><b>${escapeHtml(energy)}</b><small>${escapeHtml(zh ? "活动能量" : "Energy")}</small></span>
      <span><b>${escapeHtml(heart)}</b><small>${escapeHtml(zh ? "心率" : "Heart rate")}</small></span>
      <span><b>${escapeHtml(recovery)}</b><small>${escapeHtml(zh ? "恢复指标" : "Recovery")}</small></span>
    </div>
    <p>${Number(payload.recordCount || 0)} ${escapeHtml(text.records)} · ${escapeHtml(text.hidden)}</p>
  `;
}

function renderFamilySharedVisualCard(model) {
  const text = getSharingText();
  const item = model.latest;
  let chart = "";
  if (model.type === "skin") chart = renderSkinSharedChart(item);
  if (model.type === "sleep") chart = renderWakeSharedChart(model);
  if (model.type === "focus") chart = renderFocusSharedChart(model);
  if (model.type === "goals") chart = renderGoalsSharedChart(item);
  if (model.type === "health") chart = renderImportedHealthSharedChart(model);
  return `
    <article class="family-shared-visual-card" data-shared-type="${escapeHtml(model.type)}">
      <div class="family-shared-visual-top">
        <span>${escapeHtml(getSharedStatsTitle(model.type))}</span>
        <small>${escapeHtml(item.periodStart)} - ${escapeHtml(item.periodEnd)}</small>
      </div>
      <div class="family-shared-visual-body">
        ${chart || `<p>${escapeHtml(formatSharedStatsValue(item))}</p>`}
      </div>
    </article>
  `;
}

function renderFamilySharedStats(days = getStatsDays()) {
  const target = $("#familySharedStatsList");
  if (!target) return;
  const text = getSharingText();
  const { periodStart, periodEnd } = getSharedStatsPeriod(days);
  const stats = (familyState.sharedStats || [])
    .filter((item) => item.visible !== false)
    .filter(hasSharedStatsData)
    .filter((item) => !(item.periodEnd < periodStart || item.periodStart > periodEnd));
  if (!stats.length) {
    target.innerHTML = `<div class="stats-empty">${escapeHtml(text.noShared)}</div>`;
    return;
  }
  const groups = stats.reduce((acc, item) => {
    const key = item.ownerId || "unknown";
    if (!acc.has(key)) acc.set(key, []);
    acc.get(key).push(item);
    return acc;
  }, new Map());
  target.innerHTML = [...groups.entries()].slice(0, 6).map(([ownerId, items]) => `
    <section class="family-shared-stat-group family-shared-stat-group-visual">
      <header>
        <h5>${escapeHtml(getSharedStatsOwnerLabel(ownerId))}</h5>
        <small>${items.length} ${escapeHtml(text.summaries)}</small>
      </header>
      <div class="family-shared-visual-grid">
        ${getSharedStatsVisualModels(items).map(renderFamilySharedVisualCard).join("")}
      </div>
    </section>
  `).join("");
}

function getFamilySharedStatsInRange(days = getStatsDays()) {
  const { periodStart, periodEnd } = getSharedStatsPeriod(days);
  return (familyState.sharedStats || [])
    .filter((item) => item.visible !== false)
    .filter(hasSharedStatsData)
    .filter((item) => !(item.periodEnd < periodStart || item.periodStart > periodEnd));
}

function createFamilyMemberOverviewRow(ownerId) {
  return {
    ownerId,
    label: getSharedStatsOwnerLabel(ownerId),
    summaries: 0,
    focusMinutes: 0,
    focusSessions: 0,
    goalCompleted: 0,
    skinDays: 0,
    wakeRecords: 0,
    healthRecords: 0,
    types: new Set(),
    byType: {},
  };
}

function getFamilyMemberOverviewRows(days = getStatsDays()) {
  const stats = getFamilySharedStatsInRange(days)
    .sort((a, b) => String(b.periodEnd || "").localeCompare(String(a.periodEnd || ""))
      || String(b.updatedAt || b.createdAt || "").localeCompare(String(a.updatedAt || a.createdAt || "")));
  const rows = new Map();
  familyState.members.forEach((member) => {
    rows.set(member.userId, createFamilyMemberOverviewRow(member.userId));
  });
  stats.forEach((item) => {
    const ownerId = item.ownerId || "unknown";
    if (!rows.has(ownerId)) {
      rows.set(ownerId, createFamilyMemberOverviewRow(ownerId));
    }
    const row = rows.get(ownerId);
    const payload = item.payload || {};
    row.summaries += 1;
    row.types.add(item.summaryType);
    if (!row.byType[item.summaryType]) {
      row.byType[item.summaryType] = { latest: item, previous: null };
    } else if (!row.byType[item.summaryType].previous) {
      row.byType[item.summaryType].previous = item;
    }
    if (item.summaryType === "focus") {
      row.focusMinutes += Number(payload.minutes || 0);
      row.focusSessions += Number(payload.sessions || 0);
    }
    if (item.summaryType === "goals") {
      row.goalCompleted += Number(payload.completed || 0);
    }
    if (item.summaryType === "skin") {
      row.skinDays += Number(payload.totalDays || 0);
    }
    if (item.summaryType === "sleep") {
      row.wakeRecords += Number(payload.recordCount || 0);
    }
    if (item.summaryType === "health") {
      row.healthRecords += Number(payload.recordCount || 0);
    }
  });
  return [...rows.values()];
}

function minutesFromClockText(value = "") {
  const match = String(value || "").match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return null;
  const hour = Number(match[1]);
  const minute = Number(match[2]);
  if (!Number.isFinite(hour) || !Number.isFinite(minute)) return null;
  return hour * 60 + minute;
}

function formatMinuteDelta(minutes) {
  const absolute = Math.abs(Math.round(minutes));
  if (absolute < 60) return `${absolute}m`;
  const hours = Math.floor(absolute / 60);
  const mins = absolute % 60;
  return mins ? `${hours}h ${mins}m` : `${hours}h`;
}

function isStableSkinStatus(status = "") {
  return ["stable", "\u7a33\u5b9a", "\u7a33\u5b9a", "绋冲畾"].includes(String(status || "").trim().toLowerCase())
    || formatSkinStateLabel(status).toLowerCase() === "stable";
}

function getMemberCareSignals(row) {
  const text = getSharingText();
  const signals = [];
  let concernScore = 0;
  const skin = row.byType.skin;
  const sleep = row.byType.sleep;
  const health = row.byType.health;
  const focus = row.byType.focus;
  const goals = row.byType.goals;

  if (skin?.latest?.payload?.topStatus) {
    const current = skin.latest.payload.topStatus;
    const previous = skin.previous?.payload?.topStatus || "";
    const label = formatSkinStateLabel(current);
    const changed = previous && previous !== current;
    const concern = !isStableSkinStatus(current);
    if (concern) concernScore += 1;
    signals.push({
      type: "skin",
      concern,
      label: text.skinSignal,
      value: label,
      detail: changed ? `${formatSkinStateLabel(previous)} → ${label}` : `${skin.latest.payload.totalDays || 0} ${text.days}`,
    });
  }

  if (sleep?.latest?.payload?.averageWakeTime) {
    const current = sleep.latest.payload.averageWakeTime;
    const previous = sleep.previous?.payload?.averageWakeTime || "";
    const currentMinutes = minutesFromClockText(current);
    const previousMinutes = minutesFromClockText(previous);
    const delta = Number.isFinite(currentMinutes) && Number.isFinite(previousMinutes)
      ? currentMinutes - previousMinutes
      : 0;
    const hasDelta = Number.isFinite(currentMinutes) && Number.isFinite(previousMinutes);
    const concern = hasDelta && delta > 45;
    if (concern) concernScore += 1;
    signals.push({
      type: "sleep",
      concern,
      label: text.wakeSignal,
      value: current,
      detail: hasDelta && Math.abs(delta) >= 15
        ? `${formatMinuteDelta(delta)} ${delta > 0 ? text.laterThanBefore : text.earlierThanBefore}`
        : `${sleep.latest.payload.recordCount || 0} ${text.records}`,
    });
  }

  if (health?.latest) {
    const payload = health.latest.payload || {};
    const previous = health.previous?.payload || null;
    const currentSleep = Number(payload.averageSleepMinutes);
    const previousSleep = Number(previous?.averageSleepMinutes);
    const hasSleepDelta = Number.isFinite(currentSleep) && Number.isFinite(previousSleep);
    const sleepDelta = hasSleepDelta ? currentSleep - previousSleep : 0;
    const concern = (Number.isFinite(currentSleep) && currentSleep > 0 && currentSleep < 360) || (hasSleepDelta && sleepDelta < -60);
    if (concern) concernScore += 1;
    signals.push({
      type: "health",
      concern,
      label: text.healthSignal,
      value: Number.isFinite(currentSleep) ? formatHealthDuration(currentSleep) : `${Number(payload.stepsTotal || 0).toLocaleString()} ${getLanguage() === "zh" ? "步" : "steps"}`,
      detail: hasSleepDelta && Math.abs(sleepDelta) >= 30
        ? `${formatMinuteDelta(sleepDelta)} ${sleepDelta < 0 ? text.lessThanBefore : text.moreThanBefore}`
        : `${payload.recordCount || 0} ${text.records}`,
    });
  }

  if (focus?.latest) {
    const current = Number(focus.latest.payload?.minutes || 0);
    const previous = focus.previous ? Number(focus.previous.payload?.minutes || 0) : null;
    const delta = previous === null ? 0 : current - previous;
    const concern = previous !== null && delta < -20;
    if (concern) concernScore += 1;
    signals.push({
      type: "focus",
      concern,
      label: text.focusSignal,
      value: `${current} ${text.minutes}`,
      detail: previous !== null && Math.abs(delta) >= 10
        ? `${formatMinuteDelta(delta)} ${delta < 0 ? text.lessThanBefore : text.moreThanBefore}`
        : `${focus.latest.payload?.sessions || 0} ${text.sessions}`,
    });
  }

  if (goals?.latest) {
    const completed = Number(goals.latest.payload?.completed || 0);
    const open = Number(goals.latest.payload?.open || 0);
    const concern = open > 0 && completed === 0;
    if (concern) concernScore += 1;
    signals.push({
      type: "goals",
      concern,
      label: text.goalsSignal,
      value: `${completed} ${text.completed}`,
      detail: open > 0 ? `${open} ${text.open} · ${text.openGoalsWaiting}` : text.careSteady,
    });
  }

  return {
    concernScore,
    level: !row.summaries ? "quiet" : concernScore > 0 ? "check" : "steady",
    signals,
  };
}

function renderFamilyMemberOverview(days = getStatsDays()) {
  const target = $("#familyMemberOverviewChart");
  if (!target) return;
  const text = getSharingText();
  const rows = getFamilyMemberOverviewRows(days);
  const hasShared = rows.some((row) => row.summaries > 0);
  if (!hasShared) {
    target.innerHTML = `<div class="stats-empty">${escapeHtml(text.noShared)}</div>`;
    return;
  }
  const maxSummaries = Math.max(...rows.map((row) => row.summaries), 1);
  const maxFocus = Math.max(...rows.map((row) => row.focusMinutes), 1);
  const maxCare = Math.max(...rows.map((row) => row.skinDays + row.wakeRecords), 1);
  target.innerHTML = rows.map((row) => {
    const care = getMemberCareSignals(row);
    const initial = (row.label || "?").trim().charAt(0).toUpperCase();
    const typeIcons = shareableStatsTypes.map((type) => `
      <span class="${row.types.has(type) ? "active" : ""}" data-member-type="${escapeHtml(type)}" title="${escapeHtml(getSharedStatsTitle(type))}">
        <i aria-hidden="true"></i>${escapeHtml(getSharedStatsTitle(type))}
      </span>
    `).join("");
    const careTotal = row.skinDays + row.wakeRecords;
    const careOpacity = Math.max(0.25, Math.min(1, careTotal / maxCare));
    const signalCards = care.signals.length
      ? care.signals.map((signal) => `
        <div class="family-member-signal${signal.concern ? " is-concern" : ""}" data-signal-type="${escapeHtml(signal.type)}">
          <span>${escapeHtml(signal.label)}</span>
          <strong>${escapeHtml(signal.value)}</strong>
          <small>${escapeHtml(signal.detail)}</small>
        </div>
      `).join("")
      : `<div class="family-member-signal is-muted"><span>${escapeHtml(text.noSignal)}</span></div>`;
    return `
      <article class="family-member-row${row.summaries ? "" : " is-quiet"}" data-care-level="${escapeHtml(care.level)}" style="--member-width:${(row.summaries / maxSummaries) * 100}%;--member-focus:${(row.focusMinutes / maxFocus) * 100}%;--member-care-opacity:${careOpacity}">
        <div class="family-member-row-head">
          <div class="family-member-person">
            <span class="family-member-avatar" aria-hidden="true">${escapeHtml(initial)}</span>
            <div>
              <strong>${escapeHtml(row.label)}</strong>
              <small>${row.summaries} ${escapeHtml(text.summaries)}</small>
            </div>
          </div>
          <div class="family-member-types">${typeIcons}</div>
        </div>
        <div class="family-member-care-banner">
          <i aria-hidden="true"></i>
          <span>${escapeHtml(care.level === "check" ? text.careCheckIn : care.level === "quiet" ? text.careLimited : text.careSteady)}</span>
        </div>
        <div class="family-member-state-list">${signalCards}</div>
        <div class="family-member-metrics">
          <span><b>${escapeHtml(text.focus)}</b>${row.focusMinutes} ${escapeHtml(text.minutes)}</span>
          <span><b>${escapeHtml(text.goals)}</b>${row.goalCompleted} ${escapeHtml(text.completed)}</span>
          <span><b>${escapeHtml(text.skin)}</b>${row.skinDays} ${escapeHtml(text.days)}</span>
          <span><b>${escapeHtml(text.sleep)}</b>${row.wakeRecords} ${escapeHtml(text.records)}</span>
          <span><b>${escapeHtml(text.health)}</b>${row.healthRecords} ${escapeHtml(text.records)}</span>
        </div>
      </article>
    `;
  }).join("");
}

function renderFamilyStats(days) {
  const grid = $("#familyStatsGrid");
  const empty = $("#familyStatsEmpty");
  const summary = $("#familyStatsSummary");
  if (!grid || !empty || !summary) return;
  const zh = getLanguage() === "zh";
  const signedIn = Boolean(supabaseClient && currentUser);
  const family = getActiveFamily();

  if (!signedIn) {
    grid.hidden = true;
    summary.innerHTML = "";
    empty.hidden = false;
    empty.textContent = zh ? "登录后可以查看家庭统计。" : "Sign in to see family stats.";
    return;
  }
  if (!family) {
    grid.hidden = true;
    summary.innerHTML = "";
    empty.hidden = false;
    empty.textContent = zh ? "先创建或加入一个家庭，再查看家庭统计。" : "Create or join a family to see family stats.";
    return;
  }
  if (familyState.loading && !familyState.goals.length) {
    grid.hidden = true;
    summary.innerHTML = "";
    empty.hidden = false;
    empty.textContent = zh ? "正在读取家庭统计..." : "Loading family stats...";
    return;
  }

  const goals = familyState.goals || [];
  const sharedStats = familyState.sharedStats || [];
  if (!goals.length && !sharedStats.length) {
    grid.hidden = true;
    summary.innerHTML = summaryPills([
      [0, zh ? "家庭目标" : "Family goals"],
      [0, zh ? "已完成" : "Completed"],
    ]);
    empty.hidden = false;
    empty.textContent = zh ? "还没有家庭目标。添加一个共享目标后，这里会自动生成统计。" : "No family goals yet. Add a shared goal and stats will appear here.";
    return;
  }

  grid.hidden = false;
  empty.hidden = true;
  const goalStats = window.MyCare.family.buildFamilyGoalStats(goals, {
    days,
    range: selectedStatsRange,
    todayDateText: todayKey(),
    uncategorizedLabel: zh ? "未分类" : "Uncategorized",
  });
  const {
    categoryTotals,
    completedInRange,
    dueSoon,
    inProgress,
    openGoals,
    overdue,
    relevantGoals,
  } = goalStats;
  const completionRate = relevantGoals.length
    ? Math.round((relevantGoals.filter((goal) => goal.status === "done").length / relevantGoals.length) * 100)
    : 0;

  summary.innerHTML = summaryPills([
    [openGoals.length, zh ? "进行中" : "Open"],
    [completedInRange.length, zh ? "已完成" : "Completed"],
    [`${completionRate}%`, zh ? "完成比例" : "Done rate"],
    [dueSoon.length, zh ? "临近期限" : "Due soon"],
  ]);

  const statuses = [
    { label: zh ? "已完成" : "Completed", count: completedInRange.length, color: "#9eb39f" },
    { label: zh ? "进行中" : "In progress", count: inProgress.length, color: "#94aabd" },
    { label: zh ? "临近期限" : "Due soon", count: dueSoon.length, color: "#c7ad82" },
    { label: zh ? "已逾期" : "Overdue", count: overdue.length, color: "#c4a3a8" },
  ];
  const maxStatus = Math.max(...statuses.map((item) => item.count), 1);
  $("#familyGoalStatusChart").innerHTML = statuses.some((item) => item.count)
    ? statuses.map((item) => `
      <div class="goal-status-row">
        <strong>${escapeHtml(item.label)}</strong>
        <div class="goal-status-track"><span style="--goal-width:${(item.count / maxStatus) * 100}%;--goal-color:${item.color}"></span></div>
        <small>${item.count}</small>
      </div>
    `).join("")
    : `<div class="stats-empty">${zh ? "这个时间范围内还没有完成记录。" : "No completed records in this range yet."}</div>`;

  const categoryColorMap = new Map(familyState.categories.map((category) => [category.name, category.color || "#8baa97"]));
  const categories = Object.entries(categoryTotals).sort((a, b) => b[1].total - a[1].total).slice(0, 6);
  const maxCategory = Math.max(...categories.map(([, value]) => value.total), 1);
  $("#familyGoalCategoryChart").innerHTML = categories.length
    ? categories.map(([label, value], index) => {
      const color = categoryColorMap.get(label) || ["#8baa97", "#94aabd", "#b5a6c9", "#c7ad82", "#c4a3a8", "#a8b9a1"][index % 6];
      return `
        <div class="goal-category-row family-category-stat-row">
          <strong>${escapeHtml(label)}</strong>
          <div class="goal-category-track" style="--family-category-color:${escapeHtml(color)}">
            <span style="--goal-width:${(value.total / maxCategory) * 100}%;--goal-complete-width:${(value.completed / Math.max(value.total, 1)) * 100}%"></span>
          </div>
          <small>${value.total} ${zh ? "个目标" : "goals"} · ${value.completed} ${zh ? "完成" : "done"}</small>
        </div>
      `;
    }).join("")
    : `<div class="stats-empty">${zh ? "还没有家庭分类记录。" : "No family category records yet."}</div>`;

  const urgencyCounts = relevantGoals.reduce((acc, goal) => {
    const urgency = ["low", "normal", "high"].includes(goal.urgency) ? goal.urgency : "normal";
    acc[urgency] = (acc[urgency] || 0) + 1;
    return acc;
  }, { low: 0, normal: 0, high: 0 });
  const urgencyItems = ["high", "normal", "low"].map((key) => ({
    key,
    count: urgencyCounts[key] || 0,
    label: t().work.familyUrgency?.[key] || key,
  }));
  const maxUrgency = Math.max(...urgencyItems.map((item) => item.count), 1);
  $("#familyGoalUrgencyChart").innerHTML = urgencyItems.map((item) => `
    <div class="family-urgency-row" data-urgency="${escapeHtml(item.key)}">
      <span>${escapeHtml(item.label)}</span>
      <div><i style="--urgency-width:${(item.count / maxUrgency) * 100}%"></i></div>
      <strong>${item.count}</strong>
    </div>
  `).join("");
  renderFamilyMemberOverview(days);
  renderFamilySharedStats(days);
}

function renderSeedStats(days, focusSessions) {
  const zh = getLanguage() === "zh";
  const usedSeedIds = new Set(focusSessions.map((item) => item.habitSeed).filter(Boolean));
  const seeds = getHabitSeedTypes().filter((seed) => seed.active || usedSeedIds.has(seed.id)).map((seed) => ({
    key: seed.id,
    label: getDefinitionLabel(seed),
    color: seed.color,
  }));
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
