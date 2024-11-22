-- @param {String} $1:uuid
-- @param {Boolean} $2:parent_id

UPDATE team 
SET 
  parent_id = $2::uuid,
  updated_at = NOW()
WHERE id = $1::uuid
RETURNING *;