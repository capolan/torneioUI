import { useDispatch, useSelector } from "react-redux";

import { useHistory } from "react-router-dom";
import { useState } from "react";
import { userAdded } from "./UserSlice";

export function AddUser() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [nome, setName] = useState("");
  const [error, setError] = useState(null);

  const handleName = (e) => setName(e.target.value);

  const usersAmount = useSelector((state) => state.users.entities.length);

  const handleClick = () => {
    if (nome) {
      let dt = new Date();
      const criadoEm = dt.toISOString().split('T')[0];
      dispatch(
        userAdded({
          id: usersAmount + 1,
          nome,
          criadoEm,
        })
      );

      setError(null);
      history.push("/");
    } else {
      setError("Preencha todos os campos");
    }

    setName("");
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Add user</h1>
      </div>
      <div className="row">
        <div className="three columns">
          <label htmlFor="nameInput">Nome</label>
          <input
            className="u-full-width"
            type="text"
            placeholder="nome do país"
            id="nameInput"
            onChange={handleName}
            value={nome}
          />
          {error && error}
          <button onClick={handleClick} className="btn-primary">
            Incluir
          </button>
        </div>
      </div>
    </div>
  );
}