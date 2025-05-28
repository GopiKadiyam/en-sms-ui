import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { debounceTime, Subject } from 'rxjs';
import { defaultColDef, themes } from 'src/app/shared/models/common.utitility';
import { SmscActionRendererComponent } from '../smsc-action-renderer/smsc-action-renderer.component';
import { DeleteSmscComponent } from '../delete-smsc/delete-smsc.component';
import { UpdateSmscComponent } from '../update-smsc/update-smsc.component';
import { CreateSmscComponent } from '../create-smsc/create-smsc.component';
import { API_URL } from 'src/app/app.constant';

@Component({
  selector: 'app-smsc-list',
  standalone: false,
  
  templateUrl: './smsc-list.component.html',
  styleUrl: './smsc-list.component.scss'
})
export class SmscListComponent {
columnDefs: ColDef[] = [
    {
      headerName: 'Actions',
      field: 'actions',
      cellRenderer: SmscActionRendererComponent,
      width: 120,
      autoHeight: true,
      suppressSizeToFit: true
    },
    { headerName: 'Provider ID', field: 'id', sortable: true, filter: true },
    { headerName: 'Name', field: 'name', sortable: true, filter: true },
    { headerName: 'Created At', field: 'createdOn', sortable: true, filter: true },
    { headerName: 'Updated At', field: 'updatedOn', sortable: true, filter: true }

  ];

  defaultColDef = defaultColDef;
  themes = themes
  currentTheme = 'ag-theme-alpine';
  context = { componentParent: this };
  rowData: any[] = [];
  originalData: any[] = [];
  globalSearch = '';
  gridApi!: GridApi;
  private searchSubject = new Subject<string>();
  constructor(private http: HttpClient, private dialog: MatDialog) { }


  ngOnInit(): void {
    this.searchSubject.pipe(debounceTime(200)).subscribe((search) => {
      this.applyGlobalSearch(search);
    });
    this.getAllSmsc();
  }

  getAllSmsc() {
    this.http.get<any[]>(API_URL.providerURLs.getProviderList).subscribe((response) => {
      this.originalData = response;
      this.rowData = response;
    });
  }

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
  }

  onGlobalSearchChange(): void {
    this.searchSubject.next(this.globalSearch);
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
    this.globalSearch = '';
    this.rowData = [...this.originalData];
  }


  changeTheme(event: any) {
    this.currentTheme = event.value || event.target.value;
  }

  onCreateClicked() {
    const dialogRef = this.dialog.open(CreateSmscComponent, {
      width: '50vw',
      maxWidth: '90vw'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) this.getAllSmsc();
    });
  }

  // onViewClicked(rowData: any) {
  //   const dialogRef = this.dialog.open(ViewProviderComponent, {
  //     data: rowData,
  //     width: '50vw',
  //     maxWidth: '90vw'
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`View result: ${result}`);
  //     if (result === true)
  //       this.getAllProviders();
  //   });
  // }

  onEditClicked(rowData: any) {
    const dialogRef = this.dialog.open(UpdateSmscComponent, {
      data: rowData,
      width: '50vw',
      maxWidth: '90vw'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) this.getAllSmsc();
    });
  }

  onDeleteClicked(rowData: any) {
    const dialogRef = this.dialog.open(DeleteSmscComponent, {
      data: rowData,
      width: '50vw',
      maxWidth: '90vw'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) this.getAllSmsc();
    });
  }
}
