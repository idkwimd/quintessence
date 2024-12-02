import { ComponentBase } from './shared.js'

customElements.define('w-input', class extends ComponentBase
{
    constructor()
    {
        super(
            /*html*/`
                <div root>
                    <slot name="before" display="inline-flex"></slot>
                    <input class="orig-input" ref="input" />
                    <slot name="after" display="inline-flex"></slot>
                </div>
            `,
            /*css*/`
                [root] {
                    display: flex;
                    align-items: center;
                    height: 2.25rem;
                    padding-left: .75rem;
                    padding-right: .75rem;
                    border: 1px solid rgb(202 202 208);
                    border-radius: 999px;
                    font-family: var(--qs-font-family, inherit);
                    background: rgb(var(--qs-color-base-l2, 255 255 255));
                }
                [root]:focus-within {
                    border: 1px solid rgb(var(--qs-color-primary, 38 109 240));
                    box-shadow: 0 0 0 3px rgb(var(--qs-color-primary, 38 109 240) / .25);
                }
                .orig-input {
                    background: transparent;
                    border: 0;
                    outline: none;
                    height: 100%;
                    font-family: inherit;
                    font-size: .875rem;
                }
                slot[name="before"] {
                    margin-right: .5rem;
                    align-items: center;
                }
                slot[name="after"] {
                    margin-left: .5rem;
                    align-items: center;
                }
                [root]:focus-within slot[name="after"],
                [root]:focus-within slot[name="before"] {
                    color: rgb(var(--qs-color-primary, 38 109 240));
                }
            `
        )
    }

    get migrateAttributes ()
    {
        return [
            [this.ref.input, 'placeholder', 'type', 'min', 'max', 'step', 'disabled', 'readonly']
        ]
    }
    
    static observedAttributes = ['placeholder', 'type', 'min', 'max', 'step', 'disabled', 'readonly']
})