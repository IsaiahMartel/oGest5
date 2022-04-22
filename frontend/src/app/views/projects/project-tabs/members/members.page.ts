import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Address } from 'src/app/models/address';
import { AddressService } from 'src/app/services/address/address.service'
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Echo } from 'laravel-echo-ionic';
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
    private alertController: AlertController,
    public storage: Storage

  ) { }


  ngOnInit(): void {
    this.loadInfo();
  }

  loadInfo() {
    this.storage.get("address").then(data => {
      if (data) {
        var array = JSON.parse(data);


        array.filter((address) => {
          console.log(address.project);
          console.log(address.project.id);

          if (address.project.id == this.project_id) {
            console.log(address);
            console.log(address.address);
            
            
            console.log(address.addressgroups[0].addressgroupName);


            return this.addressArray.push(address);
          };
        })
      } else {
        this.updateData();


      }
    })


  }

  doConnection() {
    const echo = new Echo({
      broadcaster: 'pusher',
      key: 'local',
      wsHost: 'localhost',
      wsPort: 6001,
      forceTLS: false,
      disableStats: true
    });

    const channel = echo.channel('channel');
    channel.listen('Alert', (data) => {
      console.log(JSON.stringify(data));
      this.notification(data);
      this.updateData();
    });
  }

  updateData() {
    this.addressService.getAddresses().subscribe((p: Array<AddressGroup>) => {

      this.storage.set("address", JSON.stringify(p));
      this.addressArray = p;
    })


  }

  async notification(message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Se han realizado cambios',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}