import { useState, useEffect } from "react";

function Settings() {
  const [autoTest, setAutoTest] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("qa-auto") === "true";
    setAutoTest(saved);
  }, []);

  const toggle = () => {
    localStorage.setItem("qa-auto", (!autoTest).toString());
    setAutoTest(!autoTest);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">⚙️ Configuración QA</h2>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={autoTest}
          onChange={toggle}
          data-qa-id="toggle-autotest"
        />
        Activar ejecución automática de tests tras cada cambio
      </label>
    </div>
  );
}

export default Settings;
