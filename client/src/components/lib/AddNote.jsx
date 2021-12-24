import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Row, Container, FloatingLabel } from "react-bootstrap";

export default function AddNote({ sendDataToParent }) {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	let [createNote, setCreateNote] = useState(false); //changing state when a post is submited

	const saveNote = async (e) => {
		e.preventDefault();
		await axios
			.post("http://127.0.0.1:3001/note", {
				title: title,
				content: content,
			})
			.then(() => {
				setTitle(""); //clear the values
				setContent(""); //clear the values
				setCreateNote(!createNote); //change the state to then Lift it to the parent, then pass it down to the ViewNotes component triggering a get() request
				sendDataToParent(createNote); //imported function that sends the data when a note is submited back to the parent
			})
			.catch((err) => console.error(err));
	};
	return (
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
					<Button variant="outline-primary" type="submit" size="sm">
						Submit
					</Button>
					<Button
						variant="outline-danger"
						size="sm"
						type="reset"
						className="float-end"
					>
						Cancel
					</Button>
				</Form>
			</Row>
		</Container>
	);
}
