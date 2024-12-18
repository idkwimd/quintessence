export class ComponentBase extends HTMLElement
{
    constructor(html, css)
    {
        super()
        
        if (!this.ownerDocument.qsInitGlobalCSS)
        {
            const cssEl = document.createElement('style')
            
            cssEl.setAttribute('type', 'text/css')

            cssEl.textContent = /*css*/`
                @import url('https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.5.0/remixicon.min.css');
                @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Lexend+Deca:wght@100..900&family=Outfit:wght@100..900&display=swap');

                :root {
                    --qs-color-base: 240 242 243;
                    --qs-color-base-text: 21 21 21;
                    --qs-color-base-border: 221 223 223;
                    --qs-color-base-l1: 255 255 255;
                    --qs-color-base-l2: 255 255 255;
                    --qs-color-primary: 38 109 240;
                    --qs-color-primary-text: 255 255 255;
                    --qs-font-family: Inter, sans-serif;
                    --qs-shadow-lg: 0 0 0 0px rgb(240 242 243), 0 10px 18px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
                }
                body {
                    margin: 0;
                    font-family: var(--qs-font-family);
                    box-sizing: border-box;
                }
                body * {
                    box-sizing: inherit;
                }
                .shadow-lg {
                    box-shadow: var(--qs-shadow-lg);
                }
            `
            
            this.ownerDocument.head.appendChild(cssEl)
            this.ownerDocument.qsInitGlobalCSS = true
        }

        this.attachShadow({ mode: 'open' }).innerHTML = /*html*/`
            ${html}
            <style type="text/css">
                @import url('https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.5.0/remixicon.min.css');

                :host {
                    display: initial;
                }
                :host([block]) {
                    display: block;
                }
                [root],
                [ref="root"] {
                    font-family: var(--qs-font-family, 'sans-serif');
                    font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11';
                    box-sizing: border-box;
                    line-height: 1.25;
                }
                [root] *,
                [ref="root"] * {
                    box-sizing: inherit;
                }
                ${css}
            </style>
        `
        
        this.#registerRefService()
        this.#registerSlotVisibilityService()
    }

    /**
     * Automatic slot visibility. This will hide slot if no content is provided.
     * Setting `display="<string>"` attribute to `<slot>` will activate this feature
     */
    #registerSlotVisibilityService()
    {
        for (const slot of this.shadowRoot.querySelectorAll('slot[name][display]'))
        {
            slot.style.display ||= 'none'
            
            slot.addEventListener('slotchange', (ev) =>
            {
                slot.style.display = ev.target.assignedNodes().length > 0
                    ? slot.getAttribute('display') || 'initial'
                    : 'none'
            })
        }
    }

    /**
     * Fills `this.ref`
     */
    #registerRefService ()
    {
        this.ref = {}

        for (const el of this.shadowRoot.querySelectorAll('[ref]'))
        {
            const name = el.getAttribute('ref')

            if (name)
            {
                this.ref[name] = el
            }
        }
    }
}