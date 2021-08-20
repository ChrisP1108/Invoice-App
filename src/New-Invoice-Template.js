export const NewInvoiceTemplate = {
    id: "",
    createdAt: "",
    paymentDue: "",
    description: "",
    paymentTerms: null,
    clientName: "",
    clientEmail: "",
    status: "Not Set",
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
    total: "Not Set"
}

export const ItemAddSchema = 
    {
        id: null,
        name: "",
        quantity: 0,
        price: 0,
        total: 0
    }