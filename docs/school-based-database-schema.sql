-- EduBotics School-Based Database Schema
-- Updated for school-managed student accounts instead of individual subscriptions
-- Execute in Supabase SQL Editor

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Schools table for institutional management
CREATE TABLE public.schools (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    contact_person TEXT,
    phone TEXT,
    address TEXT,
    country TEXT DEFAULT 'Germany',
    
    -- Subscription and billing
    plan TEXT NOT NULL DEFAULT 'starter' CHECK (plan IN ('starter', 'standard', 'premium', 'enterprise')),
    max_students INTEGER NOT NULL DEFAULT 5,
    monthly_credits INTEGER NOT NULL DEFAULT 25,
    credits_used INTEGER DEFAULT 0,
    credits_reset_date TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '1 month'),
    
    -- Stripe integration  
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT,
    billing_email TEXT,
    
    -- Administrative
    admin_user_id TEXT, -- Main school administrator
    is_active BOOLEAN DEFAULT TRUE,
    setup_completed BOOLEAN DEFAULT FALSE,
    
    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT valid_credits CHECK (credits_used <= monthly_credits),
    CONSTRAINT valid_plan_limits CHECK (
        (plan = 'starter' AND max_students <= 5) OR
        (plan = 'standard' AND max_students <= 10) OR  
        (plan = 'premium' AND max_students <= 20) OR
        (plan = 'enterprise' AND max_students >= 20)
    )
);

-- Users table (students, teachers, admins)
CREATE TABLE public.users (
    id TEXT PRIMARY KEY,                    -- Supabase auth user ID
    email TEXT UNIQUE NOT NULL,
    first_name TEXT,
    last_name TEXT,
    
    -- Role and school association
    role TEXT DEFAULT 'student' CHECK (role IN ('student', 'teacher', 'admin', 'school_admin')),
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
    created_by TEXT REFERENCES users(id),  -- Which admin/teacher created this account
    
    -- Student-specific fields
    grade_level TEXT,                       -- For educational analytics
    teacher_id TEXT REFERENCES users(id),  -- Assigned teacher for students
    
    -- Account status
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMPTZ,
    
    -- Privacy and preferences
    privacy_consent BOOLEAN DEFAULT FALSE,
    email_notifications BOOLEAN DEFAULT TRUE,
    
    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Training jobs with school credit tracking
CREATE TABLE public.trainings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    
    -- Training configuration
    model_name TEXT NOT NULL,
    dataset_name TEXT NOT NULL,
    model_type TEXT NOT NULL CHECK (model_type IN ('ACT', 'ACT_BBOX', 'GR00T', 'PaliGemma')),
    
    -- Status and progress
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'completed', 'failed', 'cancelled')),
    progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage BETWEEN 0 AND 100),
    
    -- Resource usage
    credits_used INTEGER DEFAULT 1,        -- Credits consumed by this training
    region TEXT DEFAULT 'eu',
    gpu_type TEXT DEFAULT 'A100-40GB',
    
    -- Timing and performance
    training_duration INTEGER,              -- Duration in seconds
    queue_time INTEGER,                     -- Time spent in queue
    cost_estimate DECIMAL(10,2),           -- Actual cost for school reporting
    
    -- Results and output
    model_url TEXT,                         -- HuggingFace model URL
    training_logs TEXT,                     -- Training output logs
    error_message TEXT,
    metrics JSONB,                          -- Training metrics (accuracy, loss, etc.)
    
    -- Educational context
    assignment_id UUID,                     -- If part of class assignment
    submission_notes TEXT,                  -- Student notes about the training
    teacher_feedback TEXT,                  -- Teacher feedback on results
    grade DECIMAL(3,1),                     -- Grade assigned by teacher (0.0-10.0)
    
    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ
);

