import { Injectable } from '@angular/core';
import { ModalConnectionService } from '../modal-connection/modal-connection.service';

@Injectable({
  providedIn: 'root'
})
export class BackendStatusService {

  constructor(private modalConnection:ModalConnectionService) {

   }

  //  changeStatus(boolean){
  //    return this.modalConnection.backendDown=boolean;
  //  }
}
