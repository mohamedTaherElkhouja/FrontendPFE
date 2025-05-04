import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminServiceService } from 'src/app/Service/admin-service.service';


@Component({
  selector: 'app-side-admin',
  templateUrl: './side-admin.component.html',
  styleUrls: ['./side-admin.component.scss']
})
export class SideAdminComponent implements OnInit {
  NumberOfUsers : number = 0;
  NumberOfPV : number = 0;
  isSidebarOpen = false;
  constructor(private adminService : AdminServiceService , private router : Router) { }

  ngOnInit(): void {
    this.adminService.countAllUsers().subscribe(
      (response) => {
        this.NumberOfUsers = response;
        console.log('Number of users:', this.NumberOfUsers);
      },
      (error) => {
        console.error('Error fetching user count:', error);
      }
    );
    this.adminService.countAllPV().subscribe(
      (response) => {
        this.NumberOfPV = response;
        console.log('Number of PV:', this.NumberOfPV);
      },
      (error) => {
        console.error('Error fetching PV count:', error);
      }
    );
  }


  NumberOfPVDechet() {
    
  }
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  logout() {
    this.adminService.logout();
    this.adminService.saveAdmin(null);
    this.router.navigate(['/admin/login']);
  }



}
