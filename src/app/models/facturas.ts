export class Factura {
    constructor (
       public id: number,
       public fecha: Date,
       public contrato: number,
       public pagado: boolean
    ) {

    }
}

export class FacturaE {
    constructor(
       public factura: Factura,
       public kwh: number,
       public monto: number
    ) {
    }
}

export class FacturaA {
    constructor(
        public factura: Factura,
        public monto: number
    ) {
    }
}
