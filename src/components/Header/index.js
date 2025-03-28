import { Link } from "react-router-dom";

function Header() {
	return (
		<header className="navbar navbar-expand-lg bg-dark navbar-dark text-light">
			<div className="container-fluid">
				<Link className=" navbar-brand text-light" to="/">
					PrimeFlix
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						<li className="nav-item">
							<Link className="nav-link text-light" to="/favoritos">
								Meus filmes
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</header>
	);
}

export default Header;
