# School-Based EduBotics Pricing Model

## 🎯 Overview

Instead of individual student subscriptions, schools purchase account packages and manage student access directly. This approach provides better cost control, administrative oversight, and educational integration.

## 💰 Pricing Structure

### **Recommended Model: School Package Plans**

| Plan | Students | Monthly Training Credits | Price/Month | Price/Year | Features |
|------|----------|-------------------------|-------------|------------|----------|
| **Starter School** | 5 students | 25 trainings | €99 | €999 (2 months free) | Basic teacher dashboard |
| **Standard School** | 10 students | 50 trainings | €179 | €1,790 (1 month free) | Full teacher dashboard, reports |
| **Premium School** | 20 students | 100 trainings | €299 | €2,990 (1 month free) | Priority support, custom curriculum |
| **Enterprise School** | Unlimited | 200+ trainings | €499 | €4,990 | Dedicated support, API access |

### **Benefits of School-Based Model:**

#### For Schools:
- **Cost Predictability**: Fixed monthly/yearly costs
- **Administrative Control**: Teachers manage student accounts
- **Usage Monitoring**: Track student engagement and progress
- **Bulk Discounts**: Much cheaper than individual subscriptions
- **Educational Integration**: Curriculum-aligned features

#### For Students:
- **No Payment Required**: School handles all costs
- **Instant Access**: No credit card or payment setup
- **Privacy Compliant**: GDPR-friendly with institutional oversight
- **Educational Support**: Teacher guidance and progress tracking

#### For EduBotics:
- **Higher Revenue per Customer**: €179/month vs €9.90 × 10 = €99
- **Better Retention**: Schools less likely to cancel than individual students
- **Easier Support**: Deal with teachers, not individual students
- **Scalable Model**: One contract covers multiple users

## 🏫 Account Management System

### **School Administrator Workflow:**

1. **School Registration**
   - School admin creates institutional account
   - Provides school details, billing information
   - Selects appropriate plan (5, 10, 20, or unlimited students)

2. **Student Account Creation**
   - Admin creates student accounts in bulk
   - Students receive login credentials (no payment required)
   - Accounts are linked to school for billing and management

3. **Usage Management**
   - Monitor training credit usage across all students
   - View individual student progress and engagement
   - Generate reports for educational assessment

4. **Billing and Administration**
   - Single monthly/yearly invoice per school
   - Usage reports included in billing
   - Easy to add/remove student accounts

### **Technical Implementation:**

```sql
-- Updated database schema for school-based model

-- Schools table
CREATE TABLE schools (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    plan TEXT NOT NULL CHECK (plan IN ('starter', 'standard', 'premium', 'enterprise')),
    max_students INTEGER NOT NULL,
    monthly_credits INTEGER NOT NULL,
    credits_used INTEGER DEFAULT 0,
    credits_reset_date TIMESTAMPTZ DEFAULT NOW(),
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT,
    admin_user_id TEXT, -- Main admin contact
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Updated users table
CREATE TABLE users (
    id TEXT PRIMARY KEY,                    -- Supabase auth user ID
    email TEXT UNIQUE NOT NULL,
    role TEXT DEFAULT 'student' CHECK (role IN ('student', 'teacher', 'admin')),
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
    created_by TEXT REFERENCES users(id),  -- Which admin/teacher created this account
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Updated trainings table to track school credits
CREATE TABLE trainings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    model_name TEXT NOT NULL,
    dataset_name TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    model_type TEXT NOT NULL,
    credits_used INTEGER DEFAULT 1,        -- How many credits this training consumed
    region TEXT DEFAULT 'eu',
    gpu_type TEXT DEFAULT 'A100-40GB',
    training_duration INTEGER,
    cost_estimate DECIMAL(10,2),           -- Actual cost for school reporting
    created_at TIMESTAMPTZ DEFAULT NOW(),
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    error_message TEXT,
    metrics JSONB
);

-- School analytics for admin dashboard
CREATE TABLE school_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    period_start TIMESTAMPTZ NOT NULL,
    period_end TIMESTAMPTZ NOT NULL,
    total_students INTEGER,
    active_students INTEGER,               -- Students who trained in this period
    total_trainings INTEGER,
    successful_trainings INTEGER,
    credits_used INTEGER,
    credits_remaining INTEGER,
    average_training_time INTERVAL,
    top_models JSONB,                      -- Most popular models
    student_engagement JSONB,              -- Per-student activity metrics
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## 📊 Teacher Dashboard Features

### **School Admin Dashboard:**
- **Student Management**: Create/deactivate student accounts
- **Usage Overview**: Credits used/remaining, billing period
- **Performance Analytics**: Student engagement, training success rates
- **Billing History**: Invoice history and usage reports
- **Account Settings**: Plan upgrades, billing information

### **Teacher View:**
- **Class Management**: View assigned students
- **Assignment Tracking**: Monitor student project progress  
- **Progress Reports**: Individual and class performance
- **Curriculum Integration**: Assign specific models/datasets
- **Student Support**: Help struggling students

### **Student View:**
- **Training Projects**: Start new AI training jobs
- **Progress Tracking**: View personal training history
- **Model Library**: Access to educational models
- **Help Resources**: Tutorials and documentation
- **Teacher Communication**: Submit questions/feedback

## 🚀 Implementation Plan

### **Phase 1: Core School Management (Week 1-2)**
- School registration and billing setup
- Student account bulk creation
- Basic credit tracking system
- Simple admin dashboard

### **Phase 2: Enhanced Features (Week 3-4)**  
- Comprehensive analytics dashboard
- Teacher classroom management tools
- Student progress tracking
- Usage reporting and billing integration

### **Phase 3: Educational Integration (Week 5-6)**
- Curriculum-aligned model library
- Assignment and project management
- Student collaboration features
- Educational outcome tracking

## 💡 Alternative Models to Consider

### **Credits-Based System:**
- Schools buy credit packages (e.g., 100 credits for €299)
- Credits roll over month-to-month
- Different training types cost different credits:
  - Basic ACT model: 1 credit
  - Advanced GR00T model: 3 credits  
  - Custom dataset training: 5 credits

### **Semester-Based Pricing:**
- Schools pay per academic semester
- Unlimited usage during active semester
- Pricing based on expected student count
- Perfect for academic calendar alignment

### **Hybrid Model:**
- Base subscription includes X trainings/month
- Additional trainings charged per-use
- Gives predictable costs with overflow capacity
- Example: €179/month includes 50 trainings, additional at €3.99 each

## 📈 Revenue Projections

### **Conservative Estimates (50 schools in Year 1):**
- Average plan: Standard (€179/month)
- Annual revenue: 50 × €179 × 12 = €107,400
- Much higher than individual model: 50 × 10 × €9.90 × 12 = €59,400

### **Growth Projections:**
- Year 1: 50 schools = €107k ARR
- Year 2: 150 schools = €321k ARR  
- Year 3: 300 schools = €643k ARR

## 🎓 Educational Benefits

### **For Educational Institutions:**
- **Budget Control**: Predictable educational technology costs
- **Administrative Efficiency**: One system, multiple students
- **Educational Oversight**: Monitor student learning and engagement
- **Curriculum Integration**: Align AI training with coursework

### **For Students:**
- **Equal Access**: All students get same learning opportunities
- **No Financial Barriers**: School handles all payments
- **Guided Learning**: Teacher oversight and support
- **Privacy Protection**: Institutional GDPR compliance

This school-based model aligns perfectly with educational purchasing patterns and provides much better economics for all parties involved.