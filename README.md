# Embeddable Calendar Widget
A calendar widget that can be embedded in websites or apps.
Customisable, and completely free.

## Demos
### Customisation
<img src="/Demos/customisation%20demo.gif" width="400">

### Notion preview
<img src="/Demos/notion calendar demo.gif" width="400">

### Obsidian preview
<img src="/Demos/obsidian calendar demo.gif" width="400">

## How to set it up
1. Go to the [customisation interface](https://ozeily.github.io/embeddable-calendar-widget/) to customise it as you wish.
2. Click on "Copy URL"
3. Using the provided URL, embed it where you want!

> [!CAUTION]
> - The customisation interface is **not made for small screens** (phones / screens on portrait mode).
> - **Page refresh**: solves most preview issues, but will reset all the settings
> - **Preview too big**: try using full screen mode. If it doesn't work, I'm sorry but I have no solution for it yet.

### For Notion
`/embed` (embed block) → paste the URL → "Embed a link" → Tada!
Resize the width of the block to resize the widget, the height will automatically follow. When you are done resizing, you can reduce the height of the embed block to remove the unnecessary space below the widget.

### For Obsidian/HTML
insert the following block:
`<iframe src="(link)" height="(height)" width="(width)"></iframe>`

- Replace (link) with the URL provided
- Replace (width) with the desired width
- The height depends on the width and if there is a banner or not.
  For reference:
| **`** | **Without banner** | **With banner** | 
| --- | --- | --- |
| **Width (px)**  | 150 | 150 | 
| **Height (px)** | 191 | 266 |
*Note: a 150px width is the minimum to make the calendar look normal. A width less than 150px will make the calendar look terrible.*

## Customisation options
- **Rounded calendar** on/off: Whether corners of the calendar and corners of the current date highlight are rounded or not
 *Note: If the widget is too small, the current date highlight will be rounder than the the widget border (thanks to my terrible CSS skills).*
- **Banner** on/off : whether there is a banner or not
  - if on: banner image link OR banner colour (image priority)
    Any valid image link is supported (GIFS included)
- **Font** : text font. To pick between these options:
  - [Papernotes](https://www.dafont.com/fr/papernotes.font)
  - [Times New Roman](https://fr.wikipedia.org/wiki/Times_New_Roman)
  - [tangerine](https://www.creativefabrica.com/product/tangerine/ref/237009/)
  - [Arial](https://fr.wikipedia.org/wiki/Arial#:~:text=Arial%20est%20une%20police%20de,marché%20de%20la%20célèbre%20Helvetica.)
  (Click on the hyperlink to see a preview of the font)
- **Calendar colour**: background colour of the widget
- **Border colour**: colour of the widget border
- **Text colour**: colour of the main text (year, month, navigation arrows on hover, week days, dates of the selected month)
- **Greyed-out colour**: colour of the navigation arrows, dates of the previous and next months
- **Current date highlight**: highlight colour of the current date
- **Current date text**: text colour of the current date

Notes:
- For all the colour options, there is a colour picker. You can pick any colour you want.
- The widget is set to your system language. There is no option to change it (yet).
- You might need to refresh the page to get the new date (there is no automatic date update).
# Future updates
### Interface
- [ ] Ability to use a widget link as a base for another one.
- [ ] Simple/advanced mode with different number of options each (to not overwhelm people who don't want 123 colour options)
- [ ] Preview size fix
- [ ] Be prettier✨
### Customisation options
- [ ] Language options
- [ ] More colour settings?
### Others
- [ ] New calendars (clock, etc.)