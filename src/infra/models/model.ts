import { Database } from "../config/database";
import { v4 as uuid } from "uuid";
import { Knex } from "knex";

export default class Model {
  table: string;
  protected tenant: string;
  protected query: Knex.QueryBuilder;

  constructor(table: string) {
    this.table = table;
    this.tenant = "public";
    this.query = this.with();
  }

  protected with() {
    return Database(this.table);
  }

  find(conditions: any) {
    return this.with().where(conditions);
  }

  findOne(conditions: any) {
    return this.with().where(conditions).first();
  }

  findById(id: string) {
    return this.with().where({ id }).first();
  }

  create(params: any): any {
    return this.with()
      .insert({
        ...params,
        id: uuid(),
      })
      .returning("*");
  }

  update(id: string, values: any): any {
    return this.with()
      .where({ id })
      .update({ ...values, updated_at: Database.fn.now() })
      .returning("*");
  }
}
