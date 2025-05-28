import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-smsc-action-renderer',
  standalone: false,

  templateUrl: './smsc-action-renderer.component.html',
  styleUrl: './smsc-action-renderer.component.scss'
})
export class SmscActionRendererComponent {
  params!: ICellRendererParams;

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  onView() {
    this.params.context.componentParent.onViewClicked(this.params.data);
  }
  onEdit() {
    this.params.context.componentParent.onEditClicked(this.params.data);
  }
  onDelete() {
    this.params.context.componentParent.onDeleteClicked(this.params.data);
  }
}

