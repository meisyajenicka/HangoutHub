import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = 'hangouthub-super-secret-key';

// Database helper
const dbPath = path.join(__dirname, '../backend/db.json');

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

// AUTH
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
      createdAt: new Date().toISOString()
    };
    db.users.push(newUser);
    writeDB(db);
    const token = jwt.sign({ userId: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: '7d' });
    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json({ user: userWithoutPassword, token });
  } catch (error) {
    console.error(error);
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
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/activities', (req, res) => {
  try {
    const db = readDB();
    res.json(db.activities);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/activities/:id', (req, res) => {
  try {
    const db = readDB();
    const activity = db.activities.find(a => a.id === req.params.id);
    if (!activity) return res.status(404).json({ message: 'Kegiatan tidak ditemukan' });
    res.json(activity);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/cities', (req, res) => {
  try {
    const db = readDB();
    const cities = [...new Set(db.activities.map(a => a.city))];
    res.json(cities);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// Export untuk Vercel
export default app;