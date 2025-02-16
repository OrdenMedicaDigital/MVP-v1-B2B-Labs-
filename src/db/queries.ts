import "dotenv/config"
import { drizzle } from "drizzle-orm/neon-http";
import { patients, orders, orderExams, exams, labs } from "./schema";
import { and, eq, gte, like, lte } from "drizzle-orm";

const db = drizzle(process.env.DATABASE_URL as string);

interface Patient {
    rut: string;
    name: string;
    paterno: string;
    materno: string;
    birthDate: string;
    email: string;
    phone: string;
    region: string;
    comuna: string;
    address: string;
    labId: number;
}

export async function getAllLabs(){
    return await db.select().from(labs);
}

export async function createOrder(patient: Patient, examCodes: string[]) {
    const existingPatient = await db.select().from(patients).where(eq(patients.rut, patient.rut));

    if (existingPatient.length === 0) {
        await db.insert(patients).values(patient);
    }

    const [newOrder] = await db.insert(orders)
        .values({ patientRut: patient.rut, date: new Date().toISOString(), state: "pending", labId: patient.labId })
        .returning({ id: orders.id });

    if (!newOrder) {
        throw new Error("Order creation failed");
    }

    if (examCodes.length > 0) {
        await db.insert(orderExams).values(
            examCodes.map((examCode) => ({
                orderId: newOrder.id,
                examCode: examCode,
            }))
        );
    }

    return newOrder;
}

export async function getAllOrders() {
    return await db
        .select({
            orderId: orders.id,
            orderDate: orders.date,
            orderState: orders.state,
            patient: {
                rut: patients.rut,
                name: patients.name,
                paterno: patients.paterno,
                materno: patients.materno,
                birthDate: patients.birthDate,
                email: patients.email,
                phone: patients.phone,
                region: patients.region,
                comuna: patients.comuna,
                address: patients.address,
            },
            lab: {
                id: labs.id,
                name: labs.name,
            },
        })
        .from(orders)
        .innerJoin(patients, eq(orders.patientRut, patients.rut))
        .innerJoin(labs, eq(orders.labId, labs.id));
}

export async function getOrderById(orderId: number) {
    const order = await db
        .select({
            orderId: orders.id,
            orderDate: orders.date,
            patient: {
                rut: patients.rut,
                name: patients.name,
                paterno: patients.paterno,
                materno: patients.materno,
                birthDate: patients.birthDate,
                email: patients.email,
                phone: patients.phone,
                region: patients.region,
                comuna: patients.comuna,
                address: patients.address,
            },
            lab: {
                id: labs.id,
                name: labs.name,
            },
        })
        .from(orders)
        .innerJoin(patients, eq(orders.patientRut, patients.rut))
        .innerJoin(labs, eq(orders.labId, labs.id))
        .where(eq(orders.id, orderId))
        .limit(1);

    if (order.length === 0) {
        return null;
    }

    const examsList = await db
        .select({
            examCode: exams.code,
            examName: exams.name,
            description: exams.description,
        })
        .from(orderExams)
        .innerJoin(exams, eq(orderExams.examCode, exams.code))
        .where(eq(orderExams.orderId, orderId));

    return {
        ...order[0],
        exams: examsList,
    };
}

export async function getAllExams() {
    return await db.select().from(exams);
}

export async function getOrdersByFilter(name?: string, startDate?: string, endDate?: string) {
    return await db
        .select({
            orderId: orders.id,
            patientRut: patients.rut,
            patientName: patients.name,
            patientPaterno: patients.paterno,
            patientMaterno: patients.materno,
            date: orders.date,
            state: orders.state,
            labName: labs.name,
        })
        .from(orders)
        .innerJoin(patients, eq(orders.patientRut, patients.rut))
        .innerJoin(labs, eq(orders.labId, labs.id))
        .where(
            and(
                name ? like(patients.name, `%${name}%`) : undefined,
                startDate ? gte(orders.date, startDate) : undefined,
                endDate ? lte(orders.date, endDate) : undefined
            )
        );
}
