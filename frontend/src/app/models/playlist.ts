<<<<<<< HEAD
import { WorksPage } from "../views/projects/project-tabs/works/works.page";
import { Instrument } from "./instrument";
import { Perplaylists } from "./perplaylists";
import { Works } from "./works";

export class Playlist {
    workName: string;
    workDuration: string;
    playlistString: string;
=======
import { Instrument } from "./instrument";
import { Perplaylists } from "./perplaylists";

export class Playlist {
    workName: String;
    workDuration: String;
    playlistString: String;
>>>>>>> 061e204417dd68f16f88b8abe0e307bdd76858e5
    project_id: number;
    perplaylists : Perplaylists;
    keyplaylists : Instrument;
    voiplaylists : Instrument;
  playlistOrder: number;
<<<<<<< HEAD
works: Works;

  flute: number;
fluteExp: string;
oboe: number;
oboeExp: string;
clarinet: number;
clarinetExp: string;
bassoon: number;
bassoonExp: string;

horn: number;
hornExp: string;
trumpet: number;
trumpetExp: string;
trombone: number;
tromboneExp: string;
tuba: number;
tubaExp: string;
timpani: number;

percusion: number;
harp: number;
harpExp: string;
keyboard: number;
keyboardExp: string;
extra: number;
extraExp: string;
stringsExp: string;
=======
>>>>>>> 061e204417dd68f16f88b8abe0e307bdd76858e5
}
