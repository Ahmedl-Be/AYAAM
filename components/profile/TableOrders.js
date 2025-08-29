import { localStore, sessionStore } from "../../scripts/utils/storage.js";
import View from "../core/view.js";


const currentUserData = sessionStore.read("currentUser"); 
const orders = localStore.read("orders");

const userOrders = orders.filter(order => order.userId === currentUserData.id);
console.log(userOrders);

export default class TableOrders extends View {
    template() {
        return `
            <div class="accordion card shadow-none" id="ordersAccordion">
                <tale class=""table>
                ${orders.map((order, i) => `
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="heading-${i}">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${i}" aria-expanded="false" aria-controls="collapse-${i}">
                                Order ${i + 1} - ${order.orderDate} - ${order.orderItems.some(item => item.state === 'pending') ? 'Pending' : 'Completed'}
                            </button>
                        </h2>
                        <div id="collapse-${i}" class="accordion-collapse collapse" aria-labelledby="heading-${i}" data-bs-parent="#ordersAccordion">
                            <div class="accordion-body p-0">
                                <table class="table table-sm table-borderless mb-0 text-center">
                                    <tr class="bg-light">
                                        <th>Product</th>
                                        <th>Name</th>
                                        <th>Color</th>
                                        <th>Category</th>
                                        <th>Size</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>State</th>
                                    </tr>
                                    ${order.orderItems.map(item => `
                                        <tr>
                                            <td><img class="img-order" src="${item.img}" style="width:50px;"/></td>
                                            <td>${item.productName}</td>
                                            <td>${item.color}</td>
                                            <td>${item.category}</td>
                                            <td>${item.size || "No Size"}</td>
                                            <td>${item.qty}</td>
                                            <td>$${item.price}</td>
                                            <td>
                                                ${item.state === 'pending' ? 
                                                    `<i class="fa-solid fa-circle" style="color: #FFD43B;"></i> Pending` :
                                                    `<i class="fa-solid fa-circle" style="color: #0cf708;"></i> Completed`
                                                }
                                            </td>
                                        </tr>
                                    `).join('')}
                                </table>
                            </div>
                        </div>
                    </div>
                `).join('')}
                
                </tale>
            </div>

        `
    }

    script() {
        
    }
    
}