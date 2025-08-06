// Página de usuarios (CRUD completo)
import { useState, useEffect } from 'react'

interface User {
  id: number
  name: string
  email: string
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then(setUsers)
  }, [])

  const addUser = () => {
    fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    })
      .then((res) => res.json())
      .then((newUser) => setUsers([...users, newUser]))
  }

  const deleteUser = (id: number) => {
    fetch(`/api/users/${id}`, { method: 'DELETE' }).then(() =>
      setUsers(users.filter((u) => u.id !== id))
    )
  }

  return (
    <div>
      <h1 data-qa-id="title-users">Usuarios</h1>
      <input placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={addUser} data-qa-id="btn-add-user">Añadir</button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email}){' '}
            <button onClick={() => deleteUser(user.id)} data-qa-id={`btn-del-user-${user.id}`}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
