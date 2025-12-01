import axios from 'axios';

async function buscarVagas(searchQuery, pais, remoto) {
    const params = new URLSearchParams();
    if (searchQuery) params.append('query', searchQuery);
    params.append('page', 1);
    params.append('num_pages', 10);
    params.append('country', pais);
    params.append('language', pais === 'br' ? 'pt' : 'en');
    params.append('work_from_home', remoto);

    const options = {
        method: 'GET',
        url: 'https://api.openwebninja.com/jsearch/search',
        headers: {
            'x-api-key': process.env.API_KEY, // ⚠️ Usar variável de ambiente
            'Accept': '*/*'
        },
        params: params
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar vagas:", error.response?.data || error.message);
        return { data: [], error: error.message };
    }
}

export default buscarVagas;