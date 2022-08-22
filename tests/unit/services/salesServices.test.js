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

  fakeSalesOne = [
    {
      saleId: 1,
      date: "2021-09-09T04:54:29.000Z",
      productId: 1,
      quantity: 2,
    },
  ];

  it("Verifica que checkSalesExists retorna true caso a venda exista", async () => {
    sinon.stub(SalesModel, "checkSalesExists").resolves({ exists: 1 });
    return expect(SalesService.checkSalesExists(1)).to.be.eventually.true;
  });

  it("Verifica que getAll retorna as vendas", async () => {
    sinon.stub(SalesModel, "getAll").resolves(fakeSalesAll);

    return expect(SalesService.getAll()).to.be.eventually.deep.eq(fakeSalesAll);
  });

  it("Verifica que getOne retorna as vendas com o ID", async () => {
    sinon.stub(SalesModel, "getOne").resolves(fakeSalesOne);

    return expect(SalesService.getOne("1")).to.be.eventually.deep.eq(
      fakeSalesOne
    );
  });

  it("Verifica que handleSaleProducts retorna um produto vendido", async () => {
    sinon.stub(SalesService, "checkProductExists").resolves();
    sinon.stub(SalesModel, "addSalesProducts").resolves(2);

    const response = {
      id: 2,
      itemsSold: fakeSalesOne,
    };

    return expect(
      SalesService.handleSaleProducts(fakeSalesOne)
    ).to.be.eventually.deep.eq(response);
  });

  it("Verifica que deleteProduct não tem retorno", async () => {
    sinon.stub(SalesService, "checkSalesExists").resolves();
    sinon.stub(SalesModel, "deleteProduct").resolves();

    return expect(SalesService.deleteProduct(1)).to.be.deep.eventually.eq(
      undefined
    );
  });

  it("Verifica que checkProductExists retorna true caso consiga encontrar o produto", async () => {
    sinon.stub(SalesModel, "checkProductExists").resolves();
    const responses = [{ exists: 1 }];
    sinon.stub(Promise, "all").resolves(responses);
    return expect(SalesService.checkProductExists([{ productId: 1 }])).to.be
      .eventually.true;
  });

  it("Verifica que updateProduct retorna um produto atualizado", async () => {
    sinon.stub(SalesService, "checkSalesExists").resolves();
    sinon.stub(SalesService, "checkProductExists").resolves();
    sinon.stub(SalesModel, "updateProduct").resolves();
    sinon.stub(SalesModel, "findUpdatedSales").resolves(fakeSalesAll);

    const response = {
      saleId: 1,
      itemsUpdated: fakeSalesAll,
    };
    return expect(
      SalesService.updateProduct(1, fakeSalesAll)
    ).to.be.eventually.deep.eq(response);
  });

  describe("Testa tratamento de erros em Sales Service", () => {
    it("Verifica que checkProductExists retorna um erro caso não consiga encontrar o produto", async () => {
      sinon.stub(SalesModel, "checkProductExists").resolves();
      const responses = [{ exists: 0 }];
      sinon.stub(Promise, "all").resolves(responses);
      return expect(SalesService.checkProductExists([{ productId: 5 }]))
        .to.eventually.rejectedWith("Product not found")
        .and.be.an.instanceOf(NotFoundError)
        .and.have.property("code", 404);
    });

    it("Verifica que checkSalesExists retorna um erro caso não consiga encontrar a venda", async () => {
      sinon.stub(SalesModel, "checkSalesExists").resolves({ exists: 0 });
      return expect(SalesService.checkSalesExists(5))
        .to.eventually.rejectedWith("Sale not found")
        .and.be.an.instanceOf(NotFoundError)
        .and.have.property("code", 404);
    });

    it("Verifica que getAll retorna um erro caso não consiga encontrar todas as vendas", async () => {
      sinon.stub(SalesModel, "getAll").resolves([]);

      return expect(SalesService.getAll())
        .to.eventually.rejectedWith("Sale not found")
        .and.be.an.instanceOf(NotFoundError)
        .and.have.property("code", 404);
    });

    it("Verifica que getOne retorna um erro caso não consiga encontrar uma venda", async () => {
      sinon.stub(SalesModel, "getOne").resolves([]);

      return expect(SalesService.getOne(5))
        .to.eventually.rejectedWith("Sale not found")
        .and.be.an.instanceOf(NotFoundError)
        .and.have.property("code", 404);
    });
  });
});
