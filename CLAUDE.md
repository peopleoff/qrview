# QR View - Dev Commands & Style Guide

## Build/Dev Commands
```bash
# Development
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run generate   # Generate static site
```

## Code Style Guidelines

### Component Structure
- Use Vue 3 Composition API with `<script setup>` and TypeScript
- Follow ShadCN component conventions
- Maintain clear separation between UI and logic

### TypeScript
- Use explicit types; avoid `any`
- Leverage interface/type for component props
- Use `defineProps<>()` and `defineEmits<>()` in components

### Naming Conventions
- Components: PascalCase
- Functions/variables: camelCase
- CSS classes: Use utility-first Tailwind, combine with `cn()` utility
- Files: kebab-case

### Formatting & Imports
- Use aliases defined in components.json (@/components, @/lib, etc.)
- Group imports by type (Vue, third-party, local)
- Use the `cn()` utility for combining Tailwind classes

### Error Handling
- Use try/catch for async operations
- Provide meaningful error messages