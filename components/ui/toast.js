import Component from "../core/component.js";

export default class Toast extends Component {

    template() {
        return `
          <!-- Toast Container -->
            <div class="position-fixed end-0 p-4" style="top: 2.8rem; z-index: 9999">
                <div id="liveToast" class="toast align-items-center text-bg-dark border-0" role="alert" aria-live="assertive"
                aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body" id="toastMessage">
                    <!-- Message goes here -->
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
                </div>
                </div>
            </div>
        ` 
    }

    static notify(message, type = "dark") {
        const toastEl = document.getElementById("liveToast");
        const toastMsg = document.getElementById("toastMessage");

        // set message
        toastMsg.textContent = message;

        // update color class (success, danger, warning, etc.)
        toastEl.className = `toast align-items-center text-bg-${type} border-0`;

        // show toast
        const toast = new bootstrap.Toast(toastEl);
        toast.show();
    }

    script() {
        
    }
}