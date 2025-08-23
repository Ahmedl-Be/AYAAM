import Component from "../core/component.js";
import Advertisement from "./Advertisment.js";


export default class HeroSection extends Component {
    constructor(_config = {}, _params = {}) {
        super(_config, _params);
        this.ads = _params.ads || [];
        this.interval = _params.interval || 5000;
        this.current = 0;
        this.timer = null;
    }

    template() {
        const adsEl = this.ads.map((ads, i) => Advertisement(ads, i === 0)).join("");

        return `
      <div id="headCarousel" class="carousel slide carousel-fade" data-bs-ride="carousel">
  <div class="carousel-inner">
    ${adsEl}
  </div>

  <!-- Controls -->
  <button class="carousel-control-prev" type="button" data-bs-target="#headCarousel" data-bs-slide="prev">
    <span class="carousel-control-prev-icon"></span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#headCarousel" data-bs-slide="next">
    <span class="carousel-control-next-icon"></span>
  </button>

  <!-- Bars instead of dots -->
  <div class="carousel-indicators">
    ${this.ads.map((ad, i) =>
        `<button type="button" data-bs-target="#headCarousel" data-bs-slide-to="${i}" 
         class="${i === 0 ? "active" : ""}" aria-current="${i === 0 ? "true" : "false"}" 
         style="width:40px; height:6px; border-radius:3px; background-color:#fff; margin:0 4px;"></button>`
    ).join("")}
  </div>
</div>
    `;
    }

    script() {
        
    }
}