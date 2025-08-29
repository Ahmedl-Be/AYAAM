import View from "../components/core/view.js";
import SideToSide from './../components/layout/SidetoSide.js';
import HalfImage from './../components/layout/HalfImage.js';
import SignupForm from "../components/auth/SignupForm.js";
import Toast from "../components/ui/toast.js";



export default class SignupPage extends View {
  constructor(_config, _params = {}) {
    // Call base constructor
    super({
      title: 'Signup | AYAAM'
    }, _params);

  }
    template() {
        const formHalf = `<div
          class="col-9 d-flex align-items-center justify-content-center py-5"
        >
          <div class="w-100" style="max-width: 400px">
            <div class="text-center mb-5">
              <h2>Create Account</h2>
              <p class="text-muted">Fill in your details to get started</p>
            </div>
            <div class='container-fluid m-0 p-0' id='form-root'></div>
            
          </div>
        </div>
      </div>`
      return `
        <div class="toast-body" id="toastMsg"></div>
        ${SideToSide(HalfImage('','',''),formHalf,'hideLeft')}
        `
    }

    script() {
      this.mount(Toast, "#toastMsg")
      this.mount(SignupForm, '#form-root')
    }
}
