import { navigate } from "../../scripts/router.js";
import Component from "../core/component.js";
import { Button } from "../ui/buttons.js";
import { Anchor } from "../ui/links.js";


export default function Advertisment({ img, title, text, btnText, btnLink, btnClass }, active = false) {
    return `
    <div class="carousel-item ${active ? "active" : ""}">
      ${Anchor(`<img src="${img}" class="d-block w-100" alt="${title}"></img>`,btnLink)}
      <div class="carousel-data ">
        <h1 class="">${title}</h1>
        <p class="">${text}</p>
        ${Anchor(btnText, btnLink, ("btn"))}
      </div>
    </div>
  `;
}