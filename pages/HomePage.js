import View from "../components/core/view.js";
import Navbar from "../components/landing/Nav.js";
import { ads } from '../data/ads/ads.js'
import HeroSection from "../components/landing/HeroSection.js";
import Slider from "../components/landing/Slider.js";
import Footer from "../components/landing/Footer.js";
import Newsletter from "../components/landing/Newsletter.js";
import Toast from "../components/ui/toast.js";
import CardsSection from "../components/landing/Section.js";
import { localStore } from "../scripts/utils/storage.js";

export default class HomePage extends View {
  template() {
    return `
            <header class="sticky-top bg-white" id='navbar'></header>
            <div class="toast-body" id="toastMsg"></div>
            <section class="container-fluid" id="hero"></section>

      <!-- Brands Slider -->
            <section id='slider'>${Slider()}</section>
      
      <!-- Featured Section -->
            <section id='featured-section'></section>
      
      <!-- News Letter --> 
            <section id='newsletter'></section>

            <footer class="bg-dark text-light pt-5 pb-4 mt-5" id='footer'>${Footer()}</footer>
        `;
  }



  script() {
    this.mount(Toast, "#toastMsg")
    this.mount(Navbar, "#navbar");
    this.mount(HeroSection, '#hero', { ads });

    this.mount(CardsSection,'#featured-section',{
      id: 'featured',
      title: "Featured Items",
      items: localStore.read('products' || []).slice(0,4),
    })
    this.mount(Newsletter, '#newsletter');
  }

  render() {
    this.onEnter();

    if (!this.parent) {
      console.warn(`No parent found for ${this.constructor.name}`);
      return;
    }

    this.parent.innerHTML = this.template();
    this.script();
  }
}

