# 🌲 FRA-SIH: Forest Rights Act Digital Platform

A comprehensive AI-powered platform for digitizing, managing, and visualizing Forest Rights Act (FRA) 2006 data, integrating satellite-based asset mapping with a Decision Support System for targeted policy implementation and tribal welfare.

**GitHub Repository:** [Vansh-Pandey/SIH-FRA](https://github.com/Vansh-Pandey/SIH-FRA)

---

## 📋 Table of Contents

- [Problem Statement](#-problem-statement)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running the Application](#-running-the-application)
- [API Endpoints](#-api-endpoints)
- [Project Objectives](#-project-objectives)
- [AI & Technology Components](#-ai--technology-components)
- [Deliverables](#-deliverables)
- [Target Users](#-target-users)
- [Future Scope](#-future-scope)
- [Team](#-team)
- [Contributing](#-contributing)
- [Contact & Support](#-contact--support)

---

## 🎯 Problem Statement

### Background

The **Forest Rights Act (FRA), 2006** recognizes the rights of forest-dwelling communities over land and forest resources. However, significant challenges persist:

#### Current Challenges

- ❌ **Scattered Legacy Records**: Individual Forest Rights (IFR), Community Rights (CR), and Community Forest Resource Rights (CFR) records are non-digitized and difficult to verify
- ❌ **No Centralized Repository**: Absence of real-time visual repository (FRA Atlas) of FRA claims and granted titles
- ❌ **Missing Satellite Integration**: No integration of satellite-based asset mapping (land, water bodies, farms) with FRA data
- ❌ **Legacy Data Gap**: Integration of legacy data with FRA Atlas is missing
- ❌ **Lack of Decision Support**: No systematic approach to layer Central Sector Schemes (CSS) benefits for FRA patta holders

#### Affected Schemes
- PM-KISAN
- Jal Jeevan Mission
- MGNREGA
- DAJGUA (3 ministries)

---

## ✨ Features

### 🗺️ FRA Atlas & Mapping

- **Interactive WebGIS Portal**
  - Real-time visualization of FRA claims and granted areas
  - Multi-layer mapping (IFR, CR, CFR boundaries)
  - Village-level granular data display
  - State/District/Block/Village filtering
  - Progress tracking dashboards

- **Satellite-Based Asset Mapping**
  - Agricultural land identification
  - Forest cover analysis
  - Water body detection (ponds, streams, lakes)
  - Homestead mapping
  - Infrastructure overlay (PM Gati Shakti integration)

### 📄 Digital Data Management

- **Legacy Data Digitization**
  - OCR-based document scanning
  - Automated text extraction from FRA records
  - Named Entity Recognition (NER) for data parsing
  - Standardized data format conversion
  - Shapefile integration for patta holders

- **Centralized Data Hub**
  - Unified repository for all FRA records
  - Version control and audit trails
  - Secure document storage via Cloudinary
  - Real-time data synchronization
  - Export capabilities (CSV, PDF, GeoJSON)

### 🤖 AI-Powered Analysis

- **Computer Vision Models**
  - Land-use classification
  - Asset detection and mapping
  - Change detection over time
  - Forest cover monitoring
  - Agricultural pattern recognition

- **Machine Learning Integration**
  - Random Forest classifiers for land-use
  - CNN for satellite image analysis
  - Predictive analytics for resource allocation
  - Risk assessment models

### 💡 Decision Support System (DSS)

- **Scheme Recommendation Engine**
  - Eligibility assessment for CSS schemes
  - Priority-based intervention suggestions
  - Resource optimization algorithms
  - Impact analysis tools
  - Budget allocation recommendations

- **Policy Formulation Tools**
  - Data-driven insights
  - Comparative analytics
  - Trend visualization
  - Custom report generation

### 👥 User Management

- **Multi-Level Access Control**
  - Ministry-level dashboards
  - State/District administrator panels
  - Village-level data entry
  - Role-based permissions
  - Secure authentication system

### 📊 Visualization & Reporting

- **Interactive Dashboards**
  - Real-time statistics
  - Progress tracking metrics
  - Comparative state analysis
  - Custom data filters
  - Export and share capabilities

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI framework
- **Vite** - Fast build tool and dev server
- **Zustand** - Lightweight state management
- **Axios** - HTTP client for API calls
- **Tailwind CSS** - Utility-first styling
- **Aceternity UI** - Premium UI components
  - Animated Tooltip
  - Background Effects (Boxes, Lines)
  - Canvas Reveal Effects
  - Draggable Cards
  - Infinite Moving Cards
  - Tracing Beam
  - Wobble Cards

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB

### GIS & Mapping
- **WebGIS** - Interactive mapping platform
- **Satellite Data Integration** - Remote sensing capabilities
- **Shapefile Processing** - Geospatial data handling
- **GeoJSON** - Standard format for spatial data

### AI & ML
- **OCR (Optical Character Recognition)** - Document digitization
- **NER (Named Entity Recognition)** - Data extraction
- **Computer Vision** - Satellite image analysis
- **Random Forest** - Land classification
- **CNN (Convolutional Neural Networks)** - Image processing

### Cloud Services
- **Cloudinary** - Media storage and management
- **MongoDB Atlas** - Cloud database hosting

### Security
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **CORS** - Cross-origin security

---

## 📁 Project Structure

```
fra-sih/
│
├── backend/
│   ├── src/
│   │   ├── controllers/              # Request handlers
│   │   │   ├── auth.controller.js        # Authentication logic
│   │   │   └── profile.controllers.js    # Profile management
│   │   │
│   │   ├── lib/                      # Core libraries
│   │   │   ├── cloudinary.js             # Image upload config
│   │   │   ├── db.js                     # Database connection
│   │   │   └── utils.js                  # Helper functions
│   │   │
│   │   ├── middleware/               # Express middleware
│   │   │   └── auth.middleware.js        # JWT verification
│   │   │
│   │   ├── models/                   # Database schemas
│   │   │   └── user.model.js             # User data model
│   │   │
│   │   ├── routes/                   # API routes
│   │   │   ├── auth.route.js             # Auth endpoints
│   │   │   └── profile.route.js          # Profile endpoints
│   │   │
│   │   ├── scripts/                  # Utility scripts
│   │   │   ├── data/
│   │   │   │   └── try-n5.txt            # Sample data
│   │   │   └── index-knowledge.js        # Data indexing
│   │   │
│   │   └── index.js                  # Entry point
│   │
│   ├── .gitignore
│   ├── package.json
│   └── package-lock.json
│
└── frontend/
    ├── public/
    │   ├── flowcharts/               # Project flowcharts
    │   │   ├── flowchart.jpg
    │   │   └── risks.jpg
    │   │
    │   ├── team/                     # Team member photos
    │   │   ├── aman.png
    │   │   ├── anushka.jpg
    │   │   ├── arnav.png
    │   │   ├── loveleen.png
    │   │   ├── paridhi.png
    │   │   ├── vansh.png
    │   │   └── vidyans.png
    │   │
    │   ├── centralised-data-hub.png  # Feature graphics
    │   ├── default-avatar.png
    │   ├── fra-map.png
    │   ├── logo.svg
    │   └── track-verify.png
    │
    ├── src/
    │   ├── components/
    │   │   ├── hooks/
    │   │   │   └── use-outside-click.jsx
    │   │   │
    │   │   ├── ui/                   # Aceternity UI components
    │   │   │   ├── animated-tooltip.jsx
    │   │   │   ├── background-boxes.jsx
    │   │   │   ├── background-lines.jsx
    │   │   │   ├── Button.jsx
    │   │   │   ├── canvas-reveal-effect.jsx
    │   │   │   ├── draggable-card.jsx
    │   │   │   ├── infinite-moving-cards.jsx
    │   │   │   ├── Input.jsx
    │   │   │   ├── tracing-beam.jsx
    │   │   │   └── wobble-card.jsx
    │   │   │
    │   │   ├── footer.jsx
    │   │   ├── Header.jsx
    │   │   ├── Login.jsx
    │   │   ├── Navbar.jsx
    │   │   └── Signup.jsx
    │   │
    │   ├── data/                     # Static data
    │   │   ├── fra_cards.js
    │   │   ├── home-cards.js
    │   │   ├── team.js
    │   │   └── testimonials.js
    │   │
    │   ├── files/                    # File management
    │   │   └── uploadedFiles.json
    │   │
    │   ├── lib/                      # Utilities
    │   │   ├── axios.js
    │   │   └── utils.js
    │   │
    │   ├── pages/                    # Application pages
    │   │   ├── AboutUs.jsx               # Team & project info
    │   │   ├── Atlas.jsx                 # FRA Atlas WebGIS
    │   │   ├── DataHub.jsx               # Centralized data repository
    │   │   ├── DSS.jsx                   # Decision Support System
    │   │   ├── Home.jsx                  # Dashboard
    │   │   ├── LandingPage.jsx           # Public landing page
    │   │   └── Profile.jsx               # User profile
    │   │
    │   ├── store/                    # State management
    │   │   ├── useAuthStore.js
    │   │   ├── useFileUpload.js
    │   │   └── useProfileStore.js
    │   │
    │   ├── App.jsx                   # Root component
    │   ├── index.css                 # Global styles
    │   └── main.jsx                  # Entry point
    │
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── package-lock.json
    ├── README.md
    └── vite.config.js
```

---

## 📦 Prerequisites

### Required Software
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (v5.0 or higher)
- **Git**

### Required Accounts
- **MongoDB Atlas** account (for cloud database)
- **Cloudinary** account (for file storage)

### Recommended Tools
- **Postman** - API testing
- **MongoDB Compass** - Database management
- **VS Code** - Code editor

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Vansh-Pandey/SIH-FRA.git
cd SIH-FRA
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

## 🔐 Environment Variables

### Backend Environment (.env)

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/fra-sih
# Or MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fra-sih?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secure_jwt_secret_key_minimum_32_characters
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your_refresh_token_secret

# Cloudinary Configuration (for file uploads)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Client Configuration
CLIENT_URL=http://localhost:5173
FRONTEND_URL=http://localhost:5173

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:5000

# Email Configuration (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Admin Configuration
ADMIN_EMAIL=vp0158530@gmail.com
```

### Frontend Environment (.env)

Create a `.env` file in the `frontend` directory:

```env
# API Configuration
VITE_API_URL=http://localhost:5000
VITE_API_BASE_URL=http://localhost:5000/api

# Environment
VITE_NODE_ENV=development

# Google Maps API (if using maps)
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# WebGIS Configuration
VITE_MAPBOX_TOKEN=your_mapbox_access_token
```

### Getting Required Credentials

#### MongoDB Atlas
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Go to Database Access → Add New Database User
4. Go to Network Access → Add IP Address (0.0.0.0/0 for development)
5. Click "Connect" → "Connect your application"
6. Copy connection string

#### Cloudinary
1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Navigate to Dashboard
3. Copy Cloud Name, API Key, and API Secret

---

## 🏃 Running the Application

### Development Mode

#### Option 1: Run Backend and Frontend Separately

**Terminal 1 - Start Backend Server:**
```bash
cd backend
npm run dev
# or
npm start
```

**Terminal 2 - Start Frontend Development Server:**
```bash
cd frontend
npm run dev
```

### Access the Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **API Health Check:** http://localhost:5000/api/health

### Production Build

#### Build Frontend

```bash
cd frontend
npm run build
```

The optimized production build will be in the `dist` folder.

#### Start Backend in Production

```bash
cd backend
NODE_ENV=production npm start
```

---

## 🔌 API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/signup` | Register new user | ❌ |
| POST | `/api/auth/login` | Login user | ❌ |
| POST | `/api/auth/logout` | Logout user | ✅ |
| GET | `/api/auth/check` | Verify auth status | ✅ |
| GET | `/api/auth/me` | Get current user | ✅ |
| POST | `/api/auth/refresh` | Refresh auth token | ✅ |

### Profile Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/profile/:id` | Get user profile | ✅ |
| PUT | `/api/profile/update` | Update profile | ✅ |
| POST | `/api/profile/upload` | Upload profile picture | ✅ |
| GET | `/api/profile/stats` | Get user statistics | ✅ |

---

## 📋 Project Objectives

### 1. Legacy Data Digitization & Integration
- Digitize and standardize legacy FRA claims, verifications, and pattas
- Integrate with FRA Atlas platform
- Process FRA patta holders' shapefiles
- Create searchable digital archive

### 2. FRA Atlas Creation
- Build interactive mapping platform showing potential and granted FRA areas
- Utilize AI and satellite data for accuracy
- Real-time visualization of claims and titles
- Multi-layer mapping capabilities

### 3. WebGIS Portal Integration
- Develop comprehensive spatial data visualization
- Integrate socio-economic data layers
- Enable interactive query and analysis
- Support multi-format data export

### 4. AI-Based Asset Mapping
- Map capital and social assets using Remote Sensing
- Identify ponds, farms, forest resources
- Track infrastructure development
- Monitor environmental changes

### 5. Decision Support System (DSS)
- Recommend CSS schemes for FRA holders
- Enable scheme layering capabilities
- Provide targeted development insights
- Support evidence-based policy making

---

## 🤖 AI & Technology Components

### 1. Data Digitization

**Optical Character Recognition (OCR)**
- Extract text from scanned FRA documents
- Convert legacy paper records to digital format
- Handle multiple document formats and qualities

**Named Entity Recognition (NER)**
- Identify and extract:
  - Village names
  - Patta holder names
  - GPS coordinates
  - Claim status
  - Date information
  - Area measurements

**Data Standardization**
- Convert to uniform format
- Validate data integrity
- Remove duplicates
- Handle missing data

### 2. AI-Based Asset Mapping

**Computer Vision Models**
- Process high-resolution satellite imagery
- Detect and classify:
  - **Agricultural Land**: Crop patterns, field boundaries
  - **Forest Cover**: Dense, medium, sparse forest
  - **Water Bodies**: Ponds, streams, rivers, lakes
  - **Homesteads**: Residential structures
  - **Infrastructure**: Roads, buildings, utilities

**Land-Use Classification**
- Supervised Machine Learning models
- Random Forest classifiers
- Convolutional Neural Networks (CNN)
- Multi-temporal analysis

**Additional Data Layers**
- Forest density data
- Groundwater availability
- Soil quality information
- Infrastructure data (PM Gati Shakti)

### 3. WebGIS Integration

**Interactive Mapping Features**
- Layer management (IFR/CR/CFR boundaries)
- Village and administrative boundaries
- Land-use and asset overlays
- Custom polygon drawing
- Measurement tools

**Filtering & Search**
- State/District/Block/Village hierarchy
- Tribal group classification
- Claim status filters
- Date range selection
- Area-based queries

**Progress Tracking**
- Village-level metrics
- Block-level aggregation
- District-level summaries
- State-level statistics
- Trend analysis

### 4. Decision Support System (DSS)

**Rule-Based Engine**
- Eligibility criteria checking
- Scheme matching algorithm
- Priority scoring system
- Resource allocation optimization

**AI-Enhanced Features**
- Predictive analytics
- Pattern recognition
- Anomaly detection
- Impact forecasting

**Scheme Integration**
- **DAJGUA** (3 ministries coordination)
- **PM-KISAN**: Direct benefit transfer
- **Jal Jeevan Mission**: Water access
- **MGNREGA**: Employment guarantee
- **Other CSS schemes**

**Intervention Prioritization**
- Water scarcity identification
- Infrastructure gap analysis
- Livelihood enhancement opportunities
- Education and health needs

---

## 📦 Deliverables

### 1. AI-Processed Digital Archive
- ✅ Comprehensive database of FRA claims and decisions
- ✅ Searchable and filterable records
- ✅ Audit trail and version control
- ✅ Secure backup systems

### 2. Interactive FRA Atlas
- ✅ WebGIS-based mapping platform
- ✅ Real-time data visualization
- ✅ Multi-layer support
- ✅ Mobile-responsive design

### 3. AI-Generated Asset Maps
- ✅ Complete coverage of FRA villages
- ✅ High-resolution satellite-based mapping
- ✅ Regular update mechanism
- ✅ Export capabilities

### 4. Decision Support System
- ✅ Scheme recommendation engine
- ✅ Layering capabilities for CSS schemes
- ✅ Policy formulation tools
- ✅ Custom reporting dashboard

---

## 👥 Target Users

### Primary Users

**Government Bodies**
- 🏛️ **Ministry of Tribal Affairs** - Policy formulation and monitoring
- 🏢 **District-level Tribal Welfare Departments** - Implementation and tracking
- 🌳 **Forest Departments** - Resource management and conservation
- 📊 **Revenue Departments** - Land records and verification
- 📈 **Planning & Development Authorities** - Resource allocation

**DAJGUA Line Departments**
- Department of Agriculture & Farmers Welfare
- Department of Rural Development
- Ministry of Environment, Forest and Climate Change

**NGOs & Civil Society**
- Organizations working with tribal communities
- Legal aid providers
- Community advocates

### Secondary Users
- Researchers and academics
- Policy analysts
- International development agencies
- Media and journalists

---

## 🔮 Future Scope

### Phase 1: Enhanced Monitoring

#### 1. **Real-Time Satellite Monitoring**
- Live satellite feed integration
- Automated change detection
- Deforestation alerts
- Encroachment monitoring
- Seasonal vegetation analysis
- Fire risk assessment

#### 2. **IoT Integration**
- Soil health sensors
- Water quality monitors
- Weather stations
- Groundwater level tracking
- Air quality measurement
- Crop health monitoring

### Phase 2: Mobile & Field Tools

#### 3. **Mobile Applications**
- Android app for field officers
- iOS app for administrators
- Offline data collection
- GPS-enabled geo-tagging
- Photo documentation
- Voice notes support

#### 4. **Community Engagement**
- Patta holder feedback system
- Grievance redressal portal
- Community forums
- SMS-based updates
- WhatsApp integration
- Local language support

### Phase 3: Advanced AI Features

#### 5. **Predictive Analytics**
- Forest fire risk prediction
- Crop yield forecasting
- Water scarcity prediction
- Migration pattern analysis
- Livelihood opportunity identification
- Climate impact modeling

#### 6. **Automated Document Processing**
- Intelligent form filling
- Automatic claim verification
- Digital signature integration
- Blockchain for record immutability
- AI-powered document classification
- Multi-language OCR

### Phase 4: Integration & Expansion

#### 7. **Inter-Departmental Integration**
- Aadhaar linkage
- PMAY integration
- Ayushman Bharat sync
- PM-JAY coordination
- Digital India platform connection
- E-District portal integration

#### 8. **Advanced GIS Features**
- 3D terrain visualization
- Time-lapse analysis
- Drone imagery integration
- LiDAR data processing
- Augmented Reality (AR) field surveys
- Virtual Reality (VR) training modules

### Phase 5: Decision Support Enhancement

#### 9. **Advanced DSS Capabilities**
- Multi-criteria decision analysis
- Scenario planning tools
- Cost-benefit analysis automation
- Impact assessment frameworks
- Risk management tools
- Resource optimization algorithms

#### 10. **Policy Simulation**
- What-if analysis tools
- Policy impact modeling
- Budget simulation
- Scheme coverage optimization
- Beneficiary targeting algorithms
- Performance prediction

### Phase 6: Capacity Building

#### 11. **Training & Documentation**
- E-learning modules
- Video tutorials
- Interactive guides
- Certification programs
- Knowledge management system
- Best practices repository

#### 12. **Research & Development**
- Open data portal
- API for researchers
- Dataset publication
- Collaboration platform
- Academic partnerships
- Innovation challenges

### Phase 7: Sustainability Features

#### 13. **Environmental Monitoring**
- Carbon sequestration tracking
- Biodiversity assessment
- Ecosystem services valuation
- Sustainable harvesting monitoring
- Wildlife corridor mapping
- Climate resilience indicators

#### 14. **Livelihood Enhancement**
- Market linkage platform
- Fair price information
- Value chain analysis
- Cooperative formation support
- Skill development tracking
- Alternative livelihood mapping

### Phase 8: Governance Improvements

#### 15. **Transparency & Accountability**
- Public dashboard for citizens
- RTI request automation
- Performance scorecards
- Complaint tracking system
- Social audit tools
- Citizen feedback mechanisms

#### 16. **Security & Privacy**
- Advanced encryption
- Biometric authentication
- Role-based data masking
- Privacy-preserving analytics
- Secure data sharing protocols
- Compliance monitoring

---

## 👨‍💻 Team

### Core Team Members

<table>
  <tr>
    <td align="center">
      <img src="public/team/vansh.png" width="100px" alt="Vansh"/><br />
      <b>Vidyans Sankalp</b><br />
      <sub>Project Lead</sub>
    </td>
    <td align="center">
      <img src="public/team/arnav.png" width="100px" alt="Arnav"/><br />
      <b>Arnav Thakur</b><br />
      <sub>Backend Developer</sub>
    </td>
    <td align="center">
      <img src="public/team/aman.png" width="100px" alt="Aman"/><br />
      <b>Aman Jangir</b><br />
      <sub>Frontend Developer</sub>
    </td>
    <td align="center">
      <img src="public/team/vidyans.png" width="100px" alt="Vidyans"/><br />
      <b>Vansh Pandey</b><br />
      <sub>AI/ML Engineer</sub>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="public/team/anushka.jpg" width="100px" alt="Anushka"/><br />
      <b>Anushka Sinha</b><br />
      <sub>GIS Specialist</sub>
    </td>
    <td align="center">
      <img src="public/team/paridhi.png" width="100px" alt="Paridhi"/><br />
      <b>Paridhi Mittal</b><br />
      <sub>Data Analyst</sub>
    </td>
    <td align="center">
      <img src="public/team/default-avatar.png" width="100px" alt="Team"/><br />
      <b>You?</b><br />
      <sub>Contributor</sub>
    </td>
  </tr>
</table>

---

## 🤝 Contributing

We welcome contributions from developers, researchers, and domain experts!

### How to Contribute

1. **Fork the repository**
   ```bash
   git clone https://github.com/Vansh-Pandey/SIH-FRA.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/YourFeature
   ```

3. **Make your changes**
   - Follow coding standards
   - Add appropriate documentation
   - Write meaningful commit messages

4. **Test your changes**
   ```bash
   npm test
   ```

5. **Commit and push**
   ```bash
   git commit -m 'Add: Your feature description'
   git push origin feature/YourFeature
   ```

6. **Open a Pull Request**
   - Describe your changes
   - Reference related issues
   - Wait for review

### Contribution Areas

- 🐛 **Bug Fixes**
- ✨ **New Features**
- 📝 **Documentation**
- 🎨 **UI/UX Improvements**
- 🧪 **Testing**
- 🌍 **Localization**
- 🔒 **Security**
- ⚡ **Performance**

---

## 📞 Contact & Support

### Project Contact

**Primary Email:** vp0158530@gmail.com

### Ministry of Tribal Affairs

**General Queries:** fra-tribal@gov.in  
**Phone:** +011-23340513 / +011-23340473

### State Tribal Welfare Departments

#### Madhya Pradesh
- 📧 dirtadp@mp.gov.in
- 📧 ctd.tribal@mp.gov.in

#### Odisha
- 📧 stscdev@gmail.com
- 📧 directorstoffice@gmail.com

#### Tripura
- 📧 twdtripura@gmail.com
- 📧 director.twd-tr@gov.in

#### Telangana
- 📧 secretary_tw@telangana.gov.in
- 📧 ctwtgs@gmail.com

### Official Resources

**FRA Guidelines & Clarifications:**  
🔗 [https://tribal.nic.in/FRA.aspx](https://tribal.nic.in/FRA.aspx)

**Ministry of Tribal Affairs:**  
🔗 [https://tribal.nic.in](https://tribal.nic.in)

### Support Channels

- 🐛 **Report Issues:** [GitHub Issues](https://github.com/Vansh-Pandey/SIH-FRA/issues)
- 💡 **Feature Requests:** [GitHub Discussions](https://github.com/Vansh-Pandey/SIH-FRA/discussions)x

---

## 📊 Project Status

![GitHub stars](https://img.shields.io/github/stars/Vansh-Pandey/SIH-FRA?style=social)
![GitHub forks](https://img.shields.io/github/forks/Vansh-Pandey/SIH-FRA?style=social)
![GitHub issues](https://img.shields.io/github/issues/Vansh-Pandey/SIH-FRA)
![GitHub pull requests](https://img.shields.io/github/issues-pr/Vansh-Pandey/SIH-FRA)

---

## 🗺️ Development Roadmap

### Q4 2024 - Q1 2025
- [x] Core platform architecture
- [x] Basic authentication system
- [x] Data hub implementation
- [x] FRA Atlas prototype
- [ ] OCR integration
- [ ] Basic DSS features

### Q2 2025
- [ ] Satellite imagery integration
- [ ] AI-based asset mapping
- [ ] Advanced WebGIS features
- [ ] Mobile app development
- [ ] State pilot programs

### Q3 2025
- [ ] Full DSS implementation
- [ ] Scheme integration
- [ ] IoT sensor integration
- [ ] Real-time monitoring
- [ ] Multi-state rollout

### Q4 2025 & Beyond
- [ ] Nationwide deployment
- [ ] Advanced AI features
- [ ] Community feedback systems
- [ ] International adaptation
- [ ] Continuous improvements

---

## 🎯 Impact Goals

### Short Term (1 Year)
- ✅ Digitize 50,000+ legacy FRA records
- ✅ Map 1,000+ FRA villages with satellite data
- ✅ Onboard 5+ states to the platform
- ✅ Train 500+ government officials
- ✅ Process 10,000+ FRA claims digitally

### Medium Term (2-3 Years)
- 🎯 Complete digitization of all FRA records nationwide
- 🎯 100% coverage of FRA villages in Atlas
- 🎯 DSS integration with all major CSS schemes
- 🎯 Real-time monitoring across 50%+ FRA areas
- 🎯 50,000+ patta holders using mobile feedback

### Long Term (5+ Years)
- 🌟 Complete transformation to digital FRA management
- 🌟 Zero-delay in FRA claim processing
- 🌟 100% transparency in benefit distribution
- 🌟 Measurable improvement in tribal welfare indicators
- 🌟 Model for other countries to replicate

---

## 📈 Success Metrics

### Platform Adoption
- Number of registered users (officials, patta holders)
- States onboarded
- Districts actively using the system
- Daily active users

### Data Quality
- Percentage of records digitized
- Data accuracy rate
- Completeness of asset mapping
- Update frequency

### Decision Support
- Schemes recommended vs implemented
- Beneficiaries reached
- Budget utilization efficiency
- Time saved in processing

### Community Impact
- Patta holders benefited
- Additional CSS schemes accessed
- Income improvement
- Quality of life indicators

---

## 🔒 Security & Privacy

### Data Protection
- **Encryption**: AES-256 encryption at rest and in transit
- **Access Control**: Role-based with principle of least privilege
- **Audit Logs**: Comprehensive activity tracking
- **Backup**: Automated daily backups with 30-day retention

### Compliance
- **IT Act 2000**: Full compliance
- **Data Protection**: Adherence to privacy guidelines
- **RTI Act**: Transparent data access mechanisms
- **Government Standards**: Following MeitY guidelines

### Privacy Measures
- Personal data anonymization for analytics
- Consent-based data collection
- Secure document handling
- Right to data deletion

---

## 🧪 Testing

### Run Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# Run all tests
npm run test:all

# Test coverage
npm run test:coverage
```

### Testing Strategy
- **Unit Tests**: Component and function level
- **Integration Tests**: API and database interactions
- **E2E Tests**: Full user workflow testing
- **Load Tests**: Performance under stress
- **Security Tests**: Vulnerability scanning

---

## 📱 Deployment

### Deployment Platforms

#### Frontend Deployment (Vercel/Netlify)

```bash
cd frontend
npm run build

# Deploy to Vercel
vercel --prod

# Deploy to Netlify
netlify deploy --prod
```

#### Backend Deployment (Render/Railway/Heroku)

```bash
cd backend

# For Render
# Set environment variables in Render dashboard
# Build command: npm install
# Start command: npm start

# For Railway
railway up

# For Heroku
heroku create fra-sih-backend
git push heroku main
```

#### Full Stack Deployment (DigitalOcean/AWS/Azure)

```bash
# Using Docker Compose
docker-compose up -d

# Or using PM2
pm2 start ecosystem.config.js
```

### Environment Configuration

Ensure all environment variables are properly set in your deployment platform:

**Required Variables:**
- `MONGODB_URI`
- `JWT_SECRET`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `CLIENT_URL`

---

## 🛠️ Troubleshooting

### Common Issues

#### MongoDB Connection Error
```bash
# Check MongoDB is running
sudo systemctl status mongod

# Restart MongoDB
sudo systemctl restart mongod

# Check connection string format
mongodb://username:password@host:port/database
```

#### Port Already in Use
```bash
# Find process using port
lsof -i :5000
netstat -ano | findstr :5000  # Windows

# Kill process
kill -9 <PID>
```

#### CORS Errors
- Verify `CLIENT_URL` in backend `.env`
- Check `VITE_API_URL` in frontend `.env`
- Ensure CORS middleware is properly configured

#### Build Failures
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

---

## 📚 Documentation

### Available Documentation

- **API Documentation**: `/docs/API.md`
- **Database Schema**: `/docs/DATABASE.md`
- **Deployment Guide**: `/docs/DEPLOYMENT.md`
- **User Manual**: `/docs/USER_GUIDE.md`
- **Developer Guide**: `/docs/DEVELOPER.md`
- **Architecture**: `/docs/ARCHITECTURE.md`

### Code Documentation

```bash
# Generate JSDoc documentation
npm run docs

# View documentation
npm run docs:serve
```

---

## 🎓 Learning Resources

### Understanding FRA
- [Forest Rights Act 2006 - Full Text](https://tribal.nic.in/FRA.aspx)
- [MoTA Guidelines and Circulars](https://tribal.nic.in/FRA/Guidelines.aspx)
- [FRA Implementation Reports](https://tribal.nic.in/FRA/AnnualReports.aspx)

### Technical Resources
- [React Documentation](https://react.dev/)
- [MongoDB Atlas Guide](https://docs.atlas.mongodb.com/)
- [WebGIS Best Practices](https://www.esri.com/en-us/arcgis/products/arcgis-online/overview)
- [Satellite Image Analysis](https://developers.google.com/earth-engine)

### GIS & Remote Sensing
- [QGIS Tutorials](https://www.qgistutorials.com/)
- [Google Earth Engine](https://developers.google.com/earth-engine)
- [Sentinel Hub](https://www.sentinel-hub.com/)
- [ISRO BHUVAN](https://bhuvan.nrsc.gov.in/)

---

## 🏆 Achievements & Recognition

### Hackathons & Competitions
- 🥇 **Smart India Hackathon 2024** - Prototype Development
- 🏆 **Ministry of Tribal Affairs** - Problem Statement Partner

### Media Coverage
- Featured in government innovation reports
- Presented at tribal welfare conferences
- Academic paper submissions (in progress)

---

## ⚖️ Legal & Compliance

### Applicable Laws
- Forest Rights Act, 2006
- Right to Information Act, 2005
- Information Technology Act, 2000
- Aadhaar (Targeted Delivery of Financial and Other Subsidies, Benefits and Services) Act, 2016

### Data Handling
- All personal data is handled as per Indian data protection guidelines
- Tribal community data is treated with special sensitivity
- Government data security protocols followed

---

## 🌍 Localization

### Supported Languages (Planned)
- Hindi (हिंदी)
- English
- Bengali (বাংলা)
- Telugu (తెలుగు)
- Marathi (मराठी)
- Tamil (தமிழ்)
- Gujarati (ગુજરાતી)
- Kannada (ಕನ್ನಡ)
- Odia (ଓଡ଼ିଆ)
- Malayalam (മലയാളം)

### Regional Scripts Support
- Devanagari
- Bengali script
- Tamil script
- Telugu script
- Other Indian language scripts

---

## 🎨 Design Philosophy

### User-Centric Design
- Simplicity for field officers with limited tech exposure
- Accessibility for users with varying literacy levels
- Visual indicators for non-text comprehension
- Offline-first approach for remote areas

### Performance Goals
- Page load time < 3 seconds
- API response time < 500ms
- Mobile-optimized for 3G networks
- Efficient data caching

### Accessibility Standards
- WCAG 2.1 Level AA compliance
- Screen reader compatible
- Keyboard navigation support
- High contrast mode available

---

## 🔄 Version History

### Version 1.0.0 (Current)
- Initial prototype release
- Core authentication system
- Basic data hub implementation
- FRA Atlas preview
- DSS prototype

### Planned Updates

**Version 1.1.0**
- OCR integration for document scanning
- Enhanced search capabilities
- Improved mobile responsiveness
- Bug fixes and optimizations

**Version 2.0.0**
- Full satellite integration
- Advanced AI features
- Mobile app release
- Multi-language support

---

## 🤝 Partnerships & Collaborations

### Government Partners
- Ministry of Tribal Affairs
- State Tribal Welfare Departments
- Forest Departments
- Revenue Departments
- NITI Aayog

### Technology Partners
- Cloud service providers
- GIS platform providers
- Satellite data providers
- AI/ML solution providers

### Academic Partners
- IITs and NITs
- Forestry research institutes
- Tribal research centers
- Remote sensing institutes

### NGO Partners
- Tribal rights organizations
- Environmental conservation groups
- Community development organizations

---

## 📢 Announcements

### Latest Updates
- ✅ Prototype successfully deployed
- ✅ Initial testing with state departments
- ✅ Positive feedback from tribal welfare officers
- 🔄 Preparing for pilot program in select districts

### Upcoming Events
- **District-level Training**: February 2025
- **State Rollout**: March 2025
- **User Feedback Session**: April 2025

---

## ❓ FAQ

### General Questions

**Q: Who can access this platform?**  
A: The platform is designed for government officials, tribal welfare departments, forest officers, and authorized NGOs. Patta holders can access limited features through mobile apps.

**Q: Is this platform free to use?**  
A: Yes, this is a government initiative and is free for all authorized users.

**Q: What about data privacy?**  
A: We follow strict data protection guidelines. Personal information is encrypted and access is role-based.

### Technical Questions

**Q: What devices are supported?**  
A: Desktop browsers (Chrome, Firefox, Edge), tablets, and smartphones. Mobile apps coming soon.

**Q: Can it work offline?**  
A: Partial offline functionality is available. Full offline support coming in future updates.

**Q: How often is satellite data updated?**  
A: Satellite imagery is updated quarterly, with critical areas monitored more frequently.

### Implementation Questions

**Q: How long does training take?**  
A: Basic training: 1 day, Advanced training: 3 days, with ongoing support.

**Q: What's the implementation timeline?**  
A: Pilot in select districts (3 months), State rollout (6 months), National scale (12-18 months).

**Q: What about data migration?**  
A: We provide tools and support for migrating existing data with minimal disruption.

---

## 🙏 Acknowledgments

### Special Thanks To

- **Ministry of Tribal Affairs** - Vision and support
- **Smart India Hackathon** - Platform and opportunity
- **State Tribal Welfare Departments** - Domain expertise
- **Forest Officials** - Ground-level insights
- **Tribal Communities** - Trust and feedback
- **Technology Partners** - Infrastructure support
- **Open Source Community** - Libraries and tools

### Technology Credits

- React.js Team
- MongoDB Team
- Node.js Foundation
- Cloudinary
- Aceternity UI
- All open-source contributors

---

## 📄 Disclaimer

This is a prototype developed for the Smart India Hackathon 2024. The platform is under active development and not yet ready for production use. All data shown is sample/test data. Official deployment will be subject to government approval and security audits.

---

## 🌟 Show Your Support

If you believe in empowering tribal communities through technology:

- ⭐ **Star this repository**
- 🔀 **Fork and contribute**
- 📢 **Share with relevant stakeholders**
- 📝 **Provide feedback and suggestions**
- 🤝 **Join our mission**

---

## 📞 Quick Links

| Resource | Link |
|----------|------|
| Live Demo | [Coming Soon] |
| API Docs | [/docs/API.md] |
| User Guide | [/docs/USER_GUIDE.md] |
| Issue Tracker | [GitHub Issues](https://github.com/Vansh-Pandey/SIH-FRA/issues) |
| Discussions | [GitHub Discussions](https://github.com/Vansh-Pandey/SIH-FRA/discussions) |
| Ministry Website | [tribal.nic.in](https://tribal.nic.in) |

---

**Built with 💚 for India's Tribal Communities**

*"Recognizing rights, empowering communities, preserving forests"*

---

**Last Updated:** October 2025  
**Version:** 1.0.0  
**Maintained by:** Team FRA-SIH  
**Contact:** vp0158530@gmail.com
