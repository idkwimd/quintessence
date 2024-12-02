import { ComponentBase } from './shared.js'

customElements.define('w-select', class extends ComponentBase
{
    constructor()
    {
        super(
            /*html*/`
                <div root>
                    <w-input></w-input>
                </div>
            `,
            /*css*/`
                [root] {
                    
                }
            `
        )
    }

    #ensureInit()
    {
        if (this.ownerDocument.querySelector('.w-select-dropdown'))
        {
            return
        }
        
        const el = this.ownerDocument.createElement('div')
              el.className = 'w-select-dropdown'

        this.ownerDocument.appendChild(el)
    }
})