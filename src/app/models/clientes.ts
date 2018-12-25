import { Contrato } from './contratos';


export class Cliente {
    constructor(
        public id: number,
        public nombre: String,
        public contratos: Contrato[]
    ) {
    }
}
