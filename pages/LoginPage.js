import View from "../components/core/view.js";
import SideToSide from './../components/layout/SidetoSide.js';
import HalfImage from './../components/layout/HalfImage.js';
import LoginForm from "../components/auth/LoginForm.js";
import Toast from "../components/ui/toast.js";


export default class LoginPage extends View {
    template() {
        const formHalf = `<div
          class="col-11 d-flex align-items-center justify-content-center py-5"
        >
          <div class="w-100" style="max-width: 450px">
            <div class="text-center mb-5">
              <h2>Log In</h2>
              <p class="text-muted">Fill in your details to get started</p>
            </div>
            <div class='container-fluid m-0 p-0' id='form-root'></div>
            
          </div>
        </div>
      </div>`
      return `
        <div class="toast-body" id="toastMsg"></div>
        ${SideToSide(formHalf, HalfImage('', '', ''),'hideRight')}
        `
    }

  script() {
        this.mount(Toast, "#toastMsg")
        this.mount(LoginForm,'#form-root')
    }
}