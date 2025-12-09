-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'completed')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_created_at ON tasks(created_at DESC);

-- Insert sample data
INSERT INTO tasks (title, description, status) VALUES
    ('Setup development environment', 'Install Node.js, Docker, and PostgreSQL', 'completed'),
    ('Create database schema', 'Design and implement the tasks table', 'completed'),
    ('Build REST API', 'Implement CRUD endpoints for tasks', 'in-progress'),
    ('Design UI components', 'Create React components for task management', 'pending'),
    ('Write tests', 'Add unit and integration tests', 'pending'),
    ('Deploy to production', 'Setup CI/CD pipeline and deploy to AWS', 'pending')
ON CONFLICT DO NOTHING;
