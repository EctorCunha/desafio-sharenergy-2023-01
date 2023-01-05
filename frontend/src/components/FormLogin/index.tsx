import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { validarUsername } from "../../Utils/validadores";
import { validarPassword } from "../../Utils/validadores";
import {login, logout, nomeUsuario} from "../../services/auth";
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
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function onChange(ev: any) {
    const { name, value } = ev.target;
    setFields({ ...fields, [name]: value });
  }

  function handleLogin(e:any){
    e.preventDefault();
    try {
      api.post("/auth/login", fields)
    .then((res) => {
        if(res.data.token){
          login(res.data.token);
          navigate("/listPage");
        } else if(!res.data.token){
          alert("Usuário ou Senha não encontrados");
        }
    });

    if(fields.username === "" || fields.password === ""){
      alert("Preencha todos os campos");
    }
    } catch {
      alert("Houve um erro no login");
    }
    setFields(initialFields);

    
  }


  function handleSubmit(e: any) {
    e.preventDefault();


    try {
      api.post("/auth/login", fields)
      .then((res) => {
        console.log(res.data)
        localStorage.setItem("token", res.data.token);
        if (localStorage.getItem("token")) {
          navigate("/listPage");
        } else if(!localStorage.getItem("token")){
          navigate("/login")
        } 
        else {
          alert("Usuário ou Senha não encontrados");
        }
      });
    } catch {
      alert("Houve um erro no login");
    }

    setFields(initialFields);
  }



  return (
      <form className="form">
        <label className="label" htmlFor="email">
          Username:
        </label>
        <input
        onChange={onChange}
          className="input"
          type="text"
          name="username"
          id="username"
          value={fields.username}
          autoComplete="username"
          required
        />
        <label className="label" htmlFor="password">
          Senha:
        </label>
        <input
        onChange={onChange}
          className="input"
          type="password"
          name="password"
          id="password"
          value={fields.password}
          autoComplete="current-password"
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
        <button onClick={handleLogin} className="btnLogin" type="submit">
          Entrar
        </button>
      </form>
  );
}
