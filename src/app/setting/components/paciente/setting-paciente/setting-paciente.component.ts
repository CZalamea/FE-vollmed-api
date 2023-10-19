import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IPaciente } from 'src/app/interfaces/ipaciente';
import { PacienteService } from 'src/app/services/paciente.service';
import { ToastService } from 'src/app/services/toast.service';
import { AddEditPacienteComponent } from '../add-edit-paciente/add-edit-paciente.component';

@Component({
  selector: 'app-setting-paciente',
  templateUrl: './setting-paciente.component.html',
  styleUrls: ['./setting-paciente.component.css']
})
export class SettingPacienteComponent implements OnInit{

  displayedColumns: string[] = ['nombre', 'email', 'telefono', 'documento', 'acciones'];
  dataSource = new MatTableDataSource<IPaciente>();
  loading: boolean = false;

  constructor(
    private _pacienteService: PacienteService,   
    private _toast: ToastService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(){
    this.getPacientes();
  }
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if(this.dataSource.data.length > 0){
      this.paginator._intl.itemsPerPageLabel = "Items por Página ";
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getPacientes() {
    this.loading = true;
    this._pacienteService.get().subscribe({
      next: (data) => {        
        this.dataSource.data = data
        this.loading = false;
      },
      error: () => {
      //  this.router.navigate(['login'])
        this.loading = false;
        this._toast.error("Ha ocurrido un error")
      }
    })
  }  

  openAdd() {
    this.openMedicoDialog();
  }

  openEdit(medico: IPaciente) {
    this.openMedicoDialog(medico);
  }

  openDelete(id: number) {
    // Lógica para eliminar médico
  }

  private openMedicoDialog(data?: IPaciente) {
    this.dialog.open(AddEditPacienteComponent, {
      autoFocus: false,
      disableClose: true,
      width:'50%',
      data: data
    }).afterClosed().subscribe((respuesta) => {
      if(respuesta == "success"){
        this.getPacientes()
        this._toast.success("¡Enhorabuena! Ingreso exitoso")
      }
      if(respuesta == "error"){        
        this._toast.error("¡Ups! Ha ocurrido un error")
      }
    });
  }


}
