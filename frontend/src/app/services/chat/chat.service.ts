import { Injectable } from '@angular/core';
import {io} from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  io = io("http://localhost:3001",{
    /* withCredentials:true, */
    autoConnect: true,
  })
  constructor() {
    console.log("socket service")
    this.io.on("connect",()=>console.log("backend Conectado"));
  }
}
