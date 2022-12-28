import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSplitPane, MenuController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { GlobalService } from './services/Global/global.service';
import { ToastService } from './services/Toast/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  // @ViewChild('ionSplitPane') ionSplitPane!: IonSplitPane;

  
constructor(public route : Router,private menu: MenuController,public toast:ToastService, private global:GlobalService) {
  this.global.see_user({c_id:1})
}



  home(){
    this.route.navigate(['home']);
  }
  add_student(){
    this.route.navigate(['st-adm']);
  }
  see_student(){
    this.route.navigate(['st-details'])
  }
  add_installment(){
    this.route.navigate(['installments'])
  }
  see_installment(){
    this.route.navigate(['see-instment'])
  }
  add_account(){
    this.route.navigate(['add-acount'])
  }
  see_acount(){
    this.route.navigate(['see-acount'])
  }
  login(){
    this.route.navigate(['login'])
    this.toast.LogoutSuccessfull();
  }


}
