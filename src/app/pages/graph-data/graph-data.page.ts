import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { modalController } from '@ionic/core';
import { AlertService } from 'src/app/services/Alert/alert.service';
import { ApicallService } from 'src/app/services/Api/apicall.service';
import { GlobalService } from 'src/app/services/Global/global.service';
import { ToastService } from 'src/app/services/Toast/toast.service';

@Component({
  selector: 'app-graph-data',
  templateUrl: './graph-data.page.html',
  styleUrls: ['./graph-data.page.scss'],
})
export class GraphDataPage implements OnInit {

  filterTerm! :string;
    // graph
    public allGraphs:any;
    public dailyexpense_label:any = [];
    public dailyexpense_data:any = [];
    public monthlyexpense_label:any = [];
    public monthlyexpense_data:any = [];
    public dailyinstallments_label:any = [];
    public dailyinstallments_data:any = [];
    public monthlyinstallments_label:any = [];
    public monthlyinstallments_data:any = [];
    public data:any;

    public expensedetailbyday:any;
    public expensedetailbymonth:any;
    public installmentdetailbyday:any;
    public installmentdetailbymonth:any;
    public refresher: any = false;

  constructor(private menu: MenuController,
    public route:Router,public toast:ToastService,
     public modalController: ModalController,public alert:AlertService,
     public global:GlobalService,public ApiCall:ApicallService) { }

  ngOnInit() {
    this.data = history.state.data; 
    console.log(this.data);
    this.see_data_details();
  }

  async see_data_details(){
    await this.global.Graphdetailsdata.subscribe(user =>{
        console.log(user);
        this.expensedetailbyday = user;
        this.expensedetailbymonth = user;
        this.installmentdetailbyday = user;
        this.installmentdetailbymonth = user;
        console.log(this.expensedetailbyday);
      });
    }

    refresh(){
      this.refresher=true
      setTimeout(() => {
        this.refresher=false,
        // this.ApiCall.GetAccount();
        this.expensedetailbyday();
        this.expensedetailbymonth();
        this.installmentdetailbyday();
        this.installmentdetailbymonth();
      }, 2000 ); 
    }
    
  home(){
    this.route.navigate(['home']);
  }

}
