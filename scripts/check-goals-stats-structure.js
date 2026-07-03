const fs = require("fs");

const html = fs.readFileSync("index.html", "utf8");

const positions = {
  personalGoals: html.indexOf('id="personalGoalsScope"'),
  workList: html.indexOf('id="workListView"'),
  workAdd: html.indexOf('id="workAddView"'),
  familyGoals: html.indexOf('id="familyGoalsScope"'),
  familyRoom: html.indexOf('id="familyRoomPanel"'),
  familyGoalForm: html.indexOf('id="familyGoalForm"'),
  familyGoalList: html.indexOf('id="familyGoalList"'),
  personalStats: html.indexOf('id="personalStatsScope"'),
  personalSharePreview: html.indexOf('id="personalSharePreview"'),
  saveSharedStats: html.indexOf('id="saveSharedStats"'),
  familyStats: html.indexOf('id="familyStatsScope"'),
  familySharedStatsList: html.indexOf('id="familySharedStatsList"'),
};

for (const [name, index] of Object.entries(positions)) {
  if (index < 0) {
    throw new Error(`Missing ${name}`);
  }
}

if (!(positions.personalGoals < positions.workList
  && positions.workList < positions.workAdd
  && positions.workAdd < positions.familyGoals
  && positions.familyGoals < positions.familyRoom)) {
  throw new Error("Family goals must stay outside the personal goals list/add flow.");
}

if (!(positions.personalStats < positions.familyStats)) {
  throw new Error("Family stats should stay separate from personal stats.");
}

if (!(positions.personalStats < positions.personalSharePreview
  && positions.personalSharePreview < positions.saveSharedStats
  && positions.saveSharedStats < positions.familyStats)) {
  throw new Error("Personal stats sharing controls should stay inside the personal stats scope.");
}

if (!(positions.familyStats < positions.familySharedStatsList)) {
  throw new Error("Shared family summaries should stay inside the family stats scope.");
}

if (!(positions.familyRoom < positions.familyGoalForm && positions.familyGoalForm < positions.familyGoalList)) {
  throw new Error("Family goal controls should live inside the family goals scope.");
}

console.log("Goals and stats structure checks passed.");
