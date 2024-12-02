class ComponentBase extends HTMLElement
{
    constructor(html, css)
    {
        super();

        const remixicon = this.ownerDocument.head.querySelector('link[href*="remixicon.css"]') ||
                          this.ownerDocument.head.querySelector('link[href*="remixicon.min.css"]');

        this.attachShadow({ mode: 'open' }).innerHTML = /*html*/`
            ${html}
            <style type="text/css">
                @import url('${remixicon.href}');

                [root] {
                    font-family: var(--qs-font-family, 'sans-serif');
                    box-sizing: border-box;
                }
                [root] * {
                    box-sizing: inherit;
                }
                ${css}
            </style>
        `;
        
        this.#registerRefService();
        this.#registerSlotVisibilityService();
    }

    attributeChangedCallback(name, ov, nv)
    {
        for (const x of (this.migrateAttributes || this.constructor.migrateAttributes))
        {
            let [selector, ...attrs] = x;

            if (typeof selector === 'string')
            {
                selector = this.shadowRoot.querySelector(selector);
            }

            if (!attrs.includes(name))
            {
                continue
            }

            selector.setAttribute(name, nv);
        }
    }

    /**
     * Automatic slot visibility. This will hide slot if no content is provided.
     * Setting `display="<string>"` attribute to `<slot>` will activate this feature
     */
    #registerSlotVisibilityService()
    {
        for (const slot of this.shadowRoot.querySelectorAll('slot[name][display]'))
        {
            slot.addEventListener('slotchange', (ev) =>
            {
                slot.style.display = ev.target.assignedNodes().length > 0
                    ? slot.getAttribute('display') || 'initial'
                    : 'none';
            });
        }
    }

    /**
     * Fills `this.ref`
     */
    #registerRefService ()
    {
        this.ref = {};

        for (const el of this.shadowRoot.querySelectorAll('[ref]'))
        {
            const name = el.getAttribute('ref');

            if (name)
            {
                this.ref[name] = el;
            }
        }
    }
}

/**
 * @typedef {{ text:string, value?:string|number, href?:string }[]} MenuSchema
 */


