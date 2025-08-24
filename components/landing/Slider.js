export default function Slider() {

    return `
        <div class="slider" style="
            --width: 100px;
            --height: 60px;
            --quantity: 7;
        ">
            <div class="list">
                <div class="item" style="--position: 6  "><img src="../assets/images/brands/Nike-b.svg" alt=""></div>
                <div class="item" style="--position: 7"><img src="../assets/images/brands/Adidas-b.svg" alt=""></div>
                <div class="item" style="--position: 1"><img src="../assets/images/brands/Chanel.svg" alt=""></div>
                <div class="item" style="--position: 2"><img src="../assets/images/brands/Dior.svg" alt=""></div>
                <div class="item" style="--position: 3"><img src="../assets/images/brands/Puma.svg" alt=""></div>
                <div class="item" style="--position: 4"><img src="../assets/images/brands/Zara.svg" alt=""></div>
                <div class="item" style="--position: 5"><img src="../assets/images/brands/LV.svg" alt=""></div>
               
            </div>
        </div>
    `
}