import { STATS_CATEGORIES } from "./constants";

export interface Coord {
    latitude : number,
    longitude : number
}

export interface Evento {
	id: string;
	nombre: string;
	descripcion: string;
	fecha: Date;
	fecha_delete: Date;
	img: string;
	place: string | Coord;
	maxUsers: number;
	currentUsers: string[]; // id de los usuarios
	imgFile?: File | string;
}

export interface Usuario {
	uid: string;
	nombre: string;
	email: string;
	imagen_perfil: string; // URL
	rol?: string;
	delete_date? : Date
	imgFile?: File | string; // Archivo o Firestorage Ref de donde sacar el documento
}

export interface Reto {
	id: string;
	dia: number; // Date
	descripcion: string;
	link: string; // URL a la aplicacion de punto blanco
}

enum TiposMeditation {
	tipoA,
	tipoB,
}

export interface Meditacion {
	id: string;
	nombre: string;
	tipo: TiposMeditation;
	nota?: string;
	estado_de_animo?: number; // Carita feliz --- triste
	fecha: Date;
	ritmo_cardiaco_i?: number;
	ritmo_cardiaco_f?: number;
}

export interface Notificacion {
	id: string;
	title: string;
	descripcion: string;
	fecha: Date;
	lifetime?: number; // ?? default 24 hrs
}

export interface StatisticObj {
	category	: STATS_CATEGORIES,
	createdDate	: Date,
	value 		: number
}

/**
 * Ignore this beautiful comment
 */

/*

los usuarios pueden tener muchos eventos
en el historico de eventos debemos tener registros de los usuarios

*/
