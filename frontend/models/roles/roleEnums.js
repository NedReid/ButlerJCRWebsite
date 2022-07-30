export const meetingEnum = {
    mic1: 0,
    mic2: 1,
    mic3: 2,
    epi1: 3,
    epi2: 4,
    epi3: 5,
    eas1: 6,
    eas2: 7,
    none: -1,
}

export const meetingToName = (meeting) => {
    switch (meeting) {
        case meetingEnum.mic1:
            return "Michaelmas 1"
        case meetingEnum.mic2:
            return "Michaelmas 2"
        case meetingEnum.mic3:
            return "Michaelmas 3"
        case meetingEnum.epi1:
            return "Epiphany 1"
        case meetingEnum.epi2:
            return "Epiphany 2"
        case meetingEnum.epi3:
            return "Epiphany 3"
        case meetingEnum.eas1:
            return "Easter 1"
        case meetingEnum.eas2:
            return "Easter 2"
        case meetingEnum.none:
            return "None"
    }
}

export const methodEnum = {
    m1: 0,
    m2: 1,
    m2a: 2,
    m3: 3,
}

export const methodName = (method) => {
    switch (method) {
        case methodEnum.m1:
            return "Method 1"
        case methodEnum.m2:
            return "Method 2"
        case methodEnum.m2a:
            return "Method 2a"
        case methodEnum.m3:
            return "Method 3"
    }
}

export const roleCategoryEnum = {
    exec: 0,
    exOfficio: 1,
    execAssistants: 2,
    reps: 4,
    other: 5,
    committeeChairs: 6,
    eventChairs: 7
}

export const roleCategoryNames = (category) => {
    switch (category) {
        case roleCategoryEnum.exec:
            return "Exec Roles"
        case roleCategoryEnum.exOfficio:
            return "Ex-Officio Exec"
        case roleCategoryEnum.execAssistants:
            return "Exec Assistants"
        case roleCategoryEnum.reps:
            return "Reps"
        case roleCategoryEnum.other:
            return "Other Roles"
        case roleCategoryEnum.committeeChairs:
            return "Committee Chairs"
        case roleCategoryEnum.eventChairs:
            return "Event Chairs"
    }
}
