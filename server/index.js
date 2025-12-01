import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import vagasRouter from './routes/vagas.js';

dotenv.config();

const app = express();

// CORS - aceita requisições do frontend
app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? ['https://rodrigovagas.vercel.app'] // ⚠️ Atualize depois do deploy
        : ['http://localhost:5173'],
    credentials: true
}));

app.use(express.json());
app.use('/api/vagas', vagasRouter);

app.get('/', (req, res) => {
    res.json({ message: 'API funcionando!' });
});

// ⚠️ IMPORTANTE: usar process.env.PORT
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});