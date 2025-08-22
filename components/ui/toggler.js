import { Button } from "./buttons.js";
import { Icon } from "./icons.js";

export function Toggler(_targetId, _extraClass = "") {
    return Button(
        Icon("bars", "solid", "fa-lg"),
        "ico-bars",
        `navbar-toggler d-md-none border-0 p-0 ${_extraClass}`,
        `type="button" data-bs-toggle="offcanvas" data-bs-target="#${_targetId}"`
    );
}