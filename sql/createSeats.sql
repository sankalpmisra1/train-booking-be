CREATE TABLE seats (
    seat_id INT AUTO_INCREMENT PRIMARY KEY,
    row_no INT NOT NULL,
    seat_number INT NOT NULL,
    is_reserved BOOLEAN DEFAULT FALSE,
    user_id INT DEFAULT NULL
);

-- Populate the seats table with 80 seats
INSERT INTO seats (row_no, seat_number, is_reserved)
VALUES
(1, 1, FALSE), (1, 2, FALSE), ..., (12, 3, FALSE);