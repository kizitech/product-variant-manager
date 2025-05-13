# Product Variant Manager

![React](https://img.shields.io/badge/React-18.2.0-61DAFB.svg?logo=react&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?logo=next.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4.17-06B6D4?logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-3178C6.svg?logo=typescript&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-5.17.19-FF4154.svg?logo=react-query&logoColor=white)

A responsive product and variant manager inspired by Shopify's clean interface. This application allows users to manage products and their variants with a modern, intuitive UI.

![Product Variant Manager Demo](/public/screenshots/product-list.png)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Live Demo](#live-demo)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Code Quality](#code-quality)
- [Performance Optimizations](#performance-optimizations)
- [Screenshots](#screenshots)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Core Functionality
- **Product Management**
  - Add new products with name and description
  - Edit existing product details
  - Delete products with confirmation
  
- **Variant Management**
  - Add multiple variants to each product (size, color, price)
  - Edit variant details
  - Delete variants with confirmation
  
- **User Experience**
  - Clean, responsive UI that works on mobile, tablet, and desktop
  - Form validation with helpful error messages
  - Toast notifications for user feedback
  - Confirmation dialogs for destructive actions

### Technical Features
- Persistent data storage using localStorage
- Optimistic UI updates for a snappy feel
- Form validation using Zod schema validation
- Responsive design using Tailwind CSS
- Accessible UI components

## 🛠️ Tech Stack

### Core Technologies
- **React 18**: For building the user interface
- **TypeScript**: For type safety and better developer experience
- **React Router**: For navigation between pages
- **TanStack Query (React Query)**: For data fetching, caching, and state management
- **React Hook Form**: For form state management and validation
- **Zod**: For schema validation
- **Shadcn UI**: For UI components and styling
- **Tailwind CSS**: For utility-first styling
- **Lucide React**: For icons

### Development Tools
- **ESLint**: For code linting
- **Prettier**: For code formatting
- **React Query DevTools**: For debugging queries and cache

## 🌐 Live Demo

[View Live Demo](https://product-variant-manager-demo.vercel.app)

## 📥 Installation

Follow these steps to set up the project locally:

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/kizitech/product-variant-manager.git
   cd product-variant-manager
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Start the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open your browser**
   The application will be available at [http://localhost:3000](http://localhost:3000)

## 🚀 Usage

### Adding a Product
1. Click the "Add Product" button
2. Fill in the product name and optional description
3. Click "Add Product" to save

### Managing Variants
1. Navigate to a product card
2. Click "Add Variant" to add a new variant
3. Fill in the size, color, and price
4. Click "Add Variant" to save
5. Use the edit and delete icons to manage existing variants

### Editing Products
1. Click the edit icon on a product card
2. Update the product details
3. Click "Save Changes" to update

## 🧪 Code Quality

### TypeScript
- Strict type checking enabled
- Interfaces for all data models
- Type safety throughout the application

### State Management
- React Query for server state management
- Local React state for UI state
- Optimistic updates for better UX

### Component Design
- Reusable, modular components
- Clear separation of concerns
- Consistent props and naming conventions

### Form Handling
- Zod schema validation
- React Hook Form for form state
- Consistent error handling and display

## ⚡ Performance Optimizations

- **React Query Caching**: Minimizes unnecessary data fetching
- **Optimistic Updates**: Updates UI before server response for a snappy feel
- **Code Splitting**: Components are loaded only when needed
- **Memoization**: Used where appropriate to prevent unnecessary re-renders
- **Tailwind CSS**: Only includes the CSS that's actually used

## 📸 Screenshots

### Desktop View
![Desktop View](/public/screenshots/desktop-view.png)

### Mobile View
![Mobile View](/public/screenshots/mobile-view.jpg)

### Product List
![Product List](/public/screenshots/product-list.png)

### Add Product Dialog
![Add Product](/public/screenshots/add-product.png)

### Add Variant Dialog
![Add Product](/public/screenshots/add-variant.png)

### Product with Variants
![Product with Variants](/public/screenshots/product-variants.png)

### Edit Variant Dialog
![Edit Variant](/public/screenshots/edit-variant.png)


## 🔮 Future Enhancements

- **API Integration**: Connect to a real backend API
- **Search and Filters**: Add ability to search and filter products/variants
- **Image Upload**: Allow users to upload product images
- **Inventory Management**: Track stock levels for variants
- **User Authentication**: Add user accounts and permissions
- **Dark Mode**: Implement theme switching
- **Export/Import**: Allow data export and import

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


Built with ❤️ by Kizito Ohani 
