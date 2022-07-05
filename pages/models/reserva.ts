export interface ReservaModel {
    id: number
    tipo: string
    importeTotal: number
    importeTotalNeto: number
    serviceChargeTotal: number
    estado: string
    boleteria: string
    fechaReserva: number
    fechaFacturacion: number
    turnoId: number | undefined
    clienteDni: number
    clienteNombre: string
    clienteEmail: string
    reservaPreferenceMpId: number
    eventoId: number
    eventoNombre: string
    ubicacionEventoId: number
    ubicacionEventoEstado: string
    ubicacionEventoFechaIngreso: number
    sectorEventoDescripcion: string
    sectorEventoFechaFuncion: number
    descuentoSectorDescripcion: string
    devoluciones?: any[]
}