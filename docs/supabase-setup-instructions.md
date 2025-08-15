# Supabase Database Setup Instructions

## 🎯 Next Steps: Implement School-Based Schema

### Step 1: Access Supabase SQL Editor
1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your "edubotics" project
3. Navigate to "SQL Editor" in the left sidebar
4. Create a new query

### Step 2: Execute Schema Script
1. Copy the entire content from `docs/school-based-database-schema.sql`
2. Paste it into the SQL Editor
3. Click "Run" to execute the complete schema

### Step 3: Verify Schema Creation
After running the script, verify these tables were created:

**Core Tables:**
- `schools` - School accounts and subscription management
- `users` - Students, teachers, and administrators  
- `trainings` - AI training jobs with credit tracking
- `assignments` - Classroom assignments and projects
- `assignment_submissions` - Student submissions and grading

**Supporting Tables:**
- `ai_control_sessions` - Student interaction sessions
- `servers` - Training infrastructure management
- `school_analytics` - Reporting and analytics

### Step 4: Test Basic Functionality
Run these test queries to verify the setup:

```sql
-- Test 1: Check tables were created
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('schools', 'users', 'trainings', 'assignments');

-- Test 2: Verify demo schools were inserted
SELECT name, plan, max_students, monthly_credits 
FROM schools;

-- Test 3: Test credit deduction function
SELECT deduct_training_credits(
    (SELECT id FROM schools WHERE name = 'Demo Standard School'), 
    2
);

-- Test 4: Check RLS policies are active
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE schemaname = 'public';
```

### Step 5: Configure Authentication
You'll need to set up Supabase Auth to work with the new schema:

1. **Go to Authentication > Settings**
2. **Enable Email Auth** (if not already enabled)
3. **Configure Custom Claims** for school association
4. **Set up Auth Hooks** to automatically assign users to schools

### Expected Results
After successful setup:
- ✅ 8 main tables created with proper relationships
- ✅ Row Level Security (RLS) policies active
- ✅ Utility functions for credit management
- ✅ Analytics and reporting capabilities
- ✅ Demo school accounts for testing

### Next Phase Preview
Once the database is set up, we'll:
1. Configure Modal Labs secrets with your Supabase credentials
2. Update the codebase to use school-based model
3. Set up Stripe for school billing instead of individual subscriptions

Let me know when you've completed the schema setup and we'll continue to the next phase!