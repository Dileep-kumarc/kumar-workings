# EcoTown Health Dashboard

## 🏥 Project Overview

The EcoTown Health Dashboard is a comprehensive, mobile-responsive healthcare analytics platform designed for healthcare professionals to visualize, analyze, and interpret patient biomarker data. Built as part of the EcoTown Health Tech Internship Assignment, this dashboard transforms real patient health reports into actionable clinical insights.

### 📋 Real Patient Data Integration

**Data extracted from authentic patient PDF reports:**
- **Patient**: MR. MANJUNATH SWAMY, 56Y Male
- **Report ID**: KAL5954
- **Source Reports**: 
  - `MR. MANJUNATH SWAMY_56Y`
  - `1726238851863_compressed`
  - `Report_AD231201100076582949`

### 🎯 Key Objectives

- **Real Data Processing**: Extract structured biomarker data from actual patient reports
- **Interactive Visualization**: Multi-series time series charts with clinical range indicators
- **Healthcare Standards**: Proper clinical ranges and medical interpretations
- **Mobile-First Design**: Responsive UI optimized for healthcare professionals
- **AI-Powered Insights**: Intelligent health recommendations and risk assessments

## 🚀 Technology Stack

### Frontend Framework
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework

### UI Components
- **shadcn/ui** - Modern, accessible component library
- **Radix UI** - Headless UI primitives
- **Lucide React** - Medical-grade icon library

### Data Visualization
- **Recharts** - Interactive charting with clinical annotations
- **Custom Chart Components** - Enhanced with medical reference ranges
- **Mobile-Responsive Charts** - Touch-optimized for tablets and phones

### Additional Libraries
- **html2canvas** - Chart export functionality
- **jsPDF** - Professional report generation
- **react-dropzone** - Medical report upload interface

## 📱 Design Guidelines

