import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="flex h-screen bg-gray-100">
      <!-- Sidebar -->
      <aside class="w-64 bg-deep-blue text-white flex flex-col fixed h-full z-10">
        <!-- Logo -->
        <div class="p-5 border-b border-white/20">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-orange rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-xl">M</span>
            </div>
            <div>
              <h1 class="font-montserrat font-bold text-lg">Mini-Mart</h1>
              <p class="font-poppins text-xs text-gray-300">Admin Panel</p>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 py-6">
          @for (item of navItems; track item.path) {
            <div (click)="navigateTo(item.path)"
                 class="flex items-center gap-3 px-5 py-3 mx-3 rounded-lg transition cursor-pointer"
                 [class.bg-orange]="isActive(item.path)"
                 [class.text-white]="isActive(item.path)"
                 [class.text-gray-300]="!isActive(item.path)"
                 [class.hover:bg-orange/20]="!isActive(item.path)">
              <span class="text-xl">{{ item.icon }}</span>
              <span class="font-poppins">{{ item.label }}</span>
            </div>
          }
        </nav>

        <!-- Footer -->
        <div class="p-5 border-t border-white/20">
          <button (click)="logout()" class="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-gray-300 hover:bg-red-500/20 hover:text-red-300 transition">
            <span class="text-xl">🚪</span>
            <span class="font-poppins">Logout</span>
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <div class="flex-1 ml-64">
        <!-- Top Header -->
        <header class="bg-white shadow-sm sticky top-0 z-20">
          <div class="px-6 py-4 flex justify-between items-center">
            <div>
              <h1 class="font-montserrat text-xl font-bold text-dark-navy">{{ currentTitle }}</h1>
              <p class="font-poppins text-sm text-gray-500">{{ currentSubtitle }}</p>
            </div>
            <div class="flex items-center gap-4">
              <div class="relative">
                <input type="text" placeholder="Search..." [(ngModel)]="searchTerm"
                  class="pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:border-orange focus:outline-none w-64">
                <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <div class="w-10 h-10 bg-orange/10 rounded-full flex items-center justify-center">
                <span class="text-orange font-semibold">A</span>
              </div>
            </div>
          </div>
        </header>

        <!-- Page Content -->
        <main class="p-6">
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
    { path: '/admin/orders', label: 'Orders', icon: '🛒' },
    { path: '/admin/customers', label: 'Customers', icon: '👥' },
    { path: '/admin/settings', label: 'Settings', icon: '⚙️' }
  ];

  currentTitle = 'Dashboard';
  currentSubtitle = 'Overview of your store';
  searchTerm = '';

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateTitle(event.url);
      }
    });
  }

  ngOnInit() {
    this.updateTitle(this.router.url);
  }

  updateTitle(url: string) {
    const item = this.navItems.find(i => url.includes(i.path));
    if (item) {
      this.currentTitle = item.label;
      if (item.label === 'Dashboard') {
        this.currentSubtitle = 'Overview of your store';
      } else if (item.label === 'Products') {
        this.currentSubtitle = 'Manage your products';
      } else if (item.label === 'Orders') {
        this.currentSubtitle = 'Track and manage orders';
      } else if (item.label === 'Customers') {
        this.currentSubtitle = 'View customer information';
      } else if (item.label === 'Settings') {
        this.currentSubtitle = 'Configure your store';
      }
    }
  }

  isActive(path: string): boolean {
    if (path === '/admin' && this.router.url === '/admin') return true;
    if (path !== '/admin' && this.router.url.includes(path)) return true;
    return false;
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}