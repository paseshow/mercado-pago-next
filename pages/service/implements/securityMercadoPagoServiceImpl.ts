import { SecurityMercadoPagoModel } from "../../models/securityMercadoPago";
import { SecurityMercadoPagoReposiroty } from "../../repository/securityMercadoPagoRepository";
import { SecurityMercadoPagoService } from "../securityMercadoPagoService";

export class SecurityMercadoPagoServiceImpl implements SecurityMercadoPagoService {

    constructor(
        private securityRepository: SecurityMercadoPagoReposiroty
    ){}

    findByEventoId(eventoId: number): number {
        return this.securityRepository.findByEventoId(eventoId);
    };

    save(securityMercadoPago: SecurityMercadoPagoModel) {
        return this.securityRepository.save(securityMercadoPago);
    };

    update(securityMercadoPago: SecurityMercadoPagoModel) {
        return this.securityRepository.update(securityMercadoPago);
    };

    findByEventoIdAndUserId(eventoId: number, userId: number) {
        return this.securityRepository.findByEventoIdAndUserId(eventoId, userId);
    };

    findByNombreCuenta(nombreCuenta: string) {
        return this.securityRepository.findByNombreCuenta(nombreCuenta);
    };

    findByUserMpId(userIdMp: string) {
        throw new Error("Method not implemented.");
    };

    findById(idSecurity: number) {
        return this.securityRepository.findById(idSecurity);
    };
}