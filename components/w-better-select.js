/**
 * @typedef IOptions
 * @property { string } text
 * @property { string | number } value
 */

/**
 * Representative value of the element
 * @typedef { string | number } IValue
 */

import { ComponentBase } from './shared.js'
import './w-input.js'

customElements.define('w-better-select-option', class extends ComponentBase
{
    /**
     * @type { IOptions[] | undefined }
     */
    #options

    /**
     * @type { IValue | undefined }
     */
    #value

    /**
     * @type {HTMLElement}
     */
    #selectedItem

    constructor()
    {
        super(
            /*html*/`
                <div ref="root">
                    <div class="search-box">
                        <i class="icon ri-search-line"></i>
                        <input class="search" placeholder="Search..." ref="searchInput" />
                    </div>
                    <div class="options" ref="options"></div>
                </div>
            `,
            /*css*/`
                :host {
                    display: none;
                    position: fixed;
                    border-radius: .5rem;
                    z-index: 999;
                    max-height: 40vh;
                }
                :host([active]) {
                    display: block;
                }
                [ref="root"] {
                    border-radius: .5rem;
                    background: rgb(var(--qs-color-base-l2));
                    border: 1px solid rgb(var(--qs-color-base-border));
                    font-size: .875rem;
                    overflow-y: auto;
                    box-shadow: var(--qs-shadow-lg);
                }
                .search-box {
                    display: flex;
                    align-items: center;
                    border-bottom: 1px solid rgb(var(--qs-color-base-border));
                }
                .search-box > .icon {
                    margin-left: .625rem;
                }
                .search-box > .search {
                    padding: .625rem;
                    outline: none;
                    border: 0;
                    background: transparent;
                    font-family: inherit;
                }
                .options {
                    padding: .375rem;
                }
                .options > .item {
                    padding: .375rem .5rem;
                    border-radius: .25rem;
                    cursor: default;
                }
                .options > .item:hover {
                    background: rgb(0 0 0 / .08);
                }
                .options > .item.hidden {
                    display: none;
                }
                .options > .item.selected {
                    color: rgb(var(--qs-color-primary));
                }
            `
        )

        this.ref.root.addEventListener('click', this.#onElementClick.bind(this))
        this.ref.searchInput.addEventListener('input', this.#filterOptions.bind(this))
    }

    attributeChangedCallback(name, ov, nv)
    {
        if (name === 'active' && nv !== null)
        {
            this.ref.searchInput.focus()
        }
    }

    /**
     * @returns { IValue | undefined }
     */
    get value ()
    {
        return this.#value
    }

    /**
     * Handler for when element was clicked on
     * @param { Event } ev 
     */
    #onElementClick (ev)
    {
        ev.stopPropagation()

        if (ev.target.classList.contains('item'))
        {
            if (this.isMultiselect)
            {
                ev.target.classList.toggle('selected')
                this.#value = [...this.ref.options.querySelectorAll('.item.selected')].map(x => x.$option)   
            }
            else
            {
                if (this.#selectedItem)
                {
                    this.#selectedItem.classList.remove('selected')
                }

                this.#selectedItem = ev.target
                this.#selectedItem.classList.add('selected')
                this.#value = ev.target.$option
                this.hide()
            }

            this.dispatchEvent(new CustomEvent('change', {
                detail: this.value
            }))
        }
    }

    /**
     * Renders options
     */
    #renderOptions ()
    {
        this.ref.options.innerHTML = ''

        for (const opt of this.#options)
        {
            const el = this.ownerDocument.createElement('div')
                  el.dataset.value = opt.value
                  el.className = 'item'
                  el.textContent = opt.text
                  el.$option = opt

            this.ref.options.appendChild(el)
        }
    }

    /**
     * Shows/hides options based on search keyword
     */
    #filterOptions ()
    {
        this.ref.options.querySelectorAll('.item').forEach(el =>
        {
            const matchText = this.ref.searchInput.value.toLowerCase()
            const targetText = el.textContent.toLowerCase()
            el.classList[targetText.includes(matchText) ? 'remove' : 'add']('hidden')
        })
    }

    get isMultiselect()
    {
        return this.hasAttribute('multiselect')
    }

    toggle()
    {
        this.toggleAttribute('active')
    }

    hide()
    {
        this.removeAttribute('active')
    }

    /**
     * Set dropdown options
     * @param { IOptions } data 
     */
    set options (data)
    {
        this.#options = data
        this.#renderOptions()
    }

    static observedAttributes = ['active']
})

customElements.define('w-better-select', class extends ComponentBase
{
    /**
     * @type { HTMLElement }
     */
    #dropdown

    /**
     * @type { Function }
     */
    #docClickCb

    /**
     * @type { IValue }
     */
    #value

    /**
     * @type { ElementInternals }
     */
    #internals

    constructor()
    {
        super(
            /*html*/`
                <w-input ref="input" root readonly placeholder="Select...">
                    <i slot="after" class="caret ri-arrow-down-s-line ri-lg"></i>
                </w-input>
            `,
            /*css*/`
                .caret {
                    margin-top: 1px;
                }
            `
        )

        this.#internals = this.attachInternals()
    }

    connectedCallback()
    {
        this.#dropdown = this.ownerDocument.createElement('w-better-select-option')

        if (this.hasAttribute('multiselect'))
        {
            this.#dropdown.setAttribute('multiselect', '')
        }

        this.#dropdown.addEventListener('change', this.#onSelect.bind(this))
        this.ownerDocument.body.appendChild(this.#dropdown)
        this.ref.input.addEventListener('click', this.#onInputClick.bind(this))
        this.#docClickCb = this.#hideDropdown.bind(this)
        this.ownerDocument.addEventListener('click', this.#docClickCb)
    }

    /**
     * 
     * @param {CustomEvent} ev 
     */
    #onSelect (ev)
    {
        this.ref.input.value = ev.detail instanceof Array
            ? ev.detail.map(x => x.text).join(', ')
            : ev.detail.text

        this.#value = ev.detail instanceof Array
            ? ev.detail.map(x => x.value).join(';')
            : ev.detail.value

        this.#internals.setFormValue(this.#value)
    }

    #onInputClick (ev)
    {
        ev.stopPropagation()
        this.#toggleDropdown()
    }

    #toggleDropdown()
    {
        this.#dropdown.toggle()
        
        const dropdownRect = this.#dropdown.getBoundingClientRect()
        const thisRect = this.getBoundingClientRect()

        if (dropdownRect.height + thisRect.bottom + 4 >= window.innerHeight)
        {
            this.#dropdown.style.top = 'auto'
            this.#dropdown.style.bottom = window.innerHeight - thisRect.top + 4 + 'px'
        }
        else
        {
            this.#dropdown.style.bottom = 'auto'
            this.#dropdown.style.top = thisRect.bottom + 4 + 'px'
        }

        this.#dropdown.style.left = thisRect.left + 'px'
        this.#dropdown.style.width = thisRect.width + 'px'
    }
    
    #hideDropdown ()
    {
        this.#dropdown.removeAttribute('active')
    }

    /**
     * @param { IOptions } data 
     */
    set options (data)
    {
        this.#dropdown.options = data
    }

    get value ()
    {
        return this.#value
    }

    disconnectedCallback()
    {
        this.#dropdown.remove()
        this.ownerDocument.removeEventListener('click', this.#docClickCb)
    }

    // attributeChangedCallback(name, ov, nv)
    // {
    //     if (name === 'multiselect')
    //     {
    //         if (nv === null)
    //         {
    //             this.#dropdown.removeAttribute('multiselect')
    //         }
    //         else
    //         {
    //             this.#dropdown.setAttribute('multiselect', '')
    //         }
    //     }
    // }

    static formAssociated = true
    static observedAttributes = ['multiselect']
})