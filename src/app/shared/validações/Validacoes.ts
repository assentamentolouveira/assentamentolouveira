import { AbstractControl, Validators } from "@angular/forms";

export class Validacoes {
  static ValidaCpf(controle: AbstractControl) {
    const strCPF = controle.value;
    let valido = true;

    var Soma;
    var Resto;
    Soma = 0;
    if (strCPF == "00000000000") valido = false;

    for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) valido = false;

    Soma = 0;
    for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) valido = false;

    if (valido) return null;

    return { cpfInvalido: true };
  }

  static validaDataMaior18(controle: AbstractControl) {
    const dataSelecionada = controle.value;
    let valido = true;

    const dataMinima = new Date().getFullYear()-18;
    valido = new Date(dataSelecionada) > new Date(`01/01/${dataMinima}`)

    if (valido) {
      return { mult: true, message: "Quando selecionado a " };
    }

    return null ;
  }
}
