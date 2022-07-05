export interface reservaReferenceMpModel {
    id?: number,
    reservaId: number,
    referenceId: string,
    clientMpId: number,
    idSecurity: number,
    statusReference: string,
    idTransaccionMp?: number
}