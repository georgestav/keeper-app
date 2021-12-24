import { Navbar, Container, Nav } from "react-bootstrap/";
import { NavLink } from "react-router-dom";

export default function Header() {
	return (
		<header>
			<Navbar bg="dark" variant="dark">
				<Container>
					{/* prettier-ignore */}
					<Navbar.Brand as={NavLink} to="/">Keeper</Navbar.Brand>
					<Nav className="justify-content-end">
						{/* prettier-ignore */}
						<Nav.Link as={NavLink} to="/about">About</Nav.Link>
						{/* prettier-ignore */}
						<Nav.Link as={NavLink} to="/keepit">Keep it</Nav.Link>
						{/* prettier-ignore */}
						<Nav.Link as={NavLink} to="/register">Register</Nav.Link>
						{/* prettier-ignore */}
						<Nav.Link as={NavLink} to="/profile">Profile</Nav.Link>
					</Nav>
				</Container>
			</Navbar>
		</header>
	);
}
