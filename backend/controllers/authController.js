const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/usermodel');

// Update the system password
const SYSTEM_PASSWORD = process.env.ADMIN_SYSTEM_PASSWORD || '7775918SAM';

//register user
const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  console.log("Received registration data:", { name, email, role });

  // Input validation
  if (!name || !email || !password || !role) {
    console.log("Missing fields in registration data.");
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.log("Invalid email format:", email);
    return res.status(400).json({ 
      errors: { email: 'Invalid email format. Email must include "@" and a domain like ".com".' } 
    });
  }
// Basic password validation
if (password.length < 8) {
  return res.status(400).json({
    errors: { password: 'Password must be at least 8 characters long.' }
  });
}

if (!/[A-Za-z]/.test(password)) {
  return res.status(400).json({
    errors: { password: 'Password must include at least one aplhabets' }
  });
}

if (!/\d/.test(password)) {
  return res.status(400).json({
    errors: { password: 'Password must include at least one number' }
  });
}

if (!/[@$!%*?&#]/.test(password)) {
  return res.status(400).json({
    errors: { password: 'Password must include at least one special character' }
  });
}

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User with this email already exists:", email);
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    console.log("User registered successfully:", { name, email, role });
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: 'Error registering user' });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Received login data:", { email });

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.error("User not found:", email);
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.error("Password does not match for:", email);
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY || '2h' } // Use environment variable for expiry if set
    );

    // Successful login
    console.log("User logged in successfully:", { email, role: user.role });
    res.status(200).json({
      message: 'Login successful.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    // Catch unexpected errors
    console.error("Error logging in user:", error.message);
    res.status(500).json({ message: 'Error logging in user. Please try again later.' });
  }
};

const verifyAdminSystem = async (req, res) => {
  try {
    const { email, systemPassword } = req.body;

    // Check if the email belongs to an admin
    const admin = await User.findOne({ email, role: 'admin' });
    if (!admin) {
      return res.status(403).json({ message: 'Not authorized as admin' });
    }

    // Verify system password
    if (systemPassword !== SYSTEM_PASSWORD) {
      return res.status(403).json({ message: 'Invalid system password' });
    }

    // Generate a special admin token with additional privileges
    const adminToken = jwt.sign(
      { 
        userId: admin._id, 
        role: admin.role,
        isSystemVerified: true // Add this flag for additional security
      },
      process.env.JWT_SECRET,
      { expiresIn: '4h' }
    );

    res.json({ 
      success: true, 
      token: adminToken,
      message: 'Admin verification successful'
    });
  } catch (error) {
    console.error('Admin verification error:', error);
    res.status(500).json({ message: 'Server error during admin verification' });
  }
};

module.exports = { register, login, verifyAdminSystem };
