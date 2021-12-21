import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function Main() {
	return (
		<div>
			<Container>
				<Row>
					<Col>
						<Card className="card mt-3">
							<Card.Body className="d-flex flex-column justify-content-center">
								<Card.Title>Keep it everywhere</Card.Title>
								<Card.Text>
									Quickly capture what's on your mind and get
									a reminder later at the right place or time.
									Speak a voice memo on the go and have it
									automatically transcribed.
								</Card.Text>
								<Button variant="outline-dark">Keep it!</Button>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default Main;
