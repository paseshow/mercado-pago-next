import { DevolucionModel } from "../../dtos/devolucion";
import { DevolucionRepository } from "../../repository/devolucionRepository";
import { IDevolucionService } from "../devolucionService";

export class DevolucionServiceImpl implements IDevolucionService {

    constructor(
        private devolucionRepository: DevolucionRepository
    ){}

    save(devolucion: DevolucionModel) {
        return this.devolucionRepository.save(devolucion);
    };
}
