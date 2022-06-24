export interface reservaReferenceMpModel {
    id?: number,
    reservaId: number,
    referenceId: string,
    clientMpId: number,
    collectorId: number,
    statusReference: string,
    idTransaccionMp?: number
}