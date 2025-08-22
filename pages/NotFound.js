import View from "../components/core/view.js";
import { Button } from "../components/ui/buttons.js";
import { navigate } from "../scripts/router.js";


export default class NotFound extends View {
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