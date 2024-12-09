
;(function()
{
    const t0 = performance.now()

    let html = ''

    for (let i=0; i<=30000; i++)
    {
        html += `<div class="anim">dodo-${i}</div>`
    }

    document.body.innerHTML = html

    const t1 = performance.now()

    console.log(`${t1 - t0} ms.`);
})()



// ----------------------


;(function()
{
    const t0 = performance.now()

    for (let i=0; i<=30000; i++)
    {
        const el = document.createElement('div')
        el.className = 'anim'
        el.textContent = `dodo-${i}`
        document.body.appendChild(el)
    }

    const t1 = performance.now()

    console.log(`${t1 - t0} ms.`);
})()
