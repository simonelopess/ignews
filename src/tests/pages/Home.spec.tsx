import { render, screen } from "@testing-library/react";
import { debug } from "console";
import Home from "../../pages";

jest.mock("next/router");
jest.mock("next-auth/client", () => {
  return {
    useSession: () => [null, false],
  };
});

describe("Home page", () => {
  it("renders correctly", () => {
    render(<Home product={{ priceId: "fake-price-id", amount: "R10,00" }} />);

    expect(screen.getByText("for R10,00 month")).toBeInTheDocument();
  });
});
