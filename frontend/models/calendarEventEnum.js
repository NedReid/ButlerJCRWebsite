export const calendarEventEnum = {
    other: 0,
    largeEvent: 1,
    barEvent: 2,
    campaignWeek: 3,
    campaignWeekEvent: 4,
    chillEvent: 5,
    formal: 6,
};

export const getCalendarEventTypeName = (type) => {
    switch (type) {
        case calendarEventEnum.largeEvent:
            return "Large Event";
        case calendarEventEnum.barEvent:
            return "Bar Event";
        case calendarEventEnum.campaignWeek:
            return "Campaign Week";
        case calendarEventEnum.campaignWeekEvent:
            return "Campaign Week Event";
        case calendarEventEnum.chillEvent:
            return "Chill Event";
        case calendarEventEnum.other:
            return "Other";
        case calendarEventEnum.formal:
            return "Formal";
    }
};

export const calendarEventTypeColor = (type) => {
    switch (type) {
        case calendarEventEnum.largeEvent:
            return "#4816f6";
        case calendarEventEnum.barEvent:
            return "#258c33";
        case calendarEventEnum.campaignWeek:
            return "#a14b03";
        case calendarEventEnum.campaignWeekEvent:
            return "#a40303";
        case calendarEventEnum.chillEvent:
            return "#146b93";
        case calendarEventEnum.other:
            return "#3a3a3a";
        case calendarEventEnum.formal:
            return "#9d18bb";
    }
};

export const monthName = (month) => {
    switch (month) {
        case 0:
            return "January";
        case 1:
            return "February";
        case 2:
            return "March";
        case 3:
            return "April";
        case 4:
            return "May";
        case 5:
            return "June";
        case 6:
            return "July";
        case 7:
            return "August";
        case 8:
            return "September";
        case 9:
            return "October";
        case 10:
            return "November";
        case 11:
            return "December";
    }
};
