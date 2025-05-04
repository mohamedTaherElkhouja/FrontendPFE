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
  szearchTerm: string = ''; // Search term for filtering
  filteredPvDechet: pvDechet[] = []; // Filtered list of PV records
  filterBy: string = ''; // Filter criteria (currently unused)

  constructor(private adminService: AdminServiceService) {}

  ngOnInit() {
    this.getAllPV();
    this.countAllPV();
  }

  // Fetch all PV records
  getAllPV() {
    this.adminService.getALlPVHistory().subscribe(
      (response) => {
        this.PvDechet = response;
        console.log('PV Dechet:', this.PvDechet);
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
