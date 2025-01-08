import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

export function getPage(role: string, id: string) {
    

    if (role === 'Admin') {
        // Menu items.
        const items = [
            {
            title: "Dashboard",
            url: "/dashboard",
            icon: Home,
            },
            {
            title: "Dossier Medecin",
            url: "/dashboard/personnels",
            icon: Inbox,
            },
            {
            title: "Dossier Patient",
            url: "/dashboard/patients",
            icon: Calendar,
            },
            {
            title: "Tickets",
            url: "/dashboard/tickets",
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
            url: `/dashboard/patients/dashboard/${id}`,
            icon: Home,
            },
            {
            title: "Liste Dossier",
            url: `/dashboard/patients/dossier/${id}`,
            icon: Inbox,
            },
            {
            title: "Dossier",
            url: `/dashboard/patients/${id}`,
            icon: Settings,
            },
        ] 

        return items
    }else if (role === 'Medecin') {
        
        const items = [
            {
            title: "Dashboard",
            url: `/dashboard/personnels/dashboard/${id}`,
            icon: Home,
            },
            {
            title: "Liste Patient",
            url: "/dashboard/patients",
            icon: Inbox,
            },
            {
            title: `Dossier`,
            url: `/dashboard/personnels/${id}`,
            icon: Settings,
            },
        ] 

        return items
    }else{
        
        const items = [
            {
            title: "Tickets",
            url: "/dashboard/tickets",
            icon: Inbox,
            },
            {
                title: "Liste Patient",
                url: "/dashboard/patients",
                icon: Home,
            },
            {
            title: "Dossier",
            url: `/dashboard/personnels/${id}`,
            icon: Settings,
            },
        ] 

        return items
    }

}