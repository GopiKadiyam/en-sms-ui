import { Component, OnInit } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, Subject } from 'rxjs';
import { API_URL } from 'src/app/app.constant';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { ActionRendererComponent } from '../action-renderer/action-renderer.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { CreateUserComponent } from '../create-user/create-user.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  standalone:false
})
export class UserListComponent implements OnInit{
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
      cellRenderer: ActionRendererComponent,
      width: 120, // or higher if needed
      autoHeight: true,
      suppressSizeToFit: true
    },
    { headerName: 'User ID', field: 'id', sortable: true, filter: true },
    { headerName: 'Name', field: 'name', sortable: true, filter: true },
    { headerName: 'User Name', field: 'username', sortable: true, filter: true },
    { headerName: 'Password', field: 'password', sortable: true, filter: true },
    {
      headerName: 'Status',
      field: 'activeFlag',
      cellRenderer: (params: any) => {
        const isActive = !!params.value;
        return `<span class="status-chip ${isActive ? 'active' : 'inactive'} !important">${isActive ? 'Active' : 'Inactive'}</span>`;
      }
    },
  ];

  //[style]="padding: 4px 10px;border-radius: 12px;font-size: 12px;font-weight: 500;color: white;display: inline-block;text-transform: capitalize;"
  context = { componentParent: this };
  defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    floatingFilter: true,
    flex: 1,
  };

  rowData: any[] = [];
  originalData: any[] = []; // <-- Keep original full dataset
  userGlobalSearch = '';

  gridApi!: GridApi;

  private searchSubject = new Subject<string>();

  constructor(private http: HttpClient, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.searchSubject.pipe(debounceTime(200)).subscribe((search) => {
      this.applyGlobalSearch(search);
    });
    this.getAllUsersApi();
  }

  getAllUsersApi() {
    this.http.get<any[]>(API_URL.userURLs.getUserList).subscribe((response) => {
      this.originalData = response;
      this.rowData = response;
    });
  }

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
  }

  onGlobalSearchChange(): void {
    this.searchSubject.next(this.userGlobalSearch);
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
  onCreateClicked(rowData: any) {
      const dialogRef = this.dialog.open(CreateUserComponent, {
        data: rowData,
        width: '50vw', // or '80vw' for responsive width
        maxWidth: '90vw', // ensures dialog doesn't overflow
        autoFocus: false // optional to prevent auto scroll to input
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`View result: ${result}`);
        if (result === true)
          this.getAllUsersApi();
      });
    }

  onEditClicked(rowData: any) {
    const dialogRef = this.dialog.open(EditUserComponent, {
      data: rowData,
      width: '50vw', // or '80vw' for responsive width
      maxWidth: '90vw', // ensures dialog doesn't overflow
      autoFocus: false // optional to prevent auto scroll to input
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Edit result: ${result}`);
      if (result === true)
        this.getAllUsersApi();
    });
  }

  onDeleteClicked(rowData: any) {
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      data: rowData,
      width: '50vw', // Or '50vw' for responsiveness
      maxWidth: '90vw'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Delet result: ${result}`);
      if (result === true)
        this.getAllUsersApi();
    });
  }

  clearSearch(): void {
    this.userGlobalSearch = '';
    this.rowData = [...this.originalData];
  }


  changeTheme(event: any) {
    this.currentTheme = event.value || event.target.value;
  }
}
