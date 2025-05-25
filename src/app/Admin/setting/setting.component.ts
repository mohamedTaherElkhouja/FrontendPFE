import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminServiceService } from 'src/app/Service/admin-service.service';
import { Admin } from 'src/app/model/admin';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { role } from 'src/app/model/role';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent {

  constructor(private AdminService : AdminServiceService , private toastr : ToastrService , private fb :FormBuilder  ) { }
  // Modal state variables
  isCreateAdminModalOpen: boolean = false;
  isCreateUserModalOpen: boolean = false;
  admin : Admin = {
    email : '',
    password : '',
  }
  confirmPassword : string = '';
  user = {
    name: '',
    firstName: '',
    email: '',
    password: '',
    role: '',
    service: ''
  };
  // Open Create Admin Modal
  openCreateAdminModal(): void {
    this.isCreateAdminModalOpen = true;
  }

  // Close Create Admin Modal
  closeCreateAdminModal(): void {
    this.isCreateAdminModalOpen = false;
  }

  // Open Create User Modal
  openCreateUserModal(): void {
    this.isCreateUserModalOpen = true;
  }

  // Close Create User Modal
  closeCreateUserModal(): void {
    this.isCreateUserModalOpen = false;
    this.resetUserForm();
  }
  createAdmin() {
    if (this.confirmPassword !== this.admin.password) {
      this.toastr.error('Passwords do not match');
      return;
    }else{
    this.AdminService.CreateNewAdmin(this.admin).subscribe(
     
      (response) => {
        this.toastr.success('Admin created successfully');
        this.isCreateAdminModalOpen = false;
      },
    
      (error) => {
        this.toastr.error('Error creating admin');
        console.error('Error creating admin:', error);
      }
    );
  }
}
CreateUser() {
  // Example: you should collect firstName and roleId from your form or UI
  const userPayload = {
    name: this.user.name,
    firstName: this.user.firstName, // Make sure you have this field in your form
    email: this.user.email,
    password: this.user.password,
    roleId: this.user.role,
    service: this.user.service
     // Assuming role contains the roleId
  };

  this.AdminService.CreateUser(userPayload).subscribe({
    next: (response) => {
      this.toastr.success('User added successfully');
      this.closeCreateUserModal();
      this.resetUserForm();
    },
    error: (error) => {
      this.toastr.error(error.error?.message || 'Error creating user');
      console.error('Error creating user:', error);
    }
  });
}
  resetUserForm() {
    this.user = {
      name: '',
      firstName: '',
      email: '',
      password: '',
      role: '',
      service: ''
    };
  }
  }
  

