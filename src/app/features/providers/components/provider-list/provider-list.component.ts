import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { ProviderActionRendererComponent } from '../provider-action-renderer/provider-action-renderer.component';
import { CreateProviderComponent } from '../create-provider/create-provider.component';
import { ViewProviderComponent } from '../view-provider/view-provider.component';
import { UpdateProviderComponent } from '../update-provider/update-provider.component';
import { DeleteProviderComponent } from '../delete-provider/delete-provider.component';
import { Subject } from 'rxjs/internal/Subject';
import { API_URL } from 'src/app/app.constant';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';

@Component({
  selector: 'app-provider-list',
  standalone: false,

  templateUrl: './provider-list.component.html',
  styleUrl: './provider-list.component.scss'
})
export class ProviderListComponent {
  themes = [
    { name: 'Alpine', value: 'ag-theme-alpine' },
    { name: 'Balham', value: 'ag-theme-balham' },
    { name: 'Material', value: 'ag-theme-material' },
  ];
  currentTheme = 'ag-theme-alpine';
  columnDefs: ColDef[] = [
    {
      headerName: 'Actions',
      field: 'actions',
      cellRenderer: ProviderActionRendererComponent,
      width: 120,
      autoHeight: true,
      suppressSizeToFit: true
    },
    { headerName: 'Provider ID', field: 'id', sortable: true, filter: true },
    { headerName: 'Name', field: 'name', sortable: true, filter: true },
    { headerName: 'Created At', field: 'createdOn', sortable: true, filter: true },
    { headerName: 'Updated At', field: 'updatedOn', sortable: true, filter: true }

  ];

  context = { componentParent: this };
  defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    floatingFilter: true,
    flex: 1,
  };

  rowData: any[] = [];
  originalData: any[] = [];
  providerGlobalSearch = '';
  gridApi!: GridApi;
  private searchSubject = new Subject<string>();
  constructor(private http: HttpClient, private dialog: MatDialog) { }


  ngOnInit(): void {
    this.searchSubject.pipe(debounceTime(200)).subscribe((search) => {
      this.applyGlobalSearch(search);
    });
    this.getAllProviders();
  }

  getAllProviders() {
    this.http.get<any[]>(API_URL.providerURLs.getProviderList).subscribe((response) => {
      this.originalData = response;
      this.rowData = response;
    });
  }

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
  }

  onGlobalSearchChange(): void {
    this.searchSubject.next(this.providerGlobalSearch);
  }

  applyGlobalSearch(search: string): void {
    const lowerSearch = search.trim().toLowerCase();
    if (!lowerSearch) {
      this.rowData = [...this.originalData];
      return;
    }

    this.rowData = this.originalData.filter((row) =>
      this.columnDefs.some((col) => {
        const value = row[col.field!];
        return value && value.toString().toLowerCase().includes(lowerSearch);
      })
    );
  }

  clearSearch(): void {
    this.providerGlobalSearch = '';
    this.rowData = [...this.originalData];
  }


  changeTheme(event: any) {
    this.currentTheme = event.value || event.target.value;
  }

  onCreateClicked() {
    const dialogRef = this.dialog.open(CreateProviderComponent, {
      width: '50vw',
      maxWidth: '90vw'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) this.getAllProviders();
    });
  }

  onViewClicked(rowData: any) {
    const dialogRef =this.dialog.open(ViewProviderComponent, {
      data: rowData,
      width: '50vw',
      maxWidth: '90vw'
    });
     dialogRef.afterClosed().subscribe(result => {
      console.log(`View result: ${result}`);
      if (result === true)
        this.getAllProviders();
    });
  }

  onEditClicked(rowData: any) {
    const dialogRef = this.dialog.open(UpdateProviderComponent, {
      data: rowData,
      width: '50vw',
      maxWidth: '90vw'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) this.getAllProviders();
    });
  }

  onDeleteClicked(rowData: any) {
    const dialogRef = this.dialog.open(DeleteProviderComponent, {
      data: rowData,
      width: '50vw',
      maxWidth: '90vw'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) this.getAllProviders();
    });
  }
}