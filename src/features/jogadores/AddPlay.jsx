import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { useState } from "react";
import { playerAdded } from "./PlaySlice";

export function AddPlayer() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = useLocation();
  const timesId = parseInt(pathname.replace("/add-player/", ""));

  const [nome, setName] = useState("");
  const [error, setError] = useState(null);

  const handleName = (e) => setName(e.target.value);

 // const usersAmount = useSelector((state) => state.players.entities.length);

  const maxId = useSelector((state) => state.players.entities.reduce(
    (max, item) => (item.id > max ? item.id : max), 0 ));

  const handleClick = () => {
    if (nome) {
      dispatch(
        playerAdded({
          id : maxId + 1,
          nome,
          timesId
        })
      );

      setError(null);
      history.push(`/player-list/${timesId}`);
    } else {
      setError("Preencha todos os campos");
    }

    setName("");
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Incluir Jogador</h1>
      </div>
      <div className="row">
        <div className="three columns">
          <label htmlFor="nameInput">Nome</label>
          <input
            className="u-full-width"
            type="text"
            placeholder="nome do jogador"
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