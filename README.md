# QRView

<p align="center">
  <a href="https://github.com/peopleoff/qrview">
    <img src="https://img.shields.io/github/stars/peopleoff/qrview?style=social" alt="GitHub stars" />
  </a>
  <a href="https://qrview.netlify.app/">
    <img src="https://img.shields.io/badge/website-qrview.netlify.app-blue" alt="Website" />
  </a>
  <a href="https://ruslanbelyy.com/">
    <img src="https://img.shields.io/badge/author-Ruslan%20Belyy-orange" alt="Author" />
  </a>
</p>

<div align="center">
  <img src="https://img.shields.io/badge/vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white" alt="Vue.js" />
  <img src="https://img.shields.io/badge/nuxt.js-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white" alt="Nuxt.js" />
  <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS" />
</div>

<p align="center">
  A sleek, modern QR code generator built with Nuxt 3, TypeScript, and ShadCN Vue.
</p>

<div align="center">
  <img src="/public/screenshot.png" alt="QRView Screenshot" width="600" />
</div>

<p align="center">
  <a href="https://qrview.netlify.app/" target="_blank">🔗 Live Demo: https://qrview.netlify.app/</a>
</p>

## ✨ Features

- **Instant QR Generation** - Generate QR codes from any URL with a single click
- **Customization Options**:
  - Adjust error correction level (L, M, Q, H) for optimal scanning reliability
  - Customize QR code size to fit your needs
- **Multiple Export Formats** - Download as PNG or SVG for perfect quality at any size
- **History Management** - Save and reuse previous QR codes with a convenient history panel
- **Cross-Platform Sharing** - Native sharing integration with mobile devices
- **Polished UX** - Smooth animations and loading states for a premium feel
- **Responsive Design** - Works flawlessly on desktop, tablet, and mobile devices

## 🚀 Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/peopleoff/qrview.git
   cd qrview
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Technologies Used

- **[Nuxt 3](https://nuxt.com/)** - Vue.js framework for building modern web applications
- **[TypeScript](https://www.typescriptlang.org/)** - Strongly typed programming language for enhanced development
- **[ShadCN Vue](https://shadcn-vue.com/)** - Re-usable components built with Radix Vue and Tailwind CSS
- **[TailwindCSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[QRCode.js](https://github.com/soldair/node-qrcode)** - QR code generation library
- **[VueUse](https://vueuse.org/)** - Collection of essential Vue Composition API utilities

## 🧰 Project Structure

```
qrview/
├── components/            # Vue components
│   ├── ui/                # ShadCN UI components
│   └── QrHistoryPanel.vue # QR code history component
├── composables/           # Vue composables
│   └── useQrHistory.ts    # QR history state management
├── lib/                   # Utility functions
│   └── utils.ts           # Shared utilities
├── assets/                # Static assets (CSS, fonts, etc.)
├── public/                # Public assets (favicon, etc.)
├── app.vue                # Main application component
└── nuxt.config.ts         # Nuxt configuration
```

## 📋 Usage Guide

1. **Generate a QR Code**
   - Enter any URL in the input field
   - Click "Generate QR Code" or press Enter

2. **Customize Your QR Code**
   - Click the settings icon to access customization options
   - Adjust error correction level and size as needed

3. **Export Your QR Code**
   - Click "PNG" or "SVG" to download in your preferred format
   - On supported devices, use the "Share" button

4. **Access History**
   - Click the history icon to view previously generated QR codes
   - Click on any history item to restore it
   - Remove unwanted items with the delete button

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [ShadCN UI](https://ui.shadcn.com/) for the beautiful component designs
- [QRCode.js](https://github.com/soldair/node-qrcode) for the QR code generation functionality

---

<p align="center">
  Made with ❤️ by <a href="https://ruslanbelyy.com/">Ruslan Belyy</a>
</p>