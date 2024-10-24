export const menuItems = [
    {
        title: "Admin",
        page: "/admin",
        access: "admin",
        items: [],
    },
    {
        title: "Students",
        page: "/students",
        access: "verified",
        items: [
            // {title: "Events",
            //     page: "/students/events",
            //     access: "verified",
            //     items: []},
            { title: "Posts", page: "/students/edit-posts", access: "verified", items: [] },
        ],
    },
    {
        title: "Freshers",
        page: "/freshers",
        access: "freshers",
        items: [
            { title: "Home", page: "/freshers", access: "freshers", items: [] },
            { title: "FAQ", page: "/freshers/faq", access: "freshers", items: [] },
            { title: "Schedule", page: "/freshers/schedule", access: "freshers", items: [] },
        ],
    },
    {
        title: "\u00A0\u00A0MCR\u00A0\u00A0",
        page: "/mcr",
        access: "all",
        items: [
            { title: "Home", page: "/mcr", access: "all", items: [] },
            { title: "News", page: "/mcr/news", access: "all", items: [] },
            { title: "Exec", page: "/mcr/whos-who", access: "all", items: [] },
        ],
    },
    {
        title: "\u00A0Facilities\u00A0",
        page: "facilities",
        access: "all",
        items: [
            { title: "JB's", page: "/jbs", access: "all", items: [] },
            { title: "Gym", page: "/gym", access: "all", items: [] },
            { title: "Bookable<br/>Spaces", page: "/bookable-spaces", access: "all", items: [] },
            { title: "Study<br/>Spaces", page: "/study-spaces", access: "all", items: [] },
        ],
    },
    {
        title: "#GetInvolved",
        page: "/get-involved",
        access: "all",
        items: [
            { title: "Calendar", page: "/calendar", access: "all", items: [] },
            { title: "Societies", page: "/get-involved/societies", access: "all", items: [] },
            { title: "Sports", page: "/get-involved/sports", access: "all", items: [] },
            { title: "Committees", page: "/get-involved/committees", access: "all", items: [] },
        ],
    },
    {
        title: "\u202F\u00A0\u00A0\u00A0The JCR\u00A0\u00A0\u00A0\u202F",
        page: "/jcr",
        access: "all",
        items: [
            { title: "Finance", page: "/finance", access: "all", items: [] },
            { title: "Roles", page: "/roles", access: "all", items: [] },
            { title: "Elections", page: "/elections", access: "all", items: [] },
            { title: "Documents", page: "/documents", access: "all", items: [] },
            { title: "FAQ", page: "/faq", access: "all", items: [] },
            { title: "Who's Who", page: "/whos-who", access: "all", items: [] },
            { title: "Contact", page: "/contact", access: "all", items: [] },
            { title: "Photos", page: "/photos", access: "all", items: [] },
            { title: "Weekly Email", page: "/weekly-email", access: "all", items: [] },
        ],
    },

    {
        title: "Home",
        page: "/",
        access: "all",
        items: [],
    },
];
