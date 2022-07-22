-- CreateTable
CREATE TABLE `reservaReferenceMp` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reservaId` INTEGER NOT NULL,
    `referenceId` VARCHAR(191) NOT NULL,
    `clientMpId` BIGINT NOT NULL,
    `idSecurity` INTEGER NOT NULL,
    `statusReference` VARCHAR(191) NOT NULL DEFAULT 'pending',
    `idTransaccionMp` BIGINT NOT NULL DEFAULT 0,

    UNIQUE INDEX `reservaReferenceMp_reservaId_key`(`reservaId`),
    UNIQUE INDEX `reservaReferenceMp_referenceId_key`(`referenceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reserva` (
    `id` INTEGER NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `importeTotal` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `importeTotalNeto` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `serviceChargeTotal` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `estado` VARCHAR(191) NOT NULL,
    `boleteria` VARCHAR(191) NOT NULL,
    `fechaReserva` BIGINT NOT NULL,
    `fechaFacturacion` BIGINT NOT NULL DEFAULT 0,
    `turnoId` INTEGER NOT NULL DEFAULT 0,
    `clienteDni` INTEGER NOT NULL,
    `clienteNombre` VARCHAR(191) NOT NULL,
    `clienteEmail` VARCHAR(191) NOT NULL DEFAULT 'null',
    `reservaPreferenceMpId` INTEGER NOT NULL,
    `eventoId` INTEGER NOT NULL,
    `eventoNombre` VARCHAR(191) NOT NULL,
    `ubicacionEventoId` INTEGER NOT NULL,
    `ubicacionEventoEstado` VARCHAR(191) NOT NULL,
    `ubicacionEventoFechaIngreso` BIGINT NOT NULL,
    `sectorEventoDescripcion` VARCHAR(191) NOT NULL,
    `sectorEventoFechaFuncion` BIGINT NOT NULL,
    `descuentoSectorDescripcion` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `securityMercadoPago` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `accessToken` VARCHAR(191) NOT NULL,
    `publicKey` VARCHAR(191) NOT NULL,
    `userIdMp` VARCHAR(191) NOT NULL,
    `nombreCuenta` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `eventoId` INTEGER NOT NULL,
    `maxCuotas` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` INTEGER NOT NULL,
    `pass` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `devoluciones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reservaId` INTEGER NOT NULL,
    `motivo` VARCHAR(191) NOT NULL,
    `fechaDevolucion` BIGINT NOT NULL,
    `usuarioEncargadoId` INTEGER NOT NULL,
    `monto` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `devoluciones` ADD CONSTRAINT `devoluciones_reservaId_fkey` FOREIGN KEY (`reservaId`) REFERENCES `reserva`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `devoluciones` ADD CONSTRAINT `devoluciones_usuarioEncargadoId_fkey` FOREIGN KEY (`usuarioEncargadoId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
