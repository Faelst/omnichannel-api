import nock from "nock";
import { ViaCepIntegration } from ".";

const makeSut = () => {
  const sut = new ViaCepIntegration();

  return {
    sut,
  };
};

describe("Via Cep Integration", () => {
  it("should return an address if zip code is valid", async () => {
    const integrationResponse = {
      zip_code: "12345-678",
      address: "any_address",
      complement: "any_complement",
      neighborhood: "any_neighborhood",
      city: "any_city",
      state: "any_state",
      country: "any_country",
    };

    nock("https://viacep.com.br")
      .get("/ws/12345-678/json/")
      .reply(200, integrationResponse);

    const { sut } = makeSut();
    const address = await sut.getAddress("12345-678");
    expect(address).toEqual(integrationResponse);
  });

  it("should return an error if zip code is invalid", async () => {
    nock("https://viacep.com.br")
      .get("/ws/12345-678/json/")
      .reply(400, { erro: true });

    const { sut } = makeSut();
    const promise = sut.getAddress("12345-678");
    await expect(promise).rejects.toThrow();
  });
});
