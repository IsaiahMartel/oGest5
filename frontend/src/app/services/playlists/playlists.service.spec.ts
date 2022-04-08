import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { PlaylistsService } from './playlists.service';


describe('PlaylistsService', () => {
  let service: PlaylistsService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        HttpClientModule,
      ],
      
      
    });
    service = TestBed.inject(PlaylistsService);
    

  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });

  it('getPlaylist() tiene que traer ', async () => {
    await service.getPlaylistProjectsByProjectId(4).then((playlistArray)=>{
      expect(playlistArray[0].order).toBe("Vivaldi / Händel / Pachelbel /")
    })
  });
});
