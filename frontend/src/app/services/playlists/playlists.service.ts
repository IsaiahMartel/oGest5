import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { catchError, tap } from 'rxjs/operators';
import { Playlist } from 'src/app/models/playlist';

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService {
  endpoint: string = "http://localhost:8000/api/mobile/getPlaylist";

  constructor(private httpClient: HttpClient,
  ) {

  }
  getPlaylists() {
    return this.httpClient.get<Playlist[]>(this.endpoint);
  }
  // getPlaylistByProjectId(projectId) {
  //   return this.httpClient.get<Playlist[]>(this.endpoint + "/" + projectId).pipe(
  //     tap(_ => console.log("PlaylistProject retrieved")),
  //     catchError(this.handleError<Playlist[]>("Get playlist project", []))
  //   );
  // }
  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //     console.error(error);
  //     console.log(`${operation} failed: ${error.message}`);
  //     return of(result as T);
  //   };
  // }
}


