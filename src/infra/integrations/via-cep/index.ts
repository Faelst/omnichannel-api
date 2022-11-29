import fetch from "node-fetch";

export class ViaCepIntegration {
  async getAddress(zipCode: string) {
    const response = await fetch(`https://viacep.com.br/ws/${zipCode}/json/`);
    return await response.json();
  }
}
