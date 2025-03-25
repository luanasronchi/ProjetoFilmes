import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../../services/api";

function Filme() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [filme, setFilme] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function loadFilme() {
			await api
				.get(`/movie/${id}`, {
					params: {
						api_key: "56794df4829ff24d5b5c4764bb1eeeb2",
						language: "pt-BR",
					},
				})
				.then((response) => {
					setFilme(response.data);
					setLoading(false);
				})
				.catch(() => {
					navigate("/", { replace: true });
					return;
				});
		}

		loadFilme();

		return () => {
			console.log("componente foi desmontado");
		};
	}, [navigate, id]);

	function salvarFilme() {
		const minhaLista = localStorage.getItem("@primeFlix");

		let filmesSalvos = JSON.parse(minhaLista) || [];

		const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id);

		if (hasFilme) {
			toast.warn("Esse filme já está na lista!");
			return;
		}

		filmesSalvos.push(filme);
		localStorage.setItem("@primeFlix", JSON.stringify(filmesSalvos));
		toast.success("Filme Salvo!");
	}

	if (loading) {
		return (
			<div className="container text-center">
				<h2>Carregando detalhes...</h2>
			</div>
		);
	}

	return (
		<div className="container">
			<div className="row justify-content-center">
				<article className="col-lg-8 col-md-10 col-12 mt-3" key={filme.id}>
					<div>
						<h1 className="card-title">{filme.title}</h1>
						<img
							className="card-img-top mt-3 rounded"
							src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
							alt={filme.title}
						/>
						<div className="card-body mt-3">
							<h4>Descrição</h4>
							<p className="card-text">{filme.overview}</p>
							<strong>Avaliação: {filme.vote_average} / 10</strong>
							<div className="d-flex gap-2 mt-3">
								<button className="btn btn-outline-primary" onClick={salvarFilme}>
									Salvar
								</button>
								<a
									className="btn btn-outline-primary"
									target="_blank"
									rel="external"
									href={`https://youtube.com/results?search_query=${filme.title} Trailer`}
								>
									Trailer
								</a>
							</div>
						</div>
					</div>
				</article>
			</div>
		</div>
	);
}

export default Filme;
