import { ComponentBase } from './shared.js'

customElements.define('w-input', class extends ComponentBase
{
    /**
     * @type { ElementInternals }
     */
    #internals

    constructor()
    {
        super(
            /*html*/`
                <div root>
                    <slot name="before" display="inline-flex"></slot>
                    <input class="orig-input" ref="input" part="input" />
                    <slot name="after" display="inline-flex"></slot>
                </div>
            `,
            /*css*/`
                :host {
                    border-radius: .375rem;
                }
                [root] {
                    display: flex;
                    align-items: center;
                    height: 2.35rem;
                    padding-left: .75rem;
                    padding-right: .75rem;
                    border: 1px solid rgb(202 202 208);
                    border-radius: .375rem;
                    font-family: var(--qs-font-family, inherit);
                    background: rgb(var(--qs-color-base-l2, 255 255 255));
                    box-shadow: 0 1px 2px rgb(0 0 0 / .06);
                }
                [root]:focus-within {
                    border: 1px solid rgb(var(--qs-color-primary, 38 109 240));
                }
                .orig-input {
                    background: transparent;
                    border: 0;
                    outline: none;
                    height: 100%;
                    font-family: inherit;
                    font-size: .875rem;
                    font-weight: 500;
                    margin: 0;
                    flex: 1;
                    line-height: 1.12rem;
                    padding: 0;
                }
                slot[name="before"] {
                    margin-right: .625rem;
                    align-items: center;
                }
                slot[name="after"] {
                    margin-left: .625rem;
                    align-items: center;
                }
                [root]:focus-within slot[name="after"],
                [root]:focus-within slot[name="before"] {
                    color: rgb(var(--qs-color-primary));
                }
                :host([rounded]) [root] {
                    border-radius: 999px;
                    padding-left: .75rem;
                    padding-right: .75rem;
                }
            `
        )

        this.#internals = this.attachInternals()
    }

    connectedCallback ()
    {
        this.ref.input.addEventListener('change', (ev) =>
        {
            this.#internals.setFormValue(ev.target.value)
        })
    }

    attributeChangedCallback(name, ov, nv)
    {
        if (this.constructor.observedAttributes.includes(name))
        {
            this.ref.input.setAttribute(name, nv)
        }

        if (name === 'disabled')
        {
            this.#internals.setFormValue(null)
        }
    }

    /**
     * @param { string | number } data 
     */
    set value (data)
    {
        this.ref.input.value = data.toString()
    }

    /**
     * @returns { string | number }
     */
    get value ()
    {
        return this.ref.input.value
    }
    
    static formAssociated = true
    static observedAttributes = ['placeholder', 'type', 'min', 'max', 'step', 'disabled', 'readonly', 'autocomplete']
})