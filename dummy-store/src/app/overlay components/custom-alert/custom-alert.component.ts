import { Component, inject } from '@angular/core';
import { DeleteAlertMessage } from '../../shared/ui-messages/ui.messages';
import { StoreService } from '../../shared/services/products';

@Component({
  selector: 'app-custom-alert',
  templateUrl: './custom-alert.component.html',
  styleUrl: './custom-alert.component.css'
})

export class CustomAlertComponent {
  message: string = DeleteAlertMessage;
  service = inject(StoreService);

  close(){
    this.service.isAlert.set(false);
  }
}
