import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Login from "../../pages/login";
import { act } from "react-dom/test-utils";
import FirebaseContext from "../../context/firebase";
import { BrowserRouter as Router } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock("../../services/firebase");

describe("<Login />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the login in page with a form submission and logs the user in", async () => {
    const succeededToLogin = jest.fn(() => Promise.resolve("I am signed in!"));
    const firebase = {
      auth: jest.fn(() => ({
        signInWithEmailAndPassword: succeededToLogin,
      })),
    };

    const { getByTestId, getByPlaceholderText, queryByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={{ firebase }}>
          <Login />
        </FirebaseContext.Provider>
      </Router>
    );

    await act(async () => {
      await fireEvent.change(getByPlaceholderText("Email address"), {
        target: { value: "karl@gmail.com" },
      });
      await fireEvent.change(getByPlaceholderText("Password"), {
        target: { value: "password" },
      });
      fireEvent.submit(getByTestId("login"));

      expect(document.title).toEqual("Login - Softwaregram");
      expect(succeededToLogin).toHaveBeenCalled();
      expect(succeededToLogin).toHaveBeenCalledWith(
        "karl@gmail.com",
        "password"
      );

      await waitFor(() => {
        expect(mockedUsedNavigate).toHaveBeenCalledWith(ROUTES.DASHBOARD);
        expect(getByPlaceholderText("Email address").value).toBe(
          "karl@gmail.com"
        );
        expect(getByPlaceholderText("Password").value).toBe("password");
        expect(queryByTestId("error")).toBeFalsy();
      });
    });
  });

  it("renders the login in page with a form submission and fails to log a user in", async () => {
    const failToLogin = jest.fn(() =>
      Promise.reject(new Error("Cannot sign in"))
    );
    const firebase = {
      auth: jest.fn(() => ({
        signInWithEmailAndPassword: failToLogin,
      })),
    };

    const { getByTestId, getByPlaceholderText, queryByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={{ firebase }}>
          <Login />
        </FirebaseContext.Provider>
      </Router>
    );

    await act(async () => {
      await fireEvent.change(getByPlaceholderText("Email address"), {
        target: { value: "karl.com" },
      });
      await fireEvent.change(getByPlaceholderText("Password"), {
        target: { value: "password" },
      });
      fireEvent.submit(getByTestId("login"));

      expect(failToLogin).toHaveBeenCalled();
      expect(failToLogin).toHaveBeenCalledWith("karl.com", "password");
      expect(failToLogin).rejects.toThrow("Cannot sign in");

      await waitFor(() => {
        expect(mockedUsedNavigate).not.toHaveBeenCalledWith(ROUTES.DASHBOARD);
        //expect(getByPlaceholderText("Email address").value).toBe("");
        //expect(getByPlaceholderText("Password").value).toBe("");
        //expect(queryByTestId("error")).toBeTruthy();
      });
    });
  });
});
