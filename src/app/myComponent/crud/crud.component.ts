import { Component, OnInit ,ViewChild } from '@angular/core';
import {MatDialog}  from '@angular/material/dialog';
import { UserDataService } from 'src/app/myService/userdata.service';
import { DialogComponent } from '../dialog/dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CRUDComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'Age', 'Location','action'];
  
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(public dialog: MatDialog,
    private api:UserDataService,
    ) { }

  ngOnInit(): void {

    this.getUserData();

  }
  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '20%',
    }).afterClosed().subscribe(val=>{
      if(val == 'save'){
      this.getUserData();
        }
      })
  }

  getUserData(){
    this.api.getData().subscribe({
      next:(res)=>{
        console.log(res)
        this.dataSource =new MatTableDataSource(res)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      },
      error:(res)=>{
         alert("data fetching error")
      }
    })
  }

  editData(row:any){
    this.dialog.open(DialogComponent,{
      width:'20%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val === 'update'){
      this.getUserData();
        }
    })
  }

  deleteData(id:number){
    this.api.deleteData(id).subscribe({
      next:(res)=>{
  alert("delete the data successfully")
        this.getUserData()

      },
      error:()=>{
        alert("error while deleting the data")
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
