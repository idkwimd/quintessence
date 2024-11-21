export class ComponentBase extends HTMLElement
{
    constructor(html, css)
    {
        super()

        this.attachShadow({ mode: 'open' }).innerHTML = /*html*/`
            ${html}
            <style type="text/css">
                [root] {
                    font-family: var(--qs-font-family, 'sans-serif');
                }
                ${css}
            </style>
        `
    }
}