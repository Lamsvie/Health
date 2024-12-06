import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

export function getPage(role: string) {
    

    if (role === 'Admin') {
        // Menu items.
        const items = [
            {
            title: "Dashboard",
            url: "#",
            icon: Home,
            },
            {
            title: "Medecin",
            url: "#",
            icon: Inbox,
            },
            {
            title: "Ajout Medecin",
            url: "#",
            icon: Inbox,
            },
            {
            title: "Patient",
            url: "#",
            icon: Calendar,
            },
            {
            title: "Tickets",
            url: "#",
            icon: Search,
            },
            {
            title: "Gestion Compte",
            url: "/dashboard/management",
            icon: Settings,
            },
        ] 

        return items

    }else if (role === 'Patient') {
        
        const items = [
            {
            title: "Dashboard",
            url: "#",
            icon: Home,
            },
            {
            title: "Liste Dossier",
            url: "#",
            icon: Inbox,
            },
            {
            title: "Compte",
            url: "#",
            icon: Settings,
            },
        ] 

        return items
    }else if (role === 'Medecin') {
        
        const items = [
            {
            title: "Dashboard",
            url: "#",
            icon: Home,
            },
            {
            title: "Liste Patient",
            url: "#",
            icon: Inbox,
            },
            {
            title: "Compte",
            url: "#",
            icon: Settings,
            },
        ] 

        return items
    }else{
        
        const items = [
            {
            title: "Tickets",
            url: "#",
            icon: Inbox,
            },
            {
                title: "Liste Patient",
                url: "#",
                icon: Home,
            },
            {
            title: "Compte",
            url: "#",
            icon: Settings,
            },
        ] 

        return items
    }

}