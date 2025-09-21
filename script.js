function getBaseURL() {
    const currentHost = window.location.hostname;
    if (currentHost.includes("ozeily.github.io")) {
        return "https://ozeily.github.io/embeddable-calendar-widget/widget/widget.html?";
    } else {
        return "https://127.0.0.1:5500/widget/widget.html?"
    }
}

document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById("form")
    const preview = document.getElementById("preview")

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
            console.log(cbox, params[cbox.name])
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

    window.addEventListener('message', (event) => {
        if (event.data?.type === "setHeight") {
            preview.style.height = event.data.height + "px"
        }
    })

    //when user enter an input, send settings to the widget
    if (form) {
        form.addEventListener('input', () => {

            const data = new FormData(form);

            for (const [key, value] of data.entries()) {
            console.log(key, value);
            }
            
            sendSettings();

        })
    }

    window.copyUrl = function() {
        if (!form) { return }
        const data = new FormData(form);
        const rawParams = Object.fromEntries(data.entries()) //convert data to object

        for (const [key, value] of data.entries()) {
            console.log(key, value);
        }

        const params = cleanParams(rawParams); //removed unecessary params
        const url = getBaseURL() + new URLSearchParams(params).toString();

        navigator.clipboard.writeText(url)
        .then(() => { alert('Texte copié:' + url) })
        .catch(err => { alert('Erreur: ' + err)})
    }

    window.addSetting = addSetting;

})