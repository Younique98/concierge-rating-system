-- Ensure the table exists
CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    review TEXT,
    author VARCHAR(255) NOT NULL
);

-- Insert sample data
INSERT INTO reviews (rating, review, author) VALUES
(5, 'Amazing service!', 'John Doe'),
(4, 'Good experience!', 'Jane Smith'),
(3, 'It was okay.', 'Alex Johnson');
