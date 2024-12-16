import { ComponentBase } from './shared.js'

customElements.define('w-button', class extends ComponentBase
{
    constructor()
    {
        super(
            /*html*/`
                <button ref="root">
                    <slot></slot>
                </button>
            `,
            /*css*/`
                :host {
                    border-radius: .375rem;
                }
                :host([disabled]) [ref="root"] {
                    opacity: .75;
                    pointer-events: none;
                }
                [ref="root"] {
                    height: 2.35rem;
                    padding-left: .875rem;
                    padding-right: .875rem;
                    display: inline-flex;
                    align-items: center;
                    background: rgb(var(--qs-color-primary));
                    color: rgb(var(--qs-color-primary-text));
                    border-radius: .375rem;
                    border: 0;
                    outline: none;
                    font-size: .875rem;
                    font-weight: 500;
                    cursor: pointer;
                }
                [ref="root"]:active {
                    transform: scale(.95);
                }
            `
        )

        this.ref.root.addEventListener('click', this.#onClick.bind(this))
    }

    #onClick(ev)
    {
        if (this.getAttribute('type') === 'submit')
        {
            this.dispatchEvent(new CustomEvent('asyncsubmit', {
                composed: true,
                bubbles: true
            }))
        }
    }
})