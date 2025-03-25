import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

function Home() {
	const [filmes, setFilmes] = useState([]);
	const [loading, setLoading] = useState(true);


	useEffect(() => {
		async function loadFilmes() {
			const response = await api.get("movie/now_playing", {
				params: {
					api_key: "56794df4829ff24d5b5c4764bb1eeeb2",
					language: "pt-BR",
					page: 1,
				},
			});
			setFilmes(response.data.results.slice(0, 10));
      setLoading(false)
		}

		loadFilmes();
	}, []);

  if(loading){
    return(
      <div className="container text-center">
        <h2>Carregando filmes...</h2>
      </div>
    )
  }

	return (
		<div className="container">
			<div className="row justify-content-center g-4">
				{filmes.map((filme) => (
					<article className="col-lg-3 col-md-6 col-12" key={filme.id}>
						<div className="card">
							<div className="ratio ratio-2x3" style={{ "--bs-aspect-ratio": "150%" }}>
								<img
									className="card-img-top img-fluid object-fit-cover"
									src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
									alt={filme.title}
								/>
							</div>
							<div className="card-body text-center">
								<h5 className="card-title text-truncate">{filme.title}</h5>
								<Link className="btn btn-primary" to={`/filme/${filme.id}`}>
									Acessar
								</Link>
							</div>
						</div>
					</article>
				))}
			</div>
		</div>
	);
}

export default Home;
