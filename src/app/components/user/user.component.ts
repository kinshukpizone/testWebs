import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { IUser } from '../../Interfaces/IUser';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatInputModule,MatCheckboxModule, FormsModule, ReactiveFormsModule,MatButtonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  route= inject(ActivatedRoute);
  formBuilder = inject(FormBuilder);
  httpService = inject(UserService);
  router = inject(Router);
  userid! : string
  isEdit = false;

  ngOnInit(){
    this.userid= this.route.snapshot.params['id'];
    if(this.userid !== undefined){
      this.isEdit= true;
      this.httpService.getUser(this.userid).subscribe(res=>{
        this.userForm.patchValue(res.result);
      });
    }

  }
  userForm = this.formBuilder.group({
    name:['',Validators.required],
    description:['', Validators.required],
    link : ['',Validators.required],
    isActive :[false]
  });

save(){

 const udata : IUser={
  name:this.userForm.value.name!,
  description: this.userForm.value.description!,
  link:this.userForm.value.link!,
  isActive : this.userForm.value.isActive!
 }
 if(this.isEdit){
  udata.id= this.userid;
  this.httpService.updateUser(this.userid,udata).subscribe(res=> {
   
    this.router.navigateByUrl("/user-list")
  });

 }else{
  this.httpService.createUser(udata).subscribe(res=> {
    this.router.navigateByUrl("/user-list")
  });

 }


}
edit(){

}

}
