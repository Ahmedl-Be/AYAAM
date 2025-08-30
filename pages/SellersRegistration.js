import View from "../components/core/view.js";
import Toast from "../components/ui/toast.js";
import SellerForm from "../components/auth/SellerForm.js";
import TermsModal from "../components/auth/terms.js";
import Modal from "../components/auth/modal.js";



export default class SellersRegistration extends View {
  constructor(_config, _params = {}) {
    // Call base constructor
    super({
      title: 'Confirm registration | AYAAM'
    }, _params);

  }
    template() {
        return `
<!-- Toast Notification -->
        <div class="toast-body" id="toastMsg"></div>

<!-- Form Content -->
        <div class="container py-5">
            <div class="row justify-content-center">
                <div class="col-md-6 col-lg-5">
                    <div class="card shadow-sm">
                        <div class="card-body p-4">

                            <h2 class="h4 text-center mb-4 text-warning fw-bold">Become a Seller</h2>

                            <div id="form-root"></div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

<!-- Terms Modal -->
        ${Modal('Terms & Conditions', TermsModal())}
        `
    }

    script() {
      this.mount(Toast, "#toastMsg")
      this.mount(SellerForm, '#form-root')
    }
}