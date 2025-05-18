import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminServiceService } from 'src/app/Service/admin-service.service';
import { Admin } from 'src/app/model/admin';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';

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
    email: '',
    password: '',
    role: ''
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
  createUser() {
    console.log('User created:', this.user);
    // Add your logic to send the user data to the backend here
    this.closeCreateUserModal();
  }

  resetUserForm() {
    this.user = {
      name: '',
      email: '',
      password: '',
      role: ''
    };
  }
}
