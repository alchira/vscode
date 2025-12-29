# [Alchira Extension for VS Code](https://marketplace.visualstudio.com/items?itemName=yshelldev.alchira)

Essential Alchira developer tooling for VSCode, featuring integrated LSP, bundled binary, and focused support for Alchira workflows.

## End-User License Agreement (EULA)

By using this software, you agree to the terms and conditions outlined in the [End-User License Agreement](./EULA.md).

For details, please read the full EULA document provided in this repository.

---

## Preview 

![Preview Output](./assets/preview.gif)

## Shortcuts

### Template Import: `[ alt + x ]` 

- Import available templates for the `symlink` at the active cursor position, appending them to the current HTML tag.

### Content Formatting: `[ alt + shift + x ]` 

- Format only Alchira-specific blocks. Use repeatedly to toggle folding for the nearest foldable range.

### Component Sketchpad: `[ ctrl + alt + x ]`

- Open the component sketchpad webview for the symlink at the cursor, next to the editor.

### Source/Target Switch: `[ ctrl + alt + shift + x ]`

- Toggle between files in the source and target directories with a one-to-one mapping.

## Features

### Statusbar Widget

- Displays file status and error count.
- Quick access to integrated Alchira commands.

### Developer Assistance

- Real-time diagnostics.
- Intellisense and autocomplete.
- Tooltips with information.
- Folding range support.
- Attribute detection, decoration, and highlighting.
- Go to definition for `symlinks`.
- Color picker for formats: `rgb`, `rgba`, `hsl`, `hsla`, `lch`, `oklch`, `lab`, `oklab`, `hex`

## Language Support

- Files with a `.alchira` extension are treated as Markdown and support all core extension features.
- Recognized extended custom css directives, `@--attach` and `@--assign`.

## Miscellanious

### Custom Commands
- Easily invoke important Alchira commands directly from the command palette for quick workflows.

### Configurable Settings
- Modify extension behavior and features through user and workspace settings to tailor your development experience.