export const Schema = {
    id: "",
    createdAt: "",
    paymentDue: "",
    description: "",
    paymentTerms: null,
    clientName: "",
    clientEmail: "",
    status: "",
    senderAddress: {
        street: "",
        city: "",
        postCode: "",
        country: ""
    },
    clientAddress: {
        street: "",
        city: "",
        postCode: "",
        country: ""
    },
    items: [
        {
            name: "",
            quantity: null,
            price: null,
            total: null
        },
        {
            name: "",
            quantity: null,
            price: null,
            total: null
        }
    ],
    total: ""
}