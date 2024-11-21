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
                [root] {
                    height: 100vh;
                    width: 100%;
                    background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                }
            `
        )
    }
})