import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { LoginPage } from "../../pages/LoginPage";
import { PrivateRoute } from "../PrivateRoute";
import { FormLogin } from "./index";

it('sum', () => {
  expect(1 + 1).toBe(2)
})

// describe("InputLogin Compontent", () => {
//   it("should render InputLogin with Username and Password", async () => {
//     render(
//       <BrowserRouter>
//         <Routes>
//           <Route path="/login" element={<FormLogin />} />
//         </Routes>
//       </BrowserRouter>
//     );

//     const buttonBack = screen.getByTestId("link");
//     userEvent.click(buttonBack);
//     expect(buttonBack).toBeInTheDocument();
//   });
// });



// Exemplo de teste de imagens com url
// render(<COmponente image={image}/>);

// const image = screen.getByRole('img');
// expect(image).toHaveAttribute('src', image.url);