import { SecurityMercadoPagoReposiroty } from "../../repository/securityMercadoPagoRepository";
import { SecurityMercadoPagoService } from "../securityMercadoPagoService";

export class SecurityMercadoPagoServiceImpl implements SecurityMercadoPagoService {

    constructor(
        private securityRepository: SecurityMercadoPagoReposiroty
    ){}

    findByEventoId(eventoId: number): number {
        return this.securityRepository.findByEventoId(eventoId);
    }

}