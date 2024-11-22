-- @param {String} $1:uuid
-- @param {String} $2:email
-- @param {String} $3:name

INSERT INTO "user" (
  id,
  email,
  name,
  "created_at",
  "updated_at"
)
VALUES (
  $1::uuid,
  $2,
  $3,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
)
RETURNING *;