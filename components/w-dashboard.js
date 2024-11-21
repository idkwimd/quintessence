import { ComponentBase } from './shared.js'


customElements.define('w-dashboard', class extends ComponentBase
{
    constructor()
    {
        super(
            /*html*/`
                <div root>
                    HEllo
                </div>
            `,
            /*css*/`

            `
        )
    }
})