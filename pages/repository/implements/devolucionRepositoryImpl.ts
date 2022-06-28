import { PrismaClient } from "@prisma/client";
import { DevolucionModel } from "../../dtos/devolucion";
import { DevolucionRepository } from "../devolucionRepository";

export class DevolucionRepositoryImpl implements DevolucionRepository {

    prisma = new PrismaClient();

    async save(devolucion: DevolucionModel) {
        let save = await this.prisma.devoluciones.create({
            data: {
                ...devolucion,
            }
        });
        return save;
    };
}