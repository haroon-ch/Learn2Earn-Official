import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../pages/modal/modal.page';
import { AlertService } from '../services/Alert/alert.service';
import { ApicallService } from '../services/Api/apicall.service';
import { GlobalService } from '../services/Global/global.service';
import { ToastService } from '../services/Toast/toast.service';

@Component({
  selector: 'app-st-details',
  templateUrl: './st-details.page.html',
  styleUrls: ['./st-details.page.scss'],
})
export class StDetailsPage implements OnInit {

  filterTerm!: string;

  public Category: any = 'Student' ;
  public Category2: any = 'feedetails';
  refresher=false;
  // public length:any;

  public student_details:any; 
  res:any; 
  total: any;
 public activeCounter:any;
 public deactiveCounter:any;
 public installment_by_id:any;
 public byCourse:any={c_id:' ',course:'All'}
 public data: any;




  constructor(public route:Router,public toast:ToastService,
     public modalController: ModalController,public alert:AlertService,
     public global:GlobalService,public ApiCall:ApicallService) { }

async  ngOnInit() {
  await  this.Get_Students();
  await  this.global.Userlogin.subscribe(res =>{
      this.data = res.user;
      console.log(this.data);
       this.ApiCall.GetStudents(this.data.c_id);
   });
  }

  home(){
    this.route.navigate(['home']);
  }


 async refresh(){
    this.refresher=true
    setTimeout(() => {
      this.refresher=false,
      // this.byCourse = '';
      this.ApiCall.GetStudents(this.data.c_id);
      this.Get_Students();
    }, 1500 ); 
  }

  // Student Get Method
async Get_Students(){

  //  this.ApiCall.GetStudents(this.data.c_id);
    await  this.global.GetStudent.subscribe(res=>{
      console.log(res);
      this.student_details = res;
      this.total = res.length;
    });

    await  this.global.Active.subscribe( res => {
      this.activeCounter =res;
      console.log(res)
    });

    await this.global.Deactive.subscribe( res => {
      this.deactiveCounter =res;
      console.log(res)
    } )
    
  }

    // selector student by course
  async select_student_Course($event){
    console.log($event.target.value);
    this.byCourse.course = $event.target.value;
    this.byCourse.c_id = this.data.c_id;
    console.log(this.byCourse);
    if($event.target.value  == 'all'){
      this.ApiCall.GetStudents(this.data.c_id);
    }
    else{
      const x = {course:this.byCourse.course, c_id:this.data.c_id}
    await this.ApiCall.Get_StudentsBy_Course(x);
    // await this.ApiCall.Get_StudentsBy_Status(this.byCourse.st_status);
    await this.global.Course.subscribe(res=>{
      console.log(res);
      this.student_details = res[0];
    }); 
  }
  }

  async DeleteStudent(id){
    const x = {id:id ,c_id:this.data.c_id}
   await  this.ApiCall.DeleteStudents(x);
   this.ApiCall.GetStudents(this.data.c_id);
   this.Get_Students();
    console.log(x);
   await this.toast.Student_Delete_Successfull();
  }



  async seeDeatils(data) {
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'my-modal-class',
      initialBreakpoint: 0.93 ,
      breakpoints: [0, 0.435, 0.93],
      componentProps: {
        'StudentDetails': data,
        'Category': "viewdetails",
      }
    });
    return await modal.present();
  }
  async updateModal(data) {
    
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'my-modal-class',
      initialBreakpoint: 0.93 ,
      breakpoints: [0, 0.435, 0.93],
      componentProps: {
        'updateStudent': data,
        'Category': this.Category,
      }
    });
    console.log('modal')
    return await modal.present();
  }

  // see_all_installment by student id
  async view_all_installment(item) {
    console.log(item);
    const x ={id:item.id, c_id:this.data.c_id}
    console.log(x);
    
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
        'Category2' : this.Category2,
      }
    });
    console.log('modal')
    return await modal.present();
  }


  // async view_all_installment(item) {
  //   const x = {id:item.id, c_id:item.c_id}
  //   await this.ApiCall.get_InstallmentsbyStudentId(x)
  //   this.global.StudentIdinstallment.subscribe(res => {
  //     console.log(res);
  //     this.installment_by_id = res; 
  //    });
     
  //  const modal = await this.modalController.create({
  //     component: ModalPage,
  //     cssClass: 'my-modal-class',
  //     initialBreakpoint: 0.93 ,
  //     breakpoints: [0, 0.435, 0.93],
  //     componentProps: {
  //       'Installment_details' : this.installment_by_id,
  //       'Category' : this.Category2,
  //     }
  //   });
  //   console.log('modal')
  //   return await modal.present();
  // }


}
