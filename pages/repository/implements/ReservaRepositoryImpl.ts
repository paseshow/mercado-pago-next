import { prisma } from "../../index";
import { ReservaModel } from "../../models/reserva";
import { ReservaRepository } from "../reservaRepository";

export class ReservaRepositoryImpl implements ReservaRepository {

    prisma = prisma;

    async save(reserva: ReservaModel) {

        let save = await this.prisma.reserva.create({
            data: {
                ...reserva,
                devoluciones: undefined
            }
        });
        return save;
    };

    async findByReservaId(reservaId: number) {
        let findReservaId = await this.prisma.reserva.findMany({
            where: { id: +reservaId }
        });

        return JSON.parse(JSON.stringify( findReservaId, (key, value) => (typeof value === 'bigint' ? value.toString() : value)));;
    };

    async findByClienteDni(clienteDni: number, reservaId?: number) {
        let findClienteDni = await this.prisma.reserva.findMany({
            where: { clienteDni: clienteDni }
        });

        if(reservaId) {
            findClienteDni = findClienteDni.filter( unData => unData.id == reservaId);
        }

        return JSON.parse(JSON.stringify( findClienteDni, (key, value) => (typeof value === 'bigint' ? value.toString() : value)));;

    };

    async findByEstado(estado: string) {
        let findEstado = await this.prisma.reserva.findMany({
            where: { estado: estado }
        });

        return JSON.parse(JSON.stringify( findEstado, (key, value) => (typeof value === 'bigint' ? value.toString() : value)));;
    };

    async update(reserva: any) {
        let save = await this.prisma.reserva.update({
            where: {
                id: reserva.id
            },
            data: {
                ...reserva
            }
        });
        return save;
    };
};