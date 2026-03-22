# NutriMind AI - Diet Control System

A comprehensive AI-powered diet control and health management application built with Next.js, TypeScript, and Google Gemini AI. Get personalized nutrition plans, lifestyle advice, and health insights tailored to your unique profile.

## 🌟 Features

### Core Functionality

- **Personalized Health Profile Input**: Capture essential health details including:
  - Basic info (age, gender, height, weight)
  - Activity level and fitness goals
  - Existing diseases and medical conditions
  - Food preferences and allergies
  - Sleep patterns

- **Dynamic Health Metrics**: Automatically calculates:
  - Body Mass Index (BMI)
  - Daily calorie requirements
  - Health status classification

- **AI-Powered Diet Plan Tool**: Generates customized day-long meal plans featuring:
  - Breakfast, mid-morning snack, lunch, evening snack, dinner
  - Tailored to dietary preferences, allergies, and fitness goals
  - Medical condition considerations

- **AI Lifestyle & Hydration Advice**: Provides personalized recommendations for:
  - Daily hydration intake
  - Sleep quality improvements
  - Practical health tips

- **Comprehensive Health Report**: Displays structured summaries including:
  - BMI results and classification
  - Daily calorie goals
  - Personalized diet plans
  - Foods to avoid list
  - Actionable lifestyle tips

## 🛠 Tech Stack

