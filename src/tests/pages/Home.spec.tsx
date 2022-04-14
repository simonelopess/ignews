import { render, screen } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import { debug } from "console";
import Home, { getStaticProps } from "../../pages";
import { stripe } from "../../services/stripe";

jest.mock("next/router");
jest.mock("next-auth/client", () => {
  return {
    useSession: () => [null, false],
  };
});

jest.mock("../../services/stripe");

describe("Home page", () => {
  it("renders correctly", () => {
    render(<Home product={{ priceId: "fake-price-id", amount: "R10,00" }} />);

    expect(screen.getByText("for R10,00 month")).toBeInTheDocument();
  });

  //renderiza props de uma funcao assincrona

  it("loads initial data", async () => {
    const retriveStripePricesMocked = mocked(stripe.prices.retrieve);
    retriveStripePricesMocked.mockReturnValueOnce({
      id: "fake-price-id",
      unit_amount: 1000,
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId: "fake-price-id",
            amount: "$10.00",
          },
        },
      })
    );
  });
});
