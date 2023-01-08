import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import {login,isAuthenticated, remember, TOKEN_KEY} from "../../services/auth";
import { ButtonLogin } from "../ButtonLogin";
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
  const [validated, setValidated] = useState('');
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
      } else {
        alert(res.data.message);
      }
      
      setValidated(res.data.token);
    });
    
    if(fields.username === "" || fields.password === ""){
      alert("Por favor, preencha todos os campos");
    }

    } catch {
      alert("Houve um erro no login");
    }
    setFields(initialFields);
  }

  function hadleRemerberMe(e: any){
    if(e.target.checked){
      remember(TOKEN_KEY);
    }
  }

  return (
      <form className="form">
        <label className="label" htmlFor="email">
          Username:
        </label>
        <input
          onChange={onChange}
          data-testid="form-username"
          className="input"
          type="text"
          name="username"
          id="username"
          value={fields.username}
          autoComplete="username"
          placeholder="Digite seu username"
          required
        />
        <label className="label" htmlFor="password">
          Senha:
        </label>
        <input
          onChange={onChange}
          data-testid="form-password"
          className="input"
          type="password"
          name="password"
          id="password"
          value={fields.password}
          autoComplete="current-password"
          placeholder="Digite sua senha"
          required
        />

        <div id="rememberMeContainer">
          <input
            onChange={hadleRemerberMe}
            data-testid="form-checkbox"
            className="checkbox"
            type="checkbox"
            name="checkbox"
            id="checkbox"
          />
          <label className="remember-me" htmlFor="checkbox">
            Lembrar-me
          </label>
        </div>
        <ButtonLogin handleLogin={handleLogin}/>
      </form>
  );
}
