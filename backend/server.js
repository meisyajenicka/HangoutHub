import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Konfigurasi
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'hangouthub-super-secret-key';

// Middleware
app.use(cors());
app.use(express.json());

// Database helper
const dbPath = path.join(__dirname, 'db.json');

const readDB = () => {
  try {
    const data = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return { users: [], activities: [], plans: [] };
  }
};

const writeDB = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// ============ MIDDLEWARE AUTENTIKASI ============
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Token tidak ditemukan' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    req.userEmail = decoded.email;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token tidak valid' });
  }
};

// ============ AUTH ROUTES ============

// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const db = readDB();

    // Cek email sudah terdaftar
    if (db.users.find(u => u.email === email)) {
      return res.status(400).json({ message: 'Email sudah terdaftar' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat user baru
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=8B5CF6&color=fff`,
      createdAt: new Date().toISOString()
    };

    db.users.push(newUser);
    writeDB(db);

    // Generate JWT
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Hapus password dari response
    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json({
      message: 'Registrasi berhasil',
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = readDB();

    // Cari user
    const user = db.users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ message: 'Email atau password salah' });
    }

    // Verifikasi password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Email atau password salah' });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Hapus password dari response
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      message: 'Login berhasil',
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get profile
app.get('/api/auth/profile', authenticate, (req, res) => {
  try {
    const db = readDB();
    const user = db.users.find(u => u.id === req.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ============ ACTIVITIES ROUTES ============

// Get all activities (with filters)
app.get('/api/activities', (req, res) => {
  try {
    const db = readDB();
    let activities = [...db.activities];

    const { category, mood, search, city } = req.query;

    if (category && category !== 'all') {
      activities = activities.filter(a => a.category === category);
    }
    if (mood && mood !== 'all') {
      activities = activities.filter(a => a.mood === mood);
    }
    if (city && city !== 'all') {
      activities = activities.filter(a => a.city === city);
    }
    if (search) {
      const searchLower = search.toLowerCase();
      activities = activities.filter(a => 
        a.title.toLowerCase().includes(searchLower) ||
        a.description.toLowerCase().includes(searchLower) ||
        a.location.toLowerCase().includes(searchLower)
      );
    }

    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get activity by ID
app.get('/api/activities/:id', (req, res) => {
  try {
    const db = readDB();
    const activity = db.activities.find(a => a.id === req.params.id);
    
    if (!activity) {
      return res.status(404).json({ message: 'Kegiatan tidak ditemukan' });
    }

    res.json(activity);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get cities (for filter)
app.get('/api/cities', (req, res) => {
  try {
    const db = readDB();
    const cities = [...new Set(db.activities.map(a => a.city))];
    res.json(cities);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ============ PLANS ROUTES (Protected) ============

// Get user's plans
app.get('/api/plans', authenticate, (req, res) => {
  try {
    const db = readDB();
    const userPlans = db.plans.filter(p => p.userId === req.userId);
    
    // Populate activity details
    const plansWithDetails = userPlans.map(plan => ({
      ...plan,
      activity: db.activities.find(a => a.id === plan.activityId)
    }));

    res.json(plansWithDetails);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add plan
app.post('/api/plans', authenticate, (req, res) => {
  try {
    const { activityId, planDate, notes } = req.body;
    const db = readDB();

    // Cek activity exists
    const activity = db.activities.find(a => a.id === activityId);
    if (!activity) {
      return res.status(404).json({ message: 'Kegiatan tidak ditemukan' });
    }

    // Cek duplikat
    const existing = db.plans.find(p => p.userId === req.userId && p.activityId === activityId);
    if (existing) {
      return res.status(400).json({ message: 'Kegiatan sudah ada di rencana' });
    }

    const newPlan = {
      id: Date.now().toString(),
      userId: req.userId,
      activityId,
      planDate: planDate || new Date().toISOString().split('T')[0],
      notes: notes || '',
      status: 'planned',
      createdAt: new Date().toISOString()
    };

    db.plans.push(newPlan);
    writeDB(db);

    res.status(201).json({
      ...newPlan,
      activity
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update plan status (planned → completed)
app.patch('/api/plans/:id', authenticate, (req, res) => {
  try {
    const { status } = req.body;
    const db = readDB();
    
    const planIndex = db.plans.findIndex(p => p.id === req.params.id && p.userId === req.userId);
    
    if (planIndex === -1) {
      return res.status(404).json({ message: 'Rencana tidak ditemukan' });
    }

    db.plans[planIndex].status = status;
    writeDB(db);

    res.json(db.plans[planIndex]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete plan
app.delete('/api/plans/:id', authenticate, (req, res) => {
  try {
    const db = readDB();
    const planIndex = db.plans.findIndex(p => p.id === req.params.id && p.userId === req.userId);
    
    if (planIndex === -1) {
      return res.status(404).json({ message: 'Rencana tidak ditemukan' });
    }

    db.plans.splice(planIndex, 1);
    writeDB(db);

    res.json({ message: 'Rencana berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ============ START SERVER ============
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📁 Database: ${dbPath}`);
});
// ============ GET ACTIVITIES BY LOCATION ============
app.get('/api/activities/nearby', (req, res) => {
  try {
    const { lat, lng, radius = 50000 } = req.query; // radius in meters (default 50km)
    const db = readDB();
    
    // Get all activities with city coordinates
    const cityCoordinates = {
      'Jakarta': { lat: -6.2088, lng: 106.8456 },
      'Bandung': { lat: -6.9175, lng: 107.6191 },
      'Cipanas': { lat: -6.7333, lng: 107.0333 },
      'Bogor': { lat: -6.5971, lng: 106.8060 },
      'Surabaya': { lat: -7.2575, lng: 112.7521 },
      'Yogyakarta': { lat: -7.7956, lng: 110.3695 },
      'Bali': { lat: -8.3405, lng: 115.0920 }
    };

    // Calculate distance between two coordinates (Haversine formula)
    function calculateDistance(lat1, lon1, lat2, lon2) {
      const R = 6371; // Earth's radius in km
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      return R * c; // Distance in km
    }

    // Get user city based on nearest city
    let nearestCity = null;
    let minDistance = Infinity;
    
    for (const [city, coords] of Object.entries(cityCoordinates)) {
      const dist = calculateDistance(lat, lng, coords.lat, coords.lng);
      if (dist < minDistance) {
        minDistance = dist;
        nearestCity = city;
      }
    }

    // Filter activities by nearest city
    let activities = db.activities;
    if (nearestCity) {
      activities = activities.filter(a => a.city === nearestCity);
    }

    // Add distance info to each activity
    activities = activities.map(activity => {
      const cityCoord = cityCoordinates[activity.city];
      let distance = null;
      if (cityCoord) {
        distance = calculateDistance(lat, lng, cityCoord.lat, cityCoord.lng);
      }
      return {
        ...activity,
        distance: distance ? `${Math.round(distance)} km` : 'Unknown',
        distanceKm: distance
      };
    });

    // Sort by distance (nearest first)
    activities.sort((a, b) => (a.distanceKm || Infinity) - (b.distanceKm || Infinity));

    res.json({
      nearestCity,
      userLocation: { lat, lng },
      activities
    });
  } catch (error) {
    console.error('Error fetching nearby:', error);
    res.status(500).json({ message: 'Server error' });
  }
});