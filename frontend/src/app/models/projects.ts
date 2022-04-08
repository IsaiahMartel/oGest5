import { Seasons } from "./seasons/seasons";

export class Projects {
        id: number;
        nameProject: string;	
        startDateProject: Date;	
        endDateProject: Date;	
        published: boolean;
        orchestrationProject: String;	
        seasons_id: number;
        
        season: Seasons;
  
}
