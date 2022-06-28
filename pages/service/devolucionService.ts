import { DevolucionModel } from "../dtos/devolucion";

export interface DevolucionService {
    save(devolucion: DevolucionModel): any;
};

export class Devolucion {

    constructor(
        private devolucionService: DevolucionService
    ) { }

    save(devolucion: DevolucionModel) {
        return this.devolucionService.save(devolucion);
    };
}