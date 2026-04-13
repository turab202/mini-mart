import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../core/api.service';
import { CartService } from '../../core/cart.service';
import { NavbarComponent } from '../../shared/navbar/navbar';
import { FooterComponent } from '../../shared/footer/footer';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './products.html'
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  isLoading = true;
  selectedCategory = 'All';
  categories = ['All', 'Electronics', 'Clothing', 'Beauty', 'Home & Living'];

  constructor(
    private api: ApiService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.isLoading = true;
    const params = this.selectedCategory !== 'All' ? { category: this.selectedCategory } : {};
    this.api.getProducts(params).subscribe({
      next: (res) => {
        this.products = res.products ?? [];
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
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
      image: product.images[0]
    });
  }
}