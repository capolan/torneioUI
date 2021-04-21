# Torneio MV - FrontEnd

## Desafio

```
MV Sistemas – Desenvolvedor


O intuito é desenvolver um sistema para controlar um torneio, onde deverá ser possível cadastrar os times e seus respectivos jogadores (CRUD).

Para iniciar uma partida é necessário no mínimo ter dois times cadastrados com 5 jogadores em cada time.

Ao iniciar um jogo, deverá ser possível selecionar os dois times que irão duelar e informar o placar final da partida, apontando assim a equipe vencedora.

O Back-end deve ser desenvolvida uma API, com serviços REST, utilizando .Net Core. Desejável utilizar as práticas do DDD para organização dos projetos.

O Front-end deve ser desenvolvido com React/Redux. Desejável utilizar a biblioteca Styled Component e Bootstrap.

O código deve ser disponibilizado no GitHub.
```

## Solução

- Desenvolvido em react/redux;
- Incluído Styled e Bootstrap;
- Conecta ao serviço http://fifa.ddns.net (configuração em logic/config.jsx);
- Torneio tem 3 telas:
  - Times: CRUD dos times do torneio;
  - Jogadores: CRUD de jogadores;
  - Jogos: informa as partidas criadas e o placas. Na mesma tela tem a classificação das equipes.

## Regras

- Times:

  - ao criar o time, ele inicia sem jogador;
  - ao remover um time, todos os jogadores e jogos são removidos;

- Jogadores:

  - após incluir o 5 jogador, o sistema monta os jogos automaticamente;
  - após remover o 5 jogador, o sistema remove os jodos deste time automaticamente;

- Jogos
  - clicar em Placar para gerar o resultado da partida;
  - classificação apresenta a pontuação de cada equipe.
