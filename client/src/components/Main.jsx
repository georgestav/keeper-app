import React, { useState, useEffect } from "react";
import AddNote from "./lib/AddNote";
import ViewNotes from "./lib/ViewNotes";

export default function Main() {
	// state storage for the changing value, that value changes when a note is saved and is passed down to the ViewNotes component triggering a get request to the server
	const [edited, setEdited] = useState(true);

	//hande data received from child component
	const sendDataToParent = (index) => {
		setEdited(index);
	};
	return (
		<div>
			<div>
				<AddNote sendDataToParent={sendDataToParent} />
				{/* send the function down to child that is going to return true or false each time an article is saved */}
			</div>
			<div>
				<ViewNotes edited={edited} />
				{/* sending down to child that is going to re-render when the value changes */}
			</div>
		</div>
	);
}
