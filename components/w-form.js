/**
 * @attr action=<string>
 * @attr [format=<string>] Expected values are json, xml, text. Default is json
 */

import { ComponentBase } from './shared.js'


customElements.define('w-form', class extends ComponentBase
{
    /**
     * @type { HeadersInit }
     */
    #headers

    /**
     * 
     */
    constructor()
    {
        super(
            /*html*/`
                <slot ref="formContent"></slot>
            `,
            /*css*/`
            `
        )

        this.addEventListener('asyncsubmit', this.#submit.bind(this))
    }

    /**
     * Submit the form asynchronously
     * @param { CustomEvent } [ev] - The event (asyncsubmit) that triggered the submit
     * @returns { void }
     */
    async #submit(ev)
    {
        const action = this.getAttribute('action')

        if (!action)
        {
            return
        }

        if (ev.target.tagName === 'W-BUTTON')
        {
            ev.target.setAttribute('disabled', '')
        }

        const elements = this.ref.formContent.assignedElements({ flatten: true })
        const fields = elements.filter(x => x.hasAttribute('name'))
        const formData = new FormData()
        const dataFormat = this.getAttribute('format') || 'json'

        for (const field of fields)
        {
            const name = field.getAttribute('name')
            const value = field.value

            if (value === undefined || value === null)
            {
                continue
            }

            formData.append(name, value)
        }

        const headers = !!this.#headers
            ? this.#headers
            : typeof this.ownerDocument.wFormHeaders === 'function'
                ? this.ownerDocument.wFormHeaders()
                : this.ownerDocument.wFormHeaders

        const response = await fetch(action, {
            method: 'post',
            body: formData,
            headers
        })

        if (!response.ok)
        {
            console.error('Non-2xx response received')
        }

        let data

        try
        {
            switch (dataFormat) {
                case 'json':
                    data = await response.json()
                    break;
                case 'text':
                    data = await response.text()
                    break;
                case 'xml':
                    data = (new DOMParser()).parseFromString(await response.text(), 'application/xml')
                    break;
                default:
                    break;
            }
        }
        catch (err)
        {
            data = null
        }

        this.dispatchEvent(new CustomEvent('response', {
            detail: {
                ok: response.ok,
                status: response.status,
                data
            }
        }))

        ev.target.removeAttribute('disabled')
    }

    /**
     * @param { HeadersInit } data 
     */
    set headers (data)
    {
        this.#headers = data
    }
})