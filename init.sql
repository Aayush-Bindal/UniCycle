-- Enable UUID generation extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- USERS table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  username TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL UNIQUE,
  photo_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- HOSTELS table (linked by user_id)
CREATE TABLE hostels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  hostel_name TEXT NOT NULL,
  room_number TEXT NOT NULL
);

-- LISTINGS table
CREATE TABLE listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT CHECK (type IN ('sell', 'exchange')) NOT NULL,
  amount NUMERIC,
  category TEXT,
  image_url TEXT,
  is_sold BOOLEAN DEFAULT FALSE,
  is_night BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- REQUESTS table
CREATE TABLE requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
  buyer_id UUID REFERENCES users(id) ON DELETE CASCADE,
  message TEXT,
  status TEXT CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- TRANSACTIONS table (archive of completed deals)
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID REFERENCES listings(id),
  seller_id UUID REFERENCES users(id),
  buyer_id UUID REFERENCES users(id),
  amount NUMERIC,
  completed_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX ON users(email);
CREATE INDEX ON listings(user_id);
CREATE INDEX ON requests(listing_id);
CREATE INDEX ON requests(buyer_id);
