import { WorksPage } from "../views/projects/project-tabs/works/works.page";
import { Instrument } from "./instrument";
import { Perplaylists } from "./perplaylists";
import { Works } from "./works";

export class Playlist {
    workName: string;
    workDuration: string;
    playlistString: string;
    project_id: number;
    perplaylists : Perplaylists;
    keyplaylists : Instrument;
    voiplaylists : Instrument;
  playlistOrder: number;
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
}
