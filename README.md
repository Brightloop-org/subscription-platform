# Brightloop — Subscription Management Platform

A unified subscription management and recurring billing platform built for **Brightloop Software** (Odoo Hackathon Challenge). It replaces spreadsheets and manual accounting with an automated digital backbone for plans, quotes, subscriptions, recurring invoices, payments, and real-time revenue analytics.

---

## 🚀 Key Features

### 1. Role-Based Access Control (RBAC) & Authentication
- **Admin**: Full system control, manages staff accounts, creates products, plans, tax rules, and discount codes.
- **Internal Staff**: Handles day-to-day customer operations, creates quotes, manages subscriptions, and records payments.
- **Customer Portal**: Self-service portal where customers view and manage only their own subscriptions, download invoices, and view payment history.
- **Strict Security**: Unique email per account, strict password policy (> 8 characters, with uppercase, lowercase, and special character), and password reset workflows.

### 2. Product Catalog & Variant Surcharges
- Products configured with sales price, cost price, type (Service, Subscription, Consumable), and descriptive notes.
- Support for **Product Variants** with price adjustments (e.g. adding the "Odoo" brand adds `+$560` to the base price).

### 3. Flexible Subscription Plans
- Configurable recurring intervals: **Daily**, **Weekly**, **Monthly**, or **Yearly**.
- Minimum commitment quantities and date availability windows.
- Granular lifecycle policies per plan: auto-close at end date, early termination, pausing/resuming, and renewals.

### 4. Quotation Templates to Active Subscriptions
- Pre-configured quotation templates with default plans, line items, and validity duration (days).
- Strict state machine transitions:
  $$\text{Draft} \longrightarrow \text{Quotation} \longrightarrow \text{Confirmed} \longrightarrow \text{Active} \longrightarrow \text{Closed}$$
- Visible subscription details: unique reference number (`SUB-XXXX`), customer, plan, dates, payment terms, and calculated lines.

### 5. Automated Recurring Billing & Taxes
- **Automated Billing Engine**: Scheduled cron job automatically detects due subscriptions on billing day and generates draft invoices.
- **Idempotency Guarantee**: Subscriptions are never billed twice or skipped via unique billing cycle keys.
- **Automatic Taxes**: Configurable tax rules dynamically applied to invoice lines.
- **Invoice Lifecycle**: $\text{Draft} \longrightarrow \text{Confirmed} \longrightarrow \text{Paid}$ (or $\text{Cancelled}$).

### 6. Discount & Promotion Engine
- Admin-created discount rules: fixed amount or percentage.
- Conditions: minimum order quantity or amount, validity dates, and redemption limits.
- Scope: applies either to specific product lines or the entire subscription.
- Automatically applied to subsequent recurring invoices and expires when limits are met.

### 7. Payments & Overdue Tracking
- Record payments across multiple methods (Credit Card, Bank Transfer, Cash).
- Automatic invoice balance updates and settlement tracking.
- Visibility into overdue invoices to prevent lost revenue.

### 8. Finance Analytics & High Performance
- Real-time dashboard for finance leads: **MRR** (Monthly Recurring Revenue), **ARR** (Annual Recurring Revenue), active subscriptions count, collected revenue, and outstanding receivables.
- Indexed MongoDB queries and clean aggregations designed to respond in **under 2 seconds** even with thousands of subscriptions.

---

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Lucide Icons, React Router
- **Backend**: Node.js, Express.js (MVC Architecture)
- **Database**: MongoDB with Mongoose ODM
- **Scheduler**: node-cron (Automated recurring billing engine)
- **Authentication**: JWT & bcryptjs

---

## 📁 Project Structure

```text
subscription-platform/
├── client/                     # Frontend (React + Vite)
│   ├── public/
│   ├── src/
│   │   ├── api/                # API client calls (Axios)
│   │   ├── assets/             # Static assets & icons
│   │   ├── components/         # Reusable UI components
│   │   │   ├── common/         # Buttons, badges, modals, stat cards
│   │   │   ├── forms/          # Form inputs and selectors
│   │   │   ├── layout/         # Navbar, sidebar, layout wrappers
│   │   │   └── tables/         # Data tables and pagination
│   │   ├── context/            # React context (AuthContext, etc.)
│   │   ├── hooks/              # Custom React hooks
│   │   ├── pages/              # Views & dashboard routes
│   │   │   ├── auth/           # Login, Register, Forgot Password
│   │   │   ├── dashboard/      # Finance Lead Analytics (MRR, ARR)
│   │   │   ├── products/       # Product and variant catalog
│   │   │   ├── plans/          # Subscription plans & policies
│   │   │   ├── quotations/     # Quote templates & quotes
│   │   │   ├── subscriptions/  # Subscriptions lifecycle management
│   │   │   ├── invoices/       # Invoices list, details, print view
│   │   │   ├── payments/       # Payment records & reconciliation
│   │   │   ├── discounts/      # Discount rules & coupon engine
│   │   │   └── portal/         # Customer self-service portal
│   │   ├── routes/             # App routing & protected routes
│   │   ├── utils/              # Formatters & constants
│   │   ├── App.jsx             # App root
│   │   ├── main.jsx            # React DOM mounting
│   │   └── index.css           # Tailwind styling
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/                     # Backend API (Node.js + Express + Mongoose)
│   ├── src/
│   │   ├── config/             # Database connection (Mongoose)
│   │   ├── models/             # Data models
│   │   │   ├── User.js         # Users, roles (Admin, Staff, Customer)
│   │   │   ├── Product.js      # Products & variants (surcharges)
│   │   │   ├── Plan.js         # Plans & billing policies
│   │   │   ├── QuotationTemplate.js # Reusable quote templates
│   │   │   ├── Subscription.js # Subscriptions & lifecycle states
│   │   │   ├── Invoice.js      # Invoices & billing run tracking
│   │   │   ├── Payment.js      # Payment transactions
│   │   │   ├── Discount.js     # Discounts & redemption rules
│   │   │   └── Tax.js          # Tax rates & rules
│   │   ├── controllers/        # Request handlers & logic
│   │   ├── routes/             # API routes
│   │   ├── middlewares/        # Auth, RBAC roles, and error handlers
│   │   ├── services/           # Automated billing engine & cron
│   │   ├── utils/              # Validators (password check) & seeders
│   │   ├── app.js              # Express app setup & middleware
│   │   └── server.js           # Server entry point
│   ├── .env                    # Environment configuration
│   └── package.json
│
└── README.md
```

---

## ⚡ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) installed and running on `mongodb://localhost:27017`

### 1. Backend Setup
```bash
cd server

# Install dependencies
npm install

# Start the development server (runs on port 5000)
npm run dev
```

### 2. Frontend Setup
```bash
cd client

# Install dependencies
npm install

# Start the Vite development server (runs on http://localhost:5173)
npm run dev
```

---

## 🔒 Password Security Policy

During customer registration or staff creation, passwords must strictly satisfy:
- Length: **> 8 characters**
- At least **1 uppercase letter** (`A-Z`)
- At least **1 lowercase letter** (`a-z`)
- At least **1 special character** (`!@#$%^&*...`)

---

## 🔄 Subscription & Invoice Lifecycles

```text
Subscription:
[Draft] ──> [Quotation] ──> [Confirmed] ──> [Active] ──> [Closed]
                                               │
                                       (Pause / Resume)

Invoice:
[Draft] ──> [Confirmed] ──> [Paid]
               │
          [Cancelled]
```

---

## 📜 License
Developed for the Odoo Hackathon.
