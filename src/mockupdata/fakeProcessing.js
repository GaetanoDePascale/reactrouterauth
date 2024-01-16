export function getCalculatedFormData(postParams) {
    const newItem = {
        id: 23,
        label: "Esito",
        type: "TEXT",
        required: true,
        minValue: null,
        maxValue: null,
        value: "",
        validator: null
    };

    const formData = [...postParams.formData]
    formData.push(newItem);

    const returnParams = {
        formData,
        values: {
            ...postParams.values,
            [postParams.currentItem.id]: 'calculated'
        },
        currentItem: postParams.currentItem,
    }

    return returnParams;
}