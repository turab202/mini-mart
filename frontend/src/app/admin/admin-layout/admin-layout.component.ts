import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="flex h-screen bg-gray-100 overflow-hidden">

      <!-- Mobile overlay -->
      <div *ngIf="sidebarOpen"
           class="fixed inset-0 bg-black/50 z-20 lg:hidden"
           (click)="sidebarOpen = false; cdr.markForCheck()"></div>

      <!-- Sidebar -->
      <aside class="fixed top-0 left-0 h-full w-64 bg-deep-blue text-white flex flex-col z-30 transition-transform duration-300"
             [class.-translate-x-full]="!sidebarOpen"
             [class.translate-x-0]="sidebarOpen"
             [class.lg:translate-x-0]="true">

        <!-- Logo -->
        <div class="p-5 border-b border-white/20 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-orange rounded-lg flex items-center justify-center flex-shrink-0">
              <span class="text-white font-bold text-xl">M</span>
            </div>
            <div>
              <h1 class="font-montserrat font-bold text-lg leading-tight">Mini-Mart</h1>
              <p class="font-poppins text-xs text-gray-300">Admin Panel</p>
            </div>
          </div>
          <button (click)="sidebarOpen = false; cdr.markForCheck()" class="lg:hidden text-gray-300 hover:text-white">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Nav -->
        <nav class="flex-1 py-4 overflow-y-auto">
          <div *ngFor="let item of navItems"
               (click)="navigateTo(item.path)"
               class="flex items-center gap-3 px-4 py-3 mx-3 mb-1 rounded-xl transition cursor-pointer"
               [class.bg-orange]="isActive(item.path)"
               [class.text-white]="isActive(item.path)"
               [class.text-gray-300]="!isActive(item.path)"
               [class.hover:bg-white/10]="!isActive(item.path)">
            <span class="text-xl w-6 text-center">{{ item.icon }}</span>
            <span class="font-poppins text-sm">{{ item.label }}</span>
          </div>
        </nav>

        <!-- Logout -->
        <div class="p-4 border-t border-white/20">
          <button (click)="logout()"
                  class="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-gray-300 hover:bg-red-500/20 hover:text-red-300 transition">
            <span class="text-xl">🚪</span>
            <span class="font-poppins text-sm">Logout</span>
          </button>
        </div>
      </aside>

      <!-- Main -->
      <div class="flex-1 flex flex-col min-w-0 lg:ml-64">

        <!-- Top Header -->
        <header class="bg-white shadow-sm sticky top-0 z-10 flex-shrink-0">
          <div class="px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
            <div class="flex items-center gap-3 min-w-0">
              <!-- Hamburger -->
              <button (click)="sidebarOpen = true; cdr.markForCheck()"
                      class="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition flex-shrink-0">
                <svg class="w-5 h-5 text-dark-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
              </button>
              <div class="min-w-0">
                <h1 class="font-montserrat text-base sm:text-lg font-bold text-dark-navy truncate">{{ currentTitle }}</h1>
                <p class="font-poppins text-xs text-gray-500 hidden sm:block">{{ currentSubtitle }}</p>
              </div>
            </div>
            <div class="w-9 h-9 bg-orange/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span class="text-orange font-bold text-sm">A</span>
            </div>
          </div>
        </header>

        <!-- Page Content -->
        <main class="flex-1 overflow-y-auto p-4 sm:p-6">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `
})
export class AdminLayoutComponent implements OnInit {
  navItems = [
    { path: '/admin', label: 'Dashboard', icon: '📊' },
    { path: '/admin/products', label: 'Products', icon: '📦' },
    { path: '/admin/orders', label: 'Orders', icon: '🛒' }
  ];

  currentTitle = 'Dashboard';
  currentSubtitle = 'Overview of your store';
  sidebarOpen = false;

  constructor(private router: Router, private auth: AuthService, public cdr: ChangeDetectorRef) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateTitle(event.url);
        this.sidebarOpen = false;
        this.cdr.markForCheck();
      }
    });
  }

  ngOnInit() {
    this.updateTitle(this.router.url);
    // Open sidebar by default on large screens
    this.sidebarOpen = window.innerWidth >= 1024;
    this.cdr.markForCheck();
  }

  updateTitle(url: string) {
    const map: Record<string, { title: string; subtitle: string }> = {
      '/admin/products': { title: 'Products', subtitle: 'Manage your products' },
      '/admin/orders':   { title: 'Orders',   subtitle: 'Track and manage orders' },
    };
    const match = Object.keys(map).find(k => url.includes(k));
    if (match) {
      this.currentTitle = map[match].title;
      this.currentSubtitle = map[match].subtitle;
    } else {
      this.currentTitle = 'Dashboard';
      this.currentSubtitle = 'Overview of your store';
    }
  }

  isActive(path: string): boolean {
    if (path === '/admin') return this.router.url === '/admin';
    return this.router.url.startsWith(path);
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
