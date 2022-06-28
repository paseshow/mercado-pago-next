import { DevolucionModel } from "../../dtos/devolucion";
import { DevolucionRepository } from "../../repository/devolucionRepository";
import { DevolucionService } from "../devolucionService";

export class DevolucionServiceImpl implements DevolucionService {

    constructor(
        private devolucionRepository: DevolucionRepository
    ){}

    save(devolucion: DevolucionModel) {
        return this.devolucionRepository.save(devolucion);
    };
}
