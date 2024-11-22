-- @param {String} $1:uuid
-- @param {TeamMemberRole} $2:role

UPDATE team_member 
SET 
  role = $2::"TeamMemberRole",
  updated_at = NOW()
WHERE id = $1::uuid
RETURNING *;