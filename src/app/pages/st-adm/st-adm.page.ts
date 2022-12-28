import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { format, parseISO } from 'date-fns';
import { ApicallService } from 'src/app/services/Api/apicall.service';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { GlobalService } from 'src/app/services/Global/global.service';
import { ToastService } from 'src/app/services/Toast/toast.service';

@Component({
  selector: 'app-st-adm',
  templateUrl: './st-adm.page.html',
  styleUrls: ['./st-adm.page.scss'],
})
export class StAdmPage implements OnInit {
  data: any;

  constructor(public route:Router,public apiCall:ApicallService,public gloabl:GlobalService,public Auth:AuthService,public toast:ToastService) { }

  public student_data:any={a_id:'',c_id:'',name:'',f_name:'',st_gender:'',contact_no:'',address:'',reference:'',cnic:'',course:'',c_duration:'',a_month:'',ad_date:'',installment_no:'',per_installment:'',first_installment_no:'1',total_fee:'',advance:'',remaning_amount:'',date:''}

  ngOnInit() {

    this.gloabl.Userlogin.subscribe(res =>{
      this.data = res.user;
      console.log(this.data);
      this.apiCall.GetStudents(this.data.c_id)
   });

  }

  month($event){
    console.log($event.target.value);
    this.student_data.a_month = format(parseISO($event.target.value),'MMMM');
    console.log( this.student_data.a_month);
  }

  installment($event){
    console.log($event.target.value);
    const Y = $event.target.value;
    this.student_data.remaning_amount =  this.student_data.total_fee - Y;
  }

  perinstallment($event){
    console.log($event.target.value);
    this.student_data.per_installment = this.student_data.remaning_amount / this.student_data.installment_no;
    console.log(this.student_data);
    
  }

async  Submit_Data(){
  this.student_data.c_id = this.data.c_id;
  this.student_data.a_id = this.data.c_id;
    console.log(this.student_data);
   await  this.apiCall.AddStudents(this.student_data);
    this.student_data ={a_id:'',c_id:'',name:'',f_name:'',st_gender:'',contact_no:'',address:'',reference:'',cnic:'',course:'',c_duration:'',a_month:'',ad_date:'',installment_no:'',per_installment:'',remaning_amount:'',total_fee:''}
    this.toast.StudentAdd();
    this.route.navigate(['st-details']);
  }

  home(){
    this.route.navigate(['home'])
  }
  add_student(){
    this.route.navigate(['st-adm'])
  }


// cnic,course,total_fee,reference
}
