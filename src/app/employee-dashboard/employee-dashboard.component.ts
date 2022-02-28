import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { EmployeeModel } from './employee-dashboard.model';
import { ApiService } from '../shared/api.service';
@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue !: FormGroup;
  employeeModelObj : EmployeeModel = new EmployeeModel();
  employeeData !: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  constructor(private formbuilder: FormBuilder,
    private api: ApiService ) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName: [''],
      lastName: [''],
     email: [''],
     mobile: [''],
      salary: ['']

    })
this.getAllEmploye();
  }

  clickAddEmploye(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate= false;
  }

  postEmployeeDetails(){
    this.employeeModelObj.firstname = this.formValue.value.firstName;
    this.employeeModelObj.lastname = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;
  
  this.api.postEmploye(this.employeeModelObj)
  .subscribe(res=>{
    console.log(res);
    alert("Employee has been added")
    this.getAllEmploye();
    let ref = document.getElementById('cancel')
    ref?.click();
    
    this.formValue.reset();
  },
  err=>{
    alert('something wrong')
  })
  }

  getAllEmploye(){
    this.api.getEmploye('')
    .subscribe(res=>{
      this.employeeData = res;
    })
  }

deleteEmployee(emp: any ){
  this.api.deleteEmploye(emp.id)
  .subscribe(res=>{
    alert("Employee Deleted")
    this.getAllEmploye();
  })
}
onEdit(emp: any){
  this.showAdd=false;
  this.showUpdate= true;
  this.employeeModelObj.id = emp.id;
  this.formValue.controls['firstName'].setValue(emp.firstname);
  this.formValue.controls['lastName'].setValue(emp.lastname);
  this.formValue.controls['email'].setValue(emp.email);
  this.formValue.controls['mobile'].setValue(emp.mobile);
  this.formValue.controls['salary'].setValue(emp.salary);
}

updateEmployeeDetails()
{
  this.employeeModelObj.firstname = this.formValue.value.firstName;
  this.employeeModelObj.lastname = this.formValue.value.lastName;
  this.employeeModelObj.email = this.formValue.value.email;
  this.employeeModelObj.mobile = this.formValue.value.mobile;
  this.employeeModelObj.salary = this.formValue.value.salary;

  this.api.updateEmploye(this.employeeModelObj,this.employeeModelObj.id)
  .subscribe(res=>{
    alert("Updated successfully");
    let ref = document.getElementById('cancel')
    ref?.click();
    
    this.formValue.reset();
  this.getAllEmploye();
  })
}

}
