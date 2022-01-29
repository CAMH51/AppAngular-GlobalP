import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, AbstractControl,Validators,FormControl } from '@angular/forms';
import { PersonService } from '../services/person.service';
import {Apollo,gql} from 'apollo-angular'
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2'

import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';
 var $:any;


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

@Component({
  selector: 'app-form-persons',
  templateUrl: './form-persons.component.html',
  styleUrls: ['./form-persons.component.css']
})
export class FormPersonsComponent implements OnInit {
  public formGroup: FormGroup;

  person: any;
  querySubscription: Subscription;
  model:any={};
  dato:any={};
  filterdata='';
  persons:any = "";
  txtTitle="";
  txtBtn="";
  statusForm=false;

  constructor(private formBuilder: FormBuilder,private datosServ: PersonService, private toastr: ToastrService,private apollo:Apollo) {

   }

  ngOnInit(){
    /* this.getData(); */
    this.buildForm("","","","","","");
    this.getDataApi();


  }




 buildForm(id,nombre,ap_paterno,ap_materno,direccion,telefono){
    this.formGroup = this.formBuilder.group({
      id:new FormControl(id),
      nombre:new FormControl(nombre,Validators.required),
      ap_paterno:new FormControl(ap_paterno,Validators.required),
      ap_materno:new FormControl(ap_materno,Validators.required),
      direccion:new FormControl(direccion,Validators.required),
      telefono:new FormControl(telefono,Validators.required),
    });
  }

  estado(valor,datos){
    if(valor == "add"){
      this.txtTitle="Agregar"
      this.txtBtn="Agregar"
      this.statusForm= false
    }
    else if(valor == "update"){
      this.txtTitle="Modificar"
      this.txtBtn="Actualizar"
      console.log(datos.nombre);
      this.buildForm(datos.id,datos.nombre,datos.ap_paterno,datos.ap_materno,datos.direccion,datos.telefono);
      this.statusForm= true
    }
  }

  validarForm(){
    console.log(this.formGroup.valid);
    if (this.formGroup.valid) {
      this.validarDatos();
    }
    else{
      this.showError('Debe llenar todos los campos!!')
    }
  }

  validarDatos(){
    console.log(this.formGroup.value);
    if(this.statusForm == false){

      this.datosServ.register(this.formGroup.value).subscribe(({data})=>{

     this.showSuccess('Registro Agregado!!')
      this.formGroup.reset();
        location.reload();

      }, (error) => {
        console.log('Error en la consulta', error);

      })
    }else if(this.statusForm == true){
      this.datosServ.update(this.formGroup.value).subscribe(({data})=>{
        this.showInfo('Registro actualizado!!');
        location.reload();
        this.clearForm();
        console.log(data);
      })
      console.log('Actualizar');

    }
  }


  getDataApi(){
    return this.querySubscription =  this.apollo.watchQuery<any>({
      query:QUERY
    })
    .valueChanges
    .subscribe(({data})=>{
       this.persons= data.getAllPerson;

    })
  }

getData(){
  this.datosServ.getData().subscribe(({data})=>{
    this.persons = data;

  })
  }

  clearForm(){
    this.formGroup.reset();
  }

  showError(msg) {
    this.toastr.error(msg);
  }

  showSuccess(msg) {
    this.toastr.success(msg);
  }

  showInfo(msg) {
    this.toastr.info(msg);
  }

  deletePerson(id){
    this.dato={
      id:id
    }

    Swal.fire({
      title: '¿Desea eliminar el registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.datosServ.delete(this.dato).subscribe(({data})=>{
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          location.reload();
        })
      }
    })
  }

}
