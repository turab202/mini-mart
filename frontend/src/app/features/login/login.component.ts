import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <div class="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <!-- Logo/Header -->
        <div class="text-center mb-6">
          <div class="w-16 h-16 bg-orange rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span class="text-white text-2xl font-bold">M</span>
          </div>
          <h2 class="font-montserrat text-2xl font-bold text-dark-navy">Admin Login</h2>
          <p class="font-poppins text-sm text-gray-500 mt-1">Sign in to access the dashboard</p>
        </div>
        
        <!-- Error Message -->
        <div *ngIf="errorMessage" 
             class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-start gap-3">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span class="font-poppins text-sm">{{ errorMessage }}</span>
        </div>

        <!-- Success Message -->
        <div *ngIf="successMessage" 
             class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 flex items-start gap-3">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span class="font-poppins text-sm">{{ successMessage }}</span>
        </div>
        
        <form (ngSubmit)="login()" #loginForm="ngForm">
          <!-- Email Field -->
          <div class="mb-4">
            <label class="block font-poppins text-sm font-medium text-dark-navy mb-2">
              Email Address
            </label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </span>
              <input type="email" 
                     [(ngModel)]="email" 
                     name="email" 
                     required
                     [disabled]="isLoading"
                     placeholder="admin@minimart.com"
                     class="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:border-orange focus:outline-none font-poppins disabled:bg-gray-50 disabled:text-gray-500">
            </div>
          </div>
          
          <!-- Password Field -->
          <div class="mb-6">
            <label class="block font-poppins text-sm font-medium text-dark-navy mb-2">
              Password
            </label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </span>
              <input [type]="showPassword ? 'text' : 'password'" 
                     [(ngModel)]="password" 
                     name="password" 
                     required
                     [disabled]="isLoading"
                     placeholder="••••••••"
                     class="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg focus:border-orange focus:outline-none font-poppins disabled:bg-gray-50">
              <button type="button" 
                      (click)="showPassword = !showPassword"
                      class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <svg *ngIf="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                <svg *ngIf="showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <!-- Submit Button -->
          <button type="submit" 
                  [disabled]="isLoading"
                  class="w-full bg-orange text-white py-3 rounded-lg font-poppins font-medium hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            <svg *ngIf="isLoading" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>{{ getButtonText() }}</span>
          </button>
        </form>
        
        <!-- Demo Credentials -->
        <div class="mt-6 p-4 bg-gray-50 rounded-lg">
          <p class="font-poppins text-xs text-gray-500 text-center mb-2">Demo Credentials</p>
          <div class="space-y-1 text-center">
            <p class="font-poppins text-sm text-dark-navy">
              <span class="font-medium">Email:</span> admin&#64;minimart.com
            </p>
            <p class="font-poppins text-sm text-dark-navy">
              <span class="font-medium">Password:</span> admin123
            </p>
          </div>
          <button (click)="fillDemoCredentials()" 
                  [disabled]="isLoading"
                  class="mt-3 w-full text-orange text-sm font-poppins hover:underline disabled:opacity-50">
            Fill Credentials
          </button>
        </div>

        <!-- Back to Store -->
        <div class="mt-6 text-center">
          <a routerLink="/" class="font-poppins text-sm text-gray-500 hover:text-orange transition">
            ← Back to Store
          </a>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  email = '';
  password = '';
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  showPassword = false;

  constructor(private auth: AuthService, private router: Router) {}

  fillDemoCredentials() {
    this.email = 'admin@minimart.com';
    this.password = 'admin123';
  }

  getButtonText(): string {
    if (this.isLoading) return 'Logging in...';
    return 'Sign In';
  }

  login() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter both email and password';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    
    this.auth.login(this.email, this.password).subscribe({
      next: (response) => {
        this.successMessage = 'Login successful! Redirecting...';
        this.isLoading = false;
        
        // Store token and user data
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
        }
        
        // Redirect after short delay to show success message
        setTimeout(() => {
          this.router.navigate(['/admin']);
        }, 1000);
      },
      error: (err) => {
        this.isLoading = false;
        
        // User-friendly error messages
        if (err.status === 0) {
          this.errorMessage = 'Unable to connect to server. Please check if the backend is running.';
        } else if (err.status === 400) {
          this.errorMessage = 'Invalid email or password. Please try again.';
        } else if (err.status === 401) {
          this.errorMessage = 'Unauthorized access. Please check your credentials.';
        } else if (err.status === 500) {
          this.errorMessage = 'Server error. Please try again later.';
        } else {
          this.errorMessage = err.error?.message || 'Login failed. Please try again.';
        }
        
        console.error('Login error:', err);
      }
    });
  }
}