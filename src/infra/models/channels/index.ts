import Model from "../model";

interface IChannel {
  readonly id: string;
  name: string;
  readonly createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export class Channel extends Model implements IChannel {
  id!: string;
  name!: string;
  createdAt!: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  constructor() {
    super("channels");
  }
}
