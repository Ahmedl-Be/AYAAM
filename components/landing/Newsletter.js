import { formatEmail } from "../../scripts/utils/data.js";
import { localStore } from "../../scripts/utils/storage.js";
import Component from "../core/component.js";
import Toast from "../ui/toast.js";


export default class Newsletter extends Component {
    template() {
        return `
            <section section class="bg-light py-5 mb-5" >
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-6 text-center">
                        <h3>Subscribe to Our Newsletter</h3>
                        <p class="text-muted">Get updates on new arrivals, special offers and more</p>
                        <form class="mt-4" id="newsForm">
                            <div class="input-group mb-3">
                                <input type="email" class="form-control" placeholder="Your email address" id="newsIn">
                                    <button class="btn btn-primary" type="submit" id='newsbtn'>Subscribe</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    </section >  `
    }

    script() {
        let emailEl = document.querySelector('#newsIn');
        document.querySelector('#newsForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const email = formatEmail(emailEl.value);
            const newsletterSubs = localStore.read('newsletterSubs', []);
            if (newsletterSubs.some(e => e === email)) {
                Toast.notify('Already Registered to News Letter.','warning')
            } else {
                localStore.update(
                    'newsletterSubs',
                    (newsletterSubs) =>
                        newsletterSubs.includes(email)
                            ? newsletterSubs
                            : [...newsletterSubs, email],
                    []
                );
                Toast.notify('Registered to news letter.','success')
            }
        })

    }
}