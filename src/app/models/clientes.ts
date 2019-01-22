import { Contrato } from './contratos';


export class Cliente {
    constructor(
        public id: number,
        public nombre: String,
        public contratos: Contrato[]
    ) {
    }
}
export class ClienteInfo {
    constructor(
        public id: number,
        public nombre: String,
        public profesion: String,
        public nacionalidad: String,
        public identidad: String,
        public rtn: String,
        public direccion: String,
        public empresa: String,
        public estadoCivil: Boolean
    ) {
    }
}
