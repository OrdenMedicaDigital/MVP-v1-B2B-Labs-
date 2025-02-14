import { date, integer, pgTable, serial, varchar, primaryKey } from "drizzle-orm/pg-core";

export const patients = pgTable("patients", {
    rut: varchar().primaryKey().notNull(), 
    name: varchar().notNull(),
    paterno: varchar().notNull(),
    materno: varchar().notNull(),
    birthDate: date().notNull(),
    email: varchar().notNull(),
    phone: varchar().notNull(),
    region: varchar().notNull(),
    comuna: varchar().notNull(),
    address: varchar().notNull(),
});

export const exams = pgTable("exams", {
    code: varchar().primaryKey().notNull(),
    name: varchar().notNull(),
    description: varchar().notNull(),
});

// Orders have many exams
export const orders = pgTable("orders", {
    id: serial().primaryKey(),
    patientRut: varchar().notNull().references(() => patients.rut, { onDelete: "cascade" }),
    date: date().notNull(),
    state: varchar({enum:["pending","processing","completed"]}).default("pending").notNull(),
});

export const orderExams = pgTable("order_exams", {
    orderId: serial().notNull().references(() => orders.id, { onDelete: "cascade" }),
    examCode: varchar().notNull().references(() => exams.code, { onDelete: "cascade" }),
}, (table) => ({
    pk: primaryKey({ columns: [table.orderId, table.examCode] }) // Clave primaria compuesta
}));
