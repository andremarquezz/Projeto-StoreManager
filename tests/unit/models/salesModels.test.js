const sinon = require("sinon");
const { expect } = require("chai");
const salesModel = require("../../../models/salesModel");
const connection = require("../../../models/connection");

describe("Testa a camada Product Model", () => {
  const fakeRegisterProduct = [
    {
      productId: 10,
      quantity: 5,
    },
  ];

  const fakeRegistered = {
    id: 2,
    itemsSold: [
      {
        productId: 2,
        quantity: 5,
      },
    ],
  };

  beforeEach(sinon.restore);

  it("Testa função que verifica se o produto existe no DB", async () => {
    sinon.stub(connection, "execute").resolves([[{ exists: 1 }]]);
    return expect(salesModel.checkProductExists(1)).to.be.eventually.deep.eq({
      exists: 1,
    });
  });
  it("Testa função que registra o produto no DB", async () => {
    sinon.stub(connection, "execute").resolves([fakeRegistered]);
    return expect(
      salesModel.addSalesProducts(fakeRegisterProduct)
    ).to.be.eventually.deep.eq(fakeRegistered);
  });
});
