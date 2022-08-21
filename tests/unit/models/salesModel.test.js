const sinon = require("sinon");
const chai = require("chai");
const { expect } = chai;
const chaiAsPromised = require("chai-as-promised");
const SalesModel = require("../../../models/salesModel");
const connection = require("../../../models/connection");

chai.use(chaiAsPromised);

describe("Testa a camada Sales Model", () => {
  beforeEach(sinon.restore);

  const fakeSalesAll = [
    {
      saleId: 1,
      date: "2021-09-09T04:54:29.000Z",
      productId: 1,
      quantity: 2,
    },
    {
      saleId: 1,
      date: "2021-09-09T04:54:54.000Z",
      productId: 2,
      quantity: 2,
    },
  ];

  const fakeSalesOne = [
    {
      saleId: 2,
      date: "2022-08-17T20:30:14.000Z",
      productId: 3,
      quantity: 15,
    },
  ];

  const fakeAddSale = [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 5,
    },
  ];

  it("Verifica que checkSalesExists retorna um objeto exists com valor 1", async () => {
    const responseFake = { exists: 1 };

    sinon.stub(connection, "execute").resolves([[responseFake]]);

    return expect(SalesModel.checkSalesExists(1)).to.be.eventually.deep.eq(
      responseFake
    );
  });

  it("Verifica que checkProductExists retorna um objeto exists com valor 1", async () => {
    const responseFake = { exists: 1 };

    sinon.stub(connection, "execute").resolves([[responseFake]]);

    return expect(SalesModel.checkProductExists(1)).to.be.eventually.deep.eq(
      responseFake
    );
  });

  it("Verifica que possui as vendas necessarias no retorno de GetAl", async () => {
    sinon.stub(connection, "execute").resolves([fakeSalesAll]);

    return expect(SalesModel.getAll()).to.be.eventually.eq(fakeSalesAll);
  });

  it("Verfica que createSalesId retorna um ID", async () => {
    sinon.stub(connection, "execute").resolves([{ insertId: 5 }]);

    return expect(SalesModel.createSalesId()).to.be.eventually.eq(5);
  });

  it("Verifica que a chamada para GetOne retorna um array com as chaves necessarias", async () => {
    sinon.stub(connection, "execute").resolves([fakeSalesOne]);

    const callFunction = await SalesModel.getOne("1");

    expect(callFunction[0])
      .to.be.an("object")
      .to.be.deep.keys("saleId", "date", "productId", "quantity");
  });
  it("Verifica que a chamada para addSalesProducts retorna um saleID", async () => {
    sinon.stub(SalesModel, "createSalesId").resolves(5);
    sinon.stub(connection, "execute").resolves();

    return expect(SalesModel.addSalesProducts(fakeAddSale))
      .to.be.eventually.a("number")
      .and.eq(5);
  });
  it("Verifica que a chamada para updateProduct não tem retorno", async () => {
    sinon.stub(connection, "execute").resolves();

    return expect(SalesModel.updateProduct(fakeAddSale)).to.be.eventually
      .undefined;
  });

  it("Verifica que a chamada para findUpdatedSales com o ID 1 retorna vendas com ID = 1", async () => {
    sinon.stub(connection, "execute").resolves([fakeSalesAll]);

    return expect(SalesModel.findUpdatedSales(1))
      .to.be.eventually.an("array")
      .and.eq(fakeSalesAll);
  });
  it("Verifica que a chamada para deleteProduct não tem retorno", async () => {
    sinon.stub(connection, "execute").resolves();

    return expect(SalesModel.deleteProduct(1)).to.be.eventually.undefined;
  });
});
