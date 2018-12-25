export class Contrato {
    constructor(
        public id: number,
        public cliente: number,
        public monto: number,
        public fecha: Date,
        public apartamento: number,
        public estado: Boolean
        ) {
    }
}
