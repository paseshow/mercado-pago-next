import { DevolucionModel } from "../dtos/devolucion";

export interface IDevolucionService {
    save(devolucion: DevolucionModel): any;
};

export class Devolucion {

    constructor(
        private devolucionService: IDevolucionService
    ) { }

    save(devolucion: DevolucionModel) {
        return this.devolucionService.save(devolucion);
    };
}