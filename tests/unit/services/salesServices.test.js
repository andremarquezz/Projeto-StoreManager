const sinon = require("sinon");
const chai = require("chai");
const { expect } = chai;
const chaiAsPromised = require("chai-as-promised");
const SalesService = require("../../../services/salesService");
const SalesModel = require("../../../models/salesModel");
const { NotFoundError } = require("../../../errors/NotFoundError");
const { ServerError } = require("../../../errors/ServerError");

chai.use(chaiAsPromised);

describe("Testa a camada sales Service", () => {
  beforeEach(sinon.restore);

  describe("Testa tratamento de erros", () => {
    it("Verifica que checkProductExists retorna um erro caso não consiga encontrar o produto", async () => {
      sinon.stub(SalesModel, "checkProductExists").resolves({ exists: 0 });
      return expect(SalesService.checkProductExists([{ productId: 5 }]))
        .to.eventually.rejectedWith("Product not found")
        .and.be.an.instanceOf(NotFoundError)
        .and.have.property("code", 404);
    });
  });
});
