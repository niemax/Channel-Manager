import "@testing-library/jest-dom"
import { appRouter, db } from "@/server"
import { and, eq } from "drizzle-orm"
import { hotelChannels } from "@/db/schema"
import { act, fireEvent, render, screen } from "@testing-library/react"
import Header from "@/app/_components/Header"
import { ThemeSwitcher } from "@/app/_components/ThemeToggle"
import { ThemeProvider } from "next-themes"
import Error from "@/app/_components/Error"

/**
 * ! API (INTEGRATION) TESTS
 * ? Provides some basic tests for the API
 */
const caller = appRouter.createCaller({ session: null, req: null, res: null })
const HOTELS_LENGTH = 100,
  CHANNELS_LENGTH = 100,
  HOTEL_CHANNELS_LENGTH = 10,
  HOTEL_CHANNELS_CURSOR = 10

test("getHotels returns all hotels", async () => {
  const hotels = await caller.getHotels()
  expect(hotels).toHaveLength(HOTELS_LENGTH)
})

test("getChannels returns all channels", async () => {
  const channels = await caller.getChannels()
  expect(channels).toHaveLength(CHANNELS_LENGTH)
})

test("getHotelChannels returns channels for a hotel", async () => {
  const hotelChannels = await caller.getHotelChannels({
    hotelId: 1,
    limit: 10,
  })
  expect(hotelChannels.data).toHaveLength(HOTEL_CHANNELS_LENGTH)
  expect(hotelChannels.cursor).toBe(HOTEL_CHANNELS_CURSOR)
})

test("changeHotelVisibilityOnChannel and checkVisibilityOfHotelOnChannel", async () => {
  await caller.changeHotelVisibilityOnChannel({
    hotelId: 1,
    channelId: 1,
    visible: 1,
  })

  await db
    .select()
    .from(hotelChannels)
    .where(and(eq(hotelChannels.hotelId, 1), eq(hotelChannels.channelId, 1)))

  const visibility = await caller.checkVisibilityOfHotelOnChannel({
    hotelId: 1,
    channelName: "Channel 1",
  })
  expect(visibility[0].visible).toBe(1)
})

/**
 * ! COMPONENT TESTS
 * ? Provides some basic tests for the components
 */
describe("Header", () => {
  it("renders the header", () => {
    render(<Header />)
    expect(screen.getByTestId("header")).toBeInTheDocument()
  })
})

describe("ThemeSwitcher", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })
  })

  it("toggles theme on click", async () => {
    const { getByTestId } = render(
      <ThemeProvider attribute="class" defaultTheme="dark">
        <ThemeSwitcher />
      </ThemeProvider>
    )

    const button = getByTestId("theme-switcher")

    expect(button.textContent).toBe("Light")

    await act(async () => {
      fireEvent.click(button)
    })

    expect(button.textContent).toBe("Dark")
  })
})

describe("Error Component", () => {
  it("renders correctly when an error occurs", () => {
    const errorMessage = "Test message"
    render(<Error errorMessage={errorMessage} retryFunction={() => {}} />)

    expect(screen.getByText(errorMessage)).toBeInTheDocument()
    expect(screen.getByTestId("retry")).toBeInTheDocument()
  })

  it("calls retryFunction on button click", async () => {
    const mockRetryFunction = jest.fn()

    const { getByTestId } = render(
      <Error
        errorMessage="Test Error Message"
        retryFunction={mockRetryFunction}
      />
    )

    fireEvent.click(getByTestId("retry"))

    expect(mockRetryFunction).toHaveBeenCalled()
  })
})
