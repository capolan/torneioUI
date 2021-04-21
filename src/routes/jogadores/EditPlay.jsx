import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { useState } from "react";
import { playerUpdated } from "./PlaySlice";

export function EditPlayer() {
  const { pathname } = useLocation();
  const playerId = parseInt(pathname.replace("/edit-player/", ""));

  const { timesId }= useSelector((state) => state.players.entities.find((u) => u.id === playerId));

  const user = useSelector((state) => {
    console.log("playerId",playerId);
    console.log("players",state.players);
    return state.players.entities.find((u) => u.id === playerId);
  }
  );

  const dispatch = useDispatch();
  const history = useHistory();

  const [nome, setName] = useState(user.nome);
  const [error, setError] = useState(null);

  const handleName = (e) => setName(e.target.value);

  const handleClick = () => {
    if (nome) {
      dispatch(
        playerUpdated({
          id: playerId,
          nome,
        })
      );

      setError(null);
      history.push(`/player-list/${timesId}`);
    } else {
      setError("Preencha o nome");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Editar Jogador</h1>
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
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}