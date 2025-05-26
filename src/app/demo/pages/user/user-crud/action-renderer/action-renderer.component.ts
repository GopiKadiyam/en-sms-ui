import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-action-renderer',
  templateUrl: './action-renderer.component.html',
  styleUrl: './action-renderer.component.scss',
  standalone: false
})
export class ActionRendererComponent {
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
