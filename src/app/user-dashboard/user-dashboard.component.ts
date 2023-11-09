import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { UserDashboard } from './user-dashboard';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {
  
  // @Input() UserModel: UserModel | undefined;

  userData:any=[]
  btnDisplay=true;

  constructor(private fb : FormBuilder, private api:ApiService){  
    this.getAllUser(); 
  }

  userModelObj:UserDashboard = new UserDashboard();

  reactForm = this.fb.group({
    fName:['',Validators.required],
    lName:['',Validators.required],
    email:['',[Validators.required,Validators.pattern('^.[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    mob:['',Validators.required],
    salary:['',Validators.required]
  })

  get formControls(){
    return this.reactForm.controls
  }

  onAdd(){
   if(!this.reactForm.valid){
    this.reactForm.markAllAsTouched();
   }else{
    // this.reactForm.reset();
     console.log(this.reactForm.value);
     this.postUserDetails();
    }
  }

  allLetter(event:any)
  {
    var inputValue = event.which;
        // allow letters and whitespaces only.
        if(!(inputValue >= 65 && inputValue <= 122) && (inputValue != 32 && inputValue != 0)) { 
            event.preventDefault(); 
        }
  }

  onlyNumberKey(evt:any) {
    // Only ASCII character in that range allowed
   var ASCIICode = (evt.which) ? evt.which : evt.keyCode
   if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
       return false;
   return true;
 }

 postUserDetails(){
  this.userModelObj.fName=this.reactForm.value.fName;
  this.userModelObj.lName=this.reactForm.value.lName;
  this.userModelObj.email=this.reactForm.value.email;
  this.userModelObj.mob=this.reactForm.value.mob;
  this.userModelObj.salary=this.reactForm.value.salary;

  this.api.postUser(this.userModelObj).subscribe(res=>{
    console.log(res);
    alert("User Added Successfully"); 
    let ref= document.getElementById('cancel');
    ref?.click();
    this.getAllUser();
    this.reactForm.reset();  
  },
  err=>{
    alert("Somethiong Went Wrong");
  }
  )
 }

 getAllUser(){
  this.api.getUser().subscribe((res:any)=>{
    this.userData=res.data;
  });
 }

 onDelete(user:any){
  this.api.deleteUser(user._id).subscribe(res=>{
    alert("User Deleted");
    this.getAllUser();
  })
 }

 onEdit(user:any){
  this.btnDisplay=false
  this.userModelObj.id=user._id;
  this.reactForm.controls['fName'].setValue(user.fName);
  this.reactForm.controls['lName'].setValue(user.lName);
  this.reactForm.controls['email'].setValue(user.email);
  this.reactForm.controls['mob'].setValue(user.mob);
  this.reactForm.controls['salary'].setValue(user.salary);
 }

 updateUserDetails(){
  this.userModelObj.fName=this.reactForm.value.fName;
  this.userModelObj.lName=this.reactForm.value.lName;
  this.userModelObj.email=this.reactForm.value.email;
  this.userModelObj.mob=this.reactForm.value.mob;
  this.userModelObj.salary=this.reactForm.value.salary;
  this.api.updateUser(this.userModelObj,this.userModelObj.id).subscribe(res=>{
    alert("Updated Successfully");
    let ref= document.getElementById('cancel');
    ref?.click();
    this.reactForm.reset();  
    this.getAllUser();
  })
 }

 onAddBtn(){
  this.btnDisplay=true;
  this.reactForm.reset();
 }
//  onClose(){
//   this.reactForm.reset();
//  }
}
