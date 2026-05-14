import { io } from "socket.io-client";

// This pulls the URL from your environment variables
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001";

export const socket = io(SOCKET_URL, {
  autoConnect: false, // We connect only when the user joins a game
});
