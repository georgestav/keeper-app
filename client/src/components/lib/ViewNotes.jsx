import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Col, Row, Container, Card } from "react-bootstrap";
import NoNotes from "./NoNotes";
import EditNote from "./EditNote";
import ErrorBoundary from "../ErrorBoundary";

const url = process.env.API_ADDRESS || "http://127.0.0.1:3001/api";

const getNotes = async (setNote) => {
	try {
		const response = await axios.get(`${url}/note`);
		return setNote(response.data);
	} catch (error) {
		console.error(error);
	}
};

const deleteNote = async (id, setNote, getNotes, notes) => {
	try {
		await axios.delete(`${url}/note=${id}`);
		setNote(notes);
		getNotes(setNote);
	} catch (error) {
		console.error(error);
	}
};

export default function ViewNotes(edited) {
	const [notes, setNote] = useState([]);

	const test = () => {
		getNotes(setNote);
	};

	useEffect(() => {
		getNotes(setNote);
	}, [edited]);

	function RenderNotes() {
		return (
			<div>
				<Container className="mt-2">
					<Row>
						{notes.map((note) => (
							<Col key={note.id} className="mt-2">
								<Card className="card ">
									<Card.Body className="d-flex flex-column justify-content-center">
										<Card.Title>{note.title}</Card.Title>

										<Card.Text>{note.content}</Card.Text>

										<ErrorBoundary>
											<Button
												className="btn btn-sm m-1 float-start"
												variant="outline-danger"
												onClick={() =>
													deleteNote(
														note.id,
														setNote,
														getNotes,
														notes
													)
												}
											>
												{" "}
												Delete{" "}
											</Button>

											<EditNote
												value={note}
												test={test}
											/>
										</ErrorBoundary>
									</Card.Body>
								</Card>
							</Col>
						))}
					</Row>
				</Container>
			</div>
		);
	}

	if (!notes.length) {
		return <NoNotes />;
	} else {
		return <RenderNotes />;
	}
}
