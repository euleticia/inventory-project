import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BulkActions from "../BulkActions";

describe("BulkActions", () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it("renders both buttons", () => {
    render(
      <BulkActions dispatch={mockDispatch} hasSelectedProducts={true} />
    );

    expect(screen.getByText("Alterar Categoria")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Aplicar Desconto/i })
    ).toBeInTheDocument();
  });

  it("disables buttons when no products are selected", () => {
    render(
      <BulkActions dispatch={mockDispatch} hasSelectedProducts={false} />
    );

    const categoryButton = screen.getByText("Alterar Categoria");
    const discountButton = screen.getByRole("button", {
      name: /Aplicar Desconto/i,
    });

    expect(categoryButton).toBeDisabled();
    expect(discountButton).toBeDisabled();
  });

  it("enables buttons when products are selected", () => {
    render(
      <BulkActions dispatch={mockDispatch} hasSelectedProducts={true} />
    );

    const categoryButton = screen.getByText("Alterar Categoria");
    const discountButton = screen.getByRole("button", {
      name: /Aplicar Desconto/i,
    });

    expect(categoryButton).not.toBeDisabled();
    expect(discountButton).not.toBeDisabled();
  });

  it("opens category modal when button is clicked", () => {
    render(
      <BulkActions dispatch={mockDispatch} hasSelectedProducts={true} />
    );

    const categoryButton = screen.getByText("Alterar Categoria");
    fireEvent.click(categoryButton);

    expect(screen.getByText("Selecione a categoria")).toBeInTheDocument();
  });

  it("opens discount modal when button is clicked", () => {
    render(
      <BulkActions dispatch={mockDispatch} hasSelectedProducts={true} />
    );

    const discountButton = screen.getByRole("button", {
      name: /Aplicar Desconto/i,
    });
    fireEvent.click(discountButton);

    expect(screen.getByDisplayValue("10")).toBeInTheDocument();
  });

  it("dispatches CHANGE_CATEGORY action when category button is clicked", () => {
    render(
      <BulkActions dispatch={mockDispatch} hasSelectedProducts={true} />
    );

    const categoryButton = screen.getByText("Alterar Categoria");
    fireEvent.click(categoryButton);

    const categoryButtons = screen.getAllByRole("button");
    const lastCategoryButton = categoryButtons[categoryButtons.length - 2];
    fireEvent.click(lastCategoryButton);

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "CHANGE_CATEGORY",
      })
    );
  });

  it("dispatches APPLY_DISCOUNT action with correct percentage", () => {
    render(
      <BulkActions dispatch={mockDispatch} hasSelectedProducts={true} />
    );

    const discountButton = screen.getByRole("button", {
      name: /Aplicar Desconto/i,
    });
    fireEvent.click(discountButton);

    const input = screen.getByPlaceholderText(
      "Digite a porcentagem"
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "20" } });

    const applyButtons = screen.getAllByRole("button", { name: /Aplicar/i });
    const discountApplyButton = applyButtons[1];
    fireEvent.click(discountApplyButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "APPLY_DISCOUNT",
      payload: 20,
    });
  });
});
