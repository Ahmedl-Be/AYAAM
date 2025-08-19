import SignupForm from "../components/forms/SignUpForm.js";
import HalfImage from "../components/layout/HalfImage.js";
import SideToSide from "../components/layout/SidetoSide.js";

export default function SignupPage() {
    return `
    ${SideToSide(HalfImage(),SignupForm(),'hideLeft')}
    `;
}