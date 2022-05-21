import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddressService } from 'src/app/services/address/address.service'
import { Storage } from '@ionic/storage';
import { AddressGroup } from 'src/app/models/address-group';
import { CheckDataService } from 'src/app/services/check-data/check-data.service';
import { ProjectIdService } from 'src/app/services/project-id/project-id.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
})
export class MembersPage implements OnInit {
  public addressArray: Array<AddressGroup> = [];
  projectId: number;


  constructor(
    public storage: Storage, private checkDataService: CheckDataService,
    private projectIdService: ProjectIdService

  ) { }


  ngOnInit(): void {
    this.loadInfo();
  }
  // Pasa los datos desde el local storage de address a un array
  loadInfo() {
    this.projectId = this.projectIdService.projectId;
  
      this.checkDataService.checkAddressLocal();
      this.checkDataService.addressObs.subscribe((address) => {

        var array: Array<AddressGroup> = Object.values(address);

        array.filter((address) => {
          if (address.id == this.projectId) {
            this.addressArray.push(address);
    
          };
        })
  
  
      })
  }
}