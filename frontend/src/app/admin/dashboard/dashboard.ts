import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../core/api.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule],
  template: `
    <div>
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div class="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition">
          <div class="flex justify-between items-start">
            <div>
              <p class="font-poppins text-sm text-gray-500">Total Revenue</p>
              <p class="font-montserrat text-2xl font-bold text-teal-700">{{ stats.totalRevenue }} ETB</p>
              <p class="font-poppins text-xs text-green-600 mt-1">+{{ stats.revenueGrowth }}% from last month</p>
            </div>
            <div class="bg-teal-100 p-3 rounded-lg">
              <svg class="w-6 h-6 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition">
          <div class="flex justify-between items-start">
            <div>
              <p class="font-poppins text-sm text-gray-500">Total Orders</p>
              <p class="font-montserrat text-2xl font-bold text-teal-700">{{ stats.totalOrders }}</p>
              <p class="font-poppins text-xs text-green-600 mt-1">+{{ stats.ordersGrowth }}% from last month</p>
            </div>
            <div class="bg-teal-100 p-3 rounded-lg">
              <svg class="w-6 h-6 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition">
          <div class="flex justify-between items-start">
            <div>
              <p class="font-poppins text-sm text-gray-500">Total Products</p>
              <p class="font-montserrat text-2xl font-bold text-teal-700">{{ stats.totalProducts }}</p>
              <p class="font-poppins text-xs text-gray-500 mt-1">{{ stats.activeProducts }} active</p>
            </div>
            <div class="bg-teal-100 p-3 rounded-lg">
              <svg class="w-6 h-6 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition">
          <div class="flex justify-between items-start">
            <div>
              <p class="font-poppins text-sm text-gray-500">Total Customers</p>
              <p class="font-montserrat text-2xl font-bold text-teal-700">{{ stats.totalCustomers }}</p>
              <p class="font-poppins text-xs text-green-600 mt-1">+{{ stats.customersGrowth }} new this month</p>
            </div>
            <div class="bg-teal-100 p-3 rounded-lg">
              <svg class="w-6 h-6 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Orders Table -->
      <div class="bg-white rounded-xl shadow-sm overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 class="font-montserrat text-lg font-semibold text-charcoal">Recent Orders</h2>
          <button routerLink="/admin/orders" class="text-orange text-sm hover:underline">View All →</button>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="text-left px-6 py-3 font-poppins text-xs font-semibold text-gray-500 uppercase">Order ID</th>
                <th class="text-left px-6 py-3 font-poppins text-xs font-semibold text-gray-500 uppercase">Customer</th>
                <th class="text-left px-6 py-3 font-poppins text-xs font-semibold text-gray-500 uppercase">Total</th>
                <th class="text-left px-6 py-3 font-poppins text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th class="text-left px-6 py-3 font-poppins text-xs font-semibold text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let order of recentOrders" class="border-t border-gray-100 hover:bg-gray-50">
                <td class="px-6 py-4 font-montserrat text-sm font-semibold text-teal-700">{{ order.orderId }}</td>
                <td class="px-6 py-4 font-poppins text-sm text-charcoal">{{ order.customerName }}</td>
                <td class="px-6 py-4 font-poppins text-sm font-medium text-orange">{{ order.total }} ETB</td>
                <td class="px-6 py-4">
                  <span class="px-2 py-1 rounded-full text-xs font-medium" 
                    [class.bg-yellow-100]="order.orderStatus === 'pending'"
                    [class.text-yellow-700]="order.orderStatus === 'pending'"
                    [class.bg-green-100]="order.orderStatus === 'delivered'"
                    [class.text-green-700]="order.orderStatus === 'delivered'"
                    [class.bg-blue-100]="order.orderStatus === 'processing'"
                    [class.text-blue-700]="order.orderStatus === 'processing'"
                    [class.bg-purple-100]="order.orderStatus === 'shipped'"
                    [class.text-purple-700]="order.orderStatus === 'shipped'">
                    {{ order.orderStatus | uppercase }}
                  </span>
                </td>
                <td class="px-6 py-4 font-poppins text-sm text-gray-500">{{ order.createdAt | date:'MMM d, yyyy' }}</td>
              </tr>
              <tr *ngIf="recentOrders.length === 0">
                <td colspan="5" class="text-center py-8 text-gray-500">No orders yet</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class AdminDashboardComponent implements OnInit {
  stats = {
    totalRevenue: 0,
    revenueGrowth: 12,
    totalOrders: 0,
    ordersGrowth: 8,
    totalProducts: 0,
    activeProducts: 0,
    totalCustomers: 0,
    customersGrowth: 5
  };
  
  recentOrders: any[] = [];

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.api.getProducts({ admin: 'true' }).subscribe(res => {
      this.stats.totalProducts = res.products?.length || 0;
      this.stats.activeProducts = res.products?.filter((p: any) => p.isActive).length || 0;
      this.cdr.markForCheck();
    });

    this.api.getOrders().subscribe(res => {
      this.stats.totalOrders = res.orders?.length || 0;
      this.stats.totalRevenue = res.orders?.reduce((sum: number, order: any) => sum + order.total, 0) || 0;
      this.recentOrders = res.orders?.slice(0, 5) || [];
      const uniqueCustomers = new Set(res.orders?.map((o: any) => o.customerPhone) || []);
      this.stats.totalCustomers = uniqueCustomers.size;
      this.cdr.markForCheck();
    });
  }
}