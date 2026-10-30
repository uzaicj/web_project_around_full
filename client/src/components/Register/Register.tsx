
import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

interface RegisterProps {
  onRegister: (email: string, password: string) => Promise<void>;
}

function Register({ onRegister }: RegisterProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await onRegister(email, password);
    } catch {
      setErrorMessage("No se pudo crear la cuenta. Revisa tus datos.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="auth">
      <h1 className="auth__title">Regístrate</h1>

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
          autoComplete="new-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        {errorMessage && (
          <p className="auth__error">{errorMessage}</p>
        )}

        <button
          className="auth__button"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creando cuenta..." : "Registrarse"}
        </button>
      </form>

      <p className="auth__caption">
        ¿Ya eres miembro? <Link to="/signin">Inicia sesión aquí</Link>
      </p>
    </main>
  );
}

export default Register;
