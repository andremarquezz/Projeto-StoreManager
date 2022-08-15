const sinon = require("sinon");
const chai = require("chai");
const { expect } = chai;
const chaiAsPromised = require("chai-as-promised");
const salesService = require("../../../services/salesService");
const salesModel = require("../../../models/salesModel");

chai.use(chaiAsPromised);

describe("Testa a camada Sales Service", () => {
  beforeEach(sinon.restore);

  // tem que testar caso de erro
  // it("Testa chamada para a função checkProductExists", async () => {
  //   sinon.stub(salesModel, "checkProductExists").resolves({ exists: 1 });
  //   const call = salesService.checkProductExists([{ productId: 5 }])
  //   return expect(call).to.be.eventually.deep.eq({
  //     exists: 1,
  //   });
  // });

  //  it("Testa chamada para a função handleSaleProducts", async () => {
  //    sinon.stub(salesModel, "checkProductExists").resolves({ exists: 1 });
  //    const call = salesService.checkProductExists([{ productId: 1 }]);
  //    return expect(call).to.be.eventually.deep.eq({
  //      exists: 1,
  //    });
  //  });
});
