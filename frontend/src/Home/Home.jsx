import { useState } from "react";
import buscarVagas from "../../../server/controllers/buscarVagas.js";
import "./Home.css";

function Home() {
    const [query, setQuery] = useState('');
    const [carregando, setCarregando] = useState(false);
    const [remoto, setRemoto] = useState('false');
    const [vagas, setVagas] = useState([]);
    const [pais, setPais] = useState('us');
    const [selectedJob, setSelectedJob] = useState(null);

    const handleSearch = async () => {
        if (!query.trim()) {
            alert("Por favor, insira uma busca válida.");
            return;
        }

        setCarregando(true);
        setSelectedJob(null); // Clear selection on new search

        const searchQuery = `${query}`.trim();
        const resultado = await buscarVagas(searchQuery, pais, remoto);

        setVagas(resultado);
        setCarregando(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    return (
        <div className="min-h-screen bg-white text-gray-900">
            {/* Header / Search Section */}
            <div className="border-b border-gray-200 pb-4 pt-4 px-4 sticky top-0 bg-white z-10">
                <div className="max-w-7xl mx-auto space-y-4">

                    {/* Search Bar Row */}
                    <div className="flex flex-col md:flex-row gap-2 md:gap-0 md:border md:border-gray-300 md:rounded-full md:shadow-sm md:p-1 items-center">

                        {/* Keyword Input */}
                        <div className="flex-1 flex items-center px-4 py-2 w-full md:w-auto border border-gray-300 md:border-none rounded-full md:rounded-none">
                            <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Cargo, palavras-chave ou empresa"
                                className="w-full outline-none text-gray-700 placeholder-gray-500 bg-transparent"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>



                        {/* Search Button */}
                        <button
                            onClick={handleSearch}
                            disabled={carregando}
                            className="bg-[#324D7E] border-none text-white font-400 py-2 px-6 rounded-full w-full md:w-auto cursor-pointer"
                        >
                            {carregando ? 'Buscando...' : 'Achar vagas'}
                        </button>
                    </div>

                    {/* Filters Row */}
                    <div className="flex flex-wrap gap-2 items-center text-sm">
                        <select
                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full border-none cursor-pointer outline-none text-gray-700 font-medium "
                            value={pais}
                            onChange={(e) => setPais(e.target.value)}
                        >
                            <option className="text-gray-700 bg-gray-100" value="us">Estados Unidos</option>
                            <option className="text-gray-700 bg-gray-100" value="br">Brasil</option>
                        </select>

                        <select
                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full border-none cursor-pointer outline-none text-gray-700 font-medium"
                            value={remoto}
                            onChange={(e) => setRemoto(e.target.value)}
                        >
                            <option className="text-gray-700 bg-gray-100" value="false">Presencial</option>
                            <option className="text-gray-700 bg-gray-100" value="true">Remoto</option>
                        </select>


                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* Left Column: Job List */}
                    <div className="lg:col-span-5 space-y-4">


                        <div className="text-sm text-gray-500 pb-2">
                            {vagas.data?.length ? `Vagas de emprego: ${query}` : 'Realize uma busca para ver vagas'}
                        </div>

                        {/* Job Cards */}
                        {vagas.data?.map((vaga, index) => (
                            <div
                                key={index}
                                onClick={() => setSelectedJob(vaga)}
                                className={`border rounded-xl p-4 cursor-pointer hover:shadow-md transition-all ${selectedJob === vaga ? 'border-blue-600 ring-1 ring-blue-600' : 'border-gray-200'}`}
                            >
                                <h3 className="font-bold text-lg text-gray-900 mb-1">{vaga.job_title}</h3>
                                <p className="text-gray-800 mb-1">{vaga.employer_name}</p>
                                <p className="text-gray-600 text-sm mb-3">{vaga.job_city} {vaga.job_state}</p>

                                <div className="flex gap-2 mb-3">
                                    {vaga.job_is_remote && (
                                        <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded font-medium">Remoto</span>
                                    )}

                                </div>

                                <ul className="list-disc list-inside text-sm text-gray-500 line-clamp-3">
                                    {vaga.job_description.split(' ').length > 20
                                        ? vaga.job_description.split(' ').slice(0, 20).join(' ') + '...'
                                        : vaga.job_description
                                    }
                                </ul>

                            </div>
                        ))}

                        {vagas.data?.length === 0 && !carregando && (
                            <div className="text-center py-10 text-gray-500">
                                Nenhuma vaga encontrada. Tente outros termos.
                            </div>
                        )}
                    </div>

                    {/* Right Column: Job Details (Sticky) */}
                    <div className="hidden lg:block lg:col-span-7">
                        <div className="sticky top-40 bg-white border border-gray-200 rounded-xl shadow-sm h-[calc(100vh-12rem)] overflow-y-auto">
                            {selectedJob ? (
                                <div className="p-8">
                                    {/* Job Header */}
                                    <div className="mb-6">
                                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedJob.job_title}</h2>
                                        <div className="flex items-center text-gray-700 mb-4">
                                            <span className="font-medium underline mr-2">{selectedJob.employer_name}</span>
                                            <span>•</span>
                                            <span className="ml-2">{selectedJob.job_city} {selectedJob.job_state}</span>
                                        </div>

                                        <div className="flex gap-3">
                                            <a
                                                href={selectedJob.job_apply_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-full transition-colors"
                                            >
                                                Candidatar-se agora
                                            </a>

                                        </div>
                                    </div>

                                    <hr className="my-6 border-gray-200" />

                                    {/* Job Description */}
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">Descrição completa da vaga</h3>
                                        <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-line">
                                            {selectedJob.job_description}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Pesquise ou Selecione uma vaga</h2>

                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>

            {/* Mobile Job Details Popup */}
            {selectedJob && (
                <div className="fixed inset-0 bg-white z-50 lg:hidden overflow-y-auto">
                    <div className="p-4 border-b border-gray-200 sticky top-0 bg-white flex items-center shadow-sm">
                        <button
                            onClick={() => setSelectedJob(null)}
                            className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </button>
                        <h2 className="font-bold text-lg text-gray-900 truncate flex-1">{selectedJob.employer_name}</h2>
                    </div>
                    <div className="p-6 pb-20">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedJob.job_title}</h2>
                            <div className="flex items-center text-gray-700 mb-4 flex-wrap">
                                <span className="font-medium underline mr-2">{selectedJob.employer_name}</span>
                                <span className="mr-2">•</span>
                                <span>{selectedJob.job_city}, {selectedJob.job_state}</span>
                            </div>

                            <div className="flex gap-3 mb-6">
                                <a
                                    href={selectedJob.job_apply_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-full flex-1 text-center transition-colors"
                                >
                                    Candidatar-se
                                </a>
                                <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-3 px-4 rounded-full transition-colors">
                                    Salvar
                                </button>
                            </div>

                            <hr className="my-6 border-gray-200" />

                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Descrição completa da vaga</h3>
                                <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-line">
                                    {selectedJob.job_description}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
