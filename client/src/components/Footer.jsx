import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function Footer() {
	const year = new Date();

	return (
		<footer className="fixed-bottom">
			<hr />
			<Container className="">
				<Row>
					<div className="text-center">
						<p>
							{year.getFullYear()} Copyright{" "}
							<a href="georgestav.dev">georgestav.dev</a>
						</p>
					</div>
				</Row>
			</Container>
		</footer>
	);
}

export default Footer;
