import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AfterViewInit, Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { GestureController, MenuController } from '@ionic/angular';
import { PdfService } from 'src/app/services/pdf/pdf.service';
import { ModalController } from '@ionic/angular';

import { Echo } from 'laravel-echo-ionic';

import { AlertController } from '@ionic/angular';

import { Playlist } from 'src/app/models/playlist';
import { Address } from 'src/app/models/address';
import { AddressGroup } from 'src/app/models/address-group';
import { Storage } from '@ionic/storage';

const headers = new HttpHeaders({
  "Accept": 'application/json',
  'Content-Type': 'application/json'
});

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  url: string = "http://localhost:8000/api";

  constructor(private httpClient: HttpClient, private alertController: AlertController) { }

  sendBroadcastChat(message) {
    return this.httpClient.post(`${this.url}/chat`, JSON.stringify(message), { headers });
  }

  sendBroadcast() {
    console.log(this.httpClient.get(`${this.url}/broadcast`, { headers }));
    
    return this.httpClient.get(`${this.url}/broadcast`, { headers });
  }
  
  doConnection() {
  
    const echo = new Echo({
      broadcaster: 'pusher',
      key: 'local',
      wsHost: 'localhost',
      wsPort: 6001,
      forceTLS: false,
      disableStats: true
    });

  echo.connector.pusher.connection.bind('state_change', function(states) {
      if(states.current === 'disconnected') {
          echo.connector.pusher.connect();
      }
    });


    echo.connector.pusher.connection.bind('unavailable', function () {
      var divConnectionAlert = document.getElementById("connection-alert");





      divConnectionAlert.innerHTML = '<h1 id="connection-text">No se puede establecer conexion con el servidor</h1>';


      divConnectionAlert.style.backgroundColor = "red";

    })

    echo.connector.pusher.connection.bind('failed', function () {
      var divConnectionAlert = document.getElementById("connection-alert");





      divConnectionAlert.innerHTML = '<h1 id="connection-text">La conexioni con el servidor fallo</h1>';


      divConnectionAlert.style.backgroundColor = "red";

    })

    echo.connector.pusher.connection.bind('disconnected', function () {
      var divConnectionAlert = document.getElementById("connection-alert");





      divConnectionAlert.innerHTML = '<h1 id="connection-text">Server caido</h1>';


      divConnectionAlert.style.backgroundColor = "red";



      this.isOnline = false;

    });

    // echo.connector.pusher.connection.bind('error', this.state("serverDown"))

    echo.connector.pusher.connection.bind("error", function (error) {
      var divConnectionAlert = document.getElementById("connection-alert");



      console.error("connection error", error);

      divConnectionAlert.innerHTML = '<h1 id="connection-text">Server con errores</h1>';


      divConnectionAlert.style.backgroundColor = "red";



      this.isOnline = false;

    });

    echo.connector.pusher.connection.bind('connected', function () {
      var divConnectionAlert = document.getElementById("connection-alert");



        divConnectionAlert.innerHTML = '<h1 id="connection-text">Servidor levantado</h1>';
        divConnectionAlert.style.backgroundColor = "green";
        setTimeout(() => {
          this.htmlToAdd = '';
          divConnectionAlert.style.backgroundColor = "transparent";
          this.isOnline = true;
        },
          5000);
      
    });





    const channel = echo.channel('channel');
    channel.listen('Message', (data) => {
      console.log(JSON.stringify(data));
      this.notification(data);
   

    });

  }

  async notification(message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Se han realizado cambios',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}