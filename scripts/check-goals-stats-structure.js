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
  familyStats: html.indexOf('id="familyStatsScope"'),
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

if (!(positions.familyRoom < positions.familyGoalForm && positions.familyGoalForm < positions.familyGoalList)) {
  throw new Error("Family goal controls should live inside the family goals scope.");
}

console.log("Goals and stats structure checks passed.");
