import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormGroup , FormBuilder, Validators} from '@angular/forms';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserDataService } from 'src/app/myService/userdata.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit { 
  userDetailForm! : FormGroup
  actionBtn :string= 'save'
  constructor(private formBuilder: FormBuilder , 
    private api :UserDataService,
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private dialogRef:MatDialogRef<DialogComponent>
    ) { }

  ngOnInit(): void {
    this.userDetailForm = this.formBuilder.group({
      firstName: ['',Validators.required],
      lastName:['',Validators.required],
      Age:['',Validators.required,],
      Location:['',Validators.required]
    })
    if(this.editData){
      this.actionBtn ='update'
      this.userDetailForm.controls['firstName'].setValue(this.editData.firstName)
      this.userDetailForm.controls['lastName'].setValue(this.editData.lastName)
      this.userDetailForm.controls['Age'].setValue(this.editData.Age)
      this.userDetailForm.controls['Location'].setValue(this.editData.Location)

    }
  }
  addDetail(){
    console.log(this.userDetailForm.value)
   if(!this.editData){
    if(this.userDetailForm.valid){
      this.api.postData(this.userDetailForm.value).subscribe({
        next:(res)=>{
          alert("data uploaded")
          this.userDetailForm.reset()
          this.dialogRef.close('save')
        },
        error:()=>{
          alert("server error")
        }
      })
    }
   }else{
    this.updateData()
   }
  }
  updateData(){
    this.api.putData(this.userDetailForm.value,this.editData.id).subscribe({
  next:(res)=>{
    alert("updated data")
    this.userDetailForm.reset()
    this.dialogRef.close('update')
  },
  error:()=>{
    alert("don't not update")
  }   
  
  
    })
  }

}
