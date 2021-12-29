import { Col, Row, Container, Card } from "react-bootstrap";

export default function NoNotes() {
	return (
		<div>
			<Container className="mt-4">
				<Row>
					<Col>
						<Card className="card mt-3">
							<Card.Body className="d-flex flex-column justify-content-center">
								<Card.Title>No notes found</Card.Title>
								<Card.Text>Create your first one</Card.Text>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
}