- **Framework**: [Next.js 15.5.9](https://nextjs.org/) with Turbopack
- **Language**: TypeScript 5
- **UI Components**: Radix UI with custom Tailwind CSS styling
- **Styling**: Tailwind CSS 3.4.1
- **Forms**: React Hook Form + Zod validation
- **AI/ML**: Google Genkit with Gemini 2.5 Flash model
- **Database**: Firebase
- **Icons**: Lucide React
- **Charts**: Recharts
- **Runtime**: Node.js

## 📋 Prerequisites

Before you begin, ensure you have installed:

- **Node.js**: v18.x or higher (v20.x recommended)
- **npm**: v9.x or higher (or yarn/pnpm if preferred)
- **Git**: For version control

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/diet-control-system.git
cd diet-control-system-main
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required dependencies listed in `package.json`, including:
- Next.js and React
- Genkit AI framework
- Radix UI components
- Tailwind CSS
- Firebase
- And all other necessary packages

### 3. Environment Configuration

Create a `.env` file in the project root with the following variables:

```env
# Google Gemini API Configuration
GEMINI_API_KEY=your_gemini_api_key_here

# Firebase Configuration (if using Firebase backend)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
```

#### Getting API Keys

**Google Gemini API Key:**
1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create a new API key
3. Copy and paste it into your `.env` file as `GEMINI_API_KEY`

**Firebase Configuration (Optional):**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Go to Project Settings
4. Copy your configuration values

## 📝 Available Scripts

### Development

```bash
# Start the development server (runs on port 9002)
npm run dev

# Start Genkit AI development server
npm run genkit:dev

# Start Genkit with watch mode for hot reloading
npm run genkit:watch
```

Visit `http://localhost:9002` in your browser to see the application.

### Build & Production

```bash
# Build for production
npm run build

# Start the production server
npm start
```

### Code Quality

```bash
# Run linting
npm run lint

# Type-check TypeScript without emitting files
npm run typecheck
```

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx           # Root layout component
│   ├── page.tsx             # Main application page
│   ├── globals.css          # Global styles
│   └── lib/
│       └── health-utils.ts  # Health calculation utilities
├── ai/
│   ├── genkit.ts           # Genkit AI configuration
│   ├── dev.ts              # Development server setup
│   └── flows/
│       ├── personalized-diet-plan-flow.ts      # Diet plan generation
│       └── lifestyle-and-hydration-advice.ts   # Lifestyle recommendations
├── components/
│   ├── HealthProfileForm.tsx    # User input form
│   ├── ReportDisplay.tsx        # Results display component
│   └── ui/                       # Radix UI components (pre-built)
├── hooks/
│   ├── use-mobile.tsx           # Mobile detection hook
│   └── use-toast.ts             # Toast notifications hook
└── lib/
    ├── utils.ts                 # General utility functions
    ├── placeholder-images.ts    # Image utilities
    └── placeholder-images.json  # Image data
```

## 🎨 Design Guidelines

### Color Palette
- **Primary**: Forest Green (#33734C) - Key UI elements and CTAs
- **Background**: Off-white Green (#ECF7F0) - Main canvas
- **Accent**: Lime Green (#A1E029) - Highlights and interactive elements

### Typography
- **Font**: Inter (sans-serif) - Modern, clear, objective aesthetic
- **Usage**: Headlines and body text with excellent readability

### UI Elements
- Clean, modern, line-based icons
- Responsive grid-based layout
- Ample whitespace for reduced cognitive load
- Subtle, smooth transitions and hover effects

## 🤖 AI Features

### Personalized Diet Plan Generation

The system uses Google Gemini AI to create customized meal plans that consider:
- User's dietary preferences (Vegetarian, Non-Vegetarian, Vegan)
- Food allergies and restrictions
- Existing medical conditions
- Fitness goals
- Daily calorie requirements

**Flow**: `src/ai/flows/personalized-diet-plan-flow.ts`

### Lifestyle & Hydration Advice

AI-powered recommendations including:
- Optimal daily water intake calculation
- Sleep quality improvement tips
- Activity-based lifestyle suggestions
- Health optimization strategies

**Flow**: `src/ai/flows/lifestyle-and-hydration-advice.ts`

## ⚙️ Configuration

### Next.js Configuration
- **Port**: Development server runs on port 9002 (configured in `package.json`)
- **Build Tool**: Turbopack enabled for faster builds
- **Environment Detection**: Automatic `.env` file detection

### TypeScript
- Strict mode enabled
- React 19 and Next.js 15 type definitions included
- Full type safety across the application

### Tailwind CSS
- Version 3.4.1
- PostCSS configured for processing
- Custom theme colors based on design guidelines

## 🔧 Troubleshooting

### Issue: "GEMINI_API_KEY not found" Error

**Solution**: Ensure your `.env` file contains the correct API key variable name:
```env
GEMINI_API_KEY=your_key_here
```

Note: The variable must be named `GEMINI_API_KEY` (not `GEMINI_API`).

### Issue: "cross-env: command not found"

**Solution**: Reinstall dependencies:
```bash
npm install
```

Ensure `cross-env` is installed in devDependencies.

### Issue: Port 9002 Already in Use

**Solution**: Either stop the process using the port or run on a different port:
```bash
npm run dev -- -p 3000
```

### Issue: Build Fails with TypeScript Errors

**Solution**: Run type checking to identify issues:
```bash
npm run typecheck
```

Then fix the reported type errors in your code.

### Issue: Slow Initial Load

**Solution**: This is normal for Genkit's first initialization. Subsequent requests will be faster. Ensure your Gemini API quota is sufficient.

## 📦 Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| next | 15.5.9 | React framework |
| react | 19.2.1 | UI library |
| typescript | 5 | Type safety |
| genkit | 1.28.0 | AI orchestration |
| @genkit-ai/google-genai | 1.28.0 | Gemini integration |
| tailwindcss | 3.4.1 | Styling |
| @radix-ui/* | Latest | UI components |
| firebase | 11.9.1 | Backend services |
| zod | 3.24.2 | Schema validation |
| react-hook-form | 7.54.2 | Form management |

## 📚 Documentation References

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Genkit Documentation](https://genkit.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Radix UI Components](https://www.radix-ui.com/)
- [Firebase Documentation](https://firebase.google.com/docs)

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Sign up at [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel dashboard
5. Deploy

### Deploy to Other Platforms

The project can be deployed to any Node.js hosting platform:
- AWS (Amplify, EC2)
- Google Cloud (App Engine, Cloud Run)
- Heroku
- DigitalOcean
- Azure App Service

Run `npm run build` before deployment to generate the production build.

## 🤝 Contributing

1. Create a new branch for your feature
2. Make your changes
3. Ensure `npm run typecheck` and `npm run lint` pass
4. Commit and push
5. Open a pull request

## 📄 License

[Your License Here]

## 💡 Tips for Development

- Use `npm run genkit:watch` while developing AI flows for hot reloading
- Check browser DevTools for component debugging
- Utilize TypeScript's type hints for better DX
- Test responsive design using Chrome DevTools device emulation
- Monitor API quota usage in Google AI Studio

## 🆘 Support

For issues and questions:
1. Check the Troubleshooting section above
2. Review [Genkit Documentation](https://genkit.dev/docs)
3. Check [Next.js Documentation](https://nextjs.org/docs)
4. Open an GitHub issue with detailed information

---

**Happy coding!** 🚀 Start building personalized nutrition plans with AI today!
