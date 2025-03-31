import * as yup from "yup";


export const loginSchema = yup.object({
    email: yup.string().email("Correo inválido").required("El correo es obligatorio"),
    password: yup.string().min(6, "Mínimo 6 caracteres").required("La contraseña es obligatoria"),
});


export const registerSchema = yup.object({
    name: yup.string().min(3, "Mínimo 3 caracteres").required("El nombre es obligatorio"),
    email: yup.string().email("Correo inválido").required("El correo es obligatorio"),
    password: yup
        .string()
        .min(6, "Mínimo 6 caracteres")
        .matches(/[A-Z]/, "Debe contener al menos una mayúscula")
        .matches(/[0-9]/, "Debe contener al menos un número")
        .required("La contraseña es obligatoria"),
});
