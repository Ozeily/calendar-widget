document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById("form")
    const preview = document.getElementById("preview")

    function addSetting(cbox) {
        const bigSetting = cbox.closest(".big-setting");
        const secSettings = bigSetting.querySelectorAll(".secondary-setting")

        secSettings.forEach(sec => {
            if (cbox.checked) { sec.classList.add('displayed') }
            else {sec.classList.remove('displayed')}
            
        });
    }

    if (form) {
        form.addEventListener('input', () => {
            const data = new FormData(form);
            const params = new URLSearchParams(data);
            preview.src = 'widget/widget.html?' + params.toString()

        })
    }

    window.copyUrl = function() {
        if (!form) { return }
        const data = new FormData(form);
        const params = new URLSearchParams(data);
        const url = 'https://ozeily.github.io/embeddable-calendar-widget/widget/widget.html?' + params.toString();

        navigator.clipboard.writeText(url)
        .then(() => { alert('Texte copié:' + url) })
        .catch(err => { alert('Erreur: ' + err)})
    }

    window.addSetting = addSetting;

})