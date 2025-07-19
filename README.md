# Space2Heaven - Interior Design Solutions

Space2Heaven is a modern, responsive website for an interior design business, built with Next.js, TypeScript, and TailwindCSS. The site features a clean, professional design with a range of interactive components and beautiful animations.

![Space2Heaven](/public/hero-1.jpg)

## 🚀 Features

- **Responsive Design**: Fully responsive interface that works across all devices
- **Modern UI Components**: Built with a comprehensive UI component library 
- **Dark/Light Mode**: Theme toggle for user preference
- **Interactive Elements**:
  - Banner slider with auto-advance
  - Before/After image comparison slider
  - Cost calculator for design projects
  - Testimonials carousel
  - Portfolio gallery
- **Performance Optimized**: Fast page loads and smooth transitions
- **Accessibility**: Built with a11y best practices

## 📚 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with React 19
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **Components**: Custom UI components with [Radix UI](https://www.radix-ui.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📂 Project Structure

```
interior.Space2Heaven/
├── app/                  # Next.js app directory
│   ├── about/            # About page
│   ├── blog/             # Blog page
│   ├── contact/          # Contact page  
│   ├── portfolio/        # Portfolio page
│   ├── pricing/          # Pricing page
│   ├── services/         # Services page
│   ├── globals.css       # Global CSS
│   ├── layout.tsx        # Root layout component
│   └── page.tsx          # Homepage component
├── components/           # React components
│   ├── ui/               # UI components library
│   ├── banner-slider.tsx # Hero banner slider
│   ├── before-after-slider.tsx # Before/after comparison
│   ├── contact-cta.tsx   # Contact call-to-action
│   ├── cost-calculator.tsx # Project cost calculator
│   ├── footer.tsx        # Site footer
│   ├── header.tsx        # Site header/navigation
│   └── ...               # Other components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static files
│   └── ...               # Images and other assets
├── styles/               # Additional styles
├── next.config.mjs       # Next.js configuration
├── package.json          # Project dependencies
├── tsconfig.json         # TypeScript configuration
└── tailwind.config.ts    # Tailwind CSS configuration
```

## 🔧 Installation & Setup

### Prerequisites

- Node.js 18+ 
- PNPM package manager

### Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Shaikhmohddanish/interior.Space2Heaven.git
   cd interior.Space2Heaven
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run the development server:
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🧠 Key Components

### Banner Slider
A responsive hero section with auto-advancing slides featuring the company's key services and value propositions.

### Services Showcase
Displays the different interior design services with beautiful imagery and descriptions.

### Before-After Slider
Interactive component allowing users to compare spaces before and after renovation.

### Cost Calculator
Interactive tool for potential clients to estimate project costs based on space type, square footage, and design package.

### Portfolio Gallery
Showcases the company's previous work with filterable categories.

### Testimonials
Client testimonials displayed in a responsive carousel format.

## 🌐 Pages

- **Home**: Main landing page with overview of services and features
- **About**: Company history, team, and values
- **Services**: Detailed description of design services
- **Portfolio**: Gallery of completed projects
- **Contact**: Contact form and information
- **Blog**: Company blog and articles (placeholder)
- **Pricing**: Service pricing information (placeholder)

## 🎨 Theming & Styling

The project uses TailwindCSS for styling with a custom theme configuration that supports both light and dark modes. The UI is built on a collection of reusable components from the components/ui directory, which provides consistent styling across the application.

## 📱 Responsive Design

The site is fully responsive with specific optimizations for:
- Mobile devices
- Tablets
- Desktops
- Large screens

Custom hooks like `useMediaQuery` are used to adapt components based on screen size.

## 🚀 Deployment

The site can be deployed to any platform that supports Next.js applications:

1. Build the production version:
   ```bash
   pnpm build
   ```

2. Start the production server:
   ```bash
   pnpm start
   ```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

For questions or support, please contact:
- Email: Hello@space2heaven.com
- Phone: +91 897 651 1551 or +91 828 698 4597