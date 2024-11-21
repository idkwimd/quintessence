customElements.define('run-code', class extends HTMLElement
{
    constructor()
    {
        super()

        this.attachShadow({ mode: 'open' }).innerHTML = /*html*/`
            <button>&#9654;&#160;&#160;Run</button>
            <style>
                button {
                    text-decoration: none !important;
                    display: inline-block;
                    padding: .375rem .875rem;
                    border-radius: .25rem;
                    background: var(--theme-color);
                    color: #fff !important;
                    font-size: .875rem;
                    outline: none;
                    border: 0;
                    font-family: inherit;
                    line-height: 1rem;
                    cursor: pointer;
                }
            </style>
        `

        this.addEventListener('click', event =>
        {
            const href = this.getAttribute('href')

            if (href)
            {
                window.open(href, '_blank').focus()
            }
        })
    }

})