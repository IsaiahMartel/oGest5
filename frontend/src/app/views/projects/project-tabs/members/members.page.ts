import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddressService } from 'src/app/services/address/address.service'
import { Storage } from '@ionic/storage';
import { AddressGroup } from 'src/app/models/address-group';

@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
})
export class MembersPage implements OnInit {
  public addressArray: Array<AddressGroup> = [];
  project_id = this.activatedRoute.snapshot.paramMap.get('id');


  constructor(
    private addressService: AddressService,
    private activatedRoute: ActivatedRoute,
    public storage: Storage

  ) { }


  ngOnInit(): void {
    this.loadInfo();
  }
   // Pasa los datos desde el local storage de address a un array
  loadInfo() {
    this.storage.get("address").then(data => {
      if (data) {
        var array = JSON.parse(data);


        array.filter((address) => {
        

          if (address.id == this.project_id) {
 
        console.log(address);
        
            return this.addressArray.push(address);
          };
        })
      } else {
        // Si no tiene los datos, los va a buscar
        this.getData();


      }
    })

  }

  // Va a buscar los datos al backend
  getData() {
    this.addressService.getAddresses().subscribe((p: Array<AddressGroup>) => {

      this.storage.set("address", JSON.stringify(p));
      this.addressArray = p;
    })
  }

}