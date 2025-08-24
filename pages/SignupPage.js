import View from "../components/core/view.js";
import SideToSide from './../components/layout/SidetoSide.js';
import HalfImage from './../components/layout/HalfImage.js';
import SignupForm from "../components/auth/SignupForm.js";


export default class SignupPage extends View {
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
        ${SideToSide(HalfImage('','',''),formHalf,'hideLeft')}
        `
    }

    script() {
        let signup = new SignupForm({ parent: 'form-root' })
        signup.render()
    }
}
