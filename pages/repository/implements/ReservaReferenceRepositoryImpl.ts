import { PrismaClient } from "@prisma/client";
import { reservaReferenceMpModel } from "../../models/reservaReferenceMp";
import { ReservaReferenceRepository } from "../reservaReferenceRepository";


export class ReservaReferenceRepositoryImpl implements ReservaReferenceRepository {

    prisma = new PrismaClient();

    async findByReservaId(reservaId: number) {

        const reservaReferenceByReservaId = await this.prisma.reservaReferenceMp.findMany({
            where: { reservaId: reservaId }
        });
        
        return JSON.parse(JSON.stringify( reservaReferenceByReservaId, (key, value) => (typeof value === 'bigint' ? value.toString() : value)));
    };

    async save(reservaReferenceMp: reservaReferenceMpModel) {
        let save = await this.prisma.reservaReferenceMp.create({
            data: {
                ...reservaReferenceMp
            }
        });
        return save;
    };

    async findByClienteDni(clienteDni: number) {
        
    };

    async findByTransaccionId(transaccionId: number) {
        const reservaReferenceByTrasanccionId = await this.prisma.reservaReferenceMp.findFirst({
            where: { idTransaccionMp: transaccionId }
        });

        return JSON.parse(JSON.stringify( reservaReferenceByTrasanccionId, (key, value) => (typeof value === 'bigint' ? value.toString() : value)));
    };

    async update(reservaReferenceMp: reservaReferenceMpModel) {
        let update = await this.prisma.reservaReferenceMp.update({
            where: {
                id: reservaReferenceMp.id
            },
            data: {
                ...reservaReferenceMp
            }
        });
        return update;
    };
}