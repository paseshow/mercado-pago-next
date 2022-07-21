import { prisma } from "../../configDataBase";
import { SecurityMercadoPagoModel } from "../../models/securityMercadoPago";
import { SecurityMercadoPagoReposiroty } from "../securityMercadoPagoRepository";

export class SecurityMercadoPagoRepositoryImpl implements SecurityMercadoPagoReposiroty {

    async findByEventoId(eventoId: number) {

        let securityMercadoPago = await prisma.securityMercadoPago.findMany({
            where: { eventoId: eventoId }
        });
        return securityMercadoPago[securityMercadoPago.length - 1];
    };

    async save(securityMercadoPago: SecurityMercadoPagoModel) {
        let save = await prisma.securityMercadoPago.create({
            data: {
                ...securityMercadoPago
            }
        });
        return save;
    };

    async update(securityMercadoPago: SecurityMercadoPagoModel) {
        let save = await prisma.securityMercadoPago.update({
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
        let securityMercadoPagoByEventoIdAndUserId = await prisma.securityMercadoPago.findMany({
            where: {
                eventoId: eventoId,
                userIdMp: userId.toString()
            }
        });

        return securityMercadoPagoByEventoIdAndUserId[securityMercadoPagoByEventoIdAndUserId.length - 1];
    };

    async findByNombreCuenta(nombreCuenta: string) {
        let securityMercadoPagoByNombreCuenta = await prisma.securityMercadoPago.findMany({
            where: {
                nombreCuenta: nombreCuenta
            }
        });

        return securityMercadoPagoByNombreCuenta;
    };

    async findByUserMpId(userIdMp: string) {
        let securityMercadoPagoByUserIdMp = await prisma.securityMercadoPago.findMany({
            where: {
                userIdMp: userIdMp
            }
        });

        return securityMercadoPagoByUserIdMp;
    };

    async findById(idSecurity: number) {
        let securityMercadoPagoById = await prisma.securityMercadoPago.findUnique({
            where: {
                id: idSecurity
            }
        });

        return securityMercadoPagoById;
    }
}