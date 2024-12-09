import { ComponentBase } from './shared.js'

customElements.define('w-better-select', class extends ComponentBase
{
    #popupEl
    #internals
    #options
    #isMultiselect
    #selectedValues = []
    #searchEl

    constructor()
    {
        super(
            /*html*/`
                <w-input ref="input" block readonly autocomplete="off">
                    <i class="ri-arrow-down-s-line ri-lg caret" slot="after"></i>
                </w-input>
            `,
            /*css*/`
                :host {
                    border-radius: .375rem;
                }
                .caret {
                    position: relative;
                    top: 1px;
                }
            `
        )

        if (!this.ownerDocument.head.querySelector('style[data-id="qs-bs"]'))
        {
            const styleEl = this.ownerDocument.createElement('style')
                  styleEl.dataset.id = 'qs-bs'

            styleEl.textContent = /*css*/`
                .qs-bs-popup {
                    position: fixed;
                    z-index: 9999;
                    top: 0;
                    left: 0;
                    border-radius: .375rem;
                    background: rgb(var(--qs-color-base-l2));
                    box-shadow: var(--qs-shadow-lg);
                    border: 1px solid rgb(var(--qs-color-base-border));
                    min-width: 120px;
                    max-height: 45vh;
                    overflow-y: auto;
                    overflow-x: hidden;
                    user-select: none;
                    color:  rgb(var(--qs-color-base-text));
                }
                .qs-bs-popup.hidden {
                    display: none;
                }
                .qs-bs-popup > .searchbox {
                    display: flex;
                    align-items: center;
                    padding: .375rem;
                    border-bottom: 1px solid rgb(var(--qs-color-base-border));
                }
                .qs-bs-popup > .searchbox > i {
                    margin-left: .375rem;
                    margin-right: .125rem;
                }
                .qs-bs-popup > .searchbox > input {
                    background: transparent;
                    border: 0;
                    outline: none;
                    font-size: .875rem;
                    padding: .375rem .5rem;
                    font-family: inherit;
                }
                .qs-bs-popup > .options {
                    padding: .375rem;
                }
                .qs-bs-popup > .options > .qs-bs-option {
                    font-size: .875rem;
                    padding: .375rem .5rem;
                    border-radius: .25rem;
                    width: 100%;
                    cursor: default;
                    text-shadow: 0 1px 2px rgb(var(--qs-color-base-text) / .2);
                }
                .qs-bs-popup > .options > .qs-bs-option > .check {
                    display: none;
                    margin-right: .375rem;
                }
                .qs-bs-popup > .options > .qs-bs-option.hidden {
                    display: none;
                }
                .qs-bs-popup > .options > .qs-bs-option.selected {
                    color: rgb(var(--qs-color-primary));
                }
                .qs-bs-popup > .options > .qs-bs-option.selected > .check {
                    display: inline;
                }
                .qs-bs-popup > .options > .qs-bs-option:hover {
                    background: rgb(var(--qs-color-primary) / .1);
                    color: rgb(var(--qs-color-primary));
                    text-shadow: 0 1px 2px rgb(var(--qs-color-primary) / .2);
                }
            `

            this.ownerDocument.head.appendChild(styleEl)
        }

        this.#internals = this.attachInternals()
    }

    connectedCallback()
    {
        const el = this.ownerDocument.createElement('div')
        const searchBoxEl = this.ownerDocument.createElement('div')
        const searchInputEl  = this.ownerDocument.createElement('input')
        const optionsBoxEl = this.ownerDocument.createElement('div')
        const iconEl = this.ownerDocument.createElement('i')
        
        searchBoxEl.className = 'searchbox'
        searchInputEl.setAttribute('placeholder', 'Search...')
        searchBoxEl.appendChild(iconEl)
        searchBoxEl.appendChild(searchInputEl)
        optionsBoxEl.className = 'options'
        iconEl.className = 'ri-search-2-line'
        el.className = 'qs-bs-popup hidden'
        el.appendChild(searchBoxEl)
        el.appendChild(optionsBoxEl)

        if (this.hasAttribute('multiselect'))
        {
            this.#isMultiselect = true
        }
        
        this.ownerDocument.body.appendChild(el)
        this.#popupEl = el
        this.#searchEl = searchInputEl

        this.ref.input.addEventListener('mousedown', (ev) =>
        {
            if (this.#popupEl.classList.contains('hidden'))
            {
                this.#filterOptions()
                this.#popupEl.classList.remove('hidden')

                setTimeout(() =>
                {
                    this.#searchEl.focus()
                },
                0)
            }

            const gap = 4
            const elRect = this.ref.input.getBoundingClientRect()
            const popupRect = this.#popupEl.getBoundingClientRect()

            if (elRect.bottom + gap + popupRect.height >= window.innerHeight)
            {
                this.#popupEl.style.top = 'auto'
                this.#popupEl.style.bottom = (window.innerHeight - elRect.top) + 4 + 'px'
            }
            else
            {
                this.#popupEl.style.bottom = 'auto'
                this.#popupEl.style.top = elRect.bottom + 4 + 'px'
            }
            
            this.#popupEl.style.left = elRect.left + 'px'
            this.#popupEl.style.width = elRect.width + 'px'
        })

        this.addEventListener('mousedown', (ev) =>
        {
            ev.stopPropagation()
        })

        this.#popupEl.addEventListener('mousedown', (ev) =>
        {
            ev.stopPropagation()

            if (ev.target.matches('.qs-bs-option'))
            {
                const value = ev.target.dataset.value

                if (this.#isMultiselect)
                {
                    ev.target.classList.toggle('selected')
                }
                else
                {
                    ev.target.parentNode.querySelector('.selected')?.classList.remove('selected')
                    ev.target.classList.add('selected')
                    this.#popupEl.classList.add('hidden')
                }

                this.ref.input.value = [...this.#popupEl.querySelectorAll('.selected')]
                    .map(x => x.textContent.trim())
                    .join(', ')

                this.#internals.setFormValue(this.value)
                this.dispatchEvent(new Event('change'))
            }
        })

        this.ownerDocument.addEventListener('mousedown', () =>
        {
            this.#popupEl.classList.add('hidden')
        })

        searchBoxEl.addEventListener('input', (ev) =>
        {
            this.#filterOptions(ev.target.value.trim())
        })
    }

    disconnectedCallback()
    {
        this.#popupEl.remove()
    }

    #filterOptions(keyword)
    {
        if (keyword === undefined)
        {
            this.#searchEl.value = ''
        }

        this.#popupEl.querySelectorAll('.qs-bs-option').forEach(el =>
        {
            if (el.textContent.toLowerCase().includes((keyword || '').toLowerCase()))
            {
                el.classList.remove('hidden')
            }
            else
            {
                el.classList.add('hidden')
            }
        })
    }

    #reloadOptions()
    {
        let html = ''

        for (const x of this.#options)
        {
            if (x.value === undefined || x.value === '')
            {
                continue
            }

            html += `<div class="qs-bs-option" data-value="${x.value.toString()}">
                <i class="ri-check-line check"></i>${x.text}
            </div>`
        }

        this.#popupEl.querySelector('.options').innerHTML = html
    }

    /**
     * @param {{ text: string, value: string | number }[]} _ 
     */
    set options(_)
    {
        this.#options = _
        this.#reloadOptions()
    }

    get value()
    {
        return [...this.#popupEl.querySelectorAll('.selected')].map(x => x.dataset.value).join(';')
    }

    attributeChangedCallback(name, ov, nv)
    {
        if (this.constructor.observedAttributes.includes(name))
        {
            this.ref.input.setAttribute(name, nv)
        }
    }

    static formAssociated = true
    static observedAttributes = ['placeholder']
})