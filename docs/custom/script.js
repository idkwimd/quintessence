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
                    padding: .5rem 1rem;
                    border-radius: .25rem;
                    background: var(--theme-color);
                    color: #fff !important;
                    font-size: .92rem;
                    outline: none;
                    border: 0;
                    font-family: inherit;
                }
            </style>
        `
    }



})