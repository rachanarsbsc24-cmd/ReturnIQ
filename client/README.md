
# ReturnIQ — E-commerce Return Intelligence Platform

ReturnIQ is a student-built frontend prototype for organizing e-commerce return records and turning those records into basic operational insights.

## Problem statement

E-commerce businesses receive product returns for several reasons, including incorrect sizing, damaged items, poor product quality, inaccurate product descriptions, and changes in customer preference. When return information is recorded in separate places or reviewed only as individual cases, it becomes difficult to recognize repeated problems across products and categories.

Without a consolidated view of return records, a business may overlook recurring customer complaints, struggle to prioritize products that need review, and miss opportunities to improve product quality, sizing information, or product descriptions. This can contribute to avoidable operational effort and a less satisfactory customer experience.

ReturnIQ proposes a centralized return intelligence platform where return requests can be recorded, organized, monitored, and analyzed. The platform summarizes common return reasons, highlights products with higher recorded return counts, and presents return statuses in a single interface. These insights are intended to help e-commerce teams investigate recurring issues and make more informed operational decisions.

## Current frontend scope

- Dashboard with total, pending, approved, and rejected return summaries.
- Form to record a return with required-field validation.
- Return register showing product, customer, category, reason, date, and status.
- Return-reason distribution.
- Frequently returned product summary.
- Responsive navigation and layouts.
- Browser `localStorage` persistence for demonstration records.

## Important prototype limitations

- Sample records are illustrative data, not real customer or business data.
- New records are stored in the current browser only. They are not shared between devices or users.
- The current version has no backend API, MongoDB database, authentication, role-based access, or deployment configuration.
- Status values in the sample dataset are currently `Pending`; status management is planned as a separate feature.
- Product counts represent the number of recorded returns, not a return rate. A true return rate requires sales/order-volume data.

## Technology stack

- React and React DOM
- JavaScript (ES modules)
- HTML5 and CSS3
- Vite
- Git and GitHub

## Run locally

1. Open a terminal in the `client` folder.
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open the local URL printed by Vite.

Create a production build with `npm run build`.

## Project structure

```text
client/
  public/
  src/
    assets/
    components/
      Navbar.jsx
      ProductIssues.jsx
      ReasonBreakdown.jsx
      ReturnForm.jsx
      ReturnTable.jsx
      SummaryCard.jsx
    data/
      mockReturns.js
    pages/
      Dashboard.jsx
    App.jsx
    index.css
    main.jsx
  index.html
  package.json
  vite.config.js
```

## Project direction

The next planned development stages are advanced return management, search and filtering, deeper analytics, product monitoring, report export, REST API development, MongoDB integration, authentication and authorization, and activity notifications. Each feature should be implemented, tested, documented, and committed separately.
