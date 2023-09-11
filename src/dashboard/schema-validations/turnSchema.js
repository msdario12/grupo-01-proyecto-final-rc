import * as Yup from "yup";
import { getDay, setHours } from "date-fns";

export const vetList = ["juarez", "alvarez", "rodriguez"];

export const isWeekday = (date) => {
    const day = getDay(date);
    return day !== 0 && day !== 6;
};

export const filterPassedTime = (time) => {
    const openMorning = setHours(new Date(time), 8);
    const closeMorning = setHours(new Date(time), 12);
    const openAfternoon = setHours(new Date(time), 16);
    const closeAfternoon = setHours(new Date(time), 22);
    const selectedDate = new Date(time);

    const morningCheck =
        selectedDate.getTime() >= openMorning.getTime() &&
        selectedDate.getTime() < closeMorning.getTime();
    const afternoonCheck =
        selectedDate.getTime() >= openAfternoon.getTime() &&
        selectedDate.getTime() < closeAfternoon.getTime();

    return morningCheck || afternoonCheck;
};

export const turnEditSchema = {
    turnDate: Yup.date()
        .required("Campo obligatorio")
        .test(
            "Es dia de fin de semana",
            "Debe ser un dia de lunes a viernes.",
            (value) => isWeekday(value),
        )
        .test("Es fuera de horario", "Debe ser desde 8 a 12 ó 16 a 20hs", (value) =>
            filterPassedTime(value),
        ),
    details: Yup.string()
        .required("Campo obligatorio")
        .min(3, "Mínimo de 3 caracteres")
        .max(150, "Máximo de 150 caracteres")
        .matches(/^[,.\w\-\s]+$/, "Sólo letras del alfabeto"),
    vet: Yup.string()
        .required("Campo obligatorio")
        .oneOf(
            vetList.map((vet) => vet),
            "Selecciona una veterinario de la lista",
        ),
};

export const turnSchema = {
    multiSearch: Yup.string().required("Campo obligatorio"),
    turnDate: Yup.date().test(
        "Fecha anterior",
        "No puede ser una fecha pasada",
        (value) => {
            return value > new Date();
        },
    ),
    ...turnEditSchema,
};
