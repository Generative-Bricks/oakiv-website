import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import './types' // Import route meta types

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: 'Oak IV Hydration & Wellness' }
  },
  {
    path: '/services',
    name: 'Services',
    component: () => import('@/views/ServicesView.vue'),
    meta: { title: 'Our Services | Oak IV' }
  },
  {
    path: '/services/iv-therapy',
    name: 'IVTherapy',
    component: () => import('@/views/IVTherapyView.vue'),
    meta: { title: 'IV Therapy | Oak IV' }
  },
  {
    path: '/services/vitamin-injections',
    name: 'VitaminInjections',
    component: () => import('@/views/VitaminInjectionsView.vue'),
    meta: { title: 'Vitamin Injections | Oak IV' }
  },
  {
    path: '/services/wellness-consultations',
    name: 'WellnessConsultations',
    component: () => import('@/views/WellnessConsultationsView.vue'),
    meta: { title: 'Wellness Consultations | Oak IV' }
  },
  {
    path: '/services/event-services',
    name: 'EventServices',
    component: () => import('@/views/EventServicesView.vue'),
    meta: { title: 'Event Services | Oak IV' }
  },
  {
    path: '/services/:slug',
    name: 'ServiceDetail',
    component: () => import('@/views/ServiceDetailView.vue'),
    meta: { title: 'Service Details | Oak IV' }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AboutView.vue'),
    meta: { title: 'About Us | Oak IV' }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('@/views/ContactView.vue'),
    meta: { title: 'Contact Us | Oak IV' }
  },
  {
    path: '/book',
    name: 'Book',
    component: () => import('@/views/BookView.vue'),
    meta: { title: 'Book Appointment | Oak IV' }
  },
  {
    path: '/faq',
    name: 'FAQ',
    component: () => import('@/views/FAQView.vue'),
    meta: { title: 'FAQ | Oak IV' }
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: () => import('@/views/PrivacyView.vue'),
    meta: { title: 'Privacy Policy | Oak IV' }
  },
  {
    path: '/terms',
    name: 'Terms',
    component: () => import('@/views/TermsView.vue'),
    meta: { title: 'Terms of Service | Oak IV' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: 'Page Not Found | Oak IV' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0, behavior: 'smooth' }
  }
})

// Update document title on navigation
router.beforeEach((to) => {
  document.title = (to.meta.title as string) || 'Oak IV Hydration & Wellness'
})

export default router
