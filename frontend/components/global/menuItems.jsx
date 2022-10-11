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
        title: "\u00A0\u00A0The JCR\u00A0\u00A0",
        page: "jcr",
        access: "all",
        items: [
            {title: "Finance",
            page: "finance",
            access: "all",
            items: []},
            {title: "Roles",
                page: "roles",
                access: "all",
                items: []},
            {title: "Elections",
                page: "elections",
                access: "all",
                items: []},
            {title: "Who's Who",
            page: "whos-who",
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