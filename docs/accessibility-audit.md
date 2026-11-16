# Accessibility check

**Pages checked:** Current pages and shared parts in `src/`  
**How:** I checked the code for headings, keyboard focus, labels, and images. I also worked out contrast ratios from the text and background colours.  
**Limit:** I could not open the app in a browser because the local server was blocked. So I have not marked the keyboard check as complete.

## What I found and fixed

| Area | What I found | What changed |
| --- | --- | --- |
| Headings | On the home page, loading, error, and empty messages used a top-level heading even though the page already has one. | These messages now use a lower-level heading on the home page. Other pages keep a top-level heading when needed. |
| Keyboard | The “return home” links on not-found pages had no clear focus outline. | Added an outline that appears when keyboard users reach the links. Other main controls have focus styles, and the header has a skip link. |
| Contrast | The small hero hint text had a **4.11:1** contrast ratio on the light end of its background. The target for normal text is **4.5:1**. | Made the text brighter. Its new ratio is **5.14:1** at that spot. |
| Other contrast checks | Slate-500 text on white: **4.76:1**. Slate-600 on white: **7.58:1**. Sky-800 on white: **7.56:1**. White on the footer: **11.32:1**. | These checked colour pairs meet the **4.5:1** target. I did not check every colour on every page. |
| Images | The current pages do not show any `<img>` images. The “B” logo mark and small icons are hidden from screen readers. | No image text was missing. Check again if photos or other images are added. |
| Search label | The search box has a visible text label. | No change needed. |

## Keyboard check still needed

When the app can run in a browser, use `Tab` and `Shift+Tab` to move through each page. Check that the skip link appears, focus is easy to see, and the menu, search, filters, save buttons, and topic details work from the keyboard. This browser check has not been done yet.
