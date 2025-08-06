import { useState } from "react";

function Support() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Soporte enviado desde ${email}: ${msg}`);
    setEmail("");
    setMsg("");
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">🛠 Soporte Técnico</h2>
      <form onSubmit={handleSubmit} className="space-y-4" data-qa-id="form-support">
        <input
          type="email"
          placeholder="Tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full"
          required
          data-qa-id="input-email"
        />
        <textarea
          placeholder="¿En qué podemos ayudarte?"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          className="border p-2 w-full"
          required
          data-qa-id="input-message"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit" data-qa-id="submit-support">
          Enviar
        </button>
      </form>
    </div>
  );
}

export default Support;
