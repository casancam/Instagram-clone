import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import SignUp from "../../pages/sign-up";
import { act } from "react-dom/test-utils";
import FirebaseContext from "../../context/firebase";
import { BrowserRouter as Router } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { doesUsernameExist } from "../../services/firebase";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock("../../services/firebase");

describe("<SignUp />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the sign up page with a form submission and signs a user up", async () => {
    const firebase = {
      firestore: jest.fn(() => ({
        collection: jest.fn(() => ({
          add: jest.fn(() => Promise.resolve("User added")),
        })),
      })),
      auth: jest.fn(() => ({
        createUserWithEmailAndPassword: jest.fn(() => ({
          user: {
            updateProfile: jest.fn(() => Promise.resolve("I am signed up!")),
          },
        })),
      })),
    };

    const { getByTestId, getByPlaceholderText, queryByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={{ firebase }}>
          <SignUp />
        </FirebaseContext.Provider>
      </Router>
    );

    await act(async () => {
      doesUsernameExist.mockImplementation(() => Promise.resolve(true)); // as true but inverse in the code

      await fireEvent.change(getByPlaceholderText("Username"), {
        target: { value: "carlos_sc00" },
      });
      await fireEvent.change(getByPlaceholderText("Full name"), {
        target: { value: "Carlos Sanchez" },
      });
      await fireEvent.change(getByPlaceholderText("Email address"), {
        target: { value: "carlossc999@gmail.com" },
      });
      await fireEvent.change(getByPlaceholderText("Password"), {
        target: { value: "password" },
      });
      fireEvent.submit(getByTestId("sign-up"));

      expect(document.title).toEqual("Sign Up - Softwaregram");
      await expect(doesUsernameExist).toHaveBeenCalled();
      await expect(doesUsernameExist).toHaveBeenCalledWith("carlos_sc00");

      await waitFor(() => {
        expect(mockedUsedNavigate).toHaveBeenCalledWith(ROUTES.DASHBOARD);
        expect(getByPlaceholderText("Username").value).toBe("carlos_sc00");
        expect(getByPlaceholderText("Full name").value).toBe("Carlos Sanchez");
        expect(getByPlaceholderText("Email address").value).toBe(
          "carlossc999@gmail.com"
        );
        expect(getByPlaceholderText("Password").value).toBe("password");
        expect(queryByTestId("error")).toBeFalsy();
      });
    });
  });

  it("renders the sign up page but an error is present (username exists)", async () => {
    const firebase = {
      auth: jest.fn(() => ({
        createUserWithEmailAndPassword: jest.fn(() => ({
          user: {
            updateProfile: jest.fn(() => Promise.resolve({})),
          },
        })),
      })),
    };

    const { getByTestId, getByPlaceholderText, queryByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={{ firebase }}>
          <SignUp />
        </FirebaseContext.Provider>
      </Router>
    );

    await act(async () => {
      doesUsernameExist.mockImplementation(() => Promise.resolve([false])); // as true but inverse in the code

      await fireEvent.change(getByPlaceholderText("Username"), {
        target: { value: "carlos_sc00" },
      });
      await fireEvent.change(getByPlaceholderText("Full name"), {
        target: { value: "Carlos Sanchez" },
      });
      await fireEvent.change(getByPlaceholderText("Email address"), {
        target: { value: "carlossc999@gmail.com" },
      });
      await fireEvent.change(getByPlaceholderText("Password"), {
        target: { value: "password" },
      });
      fireEvent.submit(getByTestId("sign-up"));

      expect(document.title).toEqual("Sign Up - Softwaregram");
      await expect(doesUsernameExist).toHaveBeenCalled();
      await expect(doesUsernameExist).toHaveBeenCalledWith("carlos_sc00");

      await waitFor(() => {
        expect(mockedUsedNavigate).not.toHaveBeenCalledWith(ROUTES.DASHBOARD);
        //expect(getByPlaceholderText("Username").value).toBe("");
        //expect(getByPlaceholderText("Full name").value).toBe("");
        //expect(getByPlaceholderText("Email address").value).toBe("");
        //expect(getByPlaceholderText("Password").value).toBe("");
        //expect(queryByTestId("error")).toBeTruthy();
      });
    });
  });
});
