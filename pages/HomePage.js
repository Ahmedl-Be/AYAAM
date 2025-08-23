import View from "../components/core/view.js";
import Navbar from "../components/landing/Nav.js";
import { ads } from '../data/ads/ads.js'
import HeroSection from "../components/landing/HeroSection.js";
import Slider from "../components/landing/Slider.js";
import Footer from "../components/landing/Footer.js";

export default class HomePage extends View {
  template() {
    return `
            <header class="sticky-top bg-white" id='navbar'></header>
            <section id="hero"></section>
            <section id='slider'>${Slider()}</section>
            <footer class="bg-dark text-light pt-5 pb-4 mt-5" id='footer'>${Footer()}</footer>
        `;
  }

  script() {
    this.mount(Navbar, "#navbar");
    this.mount(HeroSection, '#hero', { ads })
  }
}

