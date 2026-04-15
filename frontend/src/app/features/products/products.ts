import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/api.service';
import { CartService } from '../../core/cart.service';
import { NavbarComponent } from '../../shared/navbar/navbar';
import { FooterComponent } from '../../shared/footer/footer';
import { timeout, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './products.html'
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  isLoading = true;
  hasError = false;
  selectedCategory = 'All';
  categories = ['All', 'Electronics', 'Clothing', 'Beauty', 'Home & Living'];

  constructor(
    private api: ApiService,
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['category']) this.selectedCategory = params['category'];
      this.loadProducts();
    });
  }

  loadProducts() {
    this.isLoading = true;
    this.hasError = false;
    const params: Record<string, string> = {};
    if (this.selectedCategory !== 'All') params['category'] = this.selectedCategory;

    this.api.getProducts(params).pipe(
      timeout(8000),
      catchError(() => of({ products: null, error: true }))
    ).subscribe(res => {
      if (res.error || res.products === null) {
        this.hasError = true;
      } else {
        this.products = res.products ?? [];
      }
      this.isLoading = false;
    });
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.loadProducts();
  }

  viewProduct(id: string) {
    this.router.navigate(['/product', id]);
  }

  addToCart(product: any) {
    this.cartService.addToCart({
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images?.[0] || ''
    });
  }
}