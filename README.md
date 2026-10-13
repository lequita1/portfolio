# Luigi Quita — Personal portfolio

A responsive, single-page portfolio made with HTML, CSS, and JavaScript. The design uses a graphite and dusty-blue palette, a personal photo mount, and three real project showcases.

## Open the portfolio

Open `index.html` in a browser, or serve this folder with a static web server. No installation or build step is required. Clipboard copying requires localhost or HTTPS; email links work everywhere.

## Files

- `index.html`: semantic structure, personal content, three project showcases, expandable explanations, and real contact links.
- `style.css`: layout, dark and light themes, responsive breakpoints, hover states, focus states, and reduced-motion support.
- `script.js`: theme preference, mobile navigation, active-section indicator, and email copying.
- `mypicture.jpg`: Luigi's original supplied portrait. Its grayscale treatment and crop are applied only through CSS.
- `assets/favicon.svg`: the local portfolio icon.
- `assets/projects/`: Luigi's supplied screenshots of Game Vault, Eggscavator, and PawCare.

Google Fonts supplies Bricolage Grotesque, Manrope, and Caveat. Local system font fallbacks remain available when fonts cannot load.

## Featured projects

- **Game Vault:** A React game-discovery interface using the RAWG API. The screenshot shows searching, genre filters, popularity sorting, and game cards with artwork, ratings, and release years. RAWG is credited below the screenshot. No API key is included in the portfolio.
- **Eggscavator:** A Roblox Studio game where players break an egg, discover different endings and cutscenes, and unlock chapters. The supplied screenshot shows the game world.
- **PawCare:** An offline, local Flutter and SQLite pet-care app. The supplied dashboard shows pet profiles, care reminders, activity logging, and daily care progress.

Descriptions are based on Luigi's project details and screenshots, rather than an inspection of the projects' source code. The longer explanations use native `<details>` elements and work without JavaScript. Screenshots open at full size. Live demo and project repository URLs have not been supplied, so the portfolio does not invent those links.

To update a project, edit its article in `index.html` and replace the corresponding image in `assets/projects/`. Keep descriptive alt text, image dimensions, and lazy loading. Add real demo or repository links with the `text-link` class when those URLs are available.

The original Game Vault screenshot is preserved; its browser toolbar is clipped only in the on-page CSS presentation.

## Accessibility

- Tested palette: primary text, muted text, and links exceed WCAG AA minimum text contrast in both themes.
- Native semantic links/buttons, visible keyboard focus, a skip link, descriptive portrait alt text, and accessible menu/theme labels.
- The mobile menu supports Escape and restores focus when dismissed.
- User zoom is not restricted; page layout stacks on narrow screens.
- Nonessential transitions and smooth scrolling respect reduced-motion preferences.
- Project screenshots have descriptive alt text and accessible full-size links. Native disclosure controls make the longer explanations keyboard accessible.

A passing contrast calculation alone is not a declaration of full WCAG conformance. Confirm keyboard behavior, screen-reader announcements, zoom, and future project content after changes.

## GitHub Pages

Push the site files and assets to a public GitHub repository. In repository settings, configure Pages to deploy from the root of the chosen branch. The relative asset paths work for a repository subpath. Submit the public repository link and, if deployed, the HTTPS Pages URL according to the activity instructions.

The personal writing is provisional and can be edited to match Luigi's own voice. Project descriptions use supplied information; no experience, achievements, performance measurements, or unprovided project features have been invented.
