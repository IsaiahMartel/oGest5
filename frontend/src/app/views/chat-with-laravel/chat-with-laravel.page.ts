import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Echo } from 'laravel-echo-ionic';
import { AuthService } from 'src/app/services/auth/auth.service';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';

@Component({
  selector: 'app-chat-with-laravel',
  templateUrl: './chat-with-laravel.page.html',
  styleUrls: ['./chat-with-laravel.page.scss'],
})
export class ChatWithLaravelPage implements OnInit {
  messages = [];
  nickname = this.authService.username;
  message = '';

  constructor(private route: ActivatedRoute, private webSocket: WebsocketService,
    private authService: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.doConnection();
    });
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

    console.log("xd");
    

    const channel = echo.channel('channel');
    channel.listen('Hello', (data) => {
      console.log("algo llegó")
      console.log(this.nickname, " ", JSON.stringify(data));
      this.messages.push(data);
    });
  }

  sendMessage() {
    console.log(this.nickname, " ", this.message);

    this.webSocket.sendBroadcastChat({ from: this.nickname, text: this.message }).subscribe(() => {
      this.message = '';
    });

  }

}