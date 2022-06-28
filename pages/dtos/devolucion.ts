export interface DevolucionModel {
    id?: number,
    reservaId: number,
    motivo: string,
    fechaDevolucion: number,
    usuarioEncargadoId: number,
    monto: number
}