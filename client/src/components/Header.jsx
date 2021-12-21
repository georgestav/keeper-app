import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

function Header() {
	return (
		<header>
			<Navbar bg="dark" variant="dark">
				<Container>
					<Navbar.Brand href="#home">Keeper</Navbar.Brand>
					<Nav className="justify-content-end">
						<Nav.Link href="/about">About</Nav.Link>
						<Nav.Link href="/keepit">Keep it</Nav.Link>
						<Nav.Link href="/register">Register</Nav.Link>
						<Nav.Link href="/profile">Profile</Nav.Link>
					</Nav>
				</Container>
			</Navbar>
		</header>
	);
}

export default Header;
