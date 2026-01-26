<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-oak-green-pale py-16">
      <div class="container mx-auto px-4 text-center">
        <SectionHeading
          eyebrow="Schedule Your Visit"
          title="Book Your Appointment"
          subtitle="Choose your preferred service and schedule a convenient time for your wellness treatment."
          size="xl"
        />
      </div>
    </section>

    <!-- Booking Content -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <!-- Step Indicator -->
          <div class="flex items-center justify-center mb-12">
            <div class="flex items-center">
              <div :class="[
                'w-10 h-10 rounded-full flex items-center justify-center font-bold',
                step >= 1 ? 'bg-oak-green-primary text-white' : 'bg-gray-200 text-gray-500'
              ]">1</div>
              <span class="ml-2 text-sm font-medium" :class="step >= 1 ? 'text-oak-text' : 'text-gray-400'">Select Service</span>
            </div>
            <div class="w-16 h-0.5 mx-4" :class="step >= 2 ? 'bg-oak-green-primary' : 'bg-gray-200'"></div>
            <div class="flex items-center">
              <div :class="[
                'w-10 h-10 rounded-full flex items-center justify-center font-bold',
                step >= 2 ? 'bg-oak-green-primary text-white' : 'bg-gray-200 text-gray-500'
              ]">2</div>
              <span class="ml-2 text-sm font-medium" :class="step >= 2 ? 'text-oak-text' : 'text-gray-400'">Your Details</span>
            </div>
            <div class="w-16 h-0.5 mx-4" :class="step >= 3 ? 'bg-oak-green-primary' : 'bg-gray-200'"></div>
            <div class="flex items-center">
              <div :class="[
                'w-10 h-10 rounded-full flex items-center justify-center font-bold',
                step >= 3 ? 'bg-oak-green-primary text-white' : 'bg-gray-200 text-gray-500'
              ]">3</div>
              <span class="ml-2 text-sm font-medium" :class="step >= 3 ? 'text-oak-text' : 'text-gray-400'">Confirm</span>
            </div>
          </div>

          <!-- Step 1: Service Selection -->
          <div v-if="step === 1" class="bg-white p-8 rounded-2xl shadow-lg">
            <h2 class="font-display text-2xl text-oak-text mb-6">Select Your Service</h2>

            <!-- Selected Service Summary (shown when pre-selected) -->
            <div
              v-if="selectedService && wasPreselected"
              class="mb-8 relative overflow-hidden"
            >
              <!-- Success State -->
              <div class="bg-gradient-to-r from-oak-green-primary/10 to-oak-green-light/5 border-2 border-oak-green-primary rounded-xl p-5 transition-all">
                <div class="flex items-start gap-4">
                  <!-- Checkmark Icon -->
                  <div class="flex-shrink-0 w-10 h-10 bg-oak-green-primary rounded-full flex items-center justify-center">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>

                  <!-- Service Info -->
                  <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between gap-4 mb-1">
                      <div>
                        <p class="text-xs font-semibold text-oak-green-primary uppercase tracking-wider mb-1">
                          Selected Service
                        </p>
                        <h3 class="font-display text-xl text-oak-text font-semibold">
                          {{ selectedService.name }}
                        </h3>
                      </div>
                      <span class="text-2xl font-bold text-oak-gold flex-shrink-0">
                        ${{ selectedService.price }}
                      </span>
                    </div>
                    <p class="text-sm text-oak-text-light mt-2 leading-relaxed">
                      {{ selectedService.shortDescription }}
                    </p>
                    <div class="flex items-center gap-4 mt-3">
                      <span class="text-xs text-oak-text-light flex items-center gap-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {{ selectedService.duration }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Change Service Button -->
                <button
                  @click="showAllServices = !showAllServices"
                  type="button"
                  class="mt-4 w-full sm:w-auto px-4 py-2 bg-white border border-oak-green-primary/30 text-oak-green-primary text-sm font-medium rounded-lg hover:bg-oak-green-pale transition-all flex items-center justify-center gap-2"
                >
                  <svg
                    class="w-4 h-4 transition-transform"
                    :class="showAllServices ? 'rotate-180' : ''"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                  {{ showAllServices ? 'Hide Other Services' : 'Change Service' }}
                </button>
              </div>

              <!-- Info Message -->
              <div class="mt-3 flex items-start gap-2 text-sm text-oak-text-light">
                <svg class="w-5 h-5 flex-shrink-0 text-oak-green-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>
                  {{ showAllServices
                    ? 'Browse other services below or continue with your current selection.'
                    : 'Ready to continue? Click the button below to proceed with booking.'
                  }}
                </span>
              </div>
            </div>

            <!-- Service Cards Grid (always visible if no preselection, or when "Change Service" is clicked) -->
            <div
              v-show="!wasPreselected || showAllServices"
              class="space-y-4"
              :class="{ 'animate-fadeIn': showAllServices }"
            >
              <p v-if="!wasPreselected" class="text-sm text-oak-text-light mb-4">
                Choose from our available wellness services below:
              </p>

              <div
                v-for="service in bookableServices"
                :key="service.id"
                @click="selectService(service)"
                :class="[
                  'p-4 border-2 rounded-xl cursor-pointer transition-all duration-200',
                  selectedService?.id === service.id
                    ? 'border-oak-green-primary bg-oak-green-pale shadow-md ring-2 ring-oak-green-primary/20'
                    : 'border-gray-200 hover:border-oak-green-light hover:shadow-sm'
                ]"
              >
                <div class="flex justify-between items-start">
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-1">
                      <h3 class="font-semibold text-oak-text">{{ service.name }}</h3>
                      <!-- Selected Indicator Badge -->
                      <span
                        v-if="selectedService?.id === service.id"
                        class="inline-flex items-center gap-1 px-2 py-0.5 bg-oak-green-primary text-white text-xs font-medium rounded-full"
                      >
                        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                        Selected
                      </span>
                    </div>
                    <p class="text-sm text-oak-text-light mt-1">{{ service.shortDescription }}</p>
                    <p class="text-sm text-oak-text-light mt-1">Duration: {{ service.duration }}</p>
                  </div>
                  <span class="text-oak-gold font-bold text-lg ml-4 flex-shrink-0">${{ service.price }}</span>
                </div>
              </div>
            </div>

            <!-- Continue Button -->
            <div class="mt-8 flex justify-end">
              <button
                @click="nextStep"
                :disabled="!selectedService"
                class="px-8 py-3 bg-oak-green-primary text-white rounded-lg font-semibold hover:bg-oak-green-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                Continue to Details
                <svg class="w-5 h-5 inline ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Step 2: Contact Details -->
          <div v-if="step === 2" class="bg-white p-8 rounded-2xl shadow-lg">
            <h2 class="font-display text-2xl text-oak-text mb-6">Your Details</h2>
            <form @submit.prevent="nextStep" class="space-y-6">
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <label for="firstName" class="block text-sm font-medium text-oak-text mb-2">First Name *</label>
                  <input
                    id="firstName"
                    v-model="booking.firstName"
                    type="text"
                    required
                    class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-oak-green-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label for="lastName" class="block text-sm font-medium text-oak-text mb-2">Last Name *</label>
                  <input
                    id="lastName"
                    v-model="booking.lastName"
                    type="text"
                    required
                    class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-oak-green-primary focus:border-transparent"
                  />
                </div>
              </div>
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <label for="email" class="block text-sm font-medium text-oak-text mb-2">Email *</label>
                  <input
                    id="email"
                    v-model="booking.email"
                    type="email"
                    required
                    class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-oak-green-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label for="phone" class="block text-sm font-medium text-oak-text mb-2">Phone *</label>
                  <input
                    id="phone"
                    v-model="booking.phone"
                    type="tel"
                    required
                    class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-oak-green-primary focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label for="address" class="block text-sm font-medium text-oak-text mb-2">Service Address *</label>
                <input
                  id="address"
                  v-model="booking.address"
                  type="text"
                  required
                  placeholder="Street address, city, zip"
                  class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-oak-green-primary focus:border-transparent"
                />
              </div>
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <label for="date" class="block text-sm font-medium text-oak-text mb-2">Preferred Date *</label>
                  <input
                    id="date"
                    v-model="booking.date"
                    type="date"
                    required
                    :min="minDate"
                    class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-oak-green-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label for="time" class="block text-sm font-medium text-oak-text mb-2">Preferred Time *</label>
                  <select
                    id="time"
                    v-model="booking.time"
                    required
                    class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-oak-green-primary focus:border-transparent"
                  >
                    <option value="">Select a time...</option>
                    <option value="08:00">8:00 AM</option>
                    <option value="09:00">9:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="13:00">1:00 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                    <option value="17:00">5:00 PM</option>
                    <option value="18:00">6:00 PM</option>
                    <option value="19:00">7:00 PM</option>
                  </select>
                </div>
              </div>
              <div>
                <label for="notes" class="block text-sm font-medium text-oak-text mb-2">Special Requests or Notes</label>
                <textarea
                  id="notes"
                  v-model="booking.notes"
                  rows="3"
                  class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-oak-green-primary focus:border-transparent resize-none"
                  placeholder="Any health concerns, allergies, or special requests..."
                ></textarea>
              </div>
              <div class="flex justify-between">
                <button
                  type="button"
                  @click="prevStep"
                  class="px-8 py-3 border-2 border-oak-green-primary text-oak-green-primary rounded-lg font-semibold hover:bg-oak-green-pale transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  class="px-8 py-3 bg-oak-green-primary text-white rounded-lg font-semibold hover:bg-oak-green-light transition-colors"
                >
                  Review Booking
                </button>
              </div>
            </form>
          </div>

          <!-- Step 3: Confirmation -->
          <div v-if="step === 3" class="bg-white p-8 rounded-2xl shadow-lg">
            <h2 class="font-display text-2xl text-oak-text mb-6">Confirm Your Booking</h2>

            <div class="bg-oak-green-pale rounded-xl p-6 mb-6">
              <h3 class="font-semibold text-oak-text mb-4">Booking Summary</h3>
              <div class="space-y-3 text-sm">
                <div class="flex justify-between">
                  <span class="text-oak-text-light">Service:</span>
                  <span class="font-medium text-oak-text">{{ selectedService?.name }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-oak-text-light">Duration:</span>
                  <span class="font-medium text-oak-text">{{ selectedService?.duration }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-oak-text-light">Date:</span>
                  <span class="font-medium text-oak-text">{{ formatDate(booking.date) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-oak-text-light">Time:</span>
                  <span class="font-medium text-oak-text">{{ formatTime(booking.time) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-oak-text-light">Location:</span>
                  <span class="font-medium text-oak-text">{{ booking.address }}</span>
                </div>
                <hr class="border-oak-green-light/30 my-3" />
                <div class="flex justify-between text-lg">
                  <span class="font-semibold text-oak-text">Total:</span>
                  <span class="font-bold text-oak-gold">${{ selectedService?.price }}</span>
                </div>
              </div>
            </div>

            <div class="bg-gray-50 rounded-xl p-6 mb-6">
              <h3 class="font-semibold text-oak-text mb-4">Contact Information</h3>
              <div class="space-y-2 text-sm">
                <p><span class="text-oak-text-light">Name:</span> {{ booking.firstName }} {{ booking.lastName }}</p>
                <p><span class="text-oak-text-light">Email:</span> {{ booking.email }}</p>
                <p><span class="text-oak-text-light">Phone:</span> {{ booking.phone }}</p>
                <p v-if="booking.notes"><span class="text-oak-text-light">Notes:</span> {{ booking.notes }}</p>
              </div>
            </div>

            <p class="text-sm text-oak-text-light mb-6">
              By confirming this booking, you agree to our cancellation policy. Payment is collected at the time of service.
            </p>

            <div class="flex justify-between">
              <button
                @click="prevStep"
                class="px-8 py-3 border-2 border-oak-green-primary text-oak-green-primary rounded-lg font-semibold hover:bg-oak-green-pale transition-colors"
              >
                Back
              </button>
              <button
                @click="submitBooking"
                :disabled="isSubmitting"
                class="px-8 py-3 bg-oak-green-primary text-white rounded-lg font-semibold hover:bg-oak-green-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ isSubmitting ? 'Submitting...' : 'Confirm Booking' }}
              </button>
            </div>
          </div>

          <!-- Success Message -->
          <div v-if="step === 4" class="bg-white p-8 rounded-2xl shadow-lg text-center">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 class="font-display text-2xl text-oak-text mb-4">Booking Request Submitted!</h2>
            <p class="text-oak-text-light mb-6">
              Thank you for booking with Oak IV Hydration & Wellness. We'll confirm your appointment within 24 hours via email and phone.
            </p>
            <router-link
              to="/"
              class="inline-flex px-8 py-3 bg-oak-green-primary text-white rounded-lg font-semibold hover:bg-oak-green-light transition-colors"
            >
              Return Home
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { SectionHeading } from '@/components/ui'
import { useServicesStore } from '@/stores'
import type { Service } from '@/types'

const route = useRoute()
const servicesStore = useServicesStore()

const step = ref(1)
const selectedService = ref<Service | null>(null)
const isSubmitting = ref(false)
const wasPreselected = ref(false) // Track if service was pre-selected via query param
const showAllServices = ref(false) // Toggle to show/hide service cards when pre-selected

const booking = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  date: '',
  time: '',
  notes: ''
})

const minDate = computed(() => {
  const today = new Date()
  today.setDate(today.getDate() + 1) // Minimum is tomorrow
  return today.toISOString().split('T')[0]
})

// Only show bookable services (exclude vitamin injections which are add-ons)
const bookableServices = computed(() => {
  return servicesStore.services.filter(s => s.category !== 'vitamin-injection')
})

function selectService(service: Service) {
  selectedService.value = service
}

function nextStep() {
  if (step.value < 3) {
    step.value++
  }
}

function prevStep() {
  if (step.value > 1) {
    step.value--
  }
}

function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
}

function formatTime(timeStr: string): string {
  if (!timeStr) return ''
  const parts = timeStr.split(':')
  const hours = parts[0] || '0'
  const minutes = parts[1] || '00'
  const hour = parseInt(hours)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const hour12 = hour % 12 || 12
  return `${hour12}:${minutes} ${ampm}`
}

async function submitBooking() {
  isSubmitting.value = true

  // TODO: Replace with Amplify Data mutation when backend is deployed
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))

  isSubmitting.value = false
  step.value = 4
}

onMounted(async () => {
  await servicesStore.fetchAll()

  // Pre-select service if passed via query param (e.g., /book?service=myers-cocktail)
  const serviceSlug = route.query.service as string
  if (serviceSlug) {
    const preselected = bookableServices.value.find(s => s.slug === serviceSlug)
    if (preselected) {
      selectedService.value = preselected
      wasPreselected.value = true
      showAllServices.value = false // Initially hide service cards
    }
  }
})
</script>
