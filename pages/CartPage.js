import View from "../components/core/view.js";


export default class CartPage extends View {
    template() {
        return `
        <h1>CART PAGE</h1>
        <button id='btn'>Click me</button>
        <div id='container'></div>
        `
    }

    script() {
        console.log('CARt Page added');
        document.querySelector('#btn').addEventListener('click', () => {
            alert('Clicked');
        })

        const containerEl = document.querySelector('#container');
        containerEl.innerHTML= '<h2 id="">Sub Container</h2>';
    }
    
}