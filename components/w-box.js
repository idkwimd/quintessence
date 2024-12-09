import { ComponentBase } from './shared.js'

customElements.define('w-box', class extends ComponentBase
{
    constructor()
    {
        super(
            /*html*/`
                <div root class="no-header">
                    <slot name="header" display="flex"></slot>
                    <div class="body">
                        <slot></slot>
                    </div>
                </div>
            `,
            /*css*/`
                :host {
                    --border-radius: .75rem;
                    --background: 255 255 255;

                    border-radius: var(--border-radius);
                }
                [root] {
                    border-radius: var(--border-radius);
                    background: rgb(var(--background));
                    padding: 1.5rem;
                }
                slot[name="header"] {
                    display: none;
                    align-items: center;
                    margin-bottom: 1rem;
                    font-weight: 700;
                }
                .body {
                    font-size: .875rem;
                }
            `
        )
    }
})