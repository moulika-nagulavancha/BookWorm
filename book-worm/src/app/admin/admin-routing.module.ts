import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookFormComponent } from '../components/admin/book-form/book-form.component';
import { ManageBooksComponent } from '../components/admin/manage-books/manage-books.component';
import { DashboardComponent } from '../components/admin/dashboard/dashboard.component';

const adminRoutes: Routes = [
  {
    path: '',
    children: [
      { path: 'manage', component: ManageBooksComponent },
      { path: 'new', component: BookFormComponent },
      { path: ':id', component: BookFormComponent },
      { path: '', component: DashboardComponent }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
