import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/api.service';
import { CartService } from '../../core/cart.service';
import { NavbarComponent } from '../../shared/navbar/navbar';
import { FooterComponent } from '../../shared/footer/footer';

@Component({
  selector: 'app-products',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
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
    this.cdr.markForCheck();
    const params: Record<string, string> = {};
    if (this.selectedCategory !== 'All') params['category'] = this.selectedCategory;

    this.api.getProducts(params).subscribe({
      next: (res) => {
        this.products = res.products ?? [];
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.isLoading = false;
        this.hasError = true;
        this.cdr.markForCheck();
      }
    });
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.loadProducts();
  }

  viewProduct(id: string) { this.router.navigate(['/product', id]); }

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
