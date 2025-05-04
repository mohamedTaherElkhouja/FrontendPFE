
import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Service/admin-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  users: any[] = [];
  pvHistory: any[] = [];
  loadingUsers = true;
  loadingPvHistory = true;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadUsers();
    //this.loadPvHistory();
  }

  loadUsers(): void {
    this.adminService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
        this.loadingUsers = false;
      },
      (error) => {
        console.error('Error loading users', error);
        this.loadingUsers = false;
      }
    );
  }

  /*loadPvHistory(): void {
    this.adminService.getAllPvHistory({}).subscribe(
      (data) => {
        this.pvHistory = data;
        this.loadingPvHistory = false;
      },
      (error) => {
        console.error('Error loading PV history', error);
        this.loadingPvHistory = false;
      }
    );
  }*/
}
