import { PrismaClient } from "@prisma/client";
import { SecurityMercadoPagoModel } from "../../models/securityMercadoPago";
import { SecurityMercadoPagoReposiroty } from "../securityMercadoPagoRepository";

export class SecurityMercadoPagoRepositoryImpl implements SecurityMercadoPagoReposiroty {

    prisma = new PrismaClient();

    async findByEventoId(eventoId: number) {

        let securityMercadoPago = await this.prisma.securityMercadoPago.findMany({
            where: { eventoId: eventoId }
        });
        return securityMercadoPago[securityMercadoPago.length - 1];
    };

    async save(securityMercadoPago: SecurityMercadoPagoModel) {
        let save = await this.prisma.securityMercadoPago.create({
            data: {
                ...securityMercadoPago
            }
        });
        return save;
    };

    async update(securityMercadoPago: SecurityMercadoPagoModel) {
        let save = await this.prisma.securityMercadoPago.update({
            where: {
                id: securityMercadoPago.id
            },
            data: {
                ...securityMercadoPago
            }
        });
        return save;
    };

    async findByEventoIdAndUserId(eventoId: number, userId: number) {
        let securityMercadoPagoByEventoIdAndUserId = await this.prisma.securityMercadoPago.findMany({
            where: {
                eventoId: eventoId,
                userIdMp: userId.toString()
            }
        });

        return securityMercadoPagoByEventoIdAndUserId[securityMercadoPagoByEventoIdAndUserId.length - 1];
    };
}