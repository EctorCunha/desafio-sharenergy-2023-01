import { useEffect, useState } from "react";
import { BackToHome } from "../../components/BackToHome";
import axios from "axios";
import edit from "../../assets/edit.svg";
import trash from "../../assets/trash.svg";
import "./crudPage.css";


interface IUser {
  id?: string;
  fullName: string;
  photo: string;
  email: string;
  username: string;
  password?: string;
  age: number | string;
}

// interface IFunctions {
//   getData: () => void,
//   handleAddUser: (e:any) => void,
//   handleUpdateUser: (e:any) => void,
//   handleDeleteUser: (id:string) => void,
// }

const initialValues: IUser = {
  fullName: "",
  photo: "",
  email: "",
  username: "",
  age: "",
};

export function CrudPage() {
  const [userData, setUserData] = useState([] as IUser[]);
  const [values, setValues] = useState(initialValues);
  const [atualize, setAtualize] = useState(false);
  const [clickedEdit, setClickedEdit] = useState(false);
  const [selectedCard, setSelectedCard] = useState({} as IUser);

  function getData() {
    try {
      axios.get("http://localhost:5000/user").then((response) => {
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

  function handleAddUser(e: any) {
    e.preventDefault();
    try {
      axios.post("http://localhost:5000/user", values).then(() => {
        setAtualize(!atualize);
      });
      setValues(initialValues);
    } catch (error) {
      alert("Houve um erro");
    }
  }

  function modalClickEdit() {
    setClickedEdit(!clickedEdit);
  }


  function handleUpdateUser(id: string): void {
    axios.put(`http://localhost:5000/user/${id}`, values).then(() => {
    });
    setClickedEdit(!clickedEdit);
  }

  function Edit(){
    modalClickEdit()
    handleUpdateUser(selectedCard._id)
  }

  function handleDeleteUser(id: string): void {
    if (confirm("Deseja mesmo excluir este card ?")) {
      axios.delete(`http://localhost:5000/user/${id}`).then(() => {
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
          <input
            className="inputCrud"
            onChange={onChange}
            name="fullName"
            type="text"
            placeholder="Nome Completo"
            value={values.fullName}
          />
          <input
            className="inputCrud"
            onChange={onChange}
            name="photo"
            type="text"
            placeholder="Foto"
            value={values.photo}
          />
          <input
          className="inputCrud"
            onChange={onChange}
            name="email"
            type="text"
            placeholder="E-mail"
            value={values.email}
          />
          <input
          className="inputCrud"
            onChange={onChange}
            name="username"
            type="text"
            placeholder="Username"
            value={values.username}
          />
          <input
          className="inputCrud"
            onChange={onChange}
            name="age"
            type="text"
            placeholder="Idade"
            value={values.age}
          />
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
            key={user.email}
          >
              <h1 className="fullName">Nome Completo: {user.fullName}</h1>
              <img className="cardImg" src={user.photo} />
              <p aria-required >E-mail: {user.email}</p>
              <p>Username: {user.username}</p>
              <p>Idade: {user.age}</p>
              <div className="icons">
                <img
                  // onClick={() => handleUpdateUser(values.id)}
                  onClick={Edit}
                  className="icon"
                  src={edit}
                  alt="Icone de editar"
                />
                <img
                  onClick={()=>handleDeleteUser(user._id!)}
                  className="icon delete"
                  src={trash}
                  alt="Icone de excluir"
                />
              </div>
              <span>-------------</span>
            </div>
        ))}
      </div>

      {clickedEdit ? (
        <div className="modalContainer" data-backdrop='static'>
          <div className="modal">
          <h1>Atualização dos dados</h1>
          <input
            name="fullName"
            type="text"
            placeholder="Nome Completo"
            value={selectedCard.fullName}
            onChange={(e) => setSelectedCard(e.target.value)}
          />
          <input
            name="photo"
            type="text"
            placeholder="Foto"
            value={selectedCard.photo}
            onChange={(e) => setSelectedCard(e.target.value)}
          />
          <input
            name="email"
            type="text"
            placeholder="E-mail"
            value={selectedCard.email}
            onChange={(e) => setSelectedCard(e.target.value)}
          />
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={selectedCard.username}
            onChange={(e) => setSelectedCard(e.target.value)}
          />
          <input
            name="age"
            type="text"
            placeholder="Idade"
            value={selectedCard.age}
            onChange={(e) => setSelectedCard(e.target.value)}
          />

          <div className="btnEdit">
            <button onClick={() => handleUpdateUser(selectedCard._id)}>
              Atualizar
            </button>
            <button onClick={() => setClickedEdit(false)}>Fechar</button>
          </div>
        </div>
        </div>
      ) : null}
    </section>
  );
}
