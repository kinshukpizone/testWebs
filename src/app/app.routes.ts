import { Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserComponent } from './components/user/user.component';
//test
export const routes: Routes = [

    {
        path:"",
        component:UserListComponent
    },
    {
        path:"user-list",
        component:UserListComponent
    },
    {
        path:"user",
        component:UserComponent
    },
    {
        path:"user/:id",
        component:UserComponent
    }     
];
