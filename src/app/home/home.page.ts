import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MenuController, ModalController } from '@ionic/angular';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { format, parseISO } from 'date-fns';
import { AlertService } from '../services/Alert/alert.service';
import { ApicallService } from '../services/Api/apicall.service';
import { GlobalService } from '../services/Global/global.service';
import { ToastService } from '../services/Toast/toast.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit, OnInit {

  public chartexpense2: any;
  public chart:any;
  public chart3:any;
  public chart8:any;

  public fromDate : any;
  public toDate : any;
  public pickerSelect: any;
  public by_Date:any = {to_date:'', from_date:''};

  public student_details:any; 
  res:any; 
  total: any;
  public activeCounter:any;
  public deactiveCounter:any;
 
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
  public refresher: any = false;
  data:any;

  constructor(private menu: MenuController,
    public route:Router,public toast:ToastService,
     public modalController: ModalController,public alert:AlertService,
     public global:GlobalService,public ApiCall:ApicallService) {
    this.menu.enable(true); 
  }

  ngOnInit() {
    this.menu.enable(true);
    this.global.Userlogin.subscribe(res =>{
      this.data = res.user;
      console.log(this.data);
     //  this.ApiCall.GetStudents(this.data.c_id);
     //  this.ApiCall.api_getallGraphs(this.data.c_id);
   });  
    console.log(this.dailyexpense_label);
    this.Get_Students();

  }

  ngAfterViewInit() {
    this.global.Userlogin.subscribe(res =>{
      this.data = res.user;
      console.log(this.data);
      this.ApiCall.GetStudents(this.data.c_id);
      
   });
   this.ApiCall.api_getallGraphs(this.data.c_id);
      this.getAllGraphs(this.data.c_id);
    this.ExpenseChart();
    this.MyExpenseChart2();
    this.createChart3();
    this.monthly_Installments();
    
    console.log(this.dailyexpense_label);

    
}

  async getAllGraphs(cid:any) {
    await this.ApiCall.api_getallGraphs(cid);
    await this.global.AllGraphs.subscribe(graphs => {
      console.log(graphs);
      this.allGraphs = graphs[0];
      // Days
      if (graphs[0].length !==0) {
        for (let i=0; i<graphs[0].length; i++) {
          this.dailyexpense_label.push(graphs[0][i].day);
          this.dailyexpense_data.push(graphs[0][i].total_netbalance);
        }
        console.log(this.dailyexpense_label);
        console.log(this.dailyexpense_data);
        
      }
      // Month
      if (graphs[1].length !==0) {
        for (let i=0; i<graphs[1].length; i++) {
          this.monthlyexpense_label.push(graphs[1][i].month);
          this.monthlyexpense_data.push(graphs[1][i].total_netbalance);
        }

        console.log(this.monthlyexpense_label);
        console.log(this.monthlyexpense_data);
      }
      if (graphs[0].length !==0) {
        for (let i=0; i<graphs[2].length; i++) {
          this.dailyinstallments_label.push(graphs[2][i].day);
          this.dailyinstallments_data.push(graphs[2][i].total_installments);
        }
        console.log(this.dailyinstallments_label);
        console.log(this.dailyinstallments_data);
      }
      // Month
      if (graphs[1].length !==0) {
        for (let i=0; i<graphs[3].length; i++) {
          this.monthlyinstallments_label.push(graphs[3][i].month);
          this.monthlyinstallments_data.push(graphs[3][i].total_installments);
        }
        console.log(this.monthlyinstallments_label);
        console.log(this.monthlyinstallments_data);
      }
    });
  }
  

  ExpenseChart(){
  
    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {
        labels: this.dailyexpense_label,
         datasets: [
          {
            label: "Daily",
            data: this.dailyexpense_data,
            // backgroundColor: '#222736'
            // borderColor: "#222736",
            backgroundColor: "yellow",
            borderWidth:2
          },
        ]
      },
      options: {
        elements: {
          line: {
            tension : 0.1  // smooth lines
          },
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              color: '#222736'
            },
          }
        },
        scales: {
          y: {
            grid: {
              display: true,
              drawBorder: false, // <-- this removes y-axis line
              lineWidth: 0.1,
            },

            ticks: {
              display: true
            }
          },
          x: {
            grid: {
              display: true,
              drawBorder: false, // <-- this removes x-axis line
              lineWidth: 0.5,
            },
            ticks: {
              font: { // <-- font size of  x-axis line
                size: 17,
              },
              color: 'black'
            }
          }
        }
      }
    });
  }
  MyExpenseChart2(){
  
    this.chartexpense2 = new Chart("MyExpenseChart2", {
      type: 'bar', //this denotes tha type of chart

      data: {
        labels: this.monthlyexpense_label,
         datasets: [
          {
            label: "Monthly",
            data: this.monthlyexpense_data,
            backgroundColor: "yellow",
          },
        ]
      },
      options: {
        elements: {
          line: {
            tension : 0.1  // smooth lines
          },
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              color: '#222736'
            },
          }
        },
        scales: {
          y: {
            grid: {
              display: true,
              drawBorder: false, // <-- this removes y-axis line
              lineWidth: 0.1,
            },

            ticks: {
              display: true
            }
          },
          x: {
            grid: {
              display: true,
              drawBorder: false, // <-- this removes x-axis line
              lineWidth: 0.5,
            },
            ticks: {
              font: { // <-- font size of  x-axis line
                size: 17,
              },
              color: 'black'
            }
          }
        }
      }
    });
  }
  createChart3(){
  console.log(this.dailyinstallments_label);
  console.log(this.dailyinstallments_data);
  
    this.chart3 = new Chart("MyChart3", {
      type: 'line',
      data: {
        labels: this.dailyinstallments_label,
        datasets: [
           { 
            data: this.dailyinstallments_data,
            label: "Daily",
            borderColor: "#222736",
            backgroundColor: "yellow",
            borderWidth:2
          },
        ]
      },
      options: {
        elements: {
          line: {
            tension : 0.1  // smooth lines
          },
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              color: '#222736'
            },
          }
        },
        scales: {
          y: {
            grid: {
              display: true,
              drawBorder: false, // <-- this removes y-axis line
              lineWidth: 0.1,
            },

            ticks: {
              display: true
            }
          },
          x: {
            grid: {
              display: true,
              drawBorder: false, // <-- this removes x-axis line
              lineWidth: 0.5,
            },
            ticks: {
              font: { // <-- font size of  x-axis line
                size: 17,
              },
              color: 'black'
            }
          }
        }
      }
    });
  }

  monthly_Installments(){
    console.log(this.monthlyinstallments_label);
    console.log(this.monthlyinstallments_data);
    this.chart3 = new Chart("MonthChartInstallments", {
      type: 'line',
      data: {
        labels: this.monthlyinstallments_label,
        datasets: [
           { 
            data: this.monthlyinstallments_data,
            label: "Monthly",
            borderColor: "#222736",
            backgroundColor: "yellow",
            borderWidth:2
          },
        ]
      },
      options: {
        elements: {
          line: {
            tension : 0.1  // smooth lines
          },
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              color: '#222736'
            },
          }
        },
        scales: {
          y: {
            grid: {
              display: true,
              drawBorder: false, // <-- this removes y-axis line
              lineWidth: 0.1,
            },

            ticks: {
              display: true
            }
          },
          x: {
            grid: {
              display: true,
              drawBorder: false, // <-- this removes x-axis line
              lineWidth: 0.5,
            },
            ticks: {
              font: { // <-- font size of  x-axis line
                size: 17,
              },
              color: 'black'
            }
          }
        }
      }
    });
  }



   // Student Get function
