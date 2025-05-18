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
  styles: [`
    .action-buttons {
      display: flex;
      gap: 0.5rem;
      justify-content: center;
    }
  `]
})
export class ActionRendererComponent implements ICellRendererAngularComp {
  params: any;

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