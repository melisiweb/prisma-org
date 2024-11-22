-- @param {String} $1:uuid

WITH RECURSIVE team_hierarchy AS (
  SELECT id, name, parent_id, description, department, 0 as level
  FROM team
  WHERE id = $1::uuid
  
  UNION ALL
  
  SELECT t.id, t.name, t.parent_id, t.description, t.department, th.level + 1
  FROM team t
  INNER JOIN team_hierarchy th ON t.id = th.parent_id
)
SELECT 
  th.*,
  json_agg(
    json_build_object(
      'id', tm.id,
      'userId', tm.user_id,
      'teamId', tm.team_id,
      'role', tm.role,
      'active', tm.active,
      'user', json_build_object(
          'id', u.id,
          'email', u.email,
          'name', u.name
        )
    )
  ) FILTER (WHERE tm.id IS NOT NULL) as members
FROM team_hierarchy th
LEFT JOIN team_member tm ON th.id = tm.team_id
LEFT JOIN "user" u ON tm.user_id = u.id
GROUP BY th.id, th.name, th.parent_id, th.description, th.department, th.level
ORDER BY th.level DESC;