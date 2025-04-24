/*
  # Update Products Table RLS Policies
  
  1. Changes
    - Drop existing products RLS policies
    - Create new policies using proper role-based access control
    - Policies now check for admin role in JWT claims
  
  2. Security
    - Admins can perform all operations on products
    - Public users can only view products
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Products are viewable by everyone" ON products;
DROP POLICY IF EXISTS "Products are editable by admin users only" ON products;

-- Create new policies using proper role checks
CREATE POLICY "Anyone can view products" ON products
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage products" ON products
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');