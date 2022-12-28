import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/services/Alert/alert.service';
import { ApicallService } from 'src/app/services/Api/apicall.service';
import { GlobalService } from 'src/app/services/Global/global.service';
import { ToastService } from 'src/app/services/Toast/toast.service';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-see-instment',
  templateUrl: './see-instment.page.html',
  styleUrls: ['./see-instment.page.scss'],
})
export class SeeInstmentPage implements OnInit {

  filterTerm:string;

   refresher=false;
   public total : any = 0;

   public student_Installments:any;
   public Category: any = 'installmentupdate';
   public Category2: any = 'feedetails';
   public installment_by_id:any;
   public by_Month:any={month:''}
  data: any;

  constructor(public route:Router,public toast:ToastService,
    public modalController: ModalController,public alert:AlertService,
    public global:GlobalService,public ApiCall:ApicallService) { }

  ngOnInit() {
    this.Get_Installments();

    this.global.Userlogin.subscribe(res =>{
      this.data = res.user;
      console.log(this.data);
      
      this.ApiCall.GetInstallments(this.data.c_id);
   });
  }

  // Get_Installments function
   async Get_Installments(){
      
      await this.global.StudentInstall.subscribe(res => {
        console.log(res);  
        this.student_Installments = res;
        this.total = res;
      });

    }

    // get students by month
    async select_student_Data($event){
      console.log($event.target.value);
      this.by_Month.month = $event.target.value;
      console.log(this.by_Month);
      if($event.target.value  == 'all'){
        this.ApiCall.GetInstallments(this.data.c_id);
      }
      else{
        const x = {month:this.by_Month.month,c_id:this.data.c_id}
        console.log(x);
      await this.ApiCall.GetInstallmentsbymonth(x);
      await this.global.Monthlyinstallment.subscribe(res=>{
        console.log(res);
        this.student_Installments = res;
      }); 
    }
    }

      // see_student_installment by student id
  async view_all_installment(data) {
    const x = {id:data, c_id:this.data.c_id}
    await this.ApiCall.get_InstallmentsbyStudentId(x);
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
        'Category2' : this.Category2,
      }
    });
    console.log('modal')
    return await modal.present();
  }



    // delete installments function
  async DeleteInstalments(i_id){
      const x = {i_id:i_id ,c_id:this.data.c_id}
     await  this.ApiCall.Delete_Installments(x);
     this.Get_Installments();
      console.log(i_id);
     await this.toast.Student_Delete_Successfull();
    }

  refresh(){
    this.refresher=true
    setTimeout(() => {
      this.refresher=false,
      this.ApiCall.GetInstallments(this.data.c_id);
    }, 1500 ); 
  }

  home(){
    this.route.navigate(['home']);
  }

  // see installments
  async seeDeatils(data) {
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'my-modal-class',
      initialBreakpoint: 0.93 ,
      breakpoints: [0, 0.435, 0.93],
      componentProps: {
        'FeeDetails': data,
        'Category': "feedetails",
      }
    });
    return await modal.present();
  }
//  installments update
  async updateModal(data) {
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'my-modal-class',
      initialBreakpoint: 0.93 ,
      breakpoints: [0, 0.435, 0.93],
      componentProps: {
        'updateInstallments': data,
        'Category': this.Category,
      }
    });
    console.log('modal')
    return await modal.present();
  }


}
