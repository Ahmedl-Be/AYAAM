export default function NotificationBadge(_hasNotifications= false) {
    return `
    <button type="button" class="notification-button " style="--notify: ${_hasNotifications}">
                            <i class="fa-solid fa-bell"></i>
                        </button>
    `
}