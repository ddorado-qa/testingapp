import { useState } from "react";

function Rating() {
  const [score, setScore] = useState(0);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">⭐ Valora nuestra plataforma</h2>
      <div className="flex space-x-2 text-2xl" data-qa-id="rating-stars">
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            onClick={() => setScore(n)}
            style={{ cursor: "pointer", color: n <= score ? "gold" : "gray" }}
            data-qa-id={`star-${n}`}
          >
            ★
          </span>
        ))}
      </div>
      {score > 0 && (
        <p className="mt-4 text-green-600 font-semibold" data-qa-id="rating-msg">
          ¡Gracias por darnos {score} estrella{score > 1 ? "s" : ""}!
        </p>
      )}
    </div>
  );
}

export default Rating;