-- AI control sessions for feedback and learning
CREATE TABLE public.ai_control_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    training_id UUID REFERENCES trainings(id) ON DELETE SET NULL,
    
    -- Session data
    session_type TEXT DEFAULT 'inference' CHECK (session_type IN ('training', 'inference', 'evaluation')),
    model_used TEXT,                        -- Which model was used
    commands_executed JSONB,               -- Robot commands during session
    robot_responses JSONB,                 -- Robot state/response data
    
    -- Educational feedback
    user_feedback TEXT,                     -- Student feedback on AI performance  
    learning_objectives TEXT,               -- What the student was trying to learn
    difficulty_rating INTEGER CHECK (difficulty_rating BETWEEN 1 AND 5),
    satisfaction_rating INTEGER CHECK (satisfaction_rating BETWEEN 1 AND 5),
    
    -- Performance metrics
    success_rate DECIMAL(5,2),              -- Percentage of successful commands
    average_response_time DECIMAL(8,3),     -- Average robot response time
    errors_encountered INTEGER DEFAULT 0,
    
    -- Metadata
    duration INTEGER,                       -- Session duration in seconds
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Server management for training infrastructure
CREATE TABLE public.servers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    
    -- Server configuration
    server_id TEXT NOT NULL,               -- Modal server ID
    server_type TEXT DEFAULT 'training' CHECK (server_type IN ('training', 'inference')),
    model_name TEXT,
    
    -- Regional and resource config
    region TEXT DEFAULT 'eu',
    gpu_type TEXT DEFAULT 'A100-40GB',
    memory_gb INTEGER,
    cpu_cores INTEGER,
    
    -- Status and lifecycle
    status TEXT DEFAULT 'starting' CHECK (status IN ('starting', 'running', 'stopping', 'stopped', 'error')),
    health_status TEXT DEFAULT 'unknown' CHECK (health_status IN ('healthy', 'degraded', 'unhealthy', 'unknown')),
    
    -- Cost tracking
    cost_per_hour DECIMAL(8,3),
    total_cost DECIMAL(10,2) DEFAULT 0,
    
    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    started_at TIMESTAMPTZ,
    stopped_at TIMESTAMPTZ,
    last_health_check TIMESTAMPTZ DEFAULT NOW()
);

-- Classroom assignments and projects
CREATE TABLE public.assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    teacher_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Assignment details
    title TEXT NOT NULL,
    description TEXT,
    instructions TEXT,
    
    -- Requirements and constraints
    required_model_type TEXT CHECK (required_model_type IN ('ACT', 'ACT_BBOX', 'GR00T', 'PaliGemma')),
    required_dataset TEXT,
    max_training_time INTEGER,             -- Maximum training time allowed
    max_credits INTEGER DEFAULT 1,         -- Credits allocated per student
    
    -- Grading and evaluation
    grading_criteria TEXT,
    max_points DECIMAL(5,1) DEFAULT 10.0,
    auto_grade BOOLEAN DEFAULT FALSE,      -- Whether to auto-grade based on metrics
    
    -- Timing
    due_date TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT TRUE,
    
    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Student assignment submissions
CREATE TABLE public.assignment_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    assignment_id UUID NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
    student_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    training_id UUID REFERENCES trainings(id) ON DELETE CASCADE,
    
    -- Submission data
    submission_text TEXT,
    model_performance_analysis TEXT,
    lessons_learned TEXT,
    
    -- Grading
    grade DECIMAL(5,1),                     -- Grade received (0.0 to max_points)
    teacher_feedback TEXT,
    graded_at TIMESTAMPTZ,
    graded_by TEXT REFERENCES users(id),
    
    -- Status
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'graded', 'returned')),
    submitted_at TIMESTAMPTZ,
    
    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Ensure one submission per student per assignment
    UNIQUE(assignment_id, student_id)
);

-- School analytics for administrative reporting
CREATE TABLE public.school_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    
    -- Reporting period
    period_start TIMESTAMPTZ NOT NULL,
    period_end TIMESTAMPTZ NOT NULL,
    period_type TEXT DEFAULT 'monthly' CHECK (period_type IN ('daily', 'weekly', 'monthly', 'quarterly')),
    
    -- Usage statistics
    total_students INTEGER,
    active_students INTEGER,               -- Students who trained in this period
    total_trainings INTEGER,
    successful_trainings INTEGER,
    failed_trainings INTEGER,
    
    -- Credit and cost tracking
    credits_allocated INTEGER,
    credits_used INTEGER,
    credits_remaining INTEGER,
    total_cost DECIMAL(10,2),
    cost_per_training DECIMAL(8,2),
    
    -- Performance metrics
    average_training_time INTERVAL,
    average_queue_time INTERVAL,
    success_rate DECIMAL(5,2),
    
    -- Popular content
    top_models JSONB,                      -- Most popular model types
    top_datasets JSONB,                    -- Most used datasets
    
    -- Student engagement
    student_engagement JSONB,              -- Per-student activity metrics
    assignment_completion_rate DECIMAL(5,2),
    average_session_duration INTERVAL,
    
    -- Teacher activity
    total_assignments INTEGER,
    assignments_with_submissions INTEGER,
    average_grading_time INTERVAL,
    
    -- Metadata
    generated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Ensure one record per school per period
    UNIQUE(school_id, period_start, period_end, period_type)
);

