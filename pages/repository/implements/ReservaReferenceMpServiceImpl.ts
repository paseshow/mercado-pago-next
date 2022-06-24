import { PrismaClient } from "@prisma/client";
import { reservaReferenceMpModel } from "../../models/reservaReferenceMp";
import { ReservaReferenceMpService } from "../reservaReferenceMpService";


export class ReservaReferenceMpServiceImpl implements ReservaReferenceMpService {

    prisma = new PrismaClient();

    async findByReservaId(reservaId: number) {

        const reservaReferenceMp = await this.prisma.reservaReferenceMp.findUnique({
            where: { reservaId: reservaId }
        });
        
        return reservaReferenceMp;
    };

    async save(reservaReferenceMp: reservaReferenceMpModel) {
        let save = await this.prisma.reservaReferenceMp.create({
            data: {
                ...reservaReferenceMp
            }
        });
        return save;
    };

}