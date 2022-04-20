import { Instrument } from "./instrument";
import { Perplaylists } from "./perplaylists";

export class Playlist {
    workName: String;
    workDuration: String;
    playlistString: String;
    project_id: string;
    perplaylists : Perplaylists;
    keyplaylists : Instrument;
    voiplaylists : Instrument;
}
