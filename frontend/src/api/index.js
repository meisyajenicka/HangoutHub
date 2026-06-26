import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'hangouthub-secret-key';

// Database helper
const dbPath = path.join(__dirname, '../db.json');

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

// ============ AUTH ============
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const db = readDB();

    if (db.users.find(u => u.email === email)) {
      return res.status(400).json({ message: 'Email sudah terdaftar' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
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

    const token = jwt.sign({ userId: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: '7d' });
    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json({ user: userWithoutPassword, token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = readDB();

    const user = db.users.find(u => u.email === email);
    if (!user) return res.status(401).json({ message: 'Email atau password salah' });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: 'Email atau password salah' });

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    const { password: _, ...userWithoutPassword } = user;

    res.json({ user: userWithoutPassword, token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ============ MIDDLEWARE ============
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token tidak ditemukan' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).json({ message: 'Token tidak valid' });
  }
};

// ============ ACTIVITIES ============
app.get('/api/activities', (req, res) => {
  const db = readDB();
  let activities = [...db.activities];

  const { category, mood, search, city } = req.query;
  if (category && category !== 'all') {
    activities = activities.filter(a => a.category === category);
  }
  if (city && city !== 'all') {
    activities = activities.filter(a => a.city === city);
  }
  if (search) {
    const searchLower = search.toLowerCase();
    activities = activities.filter(a =>
      a.title.toLowerCase().includes(searchLower) ||
      a.description.toLowerCase().includes(searchLower)
    );
  }

  res.json(activities);
});

app.get('/api/activities/:id', (req, res) => {
  const db = readDB();
  const activity = db.activities.find(a => a.id === req.params.id);
  if (!activity) return res.status(404).json({ message: 'Not found' });
  res.json(activity);
});

app.get('/api/cities', (req, res) => {
  const db = readDB();
  const cities = [...new Set(db.activities.map(a => a.city))];
  res.json(cities);
});

// ============ PLANS ============
app.get('/api/plans', authenticate, (req, res) => {
  const db = readDB();
  const userPlans = db.plans.filter(p => p.userId === req.userId);
  const plansWithDetails = userPlans.map(plan => ({
    ...plan,
    activity: db.activities.find(a => a.id === plan.activityId)
  }));
  res.json(plansWithDetails);
});

app.post('/api/plans', authenticate, (req, res) => {
  const { activityId, planDate, duration } = req.body;
  const db = readDB();

  const activity = db.activities.find(a => a.id === activityId);
  if (!activity) return res.status(404).json({ message: 'Kegiatan tidak ditemukan' });

  const existing = db.plans.find(p => p.userId === req.userId && p.activityId === activityId);
  if (existing) return res.status(400).json({ message: 'Kegiatan sudah ada di rencana' });

  const newPlan = {
    id: Date.now().toString(),
    userId: req.userId,
    activityId,
    planDate: planDate || new Date().toISOString().split('T')[0],
    duration: duration || activity.duration || "2 jam",
    notes: '',
    status: 'planned',
    createdAt: new Date().toISOString()
  };

  db.plans.push(newPlan);
  writeDB(db);

  res.status(201).json({ ...newPlan, activity });
});

app.patch('/api/plans/:id', authenticate, (req, res) => {
  const { status } = req.body;
  const db = readDB();
  const planIndex = db.plans.findIndex(p => p.id === req.params.id && p.userId === req.userId);
  if (planIndex === -1) return res.status(404).json({ message: 'Rencana tidak ditemukan' });

  db.plans[planIndex].status = status;
  writeDB(db);
  res.json(db.plans[planIndex]);
});

app.delete('/api/plans/:id', authenticate, (req, res) => {
  const db = readDB();
  const planIndex = db.plans.findIndex(p => p.id === req.params.id && p.userId === req.userId);
  if (planIndex === -1) return res.status(404).json({ message: 'Rencana tidak ditemukan' });

  db.plans.splice(planIndex, 1);
  writeDB(db);
  res.json({ message: 'Rencana berhasil dihapus' });
});

// ============ SERVER ============
export default app;