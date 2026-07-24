-- ============================================================================
-- DRISHTI WEALTH — DATABASE INDEXING & PERFORMANCE OPTIMIZATION MIGRATION
-- ============================================================================
-- Applied to PostgreSQL table: public.leads
-- Purpose: Eliminate full table scans (Seq Scan) and in-memory sorting overhead
-- ============================================================================

-- 1. Index on created_at (DESC) for fast chronological sorting on Admin Dashboard
-- Hot Query: SELECT * FROM leads ORDER BY created_at DESC;
CREATE INDEX IF NOT EXISTS idx_leads_created_at_desc 
ON public.leads (created_at DESC);

-- 2. Index on status for status-based filtering (new, called, converted, archived)
-- Hot Query: SELECT * FROM leads WHERE status = 'new';
CREATE INDEX IF NOT EXISTS idx_leads_status 
ON public.leads (status);

-- 3. Composite Index on (status, created_at DESC) for combined filtering & sorting
-- Hot Query: SELECT * FROM leads WHERE status != 'archived' ORDER BY created_at DESC;
CREATE INDEX IF NOT EXISTS idx_leads_status_created_at 
ON public.leads (status, created_at DESC);

-- 4. Index on phone number for fast lead search / duplicate check
-- Hot Query: SELECT * FROM leads WHERE phone = '...';
CREATE INDEX IF NOT EXISTS idx_leads_phone 
ON public.leads (phone);

-- ============================================================================
-- EXPLAIN ANALYZE VERIFICATION STATEMENTS
-- (Run these in Supabase SQL Editor to verify Index Scan usage)
-- ============================================================================

-- Verify Index Scan on Chronological Order Query:
EXPLAIN ANALYZE 
SELECT * FROM public.leads ORDER BY created_at DESC LIMIT 50;

-- Verify Index Scan on Status Filtered Query:
EXPLAIN ANALYZE 
SELECT * FROM public.leads WHERE status = 'new' ORDER BY created_at DESC;
