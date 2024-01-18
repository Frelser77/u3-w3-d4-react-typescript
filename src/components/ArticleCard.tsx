import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Article } from "../types/Article";
import { NavLink } from "react-router-dom";

interface ArticleCardProps {
	article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
	return (
		<div className="d-flex align-items-stretch">
			<NavLink className="nav-link" to={`/article/${article.id}`}>
				<Card className="flex-fill mb-3 pointer bg-dark text-secondary">
					<Card.Img
						variant="top"
						src={article.image_url}
						alt={article.title}
						style={{ height: "200px", objectFit: "cover" }}
					/>
					<Card.Body className="d-flex flex-column text-start">
						<Card.Title
							style={{
								display: "-webkit-box",
								WebkitLineClamp: 2,
								WebkitBoxOrient: "vertical",
								overflow: "hidden",
								textOverflow: "ellipsis",
								maxHeight: "3rem",
								lineHeight: "1.5rem",
							}}
							className="text-light"
						>
							{article.title}
						</Card.Title>
						<div className="mt-2 text-end">
							<Card.Text className="text-secondary">
								Pubblicato il: {new Date(article.published_at).toLocaleDateString()}
							</Card.Text>
						</div>
					</Card.Body>
				</Card>
			</NavLink>
		</div>
	);
};

export default ArticleCard;
