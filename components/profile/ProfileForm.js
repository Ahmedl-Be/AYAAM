import { sessionStore } from "../../scripts/utils/storage.js";
import View from "../core/view.js";
import Toast from "../ui/toast.js";




export default class ProfileForm extends View {
    

    template() {

        const userData = sessionStore.read("currentUser");

        return `
            <div class="card shadow-none px-4 py-3 ">
            
            <form id="profile-form" class="row g-3 needs-validation" novalidate>
                        <div class="text-center mb-4">
                            <div class="profile-avatar mb-1">
                                <img src="../assets/images/thumbnails/user_131490.png"/>
                            </div>
                            <h5 class="mb-0">${userData.name}</h5>
                            <button id="edit-btn" type="button" class="btn btn-primary m-auto mt-2">Change Your Information</button>
                            <button id="save-btn" type="submit" class="btn btn-success m-auto  mt-2">Save Changes</button>
                        </div>

                        <h6 class="mb-3">Personal Information</h6>
                        <div class="col-md-6">
                            <label class="form-label">Name</label>
                            <input type="text" class="form-control" id="name" placeholder="Name" value="${userData.name}" required  disabled >
                            <div class="invalid-feedback">
                                Please enter your name.
                            </div>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Date of Birth</label>
                            <input type="date" class="form-control" id="birth" value="${userData.birth && `${userData.birth}`}" required disabled >
                            <div class="invalid-feedback">
                                Please select your date of birth.
                            </div>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Gender</label>
                            <div>
                                <input type="radio" name="gender" id="male" value="male" required disabled checked> 
                                <label for='male'>Male</label>
                                <input type="radio" name="gender" class="ms-3" id="female" value="female" required disabled > 
                                <label for='female'>Female</label>
                                <div class="invalid-feedback ">
                                    Please select your gender.
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Phone Number</label>
                            <input type="text" class="form-control" id="phone" placeholder="Phone Number" value="${userData.phone}" required disabled  pattern="[0-9]{11}">
                            <div class="invalid-feedback">
                                Please enter a valid phone number (11 digits).
                            </div>
                        </div>

                        ${userData.address ? `
                            <div class="col-md-12">
                                <label class="form-label">Address</label>
                                <input type="text" class="form-control" id="adrs" placeholder="Address" value="${userData.address}"  disabled required">
                                <div class="invalid-feedback">
                                    Please enter your address.
                                </div>
                            </div>       
                        ` : " "}

                        <div class="col-md-12">
                            <label class="form-label">Email</label>
                            <input type="email" class="form-control" value="${userData.email}" id="email" placeholder="Email Address" disabled  required>
                            <div class="invalid-feedback">
                                Please enter a valid email.
                            </div>
                        </div>
                    </form>

                </div>
        `
    }

    script() {
        const userData = sessionStore.read("currentUser");

        const editBtn = document.getElementById('edit-btn');
        const saveBtn = document.getElementById('save-btn');
        const inputeArr = document.querySelectorAll(".card input");
        const form = document.querySelector('.needs-validation');

        saveBtn.style.display='none';

        editBtn.addEventListener('click' , ()=>{
            //show save changes button and hidden edit button
            editBtn.style.display = 'none';
            saveBtn.style.display='block';

            //active inputs
            inputeArr.forEach((input , i)=>{
                input.disabled = false;
                if (i === 0) {
                    input.focus(); 
                }
            });

        });

        saveBtn.addEventListener('click', (e) => {
            e.preventDefault();

            if (!form.checkValidity()) {
                form.classList.add('was-validated'); 
                return; 
            }

            const updatedUser = {
                name: document.getElementById('name').value.trim(),
                birth: document.getElementById('birth').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                email: document.getElementById('email').value.trim(),
                address : document.getElementById('adrs')?.value.trim(), 
                gender: document.querySelector('input[name="gender"]:checked').value
            };

            const newData = {...userData , ...updatedUser} ;
            
            console.log("new" , newData);

            sessionStore.write("currentUser" , newData)

            inputeArr.forEach((input , i)=>{
                input.disabled = true;
            })
            form.classList.remove('was-validated'); 
            editBtn.style.display = 'block';
            saveBtn.style.display = 'none';
            Toast.notify("Your Info is Updated" , "success");
        });
    }
    
}