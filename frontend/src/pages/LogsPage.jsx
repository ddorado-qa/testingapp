import React, { useEffect, useState } from 'react';

export default function LogsPage() {
  const [logs, setLogs] = useState([]);
  const [type, setType] = useState('');

  useEffect(() => {
    fetch(`/api/logs${type ? `?type=${type}` : ''}`).then(r => r.json()).then(setLogs);
  }, [type]);

  return (
    <div>
      <h2>Logs</h2>
      <label>
        Filter by type:
        <select qa-id="select-log-type" value={type} onChange={e => setType(e.target.value)}>
          <option value="">All</option>
          <option value="create">Create</option>
          <option value="update">Update</option>
          <option value="delete">Delete</option>
        </select>
      </label>
      <ul>
        {logs.map(log => (
          <li key={log.id} qa-id={`log-${log.id}`}>
            [{log.type.toUpperCase()}] {log.message} ({new Date(log.timestamp).toLocaleString()})
          </li>
        ))}
      </ul>
    </div>
  );
}
