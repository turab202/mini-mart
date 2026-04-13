import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar';
import { FooterComponent } from '../../shared/footer/footer';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  template: `
    <app-navbar></app-navbar>
    
    <main class="bg-gray-50 min-h-screen">
      <!-- Hero Section -->
      <section class="bg-deep-blue text-white py-20">
        <div class="max-w-7xl mx-auto px-4 text-center">
          <h1 class="font-montserrat text-5xl font-bold mb-4">About Mini-Mart</h1>
          <p class="font-poppins text-xl text-gray-300 max-w-2xl mx-auto">
            Your trusted online shopping destination for quality products at amazing prices
          </p>
        </div>
      </section>

      <!-- Mission & Vision -->
      <section class="py-16">
        <div class="max-w-7xl mx-auto px-4">
          <div class="grid md:grid-cols-2 gap-12">
            <div class="bg-white rounded-2xl p-8 shadow-sm">
              <div class="w-16 h-16 bg-orange/10 rounded-2xl flex items-center justify-center mb-4">
                <svg class="w-8 h-8 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h2 class="font-montserrat text-2xl font-bold text-dark-navy mb-3">Our Mission</h2>
              <p class="font-poppins text-gray-600 leading-relaxed">
                To provide convenient, affordable, and quality shopping experience to every Ethiopian household, 
                making everyday essentials accessible with just a click.
              </p>
            </div>
            <div class="bg-white rounded-2xl p-8 shadow-sm">
              <div class="w-16 h-16 bg-teal/10 rounded-2xl flex items-center justify-center mb-4">
                <svg class="w-8 h-8 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              </div>
              <h2 class="font-montserrat text-2xl font-bold text-dark-navy mb-3">Our Vision</h2>
              <p class="font-poppins text-gray-600 leading-relaxed">
                To become Ethiopia's most trusted and preferred online marketplace, revolutionizing the way people shop.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Features -->
      <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4">
          <h2 class="font-montserrat text-3xl font-bold text-dark-navy text-center mb-12">Why Choose Mini-Mart?</h2>
          <div class="grid md:grid-cols-3 gap-8">
            <div class="text-center">
              <div class="w-20 h-20 bg-deep-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-10 h-10 text-deep-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="font-montserrat text-xl font-semibold text-dark-navy mb-2">Fast Delivery</h3>
              <p class="font-poppins text-gray-500">Same-day delivery within Addis Ababa</p>
            </div>
            <div class="text-center">
              <div class="w-20 h-20 bg-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-10 h-10 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 class="font-montserrat text-xl font-semibold text-dark-navy mb-2">Quality Guaranteed</h3>
              <p class="font-poppins text-gray-500">100% authentic products</p>
            </div>
            <div class="text-center">
              <div class="w-20 h-20 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-10 h-10 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M6 14h6m-6 4h12M5 4h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"></path>
                </svg>
              </div>
              <h3 class="font-montserrat text-xl font-semibold text-dark-navy mb-2">Secure Payments</h3>
              <p class="font-poppins text-gray-500">Multiple payment options available</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Stats -->
      <section class="py-16 bg-deep-blue">
        <div class="max-w-7xl mx-auto px-4">
          <div class="grid md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div class="font-montserrat text-4xl font-bold mb-2">10K+</div>
              <div class="font-poppins text-gray-300">Happy Customers</div>
            </div>
            <div>
              <div class="font-montserrat text-4xl font-bold mb-2">500+</div>
              <div class="font-poppins text-gray-300">Products</div>
            </div>
            <div>
              <div class="font-montserrat text-4xl font-bold mb-2">50+</div>
              <div class="font-poppins text-gray-300">Brands</div>
            </div>
            <div>
              <div class="font-montserrat text-4xl font-bold mb-2">24/7</div>
              <div class="font-poppins text-gray-300">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      <!-- NEW: Our Team Section -->
      <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4">
          <h2 class="font-montserrat text-3xl font-bold text-dark-navy text-center mb-4">Meet Our Team</h2>
          <p class="font-poppins text-gray-500 text-center max-w-2xl mx-auto mb-12">
            The passionate people behind Mini-Mart who work tirelessly to bring you the best shopping experience
          </p>
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <!-- Team Member 1 -->
            <div class="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition">
              <div class="w-32 h-32 bg-gradient-to-br from-orange to-deep-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-white text-4xl font-bold">👩‍💼</span>
              </div>
              <h3 class="font-montserrat text-xl font-bold text-dark-navy mb-1">Sarah Johnson</h3>
              <p class="font-poppins text-orange font-medium mb-2">CEO & Founder</p>
              <p class="font-poppins text-sm text-gray-500">Visionary leader with 15+ years in e-commerce</p>
            </div>

            <!-- Team Member 2 -->
            <div class="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition">
              <div class="w-32 h-32 bg-gradient-to-br from-teal to-deep-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-white text-4xl font-bold">👨‍💻</span>
              </div>
              <h3 class="font-montserrat text-xl font-bold text-dark-navy mb-1">Michael Chen</h3>
              <p class="font-poppins text-orange font-medium mb-2">CTO</p>
              <p class="font-poppins text-sm text-gray-500">Tech innovator ensuring smooth digital experience</p>
            </div>

            <!-- Team Member 3 -->
            <div class="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition">
              <div class="w-32 h-32 bg-gradient-to-br from-purple-500 to-deep-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-white text-4xl font-bold">👩‍🎨</span>
              </div>
              <h3 class="font-montserrat text-xl font-bold text-dark-navy mb-1">Elena Rodriguez</h3>
              <p class="font-poppins text-orange font-medium mb-2">Creative Director</p>
              <p class="font-poppins text-sm text-gray-500">Design expert creating beautiful user experiences</p>
            </div>

            <!-- Team Member 4 -->
            <div class="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition">
              <div class="w-32 h-32 bg-gradient-to-br from-green-500 to-teal rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-white text-4xl font-bold">👨‍💼</span>
              </div>
              <h3 class="font-montserrat text-xl font-bold text-dark-navy mb-1">David Omondi</h3>
              <p class="font-poppins text-orange font-medium mb-2">Operations Manager</p>
              <p class="font-poppins text-sm text-gray-500">Logistics expert ensuring fast deliveries</p>
            </div>
          </div>
        </div>
      </section>
    </main>
    
    <app-footer></app-footer>
  `
})
export class AboutComponent {}