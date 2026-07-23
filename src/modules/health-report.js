(function attachHealthReport(global) {
  const namespace = global.MyCare || {};

  function finiteNumber(value) {
    const number = Number(value);
    return Number.isFinite(number) ? number : null;
  }

  function average(values = []) {
    const nums = values.map(finiteNumber).filter((value) => value !== null);
    return nums.length ? nums.reduce((sum, value) => sum + value, 0) / nums.length : null;
  }

  function uniqueDates(records = []) {
    return [...new Set(records.map((record) => record.date).filter(Boolean))].sort();
  }

  function dailyTotals(records = [], metric) {
    const totals = records
      .filter((record) => record.metric === metric)
      .reduce((acc, record) => {
        if (!record.date) return acc;
        acc[record.date] = (acc[record.date] || 0) + Number(record.value || 0);
        return acc;
      }, {});
    return Object.entries(totals)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, value]) => ({ date, value }));
  }

  function dailyAverages(records = [], metric) {
    const grouped = records
      .filter((record) => record.metric === metric)
      .reduce((acc, record) => {
        if (!record.date) return acc;
        if (!acc[record.date]) acc[record.date] = [];
        const value = finiteNumber(record.value);
        if (value !== null) acc[record.date].push(value);
        return acc;
      }, {});
    return Object.entries(grouped)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, values]) => ({ date, value: average(values) }))
      .filter((day) => day.value !== null);
  }

  function trendLabel(trend, language) {
    const zh = language === "zh";
    if (trend === "up") return zh ? "上升" : "rising";
    if (trend === "down") return zh ? "下降" : "lower";
    if (trend === "stable") return zh ? "比较稳定" : "steady";
    return zh ? "样本较少" : "not enough data";
  }

  function formatDuration(minutes, language) {
    const value = finiteNumber(minutes);
    if (value === null) return "-";
    const rounded = Math.round(value);
    const hours = Math.floor(rounded / 60);
    const mins = rounded % 60;
    if (language === "zh") return hours ? `${hours}小时${mins ? ` ${mins}分` : ""}` : `${mins}分钟`;
    if (!hours) return `${mins}m`;
    return mins ? `${hours}h ${mins}m` : `${hours}h`;
  }

  function formatNumber(value, digits = 0) {
    const number = finiteNumber(value);
    if (number === null) return "-";
    return number.toLocaleString(undefined, {
      maximumFractionDigits: digits,
      minimumFractionDigits: digits,
    });
  }

  function metricValues(records = [], metric) {
    return records
      .filter((record) => record.metric === metric)
      .sort((a, b) => `${a.date || ""}${a.recordedAt || ""}`.localeCompare(`${b.date || ""}${b.recordedAt || ""}`))
      .map((record) => finiteNumber(record.value))
      .filter((value) => value !== null);
  }

  function buildHealthReport(records = [], summary = {}, options = {}) {
    const language = options.language === "zh" ? "zh" : "en";
    const zh = language === "zh";
    const dates = uniqueDates(records);
    const sleepAverage = finiteNumber(summary.sleep?.averageMinutes);
    const sleepRecords = Number(summary.sleep?.records || 0);
    const stepDays = dailyTotals(records, "steps");
    const activeDays = dailyTotals(records, "active_minutes");
    const activeEnergyDays = dailyTotals(records, "active_energy");
    const heartRateDays = dailyAverages(records, "heart_rate");
    const averageSteps = average(stepDays.map((day) => day.value));
    const averageActive = average(activeDays.map((day) => day.value));
    const averageActiveEnergy = average(activeEnergyDays.map((day) => day.value));
    const averageHeartRate = finiteNumber(summary.recovery?.heartRateAverage) ?? average(heartRateDays.map((day) => day.value));
    const restingHeartRate = finiteNumber(summary.recovery?.restingHeartRateAverage);
    const hrv = finiteNumber(summary.recovery?.heartRateVariabilityAverage);
    const signals = [];

    if (!records.length) {
      return {
        coverage: zh ? "还没有身体记录" : "No body records yet",
        headline: zh ? "等你导入一些手表数据后，我会帮你温柔地读懂这段时间的身体节奏。" : "Once you import wearable data, I will help you read your body rhythm gently.",
        note: zh ? "这里不会给你打分，也不提供医疗判断，只帮你看见身体正在表达什么。" : "This does not score you or provide medical guidance. It simply helps you notice what your body may be expressing.",
        signals,
      };
    }

    if (sleepRecords >= 2 && sleepAverage !== null) {
      let tone = "steady";
      let text = zh
        ? `这段时间你平均睡了约 ${formatDuration(sleepAverage, language)}。先不用急着评价好坏，我们只是把身体的节奏看清楚。`
        : `You slept about ${formatDuration(sleepAverage, language)} on average. No need to judge it first; this is just a way to notice your rhythm.`;
      if (sleepAverage < 360) {
        tone = "check";
        text = zh
          ? `这段时间平均睡眠约 ${formatDuration(sleepAverage, language)}，身体可能在提醒你：今天可以把目标放轻一点，先把自己照顾回来。`
          : `Average sleep is about ${formatDuration(sleepAverage, language)}. Your body may be asking for a lighter day and a little more recovery.`;
      } else if (sleepAverage >= 420 && sleepAverage <= 540) {
        text = zh
          ? `平均睡眠约 ${formatDuration(sleepAverage, language)}，这是一段比较安稳的节奏。可以继续保持，不需要额外用力。`
          : `Average sleep is about ${formatDuration(sleepAverage, language)}, a fairly grounded rhythm. You can keep it without forcing more.`;
      }
      signals.push({
        key: "sleep",
        tone,
        label: zh ? "睡眠" : "Sleep",
        value: formatDuration(sleepAverage, language),
        detail: text,
      });
    }

    if (stepDays.length) {
      let tone = "steady";
      let text = zh
        ? `平均每天约 ${formatNumber(averageSteps)} 步，身体有在移动，也有在陪你慢慢往前。`
        : `Average daily steps are about ${formatNumber(averageSteps)}. Your body has been moving with you, quietly and steadily.`;
      if (averageSteps < 5000) {
        tone = "low";
        text = zh
          ? `平均每天约 ${formatNumber(averageSteps)} 步，最近身体移动得少一些。今天不用补偿，走十分钟也算重新连接身体。`
          : `Average daily steps are about ${formatNumber(averageSteps)}. Movement has been lighter lately; a ten-minute walk would still count as reconnecting with your body.`;
      } else if (averageSteps >= 8000) {
        text = zh
          ? `平均每天约 ${formatNumber(averageSteps)} 步，你这段时间和身体的连接很不错。记得也给自己留一点休息的空间。`
          : `Average daily steps are about ${formatNumber(averageSteps)}. You have stayed nicely connected to your body; leave room for rest too.`;
      }
      signals.push({
        key: "steps",
        tone,
        label: zh ? "活动" : "Activity",
        value: `${formatNumber(averageSteps)} ${zh ? "步/天" : "steps/day"}`,
        detail: text,
      });
    }

    if (activeDays.length) {
      signals.push({
        key: "active",
        tone: averageActive >= 30 ? "steady" : "low",
        label: zh ? "运动时间" : "Active time",
        value: formatDuration(averageActive, language),
        detail: zh
          ? `平均活动时间约 ${formatDuration(averageActive, language)}。${averageActive >= 30 ? "身体已经有被温柔启动过，接下来照常就好。" : "如果今天能量不高，从伸展、洗澡或短短散步开始就足够了。"}`
          : `Average active time is about ${formatDuration(averageActive, language)}. ${averageActive >= 30 ? "Your body has been gently activated; carrying on is enough." : "If energy is low, stretching, a shower, or a short walk is enough."}`,
      });
    }

    if (activeEnergyDays.length) {
      signals.push({
        key: "active_energy",
        tone: averageActiveEnergy >= 350 ? "steady" : "low",
        label: zh ? "活动能量" : "Active energy",
        value: `${formatNumber(averageActiveEnergy)} kcal/day`,
        detail: zh
          ? `平均活动能量约 ${formatNumber(averageActiveEnergy)} kcal。它更适合用来观察一段时间的活动节奏，不需要每天都追求更高。`
          : `Average active energy is about ${formatNumber(averageActiveEnergy)} kcal. It is most useful as a rhythm cue over time, not something that needs to be higher every day.`,
      });
    }

    if (heartRateDays.length && averageHeartRate !== null) {
      const tone = averageHeartRate >= 82 ? "check" : "steady";
      signals.push({
        key: "heart_rate",
        tone,
        label: zh ? "心率" : "Heart rate",
        value: `${formatNumber(averageHeartRate)} bpm`,
        detail: zh
          ? `${tone === "check" ? "这段时间的心率记录偏高一些，今天可以把节奏放缓一点。" : "这段时间的心率记录看起来比较平稳，可以继续按舒服的节奏来。"}这只是日常观察，不代表身体结论。`
          : `${tone === "check" ? "Heart-rate records have been a little higher in this window, so a softer pace may feel better today." : "Heart-rate records look fairly steady, so a comfortable pace is enough."} This is a daily observation, not a body conclusion.`,
      });
    }

    if (restingHeartRate !== null || hrv !== null) {
      const needsGentle = (restingHeartRate !== null && restingHeartRate >= 68) || (hrv !== null && hrv < 35);
      signals.push({
        key: "recovery",
        tone: needsGentle ? "check" : "steady",
        label: zh ? "恢复" : "Recovery",
        value: restingHeartRate !== null ? `${formatNumber(restingHeartRate, 0)} bpm` : `${formatNumber(hrv, 0)} ms`,
        detail: zh
          ? `${needsGentle ? "恢复信号像是在说：今天别把自己推太紧。" : "恢复信号看起来比较平稳，可以按平常节奏来。"}这只是日常观察，不是身体结论。`
          : `${needsGentle ? "Recovery signals suggest not pushing yourself too hard today." : "Recovery signals look fairly steady, so a normal rhythm is okay."} This is a daily observation, not a medical conclusion.`,
      });
    }

    const coverage = zh
      ? `${dates.length} 天身体记录`
      : `${dates.length} days of body signals`;
    const needsCare = signals.some((item) => item.tone === "check" || item.tone === "low");
    const headline = zh
      ? (needsCare
        ? "身体好像在轻轻提醒你：慢一点，也是在往前走。"
        : "这段时间的身体节奏看起来比较安稳，可以继续温柔地保持。")
      : (needsCare
        ? "Your body seems to be asking for a gentler pace. Slower still counts."
        : "Your body rhythm looks fairly grounded. Keep supporting it gently.");

    return {
      coverage,
      headline,
      note: zh
        ? `睡眠趋势：${trendLabel(summary.sleep?.trend, language)}；步数趋势：${trendLabel(summary.activity?.stepsTrend, language)}。这些只是给你照顾自己的线索，不是分数，也不是医疗判断。`
        : `Sleep trend: ${trendLabel(summary.sleep?.trend, language)}; steps trend: ${trendLabel(summary.activity?.stepsTrend, language)}. These are care cues, not a score and not medical guidance.`,
      signals,
    };
  }

  namespace.healthReport = {
    buildHealthReport,
  };

  global.MyCare = namespace;

  if (typeof module !== "undefined" && module.exports) {
    module.exports = namespace.healthReport;
  }
})(typeof window !== "undefined" ? window : globalThis);
