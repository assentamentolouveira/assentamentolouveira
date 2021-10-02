import { DependentesService } from './../../../pages/dependentes/shared/dependentes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit {

  constructor(private dependentesService:DependentesService) { }

  ngOnInit() {
    this.dependentesService.getDependenteCartaoCidadao('345').subscribe();
  }

}
