import { FormEvent, useState } from "react";
import "./formLogin.css";

export function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <label className="label" htmlFor="email">
          E-mail:
        </label>
        <input className="input" type="email" name="email" id="email" />
        <label className="label" htmlFor="password">
          Senha:
        </label>
        <input
          className="input"
          type="password"
          name="password"
          id="password"
        />

        <div id="rememberMeContainer">
          <input
            className="checkbox"
            type="checkbox"
            name="checkbox"
            id="checkbox"
          />
          <label className="remember-me" htmlFor="checkbox">
            Lembrar-me
          </label>
        </div>
        <button className="btn" type="submit">
          Entrar
        </button>
      </form>
    </div>
  );
}
