import View from "../components/core/view.js";
import Navbar from "../components/landing/Nav.js";
import { ads } from '../data/ads/ads.js'
import HeroSection from "../components/landing/HeroSection.js";
import Slider from "../components/landing/Slider.js";
import Footer from "../components/landing/Footer.js";
import Newsletter from "../components/landing/Newsletter.js";
import Toast from "../components/ui/toast.js";

export default class HomePage extends View {
  template() {
    return `
            <header class="sticky-top bg-white" id='navbar'></header>
            <div class="toast-body" id="toastMsg"></div>
            <section class="container-fluid" id="hero"></section>
            <section id='slider'>${Slider()}</section>
      <!-- NEWS LETTER --> 
            <section id='newsletter'></section>

            <footer class="bg-dark text-light pt-5 pb-4 mt-5" id='footer'>${Footer()}</footer>
        `;
  }

  script() {
    this.mount(Toast, "#toastMsg")
    this.mount(Navbar, "#navbar");
    this.mount(HeroSection, '#hero', { ads });
    this.mount(Newsletter, '#newsletter');
  }
}