### Medical Theme Implementation
- **Primary Colors**: Medical blue (#3b82f6), Clinical green (#10b981), Alert red (#ef4444)
- **Background**: Clean white with subtle blue gradients
- **Typography**: Professional, readable fonts optimized for clinical data
- **Cards**: Rounded corners, subtle shadows, medical-grade spacing

### Mobile Responsiveness
- **Breakpoints**: Mobile-first approach (320px+, 768px+, 1024px+)
- **Touch Targets**: Minimum 44px for healthcare professional use
- **Navigation**: Collapsible mobile menu with quick stats
- **Charts**: Responsive with touch-friendly zoom and pan

### Component Structure
```
├── Mobile-Responsive Header
├── Summary Statistics Cards
├── Tabbed Navigation
│   ├── Overview (Biomarker Cards)
│   ├── Time Series Charts
│   ├── AI Health Insights
│   ├── Action Plan
│   └── Clinical Guide
└── Export & Upload Functions
```

## 📊 Features & Functionality

### 🔬 Real Biomarker Analysis
- **Complete Blood Count**: Hemoglobin, RBC, WBC with clinical ranges
- **Lipid Profile**: Total/HDL/LDL Cholesterol, Triglycerides
- **Kidney Function**: Creatinine monitoring
- **Vitamins**: D, B12 levels with deficiency tracking
- **Diabetes Markers**: HbA1c with prediabetes alerts

### 📈 Interactive Time Series Visualization
- **Multi-Series Charts**: Compare multiple biomarkers simultaneously
- **Clinical Range Indicators**: Visual zones for normal/abnormal values
- **Interactive Tooltips**: Detailed values with clinical status
- **Zoom & Pan**: Touch-friendly detailed analysis
- **Export Options**: PNG and PDF for clinical documentation

### 🤖 AI-Powered Health Insights
- **Dynamic Health Score**: Algorithm-based assessment (currently 70%)
- **Risk Factor Detection**: Automated identification of health risks
- **Trend Analysis**: Improvement/decline pattern recognition
- **Personalized Recommendations**: Evidence-based clinical advice

### 📱 Mobile-First Design
- **Responsive Layout**: Optimized for phones, tablets, and desktops
- **Touch Navigation**: Swipe-friendly chart interactions
- **Collapsible Menus**: Space-efficient mobile interface
- **Quick Stats**: At-a-glance health overview on mobile

## 🏥 Clinical Accuracy

### Biomarker Reference Ranges
- **Hemoglobin**: 13.0-17.0 g/dL (Male)
- **HDL Cholesterol**: ≥40 mg/dL (Male) - **ALERT: Patient at 39 mg/dL**
- **HbA1c**: <5.7% Normal - **ALERT: Patient at 5.8% (Prediabetic)**
- **Creatinine**: 0.7-1.18 mg/dL - **ALERT: Patient at 1.19 mg/dL**
- **Triglycerides**: <150 mg/dL - **ALERT: Patient at 174 mg/dL**

### Clinical Interpretations
- Evidence-based reference ranges
- Age and gender-specific normal values
- Trend analysis with clinical significance
- Risk stratification algorithms

## 🚀 Startup MVP Approach

### Core Features Prioritized
1. **Essential Biomarkers**: Focus on most clinically relevant markers
2. **Mobile Responsiveness**: Healthcare professionals use mobile devices
3. **Real Data Integration**: Authentic patient data for credibility
4. **Export Functionality**: Clinical documentation requirements
5. **AI Insights**: Value-added intelligence for decision support

### Rapid Development with AI Tools
- **v0 by Vercel**: Component generation and rapid prototyping
- **shadcn/ui**: Pre-built, accessible components
- **Tailwind CSS**: Rapid styling and responsive design
- **TypeScript**: Type safety for medical data integrity

## 📋 Installation & Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Quick Start
```bash
# Clone repository
git clone https://github.com/your-username/ecotown-health-dashboard.git
cd ecotown-health-dashboard

# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
http://localhost:3000
```

### Production Deployment
```bash
# Build for production
npm run build

# Deploy to Vercel (recommended)
vercel --prod
```

## 📊 Evaluation Criteria Alignment

### Technical Implementation (40%)
- ✅ **Accurate Charts**: Real patient data with proper clinical ranges
- ✅ **Clean Code**: TypeScript, modular components, proper error handling
- ✅ **Deployment Ready**: Optimized for Vercel production deployment

### Healthcare Domain Knowledge (25%)
- ✅ **Correct Biomarker Ranges**: Evidence-based clinical reference values
- ✅ **Intuitive Design**: Healthcare professional-focused UX/UI
- ✅ **Clinical Significance**: Proper medical interpretations and alerts

### Startup Mindset (20%)
- ✅ **MVP Focus**: Essential features prioritized for immediate value
- ✅ **AI Tool Usage**: Leveraged v0, shadcn/ui for rapid development
- ✅ **Problem-Solution Fit**: Addresses real healthcare data visualization needs

### Communication (15%)
- ✅ **Demo-Ready**: Professional presentation with real patient data
- ✅ **Clear Documentation**: Comprehensive setup and usage instructions
- ✅ **Component Structure**: Well-organized, maintainable codebase

## 🎯 Key Differentiators

1. **Real Patient Data**: Authentic biomarker values from actual medical reports
2. **Mobile-First Healthcare**: Optimized for clinical workflow on mobile devices
3. **AI-Powered Insights**: Intelligent risk assessment and recommendations
4. **Clinical Accuracy**: Evidence-based reference ranges and interpretations
5. **Export Functionality**: Professional reporting for clinical documentation

## 🔮 Future Enhancements

- **Multi-Patient Dashboard**: Manage multiple patient records
- **Integration APIs**: Connect with EMR systems and lab interfaces
- **Advanced Analytics**: Machine learning for predictive health insights
- **Telemedicine Integration**: Remote patient monitoring capabilities
- **Clinical Decision Support**: Evidence-based treatment recommendations

---

**Built with ❤️ for healthcare professionals using cutting-edge AI development tools**

## 🚀 Replit Deployment Guide

### 1. **Fork or Import the Project**
- [Fork this repo on GitHub](https://github.com/Dileep-kumarc/biomarker-insight-dashboard.git) or import it directly into [Replit](https://replit.com/).

### 2. **Project Structure**
- **FastAPI backend**: `main.py` (Python)
- **Next.js frontend**: `/app` directory (Node.js)
- **requirements.txt**: Python dependencies
- **package.json**: Node.js dependencies

### 3. **Install Dependencies**
- In the Replit Shell, run:
  ```bash
  pip install -r requirements.txt
  npm install
  ```

### 4. **Environment Variables**
- Use the Replit Secrets tab to add these (see `.env.example`):
  - `SECRET_KEY`
  - `ALLOWED_ORIGINS` (e.g., `https://<your-replit-username>.<your-replit-project>.repl.co`)
  - `NEXT_PUBLIC_API_URL` (e.g., `https://<your-replit-username>.<your-replit-project>.repl.co`)

### 5. **CORS Setup**
- The backend (`main.py`) uses CORS and will read allowed origins from `ALLOWED_ORIGINS`.
- Make sure your frontend and backend URLs are included.

### 6. **Running Both Servers**
- **Option 1: Two Shell Tabs**
  - Tab 1: Run FastAPI backend
    ```bash
    uvicorn main:app --host=0.0.0.0 --port=8000
    ```
  - Tab 2: Run Next.js frontend
    ```bash
    npm run dev -- --port 3000
    ```
- **Option 2: Use `concurrently`**
  - Install concurrently:
    ```bash
    npm install concurrently --save-dev
    ```
  - Add to `package.json` scripts:
    ```json
    "dev:all": "concurrently \"uvicorn main:app --host=0.0.0.0 --port=8000\" \"next dev -p 3000\""
    ```
  - Run both:
    ```bash
    npm run dev:all
    ```

### 7. **.replit File Example**
```toml
run = "uvicorn main:app --host=0.0.0.0 --port=8000"
language = "python3"
entrypoint = "main.py"
```
- For Next.js, use a second shell tab.

### 8. **Accessing the App**
- **Backend (FastAPI):** `https://<your-replit-username>.<your-replit-project>.repl.co/docs`
- **Frontend (Next.js):** `https://<your-replit-username>.<your-replit-project>.repl.co` (if using Replit's webview, or port 3000 if running locally)

### 9. **Static Files**
- All static assets (charts, images, etc.) should be in `/public` for Next.js.
- If your backend serves files, ensure the URLs are correct and accessible.

### 10. **Production Tips**
- Use Replit Secrets for all sensitive environment variables.
- Make sure CORS is set up for your deployed Replit URL.
- For best results, run backend and frontend in separate tabs or use a process manager.

---

## 📦 Other Deployment Options
- [Vercel (for Next.js)](https://vercel.com/)
- [Railway (for FastAPI)](https://railway.app/)
- [Render, Fly.io, etc.]

---

## 📝 For more details, see the full documentation in `DEPLOYMENT.md` and `TECHNICAL.md`.

---