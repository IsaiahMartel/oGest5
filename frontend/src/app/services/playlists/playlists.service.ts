import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { catchError, tap } from 'rxjs/operators';
import { Playlist } from 'src/app/models/playlist';

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService {
  // endpoint: string = "http://localhost:8000/api/mobile/getPlaylist";
  endpoint: string = "https://ogest5.duckdns.org:8430/api/mobile/getPlaylist";

  constructor(private httpClient: HttpClient,
  ) {

  }
  getPlaylists() {
    return this.httpClient.get<Playlist[]>(this.endpoint);
  }

}


