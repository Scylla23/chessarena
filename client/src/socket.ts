import { Socket, io } from "socket.io-client";

const URL = 'https://chessarena.onrender.com';

export const socket: Socket = io(URL, {
    autoConnect: false
});