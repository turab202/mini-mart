import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home';
import { ProductsComponent } from './features/products/products';
import { ProductDetailComponent } from './features/product-detail/product-detail';
import { CartComponent } from './features/cart/cart';
import { CheckoutComponent } from './features/checkout/checkout';
import { OrderSuccessComponent } from './features/order-success/order-success';
import { AboutComponent } from './features/about/about.component';
import { ContactComponent } from './features/contact/contact';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './admin/dashboard/dashboard';
import { AdminProductsComponent } from './admin/products/products';
import { AdminOrdersComponent } from './admin/orders/orders';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'order-success', component: OrderSuccessComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'products', component: AdminProductsComponent },
      { path: 'orders', component: AdminOrdersComponent }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
