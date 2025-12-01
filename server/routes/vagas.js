import express from 'express';
import buscarVagas from '../controllers/buscarVagas.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { query, pais, remoto } = req.query;

        console.log('Recebendo requisição:', { query, pais, remoto });

        if (!query) {
            return res.status(400).json({
                error: 'Query parameter is required'
            });
        }

        const resultado = await buscarVagas(query, pais, remoto);

        return res.json(resultado);
    } catch (error) {
        console.error('Erro na rota:', error);
        return res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
});

export default router;