customElements.define('w-dashboard', class extends ComponentBase
{
    /**
     * @type {HTMLElement}
     */
    #selectedItem

    /**
     * @type {HTMLElement}
     */
    #root

    /**
     * @type {HTMLElement}
     */
    #indicator

    /**
     * @type {HTMLElement}
     */
    #menuElement

    /**
     * @type {MenuSchema}
     */
    #menu

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
                            <div class="logo">
                                LOGO
                            </div>
                            <div class="menu" top>
                                <!-- -->
                            </div>
                            <div class="menu-bottom-pad">
                                <!-- -->
                            </div>
                        </div>
                        <div class="content-area">
                            <slot></slot>
                        </div>
                    </div>
                </div>
            `,
            /*css*/`
                :host {
                    --menu-width: 300px;
                    --base-color: 232 235 237;
                    --border-radius: 1.5rem;
                    --gutter: 1.5rem;
                }
                [root] {
                    height: 100vh;
                    width: 100%;
                    background-color: rgb(var(--base-color));
                    box-sizing: border-box;
                    padding: var(--gutter);
                    font-family: var(--qs-font-family, inherit);
                }
                [root] * {
                    box-sizing: inherit;
                }
                :host([screen]) {
                    --border-radius: 0px;
                    --gutter: 0px;
                }
                .main {
                    border-radius: var(--border-radius);
                    background: rgb(255 255 255 / .35);
                    display: grid;
                    height: 100%;
                    grid-template: 
                        'menu nav'     50px
                        'menu content' 1fr / auto 1fr;
                }
                .main > .nav-area {
                    grid-area: nav;
                }
                .main > .menu-area {
                    grid-area: menu;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                }
                .main > .content-area {
                    grid-area: content;
                    border-bottom-right-radius: var(--border-radius);
                    padding: 1rem 1.75rem;
                    overflow-y: auto;
                }
                .menu[top] {
                    position: relative;
                    width: var(--menu-width);
                    height: 100%;
                    padding-right: 1rem;
                    overflow-y: auto;
                    overflow-x: hidden;
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                    user-select: none;
                }
                .menu[top]::-webkit-scrollbar {
                    display: none;
                }
                .logo {
                    padding-top: 2.5rem;
                    padding-bottom: 2.5rem;
                    text-align: center;
                    position: relative;
                    background: white;
                    border-top-left-radius: var(--border-radius);
                    border-bottom-left-radius: 6px;
                    z-index: 1;
                    flex: 1;
                }
                .menu > .item {
                    cursor: pointer;
                    padding-left: 1rem;
                    width: 100%;
                    position: relative;
                }
                .menu > .item > .text {
                    padding: .55rem 0 .55rem .875rem;
                    pointer-events: none;
                    display: flex;
                    align-items: center;
                    font-weight: 500;
                    color: #666666;
                }
                .menu > .item > .text > .icon {
                    margin-right: .875rem;
                }
                .menu > .item:hover > .text {
                    color: #000000;
                }
                .menu > .item.active > .text {
                    color: #000000;
                    background-image: linear-gradient(to right, rgb(0 0 0 / .05), rgb(0 0 0 / .05));
                }
                .menu > .item:has(.menu) > .text::after {
                    content: '';
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'%3E%3Cpath d='M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z'%3E%3C/path%3E%3C/svg%3E");
                    width: 24px;
                    height: 24px;
                    display: inline-block;
                    margin-left: auto;
                    margin-right: .5rem;
                }
                .menu > .item.collapsed:has(.menu) > .text::after {
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'%3E%3Cpath d='M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z'%3E%3C/path%3E%3C/svg%3E");
                }
                .menu > .item.collapsed > .menu {
                    display: none;
                }
                .menu-indicator {
                    position: absolute;
                    width: 4px;
                    height: auto;
                    background: black;
                }
                .menu-background {
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    top: 0;
                    background: white;
                    border-radius: var(--border-radius) 0 0 var(--border-radius);
                }
                .menu-bottom-pad {
                    height: 25px;
                }
            `
        );

        this.#root = this.shadowRoot.querySelector('[root]');
        this.#indicator = this.shadowRoot.querySelector('.menu-indicator');
        this.#menuElement = this.shadowRoot.querySelector('.menu[top]');
        this.#register();
    }

    /**
     * Initiate initial operations
     * @private
     * @returns {void}
     */
    #register ()
    {
        this.#root.addEventListener('click', event =>
        {
            if (event.target.classList.contains('item'))
            {
                event.stopPropagation();

                if (event.target === this.#selectedItem)
                {
                    return
                }

                if (event.target.dataset.href)
                {
                    window.history.pushState({}, '', event.target.dataset.href);
                }

                if (event.target.querySelector('.menu'))
                {
                    event.target.classList.toggle('collapsed');
                    return
                }

                if (this.#selectedItem)
                {
                    this.#selectedItem.classList.remove('active');
                }

                this.#selectedItem = event.target;

                const selectedItemBr = this.#selectedItem.getBoundingClientRect();
                const menuBr = this.#menuElement.getBoundingClientRect();
                const menuIndex = parseInt(this.#selectedItem.dataset.index);

                this.#selectedItem.classList.add('active');
                this.#indicator.style.visibility = 'visible';
                this.#indicator.style.height = this.#selectedItem.querySelector('.text').offsetHeight + 'px';
                this.#indicator.style.top = '0px';
                this.#indicator.style.left = (selectedItemBr.left - menuBr.left) * -1 + 'px';
                this.#selectedItem.appendChild(this.#indicator);

                this.dispatchEvent(new CustomEvent('menuselect', {
                    detail: this.#menu[menuIndex] || this.#selectedItem.textContent
                }));
            }
        });
    }

    #generateMenu ()
    {
        let template = '';

        function makeMenu (menu, isNested = false)
        {
            for (const [i, m] of menu.entries())
            {
                if (isNested)
                {
                    template += `<div class="menu">`;
                }

                const href = m.href ? ` data-href="${m.href}"` : '';
                const value = m.value ? ` data-value="${m.value}"`: '';

                template += `
                    <div class="item" data-index="${i}"${href}${value}>
                      <div class="text">
                `;

                if (m.icon)
                {
                    template += `
                        <i class="${m.icon} icon"></i>
                    `;
                }

                template += `
                        <span class="title">${m.text}</span>
                      </div>
                `;

                if (m.children)
                {
                    makeMenu(m.children, true);
                }

                template += `
                    </div>
                `;

                if (isNested)
                {
                    template += '</div>';
                }
            }
        }

        makeMenu(this.#menu);

        this.#menuElement.innerHTML = template;
    }

    /**
     * @param {MenuSchema} schema 
     */
    set menu (schema)
    {
        this.#menu = schema;
        this.#generateMenu();
    }
});

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
        );

        this.#root = this.shadowRoot.querySelector('[root]');
        this.#header = this.shadowRoot.querySelector('.header');
        this.#headerSlot = this.#header.querySelector('slot[name="header"]');

        this.#headerSlot.addEventListener('slotchange', (ev) =>
        {
            if (ev.target.assignedNodes().length > 0)
            {
                this.#header.style.display = 'flex';
                this.#root.classList.remove('no-header');
            }
            else
            {
                this.#header.style.display = 'none';
                this.#root.classList.add('no-header'); 
            }
        });
    }
});

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
        );
    }

    get migrateAttributes ()
    {
        return [
            [this.ref.input, 'placeholder', 'type', 'min', 'max', 'step', 'disabled', 'readonly']
        ]
    }
    
    static observedAttributes = ['placeholder', 'type', 'min', 'max', 'step', 'disabled', 'readonly']
});
