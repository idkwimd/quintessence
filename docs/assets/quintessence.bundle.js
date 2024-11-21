class ComponentBase extends HTMLElement
{
    constructor(html, css)
    {
        super();

        this.attachShadow({ mode: 'open' }).innerHTML = /*html*/`
            ${html}
            <style type="text/css">
                [root] {
                    font-family: var(--qs-font-family, 'sans-serif');
                }
                ${css}
            </style>
        `;
    }
}

customElements.define('w-dashboard', class extends ComponentBase
{
    constructor()
    {
        super(
            /*html*/`
                <div root>
                    <div class="nav-area">

                    </div>
                    <div class="menu-area">

                        <div class="menu">
                            <div class="logo">
                                LOGO
                            </div>
                            <div class="item">Home</div>
                            <div class="item active">Profile</div>
                        </div>

                    </div>
                    <div class="content-area"></div>
                </div>
            `,
            /*css*/`
                [root] {
                    height: 100vh;
                    width: 100%;
                    background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
                    display: grid;
                    box-sizing: border-box;
                    font-family: var(--qs-font-family, inherit);
                    grid-template: 
                        'menu nav'      50px
                        'menu content' 1fr / auto 1fr;
                }
                [root] * {
                    box-sizing: inherit;
                }
                [root] > .nav-area {
                    grid-area: nav;
                }
                [root] > .menu-area {
                    grid-area: menu;
                    padding: 1rem;
                }
                [root] > .content-area {
                    grid-area: content;
                    background: rgb(255 255 255 / .35);
                    border-top-left-radius: 1.25rem;
                }

                .menu {
                    min-width: 250px;
                    background: white;
                    border-radius: 1.25rem;
                    height: 100%;
                    padding: 1.25rem;
                }
                .menu > .logo {
                    margin-bottom: 1.25rem;
                    margin-top: .875rem;
                    text-align: center;
                }
                .menu > .item {
                    padding: .5rem 1rem;
                    border-radius: 999px;
                    margin-bottom: .25rem;
                }
                .menu > .item.active {
                    background: black;
                    color: white;
                    box-shadow: 0 5px 10px rgb(0 0 0 / .2);
                }
            `
        );
    }
});
