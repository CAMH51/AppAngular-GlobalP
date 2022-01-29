import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filters'
})
export class FiltersPipe implements PipeTransform {

  transform(value:any, arg:any):any {
    const resultadoBusqueda = [];
    for(const busqueda of value){
    /*   console.log(busqueda.nombre) */
 if(busqueda.nombre.toLowerCase().indexOf(arg.toLowerCase())> -1 || busqueda.ap_paterno.toLowerCase().indexOf(arg.toLowerCase())> -1 || busqueda.ap_materno.toLowerCase().indexOf(arg.toLowerCase())> -1){
      resultadoBusqueda.push(busqueda);
    }
  }
     return resultadoBusqueda;
  }

}
