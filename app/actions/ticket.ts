import { z } from "zod";

export const ticketSchema = z.object({
  type: z.string(),
  patient_ref: z.string(),
  status: z.enum(["ouvert", "fermé"]),
});

// cree un ticket
export const createTicket = async (state: any, formdata: FormData) => {
  try {
    const ticket = ticketSchema.safeParse({
        type: formdata.get("type"),
        patient_ref: formdata.get("patient_ref"),
        status: formdata.get("status"),
    })

    if (!ticket.success) {
        return {
            type: "error", message: ticket.error.flatten().fieldErrors
        }
    }
    
    const newTicket = await ticketSchema.parseAsync(ticket);

    return {
      type: "success",
      message: "Ticket créé avec succès",
      data: newTicket,
    };
  } catch (error: any) {
    return {
      type: "error",
      message: error.errors,
    };
  }
};