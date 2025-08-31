export default function HalfImage(_imgurl, _title, _description) {
    return `
    <div class="position-relative h-100 overflow-hidden">
            <img
              src="${_imgurl}"
              class="w-100 h-100 object-fit-cover"
              alt="Signup background"
            />
            <div
              class="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center text-white"
             
            >
              ${_title? '<h1 class="display-4 mb-4">'+_title+'</h1>':''}
              ${_description?'<p class="lead text-center px-4">'+_description+'</p>':''}
            </div>
          </div>
    `;
}