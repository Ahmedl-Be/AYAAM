import { CartManager } from "../../scripts/cartScripts/cartManager.js";
import { navigate } from "../../scripts/utils/navigation.js";
import { localStore, sessionStore } from "../../scripts/utils/storage.js";
import Component from "../core/component.js";


export default class CheckOutForm extends Component{
    template(){
        return `
            <form class="needs-validation" novalidate>
                <div class="row g-3">
                    <!--  ____________________ Name Inputs ____________________  -->
                    <div class="col-md-6">
                        <label class="form-label">First Name*</label>
                        <input type="text" class="form-control" placeholder="First name" id="fname" required>
                        <div class="invalid-feedback">Please enter your first name.</div>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Last Name*</label>
                        <input type="text" class="form-control" placeholder="Last name" id="lname" required>
                        <div class="invalid-feedback">Please enter your last name.</div>
                    </div>

                    <!-- ____________________ Email ____________________ -->
                    <div class="col-md-6">
                        <label class="form-label">Email*</label>
                        <input type="email" class="form-control" placeholder="you@example.com" id="email" required>
                        <div class="invalid-feedback">Please enter a valid email.</div>
                    </div>

                    <!-- ______________Phone_______________-->
                    <div class="col-md-6">
                        <label class="form-label">Phone Number*</label>
                        <div class="input-group">
                            <select class="form-select" style="max-width: 100px;">
                                <option selected>EGY</option>
                                <option>IND</option>
                                <option>USA</option>
                            </select>
                            <input type="text" class="form-control" placeholder="+20 1222365478" id="phone" required>
                            <div class="invalid-feedback">Please enter your phone number.</div>
                        </div>
                    </div>

                    <!-- ______________City_______________-->
                    <div class="col-md-4">
                        <label class="form-label">City*</label>
                        <input type="text" class="form-control" placeholder="City" id="city" required>
                        <div class="invalid-feedback">Please enter your city.</div>
                    </div>

                    <!-- ______________State_______________-->
                    <div class="col-md-4">
                        <label class="form-label">State*</label>
                        <input type="text" class="form-control" placeholder="State" id="state" required>
                        <div class="invalid-feedback">Please enter your state.</div>
                    </div>

                    <!-- ______________Zip Code_______________-->
                    <div class="col-md-4">
                        <label class="form-label">Zip Code*</label>
                        <input type="text" class="form-control" placeholder="Zip" id="zip-code" required>
                        <div class="invalid-feedback">Please enter your zip code.</div>
                    </div>

                    <!-- ______________Detailed Address_______________-->
                    <div class="col-12">
                        <label class="form-label">Label in Detail*</label>
                        <textarea class="form-control" rows="3" placeholder="Enter a your label in detail...." id="adrs-detail" required></textarea>
                        <div class="invalid-feedback">Please enter your address details.</div>
                    </div>

                    <!-- ______________Shipping Method_______________-->
                    <div class="col-12">
                        <label class="form-label">Shipping Method*</label>
                        <div class="row g-3">
                            <!-- __________ Cash ___________ -->
                            <div class="col-md-6">
                                <div class="card shadow-sm p-3 border rounded h-100">
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="pay-method" id="cash" value="cash" required>
                                        <label class="form-check-label w-100" for="cash">
                                            <i class="fa-solid fa-money-bill-1-wave"></i>
                                            Cash
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <!-- __________ Visa ___________ -->
                            <div class="col-md-6">
                                <div class="card shadow-sm p-3 border rounded h-100" id="visa-card">
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="pay-method" id="visa" value="visa" required>
                                        <label class="form-check-label w-100 d-flex justify-content-between align-items-center" for="visa">
                                            <div>
                                                <i class="fa-solid fa-credit-card"></i>
                                                Visa
                                            </div>
                                            <i class="fa-solid fa-chevron-down" id="arrow-down"></i>
                                            <i class="fa-solid fa-chevron-up " id="arrow-up"></i> 
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <!-- Collapse div -->
                            <div class="collapse mt-3" id="visa-info">
                                <div class="card card-body">
                                    <h5 class="mb-2">Visa Information</h5>
                                    <label class="form-label">Card Number*</label>
                                    <input type="text" class="form-control mb-3" id="card-num" placeholder="---- ---- ---- ----" required>
                                    <div class="invalid-feedback">Please enter a valid 16-digit card number.</div>

                                    <div class="row g-3">
                                        <div class="col-md-6">
                                            <label class="form-label">EXP.*</label>
                                            <input type="text"  class="form-control"id="exp-date" placeholder="MM/YYYY" required>
                                            <div class="invalid-feedback">Please enter expiration date of your card.</div>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">CVV*</label>
                                            <input type="text" class="form-control" id="cvv" placeholder="---" required maxlength="3" required>
                                            <div class="invalid-feedback">Please enter CVV.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button class='w-50 m-auto py-3 fw-bold border-0 rounded-pill bg-black text-white mt-3 checkoutBTN checkout-btn' id="submit-btn" type="submit">Confirm Payment</button>
                </div>
            </form>

        `
    }


