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
        items: []
    },
    {
        title: "About",
        page: "about",
        access: "all",
        items: []
    },

    {
        title: "Home",
        page:"/",
        access: "all",
        items: []
    },
];