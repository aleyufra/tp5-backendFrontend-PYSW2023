import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ProductosFormComponent } from './components/productos-form/productos-form.component';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ConversorComponent } from './components/conversor/conversor.component';
import { ListaTransaccionesComponent } from './components/lista-transacciones/lista-transacciones.component';
import { TicketFormComponent } from './components/ticket-form/ticket-form.component';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { ToastrModule } from 'ngx-toastr';

const routes: Routes = [
  { path: 'productos', component: ProductosComponent },
  { path: 'productos-form/:id', component: ProductosFormComponent },
  { path: 'conversor', component: ConversorComponent },
  { path: 'conversor-list', component: ListaTransaccionesComponent },
  { path: 'ticket-form/:id', component: TicketFormComponent },
  { path: 'ticket-list', component: TicketListComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'productos' }
];

@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    HeaderComponent,
    FooterComponent,
    ProductosFormComponent,
    ConversorComponent,
    ListaTransaccionesComponent,
    TicketFormComponent,
    TicketListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    ToastrModule.forRoot()
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
