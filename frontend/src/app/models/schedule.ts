import { Time } from "@angular/common";

export class Schedule {
    id: number;
    project_id: number;	
    date: Date;	
    type_schedules_id: number;	
    hourRange: Time;	
    note: String;	
    rooms_id: number;	
}
