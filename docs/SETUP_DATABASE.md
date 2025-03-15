# **PostgreSQL Setup Guide**

This guide provides instructions to **install, create, and seed a PostgreSQL
database** for the project.

---

## **1. Install PostgreSQL**

If PostgreSQL is not installed, follow the instructions below based on your
operating system.

### **MacOS (Homebrew)**

If you don't have Homebrew installed, follow the
[Homebrew installation guide](https://brew.sh/).

```sh
brew install postgresql
brew services start postgresql
```

### **Ubuntu/Debian**

```sh
sudo apt update && sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### **Windows**

Download and install PostgreSQL from
[the official website](https://www.postgresql.org/download/).

---

## **2. Create & Set Up the Database**

### **Step 1: Create the Database**

If the database doesn't already exist, create it:

```sh
psql -U postgres

CREATE DATABASE pointme_reviews;
```

Verify PostgreSQL is running:

```sh
pg_ctl -D /usr/local/var/postgresql@14 status
```

### **Step 2: Create the Superuser Role (If Needed)**

```sh
createdb -U postgres
psql -U admin -d postgres -c "\du"

psql -U admin -d postgres -c "CREATE ROLE postgres WITH SUPERUSER LOGIN PASSWORD 'password123';"
```

Confirm the role exists:

```sh
psql -U admin -d postgres -c "\du"
```

### **Step 3: Connect to the Database**

```sh
createdb -U postgres pointme_reviews
psql -U postgres -d pointme_reviews
```

---

## **3. Create the `reviews` Table**

Ensure the table exists before inserting data.

```sql
CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    review TEXT,
    author VARCHAR(255) NOT NULL
);
```

---

## **4. Insert Sample Data**

Manually insert sample data into the `reviews` table:

```sql
INSERT INTO reviews (rating, review, author) VALUES
(5, 'Amazing service!', 'John Doe'),
(4, 'Good experience!', 'Jane Smith'),
(3, 'It was okay.', 'Alex Johnson');
```

Verify the data is inserted:

```sh
psql -U postgres -d pointme_reviews -c "SELECT * FROM reviews ORDER BY id DESC LIMIT 5;"
```

---

## **5. Seed the Database**

There are **two ways** to seed the database:

### **Option 1: Using a SQL File**

Run the following command:

```sh
psql -U postgres -d pointme_reviews -f seed.sql
```

### **Option 2: Using API Endpoint**

Use `cURL` to insert data via the API:

```sh
curl -X POST http://localhost:3000/api/reviews \
     -H "Content-Type: application/json" \
     -d '{"rating": 5, "review": "Amazing service!", "author": "John Doe"}'
```

---

## **6. Notes on the `reviews.json` Fallback**

Even though the application falls back to `reviews.json` if the server isn't
running, **users cannot submit a review** when using the JSON file as a data
source.
