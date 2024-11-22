-- @param {String} $1:uuid
-- @param {String} $2:name
-- @param {String} $3:department
-- @param {String} $4:parentId

INSERT INTO "team" (
  id,
  name,
  department,
  parent_id,
  "created_at",
  "updated_at"
)
VALUES (
  $1::uuid,
  $2,
  $3,
  NULLIF($4, '')::uuid,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
)
RETURNING *;