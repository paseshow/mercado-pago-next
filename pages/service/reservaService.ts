import { ReservaModel } from "../models/reserva";

export interface ReservaService {
    findByReservaId(reservaId: number): any
    findByClienteDni(clienteDni: number, reservaId?: number): any
    findByEstado(estado: string): any
    update(reserva: any): any;
    save(reserva: ReservaModel): any
}

export class Reserva  {

    constructor(
        private reservaService: ReservaService
    ){}

    findByReservaId(reservaId: number) {
        return this.reservaService.findByReservaId(reservaId);
    };

    findByClienteDni(clienteDni: number, reservaId?: number) {
        return this.reservaService.findByClienteDni(clienteDni, reservaId);
    };

    findByEstado(estado: string) {
        return this.reservaService.findByEstado(estado);
    };

    createReserva(reservaFull: any, estado: string, indexUbicacion: number, reservaPreferenceMpId: number): ReservaModel {
        let reservaReturn: ReservaModel = {
            id: reservaFull.id,
            tipo: reservaFull.tipo,
            importeTotal: reservaFull.importeTotal,
            importeTotalNeto: reservaFull.importeTotalNeto,
            serviceChargeTotal: reservaFull.serviceChargeTotal,
            estado: estado,
            boleteria: reservaFull.boleteria,
            fechaReserva: reservaFull.fechaReserva,
            fechaFacturacion: reservaFull.fechaFacturacion ? reservaFull.fechaFacturacion : undefined,
            turnoId: undefined,
            clienteDni: +reservaFull.clienteId.dni,
            clienteNombre: reservaFull.clienteId.nombre,
            clienteEmail: reservaFull.clienteId.clienteEmail,
            reservaPreferenceMpId: reservaPreferenceMpId,
            ubicacionEventoId: reservaFull.ubicacionEventoes[indexUbicacion].id,
            ubicacionEventoEstado: reservaFull.ubicacionEventoes[indexUbicacion].estado,
            ubicacionEventoFechaIngreso: reservaFull.ubicacionEventoes[indexUbicacion].fechaIngreso
                                        ? reservaFull.ubicacionEventoes[indexUbicacion].fechaIngreso
                                        : 0,
            sectorEventoDescripcion: reservaFull.ubicacionEventoes[indexUbicacion].sectorEventoId.descripcion,
            sectorEventoFechaFuncion: reservaFull.ubicacionEventoes[indexUbicacion].sectorEventoId.fechaFuncion,
            descuentoSectorDescripcion: reservaFull.ubicacionEventoes[indexUbicacion].descuentoSectorId.descripcion,
            eventoId: reservaFull.ubicacionEventoes[indexUbicacion].sectorEventoId.eventoId.id,
            eventoNombre: reservaFull.ubicacionEventoes[indexUbicacion].sectorEventoId.eventoId.nombre,
        };

        return reservaReturn;
    };

    update(reserva: any) {
        return this.reservaService.update(reserva);
    };

    save(reserva: ReservaModel) {
        return this.reservaService.save(reserva);
    };

}