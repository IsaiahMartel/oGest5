import { Project } from "./project";
import { Room } from "./room";


export class Shedule {
  id: number;
    sheduleTipe: string;
    sheduleDate: Date;
    shedulehourRange: String;
    rooms: Room;
  project_id: number;
  sheduleNote: string;
}
