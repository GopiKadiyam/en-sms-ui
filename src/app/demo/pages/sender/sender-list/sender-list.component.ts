import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { API_URL } from 'src/app/app.constant';

import { ColDef, GridReadyEvent, GridApi } from 'ag-grid-community';


@Component({
  selector: 'app-sender-list',
  standalone: false,
  templateUrl: './sender-list.component.html',
  styleUrl: './sender-list.component.scss'
})
export class SenderListComponent implements OnInit {
  themes = [
    { name: 'Alpine', value: 'ag-theme-alpine' },
    { name: 'Balham', value: 'ag-theme-balham' },
    { name: 'Material', value: 'ag-theme-material' }
  ];
  currentTheme = 'ag-theme-alpine';
  columnDefs: ColDef[] = [
    { headerName: 'Country', field: 'country', sortable: true, filter: true },
    { headerName: 'Sender ID', field: 'senderId', sortable: true, filter: true },
    { headerName: 'Description', field: 'description', sortable: true, filter: true },
    { headerName: 'Service', field: 'service', sortable: true, filter: true },
    { headerName: 'Created At', field: 'createdAt', sortable: true, filter: true },
    { headerName: 'Is Open', field: 'isOpen', sortable: true, filter: true },
    { headerName: 'Status', field: 'status', sortable: true, filter: true }
  ];
  defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    floatingFilter: true,
    flex: 1 // Fill remaining space
  };
  rowData: any[] = [];
  senderGlobalSearch = '';

  gridApi!: GridApi;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any[]>(API_URL.senderURLs.getSenderList)
      .subscribe(response => {
        this.rowData = response;
      });
  }

  // Method to change theme
  changeTheme(event: any) {
    this.currentTheme = event.target.value;
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  onGlobalSearchChange() {
    this.gridApi.setFilterModel(null); // clear filters

    const filterText = this.senderGlobalSearch.toLowerCase();

    if (!filterText) {
      this.gridApi.onFilterChanged();
      return;
    }

    const filterModel: { [key: string]: any } = {};

    this.gridApi.getColumns()?.forEach(col => {
      const field = col.getColDef().field;
      if (field) {
        filterModel[field] = {
          type: 'contains',
          filter: filterText,
          filterType: 'text',
        };
      }
    });

    this.gridApi.setFilterModel(filterModel);
    this.gridApi.onFilterChanged();
  }

  clearSearch() {
    this.senderGlobalSearch = '';
    this.gridApi.setFilterModel(null);
    this.gridApi.onFilterChanged();
  }
}
