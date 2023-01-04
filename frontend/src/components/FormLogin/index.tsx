import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validarUsername } from "../../Utils/validadores";
import { validarPassword } from "../../Utils/validadores";
import "./formLogin.css";

interface IFields {
  username: string;
  password: string;
}

const initialFields: IFields = {
  username: "",
  password: "",
};

export function FormLogin() {
  const [fields, setFields] = useState(initialFields);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function onChange(ev: any) {
    const { name, value } = ev.target;
    setFields({ ...fields, [name]: value });
  }

  function handleSubmit(e: any) {
    e.preventDefault();


    try {
      axios.post("http://localhost:5000/auth/login", fields).then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        if (localStorage.getItem("token")) {
          navigate("/listPage");
        } else {
          alert("Usuário ou Senha não encontrados");
        }
      });
    } catch {
      alert("Houve um erro");
    }

    setFields(initialFields);
  }

  return (
      <form className="form" onChange={onChange}>
        <label className="label" htmlFor="email">
          Username:
        </label>
        <input
          className="input"
          type="text"
          name="username"
          id="username"
          value={fields.username}
          required
        />
        <label className="label" htmlFor="password">
          Senha:
        </label>
        <input
          className="input"
          type="password"
          name="password"
          id="password"
          value={fields.password}
          required
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
        <button onClick={handleSubmit} className="btnLogin" type="submit">
          Entrar
        </button>
      </form>
  );
}
