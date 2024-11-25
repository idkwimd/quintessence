export class ComponentBase extends HTMLElement
{
    constructor(html, css)
    {
        super()

        const remixicon = this.ownerDocument.head.querySelector('link[href$="remixicon.css"]') ||
                          this.ownerDocument.head.querySelector('link[href$="remixicon.min.css"]')

        this.attachShadow({ mode: 'open' }).innerHTML = /*html*/`
            ${html}
            <style type="text/css">
                @import url('${remixicon.href}');

                [root] {
                    font-family: var(--qs-font-family, 'sans-serif');
                }
                ${css}
            </style>
        `
    }
}