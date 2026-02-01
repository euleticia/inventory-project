import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductRow from "../ProductRow";
import { Product } from "../../../types";

describe("ProductRow", () => {
  const mockDispatch = jest.fn();

  const mockProduct: Product = {
    id: 1,
    name: "Notebook",
    category: "Eletr�nicos",
    price: 4500,
    stock: 10,
    status: "active",
    selected: false,
  };

  beforeEach(() => {
    mockDispatch.mockClear();
  });

  const renderProductRow = (product: Product) => {
    return render(
      <table>
        <tbody>
          <ProductRow product={product} dispatch={mockDispatch} />
        </tbody>
      </table>
    );
  };

  it("renders product information", () => {
    renderProductRow(mockProduct);

    expect(screen.getByText("Notebook")).toBeInTheDocument();
    expect(screen.getByText("Eletr�nicos")).toBeInTheDocument();
    expect(screen.getByText("R$ 4500.00")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("active")).toBeInTheDocument();
  });

  it("renders checkbox with correct checked state", () => {
    const { container } = renderProductRow(mockProduct);

    const checkbox = container.querySelector(
      "input[type='checkbox']"
    ) as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
  });

  it("renders checkbox as checked when product is selected", () => {
    const selectedProduct = { ...mockProduct, selected: true };
    const { container } = renderProductRow(selectedProduct);

    const checkbox = container.querySelector(
      "input[type='checkbox']"
    ) as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it("dispatches TOGGLE_SELECT when checkbox is clicked", () => {
    const { container } = renderProductRow(mockProduct);

    const checkbox = container.querySelector(
      "input[type='checkbox']"
    ) as HTMLInputElement;
    fireEvent.click(checkbox);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "TOGGLE_SELECT",
      payload: 1,
    });
  });

  it("formats price correctly", () => {
    const productWithDecimal = { ...mockProduct, price: 4500.5 };
    renderProductRow(productWithDecimal);

    expect(screen.getByText("R$ 4500.50")).toBeInTheDocument();
  });

  it("displays product status", () => {
    const inactiveProduct = { ...mockProduct, status: "inactive" };
    renderProductRow(inactiveProduct);

    expect(screen.getByText("inactive")).toBeInTheDocument();
  });
});
