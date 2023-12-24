import { Alert } from "src/app/commons/interfaces/alert";

export const WARNING_SAVE: Alert = {
    title: '¿Estas seguro crear este nuevo producto?',
    buttons: [
        {
            label: 'Cancelar',
            key: false
        },
        {
            label: 'Confirmar',
            key: true,
            class: 'btn-primary'
        },
    ]
};