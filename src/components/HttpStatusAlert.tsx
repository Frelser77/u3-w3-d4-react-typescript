import React from "react";
import { Alert } from "react-bootstrap";

interface HttpStatusAlertProps {
	statusCode: number;
	message?: string; // Opzionale: permette di sovrascrivere il messaggio di errore predefinito
}

const HttpStatusAlert: React.FC<HttpStatusAlertProps> = ({ statusCode, message }) => {
	const getAlertVariant = (statusCode: number) => {
		if (statusCode >= 500) {
			return "danger";
		} else if (statusCode >= 400) {
			return "warning";
		} else {
			return "info";
		}
	};

	const getErrorMessage = (statusCode: number) => {
		let message = "";
		let detail = "Si prega di riprovare o contattare il supporto se il problema persiste.";

		switch (statusCode) {
			case 400:
				message = "Richiesta non valida.";
				break;
			case 401:
				message = "Non autorizzato.";
				detail = "Potrebbe essere necessario effettuare l'accesso o registrarsi per proseguire.";
				break;
			case 403:
				message = "Accesso negato.";
				detail = "Non hai i permessi necessari per visualizzare questa risorsa.";
				break;
			case 404:
				message = "Risorsa non trovata.";
				detail = "La pagina o la risorsa che stai cercando potrebbe essere stata rimossa o rinominata.";
				break;
			case 500:
				message = "Errore interno del server.";
				detail = "Qualcosa è andato storto dal nostro lato. Stiamo lavorando per risolvere il problema.";
				break;
			default:
				message = "Errore sconosciuto.";
				detail = "Si è verificato un errore inaspettato.";
		}

		return { message, detail };
	};

	const variant = getAlertVariant(statusCode);
	const { message: defaultMsg, detail } = getErrorMessage(statusCode);

	return (
		<Alert variant={variant}>
			<Alert.Heading>{message || defaultMsg}</Alert.Heading>
			<p>{detail}</p>
		</Alert>
	);
};

export default HttpStatusAlert;
