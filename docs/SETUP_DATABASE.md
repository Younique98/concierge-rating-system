# PostgreSQL Installation

- If PostgreSQL is not installed:

* Mac(Homebrew)

- If you do not have homebrew installed
  [homebrew installation doc](https://brew.sh/)

### Install PostgreSql

```sh
brew install postgresql
```

### Start Database

```sh
brew services start postgresql
```

### Stop Database

```sh
brew services stop postgresql
```

- (Ubuntu/Debian)

  ```sh
  sudo apt update && sudo apt install postgresql
  postgresql-contrib
  sudo systemctl start postgresql
  ```

- (Windows) [Download](https://www.postgresql.org/download/)

## Create and Insert Data

### If the database doesn't already exist, create it

```sh
psql -U postgres

CREATE DATABASE pointme_reviews;
pg_ctl -D /usr/local/var/postgresql@14 status
createdb -U postgres
psql -U admin -d postgres -c "\du"

psql -U admin -d postgres -c "CREATE ROLE postgres WITH SUPERUSER LOGIN PASSWORD 'password123';"

psql -U admin -d postgres -c "\du"

createdb -U postgres pointme_reviews

psql -U postgres -d pointme_reviews
\dt
```

-- Ensure the table exists

```sql
CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    review TEXT,
    author VARCHAR(255) NOT NULL
);
```

-- Insert sample data

```sql
INSERT INTO reviews (rating, review, author) VALUES
(5, 'Amazing service!', 'John Doe'),
(4, 'Good experience!', 'Jane Smith'),
(3, 'It was okay.', 'Alex Johnson');
```

--- check whats in the database

```sh
psql -U postgres -d pointme_reviews -c "SELECT * FROM reviews ORDER BY id DESC LIMIT 5;"
```

## **Seed Script**

(Option 1) Run it with:

```sh
psql -U postgres -d pointme_reviews -f seed.sql

```

(Option 2)

```sh
curl -X POST http://localhost:3000/api/reviews \
     -H "Content-Type: application/json" \
     -d '{"rating": 5, "review": "Amazing service!", "author": "John Doe"}'
```
