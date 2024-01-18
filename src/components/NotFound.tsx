import React from "react";
import { Container, Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const NotFound: React.FC = () => {
	const navigate = useNavigate();

	return (
		<>
			<NavBar />
			<Container className="d-flex flex-column align-items-center justify-content-center" style={{ height: "100vh" }}>
				<Alert variant="danger p-5">
					<Alert.Heading>404 - Pagina non trovata!</Alert.Heading>
					<p>La pagina che stai cercando non esiste o è stata rimossa.</p>
					<hr />
					<div className="d-flex justify-content-center">
						<Button onClick={() => navigate("/")} variant="outline-secondary">
							Torna alla Home
						</Button>
					</div>
				</Alert>
			</Container>
		</>
	);
};

export default NotFound;
