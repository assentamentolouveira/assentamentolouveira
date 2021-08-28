import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'document',
})
@Injectable({
  providedIn: 'root',
})
export class DocumentPipe implements PipeTransform {
  transform(value: number | string): string {

    console.log(value)
    let document = value + '';
    document = document.replace(/\D/g, '');
    return document.replace(/(\d+)(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }

}
