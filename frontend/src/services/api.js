const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const buscarVagas = async (query, pais, remoto) => {
    try {
        const url = `${API_URL}/api/vagas?query=${encodeURIComponent(query)}&pais=${pais}&remoto=${remoto}`;

        console.log('Chamando backend:', url);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Resposta recebida:', data);
        return data;

    } catch (error) {
        console.error('Erro ao buscar vagas:', error);
        return { data: [], error: error.message };
    }
};

export default buscarVagas;