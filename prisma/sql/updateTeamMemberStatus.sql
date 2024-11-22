-- @param {String} $1:uuid
-- @param {Boolean} $2:status

UPDATE team_member 
SET 
  active = $2,
  updated_at = NOW()
WHERE id = $1::uuid
RETURNING *;