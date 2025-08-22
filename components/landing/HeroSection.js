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
        return `
      <section class="hero position-relative overflow-hidden" style="height:600px;">
        <!-- Slide container -->
        <div class="hero-slide position-absolute top-0 start-0 w-100 h-100"></div>

        <!-- Controls -->
        <button class="hero-prev btn btn-light position-absolute top-50 start-0 translate-middle-y" style="z-index:3;">◀</button>
        <button class="hero-next btn btn-light position-absolute top-50 end-0 translate-middle-y" style="z-index:3;">▶</button>

        <!-- Dots -->
        <div class="hero-dots position-absolute bottom-0 start-50 translate-middle-x mb-3 d-flex gap-2" style="z-index:3;">
          ${this.ads.map((_, i) =>
            `<span class="dot ${i === 0 ? "active" : ""}" data-i="${i}" 
                style="width:12px; height:12px; border-radius:50%; display:inline-block; cursor:pointer;"></span>`
        ).join("")}
        </div>
      </section>
    `;
    }

    script() {
        const slideContainer = this.parent.querySelector(".hero-slide");
        const dots = this.parent.querySelectorAll(".dot");
        const prevBtn = this.parent.querySelector(".hero-prev");
        const nextBtn = this.parent.querySelector(".hero-next");

        

        const renderAd = (i) => {
            slideContainer.innerHTML = "";
            this.mount(Advertisement, ".hero-slide", {
                ...this.ads[i],
                btn: { content: this.ads[i].btnText, classList: this.ads[i].btnClass }
            });
            dots.forEach((d, idx) => d.classList.toggle("active", idx === i));
            this.current = i;
        };

        const next = () => renderAd((this.current + 1) % this.ads.length);
        const prev = () => renderAd((this.current - 1 + this.ads.length) % this.ads.length);

        prevBtn.onclick = prev;
        nextBtn.onclick = next;
        dots.forEach(dot => dot.onclick = (e) => renderAd(+e.target.dataset.i));

        // اول اعلان
        renderAd(0);

        this.timer = setInterval(next, this.interval);
    }

    onLeave() {
        clearInterval(this.timer);
    }
}