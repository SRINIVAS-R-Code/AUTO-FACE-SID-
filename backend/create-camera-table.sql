-- Create camera_streams table for real-time camera monitoring

CREATE TABLE IF NOT EXISTS camera_streams (
    user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    is_active BOOLEAN DEFAULT false,
    last_updated TIMESTAMP DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_camera_streams_active ON camera_streams(is_active);
CREATE INDEX IF NOT EXISTS idx_camera_streams_updated ON camera_streams(last_updated);

-- Insert some test data
INSERT INTO camera_streams (user_id, is_active, last_updated)
VALUES 
    (1, false, NOW()),
    (2, false, NOW())
ON CONFLICT (user_id) DO NOTHING;

SELECT * FROM camera_streams;
