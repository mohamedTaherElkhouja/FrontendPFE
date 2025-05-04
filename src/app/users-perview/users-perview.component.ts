import { Component } from '@angular/core';
import { AdminServiceService } from 'src/app/Service/admin-service.service';
import { role } from '../model/role';

@Component({
  selector: 'app-users-perview',
  templateUrl: './users-perview.component.html',
  styleUrls: ['./users-perview.component.scss']
})
export class UsersPerviewComponent {
    users: any[] = []; // Original users array
    filteredUsers: any[] = []; // Filtered users for display
    searchTerm: string = ''; // Search term for filtering
    selectedRole: string = ''; // Selected role for filtering
    itemsPerPage: number = 3; // Default items per page
    Page: number = 1; // Current page
    pageSize: number = 3; // Number of items per page
    pageSized = [3,6,9]; // Options for items per page
    count =  0;
    serachText = '';
    roles: string[] = ['Emetteur', 'AQ', 'HSE']

    constructor(private adminService: AdminServiceService) {}

    ngOnInit(): void {
      this.adminService.getAllUsers().subscribe(
        (response) => {
          this.users = response;
          this.filteredUsers = [...this.users]; // Initialize filtered users
          console.log('All users:', this.users);
        },
        (error) => {
          console.error('Error fetching all users:', error);
        }
      );
    }

    handlepageChange(event: any) {
      this.Page = event;
      this.getUser();

    }

    handlePageSizeChanged(event: any) {
      this.pageSize = event.target.value;
      this.Page = 1; // Reset to the first page when page size changes
      this.getUser();
    }

    applyFilters(): void {
      this.filteredUsers = this.users.filter((user) => {
        const matchesRole = this.selectedRole ? user.roleId?.nameRole === this.selectedRole : true;
        const matchesSearch = this.searchTerm
          ? user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
          : true;
        return matchesRole && matchesSearch;
      });
    }


    getUser(){
      this.adminService.getAllUsers().subscribe(
        (response) => {
          this.users = response;
          this.filteredUsers = [...this.users]; // Initialize filtered users
          console.log('All users:', this.users);
        },
        (error) => {
          console.error('Error fetching all users:', error);
        }
      );
    }

    deleteUser(id: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.adminService.deleteUser(id).subscribe(
        (response) => {
          console.log('User deleted successfully:', response);
          // Refresh the user list after deletion
          window.location.reload();
          this.getUser();
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }
}
