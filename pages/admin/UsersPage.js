
import View from "../../components/core/view.js";
import { renderEmptyState, renderUserForm, renderUsers, renderUsersTable, UserEvents } from "../../components/dashboard/admin-users.js";
import { localStore } from "../../scripts/utils/storage.js";


export default class UsersPage extends View {
    template() {
        const element = document.createElement("div")
        element.setAttribute("id", "user")
        const fun =renderUsers(element)
        return  fun.outerHTML;    }

    script() {
        let user = document.getElementById("user")
        UserEvents(user);
        
    }

}