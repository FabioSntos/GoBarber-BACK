import { uuid } from "uuidv4";

import { Entity } from "typeorm";

@Entity("appointments")
class Appointment {
  id: string;

  provider: string;

  date: Date;

  constructor({ provider, date }: Omit<Appointment, "id">) {
    this.id = uuid();
    this.provider = provider;
    this.date = date;
  }
}

export default Appointment;
