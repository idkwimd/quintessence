import { ComponentBase } from './shared.js'

customElements.define('w-button', class extends ComponentBase
{
    constructor()
    {
        super(
            /*html*/`
                <button root>
                    <slot></slot>
                </button>
            `,
            /*css*/`
                :host {
                    border-radius: .375rem;
                }
                [root] {
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
                    line-height: 1.25rem;
                    cursor: pointer;
                    font-weight: 500;
                }
                [root]:active {
                    transform: scale(.95);
                }
            `
        )
    }
})