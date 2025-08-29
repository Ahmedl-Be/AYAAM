import View from "../components/core/view.js";
import { Button } from "../components/ui/buttons.js";
import { navigate } from "../scripts/utils/navigation.js";


export default class NotFound extends View {
    constructor(_config, _params = {}) {
        // Call base constructor
        super({
            title: 'NOT FOUND | AYAAM'
        }, _params);

    }
    template() {
        return `<h1> Not Found - 404</h1>
        ${Button('<= Back to Landing Page','back-btn')}
        `
    }

    script() {
        document.getElementById('back-btn').addEventListener('click', () => {
            navigate('/home')
        })
    }
    
}