-- Performance indexes for optimization
CREATE INDEX idx_schools_plan ON schools(plan);
CREATE INDEX idx_schools_active ON schools(is_active) WHERE is_active = TRUE;
CREATE INDEX idx_schools_credits_reset ON schools(credits_reset_date);

CREATE INDEX idx_users_school_id ON users(school_id);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_active ON users(is_active) WHERE is_active = TRUE;
CREATE INDEX idx_users_teacher_students ON users(teacher_id) WHERE role = 'student';

CREATE INDEX idx_trainings_school_id ON trainings(school_id);
CREATE INDEX idx_trainings_user_id ON trainings(user_id);
CREATE INDEX idx_trainings_status ON trainings(status);
CREATE INDEX idx_trainings_created_at ON trainings(created_at DESC);
CREATE INDEX idx_trainings_school_status ON trainings(school_id, status);
CREATE INDEX idx_trainings_assignment ON trainings(assignment_id) WHERE assignment_id IS NOT NULL;

CREATE INDEX idx_servers_school_id ON servers(school_id);
CREATE INDEX idx_servers_status ON servers(status);
CREATE INDEX idx_servers_health ON servers(health_status);

CREATE INDEX idx_assignments_school_teacher ON assignments(school_id, teacher_id);
CREATE INDEX idx_assignments_active ON assignments(is_active) WHERE is_active = TRUE;
CREATE INDEX idx_assignments_due_date ON assignments(due_date);

CREATE INDEX idx_submissions_assignment ON assignment_submissions(assignment_id);
CREATE INDEX idx_submissions_student ON assignment_submissions(student_id);
CREATE INDEX idx_submissions_status ON assignment_submissions(status);

CREATE INDEX idx_analytics_school_period ON school_analytics(school_id, period_start DESC);
CREATE INDEX idx_analytics_period_type ON school_analytics(period_type, period_start DESC);

-- Row Level Security (RLS) Policies
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE trainings ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_control_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE servers ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE school_analytics ENABLE ROW LEVEL SECURITY;

-- School administrators can manage their school
CREATE POLICY "School admins can manage their school" ON schools
    FOR ALL USING (
        auth.uid()::text = admin_user_id OR
        auth.uid()::text IN (
            SELECT id FROM users WHERE school_id = schools.id AND role IN ('school_admin', 'admin')
        )
    );

-- Users can see their own data and school members can see each other
CREATE POLICY "Users can view own profile and school members" ON users
    FOR SELECT USING (
        auth.uid()::text = id OR
        auth.uid()::text IN (
            SELECT u.id FROM users u WHERE u.school_id = users.school_id AND u.role IN ('teacher', 'school_admin', 'admin')
        )
    );

-- Users can update their own profile, admins/teachers can update their school's users
CREATE POLICY "Users can update own profile, admins manage school users" ON users
    FOR UPDATE USING (
        auth.uid()::text = id OR
        auth.uid()::text IN (
            SELECT u.id FROM users u WHERE u.school_id = users.school_id AND u.role IN ('school_admin', 'admin')
        )
    );

-- Trainings: Users can see their own, teachers can see their students', admins see all school trainings
CREATE POLICY "Training access by role" ON trainings
    FOR ALL USING (
        auth.uid()::text = user_id OR
        auth.uid()::text IN (
            SELECT u.id FROM users u 
            WHERE u.school_id = trainings.school_id 
            AND (
                u.role IN ('school_admin', 'admin') OR
                (u.role = 'teacher' AND u.id = (SELECT teacher_id FROM users WHERE id = trainings.user_id))
            )
        )
    );

-- Similar policies for other tables...
CREATE POLICY "Session access by role" ON ai_control_sessions
    FOR ALL USING (
        auth.uid()::text = user_id OR
        auth.uid()::text IN (
            SELECT u.id FROM users u WHERE u.school_id = ai_control_sessions.school_id AND u.role IN ('teacher', 'school_admin', 'admin')
        )
    );

