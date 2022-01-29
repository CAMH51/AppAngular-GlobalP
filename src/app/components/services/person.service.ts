import { Injectable,OnDestroy } from '@angular/core';

import {Apollo,gql} from 'apollo-angular'

const QUERY =gql`
{
  getAllPerson{
    id
    nombre
    ap_paterno
    ap_materno
    direccion
    telefono
  }
}
`;


@Injectable({
  providedIn: 'root'
})
export class PersonService {



  constructor(private apollo:Apollo) {
  this.getData;
  }

  getData(){
    return   this.apollo.query<any>({
      query:QUERY
    })

  }

 register(model){
       let nombre ="\""+model.nombre+"\"";
       let ap_paterno ="\""+model.ap_paterno+"\"";
       let ap_materno ="\""+model.ap_materno+"\"";
       let direccion ="\""+model.direccion+"\"";
       let telefono ="\""+model.telefono+"\"";
      return this.apollo.mutate({
        mutation:gql`
        mutation{
          createPerson(
            nombre:${nombre},
            ap_paterno:${ap_paterno},
            ap_materno:${ap_materno},
            direccion:${direccion},
            telefono:${telefono}
            ){
            id
            nombre
            ap_paterno
            ap_materno
            direccion
            telefono
          }
        }
        `,
        variables:{model}
      })
  }

  delete(dato){
    let id="\""+dato.id+"\"";
    return this.apollo.mutate({
      mutation:gql`
      mutation{
        deletePerson(id:${id})
      }
      `,
    })
  }

  update(datos){
    let id ="\""+datos.id+"\"";
    let nombre ="\""+datos.nombre+"\"";
    let ap_paterno ="\""+datos.ap_paterno+"\"";
    let ap_materno ="\""+datos.ap_materno+"\"";
    let direccion ="\""+datos.direccion+"\"";
    let telefono ="\""+datos.telefono+"\"";

    return this.apollo.mutate({
      mutation:gql`
      mutation{
        updatePerson(id:${id},
        input:{
          nombre:${nombre},
          ap_paterno:${ap_paterno},
          ap_materno:${ap_materno},
          direccion:${direccion},
          telefono:${telefono}
        }){
          success
          message
        }
      }
      `,
    })
  }

}

