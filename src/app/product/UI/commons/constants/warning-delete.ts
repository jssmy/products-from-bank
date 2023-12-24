import { Alert } from "src/app/commons/interfaces/alert";

export const WARNING_DELETE: Alert = {
    title: '¿Estás seguro de eliminar el producto :productName?',
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