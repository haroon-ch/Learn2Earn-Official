import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/services/Alert/alert.service';
import { ApicallService } from 'src/app/services/Api/apicall.service';
import { GlobalService } from 'src/app/services/Global/global.service';
import { ToastService } from 'src/app/services/Toast/toast.service';
import { ModalPage } from '../modal/modal.page';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-installments',
  templateUrl: './installments.page.html',
  styleUrls: ['./installments.page.scss'],
})
export class InstallmentsPage implements OnInit {

  public student_details:any =[]; 
  public All_Students:any = [];
  public show : any = false;
  public student_installments: any  = {a_id:'',c_id:'', id:'', i_amount:'',remaning_payment:'', date:'',installmentNo:'',month:'',upcoming_installment:''} ;
  next_install: any= 0;
  public installment_by_id:any;
  public install_no: any;

  public Category: any = 'feedetails';
  data: any;
  public current_instalment:any

  constructor(public route:Router,public toast:ToastService,
    public modalController: ModalController,public alert:AlertService,
    public global:GlobalService,public ApiCall:ApicallService,private config:NgSelectModule) { 
      
    }

  ngOnInit() {
    this.Get_Students();
    this.global.Userlogin.subscribe(res =>{
      this.data = res.user;
      console.log(this.data);
      this.ApiCall.Get_StudentbyStatus(this.data.c_id);
   });

  }

  home(){
    this.route.navigate(['home']);
  }

    // Student Get Method
async Get_Students(){
  // await  this.ApiCall.Get_StudentbyStatus();
    this.global.StatusStudent.subscribe(res => {
      console.log(res);
     this.All_Students = res;
   })
  }

  async select_student($event){
    console.log($event);
    const z = {id:$event ,c_id:this.data.c_id}
    console.log(z);
    
    await  this.ApiCall.Get_InstallmentbyId(z);
    await  this.global.Idinstallment.subscribe(res=>{
      console.log(res);
      const x = res[0];
      console.log(x)
      this.student_details = x;
      this.current_instalment = x.installmentNo+1
      console.log(this.student_details)
      console.log(this.student_details.id);

    });
    console.log(this.student_installments)
    this.show = true;
  }

  installment($event){
    console.log($event.target.value);
    const Y = $event.target.value;
    this.student_installments.remaning_payment =  this.student_details.remaning_payment - Y;
  }
  
  month($event){
    console.log($event.target.value);
    this.student_installments.month = format(parseISO($event.target.value),'MMMM');
    console.log(this.student_installments);
  }


 async Add_Installments(){
       console.log(this.student_installments);
      this.student_installments.id = this.student_details.id
      this.student_installments.c_id = this.student_details.c_id;
      this.student_installments.a_id = this.student_details.c_id;
      this.student_installments.installmentNo = this.current_instalment;
  await    this.ApiCall.Add_Installments(this.student_installments);
    await   this.toast.Installments_Successfull();
    this.student_installments= {c_id:'', id:'', i_amount:'',remaning_payment:'', date:'',month:'',upcoming_installment:''};
    this.student_details={name:''};
   await  this.route.navigate(['home']);
  }

  async view_all_installment(item) {
    const x = {id:item.id, c_id:item.c_id}
    await this.ApiCall.get_InstallmentsbyStudentId(x)
    this.global.StudentIdinstallment.subscribe(res => {
      console.log(res);
      this.installment_by_id = res; 
     });
     
   const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'my-modal-class',
      initialBreakpoint: 0.93 ,
      breakpoints: [0, 0.435, 0.93],
      componentProps: {
        'Installment_details' : this.installment_by_id,
        'Category' : this.Category,
      }
    });
    console.log('modal')
    return await modal.present();
  }



}
