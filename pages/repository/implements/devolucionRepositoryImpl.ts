import { DevolucionModel } from "../../dtos/devolucion";
import { DevolucionRepository } from "../devolucionRepository";
import { prisma } from "../../configDataBase";

export class DevolucionRepositoryImpl implements DevolucionRepository {

    async save(devolucion: DevolucionModel) {
        let save = await prisma.devoluciones.create({
            data: {
                ...devolucion,
            }
        });
        return save;
    };
}