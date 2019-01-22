export class Factura {
    constructor (
       public id: number,
       public fecha: Date,
       public pagado: boolean,
       public contrato: number
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

export class FacturaEAdd {
    constructor(
       public factura: number,
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
