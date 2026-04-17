import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../core/cart.service';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html'
})
export class NavbarComponent implements OnInit {
  cartCount = 0;
  isMenuOpen = false;
  isAdminMenuOpen = false;

  constructor(
    private cartService: CartService,
    private router: Router,
    private auth: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe(() => {
      this.cartCount = this.cartService.getCartCount();
      this.cdr.markForCheck();
    });
  }

  get isAdmin(): boolean {
    return this.auth.isAdmin();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  goToCart() {
    this.router.navigate(['/cart']);
    this.closeMenu();
  }

  goToAdmin() {
    if (this.auth.isAdmin()) {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/login']);
    }
    this.isAdminMenuOpen = false;
    this.closeMenu();
  }

  logout() {
    this.auth.logout();
    this.isAdminMenuOpen = false;
    this.closeMenu();
    this.router.navigate(['/']);
  }

  scrollToMenu() {
    this.router.navigate(['/products']);
    this.closeMenu();
  }
}