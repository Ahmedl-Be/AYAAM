/* _title : text that link shows on page
*  _route : path to specific page 
*  _classes: optional userdefined or bootstrap classes
*/ 
export function Navlink(_title, _route, _classes = '') {
    return `
      <li class="nav-item">
        <a class="${_classes} nav-link" href="/${_route}" data-route>${_title}</a>
      </li>
    `
}

export function Anchor(_title, _route, _classes = '') {
    return `
        <a class="${_classes} nav-link" href="/${_route}" data-route>${_title}</a>
    `
}

