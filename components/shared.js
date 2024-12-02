export class ComponentBase extends HTMLElement
{
    constructor(html, css)
    {
        super()

        const remixicon = this.ownerDocument.head.querySelector('link[href*="remixicon.css"]') ||
                          this.ownerDocument.head.querySelector('link[href*="remixicon.min.css"]')

        this.attachShadow({ mode: 'open' }).innerHTML = /*html*/`
            ${html}
            <style type="text/css">
                @import url('${remixicon.href}');

                [root] {
                    font-family: var(--qs-font-family, 'sans-serif');
                    box-sizing: border-box;
                }
                [root] * {
                    box-sizing: inherit;
                }
                ${css}
            </style>
        `
        
        this.#registerRefService()
        this.#registerSlotVisibilityService()
    }

    attributeChangedCallback(name, ov, nv)
    {
        for (const x of (this.migrateAttributes || this.constructor.migrateAttributes))
        {
            let [selector, ...attrs] = x

            if (typeof selector === 'string')
            {
                selector = this.shadowRoot.querySelector(selector)
            }

            if (!attrs.includes(name))
            {
                continue
            }

            selector.setAttribute(name, nv)
        }
    }

    /**
     * Automatic slot visibility. This will hide slot if no content is provided.
     * Setting `display="<string>"` attribute to `<slot>` will activate this feature
     */
    #registerSlotVisibilityService()
    {
        for (const slot of this.shadowRoot.querySelectorAll('slot[name][display]'))
        {
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