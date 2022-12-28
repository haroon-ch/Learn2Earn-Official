import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }

  // userlogin
  private userlogin = new BehaviorSubject<any>('');
  public Userlogin = this.userlogin.asObservable();
  see_user(userlogin : any){
    this.userlogin.next(userlogin);
    console.log(this.userlogin);
  }

  // GetStudents
  private getStudent = new BehaviorSubject<any>('');
  public GetStudent = this.getStudent.asObservable();
  set_Students(getStudent: any)
  {
    this.getStudent.next(getStudent);
     console.log(getStudent);
    }
    // active students
    private active = new BehaviorSubject<any>('');
    public Active = this.active.asObservable();
  
    active_length(active : any){
      this.active.next(active);
      console.log(this.active)
    }
    // DEACTIVE STUDENTS
    private deactive = new BehaviorSubject<any>('');
    public Deactive = this.deactive.asObservable();
  
    deactive_length(deactive : any){
      this.deactive.next(deactive);
      console.log(this.deactive)
    }

    // GET STUDENT BY ID
  private statusStudent = new BehaviorSubject<any>('');
  public StatusStudent = this.statusStudent.asObservable();
  get_studentbystatus(statusStudent: any)
  {
    this.statusStudent.next(statusStudent);
     console.log(statusStudent);
    }

      // get_Installments
    private studentInstall = new BehaviorSubject<any>('');
    public StudentInstall = this.studentInstall.asObservable();
    studentInstallMENT(studentInstall: any)
    {
      this.studentInstall.next(studentInstall);
      console.log(studentInstall);
      }

      //  GET GetInstallments by student status and by month
    private monthlyinstallment = new BehaviorSubject<any>('');
    public Monthlyinstallment = this.monthlyinstallment.asObservable();
  installmentbyMonth(monthlyinstallment: any)
    {
      this.monthlyinstallment.next(monthlyinstallment);
      console.log(monthlyinstallment);
      }
      
      // get Installments by id
    private idinstallment = new BehaviorSubject<any>('');
    public Idinstallment = this.idinstallment.asObservable();
  get_installment_byId(idinstallment: any)
    {
      this.idinstallment.next(idinstallment);
      console.log(idinstallment);
      }
      
      // get Installments by student id
    private studentIdinstallment = new BehaviorSubject<any>('');
    public StudentIdinstallment = this.studentIdinstallment.asObservable();
  get_installment_byId_StudentID(studentIdinstallment: any)
    {
      this.studentIdinstallment.next(studentIdinstallment);
      console.log(studentIdinstallment);
      }

      // get_account
    private account = new BehaviorSubject<any>('');
    public Account = this.account.asObservable();
    get_account(account: any)
    {
      this.account.next(account);
      console.log(account);
      }

      // get_account
    private accountdate = new BehaviorSubject<any>('');
    public Accountdate = this.accountdate.asObservable();
    get_account_DATE(accountdate: any)
    {
      this.accountdate.next(accountdate);
      console.log(accountdate);
      }
      // get_account by type
    private accountbytype = new BehaviorSubject<any>('');
    public Accountdatebytype = this.accountbytype.asObservable();
    get_account_Bytype(accountbytype: any)
    {
      this.accountbytype.next(accountbytype);
      console.log(accountbytype);
      }

      // allgraph data
      private allGraphs = new BehaviorSubject<any>('');
      public AllGraphs = this.allGraphs.asObservable();
      get_AllGraphs(allGraphs: any) {
        this.allGraphs.next(allGraphs);
        console.log(allGraphs)
      }
      // graph data by date
      private bydateGraphs = new BehaviorSubject<any>('');
      public BydateGraphs = this.bydateGraphs.asObservable();
      get_GraphsBydate(bydateGraphs: any) {
        this.bydateGraphs.next(bydateGraphs);
        console.log(bydateGraphs)
      }

      // graph data details
      private graphdetailsdata = new BehaviorSubject<any>('');
      public Graphdetailsdata = this.graphdetailsdata.asObservable();
      See_Data(graphdetailsdata : any){
        this.graphdetailsdata.next(graphdetailsdata);
        console.log(graphdetailsdata)
      }

     // get_students by course
    private course = new BehaviorSubject<any>('');
    public Course = this.course.asObservable();
    get_course(course: any)
    {
      this.course.next(course);
      console.log(course);
      }

      // account
      // alltranscactions
      private alltransactions = new BehaviorSubject('');
      public Alltransactions = this.alltransactions.asObservable();
      store_alltransactions(alltransactions:any) {
        this.alltransactions.next(alltransactions);
        console.log(alltransactions);
      }
      // transcactions
      private transactions = new BehaviorSubject('');
      public Transactions = this.transactions.asObservable();
      all_transactions(transactions:any) {
        this.transactions.next(transactions);
        console.log(transactions);
      }

      // alltranscactions
      private acct = new BehaviorSubject('');
      public Acct = this.acct.asObservable();
      Get_mainAcct(alltransactions:any) {
        this.acct.next(alltransactions);
        console.log(alltransactions);
      }

}