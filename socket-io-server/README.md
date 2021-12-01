## Rodar o server:

`npm run start`

### eventos emitidos pelo server:

-   `getInfoOnConnectRes` inicializa array de salas e array de users

-   `usersUpdate` atualiza array de users

-   ` roomsUpdate` sala criada

-   ` joinRoomRes` entrar na sala

-   `userJoined` usuário entrou na sala

-   `leaveRoomRes` sair da sala

-   `moveRes` emite a jogada do oponente

-   `userLeft` sinaliza que o oponente saiu da sala

-   ` disconnect` desconectar

### eventos recebidos pelo server:

-   `registerUser` registrar novo usuário

-   `getInfoOnConnect` inicializa array de salas e array of users

-   `createRoom` criar sala

-   `joinRoom` entrar na sala

-   ` leaveRoom` sair da sala

-   ` cleanup` remove usuário de todos os arrays e o desconecta

-   `move` fazer jogada

-   `gameOver` sinaliza que o jogo acabou

-   `leaveGameRoom` retira o usuário da sala do jogo

-   `disconnect` desconectar
