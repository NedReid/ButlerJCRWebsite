export const SSCEnum = {
    society: 0,
    sport: 1,
    committee: 2,
};

export const getSSCNames = (type) => {
    switch (type) {
        case SSCEnum.society:
            return "Society";
        case SSCEnum.sport:
            return "Sport";
        case SSCEnum.committee:
            return "Committee";
    }
};
