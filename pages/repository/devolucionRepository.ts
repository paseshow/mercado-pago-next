import { DevolucionModel } from "../dtos/devolucion";

export interface DevolucionRepository {
    save(devolucion: DevolucionModel): any;
}