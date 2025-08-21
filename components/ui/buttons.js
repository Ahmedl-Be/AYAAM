export function Button(_content, _id= '', _classes = '', _other) {
    return `
        <button class="${_classes} nav-link" id="${_id}" ${_other}>${_content}</button>
    `
}