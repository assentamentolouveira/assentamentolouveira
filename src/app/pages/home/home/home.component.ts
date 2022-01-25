import { RelatoriosService } from './../shared/relatorios.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PoChartOptions, PoChartSerie, PoChartType, PoDialogService, PoPageAction, PoComboOption, PoModalComponent, PoModalAction } from '@po-ui/ng-components';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public actions: Array<PoPageAction> = [
    {
      label: 'Imprimir Listagem',
      action: () => this.imprimirRelatorios(),
      icon: 'po-icon-ok'
    },
  ];

  public graficoSelecionado = ''
  public tiposDeGraficos: PoComboOption[] = [
    { label: 'Renda', value: 1 },
    { label: 'Fonte de Renda', value: 2 },
    { label: 'Quantidade de Dependentes', value: 3 },
    { label: 'Escolaridade', value: 4 },
    { label: 'Tempo Moradia em Louveira', value: 5 },
    { label: 'Gênero', value: 6 },
    { label: 'Idade', value: 7 },
    { label: 'Etnia', value: 8 },
    { label: 'Uso da Moradia', value: 10 },
    { label: 'Rede de Energia Elétrica', value: 11 },
    { label: 'Abastecimento de Água', value: 12 },
    { label: 'Acesso a Esgotamento Sanitário', value: 13 },
    { label: 'Acesso a Coleta de Lixo', value: 14 },
    { label: 'Uso da Moradia', value: 15 },
    { label: 'Possui Automóvel', value: 16 },
    { label: 'Tipo de Desastres', value: 17 },
    { label: 'Gasto com Aluguel', value: 18 }
  ];
  public pageTitle = "Indicadores de Moradia"

  informacoesGrafico: Array<PoChartSerie> = [];

  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent;

  constructor(private poAlert: PoDialogService, private relatoriosService: RelatoriosService) { }

  searchMore(event: any) {
    window.open(`http://google.com/search?q=coffee+producing+${event.label}`, '_blank');
  }

  ngOnInit(): void {

  }

  graficoAlterado(graficoSelecionado: number): void {
    this.graficoSelecionado = String(this.tiposDeGraficos[graficoSelecionado - 1].label);
    if (graficoSelecionado === 1) { //Renda
      this.relatoriosService.getRenda().subscribe(res => {
        this.montaGrafico(res);
      }
      )
    }

    if (graficoSelecionado === 2) { //Tipo de Renda
      this.relatoriosService.getTipoRenda().subscribe(res => {
        this.montaGrafico(res);
      }
      )
    }

    if (graficoSelecionado === 3) { //Número de Dependentes
      this.relatoriosService.getFamiliaPorNumeroDependente().subscribe(res => {
        this.montaGrafico(res);
      }
      )
    }

    if (graficoSelecionado === 4) { //Escolaridade
      this.relatoriosService.getEscolaridade().subscribe(res => {
        this.montaGrafico(res);
      }
      )
    }

    if (graficoSelecionado === 5) { //Tempo de Moradia em Louveira
      this.relatoriosService.getTempoMoradiaLouveira().subscribe(res => {
        this.montaGrafico(res);
      }
      )
    }

    if (graficoSelecionado === 6) { //Genero
      this.relatoriosService.getGenero().subscribe(res => {
        this.montaGrafico(res);
      }
      )
    }

    if (graficoSelecionado === 7) { //Idade
      // this.relatoriosService.getId().subscribe(res => {
      //   this.montaGrafico(res);
      // }
      // )
    }

    if (graficoSelecionado === 8) { //Etinia
      this.relatoriosService.getEtinias().subscribe(res => {
        this.montaGrafico(res);
      }
      )
    }

    if (graficoSelecionado === 9) { //Naturalidade
      // this.relatoriosService.getNatu().subscribe(res => {
      //   this.montaGrafico(res);
      // }
      // )
    }

    if (graficoSelecionado === 10) { // Uso de Moradia
      this.relatoriosService.getUsoMoradia().subscribe(res => {
        this.montaGrafico(res);
      }
      )
    }

    if (graficoSelecionado === 11) { //Rede de Energia Elétrica
      this.relatoriosService.getAcessoEnergiaEletrica().subscribe(res => {
        this.montaGrafico(res);
      }
      )
    }

    if (graficoSelecionado === 12) { //Abastecimento de Agua
      this.relatoriosService.getAcessoAbastecimentoAgua().subscribe(res => {
        this.montaGrafico(res);
      }
      )
    }

    if (graficoSelecionado === 13) { //Acesso a Esgotamento Sanitário
      this.relatoriosService.getAcessoSaneamentoSanitario().subscribe(res => {
        this.montaGrafico(res);
      }
      )
    }

    if (graficoSelecionado === 14) { //Acesso a Coleta de Lixo
      this.relatoriosService.getAcessoColetadeLixo().subscribe(res => {
        this.montaGrafico(res);
      }
      )
    }

    if (graficoSelecionado === 15) { //Uso Moradia
      this.relatoriosService.getUsoMoradia().subscribe(res => {
        this.montaGrafico(res);
      }
      )
    }

    if (graficoSelecionado === 16) {//Possui Automóvel
      this.relatoriosService.getPossuiAutomovel().subscribe(res => {
        this.montaGrafico(res);
      }
      )
    }

    if (graficoSelecionado === 17) { //Tipo de Desastre
      this.relatoriosService.getMoradiaSofreuDesastre().subscribe(res => {
        this.montaGrafico(res);
      }
      )
    }

    if (graficoSelecionado === 18) { //Gasto com Aluguel
      this.relatoriosService.getGastoComAluguel().subscribe(res => {
        this.montaGrafico(res);
      }
      )
    }

  }

  montaGrafico(res: any): void {
    this.informacoesGrafico = [];
    let count = 0
    for (var [key, value] of Object.entries(res)) {
      count++
      const numeroDaCor = String(count).length === 1 ? '0' + count : count;
      key = this.inserirEspacos(key);
      this.informacoesGrafico.push({ label: key, data: Number(value), tooltip: key + ': ' + value, color: "color-" + numeroDaCor })
    }
  }

  hoverGrafico(teste: any): void {
    console.log(teste)
  }

  inserirEspacos(texto: string): string {
    texto = texto.replace(/([a-z])([A-Z])/g, '$1 $2');
    texto = texto.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
    return texto;
  }

  imprimirRelatorios(): void {
    this.relatoriosService.getExportarTitularExcel().subscribe(res => {
      this.downloadFile(res) },
      error => console.log('Error downloading the file.'),)
    // this.poModal.open();
  }


  downloadFile(data: any) {
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }

  fecharModal(): void {
    this.poModal.close();
  }

}
