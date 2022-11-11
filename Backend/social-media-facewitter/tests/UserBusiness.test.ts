import { UserBusiness } from "../src/business/UserBusiness";
import { UserData } from "../src/data/UserData";
import { HashManagerMock } from "./mocks/servicesMock/HashManagerMock";
import { IdGeneratorMock } from "./mocks/servicesMock/IdGeneratorMock";
import { TokenManagerMock } from "./mocks/servicesMock/TokenManagerMock";
import { UserDatabaseMock } from "./mocks/userMock/UserDBMock";
import { userMock } from "./mocks/userMock/UserMock";

const userBusinessMock = new UserBusiness (
    new UserDatabaseMock() as UserData,
    new IdGeneratorMock(),
    new HashManagerMock(),
    new TokenManagerMock()
)

describe ("Signup Test", () => {
    test ("Return when name is empty", async () => {
        expect.assertions
        try {
            const result = await userBusinessMock.signup(
                "",
                "Jubisbalde",
                "paulo12@gmail.com",
                "paulo123",
                new Date("2002/08/24")
            )

            expect(result).toBeFalsy()
        } catch (error:any) {
            expect(error.message).toEqual("Enter a name");
        }
    })

    test ("Return when nickname is empty", async () => {
        expect.assertions
        try {
            const result = await userBusinessMock.signup(
                "Paulo",
                "",
                "paulo12@gmail.com",
                "paulo123",
                new Date("2002/08/24")
            )

            expect(result).toBeFalsy()
        } catch (error:any) {
            expect(error.message).toEqual("Enter a nickname");
        }
    })

    test ("Return when email is empty", async () => {
        expect.assertions
        try {
            const result = await userBusinessMock.signup(
                "Paulo",
                "Jubisbalde",
                "",
                "paulo123",
                new Date("2002/08/24")
            )

            expect(result).toBeFalsy()
        } catch (error:any) {
            expect(error.message).toEqual("Enter an email");
        }
    })
    test ("Return when email is without @", async () => {
        expect.assertions
        try {
            const result = await userBusinessMock.signup(
                "Paulo",
                "Jubisbalde",
                "paulo.com",
                "paulo123",
                new Date("2002/08/24")
            )

            expect(result).toBeFalsy()
        } catch (error:any) {
            expect(error.message).toEqual("Invalid email");
        }
    })
    test ("Return when email is without .com", async () => {
        expect.assertions
        try {
            const result = await userBusinessMock.signup(
                "Paulo",
                "Jubisbalde",
                "paul@gmail",
                "paulo123",
                new Date("2002/08/24")
            )

            expect(result).toBeFalsy()
        } catch (error:any) {
            expect(error.message).toEqual("Invalid email");
        }
    })

    test ("Return when password is empty", async () => {
        expect.assertions
        try {
            const result = await userBusinessMock.signup(
                "Paulo",
                "Jubisbalde",
                "paulo@gmail.com",
                "",
                new Date("2002/08/24")
            )

            expect(result).toBeFalsy()
        } catch (error:any) {
            expect(error.message).toEqual("Enter a password");
        }
    })

    test ("Return when password is less than 6 char", async () => {
        expect.assertions
        try {
            const result = await userBusinessMock.signup(
                "Paulo",
                "Jubisbalde",
                "paulo@gmail.com",
                "paulo",
                new Date("2002/08/24")
            )

            expect(result).toBeFalsy()
        } catch (error:any) {
            expect(error.message).toEqual("Password must contain more than 6 characters");
        }
    })

    test ("Return when email is already registered", async () => {
        expect.assertions
        try {
            const result = await userBusinessMock.signup(
                "Paulo",
                "Jubisbalde",
                "paulo@gmail.com",
                "paulo123",
                new Date("2002/08/24")
            )

            expect(result).toBeFalsy()
        } catch (error:any) {
            expect(error.message).toEqual("Email already registered");
        }
    })

    test ("Return when nickname registered", async () => {
        expect.assertions
        try {
            const result = await userBusinessMock.signup(
                "Paulo",
                "Meta Tarso",
                "paulo1@gmail.com",
                "paulo123",
                new Date("2002/08/24")
            )

            expect(result).toBeFalsy()
        } catch (error:any) {
            expect(error.message).toEqual("Nickname already registered");
        }
    })
    test ("Return when signup is correct", async () => {
        expect.assertions
        try {
            const result = await userBusinessMock.signup(
                "Paulo",
                "Jubisbalde",
                "paulo1@gmail.com",
                "paulo123",
                new Date("2002/08/24")
            )

            expect(result).toBeTruthy()
            expect(result).toEqual("mocked_token")
        } catch (error:any) {
            throw new Error(error.message);
        }
    })
})


// --------Login--------------Login---------------Login-------------Login---------
// --------Login--------------Login---------------Login-------------Login---------


