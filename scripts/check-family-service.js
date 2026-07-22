require("../src/modules/goals.js");
const family = require("../src/modules/family.js");

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

assert(family.normalizeEmail("  Test@Example.COM ") === "test@example.com", "email should normalize");
assert(family.normalizeUrgency("high") === "high", "known urgency should be kept");
assert(family.normalizeUrgency("High") === "high", "urgency should normalize case");
assert(family.normalizeUrgency("urgent") === "high", "urgent alias should normalize to high");
assert(family.normalizeUrgency("panic") === "normal", "unknown urgency should fallback");
assert(!family.minimalInvitationSelect.includes("updated_at"), "legacy invitation select should not require updated_at");
assert(typeof family.listReceivedInvitations === "function", "received invitation inbox should be exported");
assert(typeof family.acceptInvitationById === "function", "accept by invitation id should be exported");
assert(typeof family.removeFamilyMember === "function", "owner remove-member helper should be exported");

const receivedInvitation = family.mapFamilyInvitation({
  id: "invite-1",
  family_id: "family-1",
  email: "me@example.com",
  status: "pending",
  families: { name: "Little White Cat Home" },
});
assert(receivedInvitation.familyName === "Little White Cat Home", "received invitations should map family name");

const member = family.mapFamilyMember({
  family_id: "family-1",
  user_id: "user-1",
  email: "me@example.com",
  role: "owner",
});

assert(member.email === "me@example.com", "family member email should map for display");
assert(member.userId === "user-1", "family member user id should still map");

const user = { id: "user-1", email: "me@example.com" };
const insert = family.toFamilyGoalInsert({
  familyId: "family-1",
  title: "  Take a family walk  ",
  categoryId: "category-1",
  category: "Together",
  urgency: "high",
  deadline: "2026-07-05",
  note: "  after dinner  ",
}, user);

assert(insert.family_id === "family-1", "family id should map to snake case");
assert(insert.title === "Take a family walk", "title should trim");
assert(insert.category_label === "Together", "category label should map");
assert(!Object.prototype.hasOwnProperty.call(insert, "category_id"), "family goal MVP should not require category_id");
assert(insert.urgency === "high", "urgency should map");
assert(insert.created_by === "user-1", "created_by should use signed-in user");

const safeInsert = family.toConstraintSafeFamilyGoalInsert({
  familyId: "family-1",
  title: "Urgency fallback",
  urgency: "High",
  deadline: "2026-07-05",
}, user);
assert(safeInsert.urgency === "normal", "constraint fallback should use normal urgency");

const completionWithoutNote = family.toFamilyGoalCompletionPatch(user, "");
assert(completionWithoutNote.status === "done", "completion patch should mark done");
assert(completionWithoutNote.completed_by === "user-1", "completion patch should include completed_by");
assert(!Object.prototype.hasOwnProperty.call(completionWithoutNote, "completion_note"), "blank completion note should not be sent");

const completionWithNote = family.toFamilyGoalCompletionPatch(user, "  finished together  ");
assert(completionWithNote.completion_note === "finished together", "non-empty completion note should trim and send");

const legacyCompletion = family.toFamilyGoalCompletionPatch(user, "finished", { includeCompletionColumns: false, includeCompletionNote: false });
assert(legacyCompletion.status === "done", "legacy completion patch should mark done");
assert(!Object.prototype.hasOwnProperty.call(legacyCompletion, "completed_by"), "legacy completion patch should omit completed_by");
assert(!Object.prototype.hasOwnProperty.call(legacyCompletion, "completion_note"), "legacy completion patch should omit completion_note");

const legacyReopen = family.toFamilyGoalReopenPatch({ includeCompletionColumns: false });
assert(legacyReopen.status === "open", "legacy reopen patch should reopen");
assert(!Object.prototype.hasOwnProperty.call(legacyReopen, "completion_note"), "legacy reopen patch should omit completion columns");

const secretNoteInsert = family.toFamilySecretNoteInsert({
  familyId: "family-1",
  body: "  We are quietly doing our best.  ",
  mood: "warm",
}, user);

assert(secretNoteInsert.family_id === "family-1", "secret note family id should map");
assert(secretNoteInsert.body === "We are quietly doing our best.", "secret note body should trim");
assert(secretNoteInsert.mood === "warm", "secret note mood should map");
assert(secretNoteInsert.created_by === "user-1", "secret note created_by should use signed-in user");
assert(secretNoteInsert.visible === true, "secret note should be visible by default");

const secretNote = family.mapFamilySecretNote({
  id: "note-1",
  family_id: "family-1",
  body: "Anonymous kindness",
  mood: "soft",
  visible: true,
  created_by: "user-1",
  created_at: "2026-07-03T09:00:00.000Z",
});

assert(secretNote.familyId === "family-1", "secret note should expose familyId");
assert(secretNote.body === "Anonymous kindness", "secret note body should map");
assert(secretNote.createdBy === "user-1", "secret note should keep createdBy for permissions");

const mapped = family.mapFamilyGoal({
  id: "goal-1",
  family_id: "family-1",
  title: "Family walk",
  category_id: "category-1",
  category: { name: "Health" },
  urgency: "low",
  deadline: "2026-07-04",
  status: "open",
  created_by: "user-1",
  created_at: "2026-07-01T09:00:00.000Z",
});

assert(mapped.familyId === "family-1", "family goal should expose familyId");
assert(mapped.category === "Health", "category relation should map to category label");
assert(mapped.status === "open", "status should map");

const stats = family.buildFamilyGoalStats([
  mapped,
  family.mapFamilyGoal({
    id: "goal-2",
    family_id: "family-1",
    title: "Done",
    category_label: "Health",
    urgency: "normal",
    deadline: "2026-07-07",
    status: "done",
    completed_at: "2026-07-03T09:00:00.000Z",
  }),
], {
  days: ["2026-07-01", "2026-07-02", "2026-07-03"],
  range: "7",
  todayDateText: "2026-07-01",
  uncategorizedLabel: "Uncategorized",
});

assert(stats.openGoals.length === 1, "family stats should count open goals");
assert(stats.completedInRange.length === 1, "family stats should count completed goals");
assert(stats.categoryTotals.Health.total === 2, "family stats should reuse goal category totals");

console.log("Family service checks passed.");
