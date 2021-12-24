import React, { useState, useEffect } from "react";
import axios from "axios";
import {
	Button,
	Row,
	Container,
	Modal,
	Form,
	FloatingLabel,
} from "react-bootstrap";

export default function EditNote(note) {
	console.log(note);
	const [showModal, setShowModal] = useState(false);
	//close modal buttons functions
	const handleClose = () => setShowModal(false);
	const handleShow = () => setShowModal(true);

	const [title, setTitle] = useState(note.value.title);
	const [content, setContent] = useState(note.value.content);

	const saveNote = async (e) => {
		e.preventDefault();
		await axios
			.patch("http://127.0.0.1:3001/note=" + note.value.id, {
				title: title,
				content: content,
			})
			.then((res) => {
				try {
					handleClose();
					note.test();
					// window.location.reload();
				} catch (err) {
					throw new Error(err);
				}
			})
			.catch((err) => {
				console.error(err);
			});
	};

	return (
		<>
			{/* prettier-ignore */}
			<Button className="btn btn-sm m-1 float-end" variant="outline-primary" onClick={handleShow}> Edit </Button>

			<Modal
				show={showModal}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>{note.value.title}</Modal.Title>
				</Modal.Header>
				<Container fluid="sm" className="w-50 mt-3">
					<Row className="justify-content-md-center">
						<Form onSubmit={saveNote} method="post">
							<FloatingLabel
								controlId="title_area_id"
								label="Title"
								className="mb-2"
							>
								<Form.Control
									as="textarea"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									placeholder="Note title here"
								/>
							</FloatingLabel>
							<FloatingLabel
								controlId="note_area_id"
								label="Note"
								className="mb-3"
							>
								<Form.Control
									as="textarea"
									placeholder="Your note goes here"
									value={content}
									style={{ height: "8em" }}
									onChange={(e) => setContent(e.target.value)}
								/>
							</FloatingLabel>
							<Button
								variant="outline-primary"
								type="submit"
								size="sm"
							>
								Submit
							</Button>
							<Button
								variant="outline-danger"
								size="sm"
								type="reset"
								className="float-end"
								onClick={handleClose}
							>
								Cancel
							</Button>
						</Form>
					</Row>
				</Container>
			</Modal>
		</>
	);
}
