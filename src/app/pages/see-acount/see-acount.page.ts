import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/services/Alert/alert.service';
import { ApicallService } from 'src/app/services/Api/apicall.service';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { GlobalService } from 'src/app/services/Global/global.service';
import { ToastService } from 'src/app/services/Toast/toast.service';
import { format, parseISO } from 'date-fns';
import { ModalPage } from '../modal/modal.page';


@Component({
  selector: 'app-see-acount',
  templateUrl: './see-acount.page.html',
  styleUrls: ['./see-acount.page.scss'],
})
export class SeeAcountPage implements OnInit {
  filterTerm!: string;

 public date:any={c_id:'',to_date:'',from_date:''}
//  public byType:any={c_id:'',type:'',source:''}

//  public institute:any=[{c_id:1,name:'Pakpattan'},{c_id:2,name:'Arifwala'}];
 public type: any;
 public slectName: any;
 public NameSoftware: any;
 public transaction:any = {a_id:'', type:'',c_id:''}
 public expences:any = {a_id:'', type:'', description:'',c_id:''}
 public account_data:any;
 public Account_details:any = [];
 public totalnetBalance:any= 0;
 public totalDebit:any = 0;
 public totalCredit:any = 0;


//  public totalInstallment:any= 0;
//  public totalEpenxeAmount:any = 0;
//  public totalAdvance:any = 0;
//  public total : any = 0;
  public all_data:any={a_id:'',c_id:''}
 
 public show : any = false;


 public Category: any = 'Account' ;
 refresher=false;
  student_Installments: any;
  selectType: any;
  slectType: any;
  public slectSource: any;
  public selectdate: any;
  data: any;
  accts: any;
  alltypeData: any;
  fromDate: any;
  toDate: any;
  pickerSelect: any;
  desc: any;
 public net_b: any = [{netbalance:'', name:''}];

  constructor(public route:Router,public toast:ToastService,
    public modalController: ModalController,public alert:AlertService,
    public global:GlobalService,public ApiCall:ApicallService) { }

  ngOnInit() {

    this.global.Userlogin.subscribe(res =>{
      this.data = res.user;
      console.log(this.data);
      this.transaction.c_id = this.data.c_id;
      this.ApiCall.get_mainAccts({c_id:this.data.c_id});
      this.global.Acct.subscribe(acct => {
        this.accts = acct;
      })
      // this.apiCall.GetStudents(this.data.c_id)
   }); 

   this.ApiCall.get_netbalance(this.data.c_id);
   this.global.Transactions.subscribe(net => {
     console.log(net[0]);
     this.net_b = net;
     console.log(this.net_b[0]);
   });
   
  }
  // getAccount() {
  //   this.global.Userlogin.subscribe(res =>{
  //     this.data = res.user;
  //     console.log(this.data);
  //     this.transaction.c_id = this.data.c_id;
  //     this.ApiCall.get_mainAccts({c_id:this.data.c_id});
  //     this.global.Acct.subscribe(acct => {
  //       this.accts = acct;
  //       this.expences.a_id = this.accts.a_id;
  //       this.transaction.a_id = this.accts.a_id;
  //     })
  //     // this.apiCall.GetStudents(this.data.c_id)
  //  });


  // }

  async refresh(){
    this.refresher=true
    setTimeout(() => {
      this.refresher=false,
      this.slectType = '';
      this.slectSource = '';
      this.slectName='';
      const x = [];
      this.global.store_alltransactions(x);
      this.totalDebit = '';
      this.totalCredit = '';
      this.totalnetBalance = '';
    }, 1500 ); 
  }

  getby_description() {
    this.global.Userlogin.subscribe(res =>{
      this.data = res.user;
      console.log(this.data);
      this.transaction.c_id = this.data.c_id;
      this.ApiCall.getmaindescription({c_id:this.data.c_id});
      this.global.Acct.subscribe(des => {
        this.desc = des;
      })
      // this.apiCall.GetStudents(this.data.c_id)
   });
  }

   //  Select Owner
  selectFrom($event) {
    console.log($event.target.value);
    this.transaction.a_id = this.accts.a_id;
    this.expences.a_id = this.accts.a_id;
    this.transaction.c_id = this.data.c_id;
    this.expences.c_id = this.data.c_id;
    this.transaction.a_id = $event.target.value;
    this.expences.a_id = $event.target.value;
    console.log(this.transaction);
    console.log(this.expences);
    this.all_data.a_id = $event.target.value;
    this.all_data.c_id = this.data.c_id;
   this.ApiCall.gettalltrasactions(this.all_data);
    console.log(this.all_data);
  }

  // see_all_data($event){
  //   console.log($event.target.value);
  //   this.all_data.a_id = $event.target.value;
  //   this.all_data.c_id = this.data.c_id;
  //   this.ApiCall.gettalltrasactions(this.all_data);
  //   console.log(this.all_data);

