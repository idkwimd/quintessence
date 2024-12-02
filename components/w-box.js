import { ComponentBase } from './shared.js'

customElements.define('w-box', class extends ComponentBase
{
    #header
    #headerSlot
    #root

    constructor()
    {
        super(
            /*html*/`
                <div root class="no-header">
                    <div class="header">
                        <slot name="header" class="header-slot"></slot>
                        <div class="header-pad"></div>
                    </div>
                    <div class="body">
                        <slot></slot>
                    </div>
                </div>
            `,
            /*css*/`
                :host {
                    --border-radius: var(--qs-box-border, .75rem);
                    --theme: 213 216 220; /*201 211 216;*/
                    --theme-text: 33 33 33;
                    --header-height: 2.5rem;
                    --background: 255 255 255;
                }
                [root] {
                    box-shadow: 0 0 0 0px rgb(var(--theme)),
                                0 10px 18px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
                    border-radius: var(--border-radius);
                    background: rgb(var(--theme));
                }
                .header {
                    display: none;
                    align-items: center;
                    padding-left: 1rem;
                    height: var(--header-height);
                    border-radius: var(--border-radius) var(--border-radius) 0 0;
                }
                .header-slot {
                    display: block;
                    position: relative;
                    z-index: 1;
                    text-shadow: 0 1px 2px rgb(0 0 0 / .2);
                    color: rgb(var(--theme-text));
                    font-size: .875rem;
                    font-weight: 500;
                }
                .header-pad {
                    height: 100%;
                    flex: 1;
                    background: rgb(var(--background));
                    margin-left: 1rem;
                    border-top-left-radius: var(--border-radius);
                    border-top-right-radius: var(--border-radius);
                    position: relative;
                }
                .header-pad::before {
                    content: '';
                    position: absolute;
                    left: calc(var(--header-height) * -1);
                    bottom: 0;
                    height: var(--header-height);
                    width: var(--header-height);
                    background: white;
                }
                .header-pad::after {
                    content: '';
                    position: absolute;
                    left: calc(var(--header-height) * -1);
                    bottom: 0;
                    height: var(--header-height);
                    width: var(--header-height);
                    border-radius: 0 0 var(--border-radius) 0;
                    background: rgb(var(--theme));
                }
                .body {
                    padding: 1.25rem;
                    border-radius: var(--border-radius) 0 var(--border-radius) var(--border-radius);
                    background: rgb(var(--background));
                    font-size: .875rem;
                }
                [root].no-header .body {
                    border-radius: var(--border-radius);
                }
            `
        )

        this.#root = this.shadowRoot.querySelector('[root]')
        this.#header = this.shadowRoot.querySelector('.header')
        this.#headerSlot = this.#header.querySelector('slot[name="header"]')

        this.#headerSlot.addEventListener('slotchange', (ev) =>
        {
            if (ev.target.assignedNodes().length > 0)
            {
                this.#header.style.display = 'flex'
                this.#root.classList.remove('no-header')
            }
            else
            {
                this.#header.style.display = 'none'
                this.#root.classList.add('no-header') 
            }
        })
    }
})