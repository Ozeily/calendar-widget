function getBaseURL() {
    const currentHost = window.location.hostname;
    if (currentHost.includes("ozeily.github.io")) {
        return "https://ozeily.github.io/calendar-widget/widget/widget.html?";
    } else {
        return window.location.origin;
    }
}

let aspectRatio = document.querySelector(":root").style.getPropertyValue("--iframe-aspect-ratio")

document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById("form")
    const preview = document.getElementById("preview")
    const iframeWrapper = document.querySelector(".iframe-wrapper")

    function cleanParams(params) { //remove unecessary params
        for (const key in params) {
            const value = params[key]

            if (typeof value === 'boolean') continue;
            //delete unecessary params
            if (value === null || value === undefined || typeof value === 'string' && value.trim() === "") {
                delete params[key]
            }
        }

        if ("banner-img" in params) { //delete banner-colour param if there is an img
            delete params["banner-colour"]
        }

        return params

    }

    //send settings to widget (avoid iframe update flash)
    function sendSettings() {
        if (!preview || !preview.contentWindow) { return };
        const origin = window.location.origin;
        const data = new FormData(form);
        const params = Object.fromEntries(data.entries())
        
        //get checkboxes
        form.querySelectorAll('input[type=checkbox]').forEach(cbox => {
            params[cbox.name] = cbox.checked;
        });

        const cleanedParams = cleanParams(params)

        preview.contentWindow.postMessage({ type:"settings", payload: cleanedParams}, origin)
    }

    function addSetting(cbox) {
        const bigSetting = cbox.closest(".big-setting");
        const secSettings = bigSetting.querySelectorAll(".secondary-setting")

        secSettings.forEach(sec => {
            if (cbox.checked) { sec.classList.add('displayed') }
            else {sec.classList.remove('displayed')}
            
        });
    }

    function updateIframeSize() {
        const IFstyle = getComputedStyle(iframeWrapper)
        const spaceTop = parseFloat(IFstyle.paddingTop);
        const spaceBot = parseFloat(IFstyle.paddingBottom);
        const totalSpace = spaceTop + spaceBot;
        const wrapperW = parseFloat(iframeWrapper.clientWidth);
        const aspectRatio = window.getComputedStyle(document.body).getPropertyValue("--iframe-aspect-ratio").trim()

        const newHeight = wrapperW / aspectRatio;

        preview.style.height = `${newHeight - totalSpace}px`;
    }

    const Observer = new ResizeObserver(updateIframeSize)
    Observer.observe(iframeWrapper)
    updateIframeSize()

    //when user enter an input, send settings to the widget
    if (form) {
        form.addEventListener('input', () => {

            const data = new FormData(form);
            
            sendSettings();

        })
    }

    window.addEventListener('message', (event) => {
        if (event.data.type === 'aspectRatio') {
            aspectRatio = event.data.aspectRatio;
            setVarValue("iframe-aspect-ratio", `${aspectRatio}`)
            updateIframeSize()
        }
    });

    window.copyUrl = function() {
        if (!form) { return }
        const data = new FormData(form);
        const rawParams = Object.fromEntries(data.entries()) //convert data to object

        const params = cleanParams(rawParams); //removed unecessary params
        const url = getBaseURL() + new URLSearchParams(params).toString();

        navigator.clipboard.writeText(url)
        .then(() => { alert('Texte copié:' + url) })
        .catch(err => { alert('Erreur: ' + err)})
    }

    window.addSetting = addSetting;

})