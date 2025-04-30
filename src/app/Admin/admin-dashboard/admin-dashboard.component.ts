import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminServiceService } from 'src/app/Service/admin-service.service';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  NumberOfUsers : number = 0;
constructor(private adminService : AdminServiceService , private router : Router) { 

}

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
}
}