CREATE POLICY "Server access by role" ON servers
    FOR ALL USING (
        auth.uid()::text = user_id OR
        auth.uid()::text IN (
            SELECT u.id FROM users u WHERE u.school_id = servers.school_id AND u.role IN ('teacher', 'school_admin', 'admin')
        )
    );

CREATE POLICY "Assignment access by role" ON assignments
    FOR ALL USING (
        auth.uid()::text = teacher_id OR
        auth.uid()::text IN (
            SELECT u.id FROM users u WHERE u.school_id = assignments.school_id AND u.role IN ('school_admin', 'admin')
        )
    );

CREATE POLICY "Submission access by role" ON assignment_submissions
    FOR ALL USING (
        auth.uid()::text = student_id OR
        auth.uid()::text IN (
            SELECT a.teacher_id FROM assignments a WHERE a.id = assignment_submissions.assignment_id
        ) OR
        auth.uid()::text IN (
            SELECT u.id FROM users u 
            JOIN assignments a ON u.school_id = (SELECT school_id FROM users WHERE id = assignment_submissions.student_id)
            WHERE u.role IN ('school_admin', 'admin')
        )
    );

CREATE POLICY "Analytics access by school role" ON school_analytics
    FOR SELECT USING (
        auth.uid()::text IN (
            SELECT u.id FROM users u WHERE u.school_id = school_analytics.school_id AND u.role IN ('teacher', 'school_admin', 'admin')
        )
    );

-- Utility functions for credit management and analytics

-- Function to check and deduct training credits
CREATE OR REPLACE FUNCTION deduct_training_credits(
    p_school_id UUID,
    p_credits_needed INTEGER DEFAULT 1
)
RETURNS BOOLEAN AS $$
DECLARE
    v_available_credits INTEGER;
    v_reset_date TIMESTAMPTZ;
BEGIN
    -- Get current credits and reset date
    SELECT monthly_credits - credits_used, credits_reset_date
    INTO v_available_credits, v_reset_date
    FROM schools 
    WHERE id = p_school_id AND is_active = TRUE;
    
    -- Check if credits need to be reset (new billing period)
    IF v_reset_date <= NOW() THEN
        UPDATE schools 
        SET credits_used = 0,
            credits_reset_date = credits_reset_date + INTERVAL '1 month'
        WHERE id = p_school_id;
        
        -- Recalculate available credits
        SELECT monthly_credits - credits_used
        INTO v_available_credits
        FROM schools 
        WHERE id = p_school_id;
    END IF;
    
    -- Check if enough credits available
    IF v_available_credits >= p_credits_needed THEN
        UPDATE schools 
        SET credits_used = credits_used + p_credits_needed,
            updated_at = NOW()
        WHERE id = p_school_id;
        
        RETURN TRUE;
    ELSE
        RETURN FALSE;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get school usage statistics
CREATE OR REPLACE FUNCTION get_school_usage_stats(p_school_id UUID)
RETURNS JSONB AS $$
DECLARE
    result JSONB;
BEGIN
    SELECT jsonb_build_object(
        'school_info', (
            SELECT jsonb_build_object(
                'name', name,
                'plan', plan,
                'max_students', max_students,
                'monthly_credits', monthly_credits,
                'credits_used', credits_used,
                'credits_remaining', monthly_credits - credits_used,
                'credits_reset_date', credits_reset_date
            )
            FROM schools WHERE id = p_school_id
        ),
        'current_month_stats', (
            SELECT jsonb_build_object(
                'total_students', COUNT(DISTINCT u.id),
                'active_students', COUNT(DISTINCT t.user_id),
                'total_trainings', COUNT(t.id),
                'successful_trainings', COUNT(*) FILTER (WHERE t.status = 'completed'),
                'failed_trainings', COUNT(*) FILTER (WHERE t.status = 'failed'),
                'avg_training_duration', AVG(t.training_duration),
                'total_cost', SUM(t.cost_estimate)
            )
            FROM users u
            LEFT JOIN trainings t ON u.id = t.user_id AND t.created_at >= DATE_TRUNC('month', NOW())
            WHERE u.school_id = p_school_id AND u.role = 'student'
        ),
        'popular_models', (
            SELECT jsonb_object_agg(model_type, count)
            FROM (
                SELECT model_type, COUNT(*) as count
                FROM trainings 
                WHERE school_id = p_school_id 
                AND created_at >= DATE_TRUNC('month', NOW())
                GROUP BY model_type
                ORDER BY count DESC
                LIMIT 5
            ) popular
        )
    ) INTO result;
    
    RETURN COALESCE(result, '{}'::jsonb);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to generate school analytics report
