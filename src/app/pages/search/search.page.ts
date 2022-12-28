import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController,NavParams } from '@ionic/angular';
import { AlertService } from 'src/app/services/Alert/alert.service';
import { ApicallService } from 'src/app/services/Api/apicall.service';
import { GlobalService } from 'src/app/services/Global/global.service';
import { ToastService } from 'src/app/services/Toast/toast.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  filterTerm:string;
  public student_details:any =[]; 
  public All_Students:any = [];
  public show : any = false;
  public student_installments: any  = {id:'', i_amount:'', date:'',installmentNo:''} ;
  next_install: any= 0;
  public installment_by_id:any;
  
  constructor(public route:Router,public toast:ToastService,
    public modalController: ModalController,public alert:AlertService,
    public global:GlobalService,public ApiCall:ApicallService) { }
  
  // async Get_Students(){
  //   await  this.ApiCall.Get_StudentbyStatus();
  //     this.global.StatusStudent.subscribe(res => {
  //       console.log(res);
  //      this.All_Students = res;
  //    })
  //   }
  
    // async select_student($event){
    //   console.log($event.target.value);  
    //   await  this.ApiCall.Get_InstallmentbyId($event.target.value);
    //   await  this.global.Idinstallment.subscribe(res=>{
    //     console.log(res);
    //     const x = res;
    //     console.log(x)
    //     const y = x['data']
    //     console.log(y)
    //     this.student_details = y[0]
    //     console.log(this.student_details)
    //     this.student_installments.id = this.student_details.id
    //     console.log(this.student_installments.id);
    //   });
    //   console.log(this.student_installments)
    //   this.show = true;
    // }


 



  ngOnInit() {
    // this.Get_Students();
  }
  



}
