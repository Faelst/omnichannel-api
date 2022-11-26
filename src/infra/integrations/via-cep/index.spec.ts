import nock from "nock";
import { ViaCepIntegration } from "./index";

import { InvalidParamError } from "@utils/errors/invalidParams";
import { ServerError } from "@presentations/errors/index";

const makeSut = () => {
  const sut = new ViaCepIntegration();

  return { sut };
};

describe("address validator", () => {
  const validAddress = {
    cep: "valid_cep",
    logradouro: "valid_logradouro",
    complemento: "valid_complemento",
    bairro: "valid_bairro",
    localidade: "valid_localidade",
    uf: "valid_uf",
    ibge: "valid_ibge",
    gia: " valid_gia",
    ddd: "valid_ddd",
    siafi: "valid_siafi",
  };

  it("should thorw if cep is not provided", async () => {
    const { sut } = makeSut();

    const promise = sut.validade("invalid_cep");
    expect(promise).rejects.toThrow(new InvalidParamError("zipCode"));
  });

  it("should thorw if address is not return of request", async () => {
    const validZipCode = "11111-111";

    nock("https://viacep.com.br/ws")
      .get(`/${validZipCode}/json/`)
      .reply(200, { erro: true, error: "invalid_cep" });

    const { sut } = makeSut();

    const promise = sut.validade(validZipCode);
    expect(promise).rejects.toThrow(
      new ServerError("Integration ViaCEP failed")
    );
  });

  it("should return address if request is success", async () => {
    const validZipCode = "11111-111";

    nock("https://viacep.com.br/ws")
      .get(`/${validZipCode}/json/`)
      .reply(200, validAddress);

    const { sut } = makeSut();

    const address = await sut.validade(validZipCode);
    expect(address).toEqual(validAddress);
  });
});