    script() {
        const fnameEl = document.getElementById('fname');
        const lnameEl = document.getElementById('lname');
        const emailEl = document.getElementById('email');
        const phoneEl = document.getElementById('phone');
       
        //read user info from session storage
        const userData = sessionStore.read('currentUser');
        console.log(userData)

        // _____________________collaps Visa ________________________________

        const visaCollapse = new bootstrap.Collapse(document.getElementById('visa-info'), { toggle: false });
        const arrUp = document.getElementById('arrow-up');
        const arrDown = document.getElementById('arrow-down');
        const paysways = document.querySelectorAll('input[name="pay-method"]');

        arrUp.style.display = 'none';  
        arrDown.style.display = 'inline-block';

        let visaOpen = false ;

        paysways.forEach(payM =>{
            payM.addEventListener('click' , (e)=>{
                console.log(e.target.value);
                if (e.target.value === 'visa') {
                    visaCollapse.show();
                    visaOpen = true;

                    arrUp.style.display = 'inline-block';
                    arrDown.style.display = 'none';
                } else {
                    visaCollapse.hide();
                    visaOpen = false;

                    arrUp.style.display = 'none';
                    arrDown.style.display = 'inline-block';
                }
            });
        });

          if(userData && userData.name){
            const [fname , lname] = userData.name.split(" ");
            fnameEl.value = fname || " ";
            lnameEl.value = lname || " ";


            if(userData.email) emailEl.value = userData.email;
            if(userData.phone) phoneEl.value = userData.phone;


            document.querySelectorAll("#fname , #lname , #email  , #phone").forEach(input => {
                input.disabled = true ;
            });
        }


        //bootstrap Validation

        const cardNum = document.getElementById('card-num');
        const expDate = document.getElementById('exp-date');
        const cvv = document.getElementById('cvv');

        cardNum.addEventListener("input", function (e) {
            let value = e.target.value.replace(/\D/g, "");
            value = value.substring(0, 16); 

            let formatNumVal = value.match(/.{1,4}/g)?.join("-") || "";
            e.target.value = formatNumVal;

            if (value.length === 16) {
            cardNum.classList.remove("is-invalid");
            cardNum.classList.add("is-valid");
            } else {
            cardNum.classList.remove("is-valid");
            cardNum.classList.add("is-invalid");
            }
        });


        // Function to validate exp date
        function validateExpDate(exp) {
            if (!/^(0[1-9]|1[0-2])\/\d{4}$/.test(exp)) return false;

            const [month, year] = exp.split("/").map(Number);
            const today = new Date();
            const currentYear = today.getFullYear();
            const currentMonth = today.getMonth() + 1;

            return (year > currentYear) || (year === currentYear && month >= currentMonth);
        }

        // Expiration date live validation
        expDate.addEventListener("input", function (e) {
            let value = e.target.value.replace(/[^\d\/]/g, ""); 

            if (value.length === 2 && !value.includes("/")) {
                value = value + "/";
            }

            value = value.substring(0, 7); 
            e.target.value = value;

            if (validateExpDate(value)) {
                expDate.classList.remove("is-invalid");
                expDate.classList.add("is-valid");
            } else {
                expDate.classList.remove("is-valid");
                expDate.classList.add("is-invalid");
            }
        });

        //cvv check
        cvv.addEventListener("input", function (e) {
            let value = e.target.value.replace(/\D/g, "");
            value = value.substring(0, 3);
            e.target.value = value;

            if (value.length === 3) {
                cvv.classList.remove("is-invalid");
                cvv.classList.add("is-valid");
            } else {
                cvv.classList.remove("is-valid");
                cvv.classList.add("is-invalid");
            }
        });

        const forms = document.querySelectorAll('.needs-validation');

        Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
                const selectedPay = document.querySelector('input[name="pay-method"]:checked');

                // 1) ضبط required للبطاقة حسب وسيلة الدفع
                if (selectedPay && selectedPay.value === 'visa') {
                    cardNum.setAttribute("required", "true");
                    expDate.setAttribute("required", "true");
                    cvv.setAttribute("required", "true");
                } else {
                    cardNum.removeAttribute("required");
                    expDate.removeAttribute("required");
                    cvv.removeAttribute("required");
                }

                // 2) بعد ضبط required نعمل checkValidity
                let isValid = form.checkValidity();

                const city = document.getElementById('city').value;
                const state = document.getElementById('state').value;
                const zipcode = document.getElementById('zip-code').value;

                // 3) Validation إضافي لو الدفع Visa
                if (selectedPay && selectedPay.value === 'visa') {
                    let value = cardNum.value.replace(/\D/g, "");
                    let cvvValue = cvv.value.replace(/\D/g, "");
                    let expValid = validateExpDate(expDate.value);

                    if (value.length !== 16 || !expValid || cvvValue.length !== 3) {
                        isValid = false;

                        // card number
                        if (value.length !== 16) {
                            cardNum.classList.add("is-invalid");
                        } else {
                            cardNum.classList.remove("is-invalid");
                        }

                        // exp date
                        if (!expValid) {
                            expDate.classList.add("is-invalid");
                        } else {
                            expDate.classList.remove("is-invalid");
                        }

                        // cvv
                        if (cvvValue.length !== 3) {
                            cvv.classList.add("is-invalid");
                        } else {
                            cvv.classList.remove("is-invalid");
                        }
                    }
                } else {
                    // لو مش فيزا نمسح أي validation قديم
                    cardNum.classList.remove("is-valid", "is-invalid");
                    expDate.classList.remove("is-valid", "is-invalid");
                    cvv.classList.remove("is-valid", "is-invalid");
                }

                // 4) التعامل مع النتيجة
                if (!isValid) {
                    event.preventDefault();
                    event.stopPropagation();
                    form.classList.add('was-validated');
                } else {
                    event.preventDefault();

                    const formData = {
                        Name: userData.name,
                        email: userData.email,
                        phone: userData.phone,
                        city: city,
                        state: state,
                        zipCode: zipcode,
                        payMethod: selectedPay ? selectedPay.value : "",
                        cardNumber: selectedPay && selectedPay.value === 'visa' ? cardNum.value : "",
                        expDate: selectedPay && selectedPay.value === 'visa' ? expDate.value : "",
                        cvv: selectedPay && selectedPay.value === 'visa' ? cvv.value : "",
                    };

                    console.log("Form Data:", formData);

                    // Reset مخصص: نمسح كل حاجة ماعدا disabled
                    form.querySelectorAll("input, textarea").forEach(el => {
                        if (!el.disabled) {
                            if (el.type === "checkbox" || el.type === "radio") {
                                el.checked = false;
                            } else {
                                el.value = "";
                            }
                        }
                    });

                    // نمسح أي validation classes
                    form.classList.remove('was-validated');
                    form.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
                        el.classList.remove('is-valid', 'is-invalid');
                    });


                    const cartManager = new CartManager();
                    const items = cartManager.getCartItem();
                    
                    const orderLocal = localStore.read("orders") || [];
                    items.forEach(item => {
                                    
                        const order = {
                                        order_id: Date.now() + "-" + item.id,
                                        user_id : userData.id ,
                                        user_name : userData.name ,
                                        user_email : userData.email ,
                                        product_name : item.name ,
                                        qty : item.qty ,
                                        price :item.price , 
                                        size : item.size ,
                                        category : item.category ,
                                        img:item.img ,
                        }
                        
                        orderLocal.push(order);
                    });
                    localStore.write("orders" , orderLocal);
                    sessionStore.write("ShopingCart" , [])
                    console.log(orderLocal);
                    navigate('/home');
                    console.log("all is Done")
                }
            }, false);
        });

    }
}