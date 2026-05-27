/**
 * Singleton Socket.IO connection for market data.
 * Shared by Market.tsx and MarketDetail.tsx so only ONE connection is created.
 */
import { io, Socket } from "socket.io-client";
import authAxios from "src/modules/shared/axios/authAxios";

let _socket: Socket | null = null;

export function getMarketSocket(): Socket {
  if (!_socket) {
    const serverBase = (authAxios.defaults.baseURL as string).replace("/api", "");
    _socket = io(serverBase, {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 2000,
    });
  }
  return _socket;
}
