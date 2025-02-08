"use client"
import {create, createStore} from "zustand"

interface Order {
    patient: {
        name: string;
        comuna: string;
        region: string;
        address: string;
        email: string;
        phone: string;
        rut: string;
        birthDate: string;
    };
    exams: {
        code: string;
        name: string;
        description: string;
    }[];
    date: Date;
    setData: (data: Partial<Order>) => void;
}

export const useOrderStore = create<Order>((set)=>({
        patient: {
            name: "",
            comuna: "",
            region: "",
            address: "",
            email: "",
            phone: "",
            rut:"",
            birthDate: "",
        },
        exams: [],
        date: new Date(),
        setData: (data: Partial<Order>) => set((state) => ({...state, ...data})),
    })
)