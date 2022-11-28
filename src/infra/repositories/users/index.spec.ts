import { UsersRepository } from ".";

class UserModelSpy {
  user = {
    name: "any_name",
    id: "any_id",
  };

  async find() {
    return [this.user];
  }

  async findById() {
    return this.user;
  }
}

const makeSut = () => {
  const userModelSpy = new UserModelSpy();
  const sut = new UsersRepository(userModelSpy as any);

  return {
    sut,
    userModelSpy,
  };
};

describe("Users Repository", () => {
  it("should return all users when fetch all is called", async () => {
    const { sut, userModelSpy } = makeSut();

    const users = await sut.fetchAll();

    expect(users).toEqual([userModelSpy.user]);
  });

  it("should return a user when fetch by id is called", async () => {
    const { sut, userModelSpy } = makeSut();

    const user = await sut.fetchById("any_id");

    expect(user).toEqual(userModelSpy.user);
  });
});
