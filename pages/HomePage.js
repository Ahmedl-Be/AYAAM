import View from "../components/core/view.js";
import Navbar from "../components/landing/Nav.js";
import { ads } from '../data/ads/ads.js'
import HeroSection from "../components/landing/HeroSection.js";

export default class HomePage extends View {
  template() {
    return `
            <header class="sticky-top bg-white" id='navbar'></header>
            <section id="hero"></section>
        `;
  }

  script() {
    this.mount(Navbar, "#navbar");
    this.mount(HeroSection, '#hero', { ads })
  }
}

