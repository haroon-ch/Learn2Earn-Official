import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../Alert/alert.service';
import { AuthService } from '../Auth/auth.service';
import { GlobalService } from '../Global/global.service';
import { ToastService } from '../Toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class ApicallService {
  data: any;

  constructor( public authservice:AuthService,public alert:AlertService, public global: GlobalService,public router:Router,public toast:ToastService) { }

  // userlogin function 
  async user_Login(data: any) {
    await this.authservice.con(data , 'userlogin').then((result) => {
       this.data = JSON.parse(String(result));
       this.global.see_user(this.data);
       if (this.data.error === false) {
        this.router.navigate(['home']);
        this.toast.LoginSuccessfull();
        console.log(this.data);
        } 
        else{
          console.log(this.data);
          this.alert.Password_alert();
        }
     }, (err) => {
       console.log(err);
     });
   }


  //  STUDENTS admission
  async AddStudents(data: any) {
    await this.authservice.con(data , 'insertStudents').then((result) => {
       this.data = JSON.parse(String(result));
       if (this.data.error === false) {
        this.toast.StudentAdd();
        console.log(this.data);
         return;
        } 
         console.log(this.data);
     }, (err) => {
       console.log(err);
      //  this.alert.connection();
     });
   }


  //  GET STUDENTS
   async GetStudents(c_id:any) {
    console.log(c_id + 'c_id');
    await this.authservice.getdata('getStudents/'+ c_id).then((result) => {
        this.data = JSON.parse(String(result));
       console.log(this.data);
       console.log(this.data.filter(x => x.st_status === 'active').length)
       console.log(this.data.filter(x => x.st_status === 'deactive').length)
        this.global.set_Students(this.data);
        this.global.active_length(this.data.filter(x => x.st_status === 'active').length)
        this.global.deactive_length(this.data.filter(x => x.st_status === 'deactive' ).length)
      }, (err) => {
        console.log(err);
        this.alert.connection();
      });
    }

    // GET STUDENT BY status only active student show
      async  Get_StudentbyStatus(c_id:any) {
        console.log(c_id + 'status');
            await    this.authservice.getdata('get_Student/'+c_id).then((result) => {
                this.data = JSON.parse(String(result));
                this.global.get_studentbystatus(this.data);
                console.log(this.data,'data Updated');
                return result;
              }, (err) => {
                console.log(err);
                this.alert.connection();
              });
            }

    // UPDATE STUDENTS
    async UpdateStudents(data: any) {
      await this.authservice.con(data , 'updateStudents').then((result) => {
         this.data = JSON.parse(String(result));
         if (this.data.error === false) {
          console.log(this.data);
           return;
          } 
           console.log(this.data);
       }, (err) => {
         console.log(err);
         this.alert.connection();
       });
     }

    //  DELETE STUDENTS
     async DeleteStudents(data: any) {
      await this.authservice.con(data , 'deleteStudents').then((result) => {
         this.data = JSON.parse(String(result));
         if (this.data.error === false) {
          // this.toast.deleteDataToast();
          console.log(this.data);
           return;
          } 
           console.log(this.data);
       }, (err) => {
         console.log(err);
         this.alert.connection();
       });
     }

      // POST Add_Installments
      async Add_Installments(data: any) {
        await this.authservice.con(data , 'insertInstallments').then((result) => {
          this.data = JSON.parse(String(result));
          if (this.data.error === false) {
            this.toast.StudentAdd();
            console.log(this.data);
            return;
            } 
            console.log(this.data);
        }, (err) => {
          console.log(err);
          this.alert.connection();
        });
      }

      // POST Add_Installments
      async get_mainAccts(data: any) {
        await this.authservice.con(data , 'getmainaccounts').then((result) => {
          this.data = JSON.parse(String(result));
          this.global.Get_mainAcct(this.data);
        });
      }


              //  GET all Installments
      async    GetInstallments(c_id:any) {
        console.log(c_id + ' All Installment');
            await    this.authservice.getdata('getInstallments/' + c_id).then((result) => {
                this.data = JSON.parse(String(result));
                this.global.studentInstallMENT(this.data);
                console.log(this.data,'data Updated');
                return result;
              }, (err) => {
                console.log(err);
                this.alert.connection();
              });
            }

              //  GET GetInstallments by student status and by month getstudentbycourse/'+data
       async   GetInstallmentsbymonth(data:any) {
        // console.log(data + " GetInstallmentsbymonth")
            await    this.authservice.con( data, 'get_Installmentsbymonth').then((result) => {
                this.data = JSON.parse(String(result));
                this.global.installmentbyMonth(this.data);
                console.log(this.data,'data Updated');
                return result;
              }, (err) => {
                console.log(err);
                this.alert.connection();
              });
            }
        
              // GET Installments BY ID
        async Get_InstallmentbyId(data:any) {
          // console.log(data + 'i_id');
          await this.authservice.con(data, 'get_Installments').then((result) => {
              this.data = JSON.parse(String(result));
              this.global.get_installment_byId(this.data);
            console.log(this.data);
              return result;
            }, (err) => {
              console.log(err);
              this.alert.connection();
            });
          }

              // get_InstallmentsbyStudentId BY ID
        async get_InstallmentsbyStudentId(data:any) {
          // console.log(data + ' GET INSTALLMENTS BY STUDETN ID');
          await this.authservice.con(data,'get_InstallmentsbyStudentId').then((result) => {
              this.data = JSON.parse(String(result));
              this.global.get_installment_byId_StudentID(this.data);
            console.log(this.data);
              return result;
            }, (err) => {
              console.log(err);
              this.alert.connection();
            });
          }
                    //  DELETE Installments
          async Delete_Installments(data: any) {
            await this.authservice.con(data , 'deleteInstallments').then((result) => {
              this.data = JSON.parse(String(result));
              if (this.data.error === false) {
                console.log(this.data);
                return;
                } 
                console.log(this.data);
            }, (err) => {
              console.log(err);
              this.alert.connection();
            });
          }

                    // UPDATE Installments
          async UpdateInstallments(data: any) {
            await this.authservice.con(data , 'updateInstallments').then((result) => {
              this.data = JSON.parse(String(result));
              if (this.data.error === false) {
                console.log(this.data);
                return;
                } 
                console.log(this.data);
            }, (err) => {
              console.log(err);
              this.alert.connection();
            });
          }


                                                    // add account
                  // POST Add_Account
        async Add_Account(data: any) {
          await this.authservice.con(data , 'Addaccount').then((result) => {
            this.data = JSON.parse(String(result));
            if (this.data.error === false) {
              this.toast.AccountAdded();
              console.log(this.data);
              return;
              } 
              console.log(this.data);
          }, (err) => {
            console.log(err);
            this.alert.connection();
          });
        }

                  //  GET account data function
        async GetAccount(c_id:any) {
          console.log(c_id +' getaccount');
          await this.authservice.getdata('getAcount/' + c_id).then((result) => {
              this.data = JSON.parse(String(result));
              this.global.get_account(this.data);
              console.log(this.data);
              return result;
            }, (err) => {
              console.log(err);
              this.alert.connection();
            });
          }

             //  DELETE Account
          async Delete_Account(data: any) {
            await this.authservice.con(data , 'deleteAccount').then((result) => {
              this.data = JSON.parse(String(result));
              if (this.data.error === false) {
                console.log(this.data);
                return;
                } 
                console.log(this.data);
            }, (err) => {
              console.log(err);
              this.alert.connection();
            });
          }

             // UPDATE Account
          async Update_Account(data: any) {
            await this.authservice.con(data , 'updateAccount').then((result) => {
              this.data = JSON.parse(String(result));
              if (this.data.error === false) {
                console.log(this.data);
                return;
                } 
                console.log(this.data);
            }, (err) => {
              console.log(err);
              this.alert.connection();
            });
          }

             //  GET account data by date
        async Get_AccountDate(data:any) {
          await this.authservice.con(data,'getAcountDate').then((result) => {
              this.data = JSON.parse(String(result));
              this.global.get_account(this.data);
              console.log(this.data);
              return result;
            }, (err) => {
              console.log(err);
              this.alert.connection();
            }); 
          }
          // getaccount data by type & source
          async  api_getaccountsBytype(data: any) {
            await this.authservice.con(data,'getaccountsbytype').then((result) => {
              this.data = JSON.parse(String(result));
              this.global.get_account(this.data);
              console.log(this.data);
              return result;
            }, (err) => {
              console.log(err);
              this.alert.connection();
            });
          }

          // get alllgrpah data
          async  api_getallGraphs(c_id:any) {
            console.log(c_id + ' api_getallgraph');
            await this.authservice.getdata( 'get_alldata_graph/' + c_id).then((result) => {
              this.data = JSON.parse(String(result));
              this.global.get_AllGraphs(this.data);
              console.log(this.data);
              return result;
            }, (err) => {
              console.log(err);
              this.alert.connection();
            });
          }

                       //  GET graph data by date
        // async Get_GraphDate(data:any) {
        //   await this.authservice.con(data,'getgraphbydate').then((result) => {
        //       this.data = JSON.parse(String(result));
        //       this.global.get_GraphsBydate(this.data);
        //       console.log(this.data);
        //       return result;
        //     }, (err) => {
        //       console.log(err);
        //       this.alert.connection();
        //     }); 
        //   }

          // graph details
          async api_post_graphdetailsbyide(data: any) {
            await this.authservice.con(data, 'post_graphdetailsbyid').then((result) => {
              this.data = JSON.parse(String(result));
              this.global.See_Data(this.data);
              console.log(this.data);
            }, (err) => {
              console.log(err);
              this.alert.connection();
            });
          }


          // get students by course
          async Get_StudentsBy_Course(data:any) {
            await this.authservice.con(data,'getstudentbycourse').then((result) => {
                this.data = JSON.parse(String(result));
                this.global.get_course(this.data);
                console.log(this.data);
                return result;
              }, (err) => {
                console.log(err);
                this.alert.connection();
              }); 
            }

          // // get students by fee statsus
          // async Get_StudentsBy_Status(data:any) {
          //   await this.authservice.getdata('getstudentbystatus/'+data).then((result) => {
          //       this.data = JSON.parse(String(result));
          //       this.global.get_course(this.data);
          //       console.log(this.data);
          //       return result;
          //     }, (err) => {
          //       console.log(err);
          //       this.alert.connection();
          //     }); 
          //   }

            // account
            // api_insert_accounts(accounts: any) {
            //   this.authservice.con(accounts, 'insertTransactions').then(async (res) => {
            //     this.data = JSON.parse(String(res).toString());
            //     console.log(this.data);
            //     if (this.data.error === false) {
          
            //       console.log(this.data);
            //       return;
            //     }
            //   }, (err) => {
            //     console.log(err);
            //   });
            // }

                              // POST Add_Account
        async insert_Account(data: any) {
          await this.authservice.con(data , 'insertTransactions').then((result) => {
            this.data = JSON.parse(String(result));
            if (this.data.error === false) {
              this.toast.AccountAdded();
              console.log(this.data);
              return;
              } 
              console.log(this.data);
          }, (err) => {
            console.log(err);
            // this.alert.connection();
          });
        }

              // get transcations by ,main account
          async Get_Transactions_bymainAccount(data:any) {
            await this.authservice.con(data,'gettransactionsbymainaccount').then((result) => {
                this.data = JSON.parse(String(result));
                this.global.store_alltransactions(this.data);
                console.log(this.data);
                return result;
              }, (err) => {
                console.log(err);
                this.alert.connection();
              }); 
            }
              // get all transcations by ,main account
          async gettalltrasactions(data:any) {
            await this.authservice.con(data,'gettalltrasactions').then((result) => {
                this.data = JSON.parse(String(result));
                this.global.store_alltransactions(this.data);
                console.log(this.data);
                return result;
              }, (err) => {
                console.log(err);
                this.alert.connection();
              }); 
            }

              //  GET account netbalance function
            async get_netbalance(c_id:any) {
              console.log(c_id +' get_netbalance');
              await this.authservice.getdata('get_netbalance/' + c_id).then((result) => {
                  this.data = JSON.parse(String(result));
                  this.global.all_transactions(this.data);
                  console.log(this.data);
                  return result;
                }, (err) => {
                  console.log(err);
                  this.alert.connection();
                });
              }

              // get transcations by ,main account
          async Get_Transactions_byExpense(data:any) {
            await this.authservice.con(data,'gettransactionsbyexpense').then((result) => {
                this.data = JSON.parse(String(result));
                this.global.store_alltransactions(this.data);
                console.log(this.data);
                return result;
              }, (err) => {
                console.log(err);
                this.alert.connection();
              }); 
            }

                  // POST Add_Installments
      async getmaindescription(data: any) {
        await this.authservice.con(data , 'getmaindescription').then((result) => {
          this.data = JSON.parse(String(result));
          this.global.Get_mainAcct(this.data);
        });
      }




}
