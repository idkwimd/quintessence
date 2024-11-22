import { ComponentBase } from './shared.js'


customElements.define('w-dashboard', class extends ComponentBase
{
    #selectedItem
    #root
    #indicator
    #menu
    #contentArea

    constructor()
    {
        super(
            /*html*/`
                <div root>
                    <div class="main">
                        <div class="nav-area"></div>
                        <div class="menu-area">
                            <div class="menu-indicator"></div>
                            <div class="menu-background"></div>
                            <div class="menu" top>
                                <div class="logo">
                                    LOGO
                                </div>
                                <div class="item">
                                    <div class="text">Home</div>
                                </div>
                                <div class="item">
                                    <div class="text">Profile</div>
                                    <div class="menu">
                                        <div class="item">
                                            <div class="text">Sub Profile 2</div>
                                        </div>
                                        <div class="item">
                                            <div class="text">Sub Profile 3</div>
                                        </div>
                                        <div class="item">
                                            <div class="text">Sub Profile 2</div>
                                        </div>
                                        <div class="item">
                                            <div class="text">Sub Profile 3</div>
                                        </div>
                                        <div class="item">
                                            <div class="text">Sub Profile 2</div>
                                        </div>
                                        <div class="item">
                                            <div class="text">Sub Profile 3</div>
                                        </div>
                                        <div class="item">
                                            <div class="text">Sub Profile 2</div>
                                        </div>
                                        <div class="item">
                                            <div class="text">Sub Profile 3</div>
                                        </div>
                                        <div class="item">
                                            <div class="text">Sub Profile 2</div>
                                        </div>
                                        <div class="item">
                                            <div class="text">Sub Profile 3</div>
                                        </div>
                                        <div class="item">
                                            <div class="text">Sub Profile 2</div>
                                        </div>
                                        <div class="item">
                                            <div class="text">Sub Profile 3</div>
                                        </div>
                                        <div class="item">
                                            <div class="text">Sub Profile 2</div>
                                        </div>
                                        <div class="item">
                                            <div class="text">Sub Profile 3</div>
                                        </div>
                                        <div class="item">
                                            <div class="text">Sub Profile 2</div>
                                        </div>
                                        <div class="item">
                                            <div class="text">Sub Profile 3</div>
                                        </div>
                                        <div class="item">
                                            <div class="text">Sub Profile 2</div>
                                        </div>
                                        <div class="item">
                                            <div class="text">Sub Profile 3</div>
                                        </div>
                                        <div class="item">
                                            <div class="text">Sub Profile 2</div>
                                        </div>
                                        <div class="item">
                                            <div class="text">Sub Profile 3</div>
                                        </div>
                                        <div class="item">
                                            <div class="text">Sub Profile 2</div>
                                        </div>
                                        <div class="item">
                                            <div class="text">Sub Profile 3</div>
                                        </div>
                                        <div class="item">
                                            <div class="text">Sub Profile 2</div>
                                        </div>
                                        <div class="item">
                                            <div class="text">Sub Profile 3</div>
                                        </div>
                                        <div class="item">
                                            <div class="text">Sub Profile 2</div>
                                        </div>
                                        <div class="item">
                                            <div class="text">Sub Profile 3</div>
                                        </div>
                                        <div class="item">
                                            <div class="text">Sub Profile 2</div>
                                        </div>
                                        <div class="item">
                                            <div class="text">Sub Profile 3</div>
                                        </div>
                                        <div class="item">
                                            <div class="text">Sub Profile 2</div>
                                        </div>
                                        <div class="item">
                                            <div class="text">Sub Profile 3</div>
                                        </div>
                                        <div class="item">
                                            <div class="text">Sub Profile 2</div>
                                        </div>
                                        <div class="item">
                                            <div class="text">Sub Profile 3</div>
                                        </div>
                                        <div class="item">
                                            <div class="text">Sub Profile 2</div>
                                        </div>
                                        <div class="item">
                                            <div class="text">Sub Profile 3</div>
                                        </div>
                                        <div class="item">
                                            <div class="text">Sub Profile 2</div>
                                        </div>
                                        <div class="item">
                                            <div class="text">Sub Profile 3</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="content-area"></div>
                    </div>
                </div>
            `,
            /*css*/`

                [root] {
                    height: 100vh;
                    width: 100%;
                    background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
                    box-sizing: border-box;
                    padding: 2rem;
                    font-family: var(--qs-font-family, inherit);
                }
                [root] * {
                    box-sizing: inherit;
                }
                .main {
                    border-radius: 1.5rem;
                    background: rgb(255 255 255 / .35);
                    display: grid;
                    height: 100%;
                    grid-template: 
                        'menu nav'      50px
                        'menu content' 1fr / auto 1fr;
                }
                .main > .nav-area {
                    grid-area: nav;
                }
                .main > .menu-area {
                    grid-area: menu;
                    position: relative;
                }
                .main > .content-area {
                    grid-area: content;
                    border-bottom-right-radius: 1.5rem;
                }
                .menu[top] {
                    position: relative;
                    width: calc(280px + 3px);
                    height: 100%;
                    padding-right: 1.5rem;
                    overflow-y: auto;
                    overflow-x: hidden;
                    margin-left: -3px;
                }
                .menu[top] > .logo {
                    padding-top: 2.5rem;
                    padding-bottom: 1.5rem;
                    text-align: center;
                    top: 0;
                    position: sticky;
                    background: white;
                    margin-left: 3px;
                    border-top-left-radius: 1.5rem;
                    z-index: 1;
                }
                .menu > .item {
                    cursor: pointer;
                    padding-left: 1rem;
                    width: 100%;
                    position: relative;
                }
                .menu > .item > .text {
                    padding: .5rem 0 .5rem 1rem;
                    pointer-events: none;
                    display: flex;
                    align-items: center;
                    margin-bottom: .25rem;
                    font-weight: 500;
                    color: #666666;
                }
                .menu > .item.active > .text {
                    color: #000000;
                }
                .menu > .item:has(.menu) > .text::after {
                    content: '';
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'%3E%3Cpath d='M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z'%3E%3C/path%3E%3C/svg%3E");
                    width: 24px;
                    height: 24px;
                    display: inline-block;
                    margin-left: auto;
                }
                .menu > .item.collapsed:has(.menu) > .text::after {
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'%3E%3Cpath d='M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z'%3E%3C/path%3E%3C/svg%3E");
                }
                .menu > .item.collapsed > .menu {
                    display: none;
                }
                .menu-indicator {
                    position: absolute;
                    width: 6px;
                    height: auto;
                    border-radius: 6px;
                    background: black;
                }
                .menu-background {
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    top: 0;
                    background: white;
                    border-radius: 1.5rem 0 0 1.5rem;
                }
            `
        )

        this.#root = this.shadowRoot.querySelector('[root]')
        this.#contentArea = this.shadowRoot.querySelector('.content-area')
        this.#indicator = this.shadowRoot.querySelector('.menu-indicator')
        this.#menu = this.shadowRoot.querySelector('.menu[top]')
        this.#register()
    }

    #register ()
    {
        this.#root.addEventListener('click', event =>
        {
            if (event.target.classList.contains('item'))
            {
                if (event.target === this.#selectedItem)
                {
                    return
                }

                if (this.#selectedItem)
                {
                    this.#selectedItem.classList.remove('active')
                }

                if (event.target.querySelector('.menu'))
                {
                    event.target.classList.toggle('collapsed')

                    if (event.target.contains(this.#selectedItem))
                    {
                        this.#indicator.style.visibility = event.target.classList.contains('collapsed')
                            ? 'hidden'
                            : 'visible'
                    }

                    return
                }

                this.#selectedItem = event.target

                const selectedItemBr = this.#selectedItem.getBoundingClientRect()
                const menuBr = this.#menu.getBoundingClientRect()

                this.#selectedItem.classList.add('active')
                this.#indicator.style.visibility = 'visible'
                this.#indicator.style.height = this.#selectedItem.querySelector('.text').offsetHeight + 'px'
                this.#indicator.style.top = '0px'
                this.#indicator.style.left = (selectedItemBr.left - menuBr.left) * -1 + 'px'
                this.#selectedItem.appendChild(this.#indicator)

                this.dispatchEvent(new CustomEvent('select', {
                    detail: this.#selectedItem.dataset.id || this.#selectedItem.getAttribute('href') || this.#selectedItem.textContent
                }))
            }
        })
    }
})