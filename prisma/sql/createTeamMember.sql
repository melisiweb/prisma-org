-- @param {String} $1:uuid
-- @param {String} $2:userId
-- @param {String} $3:teamId
-- @param {TeamMemberRole} $4:role

INSERT INTO "team_member" (
  id,
  user_id,
  team_id,
  role,
  "created_at",
  "updated_at"
)
VALUES (
  $1::uuid,
  $2::uuid,
  $3::uuid,
  $4::"TeamMemberRole",
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
)
RETURNING *;