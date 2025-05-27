import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { API_URL } from 'src/app/app.constant';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { UserApiKeyActionRendererComponent } from '../user-api-key-action-renderer/user-api-key-action-renderer.component';
import { CreateUserApiKeyComponent } from '../create-user-api-key/create-user-api-key.component';
import { ViewUserApiKeyComponent } from '../view-user-api-key/view-user-api-key.component';
import { UpdateUserApiKeyComponent } from '../update-user-api-key/update-user-api-key.component';
import { DeleteUserApiKeyComponent } from '../delete-user-api-key/delete-user-api-key.component';
import { buildUrl } from 'src/app/shared/utilities/api.utilities';


@Component({
  selector: 'app-user-api-key-list',
  standalone: false,
  templateUrl: './user-api-key.component.html',
  styleUrl: './user-api-key.component.scss'
})
export class UserApiKeyListComponent implements OnInit {
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
      cellRenderer: UserApiKeyActionRendererComponent,
      width: 120, // or higher if needed
      autoHeight: true,
      suppressSizeToFit: true
    },
    { headerName: 'Name', field: 'name', sortable: true, filter: true },
    { headerName: 'User Name', field: 'username', sortable: true, filter: true },
    { headerName: 'API Key Title', field: 'apiKeyTitle', sortable: true, filter: true },
    { headerName: 'Validity', field: 'validity', sortable: true, filter: true },
    {
      headerName: 'Status',
      field: 'activeFlag',
      cellRenderer: (params: any) => {
        const isActive = !!params.value;
        return `<span class="status-chip ${isActive ? 'active' : 'inactive'} !important">${isActive ? 'Active' : 'Inactive'}</span>`;
      }
    },
    { headerName: 'Expires On', field: 'expiresOn',sortable: false, filter: false }
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
  userApiKeyGlobalSearch = '';

  gridApi!: GridApi;

  private searchSubject = new Subject<string>();

  constructor(private http: HttpClient, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.searchSubject.pipe(debounceTime(200)).subscribe((search) => {
      this.applyGlobalSearch(search);
    });
    this.getAllUserApiKeys();
  }

  getAllUserApiKeys() {
    this.http.get<any[]>(API_URL.apiKeyURLs.getAllApiKeys).subscribe((response) => {
      this.originalData = response;
      this.rowData = response;
    });
  }

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
  }

  onGlobalSearchChange(): void {
    this.searchSubject.next(this.userApiKeyGlobalSearch);
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
    const dialogRef = this.dialog.open(CreateUserApiKeyComponent, {
      data: rowData,
      width: '50vw', // or '80vw' for responsive width
      maxWidth: '90vw', // ensures dialog doesn't overflow
      autoFocus: false // optional to prevent auto scroll to input
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`View result: ${result}`);
      if (result === true)
        this.getAllUserApiKeys();
    });
  }

  onViewClicked(rowData: any) {
    const dialogRef = this.dialog.open(ViewUserApiKeyComponent, {
      data: rowData,
      width: '50vw', // or '80vw' for responsive width
      maxWidth: '90vw', // ensures dialog doesn't overflow
      autoFocus: false // optional to prevent auto scroll to input
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`View result: ${result}`);
      if (result === true)
        this.getAllUserApiKeys();
    });
  }

  onEditClicked(rowData: any) {
    const dialogRef = this.dialog.open(UpdateUserApiKeyComponent, {
      data: rowData,
      width: '50vw', // or '80vw' for responsive width
      maxWidth: '90vw', // ensures dialog doesn't overflow
      autoFocus: false // optional to prevent auto scroll to input
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Edit result: ${result}`);
      if (result === true)
        this.getAllUserApiKeys();
    });
  }

  onDeleteClicked(rowData: any) {
    const dialogRef = this.dialog.open(DeleteUserApiKeyComponent, {
      data: rowData,
      width: '50vw', // Or '50vw' for responsiveness
      maxWidth: '90vw'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Delet result: ${result}`);
      if (result === true)
        this.getAllUserApiKeys();
    });
  }

  clearSearch(): void {
    this.userApiKeyGlobalSearch = '';
    this.rowData = [...this.originalData];
  }


  changeTheme(event: any) {
    this.currentTheme = event.value || event.target.value;
  }
}
