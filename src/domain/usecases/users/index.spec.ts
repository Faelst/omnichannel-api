import { UsersUseCase } from ".";

class UsersRepositorySpy {
  fetchByIdParam = "";
  user = {
    id: "any_id",
    name: "any_name",
  };

  async fetchAll() {
    return [
      {
        id: "1",
        name: "John Doe",
      },
    ];
  }

  async fetchById(id: string) {
    this.fetchByIdParam = id;
    return this.user;
  }

  async create(user: { name: string }) {
    user.name = "any_name";
    return [this.user];
  }
}

const makeSut = () => {
  const usersRepositorySpy = new UsersRepositorySpy();

  const sut = new UsersUseCase(usersRepositorySpy as any);

  return {
    sut,
    usersRepositorySpy,
  };
};

describe("Users UseCase", () => {
  it("should return a list of users", async () => {
    const { sut } = makeSut();

    const users = await sut.fetchAll();

    expect(users).toEqual([
      {
        id: "1",
        name: "John Doe",
      },
    ]);
  });

  it("should return a user when fetchById is called", async () => {
    const { sut, usersRepositorySpy } = makeSut();

    const user = await sut.fetchById("any_id");

    expect(user).toEqual(usersRepositorySpy.user);
    expect(usersRepositorySpy.fetchByIdParam).toBe("any_id");
  });

  it("should return a user when create is called", async () => {
    const { sut, usersRepositorySpy } = makeSut();

    const user = await sut.create({
      name: "any_name",
    });

    expect(user).toEqual([usersRepositorySpy.user]);
  });
});
