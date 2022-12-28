import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSplitPane, MenuController } from '@ionic/angular';
import { AlertService } from 'src/app/services/Alert/alert.service';
import { ApicallService } from 'src/app/services/Api/apicall.service';
import { GlobalService } from 'src/app/services/Global/global.service';
import { ToastService } from 'src/app/services/Toast/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public login_data:any={ username:'',password:'' ,role:'', c_id:''}

  @ViewChild('ionSplitPane') ionSplitPane!: IonSplitPane;


  public user_data:any;

  constructor(private menu: MenuController,public route:Router,
    public alert:AlertService,public toast:ToastService,public ApiCall:ApicallService,public global:GlobalService) {
    this.menu.enable(false); 
  }



  ngOnInit() {
   this.menu.enable(false);
   
  }

async  login(){
      await this.ApiCall.user_Login(this.login_data);
      this.global.Userlogin.subscribe( res => {
        console.log(res);
        this.login_data = res;
      });
  }

  disableIonSplitPange(){
    this.ionSplitPane.disabled = true;
  }
  home(){
    this.route.navigate(['home']);
  }

}
