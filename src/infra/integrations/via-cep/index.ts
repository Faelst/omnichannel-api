import { ServerError } from "@presentations/errors";
import fetch from "node-fetch";

export interface IGetAddress {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export class ViaCepIntegration {
  async getAddress(zip_code: string): Promise<IGetAddress> {
    const response = await fetch(`https://viacep.com.br/ws/${zip_code}/json/`);

    const data = await response.json();

    if (data.erro) {
      throw new ServerError("Integration ViaCEP failed");
    }

    return data;
  }
}
