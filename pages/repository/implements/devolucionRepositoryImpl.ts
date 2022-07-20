import { DevolucionModel } from "../../dtos/devolucion";
import { DevolucionRepository } from "../devolucionRepository";
import { prisma } from "../../index";

export class DevolucionRepositoryImpl implements DevolucionRepository {

    prisma = prisma;

    async save(devolucion: DevolucionModel) {
        let save = await this.prisma.devoluciones.create({
            data: {
                ...devolucion,
            }
        });
        return save;
    };
}