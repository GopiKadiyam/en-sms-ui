
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { API_URL } from 'src/app/app.constant';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';

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
    { headerName: 'Country', field: 'country', sortable: true, filter: true },
    { headerName: 'Sender ID', field: 'senderId', sortable: true, filter: true },
    { headerName: 'Description', field: 'description', sortable: true, filter: true },
    { headerName: 'Service', field: 'service', sortable: true, filter: true },
    { headerName: 'Created At', field: 'createdAt', sortable: true, filter: true },
    { headerName: 'Is Open', field: 'isOpen', sortable: true, filter: true },
    { headerName: 'Status', field: 'status', sortable: true, filter: true },
  ];

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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.searchSubject.pipe(debounceTime(200)).subscribe((search) => {
      this.applyGlobalSearch(search);
    });

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
  clearSearch(): void {
    this.senderGlobalSearch = '';
    this.rowData = [...this.originalData];
  }

  changeTheme(event: any) {
    this.currentTheme = event.target.value;
  }
}
