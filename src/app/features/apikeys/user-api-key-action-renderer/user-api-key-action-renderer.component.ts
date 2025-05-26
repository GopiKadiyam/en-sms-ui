import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-user-api-key-action-renderer',
  standalone: false,
  
  templateUrl: './user-api-key-action-renderer.component.html',
  styleUrl: './user-api-key-action-renderer.component.scss'
})
export class UserApiKeyActionRendererComponent {
 params!: ICellRendererParams;

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
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
