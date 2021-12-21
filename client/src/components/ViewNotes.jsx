import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const url = "http://127.0.0.1:3001";

const ViewNotes = () => {
	const [notes, setNote] = React.useState([]);

	React.useEffect(() => {
		axios.get(`${url}/note`).then((res) => {
			setNote(res.data);
		});
	}, []);

	const getNotes = async () => {
		try {
			const response = await axios.get(`${url}/note`);
			setNote(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	const deleteNote = async (id) => {
		try {
			await axios.delete(`${url}/note=${id}`);
			setNote(notes); //! carefull here to call it with notes, the updated item of the hook
			getNotes();
		} catch (error) {
			console.error(error);
		}
	};

	if (!notes.length) {
		return (
			<div>
				<Container className="mt-4">
					<Row>
						<Col>
							<Card className="card mt-3">
								<Card.Body className="d-flex flex-column justify-content-center">
									<Card.Title>No notes</Card.Title>
									<Card.Text>Create your first one</Card.Text>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>
			</div>
		);
	} else {
		return (
			<div>
				<Container className="mt-4">
					<Row>
						{notes.map((note) => (
							<Col key={note.id}>
								<Card className="card mt-3">
									<Card.Body className="d-flex flex-column justify-content-center">
										<Card.Title>{note.title}</Card.Title>
										<Card.Text>{note.content}</Card.Text>
										{/* prettier-ignore */}
										<Button className="btn btn-sm m-1" variant="outline-danger" onClick={()=>deleteNote(note.id)} > Delete </Button>
										{/* prettier-ignore */}
										<Button className="btn btn-sm m-1" variant="outline-primary" > Edit </Button>
									</Card.Body>
								</Card>
							</Col>
						))}
					</Row>
				</Container>
			</div>
		);
	}
};

export default ViewNotes;
