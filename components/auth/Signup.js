
// export default function SignupForm() {
//     return `
//     <div class="w-100" style="max-width: 400px">
//             <div class="text-center mb-5">
//               <h2>Create Account</h2>
//               <p class="text-muted">Fill in your details to get started</p>
//             </div>

//             <form id="signupForm" class="needs-validation" novalidate>
//               <!-- Name Field -->
//               <div class="mb-3">
//                 <label for="name" class="form-label">Full Name</label>
//                 <input type="text" class="form-control" id="name" required />
//                 <div id="nameError" class="invalid-feedback">
//                   Please enter your full name.
//                 </div>
//               </div>

//               <!-- Email Field -->
//               <div class="mb-3">
//                 <label for="email" class="form-label">Email Address</label>
//                 <input type="email" class="form-control" id="email" required />
//                 <div id="emailError" class="invalid-feedback">
//                   Please enter a valid email.
//                 </div>
//               </div>

//               <!-- Password Field -->
//               <div class="mb-3">
//                 <label for="password" class="form-label">Password</label>
//                 <input
//                   type="password"
//                   class="form-control"
//                   id="password"
//                   required
//                 />
//                 <div id="passwordError" class="invalid-feedback">
//                   Password must be at least 8 characters.
//                 </div>
//               </div>

//               <!-- Repeat Password Field -->
//               <div class="mb-3">
//                 <label for="repeatedPassword" class="form-label"
//                   >Repeat Password</label
//                 >
//                 <input
//                   type="password"
//                   class="form-control"
//                   id="repeatedPassword"
//                   required
//                 />
//                 <div id="repeatPasswordError" class="invalid-feedback">
//                   Passwords must match.
//                 </div>
//                 <div id="passwordMatchMessage" class="mt-1 small"></div>
//               </div>

//               <!-- Terms Checkbox -->
//               <div class="mb-4 form-check">
//                 <input
//                   type="checkbox"
//                   class="form-check-input"
//                   id="terms"
//                   required
//                 />
//                 <label class="form-check-label" for="terms"
//                   >I agree to the
//                   <a
//                     href="#"
//                     data-bs-toggle="modal"
//                     data-bs-target="#termsModal"
//                     >Terms & Conditions</a
//                   ></label
//                 >
//                 <div id="termsError" class="invalid-feedback d-block">
//                   You must accept the terms.
//                 </div>
//               </div>

//               <!-- Submit Button -->
//               <button type="submit" class="btn btn-primary w-100 py-2">
//                 Sign Up
//               </button>

//               <div class="text-center mt-3">
//                 <p class="text-muted">
//                   Already have an account? <a href="#">Log in</a>
//                 </p>
//               </div>
//             </form>
//           </div>
//     `
// }