async Get_Students(){
  // console.log(c_id);
  // this.ApiCall.GetStudents(this.data.c_id);
   await  this.global.GetStudent.subscribe(res=>{
     console.log(res);
     this.student_details = res;
     this.total = res.length;
     console.log(this.total);
   });

   this.global.Active.subscribe( res => {
     this.activeCounter =res;
     console.log(this.activeCounter)
   });

   this.global.Deactive.subscribe( res => {
     this.deactiveCounter =res;
     console.log(this.deactiveCounter)
   } )
   
 }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  // formatDate(value: string) {
  //   console.log(value);
  //   this.fromDate = format(parseISO(value), 'yyyy-MM-dd');
  //   console.log(this.fromDate);
  //   this.by_Date.to_date = this.fromDate;
  // }
  // todate(toDate: string) {
  //   console.log(toDate);
  //   this.toDate = format(parseISO(toDate), 'yyyy-MM-dd');
  //   console.log(this.toDate);
  //   this.by_Date.from_date = this.toDate;
  //   this.ApiCall.Get_GraphDate(this.by_Date);
  //   console.log(this.by_Date);
  // }
  // DatePicker() {
  //   this.pickerSelect = 'picker';
  // }

  refresh(){
    this.refresher=true
    setTimeout(() => {
      this.refresher=false,
      this.ApiCall.GetStudents(this.data.c_id);
      this.ApiCall.api_getallGraphs(this.data.c_id);
    }, 2000 ); 
  }

  home(){
    this.route.navigate(['home']);
  }
 
  async One_ID(){
    const x = {ide: 1,c_id:this.data.c_id};
     await this.ApiCall.api_post_graphdetailsbyide(x);
      this.route.navigate(['graph-data'],{ state: { data: 1 } });
    }
  
  
  async  Tow_ID(){
    const x = {ide: 2,c_id:this.data.c_id};
     await this.ApiCall.api_post_graphdetailsbyide(x);
       this.route.navigate(['graph-data'],{ state: { data: 2 } });
    }
  
  async  three_ID(){
    const x = {ide: 3,c_id:this.data.c_id};
     await this.ApiCall.api_post_graphdetailsbyide(x);
       this.route.navigate(['graph-data'],{ state: { data: 3 } });
    }
  
  async  four_ID(){
    const x = {ide: 4,c_id:this.data.c_id};
     await this.ApiCall.api_post_graphdetailsbyide(x);
       this.route.navigate(['graph-data'],{ state: { data: 4 } });
    }



}

