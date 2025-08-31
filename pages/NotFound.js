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
        return `<div class="center-center">
        <div class="notfound-container">
    <div class="mb-4">
      <i class="fa-solid fa-triangle-exclamation notfound-icon"></i>
    </div>
    <h1 class="display-4 fw-bold">404</h1>
    <p class="lead text-muted mb-4">Oops! The page you’re looking for doesn’t exist or has been moved.</p>
    <a href="/" class="btn bg-warning btn-lg" data-route>
      <i class="fa-solid fa-house"></i> Back to Home
    </a>
  </div>
  </div>
        `
    }

    script() {
    }

}