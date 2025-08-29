import View from "../components/core/view.js";
import Navbar from "../components/landing/Nav.js";
import ProfileForm from "../components/profile/ProfileForm.js";
import TableOrders from "../components/profile/TableOrders.js";


export default class Profile extends View {
    template() {
        return `
        <header class="sticky-top bg-white" id='navbar'></header>
        <div class="container">
            <div class="row">
                <!-- Main Content -->
                <div class=" col-md-4  p-3 " id="profile-form">
                
                </div>

                <div id="orders-table" class="col-md-8 p-3"></div>
            </div>
        </div>
        `
    }

    script() {
        this.mount(Navbar, "#navbar");
        this.mount(ProfileForm, "#profile-form");
        this.mount(TableOrders, "#orders-table");
       
    }
    
}