import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddressService } from 'src/app/services/address/address.service'
import { Storage } from '@ionic/storage';
import { AddressGroup } from 'src/app/models/address-group';
import { CheckDataService } from 'src/app/services/check-data/check-data.service';
import { ProjectIdService } from 'src/app/services/project-id/project-id.service';
<<<<<<< HEAD
import { Project } from 'src/app/models/project';
import { Address } from 'src/app/models/address';
=======
>>>>>>> 061e204417dd68f16f88b8abe0e307bdd76858e5

@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
})
export class MembersPage implements OnInit {
<<<<<<< HEAD
  public projectArray: Array<Project> = [];
  public addressArray: Array<Address> = [];
=======
  public addressArray: Array<AddressGroup> = [];
>>>>>>> 061e204417dd68f16f88b8abe0e307bdd76858e5
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
<<<<<<< HEAD
      this.checkDataService.addressObs.subscribe((project) => {

        var array: Array<Project> = Object.values(project);

        array.filter((project) => {
          if (project.id == this.projectId) {
            this.projectArray.push(project);

            for(let p of this.projectArray){
             
for(let address in p.addresses){

  
  this.addressArray.push(p.addresses[address]);
}

            }
     
            
=======
      this.checkDataService.addressObs.subscribe((address) => {

        var array: Array<AddressGroup> = Object.values(address);

        array.filter((address) => {
          if (address.id == this.projectId) {
            this.addressArray.push(address);
>>>>>>> 061e204417dd68f16f88b8abe0e307bdd76858e5
    
          };
        })
  
  
      })
  }
}