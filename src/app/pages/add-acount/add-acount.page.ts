import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApicallService } from 'src/app/services/Api/apicall.service';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { GlobalService } from 'src/app/services/Global/global.service';

@Component({
  selector: 'app-add-acount',
  templateUrl: './add-acount.page.html',
  styleUrls: ['./add-acount.page.scss'],
})
export class AddAcountPage implements OnInit {
  data: any;

  constructor(public route:Router,public apiCall:ApicallService,public gloabl:GlobalService,public Auth:AuthService) { }

  public owners:any=[{name:'Shazaib Malik'},{name:'Bilal Raza'}]
  public add_account:any={c_id:'',type:'',source:'',amount:''}
  public transaction:any = {a_id:'',c_id:'',from:'', to:'', debit:'', credit:'', type:'', description:''}
  type: any;
  accts:any;

  ngOnInit() {
    this.gloabl.Userlogin.subscribe(res =>{
      this.data = res.user;
      console.log(this.data);
      this.transaction.c_id = this.data.c_id;
      this.apiCall.get_mainAccts({c_id:this.data.c_id});
      this.gloabl.Acct.subscribe(acct => {
        this.accts = acct;
      })
      // this.apiCall.GetStudents(this.data.c_id)
   });
  }
  getAccount() {
    this.gloabl.Userlogin.subscribe(res =>{
      this.data = res.user;
      console.log(this.data);
      this.transaction.c_id = this.data.c_id;
      this.apiCall.get_mainAccts({c_id:this.data.c_id});
      this.gloabl.Acct.subscribe(acct => {
        this.accts = acct;
      })
      // this.apiCall.GetStudents(this.data.c_id)
   });
  }


  selectFrom($event) {
    console.log($event.target.value);
    this.transaction.from = $event.target.value;
    console.log(this.transaction);
    this.transaction.a_id = $event.target.value

  }

  selectTo($event) {
    console.log($event.target.value);
    this.transaction.to = $event.target.value;
    console.log(this.transaction)

  }

  selectTypeTransaction($event) {
    console.log($event.target.value);
    this.type = $event.target.value;
    this.transaction.type = $event.target.value;
    this.transaction.to = this.transaction.from;
  }

  Submit_data(){
    // this.transaction.c_id = this.data.c_id;
    console.log(this.transaction);
    this.apiCall.insert_Account(this.transaction);
    this.add_account={c_id:'',type:'',source:'',amount:''}
    this.transaction = {a_id:'',c_id:'',from:'', to:'', debit:'', credit:'', type:'', description:''}
    this.route.navigate(['see-acount'])
  }

  home(){
    this.route.navigate(['home'])
  }



}
