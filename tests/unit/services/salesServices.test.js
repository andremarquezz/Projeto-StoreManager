const sinon = require("sinon");
const chai = require("chai");
const { expect } = chai;
const chaiAsPromised = require("chai-as-promised");
const salesService = require("../../../services/productsService");
const salesModel = require("../../../models/salesModel");

chai.use(chaiAsPromised);

describe("Testa a camada Sales Service", () => {
  beforeEach(sinon.restore);


 // Diz que a função existe
  // it("Testa chamada para a função checkProductExists", async () => {
  //   sinon.stub(salesModel, "checkProductExists").resolves({ exists: 1 });
  //   return expect(salesService.checkProductExists(1)).to.be.eventually.deep.eq({
  //     exists: 1,
  //   });
  // });
});
