export function Icon(_name, _type, _classList="",_hasNotifications= false) {
    return `
    <div class="${_classList} icon" style="--notify: ${_hasNotifications}">
        <i class="fa-${_type} fa-${_name} fa-fw"></i>
    </div>
    `
}