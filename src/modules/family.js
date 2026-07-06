(function initFamilyModule(global) {
  const namespace = global.MyCare || {};

  function getUserId(user) {
    return typeof user === "string" ? user : user?.id;
  }

  function requireClient(client) {
    if (!client?.from) throw new Error("Supabase client is required");
  }

  function requireUser(user) {
    const userId = getUserId(user);
    if (!userId) throw new Error("Signed-in user is required");
    return userId;
  }

  function normalizeEmail(email = "") {
    return String(email).trim().toLowerCase();
  }

  function normalizeUrgency(value = "normal") {
    const normalized = String(value || "normal").trim().toLowerCase();
    if (normalized === "medium") return "normal";
    if (normalized === "urgent") return "high";
    return ["low", "normal", "high"].includes(normalized) ? normalized : "normal";
  }

  function ensureFamilyId(familyId) {
    const value = String(familyId || "").trim();
    if (!value) throw new Error("Family id is required");
    return value;
  }

  function throwIfError(result) {
    if (result?.error) throw result.error;
    return result?.data;
  }

  function isSchemaColumnError(error, columnName) {
    const message = String(error?.message || error?.details || "");
    return message.includes(`'${columnName}'`) || message.includes(`"${columnName}"`) || message.includes(columnName);
  }

  function isUrgencyConstraintError(error) {
    const message = String(error?.message || error?.details || "");
    return message.includes("family_goals_urgency_check") || (message.includes("urgency") && message.includes("check constraint"));
  }

  function isRowLevelSecurityError(error) {
    const message = String(error?.message || error?.details || "");
    return message.toLowerCase().includes("row-level security")
      || message.toLowerCase().includes("violates row-level security policy");
  }

  function isMissingFunctionError(error, functionName) {
    const message = String(error?.message || error?.details || "");
    return message.includes(functionName) || message.includes("function") && message.includes("does not exist");
  }

  function mapFamily(row = {}) {
    const family = row.family || row.families || row;
    return {
      id: family.id,
      name: family.name,
      createdBy: family.created_by || family.createdBy,
      createdAt: family.created_at || family.createdAt,
      updatedAt: family.updated_at || family.updatedAt,
      role: row.role,
      joinedAt: row.joined_at || row.joinedAt,
    };
  }

  function mapFamilyMember(row = {}) {
    return {
      familyId: row.family_id || row.familyId,
      userId: row.user_id || row.userId,
      email: row.email || row.member_email || row.memberEmail || "",
      role: row.role,
      joinedAt: row.joined_at || row.joinedAt,
    };
  }

  function mapFamilyInvitation(row = {}) {
    const family = row.family || row.families || {};
    return {
      id: row.id,
      familyId: row.family_id || row.familyId,
      familyName: row.familyName || family.name || "",
      email: row.email,
      token: row.token,
      status: row.status,
      invitedBy: row.invited_by || row.invitedBy,
      acceptedBy: row.accepted_by || row.acceptedBy,
      acceptedAt: row.accepted_at || row.acceptedAt,
      expiresAt: row.expires_at || row.expiresAt,
      createdAt: row.created_at || row.createdAt,
      updatedAt: row.updated_at || row.updatedAt,
    };
  }

  function mapFamilyCategory(row = {}) {
    return {
      id: row.id,
      familyId: row.family_id || row.familyId,
      name: row.name,
      color: row.color,
      active: row.active,
      createdBy: row.created_by || row.createdBy,
      createdAt: row.created_at || row.createdAt,
      updatedAt: row.updated_at || row.updatedAt,
    };
  }

  function mapFamilyGoal(row = {}) {
    return {
      id: row.id,
      familyId: row.family_id || row.familyId,
      title: row.title,
      categoryId: row.category_id || row.categoryId || "",
      category: row.category_label || row.categoryLabel || row.category?.name || row.category || "",
      urgency: normalizeUrgency(row.urgency),
      deadline: row.deadline,
      status: row.status || "open",
      note: row.note || "",
      completionNote: row.completion_note || row.completionNote || "",
      createdBy: row.created_by || row.createdBy,
      completedBy: row.completed_by || row.completedBy,
      completedAt: row.completed_at || row.completedAt,
      createdAt: row.created_at || row.createdAt,
      updatedAt: row.updated_at || row.updatedAt,
    };
  }

  function mapFamilySecretNote(row = {}) {
    return {
      id: row.id,
      familyId: row.family_id || row.familyId,
      body: row.body || "",
      mood: row.mood || "",
      visible: row.visible !== false,
      createdBy: row.created_by || row.createdBy,
      createdAt: row.created_at || row.createdAt,
      updatedAt: row.updated_at || row.updatedAt,
    };
  }

  function toFamilyGoalInsert(input = {}, user) {
    const userId = requireUser(user);
    return {
      family_id: ensureFamilyId(input.familyId),
      title: String(input.title || "").trim(),
      category_label: String(input.categoryLabel || input.category || "").trim() || null,
      urgency: normalizeUrgency(input.urgency),
      deadline: input.deadline,
      note: String(input.note || "").trim() || null,
      created_by: userId,
    };
  }

  function toMinimalFamilyGoalInsert(input = {}, user) {
    const userId = requireUser(user);
    return {
      family_id: ensureFamilyId(input.familyId),
      title: String(input.title || "").trim(),
      urgency: normalizeUrgency(input.urgency),
      deadline: input.deadline,
      created_by: userId,
    };
  }

  function toConstraintSafeFamilyGoalInsert(input = {}, user) {
    return {
      ...toMinimalFamilyGoalInsert(input, user),
      urgency: "normal",
    };
  }

  function toFamilyCategoryInsert(input = {}, user) {
    const userId = requireUser(user);
    return {
      family_id: ensureFamilyId(input.familyId),
      name: String(input.name || "").trim(),
      color: /^#[0-9a-f]{6}$/i.test(input.color || "") ? input.color : "#9eb39f",
      created_by: userId,
    };
  }

  function toFamilySecretNoteInsert(input = {}, user) {
    const userId = requireUser(user);
    return {
      family_id: ensureFamilyId(input.familyId),
      body: String(input.body || "").trim(),
      mood: String(input.mood || "").trim() || null,
      created_by: userId,
      visible: true,
    };
  }

  const invitationSelect = "id, family_id, email, token, status, invited_by, accepted_by, accepted_at, expires_at, created_at, updated_at";
  const minimalInvitationSelect = "id, family_id, email, token, status, invited_by, created_at";
  const familyCategorySelect = "id, family_id, name, color, active, created_by, created_at, updated_at";
  const minimalFamilyCategorySelect = "id, family_id, name, color, active, created_by, created_at";
  const familyGoalSelect = "id, family_id, title, category_label, urgency, deadline, status, note, completion_note, created_by, completed_by, completed_at, created_at, updated_at";
  const minimalFamilyGoalSelect = "id, family_id, title, urgency, deadline, status, created_by, completed_by, completed_at, created_at, updated_at";
  const familySecretNoteSelect = "id, family_id, body, mood, visible, created_by, created_at, updated_at";
  const minimalFamilySecretNoteSelect = "id, family_id, body, mood, visible, created_by, created_at";

  async function selectFamilyInvitation(queryBuilder) {
    try {
      return throwIfError(await queryBuilder(invitationSelect));
    } catch (error) {
      if (!isSchemaColumnError(error, "accepted_by")
        && !isSchemaColumnError(error, "accepted_at")
        && !isSchemaColumnError(error, "expires_at")
        && !isSchemaColumnError(error, "updated_at")) {
        throw error;
      }
      return throwIfError(await queryBuilder(minimalInvitationSelect));
    }
  }

  async function selectFamilyCategory(queryBuilder) {
    try {
      return throwIfError(await queryBuilder(familyCategorySelect));
    } catch (error) {
      if (!isSchemaColumnError(error, "updated_at")) throw error;
      return throwIfError(await queryBuilder(minimalFamilyCategorySelect));
    }
  }

  function isFamilyGoalSchemaError(error) {
    return isSchemaColumnError(error, "category_label")
      || isSchemaColumnError(error, "note")
      || isSchemaColumnError(error, "completion_note")
      || isSchemaColumnError(error, "completed_by")
      || isSchemaColumnError(error, "completed_at");
  }

  async function selectFamilyGoal(queryBuilder) {
    try {
      return throwIfError(await queryBuilder(familyGoalSelect));
    } catch (error) {
      if (!isFamilyGoalSchemaError(error)) throw error;
      return throwIfError(await queryBuilder(minimalFamilyGoalSelect));
    }
  }

  async function selectFamilySecretNote(queryBuilder) {
    try {
      return throwIfError(await queryBuilder(familySecretNoteSelect));
    } catch (error) {
      if (!isSchemaColumnError(error, "updated_at")) throw error;
      return throwIfError(await queryBuilder(minimalFamilySecretNoteSelect));
    }
  }

  function toFamilyGoalCompletionPatch(user, completionNote = "", options = {}) {
    const patch = { status: "done" };
    if (options.includeCompletionColumns !== false) {
      patch.completed_by = requireUser(user);
      patch.completed_at = new Date().toISOString();
    }
    const note = String(completionNote || "").trim();
    if (options.includeCompletionNote !== false && note) {
      patch.completion_note = note;
    }
    return patch;
  }

  function toFamilyGoalReopenPatch(options = {}) {
    const patch = { status: "open" };
    if (options.includeCompletionColumns !== false) {
      patch.completed_by = null;
      patch.completed_at = null;
      patch.completion_note = null;
    }
    return patch;
  }

  async function listFamilies(client) {
    requireClient(client);
    const data = throwIfError(await client
      .from("family_members")
      .select("role, joined_at, family:families(id, name, created_by, created_at, updated_at)")
      .order("joined_at", { ascending: true }));
    return (data || []).map(mapFamily);
  }

  async function createFamily(client, user, name) {
    requireClient(client);
    const userId = requireUser(user);
    const familyName = String(name || "").trim();
    if (!familyName) throw new Error("Family name is required");

    const family = throwIfError(await client
      .from("families")
      .insert({ name: familyName, created_by: userId })
      .select("id, name, created_by, created_at, updated_at")
      .single());

    try {
      const membership = throwIfError(await client
        .from("family_members")
        .insert({ family_id: family.id, user_id: userId, email: normalizeEmail(user?.email), role: "owner" })
        .select("family_id, user_id, email, role, joined_at")
        .single());
      return { family: mapFamily(family), membership: mapFamilyMember(membership) };
    } catch (error) {
      await client.from("families").delete().eq("id", family.id);
      throw error;
    }
  }

  async function getFamilyMembers(client, familyId) {
    requireClient(client);
    const data = throwIfError(await client
      .from("family_members")
      .select("family_id, user_id, email, role, joined_at")
      .eq("family_id", ensureFamilyId(familyId))
      .order("joined_at", { ascending: true }));
    return (data || []).map(mapFamilyMember);
  }

  async function createInvitation(client, user, input = {}) {
    requireClient(client);
    const userId = requireUser(user);
    const email = normalizeEmail(input.email);
    if (!email) throw new Error("Invite email is required");
    if (client.rpc) {
      try {
        const invitation = throwIfError(await client.rpc("create_family_invitation", {
          p_family_id: ensureFamilyId(input.familyId),
          p_email: email,
        }));
        return mapFamilyInvitation(Array.isArray(invitation) ? invitation[0] : invitation);
      } catch (error) {
        const message = String(error?.message || "");
        if (!message.includes("create_family_invitation")) throw error;
      }
    }
    const payload = {
      family_id: ensureFamilyId(input.familyId),
      email,
      invited_by: userId,
    };
    const invitation = throwIfError(await client
      .from("family_invitations")
      .insert(payload)
      .select(minimalInvitationSelect)
      .single());
    return mapFamilyInvitation(invitation);
  }

  async function listInvitations(client, familyId) {
    requireClient(client);
    const data = await selectFamilyInvitation((columns) => client
      .from("family_invitations")
      .select(columns)
      .eq("family_id", ensureFamilyId(familyId))
      .order("created_at", { ascending: false }));
    return (data || []).map(mapFamilyInvitation);
  }

  async function listReceivedInvitations(client, user) {
    requireClient(client);
    const email = normalizeEmail(user?.email);
    if (!email) return [];
    try {
      const data = await selectFamilyInvitation((columns) => client
        .from("family_invitations")
        .select(`${columns}, families(id, name)`)
        .eq("status", "pending")
        .eq("email", email)
        .order("created_at", { ascending: false }));
      return (data || []).map(mapFamilyInvitation);
    } catch {
      const data = await selectFamilyInvitation((columns) => client
        .from("family_invitations")
        .select(columns)
        .eq("status", "pending")
        .eq("email", email)
        .order("created_at", { ascending: false }));
      return (data || []).map(mapFamilyInvitation);
    }
  }

  async function acceptInvitationRecord(client, user, invitation) {
    const userId = requireUser(user);
    if (!invitation?.id || !invitation?.family_id) throw new Error("Invitation could not be found");

    if (client.rpc) {
      try {
        const result = throwIfError(await client.rpc("accept_family_invitation", {
          p_invitation_id: invitation.id,
        }));
        const payload = Array.isArray(result) ? result[0] : result;
        return {
          invitation: mapFamilyInvitation(payload?.invitation || payload),
          membership: mapFamilyMember(payload?.membership || {
            family_id: invitation.family_id,
            user_id: userId,
            email: normalizeEmail(invitation.email || user?.email),
            role: "member",
          }),
        };
      } catch (error) {
        if (!isMissingFunctionError(error, "accept_family_invitation")) throw error;
      }
    }

    const membership = throwIfError(await client
      .from("family_members")
      .upsert(
        { family_id: invitation.family_id, user_id: userId, email: normalizeEmail(invitation.email || user?.email), role: "member" },
        { onConflict: "family_id,user_id" },
      )
      .select("family_id, user_id, email, role, joined_at")
      .single());

    let accepted;
    try {
      accepted = await selectFamilyInvitation((columns) => client
        .from("family_invitations")
        .update({
          status: "accepted",
          accepted_by: userId,
          accepted_at: new Date().toISOString(),
        })
        .eq("id", invitation.id)
        .select(columns)
        .single());
    } catch (error) {
      if (!isSchemaColumnError(error, "accepted_by") && !isSchemaColumnError(error, "accepted_at")) throw error;
      accepted = throwIfError(await client
        .from("family_invitations")
        .update({ status: "accepted" })
        .eq("id", invitation.id)
        .select(minimalInvitationSelect)
        .single());
    }

    return {
      invitation: mapFamilyInvitation(accepted),
      membership: mapFamilyMember(membership),
    };
  }

  async function acceptInvitation(client, user, token) {
    requireClient(client);
    requireUser(user);
    const inviteToken = String(token || "").trim();
    if (!inviteToken) throw new Error("Invitation token is required");

    const invitation = await selectFamilyInvitation((columns) => client
      .from("family_invitations")
      .select(columns)
      .eq("token", inviteToken)
      .eq("status", "pending")
      .single());

    return acceptInvitationRecord(client, user, invitation);
  }

  async function acceptInvitationById(client, user, invitationId) {
    requireClient(client);
    requireUser(user);
    const id = String(invitationId || "").trim();
    if (!id) throw new Error("Invitation id is required");
    const invitation = await selectFamilyInvitation((columns) => client
      .from("family_invitations")
      .select(columns)
      .eq("id", id)
      .eq("status", "pending")
      .single());
    return acceptInvitationRecord(client, user, invitation);
  }

  async function leaveFamily(client, user, familyId) {
    requireClient(client);
    const userId = requireUser(user);
    throwIfError(await client
      .from("family_members")
      .delete()
      .eq("family_id", ensureFamilyId(familyId))
      .eq("user_id", userId));
    return true;
  }

  async function listFamilyGoalCategories(client, familyId) {
    requireClient(client);
    const data = await selectFamilyCategory((columns) => client
      .from("family_goal_categories")
      .select(columns)
      .eq("family_id", ensureFamilyId(familyId))
      .order("name", { ascending: true }));
    return (data || []).map(mapFamilyCategory);
  }

  async function createFamilyGoalCategory(client, user, input = {}) {
    requireClient(client);
    try {
      const category = await selectFamilyCategory((columns) => client
        .from("family_goal_categories")
        .insert(toFamilyCategoryInsert(input, user))
        .select(columns)
        .single());
      return mapFamilyCategory(category);
    } catch (error) {
      if (!isRowLevelSecurityError(error) || !client.rpc) throw error;
      const category = throwIfError(await client.rpc("create_family_goal_category", {
        p_family_id: ensureFamilyId(input.familyId),
        p_name: String(input.name || "").trim(),
        p_color: /^#[0-9a-f]{6}$/i.test(input.color || "") ? input.color : "#9eb39f",
      }));
      return mapFamilyCategory(Array.isArray(category) ? category[0] : category);
    }
  }

  async function updateFamilyGoalCategory(client, categoryId, updates = {}) {
    requireClient(client);
    const patch = {};
    if ("name" in updates) patch.name = String(updates.name || "").trim();
    if ("color" in updates && /^#[0-9a-f]{6}$/i.test(updates.color || "")) patch.color = updates.color;
    if ("active" in updates) patch.active = updates.active !== false;
    if (!Object.keys(patch).length) throw new Error("No category changes to save");
    try {
      const category = await selectFamilyCategory((columns) => client
        .from("family_goal_categories")
        .update(patch)
        .eq("id", categoryId)
        .select(columns)
        .single());
      return mapFamilyCategory(category);
    } catch (error) {
      if (!isRowLevelSecurityError(error) || !client.rpc) throw error;
      const category = throwIfError(await client.rpc("update_family_goal_category", {
        p_category_id: categoryId,
        p_name: "name" in patch ? patch.name : null,
        p_color: "color" in patch ? patch.color : null,
        p_active: "active" in patch ? patch.active : null,
      }));
      return mapFamilyCategory(Array.isArray(category) ? category[0] : category);
    }
  }

  async function listFamilyGoals(client, familyId) {
    requireClient(client);
    const data = await selectFamilyGoal((columns) => client
      .from("family_goals")
      .select(columns)
      .eq("family_id", ensureFamilyId(familyId))
      .order("deadline", { ascending: true }));
    return (data || []).map(mapFamilyGoal);
  }

  async function createFamilyGoal(client, user, input = {}) {
    requireClient(client);
    try {
      const goal = await selectFamilyGoal((columns) => client
        .from("family_goals")
        .insert(toFamilyGoalInsert(input, user))
        .select(columns)
        .single());
      return mapFamilyGoal(goal);
    } catch (error) {
      if (isUrgencyConstraintError(error)) {
        const goal = await selectFamilyGoal((columns) => client
          .from("family_goals")
          .insert(toConstraintSafeFamilyGoalInsert(input, user))
          .select(columns)
          .single());
        return mapFamilyGoal({
          ...goal,
          category_label: input.categoryLabel || input.category || "",
        });
      }
      if (!isFamilyGoalSchemaError(error)) throw error;
      let goal;
      try {
        goal = await selectFamilyGoal((columns) => client
          .from("family_goals")
          .insert(toMinimalFamilyGoalInsert(input, user))
          .select(columns)
          .single());
      } catch (fallbackError) {
        if (!isUrgencyConstraintError(fallbackError)) throw fallbackError;
        goal = await selectFamilyGoal((columns) => client
          .from("family_goals")
          .insert(toConstraintSafeFamilyGoalInsert(input, user))
          .select(columns)
          .single());
      }
      return mapFamilyGoal({
        ...goal,
        category_label: input.categoryLabel || input.category || "",
      });
    }
  }

  async function updateFamilyGoal(client, goalId, updates = {}) {
    requireClient(client);
    const patch = {};
    if ("title" in updates) patch.title = String(updates.title || "").trim();
    if ("categoryLabel" in updates || "category" in updates) {
      patch.category_label = String(updates.categoryLabel || updates.category || "").trim() || null;
    }
    if ("urgency" in updates) patch.urgency = normalizeUrgency(updates.urgency);
    if ("deadline" in updates) patch.deadline = updates.deadline;
    if ("note" in updates) patch.note = String(updates.note || "").trim() || null;

    const goal = await selectFamilyGoal((columns) => client
      .from("family_goals")
      .update(patch)
      .eq("id", goalId)
      .select(columns)
      .single());
    return mapFamilyGoal(goal);
  }

  async function completeFamilyGoal(client, user, goalId, completionNote = "") {
    requireClient(client);
    try {
      const goal = await selectFamilyGoal((columns) => client
        .from("family_goals")
        .update(toFamilyGoalCompletionPatch(user, completionNote))
        .eq("id", goalId)
        .select(columns)
        .single());
      return mapFamilyGoal({
        ...goal,
        completion_note: String(completionNote || "").trim() || goal.completion_note,
      });
    } catch (error) {
      if (!isFamilyGoalSchemaError(error)) throw error;
      const goal = await selectFamilyGoal((columns) => client
        .from("family_goals")
        .update(toFamilyGoalCompletionPatch(user, completionNote, { includeCompletionColumns: false, includeCompletionNote: false }))
        .eq("id", goalId)
        .select(columns)
        .single());
      return mapFamilyGoal(goal);
    }
  }

  async function reopenFamilyGoal(client, goalId) {
    requireClient(client);
    try {
      const goal = await selectFamilyGoal((columns) => client
        .from("family_goals")
        .update(toFamilyGoalReopenPatch())
        .eq("id", goalId)
        .select(columns)
        .single());
      return mapFamilyGoal(goal);
    } catch (error) {
      if (!isFamilyGoalSchemaError(error)) throw error;
      const goal = await selectFamilyGoal((columns) => client
        .from("family_goals")
        .update(toFamilyGoalReopenPatch({ includeCompletionColumns: false }))
        .eq("id", goalId)
        .select(columns)
        .single());
      return mapFamilyGoal(goal);
    }
  }

  async function deleteFamilyGoal(client, goalId) {
    requireClient(client);
    throwIfError(await client.from("family_goals").delete().eq("id", goalId));
    return true;
  }

  async function listFamilySecretNotes(client, familyId) {
    requireClient(client);
    const data = await selectFamilySecretNote((columns) => client
      .from("family_secret_notes")
      .select(columns)
      .eq("family_id", ensureFamilyId(familyId))
      .eq("visible", true)
      .order("created_at", { ascending: false })
      .limit(24));
    return (data || []).map(mapFamilySecretNote);
  }

  async function createFamilySecretNote(client, user, input = {}) {
    requireClient(client);
    const insert = toFamilySecretNoteInsert(input, user);
    if (!insert.body) throw new Error("Secret note cannot be empty");
    const note = await selectFamilySecretNote((columns) => client
      .from("family_secret_notes")
      .insert(insert)
      .select(columns)
      .single());
    return mapFamilySecretNote(note);
  }

  async function hideFamilySecretNote(client, user, noteId) {
    requireClient(client);
    requireUser(user);
    const note = await selectFamilySecretNote((columns) => client
      .from("family_secret_notes")
      .update({ visible: false })
      .eq("id", noteId)
      .select(columns)
      .single());
    return mapFamilySecretNote(note);
  }

  function buildFamilyGoalStats(rows = [], options = {}) {
    if (!namespace.goals?.buildGoalStats) throw new Error("Goals module is required");
    return namespace.goals.buildGoalStats(rows.map(mapFamilyGoal), options);
  }

  namespace.family = {
    acceptInvitation,
    acceptInvitationById,
    buildFamilyGoalStats,
    completeFamilyGoal,
    createFamily,
    createFamilyGoal,
    createFamilyGoalCategory,
    createFamilySecretNote,
    createInvitation,
    deleteFamilyGoal,
    getFamilyMembers,
    hideFamilySecretNote,
    leaveFamily,
    listFamilies,
    listFamilyGoalCategories,
    listFamilyGoals,
    listFamilySecretNotes,
    listInvitations,
    listReceivedInvitations,
    mapFamily,
    mapFamilyCategory,
    mapFamilyGoal,
    mapFamilyInvitation,
    mapFamilyMember,
    mapFamilySecretNote,
    minimalInvitationSelect,
    normalizeEmail,
    normalizeUrgency,
    reopenFamilyGoal,
    toFamilyGoalCompletionPatch,
    toFamilySecretNoteInsert,
    toConstraintSafeFamilyGoalInsert,
    toFamilyGoalInsert,
    toFamilyGoalReopenPatch,
    toMinimalFamilyGoalInsert,
    updateFamilyGoal,
    updateFamilyGoalCategory,
  };

  global.MyCare = namespace;

  if (typeof module !== "undefined" && module.exports) {
    module.exports = namespace.family;
  }
})(typeof window !== "undefined" ? window : globalThis);
