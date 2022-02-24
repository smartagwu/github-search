import ProfileMenu from ".";
import userEvent from "@testing-library/user-event";
import { render, screen } from "../../utils/testUtils";
import { getStore } from "../../store/store";
import { getUserProfileSuccessful } from "../../screens/Login/presentation/store/actions";
import { UserProfile } from "../../screens/Login/domain/LoginRepository";
import asyncDelay from "../../utils/asyncDelay";

test("Render component properly", () => {
  const store = getStore();
  const userProfile: UserProfile = { name: "Smart Agwu" };
  store.dispatch(getUserProfileSuccessful(userProfile));

  render(<ProfileMenu />, store);

  const profileName = screen.getByText(/smart agwu/i);
  expect(profileName).toBeInTheDocument();
});

test("Displays menu card on click", async () => {
  render(<ProfileMenu />);

  const menuCard = screen.getByTestId("menu-card-id");

  userEvent.click(menuCard);
  expect(await screen.findByText(/logout/i)).toBeInTheDocument();

  userEvent.click(menuCard);
  await asyncDelay(2000);
  expect(screen.queryByText(/logout/i)).toBeNull();
});
