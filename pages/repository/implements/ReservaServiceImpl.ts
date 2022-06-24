import { PrismaClient } from "@prisma/client";
import { ReservaModel } from "../../models/reserva";
import { ReservaService } from "../reservaService";

export class ReservaServiceImpl implements ReservaService {

    prisma = new PrismaClient();

    async save(reserva: ReservaModel) {
        let save = await this.prisma.reserva.create({
            data: {
                ...reserva,
                devoluciones: undefined
            }
        });
        return save;
    };

};