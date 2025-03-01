# QR View

A simple QR code generator built with Nuxt 3, TypeScript, and ShadCN Vue. Generate QR codes from URLs and download them as PNG or SVG files.

## Features

- Generate QR codes from URLs
- Customize error correction level (L, M, Q, H)
- Adjust QR code size
- Download as PNG or SVG
- History panel to save and reuse previous QR codes
- Native sharing on supported devices
- Smooth animations and loading states
- Responsive design with mobile-friendly UI

## Tech Stack

- [Nuxt 3](https://nuxt.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [ShadCN Vue](https://shadcn-vue.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [QRCode](https://github.com/soldair/node-qrcode)

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

## Using the Application

1. Enter a URL in the input field
2. (Optional) Adjust QR code options:
   - Error correction level - determines how much of the QR code can be damaged while still being readable
   - QR code size - adjust the pixel dimensions of the generated code
3. Click "Generate QR Code"
4. Download the QR code as PNG or SVG

## Error Correction Levels

- **L (Low)**: 7% of codewords can be restored
- **M (Medium)**: 15% of codewords can be restored
- **Q (Quartile)**: 25% of codewords can be restored
- **H (High)**: 30% of codewords can be restored

Higher error correction levels make the QR code more resistant to damage but increase its complexity.