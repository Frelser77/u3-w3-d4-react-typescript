import React, { useState, useEffect } from "react";
import { Container, Row, Button, Alert, Spinner } from "react-bootstrap";
import { Article } from "../types/Article";
import ArticleCard from "./ArticleCard";
import NavBar from "./NavBar";
import HttpStatusAlert from "./HttpStatusAlert";

const HomePage = () => {
	const [articles, setArticles] = useState<Article[]>([]);
	const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
	const [error, setError] = useState<string>("");
	const [errorStatus, setErrorStatus] = useState<number>(0);
	const [loading, setLoading] = useState<boolean>(false);
	const [totalArticles, setTotalArticles] = useState<number>(0);
	const articlesPerPage: number = 10;

	const fetchArticles = async (url: string) => {
		setLoading(true);
		try {
			const response = await fetch(url);
			if (!response.ok) {
				setErrorStatus(response.status);
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			setArticles((prevArticles) => [...prevArticles, ...data.results]);
			setNextPageUrl(data.next);
		} catch (error: any) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchArticles("https://api.spaceflightnewsapi.net/v4/articles");
	}, []);

	const handleLoadMore = () => {
		if (nextPageUrl) {
			fetchArticles(nextPageUrl);
		}
	};

	if (error) {
		return <HttpStatusAlert statusCode={errorStatus} />;
	}

	const totalPages = Math.ceil(totalArticles / articlesPerPage);

	// Funzione per cambiare pagina
	const goToPage = (pageNumber: number) => {
		const offset = (pageNumber - 1) * articlesPerPage;
		const url = `https://api.spaceflightnewsapi.net/v4/articles?_limit=${articlesPerPage}&_start=${offset}`;
		fetchArticles(url);
	};

	return (
		<>
			<NavBar />
			<Container>
				<Row xs={1} md={2} lg={3}>
					{articles.map((article) => (
						<ArticleCard key={article.id} article={article} />
					))}
				</Row>
				{nextPageUrl && (
					<div className="text-center my-3">
						<Button className="btn-dark" onClick={handleLoadMore} disabled={loading}>
							{loading ? (
								<div className="text-center">
									<Spinner animation="border" role="status" />
								</div>
							) : (
								"Carica Altri Articoli"
							)}
						</Button>
					</div>
				)}
				{loading && (
					<div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
						<Spinner animation="border" role="status"></Spinner>
					</div>
				)}
				<Row className="pagination-row">
					{[...Array(totalPages)].map((_, index) => (
						<Button key={index} onClick={() => goToPage(index + 1)}>
							{index + 1}
						</Button>
					))}
				</Row>
			</Container>
		</>
	);
};

export default HomePage;
