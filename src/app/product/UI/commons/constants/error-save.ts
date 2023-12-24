import { Alert } from "src/app/commons/interfaces/alert";

export const ERROR_SAVE: Alert = {
    title: 'Ups! No se pudo crear el producto',
    buttons: [
        {
            label: 'Aceptar',
            key: false
        }
    ]
};