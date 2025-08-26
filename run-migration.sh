#!/bin/bash

# Supabase project details
SUPABASE_URL="https://lzfozwncbxixhiwazcvh.supabase.co"
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6Zm96d25jYnhpeGhpd2F6Y3ZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4MDgwOTYsImV4cCI6MjA2NzM4NDA5Nn0.egRD9lac_m_YhQEwWkG6iuS0j7e4SJ0UP8qHlQirOzc"

# Read the SQL migration file
SQL_CONTENT=$(cat supabase/migrations/001_app_downloads.sql)

# Note: This requires service_role key, not anon key
echo "To run migrations, you need the service_role key from your Supabase dashboard."
echo "Go to: Settings > API > service_role key"
echo ""
echo "Then run:"
echo "curl -X POST '$SUPABASE_URL/rest/v1/rpc/exec_sql' \\"
echo "  -H 'apikey: YOUR_SERVICE_ROLE_KEY' \\"
echo "  -H 'Authorization: Bearer YOUR_SERVICE_ROLE_KEY' \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{\"sql\": \"...\"}'"
echo ""
echo "Or use the Supabase Dashboard SQL Editor (recommended)"