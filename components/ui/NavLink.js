/* _title : text that link shows on page
*  _route : path to specific page 
*  _classes: optional userdefined or bootstrap classes
*/ 
export default function NavLink(_title, _route, _classes = '') {
    return `
    <li class="nav-item">
                <button class="${_classes} nav-link router" href="#/${_route.toLowerCase()}">
                  ${_title.toUpperCase()}
                </button>
    </li>
    `
}