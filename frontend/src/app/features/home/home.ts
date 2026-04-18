import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../core/api.service';
import { CartService } from '../../core/cart.service';
import { NavbarComponent } from '../../shared/navbar/navbar';
import { FooterComponent } from '../../shared/footer/footer';

@Component({
  selector: 'app-home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent],
  template: `
    <app-navbar></app-navbar>
    
    <main class="bg-gray-light min-h-screen">
      <!-- Hero Section -->
      <section class="bg-deep-blue text-white relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-4 py-24 text-center relative z-10">
          <h1 class="font-montserrat text-5xl md:text-7xl font-bold mb-4">
            Shop Smarter,<br />
            <span class="text-orange">Live Better</span>
          </h1>
          <p class="font-poppins text-lg max-w-2xl mx-auto mb-8 text-gray-300">
            Discover thousands of products at amazing prices. Free delivery on orders over 1000 ETB.
          </p>
          <button routerLink="/products" class="bg-orange px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition">
            Shop Now →
          </button>
        </div>
        <div class="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1440 48" class="w-full h-8 sm:h-12" preserveAspectRatio="none">
            <path fill="#F8F9FA" d="M0,32 C120,48 240,0 360,16 C480,32 600,48 720,40 C840,32 960,8 1080,20 C1200,32 1320,44 1440,32 L1440,48 L0,48 Z"/>
          </svg>
        </div>
      </section>

      <!-- Categories -->
      <section class="py-16">
        <div class="max-w-7xl mx-auto px-4">
          <h2 class="font-montserrat text-3xl font-bold text-dark-navy text-center mb-12">Shop by Category</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div *ngFor="let cat of categories" 
                 (click)="goToCategory(cat.name)"
                 class="bg-white rounded-2xl p-6 text-center cursor-pointer hover:shadow-lg transition group">
              <div class="text-5xl mb-3 group-hover:scale-110 transition">{{ cat.icon }}</div>
              <h3 class="font-montserrat font-semibold text-dark-navy">{{ cat.name }}</h3>
              <p class="font-poppins text-sm text-gray-500">{{ cat.count }} products</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Featured Products -->
      <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4">
          <h2 class="font-montserrat text-3xl font-bold text-dark-navy text-center mb-12">Featured Products</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div *ngFor="let product of featuredProducts" 
                 (click)="viewProduct(product._id)"
                 class="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer">
              <img [src]="product.images?.[0] || 'https://placehold.co/400x300?text=No+Image'" class="w-full h-56 object-cover" alt="{{ product.name }}">
              <div class="p-4">
                <h3 class="font-montserrat font-semibold text-dark-navy">{{ product.name }}</h3>
                <p class="font-poppins text-sm text-gray-500 mt-1">{{ product.category }}</p>
                <div class="flex items-center justify-between mt-3">
                  <span class="font-poppins font-bold text-orange">{{ product.price }} ETB</span>
                  <button (click)="$event.stopPropagation(); addToCart(product)" 
                    class="bg-teal text-white px-4 py-1 rounded-full text-sm hover:bg-opacity-90">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Promo Banner -->
      <section class="py-16 bg-orange">
        <div class="max-w-7xl mx-auto px-4 text-center text-white">
          <h2 class="font-montserrat text-3xl font-bold mb-4">Summer Sale!</h2>
          <p class="font-poppins text-lg mb-6">Get up to 50% off on selected items. Limited time offer!</p>
          <button routerLink="/products" class="bg-white text-orange px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
            Shop Sale →
          </button>
        </div>
      </section>
    </main>
    
    <app-footer></app-footer>
  `
})
export class HomeComponent implements OnInit {
  categories = [
    { name: 'Electronics', icon: '📱', count: 120 },
    { name: 'Clothing', icon: '👕', count: 250 },
    { name: 'Home & Living', icon: '🏠', count: 180 },
    { name: 'Beauty', icon: '💄', count: 95 }
  ];
  
  featuredProducts: any[] = [];

  constructor(
    private api: ApiService,
    private cartService: CartService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadFeaturedProducts();
  }

  loadFeaturedProducts() {
    this.api.getProducts({ isFeatured: 'true', limit: '4' }).subscribe({
      next: (res) => {
        this.featuredProducts = res.products || [];
        this.cdr.markForCheck();
      },
      error: () => {
        this.featuredProducts = [];
        this.cdr.markForCheck();
      }
    });
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

  goToCategory(category: string) {
    this.router.navigate(['/products'], { queryParams: { category } });
  }
}