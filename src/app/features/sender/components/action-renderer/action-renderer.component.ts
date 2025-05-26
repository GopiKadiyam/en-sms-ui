import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-action-renderer',
  standalone: false,
  template: `
    <div class="action-buttons">
  <button mat-icon-button color="primary" (click)="onEdit()">
    <mat-icon>edit</mat-icon>
  </button>
  <button mat-icon-button color="warn" (click)="onDelete()">
    <mat-icon>delete</mat-icon>
  </button>
</div>
  `,
  styleUrls: ['./action-renderer.component.scss'],
})
export class ActionRendererComponent implements ICellRendererAngularComp {
  params!: ICellRendererParams;

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }

  onEdit() {
    this.params.context.componentParent.onEditClicked(this.params.data);
  }

  onDelete() {
    this.params.context.componentParent.onDeleteClicked(this.params.data);
  }

}