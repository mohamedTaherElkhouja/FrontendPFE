import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from 'src/app/Service/admin-service.service';
import { pvDechet } from 'src/app/model/pvDechet';

@Component({
  selector: 'app-pvdechet-admin',
  templateUrl: './pvdechet-admin.component.html',
  styleUrls: ['./pvdechet-admin.component.scss']
})
export class PVDechetAdminComponent implements OnInit {
  NumberOfPV: number = 0; // Total number of PV records
  PvDechet: any [] = []; // List of PV records
  Page: number = 1; // Current page
  pageSize: number = 3; // Number of items per page
  pageSized = [3, 6, 9]; // Options for items per page
  filterBy: string = 'emetteur'; // Filter criteria
  searchTerm: string = ''; // Search term for filtering
  filteredPvDechet: any[] = []; // Filtered list of PV records
  users: any[] = [];
  aqUser: any = null;
  hseUser: any = null;

  constructor(private adminService: AdminServiceService) {}

  ngOnInit() {
    this.getAllPV();
    this.countAllPV();
    this.getAllUsers();
  }

  // Fetch all PV records
  getAllPV() {
    this.adminService.getALlPVHistory().subscribe(
      (response) => {
        this.PvDechet = response.pvList || response; // adapt if you use {pvList, aqUser, hseUser}
     
        console.log('All PV:', this.PvDechet);
      },
      (error) => {
        console.error('Error fetching all PV:', error);
      }
    );
  }

  // Count all PV records
  countAllPV() {
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

  // Fetch all users
  getAllUsers() {
    this.adminService.getAllUsers().subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  // Apply filters
  applyFilter() {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      this.filteredPvDechet = this.PvDechet;
      return;
    }
    this.filteredPvDechet = this.PvDechet.filter(pv => {
      switch (this.filterBy) {
        case 'emetteur':
          return (
            (pv.Id_User?.firstName + ' ' + pv.Id_User?.name).toLowerCase().includes(term)
          );
        case 'aq':
          return (
            (pv.AQ_UserId?.firstName + ' ' + pv.AQ_UserId?.name).toLowerCase().includes(term)
          );
        case 'hse':
          return (
            (pv.HSE_UserId?.firstName + ' ' + pv.HSE_UserId?.name).toLowerCase().includes(term)
          );
        case 'nature':
          return (pv.Nature_Dechet?.type_Categorie || '').toLowerCase().includes(term);
        case 'designation':
          return (pv.Designation || '').toLowerCase().includes(term);
        default:
          return true;
      }
    });
  }

  // Handle page change for pagination
  handlePageChange(event: any) {
    this.Page = event;
    this.getAllPV();
  }

  // Handle page size change for pagination
  handlePageSizeChanged(event: any) {
    this.pageSize = event.target.value;
    this.Page = 1; // Reset to the first page when page size changes
    this.getAllPV();
  }

  // Apply filters (currently unused due to missing variables)
  
}
