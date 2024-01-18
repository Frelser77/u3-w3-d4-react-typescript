import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Article } from "../types/Article";
import { Event } from "../types/Article";
import { Alert, Card, Button, Spinner, Container, Row, Col } from "react-bootstrap";
import NavBar from "./NavBar";
import HttpStatusAlert from "./HttpStatusAlert";
import { Link } from "react-router-dom";

const ArticleDetails = () => {
	const { id } = useParams<{ id: string }>();
	const [article, setArticle] = useState<Article | null>(null);
	const [error, setError] = useState<string>("");
	const [errorStatus, setErrorStatus] = useState<number>(0);

	useEffect(() => {
		const fetchArticle = async () => {
			try {
				const response = await fetch(`https://api.spaceflightnewsapi.net/v4/articles/${id}`);
				if (!response.ok) {
					setErrorStatus(response.status);
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data = await response.json();
				setArticle(data);
			} catch (error: any) {
				setError(error.message);
			}
		};

		if (id) {
			fetchArticle();
		}
	}, [id]);

	if (error) {
		return <HttpStatusAlert statusCode={errorStatus} />;
	}

	if (!article) {
		return (
			<div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
				<Spinner animation="border" role="status"></Spinner>
			</div>
		);
	}

	const publishedDate = new Date(article.published_at).toLocaleDateString("it-IT", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	return (
		<>
			<NavBar />
			<Container>
				<Row className="justify-content-center my-auto mx-auto">
					{/* <h2>{article.title}</h2> */}
					<Col md={7} lg={9} className="p-3">
						<Card className="bg-dark text-white">
							<Card.Img src={article.image_url} alt={article.title} className="rounded" />
							<div className="card-img-overlay d-flex flex-column justify-content-end align-items-center card-overlay rounded-buttom">
								<Card.Title className="fs-4">{article.title}</Card.Title>
								<Card.Text className="fs-6">{article.summary}</Card.Text>
								<Link to={article?.url} className="btn btn-dark mb-1" target="_blanck">
									Leggi l'articolo completo
								</Link>
								<Card.Text className="ms-auto me-1">Pubblicato il: {publishedDate}</Card.Text>
							</div>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default ArticleDetails;
