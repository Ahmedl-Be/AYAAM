import View from "../components/core/view.js";
import SideToSide from './../components/layout/SidetoSide.js';
import HalfImage from './../components/layout/HalfImage.js';
import LoginForm from "../components/auth/LoginForm.js";
import Toast from "../components/ui/toast.js";


export default class LoginPage extends View {
  constructor(_config, _params = {}) {
    // Call base constructor
    super({
      title: 'Login | AYAAM'
    }, _params);

  }
    template() {
        const formHalf = `<div
                            class="col-11 d-flex align-items-center justify-content-center py-5"
                          >
                              <div class="w-100" style="max-width: 450px">
                                <div class="text-center mb-5">
                                  <h2 class="mb-2">Welcome back!</h2>
                                  <p class="text-muted">Fill in your details to continue shopping.</p>
                                </div>
                                <div class='container-fluid m-0 p-0' id='form-root'></div>
                                <div class="mt-4 text-center">Don't have account? <a href="#/signup" data-route>Join us now.</a></div>
                            </div>
                          </div>`
      return `
        <div class="toast-body" id="toastMsg"></div>
        ${SideToSide(formHalf, HalfImage('/assets/images/thumbnails/man2.jpg', '', ''),'hideRight')}
        `
    }

  script() {
        this.mount(Toast, "#toastMsg")
        this.mount(LoginForm,'#form-root')
    }
}