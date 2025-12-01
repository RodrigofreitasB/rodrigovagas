import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import vagasRouter from './routes/vagas.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/vagas', vagasRouter);

app.get('/', (req, res) => {
    res.send('Servidor rodando!');
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});