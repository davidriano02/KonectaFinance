import React, { useState } from "react";
import { ObjectSchema, ValidationError } from "yup";

export interface FormValues {
    name?: string;
    email: string;
    password: string;
}

const useForm = <T extends Partial<FormValues>>(initialValues: T, schema: ObjectSchema<T>) => {
    const [values, setValues] = useState<T>(initialValues);
    const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const validate = (): boolean => {
        try {
            schema.validateSync(values, { abortEarly: false });
            setErrors({});
            return true;
        } catch (err) {
            if (err instanceof ValidationError) {
                const validationErrors: Partial<Record<keyof T, string>> = {};
                err.inner.forEach((error) => {
                    if (error.path) {
                        validationErrors[error.path as keyof T] = error.message;
                    }
                });
                setErrors(validationErrors);
            }
            return false;
        }
    };

    return { values, errors, handleChange, validate };
};

export default useForm;
