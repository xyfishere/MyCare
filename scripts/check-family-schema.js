const fs = require("fs");
const path = require("path");

const schema = fs.readFileSync(path.join(__dirname, "..", "supabase", "schema.sql"), "utf8");

function assertIncludes(snippet, message) {
  if (!schema.includes(snippet)) {
    throw new Error(message);
  }
}

[
  "public.families",
  "public.family_members",
  "public.family_invitations",
  "public.family_goal_categories",
  "public.family_goals",
  "public.family_shared_stats",
].forEach((table) => {
  assertIncludes(`create table if not exists ${table}`, `${table} table is missing`);
  assertIncludes(`alter table ${table} enable row level security`, `${table} RLS is missing`);
});

[
  "public.is_family_member",
  "public.is_family_owner",
  "public.is_family_creator",
  "public.has_pending_family_invitation",
  "public.validate_family_goal_category",
].forEach((fn) => assertIncludes(`function ${fn}`, `${fn} helper is missing`));

[
  "Family members can read families",
  "Users can create families",
  "Owners can add family members",
  "Family members and invitees can read invitations",
  "Family members can read goal categories",
  "Family members can create goal categories",
  "Family members can update goal categories",
  "Family members can delete goal categories",
  "Family members can read family goals",
  "Family members can create family goals",
  "Family members can update family goals",
  "Family members can delete family goals",
  "Family members can read visible shared stats",
  "Users can create their own shared stats",
  "Users can update their own shared stats",
  "Users can delete their own shared stats",
].forEach((policy) => assertIncludes(policy, `${policy} policy is missing`));

assertIncludes("email text", "family members should include display email");
assertIncludes("family_invitations_token_key", "family invitation token repair index is missing");
assertIncludes("urgency text not null default 'normal'", "family goals should include urgency");
assertIncludes("family_shared_stats_unique_period_idx", "shared stats upsert index is missing");
assertIncludes("summary_type text not null check", "shared stats should constrain summary type");
assertIncludes("payload jsonb not null default '{}'::jsonb", "shared stats should use json payloads");
assertIncludes("validate_family_goal_category_before_write", "family goal category validation trigger is missing");
assertIncludes("touch_family_shared_stats_before_update", "shared stats updated_at trigger is missing");
assertIncludes("Family records are separate from each user's private app_states JSON.", "privacy boundary note is missing");

console.log("Family schema checks passed.");
