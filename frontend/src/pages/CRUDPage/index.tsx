import { useEffect, useState } from "react";
import { BackToHome } from "../../components/BackToHome";
import "./crudPage.css";

interface User {
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  phone: string;
  website: string;
  gender: string;
  city: string;
  state: string;
  country: string;
}

export function CrudPage() {
  const [userData, setUserData] = useState([] as User[]);

  function handleCreateUser() {
    fetch("https://randomuser.me/api/?results=10")
      .then((response) => response.json())
      .then((data) => setUserData(data.results));
  }

  useEffect(() => {
    handleCreateUser();
  }, []);

  return (
    <section className="section">
      <div id="crudContainer">
        <BackToHome />
        <h1 className="tilteCrud">CRUD Page</h1>
      </div>

    <div className="crudCards">
      {userData.map((user) => (
        <div className="userInfos" key={user.email}>
          <h1>{user.name.first}</h1>
          <p>{user.email}</p>
          <p>{user.phone}</p>
          <p>{user.website}</p>
          <span>-------------</span>
        </div>
      ))}
      </div>
    </section>
  );
}
