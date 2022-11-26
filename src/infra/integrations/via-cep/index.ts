import fetch from "node-fetch";
import { InvalidParamError } from "@utils/errors/invalidParams";
import { ServerError } from "@presentations/errors/index";

export class ViaCepIntegration {
  async validade(zipCode: string) {
    const isValidZipCode = /^[0-9]{5}-?[0-9]{3}$/.test(zipCode);

    if (!isValidZipCode) {
      throw new InvalidParamError("zipCode");
    }

    const response = await fetch(`https://viacep.com.br/ws/${zipCode}/json/`);
    const data = await response.json();

    if (data.erro) {
      throw new ServerError("Integration ViaCEP failed");
    }

    return data;
  }
}
