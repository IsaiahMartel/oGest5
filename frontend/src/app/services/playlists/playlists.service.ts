import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { catchError, tap } from 'rxjs/operators';
import { Playlist } from 'src/app/models/playlist';

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService {
  endpoint: string = "http://81.47.172.149:8300/api/mobile/getPlaylist";

  constructor(private httpClient: HttpClient,
  ) {

  }
  getPlaylists() {
    return this.httpClient.get<Playlist[]>(this.endpoint);
  }

}


