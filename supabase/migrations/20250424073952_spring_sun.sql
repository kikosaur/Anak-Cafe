/*
  # Update products table RLS policies

  1. Changes
    - Remove existing RLS policies for products table
    - Add new policies that check for admin role in JWT claims
    
  2. Security
    - Only admin users can manage products (create, update, delete)
    - Anyone can view products
    - Uses JWT role claim instead of email for admin check
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Admins can manage products" ON products;
DROP POLICY IF EXISTS "Anyone can view products" ON products;

-- Create new policies
CREATE POLICY "Admins can manage products"
ON products
FOR ALL
TO public
USING (((auth.jwt() ->> 'role'::text) = 'admin'::text))
WITH CHECK (((auth.jwt() ->> 'role'::text) = 'admin'::text));

CREATE POLICY "Anyone can view products"
ON products
FOR SELECT
TO public
USING (true);