export const menuItems = [
    {
        title: "Admin",
        page: "admin",
        access: "admin",
        items: []
    },
    {
        title: "Students",
        page: "students",
        access: "verified",
        items: [
            {title: "Events",
                page: "students/events",
                access: "verified",
                items: []}
        ]
    },
    {
        title: "Facilities",
        page: "/faclilities",
        access: "all",
        items: []
    },
    {
        title: "#GetInvolved",
        page: "/get-involved",
        access: "all",
        items: [
            {title: "Societies",
            page: "get-involved/societies",
            access: "all",
            items: []},
            {title: "Sports",
                page: "get-involved/sports",
                access: "all",
                items: []},
            {title: "Committees",
                page: "get-involved/committees",
                access: "all",
                items: []}
        ]
    },
    {
        title: "About",
        page: "about",
        access: "all",
        items: [
            {title: "Finance",
            page: "finance",
            access: "all",
            items: []}
            ]
    },

    {
        title: "Home",
        page:"/",
        access: "all",
        items: []
    },
];