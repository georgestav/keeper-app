import { Row, Container } from "react-bootstrap/";

export default function Footer() {
	const year = new Date();

	return (
		<footer className="bg-dark text-white">
			<Container className="">
				<Row>
					<div className="text-center">
						<p>
							{year.getFullYear()} Copyright{" "}
							<a
								href="https://georgestav.dev/"
								target="_blank"
								className="text-decoration-none text-info"
							>
								georgestav.dev
							</a>
						</p>
					</div>
				</Row>
			</Container>
		</footer>
	);
}