CREATE OR REPLACE FUNCTION generate_school_analytics(
    p_school_id UUID,
    p_period_start TIMESTAMPTZ,
    p_period_end TIMESTAMPTZ,
    p_period_type TEXT DEFAULT 'monthly'
)
RETURNS UUID AS $$
DECLARE
    v_analytics_id UUID;
    v_stats RECORD;
BEGIN
    -- Calculate statistics for the period
    SELECT 
        COUNT(DISTINCT u.id) as total_students,
        COUNT(DISTINCT t.user_id) as active_students,
        COUNT(t.id) as total_trainings,
        COUNT(*) FILTER (WHERE t.status = 'completed') as successful_trainings,
        COUNT(*) FILTER (WHERE t.status = 'failed') as failed_trainings,
        SUM(t.credits_used) as credits_used,
        SUM(t.cost_estimate) as total_cost,
        AVG(t.training_duration) * INTERVAL '1 second' as avg_training_time,
        AVG(EXTRACT(EPOCH FROM (t.started_at - t.created_at))) * INTERVAL '1 second' as avg_queue_time
    INTO v_stats
    FROM users u
    LEFT JOIN trainings t ON u.id = t.user_id 
        AND t.created_at BETWEEN p_period_start AND p_period_end
    WHERE u.school_id = p_school_id AND u.role = 'student';
    
    -- Insert analytics record
    INSERT INTO school_analytics (
        school_id,
        period_start,
        period_end, 
        period_type,
        total_students,
        active_students,
        total_trainings,
        successful_trainings,
        failed_trainings,
        credits_used,
        total_cost,
        success_rate,
        average_training_time,
        average_queue_time
    ) VALUES (
        p_school_id,
        p_period_start,
        p_period_end,
        p_period_type,
        COALESCE(v_stats.total_students, 0),
        COALESCE(v_stats.active_students, 0), 
        COALESCE(v_stats.total_trainings, 0),
        COALESCE(v_stats.successful_trainings, 0),
        COALESCE(v_stats.failed_trainings, 0),
        COALESCE(v_stats.credits_used, 0),
        COALESCE(v_stats.total_cost, 0),
        CASE 
            WHEN COALESCE(v_stats.total_trainings, 0) > 0 
            THEN (COALESCE(v_stats.successful_trainings, 0)::DECIMAL / v_stats.total_trainings * 100)
            ELSE 0 
        END,
        v_stats.avg_training_time,
        v_stats.avg_queue_time
    ) RETURNING id INTO v_analytics_id;
    
    RETURN v_analytics_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create default school plans as reference data
INSERT INTO schools (name, email, plan, max_students, monthly_credits, admin_user_id) VALUES
('Demo Starter School', 'demo-starter@edubotics.ai', 'starter', 5, 25, 'demo-admin-1'),
('Demo Standard School', 'demo-standard@edubotics.ai', 'standard', 10, 50, 'demo-admin-2'),
('Demo Premium School', 'demo-premium@edubotics.ai', 'premium', 20, 100, 'demo-admin-3')
ON CONFLICT (email) DO NOTHING;

-- Insert plan pricing information as reference
COMMENT ON TABLE schools IS 'School accounts with subscription plans:
- Starter: 5 students, 25 credits/month, €99/month
- Standard: 10 students, 50 credits/month, €179/month  
- Premium: 20 students, 100 credits/month, €299/month
- Enterprise: Unlimited students, 200+ credits/month, €499/month';

COMMENT ON TABLE users IS 'Users within school context - students managed by school admins/teachers';
COMMENT ON TABLE trainings IS 'AI training jobs that consume school credits';
COMMENT ON TABLE assignments IS 'Classroom assignments created by teachers';
COMMENT ON TABLE school_analytics IS 'Analytics and reporting for school administrators';