import React, { FC, useContext, useEffect, useState } from "react";
import { Col, Form, Row, Button, Modal} from "react-bootstrap";
import { FirebaseContext } from "../../../API/Firebase";
import { Notificacion } from "../../../Constants/interfaces";
import NotifWidget from "./NotifTile";

import "./style.css";

var limit = 6;

interface Props {
	setBreadCrumb: (val: string) => void;
}
const NotificationForm: FC<Props> = ({ setBreadCrumb }) => {
	// const { id } = useParams<{ id: string }>();
	const [item, setItem] = useState<Notificacion>({
		id: "",
		title : "",
		descripcion: "",
		fecha: new Date(),
		lifetime: 24,
	});
	const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
	const [deleting, setDeleting] = useState<boolean>(false);
	const [historyNotif, sethistoryNotif] = useState<Notificacion[]>([]);

	const firebase = useContext(FirebaseContext);

	useEffect(() => {
		setBreadCrumb("Notificaciones");
		setItem({
			id: "",
			title : "",
			descripcion: "",
			fecha: new Date(),
			lifetime: 24,
		});
		firebase.getLimitedNotification(limit, historyNotif.length).then((lista) => { 
			sethistoryNotif(lista);});
		// }
		// eslint-disable-next-line
	}, []);

	const submitChanges = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setLoadingSubmit(true);
		let message = "Se ha subido la notificación";
		let failure = false;
		try {
		const copy = item!;
			await firebase.setNewNotificacion(copy);
			console.log(copy);
		} catch (e) {
			console.log(e);
			failure = true;
			message =
				"Ha ocurrido un error, revise que toda la información sea correcta,\nY que tiene buena conexión de internet.";
		}
		setLoadingSubmit(false);
		window.alert(message);
		if(!failure){
			setItem({
				id: "",
				title : "",
				descripcion: "",
				fecha: new Date(),
				lifetime: 24
			});
		}
	};

	// const execDelete = async () => {
	// 	setDeleting(true);
	// 	// firebase.firestore.collection("Products").doc(id).delete().then(e => {
	// 	// 	window.alert("Objeto borrado");
	// 	// 	history.push("/dashboard/menu");
	// 	// }).catch(e => {
	// 	// 	console.log(e);
	// 	// 	setDeleting(false);
	// 	// 	window.alert("Ha ocurrido un error y no se ha podido borrar el objeto.");
	// 	// });
	// };

	const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

	const renderItem = () => {
		return (
			<Row>
				<Col xl={6} xs={12}>
					<h4 className="usuario">Notificación</h4>
				<div className="maindiv">
                    <Form onSubmit={submitChanges}>
                        <p className="parrafo" id="titulo">Titulo</p>
                        <Form.Control
							className="select"
							type="text"
							placeholder="Titulo de la Notificacion"
							onChange={(target) => setItem({...item!,title : target.currentTarget.value})}
							value={item!.title}
						/>
                        <hr className="hr1"></hr>
                        <p className="parrafo" id="mensaje">Mensaje Adjuntado</p>
                        <Form.Control
							className="select11"
							as="textarea"
							placeholder="Ej. Traer sus propios alimentos"
							rows={3}
							onChange={(target) => setItem({...item!,descripcion : target.currentTarget.value})}
							value={item!.descripcion}
						/>
                        <br />
                        <p className="parrafo" id="fecha">Fecha</p>
                        <Form.Control
							className="select2"
							onChange={(str) => {
								setItem({
									...item!,
									fecha: new Date(str.currentTarget.value),
								});
							}}
							required={true}
							type='date'
						/>
                        <p className="parrafo" id="hora">Hora</p>
                        <Form.Control
							className="select1"
							// onChange={(str) => {
							// 	setItem({
							// 		...item!,
							// 		fecha: new Date(str.currentTarget.value),
							// 	});
							// }}
							required={true}
							type='time'
						/>
                        <hr className="hr1"></hr>
						<button type="submit" className="publicar">PUBLICAR</button>
					</Form>
            	</div>
				</Col>
				<Col xl={1}>
				</Col>
				<Col xl={4} xs={12}>
					<h4 className="h">Historial</h4>
					<div className="maindiv1 overflow-auto">
						{historyNotif.map( n => <NotifWidget child={n} alterScreen={setItem} />)}
					</div>
				</Col>
			</Row>
		);
	};

	return renderItem();
};

export default NotificationForm;
