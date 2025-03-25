import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Favoritos() {
	const [filmes, setFilmes] = useState([]);

	useEffect(() => {
		const minhaLista = localStorage.getItem("@primeFlix");
		setFilmes(JSON.parse(minhaLista) || []);
	}, []);

	function excluirFilme(id) {
		let filtroFilmes = filmes.filter((item) => {
			return item.id !== id;
		});

		setFilmes(filtroFilmes);
		localStorage.setItem("@primeFlix", JSON.stringify(filtroFilmes));
    toast.success("Filme Removido!")
	}

	return (
		<div className="container">
			<h1>Filmes Favoritos</h1>

      {filmes.length === 0 && <span>Você não possui nenhum filme salvo!</span>}

			<ul>
				{filmes.map((item) => {
					return (
						<li className="mt-3 d-flex align-items-center justify-content-between gap-2" key={item.id}>
							<span>{item.title}</span>
							<div className="d-flex gap-2">
								<Link className="btn btn-primary" to={`/filme/${item.id}`}>
									Ver detalhes
								</Link>
								<button className="btn btn-danger" onClick={() => {excluirFilme(item.id)}}>
									Excluir
								</button>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default Favoritos;
