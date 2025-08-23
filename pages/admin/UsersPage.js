import View from "../../components/core/view.js";
import { localStore } from "../../scripts/utils/storage.js";

export default class UsersPage extends View {
  template() {
    const users = localStore.read("users", []);
    return `
      <section>
        <h2>Users</h2>
        <button id="addUser">+ Add User</button>
        <ul>
          ${users.map((user, i) => `
            <li>
              ${u.name} (${user.email})
              <button data-index="${i}" class="deleteUser">Delete</button>
            </li>
          `).join("")}
        </ul>
      </section>
    `;
  }

  script() {
    document.getElementById("addUser").onclick = () => {
      const users = localStore.read("users", []);
      const name = prompt("Name?");
      const email = prompt("Email?");
      if (!name || !email) return;

      users.push({ name, email });
      localStore.write("users", users);
      this.render(); // rerender subview
    };

    document.querySelectorAll(".deleteUser").forEach(btn => {
      btn.onclick = () => {
        const idx = btn.dataset.index;
        const users = localStore.read("users", []);
        users.splice(idx, 1);
        localStore.write("users", users);
        this.render(); // rerender subview
      };
    });
  }
}