
export const documentEnum = {
    other: 0,
    standingOrders: 1,
    jcrMinutes: 2,
    execMinutes: 3,
    financeMinutes: 4,
    otherMinutes: 5,
}

export const getDocumentTypeName = (type) => {
    switch (type) {
        case documentEnum.standingOrders:
            return "Standing Orders";
        case documentEnum.jcrMinutes:
            return "JCR Meeting Minutes";
        case documentEnum.execMinutes:
            return "Exec Meeting Minutes"
        case documentEnum.financeMinutes:
            return "Finance Comm Minutes"
        case documentEnum.otherMinutes:
            return "Other Minutes"
        case documentEnum.other:
            return "Other Documents"
    }
}