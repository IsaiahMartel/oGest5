import { Composers } from "./composers";

export class Works {
    id: number;
    workName: string;
    workName2: string;
    workCatalog: string;
    workCompYear: string;
    workDuration: string;
    workArrangement: string;
  workDetails: string;
  workNotes: string;

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
  composers: Composers;
}