describe("Login test", () => {
    test ("Return when email is empty", async () => {
        expect.assertions
        try {
            const result = await userBusinessMock.login(
                "",
                "paulo123"
            )

            expect(result).toBeFalsy()
        } catch (error:any) {
            expect(error.message).toEqual("Enter an email");
        }
    })
    test ("Return when email is without @", async () => {
        expect.assertions
        try {
            const result = await userBusinessMock.login(
                "paulo.com",
                "paulo123"
            )

            expect(result).toBeFalsy()
        } catch (error:any) {
            expect(error.message).toEqual("Invalid email");
        }
    })
    test ("Return when email is without .com", async () => {
        expect.assertions
        try {
            const result = await userBusinessMock.login(
                "paul@gmail",
                "pulo123",
            )

            expect(result).toBeFalsy()
        } catch (error:any) {
            expect(error.message).toEqual("Invalid email");
        }
    })

    test ("Return when password is empty", async () => {
        expect.assertions
        try {
            const result = await userBusinessMock.login(
                "paulo@gmail.com",
                ""
            )

            expect(result).toBeFalsy()
        } catch (error:any) {
            expect(error.message).toEqual("Invalid password");
        }
    })

    test ("Return when password is less than 6 char", async () => {
        expect.assertions
        try {
            const result = await userBusinessMock.login(
                "paulo@gmail.com",
                "pulo",
            )

            expect(result).toBeFalsy()
        } catch (error:any) {
            expect(error.message).toEqual("Invalid password");
        }
    })

    test ("Return when user not exist", async () => {
        expect.assertions
        try {
            const result = await userBusinessMock.login(
                "paulo12@gmail.com",
                "paulo123",
            )

            expect(result).toBeFalsy()
        } catch (error:any) {
            expect(error.message).toEqual("User not found");
        }
    })

    test ("Return when password is wrong", async () => {
        expect.assertions
        try {
            const result = await userBusinessMock.login(
                "paulo@gmail.com",
                "paulo1234",
            )

            expect(result).toBeFalsy()
        } catch (error:any) {
            expect(error.message).toEqual("Incorrect password");
        }
    })

    test ("Return when login is correct", async () => {
        expect.assertions
        try {
            const result = await userBusinessMock.login(
                "paulo@gmail.com",
                "paulo123",
            )

            expect(result).toBeTruthy()
            expect(result).toEqual("mocked_token")
        } catch (error:any) {
            throw new Error(error.message)
        }
    })
})


// --------Logout--------------Logout---------------Logout-------------Logout---------
// --------Logout--------------Logout---------------Logout-------------Logout---------


describe("Logout test", () => {
    test("Return when token is missing", async () => {
        expect.assertions
        try {
            const result = await userBusinessMock.logout("")

            expect(result).toBeFalsy()
        } catch (error:any) {
            expect(error.message).toEqual("Login first")
        }
    })
    test("Return when logout is correct", async () => {
        expect.assertions
        try {
            const result = await userBusinessMock.logout("mocked_token")

            expect(result).toBeUndefined()
        } catch (error:any) {
            throw new Error(error.message)
        }
    })
})


// --------Get Profile--------------Get Profile---------------Get Profile-------------Get Profile---------
// --------Get Profile--------------Get Profile---------------Get Profile-------------Get Profile---------


describe("Get Profile test", () => {
    test("Return when token is missing", async () => {
        expect.assertions
        try {
            const result = await userBusinessMock.getProfile("")

            expect(result).toBeFalsy()
            expect(result).toBeDefined()
        } catch (error:any) {
            expect(error.message).toEqual("Login First")
        }
    })

    test("Return when user not found", async () => {
        expect.assertions
        try {
            const result = await userBusinessMock.getProfile("a")

            expect(result).toBeFalsy()
        } catch (error:any) {
            expect(error.message).toEqual("User not found")
        }
    })

})


// --------Edit User--------------Edit User---------------Edit User-------------Edit User---------
// --------Edit User--------------Edit User---------------Edit User-------------Edit User---------


describe("Edit User test", () => {
    test("Return when token is missing", async () => {
        expect.assertions
        try {
            const result = await userBusinessMock.editUser("")

            expect(result).toBeFalsy()
        } catch (error:any) {
            expect(error.message).toEqual("Login first")
        }
    })

    test("Return when edit is correct", async () => {
        expect.assertions
        try {
            const result = await userBusinessMock.editUser("mocked_token", "Penis")

            expect(result).toBeUndefined()
        } catch (error:any) {
            throw new Error(error.message)
        }
    })

})


// --------Edit Password--------------Edit Password---------------Edit Password-------------Edit Password---------
// --------Edit Password--------------Edit Password---------------Edit Password-------------Edit Password---------


describe("Edit Password test", () => {
    test("Return when token is missing", async () => {
        expect.assertions
        try {
            const result = await userBusinessMock.editPassword("paulo123", "paulo12345", "")

            expect(result).toBeFalsy()
        } catch (error:any) {
            expect(error.message).toEqual("Login first")
        }
    })

    test("Return when current password is missing", async () => {
        expect.assertions
        try {
            const result = await userBusinessMock.editPassword("", "paulo12345", "mocked_token")

            expect(result).toBeFalsy()
        } catch (error:any) {
            expect(error.message).toEqual("Enter your current password")
        }
    })

    test("Return when new password is missing", async () => {
        expect.assertions
        try {
            const result = await userBusinessMock.editPassword("paulo123", "", "mocked_token")

            expect(result).toBeFalsy()
        } catch (error:any) {
            expect(error.message).toEqual("Enter your new password")
        }
    })

    test("Return when new password is less than 6 char", async () => {
        expect.assertions
        try {
            const result = await userBusinessMock.editPassword("paulo123", "paulo", "mocked_token")

            expect(result).toBeFalsy()
        } catch (error:any) {
            expect(error.message).toEqual("Password must contain more than 6 characters")
        }
    })

    test("Return when new password is equal the current password", async () => {
        expect.assertions
        try {
            const result = await userBusinessMock.editPassword("paulo123", "paulo123", "mocked_token")

            expect(result).toBeFalsy()
        } catch (error:any) {
            expect(error.message).toEqual("The password cannot be the same")
        }
    })

    // test("Return when current password is wrong", async () => {
    //     expect.assertions
    //     try {
    //         const result = await userBusinessMock.editPassword("paulo1234", "paulo1235", "mocked_id")

    //         expect(result).toBeFalsy()
    //     } catch (error:any) {
    //         expect(error.message).toEqual("Incorrect password")
    //     }
    // })

})


