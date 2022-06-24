import { PrismaClient } from "@prisma/client";
import { SecurityMercadoPagoReposiroty } from "../securityMercadoPagoRepository";

export class SecurityMercadoPagoRepositoryImpl implements SecurityMercadoPagoReposiroty {
    
    prisma = new PrismaClient();
    
    async findByEventoId(eventoId: number) {

        let securityMercadoPago = await this.prisma.securityMercadoPago.findMany({
            where: { eventoId: eventoId }
        });

        return securityMercadoPago[securityMercadoPago.length - 1];
    };
}