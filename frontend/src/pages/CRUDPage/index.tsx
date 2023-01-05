import { useEffect, useState } from "react";
import axios from "axios";
import { BackToHome } from "../../components/BackToHome";
import edit from "../../assets/edit.svg";
import trash from "../../assets/trash.svg";
import "./crudPage.css";
import { api } from "../../services/api";

interface IRegister {
  _id: string;
  name: string;
  email: string | any;
  telephone: string;
  address: string;
  cpf: string | any;
}

// interface IFunctions {
//   getData: () => void,
//   handleAddUser: (e:any) => void,
//   handleUpdateUser: (e:any) => void,
//   handleDeleteUser: (id:string) => void,
// }

const initialValues: IRegister = {
  _id: "",
  name: "",
  email: "",
  telephone: "",
  address: "",
  cpf: "",
};

export function CrudPage() {
  const [userData, setUserData] = useState([] as IRegister[]);
  const [values, setValues] = useState(initialValues);
  const [atualize, setAtualize] = useState(false);
  const [clickedEdit, setClickedEdit] = useState(false);
  const [selectedCard, setSelectedCard] = useState({} as IRegister);
  const msgSuccess = document.querySelector(".msg");

  function getData() {
    try {
      api.get("/register").then((response) => {
        setUserData(response.data);
      });
    } catch (error) {
      alert("Houve um erro");
    }
  }

  function onChange(ev: any) {
    const { name, value } = ev.target;
    setValues({ ...values, [name]: value });
  }

  function modalClickEdit() {
    setClickedEdit(!clickedEdit);
  }

  function onEditChange(ev: any) {
    const { name, value } = ev.target;
    setSelectedCard({ ...selectedCard, [name]: value });
  }

  function handleAddUser(e: any) {
    e.preventDefault();
    try {
      api.post("/register", values).then(() => {
        setAtualize(!atualize);
      });
      setValues(initialValues);
    } catch {
      alert("Houve um erro ao inserir os dados");
    }
  }

  function handleEditUser(id: any): void {
    fetch(`http://localhost:5000/register/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedCard),
    })
      .then((response) => response.json())
      .then((data) => {
        setSelectedCard(data);
        setAtualize(!atualize);
        setClickedEdit(!clickedEdit);
        msgSuccess?.classList.add("msgSuccess");
      });

    if (msgSuccess) {
      setTimeout(() => {
        msgSuccess.classList.remove("msgSuccess");
      }, 3000);
    }
  }

  function handleDeleteUser(id: string): void {
    if (confirm("Deseja mesmo excluir este card ?")) {
      api.delete(`/register/${id}`).then(() => {
        setAtualize(!atualize);
      });
      return;
    }
  }

  useEffect(() => {
    getData();
  }, [atualize]);

  return (
    <section className="section">
      <BackToHome />

      <div className="formContainer">
        <form className="formCrud">
          <h1 className="titleCrud">CRUD</h1>

          <div className="inputErrorContainer">
            <p>Todos os campos são obrigatórios</p>
            <input
              className="inputCrud"
              onChange={onChange}
              name="name"
              type="text"
              placeholder="Nome"
              value={values.name}
            />
          </div>

          <div className="inputErrorContainer">
            <input
              className="inputCrud"
              onChange={onChange}
              name="email"
              type="email"
              placeholder="E-mail *"
              required
              value={values.email}
            />
            <span
              id="erroEmail"
              style={{ color: "red", fontSize: ".8rem" }}
            ></span>
          </div>

          <div className="inputErrorContainer">
            <input
              className="inputCrud"
              onChange={onChange}
              name="telephone"
              type="text"
              placeholder="Telefone"
              value={values.telephone}
            />
          </div>

          <div className="inputErrorContainer">
            <input
              className="inputCrud"
              onChange={onChange}
              name="address"
              type="text"
              placeholder="Endereço"
              value={values.address}
            />
          </div>

          <div className="inputErrorContainer">
            <input
              className="inputCrud"
              onChange={onChange}
              name="cpf"
              type="text"
              placeholder="CPF *"
              required
              value={values.cpf}
            />
            <span id="erro" style={{ color: "red", fontSize: ".8rem" }}></span>
          </div>
          <div className="formBtn">
            <button className="btnCrud" onClick={handleAddUser} type="submit">
              Adicionar
            </button>
          </div>
        </form>
      </div>

      <div className="crudCards">
        {userData.map((user) => (
          <div
            onClick={() => setSelectedCard(user)}
            className="userInfos"
            key={user.cpf}
          >
            <h1 className="name">Nome: {user.name}</h1>
            <p>E-mail: {user.email}</p>
            <p>Telefone: {user.telephone}</p>
            <p>Endereço: {user.address}</p>
            <p aria-required>CPF: {user.cpf}</p>
            <div onClick={() => setSelectedCard(user)} className="icons">
              <img
                onClick={modalClickEdit}
                className="icon"
                src={edit}
                alt="Icone de editar"
              />
              <img
                onClick={() => handleDeleteUser(user._id!)}
                className="icon delete"
                src={trash}
                alt="Icone de excluir"
              />
            </div>
            <span>-------------</span>
          </div>
        ))}
      </div>

      <span className="msg">Dados atualizados com sucesso</span>

      {clickedEdit ? (
        <div className="modalContainer">
          <div className="modal">
            <h1 className="EditTitle">Atualização dos dados</h1>
            <div className="labelInputContainer">
              <label className="labelEdit" htmlFor="name">
                Nome:{" "}
              </label>
              <input
                className="inputCrud"
                name="name"
                type="text"
                placeholder="Nome"
                value={selectedCard.name}
                onChange={onEditChange}
              />
            </div>

            <div className="labelInputContainer">
              <label className="labelEdit" htmlFor="email">
                Email:{" "}
              </label>
              <input
                className="inputCrud"
                name="email"
                type="email"
                placeholder="E-mail"
                required
                value={selectedCard.email}
                onChange={onEditChange}
              />
            </div>

            <div className="labelInputContainer">
              <label className="labelEdit" htmlFor="telephone">
                Telefone:{" "}
              </label>
              <input
                className="inputCrud"
                name="telephone"
                type="text"
                placeholder="Telefone"
                value={selectedCard.telephone}
                onChange={onEditChange}
              />
            </div>

            <div className="labelInputContainer">
              <label className="labelEdit" htmlFor="address">
                Endereço:{" "}
              </label>
              <input
                className="inputCrud"
                name="address"
                type="text"
                placeholder="Endereço"
                value={selectedCard.address}
                onChange={onEditChange}
              />
            </div>

            <div className="labelInputContainer">
              <label className="labelEdit" htmlFor="fullcpfName">
                CPF:{" "}
              </label>
              <input
                className="inputCrud"
                name="cpf"
                type="string"
                placeholder="CPF"
                required
                value={selectedCard.cpf}
                onChange={onEditChange}
              />
            </div>

            <div className="btnEditContainer">
              <button
                className="buttonEdit"
                onClick={() => handleEditUser(selectedCard._id)}
              >
                Atualizar
              </button>
              <button
                className="buttonEdit editClose"
                onClick={() => setClickedEdit(false)}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
