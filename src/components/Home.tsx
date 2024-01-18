import React, { useState, useEffect } from "react";
import { Container, Row, Alert, Spinner } from "react-bootstrap";
import { Article } from "../types/Article";
import ArticleCard from "./ArticleCard";
import NavBar from "./NavBar";
import HttpStatusAlert from "./HttpStatusAlert";

const HomePage = () => {
	const [articles, setArticles] = useState<Article[]>([]);
	const [error, setError] = useState<string>("");
	const [errorStatus, setErrorStatus] = useState<number>(0);

	const fetchArticles = async () => {
		try {
			const response = await fetch("https://api.spaceflightnewsapi.net/v4/articles");
			if (!response.ok) {
				setErrorStatus(response.status);
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			setArticles(data.results);
		} catch (error: any) {
			setError(error.message);
		}
	};

	useEffect(() => {
		fetchArticles();
	}, []);

	if (error) {
		return <HttpStatusAlert statusCode={errorStatus} />;
	}

	if (articles.length === 0) {
		return (
			<div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
				<Spinner animation="border" role="status"></Spinner>
			</div>
		);
	}

	return (
		<>
			<NavBar />
			<Container>
				<Row xs={1} md={2} lg={3}>
					{articles.map((article) => (
						<ArticleCard key={article.id} article={article} />
					))}
				</Row>
			</Container>
		</>
	);
};

export default HomePage;
