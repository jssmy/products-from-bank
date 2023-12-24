export const CONTROL_ERRORS = {
    id: {
        required: 'Este campo es requerido',
        minlength: 'Min. 3 caracteres',
        maxlength: 'Max 10 caracteres',
        unique: 'El id de producto está en uso'
    },
    name: {
        required: 'Este campo es requerido',
        minlength: 'Min. 5 caracteres',
        maxlength: 'Max 100 caracteres'
    },
    description: {
        required: 'Este campo es requerido',
        minlength: 'Min. 10 caracteres',
        maxlength: 'Max 200 caracteres'
    },
    logo: {
        required: 'Este campo es requerido'
    },
    dateLiberation: {
        required: 'Este campo es requerido',
        invalidate: 'La fecha debe ser mayor o igual a hoy'
    },
    dateRevision: {
        required: 'Este campo es requerido'
    }
};
