import { ReservaModel } from "../models/reserva";

export interface ReservaService {
    save(reserva: ReservaModel): any
};

export class Reserva {

    constructor(
        private reservaService: ReservaService
    ) { }

    save(reserva: ReservaModel) {
        return this.reservaService.save(reserva);
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
            fechaFacturacion: reservaFull.fechaFacturacion,
            turnoId: null,
            clienteDni: reservaFull.clienteId.dni,
            clienteNombre: reservaFull.clienteId.nombre,
            clienteEmail: reservaFull.clienteId.clienteEmail,
            reservaPreferenceMpId: reservaPreferenceMpId,
            ubicacionEventoId: reservaFull.ubicacionEventoes[indexUbicacion].id,
            ubicacionEventoEstado: reservaFull.ubicacionEventoes[indexUbicacion].estado,
            ubicacionEventoFechaIngreso: reservaFull.ubicacionEventoes[indexUbicacion].fechaIngreso,
            sectorEventoDescripcion: reservaFull.ubicacionEventoes[indexUbicacion].sectorEventoId.descripcion,
            sectorEventoFechaFuncion: reservaFull.ubicacionEventoes[indexUbicacion].sectorEventoId.fechaFuncion,
            descuentoSectorDescripcion: reservaFull.ubicacionEventoes[indexUbicacion].descuentoSectorId.descripcion,
            eventoId: reservaFull.ubicacionEventoes[indexUbicacion].sectorEventoId.eventoId.id,
            eventoNombre: reservaFull.ubicacionEventoes[indexUbicacion].sectorEventoId.eventoId.nombre
        };

        return reservaReturn;
    };
};