import { Address } from "./address";
import { AddressGroup } from "./address-group";
import { Event } from "./event";

export class Project {
    id: number;
    projectDateIni: Date;
    projectDateEnd: Date;
    events: Event;
    addresses : Address;
    addressgroups: AddressGroup;
    addressfirstName: string;
    addresslastName: string;
}
