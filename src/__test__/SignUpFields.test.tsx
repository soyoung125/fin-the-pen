import { fireEvent, screen, waitFor } from "@testing-library/react";
import SignUp from "@pages/SignUp";
import { CustomRender } from "@__test__/utils.tsx";
import {
  NO_BLANKS,
  NO_DUPLICATION_ID,
  SIGN_UP_SUCCESS,
} from "@constants/messages.tsx";

const setup = (label: string) => {
  const utils = CustomRender(<SignUp />, {});
  const input: HTMLInputElement = screen.getByTestId(label);
  return {
    input,
    ...utils,
  };
};

describe("SignUpField.tsx", () => {
  it("name TextField 에서 모든 문자 입력을 허용합니다.", () => {
    const { input } = setup("name");
    fireEvent.change(input, { target: { value: "홍길동" } });
    expect(input.value).toBe("홍길동");
  });

  it("email TextField 에서 모든 문자 입력을 허용합니다.", () => {
    const { input } = setup("email");
    fireEvent.change(input, { target: { value: "test@email.com" } });
    expect(input.value).toBe("test@email.com");
  });

  it("password TextField 에서 모든 문자 입력을 허용합니다.", () => {
    const { input } = setup("password");
    fireEvent.change(input, { target: { value: "password123!" } });
    expect(input.value).toBe("password123!");
  });

  it("password check TextField 에서 모든 문자 입력을 허용합니다.", () => {
    const { input } = setup("password_check");
    fireEvent.change(input, { target: { value: "password123!" } });
    expect(input.value).toBe("password123!");
  });

  it("phone number TextField 는 숫자만 입력 가능합니다.", () => {
    const { input, ...utils } = setup("phoneNumber");

    fireEvent.change(input, { target: { value: "1234556" } });
    expect(input.value).toBe("1234556");
  });

  it("모든 사항에 대해 입력 후 회원가입이 가능합니다.", async () => {
    const { input: phoneNumber, ...utils } = setup("phoneNumber");
    const submit = screen.getByText("회원가입");
    const name = screen.getByTestId("name");
    const email = screen.getByTestId("email");
    const pwd = screen.getByTestId("password");
    const pwd_chk = screen.getByTestId("password_check");

    window.alert = vi.fn();

    fireEvent.change(name, { target: { value: "test name" } });
    fireEvent.click(submit);

    expect(window.alert).toBeCalledWith(NO_BLANKS);
    window.close();

    fireEvent.change(email, { target: { value: "testtest@email.com" } });
    fireEvent.click(submit);

    expect(window.alert).toBeCalledWith(NO_BLANKS);
    window.close();

    fireEvent.change(pwd, { target: { value: "password123" } });
    fireEvent.click(submit);

    expect(window.alert).toBeCalledWith(NO_BLANKS);
    window.close();

    fireEvent.change(phoneNumber, { target: { value: "01011112222" } });
    fireEvent.click(submit);

    expect(window.alert).toBeCalledWith(NO_BLANKS);
    window.close();

    fireEvent.change(name, { target: { value: "test name" } });
    fireEvent.change(email, { target: { value: "testtest@email.com" } });
    fireEvent.change(pwd, { target: { value: "password123" } });
    fireEvent.change(phoneNumber, { target: { value: "01011112222" } });
    fireEvent.click(submit);

    expect(window.alert).toBeCalledWith(SIGN_UP_SUCCESS);
  });
});