  // }

    // Select Account Transaction Type
 async selectTypeTransaction($event) {
  console.log($event.target.value);
  this.type = $event.target.value;
  if($event.target.value == 'transaction'){
    // this.transaction.a_id = this.accts.a_id;
    this.transaction.c_id = this.data.c_id;
    this.transaction.type = $event.target.value;
    await this.ApiCall.Get_Transactions_bymainAccount(this.transaction);
    await this.getalltranstions();
  }
  if($event.target.value == 'installment'){
    // this.transaction.a_id = this.accts.a_id;
    this.transaction.c_id = this.data.c_id;
    this.transaction.type = $event.target.value;
    await this.ApiCall.Get_Transactions_bymainAccount(this.transaction);
    await this.getalltranstions();
  }
  if($event.target.value == 'addmission'){
    // this.transaction.a_id = this.accts.a_id;
    this.transaction.c_id = this.data.c_id;
    this.transaction.type = $event.target.value;
    await this.ApiCall.Get_Transactions_bymainAccount(this.transaction);
    await this.getalltranstions();
  }
  else{
    console.log('please select correct type');
    this.expences.type = $event.target.value;
  }
}


  async getbyExpense($event) {
    console.log($event.target.value);
    this.expences.c_id = this.data.c_id;
    this.expences.description = $event.target.value;
    console.log(this.expences);
    await this.ApiCall.Get_Transactions_byExpense(this.expences);
    await this.getalltranstions();
  }

  getalltranstions(){
    this.global.Alltransactions.subscribe(res =>{
      // this.alltypeData = res[0];
      // console.log(res[0]);
      // console.log(this.alltypeData);
    if(res[0] == ''){
      console.log('sorry no data found ');
      this.toast.no_Data();
    }
    else{
      this.Account_details = res[0];
      this.totalDebit = res[1][0];
      this.totalCredit = res[2][0];
      this.totalnetBalance = res[3][0];
      console.log(this.Account_details);      
      console.log(this.totalCredit);      
      console.log(this.totalDebit);      
      console.log(this.totalnetBalance); 
    }   
  });
  }

  
  // get_netbalance(){

  // }


  // async getbyType($event) {
  //   console.log($event.target.value);
  //   this.byType.type = $event.target.value;
  
  // }
  // async getbySource($event) {
  //   console.log($event.target.value);
  //   this.byType.c_id = this.data.c_id;
  //   this.byType.source = $event.target.value;
  //   console.log(this.byType);
  //   await this.ApiCall.api_getaccountsBytype(this.byType);
  //   await this.global.Account.subscribe(res=>{
  //     if(res[0] == ''){
  //       console.log('sorry data no found ');
  //     }
  //     else{
  //       this.account_data = res.data[0];
  //       this.totalEpenxeAmount = res.data[1][0].total_amount;
  //       this.totalAdvance = res.data[2][0].total_advance;
  //       this.totalInstallment = res.data[3][0].total_installment_amount;
  //       console.log(this.account_data);      
  //       console.log(this.totalAdvance + ' totla advance amount');      
  //       console.log(this.totalEpenxeAmount + ' total expense amount');      
  //       console.log(this.totalInstallment + ' total installments'); 
  //     } 
  //   });}


  

  // SELECT DAYNAME(a_student.ad_date) as day FROM a_student;
  // SELECT MONTH(a_student.ad_date) as day FROM a_student;	
  // SELECT YEAR(a_student.ad_date) as day FROM a_student;	


  
  // formatDate($event) {
  //   console.log($event.target.value);
  //   this.fromDate = format(parseISO($event.target.value), 'yyyy-MM-dd');
  //   console.log(this.fromDate);
  //   this.date.to_date = this.fromDate;
  // }

  // todate($event) {
  //   console.log($event.target.value);
  //   this.toDate = format(parseISO($event.target.value), 'yyyy-MM-dd');
  //   console.log(this.toDate);
  //   this.date.from_date = this.toDate;
  //   this.date.c_id = this.data.c_id;
  //   this.ApiCall.Get_AccountDate(this.date);
  //   console.log(this.date);
    
  //   this.global.Account.subscribe(res=>{
  //     console.log(res);
  //   });
  // }
  // DatePicker() {
  //   this.pickerSelect = 'picker';
  // }


  async updateModal(data) {
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'my-modal-class',
      initialBreakpoint: 0.93 ,
      breakpoints: [0, 0.435, 0.93],
      componentProps: {
        'updateAccount': data,
        'Category': this.Category,
      }
    });
    console.log('modal')
    return await modal.present();
  }

  home(){
    this.route.navigate(['home'])
  }


}

