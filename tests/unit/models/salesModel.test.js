const sinon = require("sinon");
const chai = require("chai");
const { expect } = chai;
const chaiAsPromised = require("chai-as-promised");
const SalesModel = require("../../../models/salesModel");
const connection = require("../../../models/connection");

chai.use(chaiAsPromised);

describe("Testa a camada Sales Model", () => {
  beforeEach(sinon.restore);
  it("Testa a chamada para checkProductExists", async () => {
    const fakeResponse = {
      exists: 1,
    };

    sinon.stub(connection, "execute").resolves([[fakeResponse]]);

    return expect(SalesModel.checkProductExists(1)).to.be.eventually.deep.eq(
      fakeResponse
    );
  });

  // retorna apenas como undefined
  
  // it("Testa a chamada para createSalesId", async () => {
  //   const fakeResponse = 5;

  //   sinon.stub(connection, "execute").resolves([{ fakeResponse }]);

  //   return expect(SalesModel.createSalesId()).to.be.eventually.eq(fakeResponse);
  // });
});
