SELECT 
  t.id,
  t.name,
  t.department,
  t.parent_id,
  t.description,
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
FROM team t
LEFT JOIN team_member tm ON t.id = tm.team_id
LEFT JOIN "user" u ON tm.user_id = u.id
GROUP BY t.id;