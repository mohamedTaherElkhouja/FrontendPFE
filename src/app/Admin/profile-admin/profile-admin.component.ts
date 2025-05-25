import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/Service/admin-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.scss']
})
export class ProfileAdminComponent implements OnInit {
  profileForm: FormGroup;
  adminId: string = '';

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private toast: ToastrService
  ) {
    this.profileForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit() {
    const admin = this.adminService.getAdmin();
    if (admin && admin._id) {
      this.adminId = admin._id;
      this.profileForm.patchValue({ email: admin.email });
    } else {
      this.toast.error('Admin not found. Please log in again.', 'Error');
    }
  }

  onSubmit() {
    if (this.profileForm.invalid || !this.adminId) return;
    const { email, password } = this.profileForm.value;
    this.adminService.updateAdminProfile(this.adminId, { email, password }).subscribe({
      next: (res) => {
        this.toast.success('Profile updated successfully', 'Success');
      },
      error: (err) => {
        this.toast.error('Error updating profile', 'Error');
      }
    });
  }
}
