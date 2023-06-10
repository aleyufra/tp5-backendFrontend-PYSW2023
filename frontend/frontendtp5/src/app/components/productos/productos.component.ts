import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: Array<any>;
  primerProd!: Producto;
  prodDest!: Array<Producto>;

  constructor(private productoService: ProductoService, private activatedRoute: ActivatedRoute, private router: Router) {

    this.productos = new Array<Producto>();
    this.obtenerProductos();
    this.obtenerProductosDestacados();
  }

  ngOnInit(): void {

  }

  obtenerProductos(): void {
    this.productoService.getProductos().subscribe(
      res => {
        console.log(res)
        this.productos = res;
      },
      err => {
        console.log(err)
      }
    )
  }

  goToProdFormEdit(id: string) {
    // this.productoService.getProducto(id).subscribe(
    //   res => { console.log(res) },
    //   err => { console.log(err) }
    // )
    this.router.navigate(['productos-form', id])
  }

  obtenerProductosDestacados(): void {
    this.productoService.getProductosDestacados().subscribe(
      res => {
        console.log(res)
        console.log(this.productos)
        this.prodDest = res;
        this.primerProd = res[0];
        this.prodDest.shift();
      },
      err => {
        console.log(err)
      }
    )
  }

  goToProdForm(): void {
    this.router.navigate(["productos-form", 0]);
  }


  eliminarProducto(id: string) {
    this.productoService.deleteProducto(id).subscribe(
      res => { 
        console.log(res);
        this.router.navigate(['productos'])
      },
      err => { console.log(err) }
    )
  }

}
