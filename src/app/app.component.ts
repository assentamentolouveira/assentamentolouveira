import { Component } from '@angular/core';

import { PoMenuItem } from '@po-ui/ng-components';
import { PrintService } from './shared/services/print.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private printService: PrintService){
      //this.printService.teste()
    }
}
