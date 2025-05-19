
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CellClickedEvent, ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { API_URL } from 'src/app/app.constant';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { MatDialog } from '@angular/material/dialog';
import { ActionRendererComponent } from '../action-renderer/action-renderer.component';
import { EditSenderComponent } from '../edit-sender/edit-sender.component';
import { DeleteSenderComponent } from '../delete-sender/delete-sender.component';

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
    { headerName: 'Country', field: 'country', sortable: true, filter: true, autoHeight: true },
    { headerName: 'Sender ID', field: 'senderId', sortable: true, filter: true },
    { headerName: 'Description', field: 'description', sortable: true, filter: true },
    { headerName: 'Service', field: 'serviceType', sortable: true, filter: true },
    { headerName: 'Created At', field: 'createdAt', sortable: true, filter: true },
    { headerName: 'Is Open', field: 'openFlag', sortable: true, filter: true },
    {
      headerName: 'Status',
      field: 'statusFlag',
      cellRenderer: (params: any) => {
        const isActive = !!params.value;
        return `
      <span class="status-chip ${isActive ? 'active' : 'inactive'} !important">
        ${isActive ? 'Active' : 'Inactive'}
      </span>
    `;
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
  senderGlobalSearch = '';

  gridApi!: GridApi;

  private searchSubject = new Subject<string>();

  constructor(private http: HttpClient, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.searchSubject.pipe(debounceTime(200)).subscribe((search) => {
      this.applyGlobalSearch(search);
    });
    this.getAllSendersApi();
  }

  getAllSendersApi() {
    this.http.get<any[]>(API_URL.senderURLs.getSenderList).subscribe((response) => {
      this.originalData = response;
      this.rowData = response;
    });
  }

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
  }

  onGlobalSearchChange(): void {
    this.searchSubject.next(this.senderGlobalSearch);
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

  onEditClicked(rowData: any) {
    const dialogRef = this.dialog.open(EditSenderComponent, {
      data: rowData,
      width: '50vw', // or '80vw' for responsive width
      maxWidth: '90vw', // ensures dialog doesn't overflow
      autoFocus: false // optional to prevent auto scroll to input
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Edit result: ${result}`);
      if (result === true)
        this.getAllSendersApi();
    });
  }

  onDeleteClicked(rowData: any) {
    const dialogRef = this.dialog.open(DeleteSenderComponent, {
      data: rowData,
      width: '50vw', // Or '50vw' for responsiveness
      maxWidth: '90vw'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Delet result: ${result}`);
      if (result === true)
        this.getAllSendersApi();
    });
  }

  clearSearch(): void {
    this.senderGlobalSearch = '';
    this.rowData = [...this.originalData];
  }


  changeTheme(event: any) {
    this.currentTheme = event.value || event.target.value;
  }
}

