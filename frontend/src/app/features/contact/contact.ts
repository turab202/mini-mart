import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../../shared/navbar/navbar';
import { FooterComponent } from '../../shared/footer/footer';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent, FooterComponent],
  template: `
    <app-navbar></app-navbar>
    
    <main class="bg-gray-50 min-h-screen">
      <!-- Hero Section -->
      <section class="bg-deep-blue text-white py-20">
        <div class="max-w-7xl mx-auto px-4 text-center">
          <h1 class="font-montserrat text-5xl font-bold mb-4">Contact Us</h1>
          <p class="font-poppins text-xl text-gray-300 max-w-2xl mx-auto">
            We'd love to hear from you. Get in touch with our team
          </p>
        </div>
      </section>

      <!-- Contact Section -->
      <section class="py-16">
        <div class="max-w-7xl mx-auto px-4">
          <div class="grid lg:grid-cols-2 gap-12">
            <!-- Contact Info -->
            <div>
              <div class="bg-white rounded-2xl p-8 shadow-sm mb-6">
                <h2 class="font-montserrat text-2xl font-bold text-dark-navy mb-6">Get in Touch</h2>
                <div class="space-y-5">
                  <div class="flex items-start gap-4">
                    <div class="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg class="w-6 h-6 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 class="font-montserrat font-semibold text-dark-navy">Address</h3>
                      <p class="font-poppins text-gray-500">Bole, Addis Ababa, Ethiopia</p>
                    </div>
                  </div>
                  <div class="flex items-start gap-4">
                    <div class="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg class="w-6 h-6 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 class="font-montserrat font-semibold text-dark-navy">Phone</h3>
                      <p class="font-poppins text-gray-500">+251 900 123 456</p>
                      <p class="font-poppins text-gray-500 text-sm">Mon-Fri: 9AM - 8PM</p>
                    </div>
                  </div>
                  <div class="flex items-start gap-4">
                    <div class="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg class="w-6 h-6 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 class="font-montserrat font-semibold text-dark-navy">Email</h3>
                      <p class="font-poppins text-gray-500">support&#64;minimart.com</p>
                      <p class="font-poppins text-gray-500 text-sm">orders&#64;minimart.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Map -->
              <div class="bg-white rounded-2xl p-8 shadow-sm">
                <h2 class="font-montserrat text-2xl font-bold text-dark-navy mb-4">Find Us</h2>
                <div class="bg-gray-200 rounded-xl h-64 flex items-center justify-center">
                  <p class="text-gray-500">Map View - Bole, Addis Ababa</p>
                </div>
              </div>
            </div>

            <!-- Contact Form -->
            <div class="bg-white rounded-2xl p-8 shadow-sm">
              <h2 class="font-montserrat text-2xl font-bold text-dark-navy mb-6">Send us a Message</h2>
              <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="space-y-5">
                <div>
                  <label class="font-poppins text-sm text-dark-navy block mb-1">Your Name *</label>
                  <input type="text" formControlName="name" 
                    class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-orange focus:outline-none">
                </div>
                <div>
                  <label class="font-poppins text-sm text-dark-navy block mb-1">Email Address *</label>
                  <input type="email" formControlName="email" 
                    class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-orange focus:outline-none">
                </div>
                <div>
                  <label class="font-poppins text-sm text-dark-navy block mb-1">Phone Number</label>
                  <input type="tel" formControlName="phone" 
                    class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-orange focus:outline-none">
                </div>
                <div>
                  <label class="font-poppins text-sm text-dark-navy block mb-1">Subject *</label>
                  <input type="text" formControlName="subject" 
                    class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-orange focus:outline-none">
                </div>
                <div>
                  <label class="font-poppins text-sm text-dark-navy block mb-1">Message *</label>
                  <textarea formControlName="message" rows="5" 
                    class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-orange focus:outline-none"></textarea>
                </div>
                <button type="submit" 
                  class="w-full bg-orange text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
    
    <app-footer></app-footer>
  `
})
export class ContactComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Form submitted:', this.contactForm.value);
      alert('Thank you for your message! We will get back to you soon.');
      this.contactForm.reset();
    }
  }
}