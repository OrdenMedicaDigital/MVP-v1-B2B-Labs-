import "dotenv/config"
import { drizzle } from "drizzle-orm/neon-http"; // Importa la instancia de Drizzle
import { patients, orders, orderExams, exams } from "./schema"; // Importa los modelos
import { eq } from "drizzle-orm";

const db = drizzle(process.env.DATABASE_URL as string); // Instancia de Drizzle

// Definir el tipo del paciente
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
}

// Función para crear una orden con paciente y exámenes
export async function createOrder(patient: Patient, examCodes: string[]) {
        const existingPatient = await db.select().from(patients).where(eq(patients.rut, patient.rut));

        if (existingPatient.length === 0) {
            // 2. Insertar el paciente si no existe
            await db.insert(patients).values(patient);
        }

        // 3. Insertar la orden
        const [newOrder] = await db.insert(orders)
            .values({ patientRut: patient.rut, date: new Date().toISOString() })
            .returning({ id: orders.id });

        if (!newOrder) {
            throw new Error("Order creation failed");
        }

        // 4. Insertar los exámenes relacionados
        if (examCodes.length > 0) {
            console.log(examCodes)
            await db.insert(orderExams).values(
                examCodes.map((examCode) => ({
                    orderId: newOrder.id,
                    examCode:examCode,
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
                address: patients.address
            }
        })
        .from(orders)
        .innerJoin(patients, eq(orders.patientRut, patients.rut));
}

// Obtener una orden por ID con datos del paciente y exámenes
export async function getOrderById(orderId: number) {
    // 1. Obtener la orden con el paciente
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
                address: patients.address
            }
        })
        .from(orders)
        .innerJoin(patients, eq(orders.patientRut, patients.rut))
        .where(eq(orders.id, orderId))
        .limit(1);

    if (order.length === 0) {
        return null; // No se encontró la orden
    }

    // 2. Obtener los exámenes relacionados
    const examsList = await db
        .select({
            examCode: exams.code,
            examName: exams.name,
            description: exams.description
        })
        .from(orderExams)
        .innerJoin(exams, eq(orderExams.examCode, exams.code))
        .where(eq(orderExams.orderId, orderId));

    return {
        ...order[0], // Información de la orden y paciente
        exams: examsList // Lista de exámenes relacionados
    };
}

export async function getAllExams() {
    return await db.select().from(exams);
}