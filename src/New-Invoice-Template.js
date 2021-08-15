export const NewInvoiceTemplate = {
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
            quantity: 0,
            price: 0,
            total: 0
        }
    ],
    total: ""
}

export const ItemAddSchema = 
    {
        name: "",
        quantity: 0,
        price: 0,
        total: 0
    }