```markdown
<!-- Security Badges -->
![Security Foundational](https://img.shields.io/badge/security-foundational-blue)

<!-- Activity Badges -->
![Last Commit](https://img.shields.io/badge/commit-current-brightgreen)

<!-- Technology Badges -->
![License](https://img.shields.io/badge/license-MIT-yellow)
```
```markdown
<!-- Security Badges -->
![Security Foundational](https://img.shields.io/badge/security-foundational-blue)
![Security Scanning](https://img.shields.io/badge/security-scanning-inactive-red)

<!-- Activity Badges -->
![Last Commit](https://img.shields.io/badge/commit-recent-yellow)
![Release Status](https://img.shields.io/badge/releases-none-red)

<!-- Technology Badges -->
![License](https://img.shields.io/badge/license-MIT-yellow)

<!-- Quality Badges -->
![Documentation](https://img.shields.io/badge/docs-minimal-orange)

<!-- Community Badges -->
![Governance](https://img.shields.io/badge/governance-partial-orange)
```


**Core Badge Verification Workflow** (`.github/workflows/badge-verification.yml`):
```yaml
name: Badge Verification

on:
  schedule:
    - cron: '0 0 * * *'  # Daily at midnight UTC
  push:
    paths:
      - '.github/workflows/**'
      - 'package.json'
      - 'requirements.txt'
  workflow_dispatch:

jobs:
  badge-verification:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Collect Repository Metrics
        run: |
          node scripts/collect-metrics.js
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Generate Badge Status
        run: |
          node scripts/compute-badges.js
      
      - name: Upload Badge Status
        uses: actions/upload-artifact@v4
        with:
          name: badge-status
          path: badge-status.json
```


```markdown
<!-- Security Badges -->
![Security Foundational](https://img.shields.io/badge/security-foundational-blue)

<!-- Activity Badges -->
![Last Commit](https://img.shields.io/badge/commit-current-brightgreen)

<!-- Technology Badges -->
![License](https://img.shields.io/badge/license-MIT-yellow)
```


```markdown
<!-- Security Badges -->
![Security Foundational](https://img.shields.io/badge/security-foundational-blue)
![Security Scanning](https://img.shields.io/badge/security-scanning-active-green)
![Dependency Status](https://img.shields.io/badge/deps-up--to--date-brightgreen)

<!-- Activity Badges -->
![Last Commit](https://img.shields.io/badge/commit-recent-yellow)
![Issues Health](https://img.shields.io/badge/issues-healthy-brightgreen)
![PR Velocity](https://img.shields.io/badge/PR-velocity-fast-brightgreen)

<!-- Maturity Badges -->
![CI Status](https://img.shields.io/badge/CI-passing-brightgreen)
![Versioning](https://img.shields.io/badge/versioning-semver-blue)
![Test Coverage](https://img.shields.io/badge/coverage-comprehensive-brightgreen)

<!-- Technology Badges -->
![Containerized](https://img.shields.io/badge/containerized-Docker-blue)
![CI Platform](https://img.shields.io/badge/CI-GitHub_Actions-blue)

<!-- Quality Badges -->
![Linting](https://img.shields.io/badge/linting-passing-brightgreen)
![Documentation](https://img.shields.io/badge/docs-complete-brightgreen)
![Code Owners](https://img.shields.io/badge/codeowners-defined-blue)

<!-- Community Badges -->
![License](https://img.shields.io/badge/license-MIT-yellow)
```


# GitDigital Billing UI

Internal operations, compliance review, and overrides management system for billing operations.

## Features

### Internal Operations
- Real-time billing queue management
- Transaction monitoring and filtering
- Bulk operations and batch processing
- User activity tracking

### Compliance Review
- Automated rule violation detection
- Manual case review workflow
- Risk assessment and scoring
- Audit trail and documentation
- Escalation procedures

### Overrides Management
- Fee waiver approvals
- Discount application
- Payment extensions
- Limit increases
- Compliance exceptions

## Tech Stack

- **Frontend**: React 18, Material-UI 5
- **State Management**: React Query, React Hook Form
- **Routing**: React Router DOM 6
- **Charts**: Recharts
- **Notifications**: Notistack
- **Date Handling**: date-fns
- **HTTP Client**: Axios

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-org/gitdigital-billing-ui.git
cd gitdigital-billing-ui
```

1. Install dependencies:

```bash
npm install
```

1. Set up environment variables:

```bash
cp .env.example .env
# Edit .env with your configuration
```

1. Start the development server:

```bash
npm start
```

1. Open http://localhost:3000 in your browser.

Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── services/      # API services
├── utils/         # Utility functions
└── App.jsx        # Main application
```

API Integration

The UI expects a backend API with the following endpoints:

· GET /api/compliance/cases - List compliance cases
· POST /api/compliance/cases/:id/approve - Approve compliance case
· GET /api/overrides - List billing overrides
· POST /api/overrides - Create new override

See src/services/ for detailed API integration.

Development Guidelines

1. Use functional components with hooks
2. Follow Material-UI design patterns
3. Implement proper error handling
4. Write unit tests for components
5. Use React Query for server state
6. Follow accessibility guidelines (WCAG 2.1)

Deployment

Build for Production

```bash
npm run build
```

Docker Deployment

```bash
docker-compose up -d
```

Environment Variables

· REACT_APP_API_URL - Backend API URL
· REACT_APP_ENABLE_ANALYTICS - Enable analytics tracking
· REACT_APP_LOG_LEVEL - Application log level

Testing

Run the test suite:

```bash
npm test
```

Run tests with coverage:

```bash
npm test -- --coverage
```

License

Proprietary - Internal Use Only
