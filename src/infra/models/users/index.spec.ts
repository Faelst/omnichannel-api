import Model from "../model";

interface IUsers {
  readonly id: string;
  name: string;
  readonly created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export class Users extends Model implements IUsers {
  id!: string;
  name!: string;
  created_at!: Date;
  updated_at?: Date;
  delete_at?: Date;

  constructor() {
    super("users");
  }
}

const makeSut = () => {
  const sut = new Users();
  return { sut };
};

describe("Users model", () => {
  it("should create return a user", async () => {
    const { sut } = makeSut();

    const user = await sut.create({ name: "John Doe" });

    expect(user).toBeTruthy();
  });

  it("should return a user when get by id", async () => {
    const { sut } = makeSut();

    const fakerUser = await sut.create({ name: "John Doe" });

    const user = await sut.findById(fakerUser[0].id);

    Object.keys(fakerUser[0]).forEach((key) => {
      expect(user[key]).toEqual(fakerUser[0][key]);
    });

    expect(user.id).toBe(fakerUser[0].id);
  });
});
