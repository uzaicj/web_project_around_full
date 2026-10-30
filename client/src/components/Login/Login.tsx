
import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

interface LoginProps {
  onLogin: (email: string, password: string) => Promise<void>;
}

function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await onLogin(email, password);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="auth">
      <h1 className="auth__title">Inicia sesión</h1>

      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          className="auth__input"
          type="email"
          name="email"
          placeholder="Correo electrónico"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <input
          className="auth__input"
          type="password"
          name="password"
          placeholder="Contraseña"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <button
          className="auth__button"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
        </button>
      </form>

      <p className="auth__caption">
        ¿Aún no eres miembro? <Link to="/signup">Regístrate aquí</Link>
      </p>
    </main>
  );
}

export default Login;
