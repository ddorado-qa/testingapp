import { NavLink } from "react-router-dom";

function Navbar() {
  const links = [
    { to: "/", label: "🏠 Home" },
    { to: "/users", label: "👥 Usuarios" },
    { to: "/products", label: "📦 Productos" },
    { to: "/logs", label: "🧾 Logs" },
    { to: "/settings", label: "⚙️ Settings" },
    { to: "/support", label: "🛠 Soporte" },
    { to: "/rating", label: "⭐ Rating" },
  ];

  return (
    <nav className="bg-gray-800 text-white p-4 flex gap-4">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            isActive ? "underline font-bold" : "hover:underline"
          }
          data-qa-id={`nav-${link.to.replace("/", "") || "home"}`}
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}

export default Navbar;
