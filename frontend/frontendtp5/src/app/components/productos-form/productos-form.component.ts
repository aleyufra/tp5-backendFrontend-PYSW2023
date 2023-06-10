import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-productos-form',
  templateUrl: './productos-form.component.html',
  styleUrls: ['./productos-form.component.css']
})
export class ProductosFormComponent implements OnInit {

  producto: Producto;
  edicion!: boolean
  idProd!: string

  constructor(private productoService: ProductoService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.producto = new Producto
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] == 0) {
        console.log('nuevo producto')
        this.edicion = false;
      } else {
        this.productoService.getProducto(params['id']).subscribe(
          res => {
            console.log(res);
            this.producto = res;
            this.edicion = true;
            this.idProd = res._id
          },
          err => {
            console.log(err)
          }
        )
      }
    })
  }

  crearProducto(producto: Producto) {
    this.productoService.postProducto(producto).subscribe(
      res => { console.log(res) },
      err => { console.log(err) }
    )
    this.router.navigate(['productos'])
  }


  editarProducto(producto: Producto) {
    this.productoService.putProducto(producto).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['productos'])
      },
      err => {
        console.log(err)
      }
    )
  }
}
