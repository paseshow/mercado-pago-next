/*
  Warnings:

  - Added the required column `monto` to the `devoluciones` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `devoluciones` ADD COLUMN `monto` DECIMAL(65, 30) NOT NULL;
