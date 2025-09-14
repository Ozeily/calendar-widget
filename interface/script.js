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
        const data = new formData(form);
        const params = new URLSearchParams(data);
        preview.src = 'https://ozeily.github.io/embeddable-calendar-widget/widget/widget.html' + params.toString()

    })
  }

function copyUrl() {
    const data = new formData(form);
    const params = new URLSearchParams(data);
    const url = 'https://ozeily.github.io/embeddable-calendar-widget/widget/widget.html' + params.toString();

    navigator.clipboard.writeText(url)
}