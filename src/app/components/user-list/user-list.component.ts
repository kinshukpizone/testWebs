import { Component, Inject, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import { IUser } from '../../Interfaces/IUser';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [MatTableModule,RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  userData: IUser[]=[];
  displayedColumns: string[] = ['name', 'description', 'link', 'isActive','action','delete'];
  
  httpService = inject(UserService)
  router= inject(Router);
  ngOnInit(){
    this.getUser();
  }

  getUser()
  {
    this.httpService.getAllUser().subscribe(res=>{
      console.log(res.result.resultList);
     this.userData=res.result.resultList;
    });
  }

  edit(id:string){
    this.router.navigateByUrl("/user/"+id)

  }
  delete(id:string){
    this.httpService.deleteUser(id).subscribe(res=>{
        this.getUser();
    });
  }
}

